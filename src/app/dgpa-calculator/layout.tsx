import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT DGPA Calculator & Weighting | GPA-X',
  description: 'Calculate your MAKAUT Degree GPA (DGPA) for 4-year B.Tech, 4-year NEP Honors, 3-year NEP Exit, and Lateral Entry courses using official university weights.',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/dgpa-calculator'
  }
};

export default function DgpaCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
