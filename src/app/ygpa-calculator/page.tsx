'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { calculateYgpa, gpaToPercentage } from '@/lib/formulas';
import { Zap, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function YgpaCalculatorPage() {
  const [oddSgpa, setOddSgpa] = useState<string>('8.0');
  const [oddCredits, setOddCredits] = useState<string>('20');
  const [evenSgpa, setEvenSgpa] = useState<string>('8.0');
  const [evenCredits, setEvenCredits] = useState<string>('20');
  const [ygpa, setYgpa] = useState<number>(8.0);
  const [percentage, setPercentage] = useState<number>(72.5);

  useEffect(() => {
    const odd = parseFloat(oddSgpa);
    const even = parseFloat(evenSgpa);
    const oddCred = parseFloat(oddCredits) || 20;
    const evenCred = parseFloat(evenCredits) || 20;
    if (!isNaN(odd) && !isNaN(even)) {
      const computedYgpa = calculateYgpa(odd, even, oddCred, evenCred);
      setYgpa(computedYgpa);
      setPercentage(gpaToPercentage(computedYgpa));
    } else {
      setYgpa(0);
      setPercentage(0);
    }
  }, [oddSgpa, evenSgpa, oddCredits, evenCredits]);

  const oddSgpaNum = parseFloat(oddSgpa) || 0;
  const evenSgpaNum = parseFloat(evenSgpa) || 0;
  const oddCreditsNum = parseFloat(oddCredits) || 0;
  const evenCreditsNum = parseFloat(evenCredits) || 0;

  const breadcrumbs = [
    { label: 'Calculators', href: '/' },
    { label: 'YGPA Calculator' }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50/50 dark:bg-gray-950/20 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={breadcrumbs} />

          <div className="text-center mb-8">
            <span className="px-3 py-1.5 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-semibold uppercase tracking-wider">Calculator</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-950 dark:text-white mt-3">MAKAUT YGPA Calculator</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
              Calculate your Yearly Grade Point Average (YGPA) and equivalent percentage from your odd and even semester SGPA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Input Section */}
            <div className="md:col-span-6 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-brand-accent" />
                    <CardTitle>Enter Semesters SGPA & Credits</CardTitle>
                  </div>
                  <CardDescription>Input your SGPA and credit load for both odd and even semesters of the academic year.</CardDescription>
                </CardHeader>
                
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Odd Sem SGPA</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        value={oddSgpa}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (parseFloat(val) <= 10 || val === '') setOddSgpa(val);
                        }}
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white"
                        placeholder="e.g. 8.10"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Odd Sem Credits</label>
                      <input
                        type="number"
                        min="1"
                        value={oddCredits}
                        onChange={(e) => setOddCredits(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white"
                        placeholder="e.g. 20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Even Sem SGPA</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        value={evenSgpa}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (parseFloat(val) <= 10 || val === '') setEvenSgpa(val);
                        }}
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white"
                        placeholder="e.g. 8.30"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Even Sem Credits</label>
                      <input
                        type="number"
                        min="1"
                        value={evenCredits}
                        onChange={(e) => setEvenCredits(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white"
                        placeholder="e.g. 20"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-900/40 rounded-xl text-xs space-y-2 border border-gray-200 dark:border-gray-900 text-gray-500">
                    <p className="font-semibold text-gray-700 dark:text-gray-300">Official YGPA Formula:</p>
                    <code className="block bg-white dark:bg-gray-950 p-2 rounded-lg border border-gray-150 dark:border-gray-900 text-xs font-bold text-brand-accent mb-2">
                      YGPA = (Odd_SGPA * Odd_Credits + Even_SGPA * Even_Credits) / (Odd_Credits + Even_Credits)
                    </code>
                    <code className="block bg-white dark:bg-gray-950 p-2 rounded-lg border border-gray-150 dark:border-gray-900 text-xs font-bold text-brand-accent">
                      Percentage (%) = (YGPA - 0.75) * 10
                    </code>
                  </div>
                </div>
              </Card>
            </div>

            {/* Results Section */}
            <div className="md:col-span-6 space-y-6">
              <Card className="bg-brand-accent/5 border-brand-accent/10">
                <CardHeader>
                  <CardTitle className="text-center text-xs font-bold text-brand-accent uppercase tracking-wider">Calculated Output</CardTitle>
                </CardHeader>
                <div className="text-center py-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 bg-white dark:bg-gray-950 rounded-xl border border-gray-150 dark:border-gray-900">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Yearly GPA (YGPA)</span>
                      <span className="text-3xl font-extrabold text-brand-accent block mt-1">{ygpa.toFixed(2)}</span>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-950 rounded-xl border border-gray-150 dark:border-gray-900">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Yearly Percentage</span>
                      <span className="text-3xl font-extrabold text-brand-accent block mt-1">{percentage.toFixed(1)}%</span>
                    </div>
                  </div>

                  {percentage >= 60 ? (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl text-xs font-semibold">
                      {"✔ SVMCM Scholarship Limit Satisfied (>= 60%)"}
                    </div>
                  ) : (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs font-semibold">
                      {"✘ Below SVMCM Scholarship limit (needs 60%)"}
                    </div>
                  )}

                  {oddSgpaNum > 0 && evenSgpaNum > 0 && (
                    <div className="mt-6 p-3 bg-white dark:bg-gray-950 rounded-xl border border-gray-150 dark:border-gray-900 text-left text-xs text-gray-500 space-y-1">
                      <span className="font-bold text-gray-700 dark:text-gray-300 block">Step-by-step Calculation:</span>
                      <p>1. Odd Sem Index: {oddSgpaNum.toFixed(2)} * {oddCreditsNum} = {(oddSgpaNum * oddCreditsNum).toFixed(2)}</p>
                      <p>2. Even Sem Index: {evenSgpaNum.toFixed(2)} * {evenCreditsNum} = {(evenSgpaNum * evenCreditsNum).toFixed(2)}</p>
                      <p>3. YGPA: ({(oddSgpaNum * oddCreditsNum).toFixed(2)} + {(evenSgpaNum * evenCreditsNum).toFixed(2)}) / ({oddCreditsNum} + {evenCreditsNum}) = {ygpa.toFixed(2)}</p>
                      <p>4. Subtract 0.75: {ygpa.toFixed(2)} - 0.75 = {(ygpa - 0.75).toFixed(2)}</p>
                      <p>5. Multiply by 10: {(ygpa - 0.75).toFixed(2)} * 10 = {percentage.toFixed(1)}%</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>

          {/* Educational Content / Guide */}
          <div className="mt-12 space-y-6 text-sm text-gray-650 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-gray-900 pt-8">
            <h3 className="text-xl font-bold text-gray-950 dark:text-white">Why is YGPA crucial for MAKAUT Students?</h3>
            <p>
              Yearly Grade Point Average (YGPA) is the official metric that represents your academic standing for a full academic year. It is highly critical for students applying for West Bengal government scholarships like the <strong>Swami Vivekananda Merit-cum-Means (SVMCM) scholarship</strong>.
            </p>
            <p>
              Under SVMCM rules, to renew your scholarship for the subsequent year, you must pass all papers in the promotional exams and secure at least a <strong>60% aggregate percentage</strong> in the academic year. Since MAKAUT does not issue direct yearly percentage marks, your YGPA is calculated first, and then converted to percentage using the `(YGPA - 0.75) * 10` formula. A YGPA of <strong>6.75</strong> is the exact equivalent of 60.0%.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
