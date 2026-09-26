import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { useUniversityById } from '../../../hooks/useUniversities';
import { useCountryById } from '../../../hooks/useCountries';
import { InfoSection } from '../../../components/InfoSection';
import { PrimaryButton } from '../../../components/PrimaryButton';

export default function UniversityDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const university = useUniversityById(id || '');
  const country = useCountryById(university?.countryId || '');

  if (!university) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 p-6">
        <Text className="text-2xl font-bold text-gray-900 mb-2">University Not Found</Text>
        <Text className="text-base text-gray-500 mb-6 text-center">
          The requested university details are unavailable or the ID is invalid.
        </Text>
        <PrimaryButton label="Back to Universities" onPress={() => router.replace('/universities')} />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 pt-4" contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      {/* University Restyled Hero Header with Graduation Cap Icon */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400 }}
        className="relative mb-6 overflow-hidden rounded-3xl bg-primary p-6 shadow-md"
      >
        <View className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-secondary/20" />
        <View className="flex-row items-center">
          <View className="mr-4 h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
            <Ionicons name="school-outline" size={32} color="#FFFFFF" />
          </View>
          <View className="flex-1">
            {country ? (
              <Text className="text-xs font-bold uppercase tracking-wider text-blue-200">
                {country.flagEmoji ? `${country.flagEmoji} ` : ''}{country.name}
              </Text>
            ) : null}
            <Text className="mt-1 text-2xl font-extrabold text-white">{university.name}</Text>
          </View>
        </View>
      </MotiView>

      {/* Info Sections in Exact Required Order */}
      <MotiView from={{ opacity: 0, translateY: 8 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 350, delay: 100 }}>
        <InfoSection label="Overview" value={university.overview} />
        <InfoSection label="Location" value={university.location} />
        <InfoSection label="Tuition Fees" value={university.tuitionFees} />
        <InfoSection label="Entry Requirements" value={university.entryRequirements} />
        <InfoSection label="Intakes" value={university.intakes} />
        <InfoSection label="Accommodation" value={university.accommodationInfo} />
        <InfoSection label="Application Requirements" value={university.applicationRequirements} />
        <InfoSection label="Scholarships" value={university.scholarships} />
        <InfoSection label="Admission Process" value={university.admissionProcess} />
      </MotiView>

      {/* Action Button */}
      <View className="mt-4">
        <PrimaryButton
          label="View Courses"
          onPress={() =>
            router.push({
              pathname: '/courses',
              params: { universityId: university.id },
            })
          }
        />
      </View>
    </ScrollView>
  );
}
