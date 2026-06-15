import SemesterGpaCalculator from '@/components/SemesterGpaCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT Semester 4 GPA Calculator | GPA-X',
  description: 'Calculate and estimate your MAKAUT Semester 4 SGPA and percentage using expected subject grades (Discrete Maths, Algorithms, Computer Architecture, etc.).',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/semester-4-gpa-calculator'
  }
};

export default function Semester4Page() {
  return <SemesterGpaCalculator semesterNumber={4} />;
}
