import { getAirQuality, getMostPollutedDate } from '../../../src/controllers/air-quality.controller';
import { fetchAirQuality } from '../../../src/services/api/air-quality-api.service';
import { selectMostPollutedDate } from '../../../src/services/db/air-quality-db.service';
import { mapAirQualityToApi } from '../../../src/utils/air-quality-api-mapper.util';
import { StatusCodes } from 'http-status-codes';

// Factories
import { airQualityApiResponseFactory } from '../../../__tests__/factories/air-quality/air-quality-api-response.factory';
import { airQualityApiMappedFactory } from '../../../__tests__/factories/air-quality/air-quality-api-mapped-factory';


// Mocks
jest.mock( '../../../src/services/api/air-quality-api.service');
jest.mock('../../../src/services/db/air-quality-db.service');
jest.mock('../../../src/utils/air-quality-api-mapper.util');

////////////// getAirQuality HANDLERR

describe('getAirQuality Handler', () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = {
      query: {
        lat: '48.8566',
        lon: '2.3522',
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  it('should return status code 200 with response', async () => {
    // Arrange
    const apiResponseFixture = airQualityApiResponseFactory().data;
    const apiMappedResultFixture = airQualityApiMappedFactory();

    (fetchAirQuality as jest.Mock).mockResolvedValue(apiResponseFixture);
    (mapAirQualityToApi as jest.Mock).mockReturnValue(apiMappedResultFixture);

    // Act
    await getAirQuality(req, res, next);

    // Assert
    expect(fetchAirQuality).toHaveBeenCalledWith(48.8566, 2.3522);
    expect(mapAirQualityToApi).toHaveBeenCalledWith(apiResponseFixture);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'air quality successful',
      result: apiMappedResultFixture,
    });
  });

  it('should return status code 400 with error', async () => {
    // Arrange
    const fakeError = new Error('air quality Failed');
    (fetchAirQuality as jest.Mock).mockRejectedValue(fakeError);

    // Act
    await getAirQuality(req, res, next);

    // Assert
    expect(fetchAirQuality).toHaveBeenCalledWith(48.8566, 2.3522);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'air quality Failed',
      error: fakeError.message,
    });
  });

  it('should handle missing query parameters gracefully', async () => {
    req.query = {}; // no lat or lon

    await getAirQuality(req, res, next);

    expect(fetchAirQuality).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
  });
});



////////////// getMostPollutedDate HANDLERR

describe('getMostPollutedDate Handler', () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = {
      params: {
        city: 'paris'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  it('should return status code 200 with response', async () => {
    // Arrange
    const fakeResult = '2025-08-10T15:00:00Z';
    const { city } = req.params ;
    const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);

    (selectMostPollutedDate as jest.Mock).mockResolvedValue(fakeResult);

    // Act
    await getMostPollutedDate(req, res, next);

    // Assert
    expect(formattedCity).toBe('Paris');
    expect(selectMostPollutedDate).toHaveBeenCalledWith(formattedCity);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'found most polluted date successfully',
      result: fakeResult,
    });
  });

  it('should return status code 404 with error', async () => {
    const { city } = req.params ;
    const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);

    // Arrange
    const fakeError = new Error('didn\'t find most polluted date successfully');
    (selectMostPollutedDate as jest.Mock).mockRejectedValue(fakeError);
    // Act
    await getMostPollutedDate(req, res, next);

    // Assert
    expect(formattedCity).toBe('Paris');
    expect(selectMostPollutedDate).toHaveBeenCalledWith(formattedCity);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'didn\'t find most polluted date successfully',
      error: fakeError.message,
    });
  });

});
