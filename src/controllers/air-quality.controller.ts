// @desc       list air quality for lat and long
// @route      GET api/v1/air_quality

import { RequestHandler } from "express";
import { fetchAirQuality } from "../services/airQualityService";


// @access     Public
export const getAirQuality: RequestHandler = async(
  req, 
  res: { json: (arg0: { success: boolean; message: string; result?: any; error?: any; }) => void; },
  next) => {

  const { lat, lon } = req.query;

  try {
    const response = await fetchAirQuality(Number(lat), Number(lon));
    const result = prepareResult(response);
  
    res.json({ success: true, message: 'air quality successful', result });
  } catch (error) {
    res.json({success: false, message: 'air quality Failed', error });
  }
}


function prepareResult(response: any){
  const result = {
      pollution: {
        ...response.data.current.pollution
      }
  }

  return result;
}