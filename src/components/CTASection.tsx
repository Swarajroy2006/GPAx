import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-16 px-6 no-print">
      <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent p-1 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Background lights */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-black/20 rounded-full blur-2xl" />

        <div className="bg-white dark:bg-gray-950 rounded-[22px] px-8 py-12 text-center flex flex-col items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-950 dark:text-white max-w-2xl leading-tight">
            Ready to Take Control of Your Academic Journey?
          </h2>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl">
            Save your semesters, check your SVMCM renewal criteria, and evaluate placements on GPA-X today. Free forever, stored locally on your device.
          </p>

          <Link
            href="/gpa-calculator"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-xl shadow-lg shadow-brand-primary/15 hover:shadow-xl hover:shadow-brand-primary/25 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-sm"
          >
            Launch Your Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
