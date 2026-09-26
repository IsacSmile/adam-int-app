import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { InfoSection } from '../../../components/InfoSection';

export default function PrivacyPolicyScreen() {
  const useInfoList = [
    'Create and manage your account',
    'Personalize your experience within the app',
    'Allow our consultancy team to contact you regarding study-abroad guidance, if you choose to request assistance',
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 pt-4" contentContainerStyle={{ paddingBottom: 48 }} showsVerticalScrollIndicator={false}>
      {/* Privacy Policy Hero Header */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400 }}
        className="relative mb-6 overflow-hidden rounded-3xl bg-primary p-6 shadow-md"
      >
        <View className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-secondary/20" />
        <View className="flex-row items-center">
          <View className="mr-4 h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
            <Ionicons name="shield-checkmark-outline" size={28} color="#FFFFFF" />
          </View>
          <View className="flex-1">
            <Text className="text-3xl font-extrabold text-white">Privacy Policy</Text>
            <Text className="mt-1 text-xs font-semibold text-blue-100">
              Last updated: September 26, 2026
            </Text>
          </View>
        </View>
      </MotiView>

      {/* 8 Ordered Policy Sections via InfoSection */}
      <MotiView from={{ opacity: 0, translateY: 8 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 350, delay: 100 }}>
        <InfoSection
          label="1. Information We Collect"
          value="When you register on Edupath, we collect: username, email address, full name, phone number, qualification, and age. This information is provided directly by you during sign-up."
        />

        <InfoSection
          label="2. How We Use Your Information"
          value={useInfoList}
        />

        <InfoSection
          label="3. Data Storage"
          value="Your registration information is currently stored locally on your device."
        />

        <InfoSection
          label="4. Data Sharing"
          value="We do not sell your personal information to third parties."
        />

        <InfoSection
          label="5. Your Rights"
          value="You may update or delete your account information at any time by logging out and re-registering, or by contacting us at support@edupath.app to request deletion of your data."
        />

        <InfoSection
          label="6. Children's Privacy"
          value="Edupath is not intended for users under the age of 15. We do not knowingly collect data from children under this age."
        />

        <InfoSection
          label="7. Changes to This Policy"
          value="We may update this Privacy Policy from time to time. Continued use of the app after changes constitutes acceptance of the updated policy."
        />

        <InfoSection
          label="8. Contact Us"
          value="If you have questions about this Privacy Policy, contact us at support@edupath.app."
        />
      </MotiView>
    </ScrollView>
  );
}
