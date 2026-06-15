'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { gpaToPercentage, sgpaToObtainedMarks } from '@/lib/formulas';
import { BookOpen, Settings } from 'lucide-react';

export default function MarksCalculatorPage() {
  const [sgpa, setSgpa] = useState<string>('8.0');
  const [useCustomTotal, setUseCustomTotal] = useState<boolean>(false);
  
  // Custom inputs
  const [customTotalMarks, setCustomTotalMarks] = useState<string>('800');
  
  // Subject count inputs
  const [theoryCount, setTheoryCount] = useState<string>('5');
  const [practicalCount, setPracticalCount] = useState<string>('3');

  // Outputs
  const [totalMarks, setTotalMarks] = useState<number>(800);
  const [obtainedMarks, setObtainedMarks] = useState<number>(580);
  const [percentage, setPercentage] = useState<number>(72.5);

  useEffect(() => {
    const sgpaVal = parseFloat(sgpa) || 0;
    const pct = gpaToPercentage(sgpaVal);
    setPercentage(pct);

    let total = 800;
    if (useCustomTotal) {
      total = parseInt(customTotalMarks) || 0;
    } else {
      const th = parseInt(theoryCount) || 0;
      const pr = parseInt(practicalCount) || 0;
      total = (th + pr) * 100;
    }
    setTotalMarks(total);

    const obtained = Math.round((pct / 100) * total);
    setObtainedMarks(obtained);
  }, [sgpa, useCustomTotal, customTotalMarks, theoryCount, practicalCount]);

  const breadcrumbs = [
    { label: 'Calculators', href: '/' },
    { label: 'Marks Calculator' }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50/50 dark:bg-gray-950/20 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={breadcrumbs} />

          <div className="text-center mb-8">
            <span className="px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-semibold uppercase tracking-wider">Calculator</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-950 dark:text-white mt-3">MAKAUT SGPA to Marks Calculator</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
              Convert your SGPA score into approximate obtained marks and total marks required for scholarship registrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Input Section */}
            <div className="md:col-span-6 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-500" />
                    <CardTitle>Configure Academic Score</CardTitle>
                  </div>
                  <CardDescription>Input your SGPA and specify how total marks are computed.</CardDescription>
                </CardHeader>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Semester SGPA</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      value={sgpa}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (parseFloat(val) <= 10 || val === '') setSgpa(val);
                      }}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white"
                      placeholder="e.g. 8.20"
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-b border-gray-100 dark:border-gray-900 py-3">
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Input Custom Total Marks</span>
                    <button
                      onClick={() => setUseCustomTotal(!useCustomTotal)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${useCustomTotal ? 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20' : 'bg-gray-100 dark:bg-gray-900 text-gray-400'}`}
                    >
                      {useCustomTotal ? 'Custom Total On' : 'Use Subject Presets'}
                    </button>
                  </div>

                  {useCustomTotal ? (
                    <div>
                      <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Custom Total Semester Marks</label>
                      <input
                        type="number"
                        placeholder="e.g. 800"
                        value={customTotalMarks}
                        onChange={(e) => setCustomTotalMarks(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Theory Papers (100 Marks)</label>
                        <input
                          type="number"
                          value={theoryCount}
                          onChange={(e) => setTheoryCount(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Practical Papers (100 Marks)</label>
                        <input
                          type="number"
                          value={practicalCount}
                          onChange={(e) => setPracticalCount(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Results Section */}
            <div className="md:col-span-6 space-y-6">
              <Card className="bg-indigo-500/5 border-indigo-500/10">
                <CardHeader>
                  <CardTitle className="text-center text-xs font-bold text-indigo-500 uppercase tracking-wider">Estimated Marks Output</CardTitle>
                </CardHeader>
                <div className="text-center py-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 bg-white dark:bg-gray-950 rounded-xl border border-gray-150 dark:border-gray-900">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Obtained Marks</span>
                      <span className="text-3xl font-extrabold text-indigo-500 block mt-1">{obtainedMarks}</span>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-950 rounded-xl border border-gray-150 dark:border-gray-900">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Marks</span>
                      <span className="text-3xl font-extrabold text-indigo-500 block mt-1">{totalMarks}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-900 rounded-xl text-xs text-gray-400 font-medium">
                    Equivalent percentage derived: <strong className="text-indigo-500">{percentage.toFixed(1)}%</strong>
                  </div>

                  {obtainedMarks > 0 && (
                    <div className="mt-6 p-3 bg-white dark:bg-gray-950 rounded-xl border border-gray-150 dark:border-gray-900 text-left text-xs text-gray-500 space-y-1">
                      <span className="font-bold text-gray-700 dark:text-gray-300 block">Step-by-step Calculation:</span>
                      <p>1. Percentage = ({parseFloat(sgpa).toFixed(2)} - 0.75) * 10 = {percentage.toFixed(1)}%</p>
                      <p>2. Total Marks = {totalMarks}</p>
                      <p>3. Obtained Marks = ({percentage.toFixed(1)} / 100) * {totalMarks} = {obtainedMarks}</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>

          {/* Educational Content / Guide */}
          <div className="mt-12 space-y-6 text-sm text-gray-650 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-gray-900 pt-8">
            <h3 className="text-xl font-bold text-gray-950 dark:text-white">Why is Marks Calculation Required?</h3>
            <p>
              When applying for state scholarships like the Swami Vivekananda Merit-cum-Means (SVMCM), OASIS, or Aikyashree, the application forms frequently ask students to submit their **Obtained Marks** and **Total Marks** instead of GPA or direct percentages.
            </p>
            <p>
              Since MAKAUT grade cards only publish credit indices and letter grades (O, E, A, B, etc.) rather than absolute marks, students must convert their SGPA to percentage first, and then scale that percentage to the total semester marks to arrive at an estimated "Obtained Marks" figure.
            </p>
            <p>
              By default, each theoretical and practical paper in MAKAUT has a weight of **100 marks** (composed of 70 marks end-semester and 30 marks internal assessment). Thus, a semester with 5 theory papers and 3 practical papers is marked out of 800 total marks.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
