import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen name="fooldal" options={{
        title: 'Főoldal',
        tabBarIcon: ({ color, size }) =>
          <MaterialCommunityIcons name="home" color={color} size={size} />
      }} />
      <Tabs.Screen name="terkep" options={{
        title: 'Térkép',
        tabBarIcon: ({ color, size }) =>
          <MaterialCommunityIcons name="map" color={color} size={size} />
      }} />
    </Tabs>
  );
}