import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MotiView } from 'moti';
import {
  useAllCourses,
  useCoursesByCountry,
  useCoursesByUniversity,
} from '../../../hooks/useCourses';
import { useCountryById } from '../../../hooks/useCountries';
import { useUniversityById } from '../../../hooks/useUniversities';
import { Card } from '../../../components/Card';
import { ScreenHeader } from '../../../components/ScreenHeader';
import { Course } from '../../../types/models';
import { formatCourseSubtitle } from '../../../utils/formatters';
import { getCourseIconMeta } from '../../../utils/courseIcons';

const FlatListTyped = FlatList as any;

export default function CoursesListScreen() {
  const router = useRouter();
  const listRef = useRef<any>(null);
  const { countryId, universityId } = useLocalSearchParams<{
    countryId?: string;
    universityId?: string;
  }>();

  const allCourses = useAllCourses();
  const countryCourses = useCoursesByCountry(countryId || '');
  const universityCourses = useCoursesByUniversity(universityId || '');

  const targetCountry = useCountryById(countryId || '');
  const targetUniversity = useUniversityById(universityId || '');

  const { courses, headerTitle, isFiltered } = useMemo(() => {
    if (universityId) {
      return {
        courses: universityCourses,
        headerTitle: targetUniversity ? `Courses at ${targetUniversity.name}` : 'Filtered Courses',
        isFiltered: true,
      };
    }
    if (countryId) {
      return {
        courses: countryCourses,
        headerTitle: targetCountry ? `Courses in ${targetCountry.name}` : 'Filtered Courses',
        isFiltered: true,
      };
    }
    return {
      courses: allCourses,
      headerTitle: 'Explore Courses',
      isFiltered: false,
    };
  }, [
    universityId,
    countryId,
    allCourses,
    countryCourses,
    universityCourses,
    targetCountry,
    targetUniversity,
  ]);

  // Scroll to top whenever filter params change
  useEffect(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [countryId, universityId]);

  const renderItem = ({ item, index }: { item: Course; index: number }) => {
    const { icon, bgColor, color } = getCourseIconMeta(item.name);
    return (
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 350, delay: Math.min(index * 60, 300) }}
      >
        <Card
          title={item.name}
          subtitle={formatCourseSubtitle(item.level, item.duration)}
          icon={icon}
          iconBgColor={bgColor}
          iconColor={color}
          onPress={() => router.push(`/courses/${item.id}`)}
        />
      </MotiView>
    );
  };

  return (
    <View className="flex-1 bg-gray-50 px-4 pt-4">
      <FlatListTyped
        ref={listRef}
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item: Course) => item.id}
        ListHeaderComponent={
          <View className="mb-2">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 mr-2">
                <ScreenHeader title={headerTitle} />
              </View>
              {isFiltered ? (
                <Pressable
                  onPress={() =>
                    router.setParams({ countryId: undefined, universityId: undefined })
                  }
                  className="mb-4 px-3 py-2 bg-blue-50 rounded-full border border-blue-200 active:bg-blue-100"
                >
                  <Text className="text-xs font-bold text-blue-600">Clear filter ✕</Text>
                </Pressable>
              ) : null}
            </View>
          </View>
        }
        ListEmptyComponent={
          <View className="py-12 items-center justify-center">
            <Text className="text-base font-medium text-gray-500">
              {isFiltered ? 'No courses found for this filter' : 'No courses found'}
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
