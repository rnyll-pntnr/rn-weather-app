import { getCurrentWeather } from "@/api/weather";
import AdditionalDetails from "@/components/AdditionalDetails";
import HourlyForecast from "@/components/HourlyForecast";
import MainWeatherInfo from "@/components/MainWeatherInfo";
import SevenDayForecasat from "@/components/SevenDayForecast";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from 'expo-location';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export default function Index() {
  const [weather, setWeather] = useState<any>(null);
  const [location, setLocation] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        setLoading(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      try {
        const weatherData = await getCurrentWeather(latitude, longitude);
        setWeather(weatherData.current);
        setLocation(weatherData.location);
        setForecast(weatherData.forecast);
      } catch (error) {
        setError('Error fetching weather data');
        console.log('Error fetching weather data:', error);
      } finally {
        setLoading(false);
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {loading ? (
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <ActivityIndicator size="large" color="#fff" />
            <Text className="text-white mt-4">Loading weather data...</Text>
          </View>
        ) : error ? (
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text className="text-red-500">{error}</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={{ padding: 16 }} className="text-white" style={{ flexGrow: 1, width: '100%' }}>
            <MainWeatherInfo weather={weather} location={location}/>
            <AdditionalDetails weather={weather}/>
            <HourlyForecast forecast={forecast?.forecastday[0]?.hour || []}/>
            <SevenDayForecasat forecast={forecast?.forecastday || []}/>
          </ScrollView>
        )}
      </View>
    </LinearGradient>

  );
}
