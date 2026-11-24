import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  data: { type: Buffer, required: true }, contentType: { type: String, enum: ['image/jpeg', 'image/png', 'image/webp'], required: true },
  size: { type: Number, required: true }, owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: { createdAt: true, updatedAt: false } });
export default mongoose.model('Image', schema);
