import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AcademicDashboard from '@/components/AcademicDashboard';
import Breadcrumb from '@/components/Breadcrumb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT BBA GPA Calculator & Tracker | GPA-X',
  description: 'Calculate and track BBA SGPA, CGPA and percentage marks. Pre-calibrated with standard MAKAUT 4-Year Honors / 3-Year Exit BBA syllabus credit configurations under NEP 2020.',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/bba-gpa-calculator'
  }
};

export default function BbaGpaCalculatorPage() {
  const breadcrumbs = [
    { label: 'Calculators', href: '/' },
    { label: 'BBA GPA Calculator' }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50/50 dark:bg-gray-950/20 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={breadcrumbs} />
        </div>
        <AcademicDashboard defaultCourse="BBA" />
      </main>
      <Footer />
    </>
  );
}
