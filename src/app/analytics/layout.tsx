import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT Academic Analytics & Performance Trends | GPA-X',
  description: 'Visualize your grade improvements, SGPA fluctuations, and percentage trends using interactive Recharts graphics in your workspace.',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/analytics'
  }
};

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
