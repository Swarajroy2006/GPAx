import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AcademicDashboard from '@/components/AcademicDashboard';
import Breadcrumb from '@/components/Breadcrumb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT B.Tech GPA Calculator & Tracker | GPA-X',
  description: 'Calculate and track B.Tech SGPA, CGPA and obtained marks. Pre-calibrated with standard MAKAUT B.Tech credit structures (160 credits total).',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/btech-gpa-calculator'
  }
};

export default function BtechGpaCalculatorPage() {
  const breadcrumbs = [
    { label: 'Calculators', href: '/' },
    { label: 'B.Tech GPA Calculator' }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50/50 dark:bg-gray-950/20 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={breadcrumbs} />
        </div>
        <AcademicDashboard defaultCourse="B.Tech" />
      </main>
      <Footer />
    </>
  );
}
