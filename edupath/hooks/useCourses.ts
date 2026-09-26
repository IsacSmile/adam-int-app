import { Course } from '../types/models';
import coursesData from '../data/courses.json';
import {
  getCoursesByCountry,
  getCoursesByUniversity,
  getCountriesByCourse,
  getUniversitiesByCourse,
} from '../utils/relations';

const courses: Course[] = coursesData as Course[];

export function useAllCourses(): Course[] {
  return courses;
}

export function useCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function useCoursesByCountry(countryId: string): Course[] {
  return getCoursesByCountry(countryId);
}

export function useCoursesByUniversity(universityId: string): Course[] {
  return getCoursesByUniversity(universityId);
}

export function useCountriesByCourse(courseId: string) {
  return getCountriesByCourse(courseId);
}

export function useUniversitiesByCourse(courseId: string) {
  return getUniversitiesByCourse(courseId);
}
