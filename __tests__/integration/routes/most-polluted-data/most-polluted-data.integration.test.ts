import request from "supertest";
import app from "../../../../src/app";

// INMEMORY DB CONNECTION AND SEEDER
import { connectTestDB, stopTestDB, clearTestDB } from "../../../../config/db-test";
import { seedTestDB } from "../../../../config/db-seeds";
import { StatusCodes } from "http-status-codes";

beforeAll(async () => {
  await connectTestDB();
  await seedTestDB();
});

afterAll(async () => {
  await clearTestDB();
  await stopTestDB();
});

describe("GET /api/v1/air_quality/:city/most_polluted_date - (IN-MEMORY DB)", () => {
  it("should return the most polluted date for the city", async () => {
    const res = await request(app).get("/api/v1/air_quality/paris/most_polluted_date");

    console.log('==== RESPONSE', res.body);
    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('found most polluted date successfully');
    expect(res.body.result).toBe("2025-08-10T12:00:00.000Z");
  });

  it("should return 404 if city not found", async () => {
    const res = await request(app).get("/api/v1/air_quality/notExistCity/most_polluted_date");

    console.log('==== RESPONSE', res.body);
    expect(res.status).toBe(StatusCodes.NOT_FOUND);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('didn\'t find most polluted date successfully');
    expect(res.body.error).toBeDefined();
  });
});
