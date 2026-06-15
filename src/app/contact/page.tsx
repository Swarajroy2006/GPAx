import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Mail, HelpCircle, Bug, Compass } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Support | GPA-X',
  description: 'Reach out to the GPA-X academic support and engineering team for questions regarding MAKAUT calculations and feedback.',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/contact'
  }
};

export default function ContactPage() {
  const breadcrumbs = [
    { label: 'Contact Us' }
  ];

  const blocks = [
    { title: 'General Queries', desc: 'Questions about MAKAUT formulas or scholarship calculations?', info: 'support@gpa-x.swaraj.ai.in', icon: HelpCircle, color: 'text-brand-primary bg-brand-primary/10' },
    { title: 'Bug Reports & PRs', desc: 'Discovered a rounding error or calculation bug? Log issues on Git.', info: 'github.com/Swarajroy2006/GPAx', icon: Bug, color: 'text-rose-500 bg-rose-500/10' },
    { title: 'Career Guidance', desc: 'Need help parsing your placement readiness score?', icon: Compass, info: 'mentors@gpa-x.swaraj.ai.in', color: 'text-brand-accent bg-brand-accent/10' }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50/50 dark:bg-gray-950/20 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={breadcrumbs} />

          <div className="text-center mb-8">
            <span className="px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold uppercase tracking-wider">Reach Out</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-950 dark:text-white mt-3">We'd Love to Hear From You</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
              Have feedback, features suggestions, or general queries about MAKAUT credit marks? Reach out to the GPA-X team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {blocks.map((b) => (
              <Card key={b.title} className="flex flex-col justify-between py-6">
                <div>
                  <div className={`w-10 h-10 rounded-xl ${b.color} flex items-center justify-center mb-4`}>
                    <b.icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-base">{b.title}</CardTitle>
                  <CardDescription className="mt-2 text-xs">{b.desc}</CardDescription>
                </div>
                <span className="mt-6 text-xs font-bold text-brand-primary truncate block">{b.info}</span>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
