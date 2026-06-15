import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Shield, Users, Heart, GraduationCap } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About GPA-X | Academic Intelligence for MAKAUT',
  description: 'Learn about GPA-X, an open-source academic utility platform built for Maulana Abul Kalam Azad University of Technology students.',
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in/about'
  }
};

export default function AboutPage() {
  const breadcrumbs = [
    { label: 'About Us' }
  ];

  const pillars = [
    { title: 'Student First', desc: 'All features, calculators, and trackers are 100% free and open-source to support every student’s graduation journey.', icon: Heart, color: 'text-rose-500 bg-rose-500/10' },
    { title: 'Offline First & Secure', desc: 'GPA-X stores all profile data locally inside your own browser. No databases, no login, and absolute data privacy.', icon: Shield, color: 'text-brand-primary bg-brand-primary/10' },
    { title: 'Academic Precision', desc: 'All equations, from YGPA renewals to weighted DGPA models, strictly adhere to official MAKAUT university rules.', icon: GraduationCap, color: 'text-emerald-500 bg-emerald-500/10' },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50/50 dark:bg-gray-950/20 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={breadcrumbs} />

          <div className="text-center mb-8">
            <span className="px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold uppercase tracking-wider">Our Story</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-950 dark:text-white mt-3">Empowering MAKAUT Students</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
              A premium, community-focused platform designed to streamline academic score conversions and scholarship audit requirements.
            </p>
          </div>

          <div className="space-y-8 mt-10">
            <Card>
              <h3 className="text-xl font-bold text-gray-950 dark:text-white mb-4">The Evolution of GPA-X</h3>
              <p className="text-sm text-gray-650 dark:text-gray-400 leading-relaxed space-y-4">
                GPA-X was originally conceived as a simple static conversion tool to help Maulana Abul Kalam Azad University of Technology (MAKAUT) students convert their SGPA scorecards into percentages. Over time, as scholarship portals like SVMCM introduced strict renewal thresholds and corporate recruiters automated eligibility cutoffs, we realized students needed a more robust system.
              </p>
              <p className="text-sm text-gray-650 dark:text-gray-400 leading-relaxed mt-4">
                GPA-X 3.0 represents a complete ground-up redesign. By combining the sleek aesthetics of Apple/Vercel with advanced predictive calculators and Recharts analytics, we have built the ultimate academic cockpit.
              </p>
            </Card>

            {/* Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pillars.map((pillar) => (
                <Card key={pillar.title} className="flex flex-col items-center text-center py-6">
                  <div className={`w-12 h-12 rounded-2xl ${pillar.color} flex items-center justify-center mb-4`}>
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-base">{pillar.title}</CardTitle>
                  <CardDescription className="mt-2 text-xs leading-relaxed">{pillar.desc}</CardDescription>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
