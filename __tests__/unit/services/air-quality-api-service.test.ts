import axios from "axios";
import { fetchAirQuality } from '../../../src/services/api/air-quality-api.service';

// Factories
import { airQualityApiResponseFactory } from '../../../__tests__/factories/air-quality/air-quality-api-response.factory';

// Mocks
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchAirQuality", () => {
  const lat = 35.95633;
  const lon = 140.32356;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns air quality data when API call is successful", async () => {
    const apiResponseFixture = airQualityApiResponseFactory();
    mockedAxios.get.mockResolvedValueOnce({ data: apiResponseFixture });

    const result = await fetchAirQuality(lat, lon);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining(`lat=${lat}&lon=${lon}`)
    );
    expect(result).toEqual(apiResponseFixture.data);
  });

  it("should throw error when API call fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchAirQuality(lat, lon))
      .rejects
      .toThrow("Could not fetch air quality data");

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
});
