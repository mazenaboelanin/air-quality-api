import AirQuality from "../../models/airQuality";

export async function createAirQualityRecord(data: any) {
  const newAirQuality = await AirQuality.create(data);

  if (!newAirQuality || !newAirQuality._id) {
    throw new Error("Record was not created.");
  }

  console.log(`==== Air quality record created successfully for ${newAirQuality.city}, ${newAirQuality.country}`);
  return newAirQuality;
}
