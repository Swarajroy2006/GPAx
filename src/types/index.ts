export interface SemesterData {
  semesterNumber: number; // 1 to 8
  sgpa: number;
  credits: number;
  totalMarks?: number;
  obtainedMarks?: number;
}

export type CourseType = 'B.Tech' | 'BCA' | 'MCA' | 'BBA' | 'B.Sc';

export type ScholarshipType = 'SVMCM' | 'Oasis' | 'Aikyashree' | 'None';

export interface StudentProfile {
  name: string;
  rollNumber: string;
  universityRoll: string;
  course: CourseType;
  currentSemester: number;
  scholarshipType: ScholarshipType;
  semesters: SemesterData[];
  annualFamilyIncome: number;
  category: 'General' | 'SC' | 'ST' | 'OBC' | 'Minority';
  isWestBengalDomicile: boolean;
}

export interface BlogMetadata {
  slug: string;
  title: string;
  date: string;
  category: 'Scholarships' | 'MAKAUT Updates' | 'Exam Tips' | 'Placement Preparation' | 'GPA Guides' | 'Study Resources';
  summary: string;
  readTime: string;
  author: string;
  tags: string[];
  content: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
