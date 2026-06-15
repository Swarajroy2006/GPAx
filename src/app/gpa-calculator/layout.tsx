import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT GPA Calculator & Tracker Workspace | GPA-X',
  description: 'Your premium offline student dashboard to track semester SGPA, calculate CGPA, project graduating DGPA, and monitor scholarship renewal progress.',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/gpa-calculator'
  }
};

export default function GpaCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
