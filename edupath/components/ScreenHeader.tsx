import React from 'react';
import { Text } from 'react-native';

export interface ScreenHeaderProps {
  title: string;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title }) => {
  return (
    <Text className="mb-4 text-2xl font-bold text-gray-900">
      {title}
    </Text>
  );
};

export default ScreenHeader;
