import { Stack } from 'expo-router';
import React from 'react';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="details" options={{ title: 'Részletek' }} />
        <Stack.Screen name="tortenetek" options={{ title:"" }}/>
      </Stack>
    </PaperProvider>
  );
}