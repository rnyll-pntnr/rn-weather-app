import { Stack } from "expo-router";
import { SafeAreaView, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import '../assets/global.css';

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1 }} className="min-h-screen">
      <Stack>
        <StatusBar barStyle="light-content" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false, header: () => null }}/>
      </Stack>
    </SafeAreaView>
  );
}
