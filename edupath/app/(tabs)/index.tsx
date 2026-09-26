import React, { useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { Ionicons } from '@expo/vector-icons';
import { TabButton } from '../../components/TabButton';
import { useAllCountries } from '../../hooks/useCountries';
import { useAllCourses } from '../../hooks/useCourses';
import { useAllUniversities } from '../../hooks/useUniversities';
import { colors } from '../../constants/theme';

export default function HomeScreen() {
  const router = useRouter();
  const allCountries = useAllCountries();
  const countriesCount = allCountries.length;
  const coursesCount = useAllCourses().length;
  const universitiesCount = useAllUniversities().length;

  const popularCountries = useMemo(() => allCountries.slice(0, 4), [allCountries]);

  const valueProps = [
    {
      id: 'verified',
      title: 'Verified Universities',
      subtitle: 'Direct institutional data',
      icon: 'checkmark-circle-outline' as const,
      color: '#10B981',
      bgColor: 'bg-emerald-50',
    },
    {
      id: 'data',
      title: 'Real Student Data',
      subtitle: 'Accurate fees & intakes',
      icon: 'stats-chart-outline' as const,
      color: colors.primary.DEFAULT,
      bgColor: 'bg-blue-50',
    },
    {
      id: 'discovery',
      title: 'One-Click Discovery',
      subtitle: 'Interconnected search',
      icon: 'compass-outline' as const,
      color: '#8B5CF6',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 pt-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* 1. Hero Banner with Moti Entrance & Subtle Depth Circle */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400 }}
        className="relative mb-6 overflow-hidden rounded-3xl bg-primary p-6 shadow-md"
      >
        {/* Lighter accent shape in corner for visual depth */}
        <View className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-secondary/20" />
        <View className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10" />

        <Text className="text-3xl font-extrabold tracking-tight text-white">Edupath</Text>
        <Text className="mt-2 text-sm font-medium leading-5 text-blue-100">
          Everything You Need to Know About Studying Abroad — In One Click.
        </Text>
      </MotiView>

      {/* 2. Explore Categories Navigation Cards with Staggered Entrance */}
      <View className="mb-6">
        <Text className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
          Explore Categories
        </Text>

        <MotiView
          from={{ opacity: 0, translateY: 8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 350, delay: 100 }}
        >
          <TabButton
            title="Countries"
            subtitle={`${countriesCount} destinations available`}
            iconName="earth-outline"
            iconBgColor="bg-blue-50"
            iconColor={colors.primary.DEFAULT}
            onPress={() => router.push('/countries')}
          />
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 350, delay: 200 }}
        >
          <TabButton
            title="Courses"
            subtitle={`${coursesCount} academic programs`}
            iconName="book-outline"
            iconBgColor="bg-purple-50"
            iconColor="#8B5CF6"
            onPress={() => router.push('/courses')}
          />
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 350, delay: 300 }}
        >
          <TabButton
            title="Universities"
            subtitle={`${universitiesCount} partner institutions`}
            iconName="school-outline"
            iconBgColor="bg-emerald-50"
            iconColor="#10B981"
            onPress={() => router.push('/universities')}
          />
        </MotiView>
      </View>

      {/* 3. Why Choose Edupath Section */}
      <View className="mb-6">
        <Text className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
          Why Choose Edupath
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 px-4 py-1">
          {valueProps.map((item, index) => (
            <MotiView
              key={item.id}
              from={{ opacity: 0, translateX: 15 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'timing', duration: 350, delay: 150 + index * 100 }}
              className="mr-3 w-52 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <View className={`mb-3 h-10 w-10 items-center justify-center rounded-xl ${item.bgColor}`}>
                <Ionicons name={item.icon} size={22} color={item.color} />
              </View>
              <Text className="text-sm font-bold text-gray-900">{item.title}</Text>
              <Text className="mt-1 text-xs font-medium text-gray-500">{item.subtitle}</Text>
            </MotiView>
          ))}
        </ScrollView>
      </View>

      {/* 4. Popular Destinations Section */}
      <View className="mb-4">
        <Text className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
          Popular Destinations
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 px-4 py-1">
          {popularCountries.map((country, index) => (
            <MotiView
              key={country.id}
              from={{ opacity: 0, translateX: 15 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'timing', duration: 350, delay: 200 + index * 100 }}
              className="mr-3"
            >
              <MotiPressable
                onPress={() => router.push(`/countries/${country.id}`)}
                animate={useMemo(
                  () => ({ pressed }: { pressed: boolean }) => {
                    'worklet';
                    return {
                      scale: pressed ? 0.96 : 1,
                    };
                  },
                  []
                )}
                transition={{ type: 'timing', duration: 150 }}
              >
                <View className="w-44 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex-row items-center">
                  <Text className="mr-3 text-3xl">{country.flagEmoji}</Text>
                  <View className="flex-1">
                    <Text className="text-sm font-bold text-gray-900" numberOfLines={1}>
                      {country.name}
                    </Text>
                    <Text className="mt-0.5 text-xs font-semibold text-primary">
                      {country.courseIds.length} Courses
                    </Text>
                  </View>
                </View>
              </MotiPressable>
            </MotiView>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
