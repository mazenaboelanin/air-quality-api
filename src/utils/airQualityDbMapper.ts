export function mapAirQualityToDb(apiData: any, lat?: number, lon?: number) {
    return {
      city: apiData.city,
      state: apiData.state,
      country: apiData.country,
      coordinates: {
        latitude: lat ?? apiData.location.coordinates[1],
        longitude: lon ?? apiData.location.coordinates[0],
      },
      pollution: {
        ts: apiData.current.pollution.ts,
        aqius: apiData.current.pollution.aqius,
        mainus: apiData.current.pollution.mainus,
        aqicn: apiData.current.pollution.aqicn,
        maincn: apiData.current.pollution.maincn,
      },
    };
  }
  