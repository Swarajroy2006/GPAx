import SemesterGpaCalculator from '@/components/SemesterGpaCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT Semester 7 GPA Calculator | GPA-X',
  description: 'Calculate and estimate your MAKAUT Semester 7 SGPA and percentage using expected subject grades (Professional Electives, Projects, Seminar, etc.).',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/semester-7-gpa-calculator'
  }
};

export default function Semester7Page() {
  return <SemesterGpaCalculator semesterNumber={7} />;
}
