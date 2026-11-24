import Product from '../models/Product.js';

export async function restockProducts() {
	const result = await Product.updateMany(
		{ isActive: true, baseStock: { $exists: true }, $expr: { $ne: ['$stock', '$baseStock'] } },
		[{ $set: { stock: '$baseStock' } }],
		{ updatePipeline: true },
	);
	return result.modifiedCount;
}

export function startRestockJob(minutes) {
	let isRunning = false;
	const run = async () => {
		if (isRunning) return;
		isRunning = true;
		try {
			const modifiedCount = await restockProducts();
			if (modifiedCount > 0) console.log(`Restocked ${modifiedCount} products`);
		} catch (error) {
			console.error('Failed to restock products', error);
		} finally {
			isRunning = false;
		}
	};
	run();
	return setInterval(run, minutes * 60 * 1000);
}
