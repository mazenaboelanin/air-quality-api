import { RequestHandler } from "express";
import { fetchAirQuality } from "../services/airQualityService";
import { mapAirQualityToApi } from "../utils/airQualityApiMapper";


// @desc       list air quality for lat and long
// @route      GET api/v1/air_quality
// @access     Public
export const getAirQuality: RequestHandler = async(
  req, 
  res: { json: (arg0: { success: boolean; message: string; result?: any; error?: any; }) => void; },
  next) => {

  const { lat, lon } = req.query;

  try {
    const response = await fetchAirQuality(Number(lat), Number(lon));
    const result = mapAirQualityToApi(response);
  
    res.json({ success: true, message: 'air quality successful', result });
  } catch (error) {
    res.json({success: false, message: 'air quality Failed', error });
  }
}
