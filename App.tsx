import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppFonts } from './src/theme/fonts';
import { RootShell } from './src/RootShell';
import { color } from './src/theme/tokens';

export default function App() {
  const [fontsLoaded] = useAppFonts();

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: color.screen }} />;
  }

  return (
    <SafeAreaProvider>
      <RootShell />
    </SafeAreaProvider>
  );
}
