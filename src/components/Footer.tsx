import Link from 'next/link';
import { GraduationCap, Mail, Shield, AlertTriangle } from 'lucide-react';
import AdsterraBanner from '@/components/AdsterraBanner';
import { AD_KEYS } from '@/lib/adConfig';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-900 py-12 px-6 md:px-12 mt-auto">
      {/* Responsive Adsterra Banner placement at the top of the footer */}
      <div className="max-w-7xl mx-auto mb-8 flex justify-center items-center no-print border-b border-gray-100 dark:border-gray-900 pb-8">
        <div className="hidden md:block">
          <AdsterraBanner 
            id={AD_KEYS.LEADERBOARD_728x90} 
            width={728} 
            height={90} 
          />
        </div>
        <div className="block md:hidden">
          <AdsterraBanner 
            id={AD_KEYS.RECTANGLE_300x250} 
            width={300} 
            height={250} 
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-gray-950 dark:text-white">
            <img src="/logo.svg" alt="GPA-X Logo" className="w-8 h-8 rounded-lg" />
            <span>GPA-X</span>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            The smartest academic intelligence and GPA utility platform for Maulana Abul Kalam Azad University of Technology (MAKAUT) students.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
            <Mail className="w-3.5 h-3.5" />
            <span>mail@swaraj.ai.in</span>
          </div>
        </div>

        {/* Calculators Column */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Academic Calculators</h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
            <li><Link href="/sgpa-to-percentage" className="hover:text-brand-primary transition-colors">SGPA to Percentage</Link></li>
            <li><Link href="/cgpa-to-percentage" className="hover:text-brand-primary transition-colors">CGPA to Percentage</Link></li>
            <li><Link href="/ygpa-calculator" className="hover:text-brand-primary transition-colors">YGPA Calculator</Link></li>
            <li><Link href="/dgpa-calculator" className="hover:text-brand-primary transition-colors">DGPA Calculator</Link></li>
            <li><Link href="/marks-calculator" className="hover:text-brand-primary transition-colors">Marks & Obtained Calculator</Link></li>
            <li><Link href="/gpa-planner" className="hover:text-brand-primary transition-colors">GPA Target Planner</Link></li>
          </ul>
        </div>

        {/* Extra Utilities */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Micro-Utilities</h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
            <li><Link href="/scholarship-calculator" className="hover:text-brand-primary transition-colors">Scholarship Eligibility</Link></li>
            <li><Link href="/analytics" className="hover:text-brand-primary transition-colors">Academic Performance Charts</Link></li>
            <li><Link href="/ai-assistant" className="hover:text-brand-primary transition-colors">AI Academic Advisor</Link></li>
            <li><Link href="/btech-gpa-calculator" className="hover:text-brand-primary transition-colors">B.Tech GPA Calculator</Link></li>
            <li><Link href="/bca-gpa-calculator" className="hover:text-brand-primary transition-colors">BCA GPA Calculator</Link></li>
            <li><Link href="/mca-gpa-calculator" className="hover:text-brand-primary transition-colors">MCA GPA Calculator</Link></li>
          </ul>
        </div>

        {/* Legal & Compliance */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Platform & Legal</h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
            <li><Link href="/about" className="hover:text-brand-primary transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-brand-primary transition-colors">Contact Support</Link></li>
            <li><Link href="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/blog" className="hover:text-brand-primary transition-colors">Academic & Exam Blog</Link></li>
          </ul>
          {/* Disclaimer Alert */}
          <div className="flex gap-2 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 text-amber-500 mt-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Disclaimer:</strong> GPA-X calculations are based on standard MAKAUT formulas and are for guidance purposes. Always refer to your official MAKAUT grade card.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-gray-150 dark:border-gray-900 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 dark:text-gray-500">
        <div className="flex items-center gap-1">
          <GraduationCap className="w-4 h-4" />
          <span>© {currentYear} GPA-X Academic Platform. Built for the MAKAUT Student Community.</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
