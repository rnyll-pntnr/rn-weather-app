import { getCurrentWeather } from "@/api/weather";
import AdditionalDetails from "@/components/AdditionalDetails";
import HourlyForecast from "@/components/HourlyForecast";
import MainWeatherInfo from "@/components/MainWeatherInfo";
import SevenDayForecasat from "@/components/SevenDayForecast";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from 'expo-location';
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

export default function Index() {
  const [weather, setWeather] = useState<any>(null);
  const [location, setLocation] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return
      }
      
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      try {
        const weatherData = await getCurrentWeather(latitude, longitude);
        setWeather(weatherData.current);
        setLocation(weatherData.location);
        setForecast(weatherData.forecast);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    })()
  }, [])

  return (
    <LinearGradient
      colors={['#4A90E2', '#0E4D92']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      className="flex-1"
    >
      <ScrollView contentContainerStyle={{ padding: 16 }} className="text-white">
        <MainWeatherInfo weather={weather} location={location}/>
        <AdditionalDetails weather={weather}/>
        <HourlyForecast forecast={forecast?.forecastday[0]?.hour || []}/>
        <SevenDayForecasat forecast={forecast?.forecastday || []}/>
      </ScrollView>
    </LinearGradient>

  );
}
