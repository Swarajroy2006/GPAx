import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT SVMCM, Oasis & Aikyashree Scholarship Calculator | GPA-X',
  description: 'Check your eligibility and promotional renewal percentages for West Bengal Swami Vivekananda (SVMCM), Oasis, and Aikyashree student grants.',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/scholarship-calculator'
  }
};

export default function ScholarshipCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
