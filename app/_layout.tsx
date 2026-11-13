import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Aqui o Expo Router carregará automaticamente o nosso index.tsx e as futuras telas */}
      <Stack.Screen name="index" />
    </Stack>
  );
}