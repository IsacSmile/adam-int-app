import React from 'react';
import { View, Text } from 'react-native';

const ViewTyped = View as any;

export interface InfoSectionProps {
  label: string;
  value: string | string[];
}

export const InfoSection: React.FC<InfoSectionProps> = ({ label, value }) => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return null;
  }

  return (
    <View className="mb-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
      <Text className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
        {label}
      </Text>
      {Array.isArray(value) ? (
        <View className="mt-1">
          {value.map((item, index) => (
            <ViewTyped key={index} className="flex-row items-start mb-1.5">
              <Text className="mr-2 text-primary font-bold text-base">•</Text>
              <Text className="text-sm font-medium leading-6 text-neutral-text flex-1">{item}</Text>
            </ViewTyped>
          ))}
        </View>
      ) : (
        <Text className="text-sm font-medium leading-6 text-neutral-text">{value}</Text>
      )}
    </View>
  );
};

export default InfoSection;
