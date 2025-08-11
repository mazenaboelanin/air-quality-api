export function airQualityDbMappedFactory(overrides = {}) {
  return {
    city: 'Paris',
    state: 'Ile-de-France',
    country: 'France',
    coordinates: {
      latitude: 48.856613,
      longitude: 2.352222,
    },
    pollution: {
      ts: '2025-08-10T12:00:00Z',
      aqius: 85,
      mainus: 'p2',
      aqicn: 42,
      maincn: 'p1',
    },
    ...overrides
  };
}
