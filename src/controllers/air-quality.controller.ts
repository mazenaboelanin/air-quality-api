import { RequestHandler } from "express";
import { fetchAirQuality } from "../services/api/air-quality-api.service";
import { mapAirQualityToApi } from "../utils/air-quality-api-mapper.util";
import { selectMostPollutedDate } from "../services/db/air-quality-db.service";
import { StatusCodes } from 'http-status-codes';



// @desc       list air quality for lat and long
// @route      GET api/v1/air_quality
// @access     Public
export const getAirQuality: RequestHandler = async(
  req, 
  res: {
    status: any; json: (arg0: { success: boolean; message: string; result?: any; error?: any; }) => void; 
},
  next) => {

  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(StatusCodes.BAD_REQUEST)
       .json({success: false, message: 'air quality Failed', error: 'you should enter lat and lon' });
  }

  try {
    const response = await fetchAirQuality(Number(lat), Number(lon));
    const result = mapAirQualityToApi(response);
  
    res.status(StatusCodes.OK).json({ success: true, message: 'air quality successful', result });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: 'air quality Failed', error: error.message });
  }
}


// @desc       get datetime where the paris zone is the most polluted
// @route      GET api/v1/air_quality/:paris/most_pulluted_date
// @access     Public
export const getMostPollutedDate: RequestHandler = async(
  req, 
  res: {
    status: any; json: (arg0: { success: boolean; message: string; result?: any; error?: any; }) => void; 
},
  next) => {

  const { city } = req.params;
  const formattedCity = city.charAt(0).toUpperCase() + city.slice(1) // Capitalize the first letter

  try {
    const mostPollutedDate = await selectMostPollutedDate(formattedCity);
    console.log('========== ',mostPollutedDate);
  
    res.status(StatusCodes.OK).json({ success: true, message: 'found most polluted date successfully', result: mostPollutedDate });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({success: false, message: 'didn\'t find most polluted date successfully', error: error.message });
  }
}