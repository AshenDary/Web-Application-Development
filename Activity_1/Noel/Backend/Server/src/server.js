import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';
import { migrateCommerceData } from './scripts/migrateCommerceData.js';
import { startRestockJob } from './jobs/restock.js';

const port = process.env.PORT || 5055;

migrateCommerceData()
	.then(() => app.listen(port, () => {
		console.log(`API listening on ${port}`);
		startRestockJob(Number(process.env.RESTOCK_INTERVAL_MINUTES) || 5);
	}))
	.catch(async (error) => {
		console.error('Database migration failed', error);
		await mongoose.disconnect();
		process.exitCode = 1;
	});
