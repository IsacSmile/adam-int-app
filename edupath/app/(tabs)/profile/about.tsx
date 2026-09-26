import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../constants/theme';

export default function AboutScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 pt-4" contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      {/* Hero Banner Header */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400 }}
        className="relative mb-6 overflow-hidden rounded-3xl bg-primary p-6 shadow-md"
      >
        <View className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-secondary/20" />
        <View className="flex-row items-center">
          <View className="mr-4 h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
            <Ionicons name="globe-outline" size={28} color="#FFFFFF" />
          </View>
          <View className="flex-1">
            <Text className="text-3xl font-extrabold text-white">About Edupath</Text>
            <Text className="mt-1 text-xs font-semibold text-blue-100">
              Empowering students to navigate international education seamlessly.
            </Text>
          </View>
        </View>
      </MotiView>

      {/* Main Content Card */}
      <MotiView
        from={{ opacity: 0, translateY: 8 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 350, delay: 100 }}
        className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm mb-4"
      >
        <Text className="text-sm font-medium leading-6 text-gray-800 mb-4">
          Edupath is a premier study-abroad consultancy and information platform dedicated to simplifying higher education search for students worldwide. We connect aspiring international students with accredited universities, top-tier degree programs, and visa requirements across European study destinations.
        </Text>
        <Text className="text-sm font-medium leading-6 text-gray-800 mb-4">
          Our mission is to provide transparent, comprehensive, and up-to-date guidance on tuition fees, entry requirements, living expenses, and post-study career opportunities. Whether you are looking for undergraduate studies or specialized master's degrees, Edupath brings everything you need under one digital roof.
        </Text>
        <Text className="text-sm font-medium leading-6 text-gray-800">
          By combining accurate university metrics with intuitive digital tools, Edupath helps students and parents make confident, informed decisions about their academic future abroad.
        </Text>
      </MotiView>
    </ScrollView>
  );
}
