import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT SGPA to Percentage Converter | GPA-X',
  description: 'Convert your MAKAUT SGPA to equivalent percentage marks instantly using the official university formula: Percentage = (SGPA - 0.75) * 10.',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/sgpa-to-percentage'
  }
};

export default function SgpaToPercentageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
