// @desc       list air quality for lat and long
// @route      GET api/v1/air_quality

import { RequestHandler } from "express";
import axios from 'axios';


// @access     Public
export const getAirQuality: RequestHandler = async(
  req, 
  res: { json: (arg0: { success: boolean; message: string; result?: any; err?: any; }) => void; },
  next) => {

  try {
    const  response = await axios.get(
      `http://api.airvisual.com/v2/nearest_city?lat=35.98&lon=140.33&key=${process.env.IQAIR_API_KEY}`
      );

    const result = prepareResult(response);
    
    console.log('response', result)

    res.json({ success: true, message: 'air quality successful', result });
  } catch (error) {
    console.log('error', error)
    res.json({success: false, message: 'air quality Failed'});
  }


}


function prepareResult(response: any){
  const result = {
      pollution: {
        ...response.data.data.current.pollution
      }
  }

  return result;
}