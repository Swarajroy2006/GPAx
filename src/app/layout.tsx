import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'GPA-X | MAKAUT SGPA, CGPA & Scholarship Calculator',
    template: '%s | GPA-X MAKAUT Platform'
  },
  description: 'Convert MAKAUT SGPA to percentage, calculate CGPA, DGPA, YGPA, sessional internal marks and track West Bengal SVMCM scholarship status.',
  icons: {
    icon: '/logo.svg',
  },
  metadataBase: new URL('https://gpa-x.swaraj.ai.in'),
  openGraph: {
    title: 'GPA-X Academic Intelligence Platform',
    description: 'Calculate GPA, Percentage, Marks & Scholarship Eligibility Instantly for MAKAUT students.',
    url: 'https://gpa-x.swaraj.ai.in',
    siteName: 'GPA-X',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GPA-X Academic Intelligence Platform',
    description: 'Calculate GPA, Percentage, Marks & Scholarship Eligibility Instantly for MAKAUT students.',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        {/* Force dark theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                document.documentElement.classList.add('dark');
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
