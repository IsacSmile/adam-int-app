export function formatCourseSubtitle(level: string, duration: string): string {
  return `${level} · ${duration}`;
}

export function formatUniversitySubtitle(location: string, countryName?: string): string {
  if (countryName && !location.toLowerCase().includes(countryName.toLowerCase())) {
    return `${location}, ${countryName}`;
  }
  return location;
}
