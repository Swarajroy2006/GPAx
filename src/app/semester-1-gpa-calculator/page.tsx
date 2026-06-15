import SemesterGpaCalculator from '@/components/SemesterGpaCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT Semester 1 GPA Calculator | GPA-X',
  description: 'Calculate and estimate your MAKAUT Semester 1 SGPA and percentage using expected subject grades (Mathematics I, Physics, Chemistry, etc.).',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/semester-1-gpa-calculator'
  }
};

export default function Semester1Page() {
  return <SemesterGpaCalculator semesterNumber={1} />;
}
