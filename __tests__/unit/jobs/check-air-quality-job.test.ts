import { checkAirQualityJob } from '../../../src//jobs/check-air-quality.job';
import { fetchAirQuality } from '../../../src/services/api/air-quality-api.service';
import { mapAirQualityToDb }  from '../../../src/utils/air-quality-db-mapper.util';
import { createAirQualityRecord } from '../../../src/services/db/air-quality-db.service'

// Factories
import { airQualityApiResponseFactory } from '../../../__tests__/factories/air-quality/air-quality-api-response.factory';
import { airQualityDbMappedFactory } from '../../factories/air-quality/air-quality-db-mapped-factory';

// Mocks
jest.mock('../../../src/services/api/air-quality-api.service');
jest.mock('../../../src/utils/air-quality-db-mapper.util');
jest.mock('../../../src/services/db/air-quality-db.service');

describe('checkAirQualityJob - For Paris Zone', ()=>{
  let lat: number;
  let lon: number;

  beforeEach(() => {
    lat = 48.856613;
    lon = 2.352222;
  });

  it('should fetch air quality for paris zone', async()=>{
    // Arrange
    const apiResponseFixture = airQualityApiResponseFactory().data;
    const dbMappedResultFixture = airQualityDbMappedFactory();

    (fetchAirQuality as jest.Mock).mockResolvedValue(apiResponseFixture);
    (mapAirQualityToDb as jest.Mock).mockReturnValue(dbMappedResultFixture);
    (createAirQualityRecord as jest.Mock).mockResolvedValue(undefined);

    // Act
    await checkAirQualityJob();

    // Assert
    expect(fetchAirQuality).toHaveBeenCalledWith(48.856613, 2.352222);
    expect(mapAirQualityToDb).toHaveBeenCalledWith(apiResponseFixture);
    expect(createAirQualityRecord).toHaveBeenCalledWith(dbMappedResultFixture);
  });


  it('should throw an error if fetching fails', async () => {
    const error = new Error('API down');
    (fetchAirQuality as jest.Mock).mockRejectedValue(error);

    await expect(checkAirQualityJob()).rejects.toThrow('API down');
  });

});
