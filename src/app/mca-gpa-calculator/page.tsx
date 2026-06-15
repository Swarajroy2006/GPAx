import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AcademicDashboard from '@/components/AcademicDashboard';
import Breadcrumb from '@/components/Breadcrumb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT MCA GPA Calculator & Tracker | GPA-X',
  description: 'Calculate and track MCA SGPA, CGPA and percentage marks. Pre-calibrated with standard MAKAUT 2-Year MCA syllabus credit configurations.',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/mca-gpa-calculator'
  }
};

export default function McaGpaCalculatorPage() {
  const breadcrumbs = [
    { label: 'Calculators', href: '/' },
    { label: 'MCA GPA Calculator' }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50/50 dark:bg-gray-950/20 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={breadcrumbs} />
        </div>
        <AcademicDashboard defaultCourse="MCA" />
      </main>
      <Footer />
    </>
  );
}
