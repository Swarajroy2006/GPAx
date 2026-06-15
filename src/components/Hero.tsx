'use client';

import Link from 'next/link';
import { Calculator, Award, ArrowRight, ShieldCheck, Cpu, Smartphone, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const badges = [
    { text: '100% Free Platform', icon: ShieldCheck, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
    { text: 'SVMCM / Scholarship Ready', icon: Award, color: 'text-brand-secondary bg-brand-secondary/10 border-brand-secondary/20' },
    { text: 'Mobile Optimized UI', icon: Smartphone, color: 'text-brand-accent bg-brand-accent/10 border-brand-accent/20' },
    { text: 'Accurate MAKAUT Algorithms', icon: Cpu, color: 'text-brand-primary bg-brand-primary/10 border-brand-primary/20' },
  ];

  return (
    <section className="relative py-16 md:py-24 px-6 overflow-hidden flex flex-col items-center text-center">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-radial-[circle_at_center,_var(--card-glow)_0%,_transparent_60%] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-brand-primary/5 blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-brand-secondary/5 blur-3xl -z-10 animate-pulse delay-700" />

      {/* Floating Sparkle Badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6 animate-bounce">
        <Sparkles className="w-3.5 h-3.5" /> GPA-X 3.0 Platform Live
      </div>

      {/* Hero Headings */}
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight md:leading-none">
        Calculate GPA, Percentage, Marks &{' '}
        <span className="text-gradient">Scholarship Eligibility</span> Instantly
      </h1>
      
      <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mt-6 leading-relaxed">
        The smartest academic intelligence toolkit built specifically for Maulana Abul Kalam Azad University of Technology (MAKAUT) students. Plan your semesters, check scholarship metrics, and track placement readiness in real-time.
      </p>

      {/* Hero CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        <Link
          href="/gpa-calculator"
          className="flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-2xl shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-sm"
        >
          Start Calculating <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/scholarship-calculator"
          className="flex items-center justify-center gap-2 px-8 py-3.5 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 font-bold rounded-2xl transition-colors cursor-pointer text-sm"
        >
          <Award className="w-4 h-4 text-brand-secondary" /> Scholarship Checker
        </Link>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mt-16">
        {badges.map((badge, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl border ${badge.color}`}
          >
            <badge.icon className="w-5 h-5 shrink-0" />
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 text-left leading-tight">{badge.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
