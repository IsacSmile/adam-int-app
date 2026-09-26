import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { useCourseById } from '../../../hooks/useCourses';
import { useCountriesByCourse } from '../../../hooks/useCountries';
import { useUniversitiesByCourse } from '../../../hooks/useUniversities';
import { useAllCountries } from '../../../hooks/useCountries';
import { InfoSection } from '../../../components/InfoSection';
import { Card } from '../../../components/Card';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { formatUniversitySubtitle } from '../../../utils/formatters';
import { getCourseIconMeta } from '../../../utils/courseIcons';

export default function CourseDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const course = useCourseById(id || '');
  const countries = useCountriesByCourse(id || '');
  const universities = useUniversitiesByCourse(id || '');
  const allCountries = useAllCountries();

  const countryNameMap = React.useMemo(() => {
    return new Map(allCountries.map((c) => [c.id, c.name]));
  }, [allCountries]);

  if (!course) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 p-6">
        <Text className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</Text>
        <Text className="text-base text-gray-500 mb-6 text-center">
          The requested course details are unavailable or the ID is invalid.
        </Text>
        <PrimaryButton label="Back to Courses" onPress={() => router.replace('/courses')} />
      </View>
    );
  }

  const { icon, color } = getCourseIconMeta(course.name);

  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 pt-4" contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      {/* Course Restyled Hero Header with Prominent Icon */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400 }}
        className="relative mb-6 overflow-hidden rounded-3xl bg-primary p-6 shadow-md"
      >
        <View className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-secondary/20" />
        <View className="flex-row items-center">
          <View className="mr-4 h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
            <Ionicons name={icon} size={32} color="#FFFFFF" />
          </View>
          <View className="flex-1">
            <Text className="text-xs font-bold uppercase tracking-wider text-blue-200">
              {course.level} Degree • {course.duration}
            </Text>
            <Text className="mt-1 text-2xl font-extrabold text-white">{course.name}</Text>
          </View>
        </View>
      </MotiView>

      {/* Info Sections in Exact Required Order */}
      <MotiView from={{ opacity: 0, translateY: 8 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 350, delay: 100 }}>
        <InfoSection label="Description" value={course.description} />
        <InfoSection label="Level" value={course.level} />
        <InfoSection label="Duration" value={course.duration} />
        <InfoSection label="Entry Requirements" value={course.entryRequirements} />
        <InfoSection label="Tuition Fee" value={course.tuitionFee} />
        <InfoSection label="Intake" value={course.intake} />
      </MotiView>

      {/* Available Countries */}
      <View className="mt-4 mb-4">
        <Text className="mb-3 text-lg font-bold text-gray-900">Available Countries</Text>
        {countries.length > 0 ? (
          countries.map((country) => (
            <Card
              key={country.id}
              title={country.name}
              subtitle={`${country.universityIds.length} Partner Universities`}
              emoji={country.flagEmoji}
              onPress={() => router.push(`/countries/${country.id}`)}
            />
          ))
        ) : (
          <View className="p-4 bg-white rounded-2xl border border-gray-100 items-center justify-center">
            <Text className="text-sm font-medium text-gray-500">No countries listed yet</Text>
          </View>
        )}
      </View>

      {/* Available Universities */}
      <View className="mt-4 mb-4">
        <Text className="mb-3 text-lg font-bold text-gray-900">Available Universities</Text>
        {universities.length > 0 ? (
          universities.map((uni) => {
            const countryName = countryNameMap.get(uni.countryId);
            return (
              <Card
                key={uni.id}
                title={uni.name}
                subtitle={formatUniversitySubtitle(uni.location, countryName)}
                icon="school-outline"
                iconBgColor="bg-emerald-50"
                iconColor="#10B981"
                onPress={() => router.push(`/universities/${uni.id}`)}
              />
            );
          })
        ) : (
          <View className="p-4 bg-white rounded-2xl border border-gray-100 items-center justify-center">
            <Text className="text-sm font-medium text-gray-500">No universities listed yet</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
