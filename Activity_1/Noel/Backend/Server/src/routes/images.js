import { Router } from 'express';
import mongoose from 'mongoose';
import Image from '../models/Image.js';
const router = Router();
router.get('/:id', async (req, res, next) => { try { if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: 'Image not found' }); const image = await Image.findById(req.params.id).select('data contentType'); if (!image) return res.status(404).json({ message: 'Image not found' }); res.set({ 'Content-Type': image.contentType, 'Cache-Control': 'public, max-age=86400, immutable', 'Cross-Origin-Resource-Policy': 'cross-origin' }).send(image.data); } catch (error) { next(error); } });
export default router;
