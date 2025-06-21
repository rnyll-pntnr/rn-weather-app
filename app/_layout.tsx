import { Slot } from "expo-router";
import { SafeAreaView, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import '../assets/global.css';

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} className="min-h-screen">
      <StatusBar barStyle="light-content" />
      <Slot />
    </SafeAreaView>
  );
}
