import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/Card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | GPA-X',
  description: 'Understand how GPA-X handles student data. We operate a completely database-free, local storage platform ensuring zero data collection.',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/privacy'
  }
};

export default function PrivacyPage() {
  const breadcrumbs = [
    { label: 'Privacy Policy' }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50/50 dark:bg-gray-950/20 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={breadcrumbs} />

          <div className="text-center mb-8">
            <span className="px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold uppercase tracking-wider">Compliance</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-950 dark:text-white mt-3">Privacy & Data Protection</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
              Learn how GPA-X secures your academic records with zero server collection policies.
            </p>
          </div>

          <Card className="mt-10 space-y-6 text-sm text-gray-650 dark:text-gray-400 leading-relaxed">
            <h3 className="text-lg font-bold text-gray-950 dark:text-white">1. Local-First Storage Policy</h3>
            <p>
              GPA-X is built with a strict **Local-First** design pattern. All information entered on the student dashboard—such as your name, course selection, annual family income, SC/ST/OBC category, and semester GPAs—is saved locally in your own browser using the industry-standard \`localStorage\` API.
            </p>
            
            <h3 className="text-lg font-bold text-gray-950 dark:text-white mt-6">2. Zero Server Logs & Databases</h3>
            <p>
              Our application operates entirely database-free. We do not host any remote databases, user registration scripts, or tracking backends. Because of this, **it is technically impossible** for the GPA-X team or any third party to collect, view, or sell your academic scorecard data.
            </p>

            <h3 className="text-lg font-bold text-gray-950 dark:text-white mt-6">3. Dynamic URL Sharing</h3>
            <p>
              When you use the "Share Profile" feature, the system compiles your profile data and encodes it into a standard Base64 string appended to the URL hash (e.g. \`#share=...\`). This data is parsed purely client-side by whoever opens the link. It is never routed to or stored on our servers.
            </p>

            <h3 className="text-lg font-bold text-gray-950 dark:text-white mt-6">4. Third-Party Analytics</h3>
            <p>
              We run lightweight, privacy-focused Vercel Analytics and Vercel Speed Insights to monitor application load speeds and routing performance. This tracking collects zero personal identifiers or academic marks details.
            </p>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
