import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MAKAUT Academic Blog, Placements & Exam Guides | GPA-X',
  description: 'Read updates, preparation guides, and news about MAKAUT semester exams, sessional marks, placement readiness, and SVMCM renewals.',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/blog'
  }
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
