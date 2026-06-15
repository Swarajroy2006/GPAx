import SemesterGpaCalculator from '@/components/SemesterGpaCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT Semester 5 GPA Calculator | GPA-X',
  description: 'Calculate and estimate your MAKAUT Semester 5 SGPA and percentage using expected subject grades (Operating Systems, Software Engineering, Compiler Design, etc.).',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/semester-5-gpa-calculator'
  }
};

export default function Semester5Page() {
  return <SemesterGpaCalculator semesterNumber={5} />;
}
