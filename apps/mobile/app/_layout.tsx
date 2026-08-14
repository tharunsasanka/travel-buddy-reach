import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return <><StatusBar style="dark"/><Stack screenOptions={{ headerStyle: { backgroundColor: '#f6f3ea' }, headerTintColor: '#17352c', headerShadowVisible: false }}><Stack.Screen name="index" options={{ headerShown: false }}/><Stack.Screen name="destination/[slug]" options={{ title: 'Access profile' }}/></Stack></>;
}

