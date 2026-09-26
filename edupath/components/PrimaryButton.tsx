import React from 'react';
import { Text, Pressable } from 'react-native';

export interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, onPress, disabled }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`w-full py-4 px-6 bg-blue-600 rounded-2xl items-center justify-center shadow-sm ${
        disabled ? 'opacity-50 pointer-events-none' : 'active:bg-blue-700 active:opacity-90'
      }`}
    >
      <Text className="text-base font-bold text-white tracking-wide">{label}</Text>
    </Pressable>
  );
};

export default PrimaryButton;
