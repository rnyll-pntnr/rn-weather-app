import { getWeatherIcon } from '@/api/weather';
import FeatherIcon from '@expo/vector-icons/Feather';
import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function HourlyForecast({ forecast }: { forecast: any }) {
    const scrollViewRef = useRef<ScrollView>(null);
    const itemLayouts = useRef<{ [key: number]: number }>({}).current;

    useEffect(() => {
        if (forecast && forecast.length > 0) {
            const currentIndex = forecast.findIndex((hour: any) =>
                moment(hour?.time).isSame(moment(), 'hour')
            );

            if (currentIndex > -1) {
                const timeoutId = setTimeout(() => {
                    const xPosition = itemLayouts[currentIndex];
                    if (xPosition !== undefined && scrollViewRef.current) {
                        scrollViewRef.current.scrollTo({ x: xPosition, animated: true });
                    }
                }, 100);
                return () => clearTimeout(timeoutId);
            }
        }
    }, [forecast, itemLayouts])

    return (
        <View className="bg-white/15 rounded-2xl p-6 mb-8">
            <Text className="text-lg font-bold text-white mb-4">Hourly Forecast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={true}
                ref={scrollViewRef}
            >
                {forecast.map((hour: any, i: number) => (
                    <View
                        key={i}
                        onLayout={(event) => {
                            const { x } = event.nativeEvent.layout;
                            itemLayouts[i] = x;
                        }}
                        className={`items-center my-2 ${moment(hour?.time).isSame(moment(), 'hour') ? 'bg-white/20' : ''} p-4 rounded-lg mr-4`}
                    >
                        <Text className="text-sm text-white/80">{moment(hour?.time).format('HH:mm') || '..'}</Text>
                        <View className="my-2">
                            <FeatherIcon
                                name={getWeatherIcon(hour?.condition?.code || '', hour?.is_day)}
                                size={32}
                                color="white"
                            />
                        </View>
                        <Text className="text-lg font-bold text-white">{hour?.temp_c || '..'}°</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}