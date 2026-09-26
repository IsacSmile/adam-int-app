import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { PLACEHOLDER_COLOR } from '../constants/colors';

export interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric';
  error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  error,
}) => {
  return (
    <View className="mb-4 w-full">
      <Text className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-700">
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={PLACEHOLDER_COLOR}
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
        className={`w-full rounded-xl border px-4 py-3 text-base text-gray-900 bg-white ${
          error ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-blue-600'
        }`}
      />
      {error ? <Text className="mt-1 text-xs font-medium text-red-600">{error}</Text> : null}
    </View>
  );
};

export default FormInput;
