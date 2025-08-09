import cron from 'node-cron';
import axios from 'axios';

import AirQuality from '../models/airQuality';


export function checkAirQualityCron() {
  // Runs every minute
  cron.schedule('* * * * *', async() => {
    console.log('==== Cron job is running every minute!', new Date().toISOString());
    const lat = 48.856613;
    const lon = 2.352222;
    try {
      const  response = await axios.get(
        `http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${process.env.IQAIR_API_KEY}`
        );
  
      const result = {
        city: response.data.data.city,
        state: response.data.data.state,
        country: response.data.data.country,
        coordinates: {
          latitude: lat,
          longitude: lon
        },
        pollution: {
          ts: response.data.data.current.pollution.ts,
          aqius:response.data.data.current.pollution.aqius,
          mainus: response.data.data.current.pollution.mainus,
          aqicn:response.data.data.current.pollution.aqicn,
          maincn: response.data.data.current.pollution.maincn,
        }
      }

      console.log('==== CRON response', response.data)
      console.log('==== CRON result', result)

      const newAirQuality = await AirQuality.create(result);
      if (newAirQuality && newAirQuality._id) {
        console.log(`==== Air quality record created successfully for ${newAirQuality.city}, ${newAirQuality.country}`);
      } else {
        console.log("==== Record was not created.");
      }


    } catch (error) {
      console.log('==== CRON error', error)
      
    } finally {
      console.log('==== ENDED Cron job!', new Date().toISOString());
    }
  });

}
