import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#F0F7F4' },
        headerTintColor: '#2D3748',
        headerTitleStyle: { fontWeight: 'bold' },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: '#F0F7F4' },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="sos-ansiedade" options={{ title: 'SOS Ansiedade' }} />
      <Stack.Screen name="micropausa" options={{ title: 'Micropausa' }} />
      <Stack.Screen name="descarrego" options={{ title: 'Lixeira de Pensamentos' }} />
      <Stack.Screen name="acolhimento" options={{ title: 'Cartas de Acolhimento' }} />
    </Stack>
  );
}