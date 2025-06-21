import { Image } from 'expo-image';
import moment from 'moment';
import { ScrollView, Text, View } from 'react-native';

export default function HourlyForecast({ forecast }: { forecast: any }) {

    return (
        <View className="bg-white/15 rounded-2xl p-6 mb-8">
            <Text className="text-lg font-bold text-white mb-4">Hourly Forecast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-6">
                {forecast.map((hour: any, i: number) => (
                    <View key={i} className="items-center mx-4">
                        <Text className="text-sm text-white/80">{moment(hour?.time).format('HH:mm') || '..'}</Text>
                        <View className="my-2">
                            <Image
                                source={hour?.condition?.icon || ''}
                                contentFit='cover'
                                style={{ width: 32, height: 32 }}
                                transition={1000}
                            />
                        </View>
                        <Text className="text-lg font-bold text-white">{hour?.temp_c || '..'}°</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}