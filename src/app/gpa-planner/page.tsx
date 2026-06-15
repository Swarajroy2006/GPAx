'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { calculateGpaPlanner } from '@/lib/formulas';
import { Sparkles, HelpCircle, AlertCircle, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function GpaPlannerPage() {
  const [currentCgpa, setCurrentCgpa] = useState<string>('7.5');
  const [completedCredits, setCompletedCredits] = useState<string>('60');
  const [targetCgpa, setTargetCgpa] = useState<string>('8.0');
  const [remainingCredits, setRemainingCredits] = useState<string>('40');

  const [plannerResult, setPlannerResult] = useState<any>(null);

  useEffect(() => {
    const cur = parseFloat(currentCgpa) || 0;
    const comp = parseInt(completedCredits) || 0;
    const tar = parseFloat(targetCgpa) || 0;
    const rem = parseInt(remainingCredits) || 0;

    if (cur >= 0 && comp > 0 && tar >= 0 && rem > 0) {
      setPlannerResult(calculateGpaPlanner(cur, comp, tar, rem));
    } else {
      setPlannerResult(null);
    }
  }, [currentCgpa, completedCredits, targetCgpa, remainingCredits]);

  const breadcrumbs = [
    { label: 'Calculators', href: '/' },
    { label: 'GPA Planner' }
  ];

  // Mock planner chart data to show target progress
  const chartData = plannerResult && plannerResult.isPossible ? [
    { name: 'Current CGPA', GPA: parseFloat(currentCgpa) },
    { name: 'Required Future SGPA', GPA: plannerResult.requiredGpa },
    { name: 'Target CGPA', GPA: parseFloat(targetCgpa) }
  ] : [];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50/50 dark:bg-gray-950/20 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={breadcrumbs} />

          <div className="text-center mb-8">
            <span className="px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold uppercase tracking-wider">Planner</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-950 dark:text-white mt-3">MAKAUT GPA Planner & Target Strategist</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
              Plan and calculate the required Semester Grade Point Average (SGPA) for your remaining credits to achieve your target graduation CGPA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Input Section */}
            <div className="md:col-span-6 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-primary" />
                    <CardTitle>Configure Goals</CardTitle>
                  </div>
                  <CardDescription>Input your current stats and target aspirations.</CardDescription>
                </CardHeader>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Current CGPA</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        value={currentCgpa}
                        onChange={(e) => setCurrentCgpa(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white"
                        placeholder="e.g. 7.5"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Completed Credits</label>
                      <input
                        type="number"
                        placeholder="e.g. 60"
                        value={completedCredits}
                        onChange={(e) => setCompletedCredits(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Target CGPA</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        value={targetCgpa}
                        onChange={(e) => setTargetCgpa(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white"
                        placeholder="e.g. 8.0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Remaining Credits</label>
                      <input
                        type="number"
                        placeholder="e.g. 40"
                        value={remainingCredits}
                        onChange={(e) => setRemainingCredits(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Results Section */}
            <div className="md:col-span-6 space-y-6">
              {plannerResult ? (
                <Card className="bg-brand-primary/5 border-brand-primary/10">
                  <CardHeader>
                    <CardTitle className="text-center text-xs font-bold text-brand-primary uppercase tracking-wider">Required GPA Strategy</CardTitle>
                  </CardHeader>
                  <div className="text-center py-4">
                    {plannerResult.isPossible ? (
                      <div className="space-y-6">
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">Required Future SGPA Average</span>
                          <h2 className="text-5xl font-extrabold text-brand-primary mt-1.5">{plannerResult.requiredGpa}</h2>
                        </div>

                        {/* Achievability Bar */}
                        <div className="px-6">
                          <div className="w-full bg-gray-200 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
                            <div
                              className="bg-brand-primary h-full rounded-full transition-all duration-500"
                              style={{ width: `${plannerResult.probability}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-2 font-semibold">
                            <span>Target Achievability:</span>
                            <span className="text-brand-primary">{plannerResult.probability}% Probability</span>
                          </div>
                        </div>

                        {/* Recharts Trend Line */}
                        {chartData.length > 0 && (
                          <div className="h-32 w-full px-4 mt-2">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={chartData}>
                                <XAxis dataKey="name" stroke="#64748b" fontSize={9} />
                                <YAxis stroke="#64748b" fontSize={9} domain={[5, 10]} />
                                <Line type="monotone" dataKey="GPA" stroke="#2563eb" strokeWidth={2.5} />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        )}

                        <div className="p-3 bg-white dark:bg-gray-950 rounded-xl border border-gray-150 dark:border-gray-900 text-left text-xs text-gray-500 flex gap-2">
                          <Info className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                          <span>
                            {plannerResult.requiredGpa > 8.5 
                              ? 'This will require strict focus and scoring high grades (O/E) in class tests CAs and sessional practical marks.' 
                              : 'This is in a highly comfortable zone. Maintaining standard lectures and class CAs will suffice.'}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="py-8">
                        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
                        <h4 className="font-bold text-gray-900 dark:text-white">Goal Mathematically Unachievable</h4>
                        <p className="text-xs text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
                          To achieve {targetCgpa} CGPA, you would need an average SGPA of {plannerResult.requiredGpa} in remaining credits, which exceeds the university's 10.0 scale maximum. Try adjusting your target CGPA downwards.
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              ) : (
                <div className="text-center text-xs text-gray-400 p-8 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl h-full flex items-center justify-center">
                  Configure your CGPA goals on the left to review your required academic trajectory.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
