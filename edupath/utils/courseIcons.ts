import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';

export interface CourseIconMeta {
  icon: keyof typeof Ionicons.glyphMap;
  bgColor: string;
  color: string;
}

export const COURSE_ICON_MAP: Record<string, CourseIconMeta> = {
  'Business Administration': {
    icon: 'briefcase-outline',
    bgColor: 'bg-blue-50',
    color: colors.primary.DEFAULT,
  },
  'Computer Science': {
    icon: 'code-slash-outline',
    bgColor: 'bg-indigo-50',
    color: '#6366F1',
  },
  'Mechanical Engineering': {
    icon: 'cog-outline',
    bgColor: 'bg-orange-50',
    color: '#F97316',
  },
  'Civil Engineering': {
    icon: 'business-outline',
    bgColor: 'bg-amber-50',
    color: '#D97706',
  },
  'Data Science': {
    icon: 'bar-chart-outline',
    bgColor: 'bg-purple-50',
    color: '#8B5CF6',
  },
  'Hospitality Management': {
    icon: 'restaurant-outline',
    bgColor: 'bg-rose-50',
    color: '#F43F5E',
  },
};

export function getCourseIconMeta(courseName: string): CourseIconMeta {
  return (
    COURSE_ICON_MAP[courseName] || {
      icon: 'book-outline',
      bgColor: 'bg-blue-50',
      color: colors.primary.DEFAULT,
    }
  );
}
