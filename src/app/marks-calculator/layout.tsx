import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT Marks Calculator & Grade Points | GPA-X',
  description: 'Convert your semester SGPA or YGPA to obtained theory and practical exam marks based on total semester marks using MAKAUT conversion equations.',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/marks-calculator'
  }
};

export default function MarksCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
