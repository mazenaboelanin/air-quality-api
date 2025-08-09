import cron from 'node-cron';
import AirQuality from '../models/airQuality';
import { fetchAirQuality } from '../services/api/airQualityApiService';
import { mapAirQualityToDb }  from '../utils/airQualityDbMapper';
import { createAirQualityRecord } from '../services/db/airQualityDbService'


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
      
      await createAirQualityRecord(result);

    } catch (error) {
      console.log('==== CRON error', error)
      
    } finally {
      console.log('==== ENDED Cron job!', new Date().toISOString());
    }
  });

}
