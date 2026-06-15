import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AcademicDashboard from '@/components/AcademicDashboard';
import Breadcrumb from '@/components/Breadcrumb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academic Intelligence Dashboard | GPA-X',
  description: 'Log your MAKAUT SGPA scores, calculate cumulative CGPA, analyze performance graphs, and check scholarship status on the ultimate student dashboard.',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/gpa-calculator'
  }
};

export default function GpaCalculatorPage() {
  const breadcrumbs = [
    { label: 'Student Workspace' }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50/50 dark:bg-gray-950/20 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={breadcrumbs} />
        </div>
        <AcademicDashboard />
      </main>
      <Footer />
    </>
  );
}
