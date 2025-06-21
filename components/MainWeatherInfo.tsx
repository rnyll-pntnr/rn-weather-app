import { Image } from 'expo-image';
import moment from 'moment';
import { Text, View } from "react-native";

export default function MainWeatherInfo({ weather, location }: { weather: any, location: any }) {
    return (
        <View className="items-center mb-8 my-8">
            <Text className="text-3xl font-bold text-white">{location?.name || '..'}</Text>
            <Text className="text-1xl text-white">{location?.country || '..'}</Text>
            <Text className="text-lg text-white/80 mb-4">{moment(location?.localtime).format('dddd, D MMMM') ?? '..'}</Text>
            <View className="my-4">
                <Image
                    source={(weather?.condition?.icon && (`${(weather?.condition?.icon).replace('64x64', '128x128')}`)) || ''}
                    contentFit='cover'
                    style={{ width: 128, height: 128 }}
                    transition={1000}
                />
            </View>
            <Text className="text-5xl font-thin text-white">{weather?.temp_c || '..'}°</Text>
            <Text className="text-lg text-white/90 capitalize mb-1 text-center">{weather?.condition.text || '..'}</Text>
            <Text className="text-lg text-white">Feels Like {weather?.feelslike_c || '..'}°</Text>
        </View>
    )
}