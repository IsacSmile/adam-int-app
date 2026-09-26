import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { Ionicons } from '@expo/vector-icons';
import { useAllCountries } from '../../../hooks/useCountries';
import { Card } from '../../../components/Card';
import { ScreenHeader } from '../../../components/ScreenHeader';
import { Country } from '../../../types/models';
import { PLACEHOLDER_COLOR } from '../../../constants/colors';
import { colors } from '../../../constants/theme';

export default function CountriesListScreen() {
  const router = useRouter();
  const allCountries = useAllCountries();
  const [searchText, setSearchText] = useState('');

  const filteredCountries = useMemo(() => {
    if (!searchText.trim()) return allCountries;
    const query = searchText.toLowerCase().trim();
    return allCountries.filter((c) => c.name.toLowerCase().includes(query));
  }, [allCountries, searchText]);

  const renderItem = ({ item, index }: { item: Country; index: number }) => (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 350, delay: Math.min(index * 50, 300) }}
    >
      <Card
        title={item.name}
        subtitle={`${item.courseIds.length} Available Courses`}
        emoji={item.flagEmoji}
        onPress={() => router.push(`/countries/${item.id}`)}
      />
    </MotiView>
  );

  return (
    <View className="flex-1 bg-gray-50 px-4 pt-4">
      <FlatList
        data={filteredCountries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View className="mb-4">
            <ScreenHeader title="Explore Countries" />
            <View className="mb-2 flex-row items-center rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-primary">
              <Ionicons name="search-outline" size={20} color={PLACEHOLDER_COLOR} className="mr-3" />
              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search country by name..."
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
          </View>
        }
        ListEmptyComponent={
          <View className="py-12 items-center justify-center">
            <Text className="text-base font-medium text-gray-500">No countries match your search</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
