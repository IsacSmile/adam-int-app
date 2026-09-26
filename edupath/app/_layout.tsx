import '../global.css';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { useUserStore } from '../store/useUserStore';
import { ACCENT_COLOR } from '../constants/colors';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [isHydrated, setIsHydrated] = useState(false);
  const isRegistered = useUserStore((state) => state.isRegistered);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (useUserStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }
    const unsubFinish = useUserStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    return () => {
      unsubFinish();
    };
  }, []);

  useEffect(() => {
    if (!isHydrated || !fontsLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isRegistered && !inAuthGroup) {
      router.replace('/(auth)/signup');
    } else if (isRegistered && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [isHydrated, fontsLoaded, isRegistered, segments]);

  if (!isHydrated || !fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color={ACCENT_COLOR} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
