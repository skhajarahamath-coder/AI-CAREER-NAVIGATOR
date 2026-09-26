export type EducationLevel =
  | '10th'
  | 'Intermediate / 12th'
  | 'Diploma'
  | 'B.Tech / B.E'
  | 'Degree'
  | 'Postgraduate';

export interface ProjectEntry {
  name: string;
  description: string;
  technologies: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isTeam: boolean;
  githubUrl?: string;
}

export interface CertEntry {
  name: string;
  provider: string;
  year?: string;
  category?: string;
}

export interface StudentProfile {
  educationLevel: EducationLevel;
  stream?: string; // MPC, BiPC, MEC, CEC, HEC, Other
  branch?: string; // CSE, ECE, MECH, CIVIL, IT, AI/DS
  degreeSpecialization?: string; // BCA, B.Sc, B.Com, BA
  currentYear?: string; // 1st, 2nd, 3rd, 4th, Completed
  cgpaPercentage?: number;
  backlogs?: number;
  academicPerformance?: 'Excellent' | 'Good' | 'Average';
  mathPerformance?: 'Strong' | 'Average' | 'Needs Improvement';
  sciencePerformance?: 'Strong' | 'Average' | 'Needs Improvement';
  englishPerformance?: 'Strong' | 'Average' | 'Needs Improvement';
  favoriteSubjects?: string[];
  interests: string[];
  personalityTraits?: string[];
  careerGoals: string[];
  technicalSkills?: string[];
  projects?: ProjectEntry[];
  projectCount?: number;
  certifications?: CertEntry[];
  certificationCount?: number;
  workEnvironmentPref?: string;
  higherEdPref?: string;
  studyAbroadInterest?: boolean;
  govtPrivatePref?: string;
}

export interface CareerRoute {
  routeCode: string;
  title: string;
  targetAudience: string;
  description: string;
  steps: string[];
}

export interface ProjectSuggestion {
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  technologies: string[];
}

export interface CertificationSuggestion {
  category: string;
  title: string;
  provider: string;
  level: 'Foundational' | 'Associate' | 'Professional';
}

export interface CareerItem {
  id: string;
  code: string;
  title: string;
  category: 'Software & Cloud' | 'AI & Data' | 'Security & Infrastructure' | 'Core Engineering' | 'Design & Product' | 'Business & Analytics' | 'Healthcare & Life Sciences' | 'Civil & Public Services';
  description: string;
  beginnerDifficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Advanced';
  preferredEducationLevels: string[];
  compatibleDegrees: string[];
  relatedInterests: string[];
  importantAcademicSubjects: string[];
  requiredSkills: string[];
  entryLevelRoles: string[];
  advancedRoles: string[];
  approxSalaryMinLpa: number;
  approxSalaryMaxLpa: number;
  salaryReferenceSource: string;
  alternativeRoutes: CareerRoute[];
  recommendedProjects: ProjectSuggestion[];
  recommendedCertifications: CertificationSuggestion[];
}

export interface FactorBreakdown {
  interestScore: number;
  educationScore: number;
  skillScore: number;
  goalScore: number;
  academicScore: number;
  experienceScore: number;
  totalMatchScore: number;
  highlights: string[];
  missingSkills: string[];
}

export interface ScoredCareerResult {
  career: CareerItem;
  breakdown: FactorBreakdown;
}

export interface RoadmapStageItem {
  stageNumber: number;
  stageTitle: string;
  duration: string;
  focus: string;
  topics: string[];
  actionItems: string[];
}

export interface SkillGapResult {
  isSchoolStudent: boolean;
  readinessPercentage: number;
  currentSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  skillsToDevelopLater: string[];
  learningSequence: string[];
}
