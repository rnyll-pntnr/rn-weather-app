import { Stack } from "expo-router";
import { SafeAreaView, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import '../assets/global.css';
import { WeatherProvider } from '@/context/WeatherContext';

export default function RootLayout() {
  return (
    <WeatherProvider>
      <SafeAreaView style={{ flex: 1 }} className="min-h-screen">
        <Stack>
          <StatusBar barStyle="light-content" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
        </Stack>
      </SafeAreaView>
    </WeatherProvider>
  );
}
