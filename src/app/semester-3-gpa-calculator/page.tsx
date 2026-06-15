import SemesterGpaCalculator from '@/components/SemesterGpaCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT Semester 3 GPA Calculator | GPA-X',
  description: 'Calculate and estimate your MAKAUT Semester 3 SGPA and percentage using expected subject grades (Data Structures, Circuits, OOPs, Mathematics III, etc.).',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/semester-3-gpa-calculator'
  }
};

export default function Semester3Page() {
  return <SemesterGpaCalculator semesterNumber={3} />;
}
