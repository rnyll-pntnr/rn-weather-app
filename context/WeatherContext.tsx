import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import * as Location from 'expo-location';
import { getCurrentWeather, getCurrentWeatherForecast } from '@/api/weather';

interface WeatherData {
  current: any;
  location: any;
  forecast: any;
}

interface WeatherContextType {
  weather: any;
  location: any;
  forecast: any;
  loading: boolean;
  error: string | null;
  fetchWeatherData: () => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<any>(null);
  const [location, setLocation] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        setLoading(false);
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;

      const currentWeatherData = await getCurrentWeather(latitude, longitude);
      const weatherData = await getCurrentWeatherForecast(latitude, longitude);
      setWeather(currentWeatherData.current);
      setLocation(weatherData.location);
      setForecast(weatherData.forecast);
    } catch (err) {
      setError('Error fetching weather data');
      console.error('Error fetching weather data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <WeatherContext.Provider value={{ weather, location, forecast, loading, error, fetchWeatherData }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
