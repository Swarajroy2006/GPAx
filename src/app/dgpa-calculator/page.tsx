'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { calculateDgpa4Year, calculateDgpa3Year, calculateDgpaLateral, gpaToPercentage } from '@/lib/formulas';
import { GraduationCap } from 'lucide-react';

export default function DgpaCalculatorPage() {
  const [degreeType, setDegreeType] = useState<'4yr' | 'lateral' | '3yr'>('4yr');
  const [ygpa1, setYgpa1] = useState<string>('8.0');
  const [ygpa2, setYgpa2] = useState<string>('8.0');
  const [ygpa3, setYgpa3] = useState<string>('8.0');
  const [ygpa4, setYgpa4] = useState<string>('8.0');
  const [dgpa, setDgpa] = useState<number>(8.0);
  const [percentage, setPercentage] = useState<number>(72.5);

  useEffect(() => {
    const y1 = parseFloat(ygpa1) || 0;
    const y2 = parseFloat(ygpa2) || 0;
    const y3 = parseFloat(ygpa3) || 0;
    const y4 = parseFloat(ygpa4) || 0;

    let computedDgpa = 0;
    if (degreeType === '4yr') {
      computedDgpa = calculateDgpa4Year(y1, y2, y3, y4);
    } else if (degreeType === 'lateral') {
      computedDgpa = calculateDgpaLateral(y2, y3, y4);
    } else {
      computedDgpa = calculateDgpa3Year(y1, y2, y3);
    }

    setDgpa(computedDgpa);
    setPercentage(gpaToPercentage(computedDgpa));
  }, [degreeType, ygpa1, ygpa2, ygpa3, ygpa4]);

  const y1Num = parseFloat(ygpa1) || 0;
  const y2Num = parseFloat(ygpa2) || 0;
  const y3Num = parseFloat(ygpa3) || 0;
  const y4Num = parseFloat(ygpa4) || 0;

  const breadcrumbs = [
    { label: 'Calculators', href: '/' },
    { label: 'DGPA Calculator' }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50/50 dark:bg-gray-950/20 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={breadcrumbs} />

          <div className="text-center mb-8">
            <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-semibold uppercase tracking-wider">Calculator</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-950 dark:text-white mt-3">MAKAUT DGPA Calculator</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
              Calculate your final Degree Grade Point Average (DGPA) using MAKAUT's standard year-weighting models.
            </p>
          </div>

          {/* Toggle Degree type */}
          <div className="flex justify-center mb-8 bg-gray-100 dark:bg-gray-900 p-1.5 rounded-2xl max-w-xl mx-auto border border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setDegreeType('4yr')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${degreeType === '4yr' ? 'bg-white dark:bg-gray-950 text-brand-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              4-Yr NEP Honors / B.Tech
            </button>
            <button
              onClick={() => setDegreeType('lateral')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${degreeType === 'lateral' ? 'bg-white dark:bg-gray-950 text-brand-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Lateral Entry (B.Tech)
            </button>
            <button
              onClick={() => setDegreeType('3yr')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${degreeType === '3yr' ? 'bg-white dark:bg-gray-950 text-brand-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              3-Yr NEP Exit Option
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Input Section */}
            <div className="md:col-span-6 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-emerald-500" />
                    <CardTitle>Enter Year-wise GPAs (YGPA)</CardTitle>
                  </div>
                  <CardDescription>Provide your YGPAs (or average semester GPAs) for each academic year.</CardDescription>
                </CardHeader>
                
                <div className="space-y-4">
                  {degreeType !== 'lateral' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Year 1 YGPA</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        value={ygpa1}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (parseFloat(val) <= 10 || val === '') setYgpa1(val);
                        }}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white"
                        placeholder="e.g. 8.00"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Year 2 YGPA</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      value={ygpa2}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (parseFloat(val) <= 10 || val === '') setYgpa2(val);
                      }}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white"
                      placeholder="e.g. 8.20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Year 3 YGPA</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      value={ygpa3}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (parseFloat(val) <= 10 || val === '') setYgpa3(val);
                      }}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white"
                      placeholder="e.g. 8.35"
                    />
                  </div>

                  {degreeType !== '3yr' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Year 4 YGPA</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        value={ygpa4}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (parseFloat(val) <= 10 || val === '') setYgpa4(val);
                        }}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white"
                        placeholder="e.g. 8.60"
                      />
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Results Section */}
            <div className="md:col-span-6 space-y-6">
              <Card className="bg-emerald-500/5 border-emerald-500/10">
                <CardHeader>
                  <CardTitle className="text-center text-xs font-bold text-emerald-500 uppercase tracking-wider">DGPA Score Output</CardTitle>
                </CardHeader>
                <div className="text-center py-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 bg-white dark:bg-gray-950 rounded-xl border border-gray-150 dark:border-gray-900">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Degree GPA (DGPA)</span>
                      <span className="text-3xl font-extrabold text-emerald-500 block mt-1">{dgpa.toFixed(2)}</span>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-950 rounded-xl border border-gray-150 dark:border-gray-900">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Degree Percentage</span>
                      <span className="text-3xl font-extrabold text-emerald-500 block mt-1">{percentage.toFixed(1)}%</span>
                    </div>
                  </div>

                  <div className="mt-6 p-3 bg-white dark:bg-gray-950 rounded-xl border border-gray-150 dark:border-gray-900 text-left text-xs text-gray-500 space-y-2">
                    <span className="font-bold text-gray-700 dark:text-gray-300 block">Weighting Logic Applied:</span>
                    {degreeType === '4yr' && (
                      <>
                        <p>Formula: <code>(Y1 + Y2 + 1.5*Y3 + 1.5*Y4) / 5</code></p>
                        <p>Calculation: <code>({y1Num} + {y2Num} + 1.5*{y3Num} + 1.5*{y4Num}) / 5 = {dgpa.toFixed(2)}</code></p>
                      </>
                    )}
                    {degreeType === 'lateral' && (
                      <>
                        <p>Formula: <code>(Y2 + 1.5*Y3 + 1.5*Y4) / 4</code></p>
                        <p>Calculation: <code>({y2Num} + 1.5*{y3Num} + 1.5*{y4Num}) / 4 = {dgpa.toFixed(2)}</code></p>
                      </>
                    )}
                    {degreeType === '3yr' && (
                      <>
                        <p>Formula: <code>(Y1 + Y2 + Y3) / 3</code></p>
                        <p>Calculation: <code>({y1Num} + {y2Num} + {y3Num}) / 3 = {dgpa.toFixed(2)}</code></p>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>

           {/* Educational Content / Guide */}
          <div className="mt-12 space-y-6 text-sm text-gray-650 dark:text-gray-400 leading-relaxed border-t border-gray-250 dark:border-gray-900 pt-8">
            <h3 className="text-xl font-bold text-gray-950 dark:text-white">Understanding MAKAUT Degree Weighting (DGPA)</h3>
            <p>
              Under the **National Education Policy (NEP 2020)** framework, MAKAUT professional courses (like BCA, BBA, and B.Sc) have transitioned to **4-year Honors degrees** with multiple entry/exit pathways.
            </p>
            <p>
              This creates different degree pathways for computing your graduating Degree GPA (DGPA) based on the official guidelines:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>4-Yr NEP Honors / B.Tech:</strong> If you complete all 4 years (8 semesters) to earn an Honors degree, the DGPA is computed using the standard 4-year formula: <code>(Y1 + Y2 + 1.5 * Y3 + 1.5 * Y4) / 5</code>.</li>
              <li><strong>3-Yr NEP Exit Option:</strong> If you choose the exit pathway after 3 years (6 semesters) to graduate with a standard Bachelor's degree, the DGPA is computed using the official 3-year formula: <code>(Y1 + Y2 + Y3) / 3</code>.</li>
              <li><strong>Lateral Entry:</strong> For direct 2nd-year entry, it is calculated over the remaining 3 years: <code>(Y2 + 1.5 * Y3 + 1.5 * Y4) / 4</code>.</li>
            </ul>
            <p>
              In all cases, final years are weighted **1.5 times** heavier than initial years because late-stage courses comprise advanced electives and thesis projects.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
