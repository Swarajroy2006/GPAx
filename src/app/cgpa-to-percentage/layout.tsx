import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT CGPA to Percentage Converter | GPA-X',
  description: 'Convert your MAKAUT CGPA score to percentage marks instantly using the official Maulana Abul Kalam Azad University formula. Find your division and letter grade.',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/cgpa-to-percentage'
  }
};

export default function CgpaToPercentageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
