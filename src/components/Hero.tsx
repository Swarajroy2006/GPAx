'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Award, ArrowRight, ShieldCheck, Cpu, Smartphone, Sparkles, Percent } from 'lucide-react';
import { gpaToPercentage, percentageToGrade, getDivision } from '@/lib/formulas';

export default function Hero() {
  const [sgpa, setSgpa] = useState<string>('8.0');
  const [percentage, setPercentage] = useState<number>(72.5);

  useEffect(() => {
    const val = parseFloat(sgpa);
    if (!isNaN(val)) {
      setPercentage(gpaToPercentage(val));
    } else {
      setPercentage(0);
    }
  }, [sgpa]);

  const sgpaNum = parseFloat(sgpa) || 0;
  const gradeDetails = percentageToGrade(percentage);
  const division = getDivision(percentage);

  const checkConfetti = () => {
    if (sgpaNum >= 9.0) {
      import('canvas-confetti').then((m) => {
        m.default({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      });
    }
  };

  const badges = [
    { text: '100% Free Platform', icon: ShieldCheck, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
    { text: 'SVMCM / Scholarship Ready', icon: Award, color: 'text-brand-secondary bg-brand-secondary/10 border-brand-secondary/20' },
    { text: 'Mobile Optimized UI', icon: Smartphone, color: 'text-brand-accent bg-brand-accent/10 border-brand-accent/20' },
    { text: 'Accurate MAKAUT Algorithms', icon: Cpu, color: 'text-brand-primary bg-brand-primary/10 border-brand-primary/20' },
  ];

  return (
    <section className="relative py-12 md:py-20 px-6 overflow-hidden max-w-7xl mx-auto w-full">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-radial-[circle_at_center,_var(--card-glow)_0%,_transparent_60%] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-brand-primary/5 blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-brand-secondary/5 blur-3xl -z-10 animate-pulse delay-700" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: Headings and CTAs */}
        <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* Floating Sparkle Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6 animate-bounce">
            <Sparkles className="w-3.5 h-3.5" /> GPA-X 3.0 Platform Live
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-2xl leading-tight md:leading-none">
            Calculate GPA, Percentage, Marks &{' '}
            <span className="text-gradient">Scholarship Eligibility</span> Instantly
          </h1>
          
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl mt-6 leading-relaxed">
            The smartest academic intelligence toolkit built specifically for Maulana Abul Kalam Azad University of Technology (MAKAUT) students. Convert SGPA to percentage, calculate CGPA/DGPA, and plan target grades.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
            <Link
              href="/gpa-calculator"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-xl shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-xs"
            >
              Start Student Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/scholarship-calculator"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 font-bold rounded-xl transition-colors cursor-pointer text-xs"
            >
              <Award className="w-3.5 h-3.5 text-brand-secondary" /> Scholarship Checker
            </Link>
          </div>
        </div>

        {/* Right column: Interactive Quick SGPA Converter Widget */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <div className="glass-card p-6 border border-gray-150 dark:border-gray-800 shadow-xl max-w-md w-full mx-auto bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl relative">
            {/* Corner Badge */}
            <span className="absolute top-3 right-3 text-[9px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary">
              Quick Tool
            </span>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <Percent className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-gray-950 dark:text-white uppercase tracking-wider">SGPA to Percentage Converter</h3>
            </div>

            <div className="space-y-4">
              {/* Input field */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Input SGPA (0.00 - 10.00)</span>
                  <span className="text-sm font-bold text-brand-primary">{sgpaNum.toFixed(2)}</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={sgpa}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (parseFloat(val) <= 10 || val === '') {
                      setSgpa(val);
                    }
                  }}
                  onBlur={checkConfetti}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white font-semibold text-center"
                  placeholder="e.g. 8.25"
                />
              </div>

              {/* Slider */}
              <div className="py-2">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.05"
                  value={sgpaNum}
                  onChange={(e) => setSgpa(e.target.value)}
                  onMouseUp={checkConfetti}
                  onTouchEnd={checkConfetti}
                  className="w-full accent-brand-primary cursor-pointer h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none"
                />
              </div>

              {/* Result display */}
              <div className="p-4 bg-brand-primary/5 rounded-xl border border-brand-primary/10 text-center relative overflow-hidden">
                <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Equivalent Percentage</span>
                <span className="text-4xl font-extrabold text-brand-primary mt-1.5 block tracking-tight">
                  {percentage.toFixed(1)}%
                </span>
                
                <div className="flex items-center justify-between mt-4 border-t border-gray-200/50 dark:border-gray-900/50 pt-3 text-left">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Letter Grade</span>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${gradeDetails.color}`}>
                    {gradeDetails.grade} ({gradeDetails.classification})
                  </span>
                </div>
              </div>
              
              <div className="text-[9px] text-center text-gray-400 italic">
                MAKAUT Formula: (SGPA - 0.75) * 10
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mt-16 mx-auto">
        {badges.map((badge, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl border ${badge.color}`}
          >
            <badge.icon className="w-5 h-5 shrink-0" />
            <span className="text-xs font-bold text-gray-850 dark:text-gray-200 text-left leading-tight">{badge.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
