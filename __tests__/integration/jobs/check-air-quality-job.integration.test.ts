import { checkAirQualityJob } from '../../../src/jobs/check-air-quality.job';
import AirQuality from '../../../src/models/air-quality.model';

// INMEMORY DB CONNECTION AND SEEDER
import { connectTestDB, stopTestDB, clearTestDB } from "../../../config/db-test";
import { seedTestDB } from "../../../config/db-seeds";

// Factories
import { airQualityApiResponseFactory } from "../../factories/air-quality/air-quality-api-response.factory";
import { fetchAirQuality } from '../../../src/services/api/air-quality-api.service';

// Mocks
jest.mock('../../../src/services/api/air-quality-api.service');

describe('checkAirQualityJob - Integration', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(async () => {
    await connectTestDB();
    await seedTestDB();
  });
  
  afterAll(async () => {
    await clearTestDB();
    await stopTestDB();
  });

  it('should fetch air quality and store in DB (Paris)', async () => {
    const apiResponseFixture = airQualityApiResponseFactory().data;
    (fetchAirQuality as jest.Mock).mockResolvedValue(apiResponseFixture);

    const before = await AirQuality.countDocuments({});
    await checkAirQualityJob();
    const after = await AirQuality.countDocuments({});
    
    console.log({ before, after, diff: after - before });
    // Assert DB state
    const record = await AirQuality.findOne().sort({ _id: -1 }).exec();
    console.log('== record', record);
    expect(record).not.toBeNull();
    expect(record!._id).toBeDefined();
    expect(record!.city).toBe('Paris');
    expect(record!.pollution.aqius).toBe(85); // from apiResponseFixture data

    const records = await AirQuality.find({});
    expect(records).toHaveLength(6);
  });


  it('should throw error if API fails', async () => {
    (fetchAirQuality as jest.Mock).mockRejectedValue(new Error('SERVER IS DOWN'));

    await expect(checkAirQualityJob()).rejects.toThrow('SERVER IS DOWN');
    const records = await AirQuality.find({});
    expect(records).toHaveLength(6); // 6 because no record created
    });


  it('should throw error if record creation fails', async () => {
    const apiResponseFixture = airQualityApiResponseFactory().data;
    (fetchAirQuality as jest.Mock).mockResolvedValue(apiResponseFixture);
  
    const createSpy = jest.spyOn(require('../../../src/services/db/air-quality-db.service'), 'createAirQualityRecord')
      .mockRejectedValue(new Error("Record was not created."));
  
    await expect(checkAirQualityJob()).rejects.toThrow("Record was not created.");
    const records = await AirQuality.find({});
    expect(records).toHaveLength(6); // 6 because no record created
  
    createSpy.mockRestore();
  });
  

});
