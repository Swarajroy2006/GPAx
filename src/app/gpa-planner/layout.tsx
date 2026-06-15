import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT Target GPA Strategic Planner | GPA-X',
  description: 'Strategic planner to calculate the future SGPAs you need to hit your target cumulative CGPA and maintain scholarship eligibility.',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/gpa-planner'
  }
};

export default function GpaPlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
