import '../../../config/env';
import AirQuality from '../../../src/models/air-quality.model';
import { checkAirQualityJob } from '../../../src/jobs/check-air-quality.job';

// REAL DB CONNECTION
import { connectDB, stopDB } from '../../../config/db'


describe('checkAirQualityJob - Live Integration', () => {
  const OLD_ENV = process.env;

  beforeEach(async () => {
    jest.resetModules(); // Clears the require cache
    process.env = { ...OLD_ENV }; // reset OLD_ENV
    await connectDB();
  }, 15000);
  
  afterAll(async () => {
    process.env = OLD_ENV;
    await stopDB();
  });

  it('should fetch from live API and store data in DB', async () => {
    const recordsLengthBeforeJob = (await AirQuality.find({})).length;

    await checkAirQualityJob();

    const records = await AirQuality.find({});
    expect(records).toHaveLength(recordsLengthBeforeJob+1);

  }, 20000);

  it("should throw error if external API is down (live)", async () => {
    const recordsLengthBeforeJob = (await AirQuality.find({})).length;
    process.env.IQAIR_API_KEY = "1234";

    await expect(checkAirQualityJob()).rejects.toThrow('Could not fetch air quality data');
    const records = await AirQuality.find({});
    expect(records).toHaveLength(recordsLengthBeforeJob);

  }, 20000);
});
