import express from 'express';

// importing Routes
import airQualityRoute from './routes/air-quality.routes';


const app = express();

app.use(express.json());

// setup routes
app.use('/api/v1/air_quality', airQualityRoute);

export default app;