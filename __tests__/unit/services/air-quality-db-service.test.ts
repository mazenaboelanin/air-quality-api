import { createAirQualityRecord, selectMostPollutedDate } from '../../../src/services/db/air-quality-db.service';
import AirQuality from '../../../src/models/air-quality.model';

// Factories
import { airQualityDbMappedFactory } from '../../factories/air-quality/air-quality-db-mapped-factory';

// Mocks
jest.mock('../../../src/models/air-quality.model');

describe("Air Quality DB Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createAirQualityRecord', () => {

    it('should create/return a new air quality record', async () => {
      const dbMappedResultFixture = airQualityDbMappedFactory();
      (AirQuality.create as jest.Mock).mockResolvedValue({ ...dbMappedResultFixture, _id: "123" });

      const result = await createAirQualityRecord(dbMappedResultFixture);

      expect(AirQuality.create).toHaveBeenCalledWith(dbMappedResultFixture);
      expect(result.city).toBe("Paris");
      expect(result._id).toBe("123");
    });

    it('should throw error if no new air quality record created', async() => {
      (AirQuality.create as jest.Mock).mockResolvedValue(null);

      await expect(createAirQualityRecord({})).rejects.toThrow("Record was not created.");
    });
  });


  describe('selectMostPollutedDate', () => {

    it('should return the most polluted date', async () => {
      const mockDate = "2025-08-11T08:00:00.000Z";

      (AirQuality.findOne as jest.Mock).mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue({
          pollution: { ts: mockDate }
        }),
      });

      const result = await selectMostPollutedDate("Paris");

      expect(AirQuality.findOne).toHaveBeenCalledWith({ city: "Paris" });
      expect(result).toEqual(mockDate);
    });

    it("should throw an error if no record is found", async () => {
      (AirQuality.findOne as jest.Mock).mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue(null),
      });

      await expect(selectMostPollutedDate("Paris"))
        .rejects
        .toThrow("didn't find most polluted date successfully");
    });

  })
});