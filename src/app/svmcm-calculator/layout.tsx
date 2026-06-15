import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT SVMCM (Bikash Bhavan) Scholarship Calculator | GPA-X',
  description: 'Verify your qualifying family income (under ₹2.5L) and promotional percentage (60%) for fresh and renewal SVMCM applications.',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/svmcm-calculator'
  }
};

export default function SvmcmCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
