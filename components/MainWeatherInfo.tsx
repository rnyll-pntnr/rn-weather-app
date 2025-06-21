import moment from 'moment'
import { Text, View } from "react-native"
import { SunIcon } from 'react-native-heroicons/outline'

export default function MainWeatherInfo({ weather, location }: { weather: any, location: any }) {
    return (
        <View className="items-center mb-8 my-8">
            <Text className="text-3xl font-bold text-white">{location?.name || '..'}</Text>
            <Text className="text-1xl text-white">{location?.country || '..'}</Text>
            <Text className="text-lg text-white/80 mb-4">{moment(location?.localtime).format('dddd, D MMMM') ?? '..'}</Text>
            <View className="my-6">
                <SunIcon size={128} color={'white'} />
            </View>
            <Text className="text-7xl font-thin text-white">{weather?.temp_c || '..'}°</Text>
            <Text className="text-2xl text-white/90 capitalize mb-1">{weather?.condition.text || '..'}</Text>
            <Text className="text-lg text-white">Feels Like {weather?.feelslike_c || '..'}°</Text>
        </View>
    )
}