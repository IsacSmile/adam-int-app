import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { Ionicons } from '@expo/vector-icons';
import { useUniversitiesFiltered } from '../../../hooks/useUniversities';
import { useAllCountries } from '../../../hooks/useCountries';
import { Card } from '../../../components/Card';
import { ScreenHeader } from '../../../components/ScreenHeader';
import { University } from '../../../types/models';
import { formatUniversitySubtitle } from '../../../utils/formatters';
import { PLACEHOLDER_COLOR } from '../../../constants/colors';
import { colors } from '../../../constants/theme';

export default function UniversitiesListScreen() {
  const router = useRouter();
  const [selectedCountryId, setSelectedCountryId] = useState<string>('all');
  const [searchText, setSearchText] = useState<string>('');

  const countries = useAllCountries();
  const universities = useUniversitiesFiltered(selectedCountryId, searchText);

  const countryNameMap = useMemo(() => {
    return new Map(countries.map((country) => [country.id, country.name]));
  }, [countries]);

  const renderItem = ({ item, index }: { item: University; index: number }) => {
    const countryName = countryNameMap.get(item.countryId);
    const subtitle = formatUniversitySubtitle(item.location, countryName);

    return (
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 350, delay: Math.min(index * 60, 300) }}
      >
        <Card
          title={item.name}
          subtitle={subtitle}
          icon="school-outline"
          iconBgColor="bg-emerald-50"
          iconColor="#10B981"
          onPress={() => router.push(`/universities/${item.id}`)}
        />
      </MotiView>
    );
  };

  return (
    <View className="flex-1 bg-gray-50 px-4 pt-4">
      <FlatList
        data={universities}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View className="mb-4">
            <ScreenHeader title="Explore Universities" />

            {/* Search Input with Icon */}
            <View className="mb-3 w-full flex-row items-center rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-primary">
              <Ionicons name="search-outline" size={20} color={PLACEHOLDER_COLOR} className="mr-3" />
              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search university by name..."
                placeholderTextColor={PLACEHOLDER_COLOR}
                className="flex-1 text-base text-gray-900 font-medium"
              />
              {searchText.length > 0 ? (
                <MotiPressable
                  onPress={() => setSearchText('')}
                  animate={useMemo(
                    () => ({ pressed }: { pressed: boolean }) => {
                      'worklet';
                      return { scale: pressed ? 0.9 : 1 };
                    },
                    []
                  )}
                >
                  <Ionicons name="close-circle" size={18} color={colors.neutral.muted} />
                </MotiPressable>
              ) : null}
            </View>

            {/* Country Filter Chips Horizontal Scroll */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="py-1"
              contentContainerStyle={{ paddingRight: 16 }}
            >
              <MotiPressable
                onPress={() => setSelectedCountryId('all')}
                animate={useMemo(
                  () => ({ pressed }: { pressed: boolean }) => {
                    'worklet';
                    return { scale: pressed ? 0.95 : 1 };
                  },
                  []
                )}
                transition={{ type: 'timing', duration: 150 }}
                style={{ marginRight: 8 }}
              >
                <View
                  className={`px-4 py-2 rounded-full border ${
                    selectedCountryId === 'all'
                      ? 'bg-primary border-primary shadow-sm'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <Text
                    className={`text-xs font-bold ${
                      selectedCountryId === 'all' ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    All
                  </Text>
                </View>
              </MotiPressable>

              {countries.map((country) => {
                const isSelected = selectedCountryId === country.id;
                return (
                  <MotiPressable
                    key={country.id}
                    onPress={() => setSelectedCountryId(country.id)}
                    animate={useMemo(
                      () => ({ pressed }: { pressed: boolean }) => {
                        'worklet';
                        return { scale: pressed ? 0.95 : 1 };
                      },
                      []
                    )}
                    transition={{ type: 'timing', duration: 150 }}
                    style={{ marginRight: 8 }}
                  >
                    <View
                      className={`px-4 py-2 rounded-full border ${
                        isSelected
                          ? 'bg-primary border-primary shadow-sm'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <Text
                        className={`text-xs font-bold ${
                          isSelected ? 'text-white' : 'text-gray-700'
                        }`}
                      >
                        {country.flagEmoji ? `${country.flagEmoji} ` : ''}
                        {country.name}
                      </Text>
                    </View>
                  </MotiPressable>
                );
              })}
            </ScrollView>
          </View>
        }
        ListEmptyComponent={
          <View className="py-12 items-center justify-center">
            <Text className="text-base font-medium text-gray-500">
              No universities match your search
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
