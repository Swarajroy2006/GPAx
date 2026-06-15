import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT Oasis SC/ST/OBC Scholarship Auditor | GPA-X',
  description: 'Check your eligibility for the West Bengal Oasis scholarship. Requires 50% qualifying marks and domicile status.',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/oasis-scholarship-calculator'
  }
};

export default function OasisScholarshipCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
