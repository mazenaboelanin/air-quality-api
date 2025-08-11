export function airQualityApiMappedFactory(overrides= {}){
  return {
    pollution: {
      ts: "2025-08-10T12:00:00Z",
      aqius: 85,
      mainus: 'p2',
      aqicn: 42,
      maincn: 'p1',
    },
    ...overrides
  };
}