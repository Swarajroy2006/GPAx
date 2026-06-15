import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT Aikyashree Minority Scholarship Auditor | GPA-X',
  description: 'Check eligibility requirements for minority students under West Bengal Aikyashree scholarship models (MOMA and SVMCM streams).',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/aikyashree-calculator'
  }
};

export default function AikyashreeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
