'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Trophy, HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ScholarshipCalculatorPage() {
  const [scholarshipType, setScholarshipType] = useState<'SVMCM' | 'Oasis' | 'Aikyashree'>('SVMCM');
  const [percentage, setPercentage] = useState<string>('65');
  const [income, setIncome] = useState<string>('150000');
  const [domicile, setDomicile] = useState<boolean>(true);
  const [category, setCategory] = useState<'General' | 'SC' | 'ST' | 'OBC' | 'Minority'>('General');
  const [isRenewal, setIsRenewal] = useState<boolean>(false);

  const [eligible, setEligible] = useState<boolean>(true);
  const [reasons, setReasons] = useState<string[]>([]);

  useEffect(() => {
    const pct = parseFloat(percentage) || 0;
    const inc = parseFloat(income) || 0;
    const feedback: string[] = [];
    let isEligible = true;

    // West Bengal Domicile Check (required for all)
    if (!domicile) {
      isEligible = false;
      feedback.push('Must be a permanent resident of West Bengal.');
    }

    if (scholarshipType === 'SVMCM') {
      // Income Check
      if (inc > 250000) {
        isEligible = false;
        feedback.push('Annual family income must not exceed ₹2,50,000 (currently ₹' + inc.toLocaleString() + ').');
      }
      
      // Academic Percentage Check
      const requiredPct = 60;
      if (pct < requiredPct) {
        isEligible = false;
        feedback.push('Must secure at least ' + requiredPct + '% marks (currently ' + pct + '%).');
      }
    } 
    else if (scholarshipType === 'Oasis') {
      // Category Check (SC/ST/OBC only)
      if (category === 'General' || category === 'Minority') {
        isEligible = false;
        feedback.push('Oasis is restricted to SC, ST, and OBC category students.');
      }
      
      // Income Check
      const maxIncome = category === 'OBC' ? 100000 : 250000;
      if (inc > maxIncome) {
        isEligible = false;
        feedback.push('Annual family income must not exceed ₹' + maxIncome.toLocaleString() + ' for ' + category + ' category.');
      }
      
      // Academic Check
      if (pct < 50) {
        isEligible = false;
        feedback.push('Must secure at least 50% marks in the last qualifying examination.');
      }
    } 
    else if (scholarshipType === 'Aikyashree') {
      // Minority check
      if (category !== 'Minority') {
        isEligible = false;
        feedback.push('Aikyashree is restricted to students belonging to minority communities (Muslim, Christian, Buddhist, Sikh, Parsi, Jain).');
      }

      // Income check
      if (inc > 200000) {
        isEligible = false;
        feedback.push('Annual family income must not exceed ₹2,00,000 (currently ₹' + inc.toLocaleString() + ').');
      }

      // Academic check
      if (pct < 50) {
        isEligible = false;
        feedback.push('Must secure at least 50% marks in the last qualifying examination.');
      }
    }

    setEligible(isEligible);
    setReasons(feedback);
  }, [scholarshipType, percentage, income, domicile, category, isRenewal]);

  const breadcrumbs = [
    { label: 'Calculators', href: '/' },
    { label: 'Scholarship Eligibility' }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50/50 dark:bg-gray-950/20 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={breadcrumbs} />

          <div className="text-center mb-8">
            <span className="px-3 py-1.5 rounded-full bg-brand-secondary/10 text-brand-secondary text-xs font-semibold uppercase tracking-wider">Audit</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-950 dark:text-white mt-3">Scholarship Eligibility Checker</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
              Check fresh and renewal eligibility for SVMCM, Oasis, and Aikyashree scholarships based on West Bengal rules.
            </p>
          </div>

          {/* Toggle Scholarship Type */}
          <div className="flex justify-center mb-8 bg-gray-100 dark:bg-gray-900 p-1.5 rounded-2xl max-w-md mx-auto border border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setScholarshipType('SVMCM')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${scholarshipType === 'SVMCM' ? 'bg-white dark:bg-gray-950 text-brand-secondary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              SVMCM (Bikash Bhavan)
            </button>
            <button
              onClick={() => setScholarshipType('Oasis')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${scholarshipType === 'Oasis' ? 'bg-white dark:bg-gray-950 text-brand-secondary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Oasis (SC/ST/OBC)
            </button>
            <button
              onClick={() => setScholarshipType('Aikyashree')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${scholarshipType === 'Aikyashree' ? 'bg-white dark:bg-gray-950 text-brand-secondary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Aikyashree (Minority)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Input Section */}
            <div className="md:col-span-6 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-brand-secondary" />
                    <CardTitle>Verify Demographics & Scores</CardTitle>
                  </div>
                  <CardDescription>Input student credentials to evaluate eligibility thresholds.</CardDescription>
                </CardHeader>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Last Examination Marks (%)</label>
                    <input
                      type="number"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white"
                      placeholder="e.g. 65"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Annual Family Income (INR)</label>
                    <input
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors dark:bg-gray-950"
                      >
                        <option value="General">General</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                        <option value="OBC">OBC</option>
                        <option value="Minority">Minority</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">Application Stage</label>
                      <select
                        value={isRenewal ? 'renewal' : 'fresh'}
                        onChange={(e) => setIsRenewal(e.target.value === 'renewal')}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors dark:bg-gray-950"
                      >
                        <option value="fresh">Fresh Application</option>
                        <option value="renewal">Renewal Application</option>
                      </select>
                    </div>
                  </div>

                  {/* Domicile Button */}
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

            {/* Results Section */}
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
                          Student meets the specific qualifying academic limits, family income caps, and demographic rules of the {scholarshipType} portal.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <AlertCircle className="w-12 h-12 text-rose-500" />
                      <div>
                        <h2 className="text-2xl font-extrabold text-rose-500">Ineligible / Missing</h2>
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

          {/* Educational Content / Guide */}
          <div className="mt-12 space-y-6 text-sm text-gray-650 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-gray-900 pt-8">
            <h3 className="text-xl font-bold text-gray-950 dark:text-white">Scholarship Rules in West Bengal</h3>
            <p>
              West Bengal offers several scholarship portals for undergraduate engineering and professional students:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>SVMCM (Swami Vivekananda Merit-cum-Means):</strong> The premier scholarship offering up to ₹60,000 annually for technical students. Requires 60% aggregate and under ₹2.5L family income.</li>
              <li><strong>Oasis Scholarship:</strong> Targeted specifically for SC, ST, and OBC students. Requires passing scores and domicile verification.</li>
              <li><strong>Aikyashree Scholarship:</strong> Designated for minorities (Sikhs, Muslims, Buddhists, Jains, Parsis) to pursue higher studies in recognized institutions.</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
