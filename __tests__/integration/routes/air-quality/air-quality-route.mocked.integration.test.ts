// __tests__/integration/api/airQuality.mocked.int.test.ts
import request from "supertest";
import app from "../../../../src/app";
import { fetchAirQuality }from "../../../../src/services/api/air-quality-api.service";
import { StatusCodes } from "http-status-codes";

// Factories
import { airQualityApiResponseFactory } from "../../../factories/air-quality/air-quality-api-response.factory";

// Mocks
jest.mock('../../../../src/services/api/air-quality-api.service');

describe("GET /api/v1/air_quality (mocked external API)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return air quality data (mocked)", async () => {
    const apiResponseFixture = airQualityApiResponseFactory().data;
    (fetchAirQuality as jest.Mock).mockResolvedValue(apiResponseFixture);

    const res = await request(app)
      .get("/api/v1/air_quality?lat=48.859425&lon=2.351666");

    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body.success).toBe(true);
    expect(res.body.result).toHaveProperty("pollution");
  });

  it("should return error if external API throws", async () => {
    (fetchAirQuality as jest.Mock).mockRejectedValue(new Error("Could not fetch air quality data"));

    const res = await request(app)
      .get("/api/v1/air_quality?lat=48.859425&lon=2.351666");

    expect(res.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR); 
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("air quality Failed");
    expect(res.body.error).toBe("Could not fetch air quality data");
  });
});
