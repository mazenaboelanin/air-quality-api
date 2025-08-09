import AirQuality from "../../models/airQuality";

export async function createAirQualityRecord(data: any) {
  const newAirQuality = await AirQuality.create(data);

  if (!newAirQuality || !newAirQuality._id) {
    throw new Error("Record was not created.");
  }

  console.log(`==== Air quality record created successfully for ${newAirQuality.city}, ${newAirQuality.country}`);
  return newAirQuality;
}


export async function selectMostPollutedDate(city: string){
  const mostPolluted = await AirQuality.findOne({ city })
                                       .sort({ 'pollution.aqius': -1 })
                                       .select('pollution.ts -_id');

  if(!mostPolluted) {
    throw new Error('didn\'t find most polluted date successfully');
  }

  const mostPollutedDate = mostPolluted.pollution.ts;

  return mostPollutedDate;

}