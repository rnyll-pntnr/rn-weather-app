const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
const BASE_URL = `https://api.weatherapi.com/v1`;

export async function getCurrentWeather(lat: number, lon: number) {
  const res = await fetch(
    `${BASE_URL}/forecast.json?q=${lat},${lon}&days=7&key=${API_KEY}`
  );
  if (!res.ok) throw new Error('Failed to fetch weather data');
  return res.json();
}
