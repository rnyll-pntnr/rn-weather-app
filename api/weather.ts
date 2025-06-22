const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
const BASE_URL = `https://api.weatherapi.com/v1`;

export async function getCurrentWeather(lat: number, lon: number) {
  const res = await fetch(
    `${BASE_URL}/current.json?q=${lat},${lon}&key=${API_KEY}`
  );
  if (!res.ok) throw new Error('Failed to fetch weather data');
  return res.json();
}

export async function getCurrentWeatherForecast(lat: number, lon: number) {
  const res = await fetch(
    `${BASE_URL}/forecast.json?q=${lat},${lon}&days=7&key=${API_KEY}`
  );
  if (!res.ok) throw new Error('Failed to fetch weather data');
  return res.json();
}

export const getWeatherUsingCity = async (city: string) => {
  const res = await fetch(
    `${BASE_URL}/forecast.json?q=${city}&days=7&key=${API_KEY}`
  );
  if (!res.ok) throw new Error('Failed to fetch weather data');
  return res.json();
}

export const getWeatherIcon = (code: number, is_day: number): any => {
  const icons: any = {
    1000: is_day ? 'sun' : 'moon', // Clear
    1003: is_day ? 'cloud' : 'cloud', // Partly cloudy
    1006: 'cloud', // Cloudy
    1009: 'cloud', // Overcast
    1030: 'wind', // Mist
    1063: is_day ? 'cloud-drizzle' : 'cloud-drizzle', // Patchy rain possible
    1066: is_day ? 'cloud-snow' : 'cloud-snow', // Patchy snow possible
    1069: is_day ? 'cloud-sleet' : 'cloud-sleet', // Patchy sleet possible (using a similar icon)
    1072: is_day ? 'cloud-drizzle' : 'cloud-drizzle', // Patchy freezing drizzle possible
    1087: 'cloud-lightning', // Thundery outbreaks possible
    1114: 'wind', // Blowing snow
    1117: 'wind', // Blizzard
    1135: 'cloud', // Fog
    1147: 'cloud', // Freezing fog
    1150: 'cloud-drizzle', // Patchy light drizzle
    1153: 'cloud-drizzle', // Light drizzle
    1168: 'cloud-drizzle', // Freezing drizzle
    1171: 'cloud-drizzle', // Heavy freezing drizzle
    1180: 'cloud-rain', // Patchy light rain
    1183: 'cloud-rain', // Light rain
    1186: 'cloud-rain', // Moderate rain at times
    1189: 'cloud-rain', // Moderate rain
    1192: 'cloud-rain', // Heavy rain at times
    1195: 'cloud-rain', // Heavy rain
    1198: 'cloud-snow', // Light freezing rain
    1201: 'cloud-snow', // Moderate or heavy freezing rain
    1204: 'cloud-sleet', // Light sleet
    1207: 'cloud-sleet', // Moderate or heavy sleet
    1210: 'cloud-snow', // Patchy light snow
    1213: 'cloud-snow', // Light snow
    1216: 'cloud-snow', // Patchy moderate snow
    1219: 'cloud-snow', // Moderate snow
    1222: 'cloud-snow', // Patchy heavy snow
    1225: 'cloud-snow', // Heavy snow
    1237: 'cloud-snow', // Ice pellets
    1240: 'cloud-rain', // Light rain shower
    1243: 'cloud-rain', // Moderate or heavy rain shower
    1246: 'cloud-rain', // Torrential rain shower
    1249: 'cloud-sleet', // Light sleet showers
    1252: 'cloud-sleet', // Moderate or heavy sleet showers
    1255: 'cloud-snow', // Light snow showers
    1258: 'cloud-snow', // Moderate or heavy snow showers
    1261: 'cloud-snow', // Light showers of ice pellets
    1264: 'cloud-snow', // Moderate or heavy showers of ice pellets
    1273: 'cloud-lightning', // Patchy light rain with thunder
    1276: 'cloud-lightning', // Moderate or heavy rain with thunder
    1279: 'cloud-lightning', // Patchy light snow with thunder
    1282: 'cloud-lightning', // Moderate or heavy snow with thunder
  };

  return icons[code] || 'help-circle';
};