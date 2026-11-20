import { Router } from 'express';
import { z } from 'zod';
import Reward from '../models/Reward.js';
import { optionalAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { logActivity } from '../utils/activity.js';

const router = Router();

router.get('/rewards', optionalAuth, async (req, res, next) => {
	try {
		const rewards = await Reward.find().sort({ pointsRequired: 1 });
		res.json({
			rewards: rewards.map((reward) => ({
				...reward.toObject(),
				unlocked: (req.user?.points ?? 0) >= reward.pointsRequired,
			})),
		});
	} catch (error) {
		next(error);
	}
});

const actions = ['page_view', 'product_view', 'search', 'filter', 'add_to_cart', 'remove_from_cart'];
router.post('/activity', validate(z.object({
	action: z.enum(actions),
	sessionId: z.string().max(100).optional(),
	metadata: z.record(z.union([z.string().max(160), z.number()])).optional(),
})), (req, res) => {
	logActivity(req, req.body.action, {
		metadata: req.body.metadata,
		sessionId: req.body.sessionId,
	});
	res.status(202).json({ ok: true });
});

export default router;
