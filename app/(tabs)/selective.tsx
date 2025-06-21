import AdditionalDetails from "@/components/AdditionalDetails";
import HourlyForecast from "@/components/HourlyForecast";
import MainWeatherInfo from "@/components/MainWeatherInfo";
import SevenDayForecasat from "@/components/SevenDayForecast";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import IconFeather from "react-native-vector-icons/Feather";
import { getWeatherUsingCity } from "@/api/weather";

export default function Selective() {
    const [weather, setWeather] = useState<any>(null);
    const [location, setLocation] = useState<any>(null);
    const [forecast, setForecast] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleWeatherSearch = async () => {
        try {
            const weatherData = await getWeatherUsingCity(searchQuery);
            setWeather(weatherData.current);
            setLocation(weatherData.location);
            setForecast(weatherData.forecast);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    return (
        <LinearGradient
            colors={['#4A90E2', '#0E4D92']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="flex-1"
        >
            <ScrollView contentContainerStyle={{ padding: 16 }} className="text-white">
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
                                console.log('Searching for:', searchQuery);
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
        </LinearGradient>

    );
}
