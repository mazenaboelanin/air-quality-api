import app from './app';
import dotenv from 'dotenv';
import connectDB from '../config/db';
import { runScheduler } from './jobs/scheduler';

// Load environment variables from .env file
dotenv.config({ path: './config/config.env' });

const PORT = 5000;

// Connect to MongoDB first
connectDB();

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});


runScheduler();