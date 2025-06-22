import { getCurrentWeather, getWeatherUsingCity } from "@/api/weather";
import AdditionalDetails from "@/components/AdditionalDetails";
import HourlyForecast from "@/components/HourlyForecast";
import MainWeatherInfo from "@/components/MainWeatherInfo";
import SevenDayForecasat from "@/components/SevenDayForecast";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, TextInput, View } from "react-native";
import IconFeather from "react-native-vector-icons/Feather";

export default function Selective() {
    const [weather, setWeather] = useState<any>(null);
    const [location, setLocation] = useState<any>(null);
    const [forecast, setForecast] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleWeatherSearch = async () => {
        try {
            setLoading(true);
            setError(null);
            const weatherData = await getWeatherUsingCity(searchQuery);
            const currentWeatherData = await getCurrentWeather(weatherData.location.lat, weatherData.location.lon);
            setWeather(currentWeatherData.current);
            setLocation(weatherData.location);
            setForecast(weatherData.forecast);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError('Error fetching weather data');
        } finally {
            setLoading(false);
        }
    }

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
                        <View className="items-center mb-8 my-8">
                            <View className="flex-row items-center bg-white/20 rounded-full px-4 py-2 mb-4">
                                <TextInput
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                    placeholder="Search for a city..."
                                    className="rounded-full px-4 py-2 text-white w-64"
                                    placeholderTextColor="white/70"
                                    style={{ fontSize: 16, textAlign: 'center' }}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType="search"
                                    onSubmitEditing={() => {
                                        handleWeatherSearch()
                                    }}
                                    clearButtonMode="while-editing"
                                    keyboardType="default"
                                    autoFocus={false}
                                    autoComplete="off"
                                    spellCheck={false}
                                    enablesReturnKeyAutomatically={true}
                                    returnKeyLabel="Search"
                                />
                                <IconFeather name="search" size={20} color="white" />
                            </View>
                        </View>
                        <MainWeatherInfo weather={weather} location={location} />
                        <AdditionalDetails weather={weather} />
                        <HourlyForecast forecast={forecast?.forecastday[0]?.hour || []} />
                        <SevenDayForecasat forecast={forecast?.forecastday || []} />
                    </ScrollView>
                )}
            </View>
        </LinearGradient>
    );
}
