import React, { useMemo } from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../constants/theme';

export default function ContactScreen() {
  const handleEmailPress = () => {
    Linking.openURL('mailto:support@edupath.app');
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 pt-4" contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      {/* Hero Header */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400 }}
        className="relative mb-6 overflow-hidden rounded-3xl bg-primary p-6 shadow-md"
      >
        <View className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-secondary/20" />
        <View className="flex-row items-center">
          <View className="mr-4 h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
            <Ionicons name="mail-outline" size={28} color="#FFFFFF" />
          </View>
          <View className="flex-1">
            <Text className="text-3xl font-extrabold text-white">Contact Us</Text>
            <Text className="mt-1 text-xs font-semibold text-blue-100">
              We're here to assist you with any questions about studying abroad.
            </Text>
          </View>
        </View>
      </MotiView>

      {/* Support Email Card */}
      <MotiView
        from={{ opacity: 0, translateY: 8 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 350, delay: 100 }}
        className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm mb-4"
      >
        <Text className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
          Direct Support Email
        </Text>

        <MotiPressable
          onPress={handleEmailPress}
          animate={useMemo(
            () => ({ pressed }: { pressed: boolean }) => {
              'worklet';
              return { scale: pressed ? 0.97 : 1 };
            },
            []
          )}
          transition={{ type: 'timing', duration: 150 }}
        >
          <View className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex-row items-center justify-between mb-4">
            <View className="flex-row items-center flex-1">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Ionicons name="mail" size={20} color="#FFFFFF" />
              </View>
              <View className="flex-1">
                <Text className="text-xs font-semibold text-gray-500">Official Support</Text>
                <Text className="text-base font-bold text-gray-900">support@edupath.app</Text>
              </View>
            </View>
            <Ionicons name="open-outline" size={18} color={colors.primary.DEFAULT} />
          </View>
        </MotiPressable>

        <View className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
          <Text className="text-xs font-medium text-gray-500">
            💬 Note: We'll be adding live chat support soon!
          </Text>
        </View>
      </MotiView>

      {/* Office Hours Card */}
      <MotiView
        from={{ opacity: 0, translateY: 8 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 350, delay: 200 }}
        className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm"
      >
        <Text className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
          Office Hours
        </Text>
        <Text className="text-sm font-medium text-gray-800 leading-6">
          Monday – Friday: 9:00 AM – 6:00 PM (CET)
        </Text>
      </MotiView>
    </ScrollView>
  );
}
