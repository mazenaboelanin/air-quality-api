import { RequestHandler } from "express";
import { fetchAirQuality } from "../services/api/airQualityApiService";
import { mapAirQualityToApi } from "../utils/airQualityApiMapper";
import { selectMostPollutedDate } from "../services/db/airQualityDbService";



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


// @desc       get datetime where the paris zone is the most polluted
// @route      GET api/v1/air_quality/paris/most_pulluted_date
// @access     Public
export const getMostPollutedDate: RequestHandler = async(
  req, 
  res: { json: (arg0: { success: boolean; message: string; result?: any; error?: any; }) => void; },
  next) => {

  const { city } = req.params;
  const formattedCity = city.charAt(0).toUpperCase() + city.slice(1) // Capitalize the first letter

  try {
    const mostPollutedDate = await selectMostPollutedDate(formattedCity);
    console.log('========== ',mostPollutedDate);
  
    res.json({ success: true, message: 'found most polluted date successfully', result: mostPollutedDate });
  } catch (error) {
    res.json({success: false, message: 'didn\'t find most polluted date successfully', error: error.message });
  }
}