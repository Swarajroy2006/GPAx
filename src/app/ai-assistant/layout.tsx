import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Academic Assistant for MAKAUT Rules | GPA-X',
  description: 'Ask academic questions and receive instant answers about MAKAUT credit marks, internal CA tests, backlogs, and SVMCM scholarship rules.',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/ai-assistant'
  }
};

export default function AiAssistantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
