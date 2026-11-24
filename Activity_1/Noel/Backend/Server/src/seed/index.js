import 'dotenv/config';
import bcrypt from 'bcrypt';
import { connectDb } from '../config/db.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Reward from '../models/Reward.js';

const catalog = [
	['Bicycle', 'Vehicles', 'common', 1200, 5, 'bicycle.jpeg', 'READY', 10, 'Pedals, brakes, and exactly zero monthly payments. Ideal for dramatic exits and quick grocery runs.'],
	['Honda Click Motorcycle', 'Vehicles', 'rare', 18500, 2, 'HondaClickMotorcycle.jpeg', 'PRE-OWNED', 24, 'A nimble city scooter that treats traffic like a strongly worded suggestion. Helmet not included.'],
	['iPhone 15', 'Tech', 'rare', 14500, 2, 'iphone.jpeg', 'TESTED', 27, 'A pocket-sized rectangle for calls, photos, and pretending you did not see a message.'],
	['iPhone 18', 'Tech', 'legendary', 22000, 1, 'iphone18.jpeg', 'DISPLAY', 40, 'A concept-style handset for anyone whose current phone still has a home button and emotional baggage.'],
	['Pearl Necklace', 'Jewelry', 'limited', 2800, 4, 'PearlNecklace.jpeg', 'VERIFIED', 18, 'Classic pearls for weddings, dinners, and looking far more organised than your calendar.'],
	['Ring', 'Jewelry', 'rare', 1900, 3, 'Ring.jpeg', 'VERIFIED', 14, 'A polished ring with just enough shine to make ordinary hand gestures feel expensive.'],
	['Rolex Watch', 'Watches', 'limited', 6400, 1, 'RolexWatch.jpeg', 'INSPECTED', 32, 'A stainless watch for checking the time while quietly hoping someone asks about it.'],
	['Toyota Vios', 'Vehicles', 'limited', 85000, 1, 'vios.jpg', 'PRE-OWNED', 36, 'A compact city sedan with room for friends, groceries, and one very optimistic road trip.'],
	['Gucci Wallet', 'Fashion', 'rare', 3500, 2, 'gucciwallet.jpeg', 'PRE-OWNED', 21, 'A designer wallet with enough personality to make even three pesos feel like a financial portfolio.'],
	['Giant Road Bike', 'Vehicles', 'limited', 7200, 1, 'giantroadbike.jpeg', 'TUNED', 19, 'Road bike energy for riders who own exactly one athletic shirt and wear it with confidence.'],
	['Bundle of iPhones', 'Tech', 'limited', 18000, 1, 'BundleOfIphones.jpeg', 'TESTED', 34, 'A stack of phones for family plans, backup plans, and people who never know where they put one.'],
	['Apple Watch', 'Tech', 'rare', 4800, 2, 'applewatch.jpeg', 'TESTED', 17, 'Tiny wrist computer that counts your steps and gently judges your sedentary decisions.'],
	['Slightly Used iPad', 'Tech', 'rare', 8900, 2, 'IpadSlightlyUsed.jpeg', 'TESTED', 16, 'A tablet with just enough previous life to know where the good streaming apps are.'],
	['Motorcycle Saddle', 'Vehicles', 'common', 950, 3, 'MotorSaddle.jpeg', 'READY', 12, 'Replacement saddle for when your motorcycle seat has seen more plot twists than a soap opera.'],
	['Camera', 'Tech', 'limited', 5600, 1, 'Camera.jpeg', 'INSPECTED', 23, 'A proper camera for photos that say “candid” even after twelve takes.'],
	['Slightly Used iPhone', 'Tech', 'common', 6800, 3, 'SlightlyUsedIphone.jpeg', 'TESTED', 15, 'A dependable iPhone with a few stories, a fresh charge, and no interest in being judged.'],
	['Pug Companion', 'Companions', 'limited', 1500, 1, 'Pug.jpeg', 'REHOMING', 8, 'A very serious small dog with big opinions, a compact snore, and an adoption screening requirement.'],
];
const legacySlugs = ['ghost-phone-x9', 'midnight-monalisa', 'submariner-watch', 'night-ledger-case', 'obsidian-drone-mk-2', 'pearl-diamond-set', 'unlisted-provenance-vintage-daytona', 'grapheneos-privacy-rig', 'declassified-server-access-key-display', 'archival-mesoamerican-replica', 'zero-day-vintage-synth', 'studio-headphones', 'ceramic-vase', 'silver-cufflinks', 'field-watch', 'archive-camera', 'leather-weekender', 'mechanical-keyboard', 'canvas-print', 'gold-pendant', 'travel-clock', 'vinyl-collection', 'wool-coat', 'pocket-projector', 'signed-poster', 'sapphire-ring', 'desk-clock', 'model-car', 'silk-scarf', 'compact-speaker', 'glass-sculpture', 'bracelet', 'dive-watch', 'chess-set', 'cashmere-wrap', 'portable-console', 'framed-sketch', 'chain-necklace', 'pilot-watch', 'board-game-set', 'leather-journal', 'smart-display', 'art-book', 'earrings', 'chronograph', 'collectible-figure', 'denim-jacket', 'honda-click-125i', 'minimal-gold-ring', 'rolex-style-watch', 'city-bicycle', 'iphone-18-concept'];
const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

async function run() {
	if (!process.env.SEED_ADMIN_EMAIL || process.env.SEED_ADMIN_EMAIL.includes('your_') || !process.env.SEED_ADMIN_PASSWORD || process.env.SEED_ADMIN_PASSWORD.includes('your_')) throw new Error('Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD');
	await connectDb();
	const admin = await User.findOneAndUpdate({ email: process.env.SEED_ADMIN_EMAIL.toLowerCase() }, { name: 'Store Admin', email: process.env.SEED_ADMIN_EMAIL.toLowerCase(), passwordHash: await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD, 12), role: 'admin' }, { upsert: true, new: true, setDefaultsOnInsert: true });
	await Product.updateMany({ slug: { $in: legacySlugs } }, { $set: { isActive: false } });
	const products = catalog.map((item, index) => ({
		name: item[0], slug: slug(item[0]), description: item[8], category: item[1], rarity: item[2], price: item[3], stock: item[4], baseStock: item[4], imageUrl: `/products/${item[5]}`, status: item[6], heat: item[7], blackTier: false, isActive: true, isHotDrop: index < 4, dropStartsAt: new Date(), dropEndsAt: new Date(Date.now() + (index + 1) * 86400000), createdBy: admin._id,
	}));
	for (const product of products) await Product.updateOne({ slug: product.slug }, { $set: product }, { upsert: true });
	for (const reward of [['Member credit', 'Credit for a future order', 100], ['Delivery upgrade', 'Complimentary standard delivery', 1000], ['Private preview', 'Invitation to a private preview', 5000]]) await Reward.updateOne({ name: reward[0] }, { $set: { name: reward[0], description: reward[1], pointsRequired: reward[2] } }, { upsert: true });
	console.log('Seed complete');
	process.exit();
}

run().catch(() => { console.error('Seed failed'); process.exit(1); });
