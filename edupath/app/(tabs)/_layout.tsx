import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Tabs, useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/theme';

function GlobalAppHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const isRootTab =
    pathname === '/' ||
    pathname === '/countries' ||
    pathname === '/courses' ||
    pathname === '/universities' ||
    pathname === '/profile';

  return (
    <SafeAreaView edges={['top']} className="bg-white">
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
        <View className="flex-row items-center">
          {!isRootTab ? (
            <Pressable
              onPress={() => router.back()}
              className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-gray-100 active:bg-gray-200"
            >
              <Ionicons name="arrow-back" size={20} color={colors.neutral.text} />
            </Pressable>
          ) : null}
          <Text className="text-2xl font-bold tracking-tight text-primary">
            Edu<Text className="text-secondary">path</Text>
          </Text>
        </View>
        <Pressable
          onPress={() => router.push('/profile')}
          className="h-10 w-10 items-center justify-center rounded-full bg-gray-100 active:bg-gray-200"
        >
          <Ionicons name="settings-outline" size={20} color={colors.neutral.text} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary.DEFAULT,
        headerShown: true,
        header: () => <GlobalAppHeader />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="countries"
        listeners={({ navigation }: { navigation: any }) => ({
          tabPress: () => {
            navigation.navigate('countries', { screen: 'index', params: {} });
          },
        })}
        options={{
          title: 'Countries',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="earth-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="courses"
        listeners={({ navigation }: { navigation: any }) => ({
          tabPress: () => {
            navigation.navigate('courses', { screen: 'index', params: {} });
          },
        })}
        options={{
          title: 'Courses',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="universities"
        listeners={({ navigation }: { navigation: any }) => ({
          tabPress: () => {
            navigation.navigate('universities', { screen: 'index', params: {} });
          },
        })}
        options={{
          title: 'Universities',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="school-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
