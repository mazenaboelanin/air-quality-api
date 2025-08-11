import { mapAirQualityToDb } from '../../../src/utils/air-quality-db-mapper.util';

// Factories
import { airQualityApiResponseFactory } from '../../../__tests__/factories/air-quality/air-quality-api-response.factory';
import { airQualityDbMappedFactory } from '../../../__tests__/factories/air-quality/air-quality-db-mapped-factory';

describe('mapAirQualityToDb', () => {
  let apiResponseFixture: any;

  beforeEach(()=>{
    apiResponseFixture = airQualityApiResponseFactory().data;
  });


  it('should map API data to DB format', () => {
    const dbMappedResultFixture = airQualityDbMappedFactory();
    const result = mapAirQualityToDb(apiResponseFixture);

    expect(result).toEqual(dbMappedResultFixture);

  });

  it('should map using provided lat/lon instead of API coordinates', () => {
    const result = mapAirQualityToDb(apiResponseFixture, 48.856613, 2.352222);

    expect(result.coordinates).toEqual({
      latitude: 48.856613,
      longitude: 2.352222,
    });
  });

});