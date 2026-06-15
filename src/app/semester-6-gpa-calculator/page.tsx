import SemesterGpaCalculator from '@/components/SemesterGpaCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT Semester 6 GPA Calculator | GPA-X',
  description: 'Calculate and estimate your MAKAUT Semester 6 SGPA and percentage using expected subject grades (DBMS, Networks, Electives, sessional labs, etc.).',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/semester-6-gpa-calculator'
  }
};

export default function Semester6Page() {
  return <SemesterGpaCalculator semesterNumber={6} />;
}
