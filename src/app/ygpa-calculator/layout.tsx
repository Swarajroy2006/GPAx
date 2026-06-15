import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT YGPA Calculator & Converter | GPA-X',
  description: 'Calculate your Maulana Abul Kalam Azad University of Technology Yearly GPA (YGPA) from odd and even semesters using the official credit-weighted formula.',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/ygpa-calculator'
  }
};

export default function YgpaCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
