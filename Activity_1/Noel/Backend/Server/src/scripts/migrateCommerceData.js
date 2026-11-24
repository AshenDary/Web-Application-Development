import 'dotenv/config';
import mongoose from 'mongoose';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { connectDb } from '../config/db.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

const seededStock = {
	bicycle: 5,
	'honda-click-motorcycle': 2,
	'iphone-15': 2,
	'iphone-18': 1,
	'pearl-necklace': 4,
	ring: 3,
	'rolex-watch': 1,
	'toyota-vios': 1,
	'gucci-wallet': 2,
	'giant-road-bike': 1,
	'bundle-of-iphones': 1,
	'apple-watch': 2,
	'slightly-used-ipad': 2,
	'motorcycle-saddle': 3,
	camera: 1,
	'slightly-used-iphone': 3,
	'pug-companion': 1,
};
const seededSlugs = Object.keys(seededStock);
const hotDropSlugs = seededSlugs.slice(0, 10);
const hotDropStartsAt = new Date();
const hotDropEndsAt = new Date(hotDropStartsAt.getTime() + 14 * 24 * 60 * 60 * 1000);

const stockTarget = {
	$switch: {
		branches: Object.entries(seededStock).map(([slug, stock]) => ({
			case: { $eq: ['$slug', slug] },
			then: stock,
		})),
		default: {
			$max: [1, {
				$cond: [
					{ $gt: [{ $ifNull: ['$baseStock', 0] }, 0] },
					'$baseStock',
					{ $ifNull: ['$stock', 0] },
				],
			}],
		},
	},
};

export async function migrateCommerceData() {
	await connectDb();

	const [wallets, inventory] = await Promise.all([
		User.updateMany({ balance: { $exists: false } }, { $set: { balance: 100000 } }),
		Product.updateMany(
			{ isActive: true },
			[{ $set: {
				baseStock: stockTarget,
				stock: { $cond: [{ $eq: [{ $ifNull: ['$stock', 0] }, 0] }, stockTarget, '$stock'] },
				isHotDrop: { $cond: [{ $in: ['$slug', seededSlugs] }, { $in: ['$slug', hotDropSlugs] }, '$isHotDrop'] },
				dropStartsAt: { $cond: [{ $in: ['$slug', hotDropSlugs] }, hotDropStartsAt, '$dropStartsAt'] },
				dropEndsAt: { $cond: [{ $in: ['$slug', hotDropSlugs] }, hotDropEndsAt, '$dropEndsAt'] },
			} }],
		),
	]);

	console.log(`Migration complete: ${wallets.modifiedCount} wallet(s), ${inventory.modifiedCount} inventory target(s).`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
	migrateCommerceData()
		.catch((error) => {
			console.error('Commerce migration failed', error);
			process.exitCode = 1;
		})
		.finally(() => mongoose.disconnect());
}
