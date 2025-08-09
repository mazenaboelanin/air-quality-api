import cron from 'node-cron';
import axios from 'axios';

import AirQuality from '../models/airQuality';
import { fetchAirQuality } from '../services/airQualityService';


export function checkAirQualityCron() {
  // Runs every minute
  cron.schedule('* * * * *', async() => {
    console.log('==== Cron job is running every minute!', new Date().toISOString());
    const lat = 48.856613;
    const lon = 2.352222;
    try {

      const response = await fetchAirQuality(Number(lat), Number(lon));
      
      const result = {
        city: response.data.city,
        state: response.data.state,
        country: response.data.country,
        coordinates: {
          latitude: lat,
          longitude: lon
        },
        pollution: {
          ts: response.data.current.pollution.ts,
          aqius: response.data.current.pollution.aqius,
          mainus: response.data.current.pollution.mainus,
          aqicn: response.data.current.pollution.aqicn,
          maincn: response.data.current.pollution.maincn,
        }
      }

      console.log('==== CRON response', response)
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
