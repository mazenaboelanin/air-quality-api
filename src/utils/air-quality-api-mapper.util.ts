export function mapAirQualityToApi(apiData: any) {
  return {
    pollution: {
      ...apiData.current.pollution
    }
  }
}