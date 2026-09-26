export interface Country {
  id: string;
  name: string;
  flagEmoji?: string;
  overview: string;
  whyStudy: string;
  educationSystem: string;
  popularPrograms: string[];
  tuitionFees: string;
  costOfLiving: string;
  admissionRequirements: string;
  englishRequirements: string;
  intakes: string[];
  visaInfo: string;
  scholarships: string;
  workOpportunities: string;
  careerOpportunities: string;
  applicationProcess: string;
  courseIds: string[];
  universityIds: string[];
}

export interface Course {
  id: string;
  name: string;
  description: string;
  level: string;        // e.g. "Bachelor's", "Master's"
  duration: string;
  entryRequirements: string;
  tuitionFee: string;
  intake: string;
  countryIds: string[];
  universityIds: string[];
}

export interface University {
  id: string;
  name: string;
  countryId: string;
  location: string;
  overview: string;
  tuitionFees: string;
  entryRequirements: string;
  intakes: string[];
  accommodationInfo: string;
  applicationRequirements: string;
  scholarships: string;
  admissionProcess: string;
  courseIds: string[];
}
