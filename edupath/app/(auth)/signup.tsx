import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { FormInput } from '../../components/FormInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useUserStore } from '../../store/useUserStore';
import { validateSignupForm, SignupFormValues, FormErrors } from '../../utils/validators';

export default function SignupScreen() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const registerUser = useUserStore((state) => state.registerUser);

  const [form, setForm] = useState<SignupFormValues>({
    username: '',
    email: '',
    name: '',
    phone: '',
    qualification: '',
    age: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof SignupFormValues, text: string) => {
    setForm((prev) => ({ ...prev, [field]: text }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const isFormEmpty =
    !form.username.trim() ||
    !form.email.trim() ||
    !form.name.trim() ||
    !form.phone.trim() ||
    !form.qualification.trim() ||
    !form.age.trim();

  const handleSubmit = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const validationErrors = validateSignupForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    setErrors({});
    setUser(form);
    registerUser();
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50"
    >
      <ScrollView
        className="flex-1 px-4 pt-8"
        contentContainerStyle={{ paddingBottom: 48 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header Banner */}
        <View className="mb-6 rounded-3xl bg-blue-600 p-6 shadow-md">
          <Text className="text-3xl font-extrabold text-white">Edupath</Text>
          <Text className="mt-2 text-base font-medium leading-6 text-blue-100">
            Everything You Need to Know About Studying Abroad — In One Click.
          </Text>
        </View>

        {/* Title */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900">Create Your Account</Text>
          <Text className="mt-1 text-sm text-gray-500">
            Fill in your details to get personalized study abroad guidance.
          </Text>
        </View>

        {/* Form Inputs in Exact Required Order */}
        <FormInput
          label="Username"
          value={form.username}
          onChangeText={(text) => handleChange('username', text)}
          placeholder="e.g. johndoe"
          error={errors.username}
        />

        <FormInput
          label="Email"
          value={form.email}
          onChangeText={(text) => handleChange('email', text)}
          placeholder="e.g. john@example.com"
          keyboardType="email-address"
          error={errors.email}
        />

        <FormInput
          label="Full Name"
          value={form.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholder="e.g. John Doe"
          error={errors.name}
        />

        <FormInput
          label="Phone Number"
          value={form.phone}
          onChangeText={(text) => handleChange('phone', text)}
          placeholder="e.g. +1234567890"
          keyboardType="phone-pad"
          error={errors.phone}
        />

        <FormInput
          label="Qualification"
          value={form.qualification}
          onChangeText={(text) => handleChange('qualification', text)}
          placeholder="e.g. High School Diploma / Bachelor's"
          error={errors.qualification}
        />

        <FormInput
          label="Age"
          value={form.age}
          onChangeText={(text) => handleChange('age', text)}
          placeholder="e.g. 21"
          keyboardType="numeric"
          error={errors.age}
        />

        {/* Submit Button */}
        <View className="mt-4">
          <PrimaryButton
            label={isSubmitting ? 'Creating your account...' : 'Get Started'}
            onPress={handleSubmit}
            disabled={isFormEmpty || isSubmitting}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
