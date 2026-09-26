import { University } from '../types/models';
import universitiesData from '../data/universities.json';
import {
  getUniversitiesByCountry,
  getUniversitiesByCourse,
  getCoursesByUniversity,
  getUniversitiesFiltered,
} from '../utils/relations';

const universities: University[] = universitiesData as University[];

export function useAllUniversities(): University[] {
  return universities;
}

export function useUniversityById(id: string): University | undefined {
  return universities.find((university) => university.id === id);
}

export function useUniversitiesByCountry(countryId: string): University[] {
  return getUniversitiesByCountry(countryId);
}

export function useUniversitiesByCourse(courseId: string): University[] {
  return getUniversitiesByCourse(courseId);
}

export function useCoursesByUniversity(universityId: string) {
  return getCoursesByUniversity(universityId);
}

export function useUniversitiesFiltered(countryId?: string, searchText?: string): University[] {
  return getUniversitiesFiltered(countryId, searchText);
}
