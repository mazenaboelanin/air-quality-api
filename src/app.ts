import '../config/env';
import express from 'express';

// importing Routes
import airQualityRoute from './routes/air-quality.routes';
import { StatusCodes } from 'http-status-codes';


const app = express();

app.use(express.json());

// setup routes
app.use('/api/v1/air_quality', airQualityRoute);

app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Route not found',
    });
  });

export default app;