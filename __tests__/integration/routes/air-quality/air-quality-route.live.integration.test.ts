//  command for running live tests => npx jest --runInBand --testPathPatterns=live

import request from "supertest";
import app from '../../../../src/app';
import { StatusCodes } from "http-status-codes";

describe('GET /api/v1/air_quality?lat=2&lon=4', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Clears the require cache
    process.env = { ...OLD_ENV }; // reset OLD_ENV
  });
  
  afterAll(() => {
    process.env = OLD_ENV; // restore OLD_ENV after overwriting 
  });

  it("should return live air quality data from external API", async () => {
    const res = await request(app)
      .get("/api/v1/air_quality?lat=48.859425&lon=2.351666"); // Paris

      expect(res.status).toBe(StatusCodes.OK);
      expect(res.body.success).toBe(true);
      expect(res.body.result).toHaveProperty("pollution");
  }, 10000); // Increase timeout ( default timeout of 5 seconds (5000 ms)

  it("should return Error of 400 if no Lat or Lon Specified", async () => {
    const urls = [
      '/api/v1/air_quality?lat=48.859425',
      '/api/v1/air_quality?lon=2.351666',
      '/api/v1/air_quality'
    ];

    for (const url of urls) {
      const res = await request(app).get(url);

      expect(res.status).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("air quality Failed");
      expect(res.body.error).toBe("you should enter lat and lon");
    };
  }, 10000); // Increase timeout ( default timeout of 5 seconds (5000 ms)


  it("should return 500 if external API is down (live)", async () => {
    process.env.IQAIR_API_KEY = "1234";
    const res = await request(app)
      .get("/api/v1/air_quality?lat=48.8566&lon=2.3522"); // Paris
  
    expect(res.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe("Could not fetch air quality data");
  }, 15000);

});