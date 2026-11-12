import mongoose from 'mongoose';
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
});

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
			{ _id: item.productId, isActive: true, stock: { $gte: item.qty } },
			{ $inc: { stock: -item.qty } },
			options,
		);

		if (!product) {
			throw Object.assign(new Error('One or more products are out of stock'), { status: 409 });
		}

		state.reservations.push({ productId: product._id, qty: item.qty });
		items.push({ product: product._id, name: product.name, unitPrice: product.price, qty: item.qty });
	}

	const total = items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
	const points = Math.floor(total / 100);
	const orderData = { user: req.user._id, items, total, pointsEarned: points };

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

export default router;
