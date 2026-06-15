import Link from 'next/link';
import Hero from '@/components/Hero';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { 
  Calculator, 
  Award, 
  TrendingUp, 
  GraduationCap, 
  Zap, 
  Bot, 
  BookOpen, 
  ChevronRight, 
  CheckCircle,
  Users,
  Percent,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GPA-X | MAKAUT SGPA, CGPA & Scholarship Calculator',
  description: 'Calculate SGPA, CGPA, DGPA, YGPA and convert to percentage using official MAKAUT formulas. Track SVMCM scholarship eligibility and placements.',
  keywords: ['MAKAUT GPA Calculator', 'MAKAUT SGPA Calculator', 'SGPA to Percentage', 'DGPA Calculator', 'SVMCM Calculator', 'Oasis Scholarship Calculator', 'MAKAUT Percentage Converter'],
  alternates: {
    canonical: 'https://gpa-x.swaraj.ai.in'
  }
};

export default function Home() {
  const tools = [
    { name: 'SGPA to Percentage', href: '/sgpa-to-percentage', desc: 'Convert semester grade points to percentage using the standard (SGPA - 0.75) * 10 formula.', icon: Percent, color: 'text-brand-primary bg-brand-primary/10' },
    { name: 'CGPA to Percentage', href: '/cgpa-to-percentage', desc: 'Compute cumulative marks percentage and check division / graduation classifications.', icon: Calculator, color: 'text-brand-secondary bg-brand-secondary/10' },
    { name: 'YGPA Calculator', href: '/ygpa-calculator', desc: 'Calculate Yearly GPA from odd & even semester SGPAs for scholarship renewals.', icon: Zap, color: 'text-brand-accent bg-brand-accent/10' },
    { name: 'DGPA Calculator', href: '/dgpa-calculator', desc: 'Project 4-Year B.Tech or Lateral Entry Degree GPA with specific MAKAUT weightings.', icon: GraduationCap, color: 'text-emerald-500 bg-emerald-500/10' },
    { name: 'Marks Calculator', href: '/marks-calculator', desc: 'Find obtained marks and total exam marks corresponding to your GPA scores.', icon: BookOpen, color: 'text-indigo-500 bg-indigo-500/10' },
    { name: 'GPA Target Planner', href: '/gpa-planner', desc: 'Plan necessary future grades to hit your target degree percentage and maintain scholarship.', icon: TrendingUp, color: 'text-amber-500 bg-amber-500/10' },
  ];

  const courseCalcs = [
    { name: 'B.Tech GPA Calculator', href: '/btech-gpa-calculator' },
    { name: 'BCA GPA Calculator', href: '/bca-gpa-calculator' },
    { name: 'MCA GPA Calculator', href: '/mca-gpa-calculator' },
    { name: 'BBA GPA Calculator', href: '/bba-gpa-calculator' },
    { name: 'B.Sc GPA Calculator', href: '/bsc-gpa-calculator' },
  ];

  const scholarships = [
    { name: 'SVMCM Scholarship', desc: 'Swami Vivekananda Merit-cum-Means requires 60% (6.75 SGPA) for fresh & renewal applications.', link: '/svmcm-calculator' },
    { name: 'Oasis Scholarship', desc: 'Oasis portal SC/ST/OBC scholarship requires 50% marks in qualifying exams.', link: '/oasis-scholarship-calculator' },
    { name: 'Aikyashree Scholarship', desc: 'Minority students scholarship requiring 50% for post-matric and 60% for SVMCM stream.', link: '/aikyashree-calculator' }
  ];

  const stats = [
    { value: '150K+', label: 'Calculations Logged', icon: Calculator },
    { value: '45K+', label: 'Active Students', icon: Users },
    { value: '100%', label: 'Math Accuracy', icon: CheckCircle2 },
    { value: '0', label: 'Database Logs', icon: ShieldCheck }
  ];

  const testimonials = [
    { quote: "GPA-X made calculating my SVMCM scholarship marks so easy! UCanTool used to have ads, but GPA-X is ad-free and extremely fast.", author: "Sourav Das, B.Tech CSE (MAKAUT)" },
    { quote: "The GPA planner helped me calculate exactly what SGPA I needed in my 6th sem to hit my target of 8.5 CGPA. Excellent product design!", author: "Ankita Roy, BCA Student" },
    { quote: "Highly recommended for MCA and lateral entry students. The DGPA calculator matches the official MAKAUT grade sheet precisely.", author: "Rahul Sen, MCA (Heritage)" }
  ];

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'GPA-X Academic Platform',
    'url': 'https://gpa-x.swaraj.ai.in',
    'logo': 'https://gpa-x.swaraj.ai.in/favicon.ico',
    'description': 'Advanced academic grade calculations and analytics platform for MAKAUT students.',
    'sameAs': []
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <Hero />

        {/* Quick Tools Grid */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold uppercase tracking-wider">Suite</span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-3">Smart Grade & Percentage Tools</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">Instant converters and trackers built to respect Maulana Abul Kalam Azad University guidelines.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Card key={tool.name} className="group relative flex flex-col justify-between h-full">
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${tool.color} flex items-center justify-center mb-4`}>
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <CardTitle>{tool.name}</CardTitle>
                  <CardDescription className="mt-2 text-sm">{tool.desc}</CardDescription>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-900/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 group-hover:text-brand-primary transition-colors">Launch Tool</span>
                  <Link href={tool.href} className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-400 hover:text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all cursor-pointer">
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Course-Specific Calculator links */}
        <section className="py-8 bg-gray-50 dark:bg-gray-950/20 border-y border-gray-200 dark:border-gray-900 px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-bold text-lg text-gray-950 dark:text-white">Degree-Specific Credit Calculators</h3>
              <p className="text-xs text-gray-400 mt-0.5">Custom calculators calibrated with prefilled degree-specific credit patterns.</p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {courseCalcs.map((calc) => (
                <Link
                  key={calc.name}
                  href={calc.href}
                  className="px-4 py-2 text-xs font-bold border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-950 hover:border-brand-primary text-gray-700 dark:text-gray-300 hover:text-brand-primary transition-colors cursor-pointer"
                >
                  {calc.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Scholarship eligibility overview section */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="px-3 py-1.5 rounded-full bg-brand-secondary/10 text-brand-secondary text-xs font-semibold uppercase tracking-wider">Scholarship</span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-3">Scholarship Audit & Compliance</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">Verify your qualifications for West Bengal government student grants in real-time.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scholarships.map((schol) => (
              <Card key={schol.name} className="flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center mb-4 font-bold text-sm">
                    ★
                  </div>
                  <CardTitle>{schol.name}</CardTitle>
                  <CardDescription className="mt-2 text-sm">{schol.desc}</CardDescription>
                </div>
                <Link
                  href={schol.link}
                  className="mt-6 text-xs font-bold text-brand-secondary hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Check Portal Limits <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* Counter stats */}
        <section className="py-12 bg-gradient-to-r from-brand-primary/5 via-brand-secondary/5 to-brand-accent/5 border-y border-gray-250 dark:border-gray-900/40">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center space-y-2">
                <span className="text-3xl md:text-4xl font-extrabold text-gray-950 dark:text-white block">{stat.value}</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-bold block">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Student Testimonials */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="px-3 py-1.5 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-semibold uppercase tracking-wider">Community</span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-3">Loved by MAKAUT Students</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">Hear what other students say about tracking their academic performance with GPA-X.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <Card key={idx} className="flex flex-col justify-between py-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 italic leading-relaxed">
                  "{t.quote}"
                </p>
                <span className="text-xs font-bold text-brand-primary mt-4 block">
                  — {t.author}
                </span>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <FAQ />

        {/* CTA section */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
