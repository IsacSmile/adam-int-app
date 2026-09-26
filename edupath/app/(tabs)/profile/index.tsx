import React, { useMemo } from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore, UserState } from '../../../store/useUserStore';
import { InfoSection } from '../../../components/InfoSection';
import { colors } from '../../../constants/theme';

export default function ProfileScreen() {
  const router = useRouter();

  const name = useUserStore((state: UserState) => state.name);
  const username = useUserStore((state: UserState) => state.username);
  const email = useUserStore((state: UserState) => state.email);
  const phone = useUserStore((state: UserState) => state.phone);
  const qualification = useUserStore((state: UserState) => state.qualification);
  const age = useUserStore((state: UserState) => state.age);
  const resetUser = useUserStore((state: UserState) => state.resetUser);

  const appVersion = Constants.expoConfig?.version || '1.0.0';

  const handleLogout = () => {
    resetUser();
    router.replace('/(auth)/signup');
  };

  const initialLetter = name ? name.trim().charAt(0).toUpperCase() : 'S';

  const navRows = [
    {
      id: 'about',
      label: 'About Us',
      icon: 'information-circle-outline' as const,
      route: '/profile/about',
      bgColor: 'bg-blue-50',
      iconColor: colors.primary.DEFAULT,
    },
    {
      id: 'contact',
      label: 'Contact Us',
      icon: 'mail-outline' as const,
      route: '/profile/contact',
      bgColor: 'bg-purple-50',
      iconColor: '#8B5CF6',
    },
    {
      id: 'privacy',
      label: 'Privacy Policy',
      icon: 'shield-checkmark-outline' as const,
      route: '/profile/privacy-policy',
      bgColor: 'bg-emerald-50',
      iconColor: '#10B981',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 pt-4" contentContainerStyle={{ paddingBottom: 48 }} showsVerticalScrollIndicator={false}>
      {/* 1. Restyled Hero Header Card with Avatar */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400 }}
        className="relative mb-6 overflow-hidden rounded-3xl bg-primary p-6 shadow-md"
      >
        <View className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-secondary/20" />
        <View className="flex-row items-center">
          <View className="mr-4 h-16 w-16 items-center justify-center rounded-full bg-white/20 border-2 border-white/30">
            <Text className="text-2xl font-extrabold text-white">{initialLetter}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-2xl font-extrabold text-white" numberOfLines={1}>
              {name || 'Student Candidate'}
            </Text>
            <Text className="mt-0.5 text-xs font-semibold text-blue-100">
              @{username || 'user'} • {email || 'no email'}
            </Text>
          </View>
        </View>
      </MotiView>

      {/* 2. Read-only User Data via InfoSection Cards */}
      <MotiView from={{ opacity: 0, translateY: 8 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 350, delay: 100 }}>
        <Text className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
          Personal Information
        </Text>
        <InfoSection label="Full Name" value={name || 'Not provided'} />
        <InfoSection label="Username" value={username || 'Not provided'} />
        <InfoSection label="Email Address" value={email || 'Not provided'} />
        <InfoSection label="Phone Number" value={phone || 'Not provided'} />
        <InfoSection label="Highest Qualification" value={qualification || 'Not provided'} />
        <InfoSection label="Age" value={age ? `${age} years old` : 'Not provided'} />
      </MotiView>

      {/* 3. Navigation Rows Card */}
      <MotiView from={{ opacity: 0, translateY: 8 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 350, delay: 200 }} className="mt-2 mb-6">
        <Text className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
          App & Legal
        </Text>
        <View className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden p-2">
          {navRows.map((row, idx) => (
            <MotiPressable
              key={row.id}
              onPress={() => router.push(row.route as any)}
              animate={useMemo(
                () => ({ pressed }: { pressed: boolean }) => {
                  'worklet';
                  return { scale: pressed ? 0.98 : 1 };
                },
                []
              )}
              transition={{ type: 'timing', duration: 150 }}
            >
              <View className={`p-3.5 flex-row items-center justify-between ${idx < navRows.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <View className="flex-row items-center flex-1">
                  <View className={`mr-3.5 h-10 w-10 items-center justify-center rounded-xl ${row.bgColor}`}>
                    <Ionicons name={row.icon} size={20} color={row.iconColor} />
                  </View>
                  <Text className="text-base font-semibold text-gray-900">{row.label}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.neutral.muted} />
              </View>
            </MotiPressable>
          ))}
        </View>
      </MotiView>

      {/* 4. Visually Distinct Destructive Outlined Log Out Button */}
      <MotiView from={{ opacity: 0, translateY: 8 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 350, delay: 300 }}>
        <MotiPressable
          onPress={handleLogout}
          animate={useMemo(
            () => ({ pressed }: { pressed: boolean }) => {
              'worklet';
              return { scale: pressed ? 0.97 : 1 };
            },
            []
          )}
          transition={{ type: 'timing', duration: 150 }}
        >
          <View className="w-full py-4 rounded-2xl border-2 border-red-500 bg-white items-center justify-center shadow-sm active:bg-red-50">
            <Text className="text-base font-bold text-red-600">Log Out</Text>
          </View>
        </MotiPressable>
      </MotiView>

      {/* 5. Developer Credit Footer with App Version, Instagram & GitHub Links */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 400, delay: 350 }}
        className="mt-8 mb-4 items-center justify-center"
      >
        <Text className="text-xs font-semibold text-gray-400 mb-1">
          Edupath v{appVersion}
        </Text>
        <Text className="text-xs font-semibold text-gray-400 mb-3">
          Engineered by Faiz.I
        </Text>
        <View className="flex-row items-center justify-center">
          <MotiPressable
            onPress={() => Linking.openURL('https://www.instagram.com/faiz_imam__/')}
            animate={useMemo(
              () => ({ pressed }: { pressed: boolean }) => {
                'worklet';
                return { scale: pressed ? 0.9 : 1 };
              },
              []
            )}
            transition={{ type: 'timing', duration: 150 }}
          >
            <View className="h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm mx-2">
              <Ionicons name="logo-instagram" size={20} color="#E1306C" />
            </View>
          </MotiPressable>

          <MotiPressable
            onPress={() => Linking.openURL('https://github.com/IsacSmile')}
            animate={useMemo(
              () => ({ pressed }: { pressed: boolean }) => {
                'worklet';
                return { scale: pressed ? 0.9 : 1 };
              },
              []
            )}
            transition={{ type: 'timing', duration: 150 }}
          >
            <View className="h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm mx-2">
              <Ionicons name="logo-github" size={20} color="#181717" />
            </View>
          </MotiPressable>
        </View>
      </MotiView>
    </ScrollView>
  );
}
