import 'dotenv/config';
import { connectDb } from '../config/db.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

async function run() {
	await connectDb();

	const [wallets, inventory] = await Promise.all([
		User.updateMany({ balance: { $exists: false } }, { $set: { balance: 100000 } }),
		Product.updateMany(
			{ isActive: true, baseStock: { $exists: false } },
			[{ $set: { baseStock: '$stock' } }],
		),
	]);

	console.log(`Migration complete: ${wallets.modifiedCount} wallet(s), ${inventory.modifiedCount} inventory target(s).`);
}

run().catch((error) => {
	console.error('Commerce migration failed', error);
	process.exitCode = 1;
});
