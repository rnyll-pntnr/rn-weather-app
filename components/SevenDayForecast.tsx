import moment from 'moment';
import { Text, View } from 'react-native';
import { Image } from 'expo-image';

export default function SevenDayForecasat({ forecast }: { forecast?: any }) {
    return (
        <View className="bg-white/15 rounded-2xl p-6">
            <Text className="text-lg font-bold text-white mb-2">3-Day Forecast</Text>
            {forecast.map((day: any, i: number) => (
                <View
                    key={i}
                    className="flex-row items-center justify-between py-2 border-b border-white/20"
                >
                    <Text className="font-bold w-1/3 text-white">{moment(day.date).format('ddd') ?? '..'}</Text>
                    <View className="w-1/3 items-center">
                        <Image
                            source={day?.day?.condition?.icon || ''}
                            contentFit='cover'
                            style={{ width: 32, height: 32 }}
                            transition={1000}
                        />
                    </View>
                    <View className="w-1/3 flex-row justify-end space-x-4">
                        <Text className="font-medium text-white">H: {day?.day?.maxtemp_c || '..'}°</Text>
                        <Text className="font-medium text-white/70">L: {day?.day?.mintemp_c || '..'}°</Text>
                    </View>
                </View>
            ))}
        </View>
    )
}