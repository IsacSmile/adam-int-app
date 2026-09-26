import { Country, Course, University } from '../types/models';
import countriesData from '../data/countries.json';
import coursesData from '../data/courses.json';
import universitiesData from '../data/universities.json';

const countries: Country[] = countriesData as Country[];
const courses: Course[] = coursesData as Course[];
const universities: University[] = universitiesData as University[];

export function getCountriesByCourse(courseId: string): Country[] {
  return countries.filter((country) => country.courseIds.includes(courseId));
}

export function getCoursesByCountry(countryId: string): Course[] {
  return courses.filter((course) => course.countryIds.includes(countryId));
}

export function getCoursesByUniversity(universityId: string): Course[] {
  return courses.filter((course) => course.universityIds.includes(universityId));
}

export function getUniversitiesByCountry(countryId: string): University[] {
  return universities.filter((university) => university.countryId === countryId);
}

export function getUniversitiesByCourse(courseId: string): University[] {
  return universities.filter((university) => university.courseIds.includes(courseId));
}

export function getUniversitiesFiltered(countryId?: string, searchText?: string): University[] {
  return universities.filter((university) => {
    const matchesCountry = !countryId || countryId === 'all' || university.countryId === countryId;
    const matchesSearch =
      !searchText ||
      university.name.toLowerCase().includes(searchText.toLowerCase().trim());
    return matchesCountry && matchesSearch;
  });
}
