import SemesterGpaCalculator from '@/components/SemesterGpaCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT Semester 8 GPA Calculator | GPA-X',
  description: 'Calculate and estimate your MAKAUT Semester 8 SGPA and percentage using expected subject grades (Major Project, Grand Viva, Electives, etc.).',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/semester-8-gpa-calculator'
  }
};

export default function Semester8Page() {
  return <SemesterGpaCalculator semesterNumber={8} />;
}
