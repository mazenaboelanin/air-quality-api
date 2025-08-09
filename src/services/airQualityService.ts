import axios from "axios";

export async function fetchAirQuality(lat: number, lon: number) {
  try {
    const url = `http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${process.env.IQAIR_API_KEY}`;
    
    const response = await axios.get(url);


    console.error("== response from service:", response.data);


    return response.data;
  } catch (error: any) {
    console.error("== Failed to fetch air quality:", error.message);
    throw new Error("Could not fetch air quality data");
  }
}
