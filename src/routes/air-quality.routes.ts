import { getAirQuality, getMostPollutedDate } from '../controllers/air-quality.controller';
import express from 'express';
const router = express.Router();


// routes
router.get('/', getAirQuality);
router.get('/:city/most_polluted_date', getMostPollutedDate);

export default router;
