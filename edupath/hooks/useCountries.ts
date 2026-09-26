import { Country } from '../types/models';
import countriesData from '../data/countries.json';
import {
  getCountriesByCourse,
  getCoursesByCountry,
  getUniversitiesByCountry,
} from '../utils/relations';

const countries: Country[] = countriesData as Country[];

export function useAllCountries(): Country[] {
  return countries;
}

export function useCountryById(id: string): Country | undefined {
  return countries.find((country) => country.id === id);
}

export function useCountriesByCourse(courseId: string): Country[] {
  return getCountriesByCourse(courseId);
}

export function useCoursesByCountry(countryId: string) {
  return getCoursesByCountry(countryId);
}

export function useUniversitiesByCountry(countryId: string) {
  return getUniversitiesByCountry(countryId);
}
