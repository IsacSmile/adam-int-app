import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { useCountryById } from '../../../hooks/useCountries';
import { useUniversitiesByCountry } from '../../../hooks/useUniversities';
import { InfoSection } from '../../../components/InfoSection';
import { Card } from '../../../components/Card';
import { PrimaryButton } from '../../../components/PrimaryButton';

export default function CountryDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const country = useCountryById(id || '');
  const universities = useUniversitiesByCountry(id || '');

  if (!country) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 p-6">
        <Text className="text-2xl font-bold text-gray-900 mb-2">Country Not Found</Text>
        <Text className="text-base text-gray-500 mb-6 text-center">
          The requested country details are unavailable or the ID is invalid.
        </Text>
        <PrimaryButton label="Back to Countries" onPress={() => router.replace('/countries')} />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 pt-4" contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      {/* Restyled Hero Header */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400 }}
        className="relative mb-6 overflow-hidden rounded-3xl bg-primary p-6 shadow-md"
      >
        <View className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-secondary/20" />
        <View className="flex-row items-center">
          {country.flagEmoji ? <Text className="mr-3.5 text-5xl">{country.flagEmoji}</Text> : null}
          <View className="flex-1">
            <Text className="text-3xl font-extrabold text-white">{country.name}</Text>
            <Text className="mt-1 text-xs font-semibold text-blue-100">
              {country.courseIds.length} Courses • {country.universityIds.length} Partner Universities
            </Text>
          </View>
        </View>
      </MotiView>

      {/* Info Sections in Exact Required Order with Subtle Mount Animation */}
      <MotiView from={{ opacity: 0, translateY: 8 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 350, delay: 100 }}>
        <InfoSection label="Overview" value={country.overview} />
        <InfoSection label="Why Study Here" value={country.whyStudy} />
        <InfoSection label="Education System" value={country.educationSystem} />
        <InfoSection label="Popular Programs" value={country.popularPrograms} />
        <InfoSection label="Tuition Fees" value={country.tuitionFees} />
        <InfoSection label="Cost of Living" value={country.costOfLiving} />
        <InfoSection label="Admission Requirements" value={country.admissionRequirements} />
        <InfoSection label="English Language Requirements" value={country.englishRequirements} />
        <InfoSection label="Intakes" value={country.intakes} />
        <InfoSection label="Visa Information" value={country.visaInfo} />
        <InfoSection label="Scholarships" value={country.scholarships} />
        <InfoSection label="Work Opportunities" value={country.workOpportunities} />
        <InfoSection label="Career Opportunities" value={country.careerOpportunities} />
        <InfoSection label="Application Process" value={country.applicationProcess} />
      </MotiView>

      {/* Universities in this Country */}
      <View className="mt-4 mb-6">
        <Text className="mb-3 text-lg font-bold text-gray-900">
          Universities in {country.name}
        </Text>
        {universities.length > 0 ? (
          universities.map((uni) => (
            <Card
              key={uni.id}
              title={uni.name}
              subtitle={uni.location}
              icon="school-outline"
              iconBgColor="bg-emerald-50"
              iconColor="#10B981"
              onPress={() => router.push(`/universities/${uni.id}`)}
            />
          ))
        ) : (
          <View className="p-4 bg-white rounded-2xl border border-gray-100 items-center justify-center">
            <Text className="text-sm font-medium text-gray-500">No universities listed yet</Text>
          </View>
        )}
      </View>

      {/* Action Button */}
      <View className="mt-2">
        <PrimaryButton
          label="Explore Courses"
          onPress={() =>
            router.push({
              pathname: '/courses',
              params: { countryId: country.id },
            })
          }
        />
      </View>
    </ScrollView>
  );
}
