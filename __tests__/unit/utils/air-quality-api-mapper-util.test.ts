import {mapAirQualityToApi} from '../../../src/utils/air-quality-api-mapper.util';

// Factories
import { airQualityApiResponseFactory } from '../../../__tests__/factories/air-quality/air-quality-api-response.factory';
import { airQualityApiMappedFactory } from '../../../__tests__/factories/air-quality/air-quality-api-mapped-factory';

describe('mapAirQualityToApi', () => {

	let apiResponseFixture: any;

	beforeEach(()=>{
		apiResponseFixture = airQualityApiResponseFactory().data;

	});

	it('should return pollution data from API data', () => {
		const apiMappedResultFixture = airQualityApiMappedFactory();
		const result = mapAirQualityToApi(apiResponseFixture);

		expect(result).toEqual(apiMappedResultFixture);
		expect(result.pollution.ts).toEqual("2025-08-10T12:00:00Z");
	});

	it('should return empty pollution object if missing', () => {
		const apiResponseFixture = {
      current: { pollution: {} }
    };
    const result = mapAirQualityToApi(apiResponseFixture);

    expect(result.pollution).toEqual({});
  });

	it("should handles empty API data gracefully", () => {
    const apiResponseFixture = {};
    const result = mapAirQualityToApi(apiResponseFixture as any);

    expect(result.pollution).toEqual({});
  });
});