export function airQualityApiResponseFactory(overrides = {}) {
  return {
    data: {
      city: "Paris",
      state: "Ile-de-France",
      country: "France",
      location: {
        type: "Point",
        coordinates: [2.352222, 48.856613]
      },
      current: {
        pollution: {
          ts: '2025-08-10T12:00:00Z',
          aqius: 85,
          mainus: 'p2',
          aqicn: 42,
          maincn: 'p1'
        }
      }
    },
    ...overrides
  };
}
