import { fetchAirQuality } from '../services/api/air-quality-api.service';
import { mapAirQualityToDb }  from '../utils/air-quality-db-mapper.util';
import { createAirQualityRecord } from '../services/db/air-quality-db.service'

export async function checkAirQualityJob() {
    const lat = 48.856613;
    const lon = 2.352222;

    try {
      const response = await fetchAirQuality(lat, lon);      
      const result = mapAirQualityToDb(response);
      await createAirQualityRecord(result);
    } catch (error) {
      throw new Error(error.message);
    }
}
