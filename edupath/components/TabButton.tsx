import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { MotiPressable } from 'moti/interactions';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';

export interface TabButtonProps {
  title: string;
  subtitle?: string;
  emoji?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconBgColor?: string;
  iconColor?: string;
  onPress: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({
  title,
  subtitle,
  emoji,
  iconName,
  iconBgColor = 'bg-blue-50',
  iconColor = colors.primary.DEFAULT,
  onPress,
}) => {
  return (
    <MotiPressable
      onPress={onPress}
      animate={useMemo(
        () => ({ pressed }: { pressed: boolean }) => {
          'worklet';
          return {
            scale: pressed ? 0.97 : 1,
          };
        },
        []
      )}
      transition={{ type: 'timing', duration: 150 }}
      style={{ marginBottom: 12 }}
    >
      <View className="p-4 bg-white rounded-2xl border border-neutral-border shadow-sm flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          {iconName ? (
            <View className={`mr-4 h-12 w-12 items-center justify-center rounded-2xl ${iconBgColor}`}>
              <Ionicons name={iconName} size={24} color={iconColor} />
            </View>
          ) : emoji ? (
            <View className="mr-4 h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
              <Text className="text-2xl">{emoji}</Text>
            </View>
          ) : null}
          <View className="flex-1">
            <Text className="text-base font-bold text-neutral-text">{title}</Text>
            {subtitle ? (
              <Text className="mt-0.5 text-xs font-semibold text-primary">{subtitle}</Text>
            ) : null}
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.neutral.muted} />
      </View>
    </MotiPressable>
  );
};

export default TabButton;
