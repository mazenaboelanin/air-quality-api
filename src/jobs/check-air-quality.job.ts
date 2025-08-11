import cron from 'node-cron';
import { fetchAirQuality } from '../services/api/air-quality-api.service';
import { mapAirQualityToDb }  from '../utils/air-quality-db-mapper.util';
import { createAirQualityRecord } from '../services/db/air-quality-db.service'

export function checkAirQualityJob() {
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
