declare const require: any;
declare const __dirname: string;
declare const process: { exit: (code: number) => void };

const fs = require('fs');
const path = require('path');
import { Country, Course, University } from '../types/models';

function loadJson<T>(filename: string): T[] {
  const filePath = path.join(__dirname, '..', 'data', filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

function runValidation() {
  console.log('🔍 Starting EduPath Data Validation...\n');

  let hasError = false;

  const countries: Country[] = loadJson<Country>('countries.json');
  const courses: Course[] = loadJson<Course>('courses.json');
  const universities: University[] = loadJson<University>('universities.json');

  const countryMap = new Map<string, Country>(countries.map((c) => [c.id, c]));
  const courseMap = new Map<string, Course>(courses.map((c) => [c.id, c]));
  const universityMap = new Map<string, University>(universities.map((u) => [u.id, u]));

  function logResult(checkName: string, passed: boolean, message?: string) {
    if (passed) {
      console.log(`  ✅ ${checkName}`);
    } else {
      console.error(`  ❌ ${checkName}`);
      if (message) {
        console.error(`     └─ ${message}`);
      }
      hasError = true;
    }
  }

  // 1. Entity Counts
  console.log('--- 1. Counts & ID Uniqueness ---');
  logResult(`Countries count (Expected 9): ${countries.length}`, countries.length === 9);
  logResult(`Courses count (Expected 6): ${courses.length}`, courses.length === 6);
  logResult(`Universities count (Expected 12): ${universities.length}`, universities.length === 12);

  const duplicateCountryIds = countries.length - countryMap.size;
  logResult('Unique Country IDs', duplicateCountryIds === 0, `Duplicates found: ${duplicateCountryIds}`);

  const duplicateCourseIds = courses.length - courseMap.size;
  logResult('Unique Course IDs', duplicateCourseIds === 0, `Duplicates found: ${duplicateCourseIds}`);

  const duplicateUniIds = universities.length - universityMap.size;
  logResult('Unique University IDs', duplicateUniIds === 0, `Duplicates found: ${duplicateUniIds}`);

  // 2. Existence of Referenced IDs
  console.log('\n--- 2. Existence of Referenced IDs ---');
  countries.forEach((country) => {
    country.universityIds.forEach((uniId) => {
      logResult(
        `Country '${country.id}' references university '${uniId}'`,
        universityMap.has(uniId),
        `University '${uniId}' not found in universities.json`
      );
    });
    country.courseIds.forEach((courseId) => {
      logResult(
        `Country '${country.id}' references course '${courseId}'`,
        courseMap.has(courseId),
        `Course '${courseId}' not found in courses.json`
      );
    });
  });

  courses.forEach((course) => {
    course.countryIds.forEach((countryId) => {
      logResult(
        `Course '${course.id}' references country '${countryId}'`,
        countryMap.has(countryId),
        `Country '${countryId}' not found in countries.json`
      );
    });
    course.universityIds.forEach((uniId) => {
      logResult(
        `Course '${course.id}' references university '${uniId}'`,
        universityMap.has(uniId),
        `University '${uniId}' not found in universities.json`
      );
    });
  });

  universities.forEach((uni) => {
    logResult(
      `University '${uni.id}' references country '${uni.countryId}'`,
      countryMap.has(uni.countryId),
      `Country '${uni.countryId}' not found in countries.json`
    );
    uni.courseIds.forEach((courseId) => {
      logResult(
        `University '${uni.id}' references course '${courseId}'`,
        courseMap.has(courseId),
        `Course '${courseId}' not found in courses.json`
      );
    });
  });

  // 3. Bidirectional Relationship Verification
  console.log('\n--- 3. Bidirectional Relationships ---');

  // Country <-> University
  countries.forEach((country) => {
    country.universityIds.forEach((uniId) => {
      const uni = universityMap.get(uniId);
      if (uni) {
        logResult(
          `Country '${country.id}' <-> Uni '${uniId}' countryId match`,
          uni.countryId === country.id,
          `Uni '${uniId}' has countryId '${uni.countryId}', expected '${country.id}'`
        );
      }
    });
  });

  universities.forEach((uni) => {
    const country = countryMap.get(uni.countryId);
    if (country) {
      logResult(
        `Uni '${uni.id}' countryId '${uni.countryId}' in country.universityIds`,
        country.universityIds.includes(uni.id),
        `Country '${country.id}' universityIds does not include '${uni.id}'`
      );
    }
  });

  // Country <-> Course
  countries.forEach((country) => {
    country.courseIds.forEach((courseId) => {
      const course = courseMap.get(courseId);
      if (course) {
        logResult(
          `Country '${country.id}' <-> Course '${courseId}' bidirectional match`,
          course.countryIds.includes(country.id),
          `Course '${courseId}' countryIds missing '${country.id}'`
        );
      }
    });
  });

  courses.forEach((course) => {
    course.countryIds.forEach((countryId) => {
      const country = countryMap.get(countryId);
      if (country) {
        logResult(
          `Course '${course.id}' countryId '${countryId}' in country.courseIds`,
          country.courseIds.includes(course.id),
          `Country '${countryId}' courseIds missing '${course.id}'`
        );
      }
    });
  });

  // University <-> Course
  universities.forEach((uni) => {
    uni.courseIds.forEach((courseId) => {
      const course = courseMap.get(courseId);
      if (course) {
        logResult(
          `University '${uni.id}' <-> Course '${courseId}' bidirectional match`,
          course.universityIds.includes(uni.id),
          `Course '${courseId}' universityIds missing '${uni.id}'`
        );
      }
    });
  });

  courses.forEach((course) => {
    course.universityIds.forEach((uniId) => {
      const uni = universityMap.get(uniId);
      if (uni) {
        logResult(
          `Course '${course.id}' uniId '${uniId}' in uni.courseIds`,
          uni.courseIds.includes(course.id),
          `University '${uniId}' courseIds missing '${course.id}'`
        );
      }
    });
  });

  // University Course -> Country Course consistency
  universities.forEach((uni) => {
    const country = countryMap.get(uni.countryId);
    if (country) {
      uni.courseIds.forEach((courseId) => {
        logResult(
          `Uni '${uni.id}' course '${courseId}' included in host country '${country.id}' courseIds`,
          country.courseIds.includes(courseId),
          `Country '${country.id}' does not list course '${courseId}' offered by university '${uni.id}'`
        );
      });
    }
  });

  console.log('\n----------------------------------------');
  if (hasError) {
    console.error('❌ Data validation FAILED with errors.');
    process.exit(1);
  } else {
    console.log('✅ All data validation checks PASSED successfully!');
    process.exit(0);
  }
}

runValidation();
