import AdditionalDetails from "@/components/AdditionalDetails";
import HourlyForecast from "@/components/HourlyForecast";
import MainWeatherInfo from "@/components/MainWeatherInfo";
import SevenDayForecasat from "@/components/SevenDayForecast";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useWeather } from '@/context/WeatherContext';

export default function Index() {
  const { weather, location, forecast, loading, error } = useWeather();

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
          <ScrollView contentContainerStyle={{ padding: 16 }} className="text-white" style={{ flexGrow: 1, width: '100%' }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <MainWeatherInfo weather={weather} location={location}/>
            <AdditionalDetails weather={weather}/>
            <HourlyForecast forecast={forecast?.forecastday[0]?.hour || []} tzId={location?.tz_id || 'UTC'}/>
            <SevenDayForecasat forecast={forecast?.forecastday || []}/>
          </ScrollView>
        )}
      </View>
    </LinearGradient>

  );
}
