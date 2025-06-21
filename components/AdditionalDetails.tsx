import { Text, View } from 'react-native';
import { SunIcon, EyeIcon } from 'react-native-heroicons/outline';
import Icon from 'react-native-vector-icons/Feather'

export default function AdditionalDetails({ weather }: { weather: any }) {
    return (
        <View className="bg-white/15 rounded-2xl p-6 mb-8 flex-row justify-around">
            <View className='items-center'>
                <SunIcon color={'white'} size={32}/>
                <Text className="font-bold text-base text-white mt-1">{weather?.wind_kph || '..'} km/h</Text>
                <Text className="text-xs text-white/70">Wind</Text>
            </View>

            <View className='items-center'>
                <Icon name="droplet" size={32} color="white" />
                <Text className="font-bold text-base text-white mt-1">{weather?.humidity || '..'}%</Text>
                <Text className="text-xs text-white/70">Humidity</Text>
            </View>

            <View className='items-center'>
                <EyeIcon size={32} color="white" />
                <Text className="font-bold text-base text-white mt-1">{weather?.vis_km || '..'} KM</Text>
                <Text className="text-xs text-white/70">Visibility</Text>
            </View>
        </View>
    );
}