import express from 'express';
import dotenv from 'dotenv';

// importing Routes
import airQualityRoute from './routes/air-quality.routes';


// Load environment variables from .env file
dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());

// setup routes
app.use('/api/v1/air_quality', airQualityRoute);

export default app;