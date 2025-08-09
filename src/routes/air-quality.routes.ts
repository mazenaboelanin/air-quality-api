import { getAirQuality } from '../controllers/air-quality.controller';
import express from 'express';
const router = express.Router();


// routes
router.get('/', getAirQuality);

export default router;
