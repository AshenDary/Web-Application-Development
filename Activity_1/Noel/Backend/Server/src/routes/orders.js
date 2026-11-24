import mongoose from 'mongoose';
import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import { z } from 'zod';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { logActivity } from '../utils/activity.js';

const router = Router();
const schema = z.object({
	items: z.array(z.object({
		productId: z.string().length(24),
		qty: z.coerce.number().int().min(1).max(20),
	})).min(1).max(30),
}).strict();

function transactionsAvailable() {
	const topology = mongoose.connection.client?.topology?.description?.type;
	return topology === 'ReplicaSetWithPrimary' || topology === 'Sharded';
}

async function applyOrder(req, session, state) {
	const items = [];

	for (const item of req.body.items) {
		const options = { new: true };
		if (session) options.session = session;

		const product = await Product.findOneAndUpdate(
			{ _id: item.productId, isActive: true, stock: { $gte: item.qty }, ...(req.user.points >= 5000 ? {} : { blackTier: { $ne: true } }) },
			{ $inc: { stock: -item.qty } },
			options,
		);

		if (!product) {
			throw Object.assign(new Error('One or more products are out of stock'), { status: 409 });
		}

		state.reservations.push({ productId: product._id, qty: item.qty });
		items.push({ product: product._id, name: product.name, status: product.status || 'VERIFIED', unitPrice: product.price, qty: item.qty });
	}

	const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
	const brokerageFee = Math.round(subtotal * 0.025 * 100) / 100;
	const total = subtotal + brokerageFee;
	const points = Math.floor(total / 100);
	const orderData = { user: req.user._id, items, subtotal, brokerageFee, total, status: 'completed', paymentStatus: 'confirmed', fulfillmentStatus: 'scheduled', transactionId: `TRX-${randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase()}-BLK`, brokerId: `BRK-${randomUUID().replace(/-/g, '').slice(0, 6).toUpperCase()}`, estimatedDeliveryAt: new Date(Date.now() + 3 * 86400000), pointsEarned: points };

	if (session) {
		[state.order] = await Order.create([orderData], { session });
		await User.findByIdAndUpdate(req.user._id, { $inc: { points } }).session(session);
	} else {
		state.order = await Order.create(orderData);
		await User.findByIdAndUpdate(req.user._id, { $inc: { points } });
	}
}

async function applyOrderWithoutTransactions(req) {
	const state = { order: null, reservations: [] };

	try {
		await applyOrder(req, null, state);
		return state.order;
	} catch (error) {
		if (state.order) await Order.deleteOne({ _id: state.order._id });

		for (const reservation of state.reservations) {
			await Product.updateOne(
				{ _id: reservation.productId },
				{ $inc: { stock: reservation.qty } },
			);
		}

		throw error;
	}
}

router.post('/', requireAuth, validate(schema), async (req, res, next) => {
	try {
		const ownListing = await Product.exists({ _id: { $in: req.body.items.map((item) => item.productId) }, createdBy: req.user._id });
		if (ownListing) return res.status(400).json({ message: "You can't buy your own listing" });
		let order;

		if (transactionsAvailable()) {
			const session = await mongoose.startSession();
			try {
				await session.withTransaction(async () => {
					const state = { order: null, reservations: [] };
					await applyOrder(req, session, state);
					order = state.order;
				});
			} finally {
				await session.endSession();
			}
		} else {
			order = await applyOrderWithoutTransactions(req);
		}

		logActivity(req, 'order_placed', { entityType: 'order', entityId: order._id });
		res.status(201).json({ order });
	} catch (error) {
		next(error);
	}
});

router.get('/mine', requireAuth, async (req, res, next) => {
	try {
		res.json({ orders: await Order.find({ user: req.user._id }).sort({ createdAt: -1 }) });
	} catch (error) {
		next(error);
	}
});

router.get('/:id', requireAuth, async (req, res, next) => {
	try {
		if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: 'Transfer not found' });
		const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
		if (!order) return res.status(404).json({ message: 'Transfer not found' });
		res.json({ order });
	} catch (error) {
		next(error);
	}
});

export default router;
