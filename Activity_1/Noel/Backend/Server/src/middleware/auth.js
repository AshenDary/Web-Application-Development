import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function requireAuth(req, res, next) {
	try {
		const token = req.cookies.token;
		if (!token) return res.status(401).json({ message: 'Authentication required' });
		const { id } = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(id);
		if (!user) return res.status(401).json({ message: 'Authentication required' });
		req.user = user;
		next();
	} catch {
		return res.status(401).json({ message: 'Authentication required' });
	}
}

export async function optionalAuth(req, res, next) {
	const token = req.cookies.token;
	if (token) {
		try {
			const { id } = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(id) || undefined;
		} catch {
			req.user = undefined;
		}
	}
	next();
}

export const requireAdmin = (req, res, next) => (
	req.user?.role === 'admin' ? next() : res.status(403).json({ message: 'Admin access required' })
);
