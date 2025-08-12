import request from "supertest";
import app from "../../../../src/app";

// REAL DB CONNECTION
import { connectDB, stopDB } from '../../../../config/db'
import { StatusCodes } from "http-status-codes";

describe("GET /api/v1/air_quality/:city/most_polluted_date(LIVE DB)", () => {
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

  it("returns the most polluted date for a known city", async () => {
    const res = await request(app).get("/api/v1/air_quality/paris/most_polluted_date");

    console.log('res', res.body);
    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('found most polluted date successfully');
    expect(res.body.result).toBeDefined();
  }, 20000); // timeout for real DB calls

  it("should return 404 if no record found (live)", async () => {
    const res = await request(app).get("/api/v1/air_quality/notExistCity/most_polluted_date");
  
    console.log(`⚠️ Live API returned:`, res.body);
    expect(res.status).toBe(StatusCodes.NOT_FOUND);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe("didn\'t find most polluted date successfully");
  }, 15000);
});
