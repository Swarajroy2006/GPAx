'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Trophy, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AikyashreeCalculatorPage() {
  const [percentage, setPercentage] = useState<string>('55');
  const [income, setIncome] = useState<string>('150000');
  const [domicile, setDomicile] = useState<boolean>(true);
  const [category, setCategory] = useState<'Minority' | 'General'>('Minority');

  const [eligible, setEligible] = useState<boolean>(true);
  const [reasons, setReasons] = useState<string[]>([]);

  useEffect(() => {
    const pct = parseFloat(percentage) || 0;
    const inc = parseFloat(income) || 0;
    const feedback: string[] = [];
    let isEligible = true;

    if (!domicile) {
      isEligible = false;
      feedback.push('Must be a permanent resident of West Bengal.');
    }
    if (category !== 'Minority') {
      isEligible = false;
      feedback.push('Must belong to a minority community (Muslim, Christian, Buddhist, Sikh, Parsi, Jain).');
    }
    if (inc > 200000) {
      isEligible = false;
      feedback.push('Annual family income must not exceed ₹2,00,000 (currently ₹' + inc.toLocaleString() + ').');
    }
    if (pct < 50) {
      isEligible = false;
      feedback.push('Must secure at least 50% marks in the last qualifying examination.');
    }

    setEligible(isEligible);
    setReasons(feedback);
  }, [percentage, income, domicile, category]);

  const breadcrumbs = [
    { label: 'Calculators', href: '/' },
    { label: 'Aikyashree Scholarship Calculator' }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50/50 dark:bg-gray-950/20 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={breadcrumbs} />

          <div className="text-center mb-8">
            <span className="px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold uppercase tracking-wider">Aikyashree Special</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-950 dark:text-white mt-3">Aikyashree Scholarship Calculator</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
              Check eligibility for minority students seeking higher education support under the West Bengal Aikyashree portal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-6 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-brand-primary" />
                    <CardTitle>Minority Credentials</CardTitle>
                  </div>
                  <CardDescription>Input your academic and community parameters.</CardDescription>
                </CardHeader>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Last Exam Marks (%)</label>
                    <input
                      type="number"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white"
                      placeholder="e.g. 52"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Annual Family Income (INR)</label>
                    <input
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Community Group</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors dark:bg-gray-950"
                    >
                      <option value="Minority">Minority (Muslim/Sikh/Christian/etc.)</option>
                      <option value="General">General (Non-Minority)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">West Bengal Domicile</span>
                    <button
                      onClick={() => setDomicile(!domicile)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${domicile ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}
                    >
                      {domicile ? 'Resident' : 'Non-Resident'}
                    </button>
                  </div>
                </div>
              </Card>
            </div>

            <div className="md:col-span-6 space-y-6">
              <Card className={eligible ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-rose-500/5 border-rose-500/10'}>
                <CardHeader>
                  <CardTitle className={`text-center text-xs font-bold uppercase tracking-wider ${eligible ? 'text-emerald-500' : 'text-rose-500'}`}>
                    Eligibility Decision
                  </CardTitle>
                </CardHeader>
                <div className="text-center py-6">
                  {eligible ? (
                    <div className="flex flex-col items-center gap-3">
                      <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                      <div>
                        <h2 className="text-2xl font-extrabold text-emerald-500">Eligible</h2>
                        <p className="text-xs text-gray-500 mt-2 max-w-xs mx-auto leading-relaxed">
                          Student meets all criteria and is eligible for Aikyashree portal minority support schemes.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <AlertCircle className="w-12 h-12 text-rose-500" />
                      <div>
                        <h2 className="text-2xl font-extrabold text-rose-500">Ineligible</h2>
                        <div className="mt-4 space-y-2 text-left max-w-sm mx-auto px-4">
                          {reasons.map((reason, idx) => (
                            <div key={idx} className="flex gap-2 text-xs text-rose-500">
                              <span className="shrink-0">•</span>
                              <span>{reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
