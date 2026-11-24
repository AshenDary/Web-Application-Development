import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	name: { type: String, required: true, trim: true, maxlength: 80 },
	email: { type: String, required: true, unique: true, lowercase: true, trim: true },
	passwordHash: { type: String, required: true },
	role: { type: String, enum: ['user', 'seller', 'admin'], default: 'user' },
	points: { type: Number, default: 0, min: 0 },
	// A development wallet lets every new account complete a purchase without a separate funding flow.
	balance: { type: Number, default: 100000, min: 0 },
	lastLoginAt: Date,
}, { timestamps: true });

export default mongoose.model('User', schema);
