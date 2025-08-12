import AirQuality from "../src/models/air-quality.model";
import { airQualitySeeds } from "./db-seeds.data";


export const seedTestDB = async () => {
  try {
    await AirQuality.deleteMany({});
    const airQualities =  await AirQuality.create(airQualitySeeds);
    console.log("🌱 Test DB seeded");
    return airQualities;
  } catch (error) {
    console.error("❌ Failed to seed Test DB:", error);
    throw error;
  }
};
