import SemesterGpaCalculator from '@/components/SemesterGpaCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT Semester 2 GPA Calculator | GPA-X',
  description: 'Calculate and estimate your MAKAUT Semester 2 SGPA and percentage using expected subject grades (Mathematics II, Programming, English, etc.).',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/semester-2-gpa-calculator'
  }
};

export default function Semester2Page() {
  return <SemesterGpaCalculator semesterNumber={2} />;
}
