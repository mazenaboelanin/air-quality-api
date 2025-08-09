import cron from 'node-cron';
import AirQuality from '../models/airQuality';
import { fetchAirQuality } from '../services/airQualityService';
import { mapAirQualityToDb }  from '../utils/airQualityDbMapper';


export function checkAirQualityCron() {
  // Runs every minute
  cron.schedule('* * * * *', async() => {
    console.log('==== Cron job is running every minute!', new Date().toISOString());
    const lat = 48.856613;
    const lon = 2.352222;
    try {

      const response = await fetchAirQuality(Number(lat), Number(lon));
      console.log('==== CRON before mapper', response)
      
      const result = mapAirQualityToDb(response);

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
