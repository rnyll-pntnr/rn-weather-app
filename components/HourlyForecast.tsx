import moment from 'moment';
import { ScrollView, Text, View } from 'react-native';
import { SunIcon } from 'react-native-heroicons/outline';

export default function HourlyForecast({ forecast }: { forecast: any }) {

    // const forecastData = forecast.filter((hour: any) => {
    //     const forecastTime = moment(hour.time)
    //     return forecastTime.isAfter(moment());
    // })

    return (
        <View className="bg-white/15 rounded-2xl p-6 mb-8">
            <Text className="text-lg font-bold text-white mb-4">Hourly Forecast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-6">
                {forecast.map((hour: any, i: number) => (
                    <View key={i} className="items-center mx-4">
                        <Text className="text-sm text-white/80">{moment(hour?.time).format('HH:mm') || '..'}</Text>
                        <View className="my-2">
                            <SunIcon color={'white'} />
                        </View>
                        <Text className="text-lg font-bold text-white">{hour?.temp_c || '..'}°</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}