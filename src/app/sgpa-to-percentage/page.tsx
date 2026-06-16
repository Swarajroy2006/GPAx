'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { gpaToPercentage, percentageToGrade, getDivision } from '@/lib/formulas';
import { Percent, ArrowRight, HelpCircle, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function SgpaToPercentagePage() {
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

  // Trigger confetti for outstanding grade
  const checkConfetti = () => {
    if (sgpaNum >= 9.0) {
      import('canvas-confetti').then((m) => {
        m.default({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      });
    }
  };

  const breadcrumbs = [
    { label: 'Calculators', href: '/' },
    { label: 'SGPA to Percentage' }
  ];

  // Calculator Schema for SEO
  const calculatorSchema = {
    '@context': 'https://schema.org',
    '@type': 'Calculator',
    'name': 'MAKAUT SGPA to Percentage Calculator',
    'url': 'https://gpa-x.swaraj.ai.in/sgpa-to-percentage',
    'description': 'Convert MAKAUT SGPA scores to percentages instantly based on the official Maulana Abul Kalam Azad University formula.',
    'educationalLevel': 'Higher Education'
  };

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'MAKAUT SGPA to Percentage Converter | GPA-X',
    'operatingSystem': 'All',
    'applicationCategory': 'EducationalApplication',
    'url': 'https://gpa-x.swaraj.ai.in/sgpa-to-percentage',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.7',
      'reviewCount': '6524',
      'bestRating': '5',
      'worstRating': '1'
    },
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'INR'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      
      <Navbar />
      <main className="flex-grow bg-gray-50/50 dark:bg-gray-950/20 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={breadcrumbs} />

          <div className="text-center mb-8">
            <span className="px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold uppercase tracking-wider">Calculator</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-950 dark:text-white mt-3">MAKAUT SGPA to Percentage Converter</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
              Convert your Semester Grade Point Average (SGPA) to percentage instantly using the official university formula.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Input Section */}
            <div className="md:col-span-6 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Percent className="w-5 h-5 text-brand-primary" />
                    <CardTitle>Enter SGPA Score</CardTitle>
                  </div>
                  <CardDescription>Input your semester SGPA to run calculations.</CardDescription>
                </CardHeader>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-gray-400 uppercase">SGPA Score (0.00 - 10.00)</span>
                      <span className="text-lg font-bold text-brand-primary">{sgpaNum.toFixed(2)}</span>
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
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white"
                      placeholder="e.g. 8.25"
                    />
                  </div>

                  {/* Slider */}
                  <div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.05"
                      value={sgpaNum}
                      onChange={(e) => setSgpa(e.target.value)}
                      onMouseUp={checkConfetti}
                      onTouchEnd={checkConfetti}
                      className="w-full accent-brand-primary cursor-pointer"
                    />
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-900/40 rounded-xl text-xs space-y-2 border border-gray-200 dark:border-gray-900 text-gray-500">
                    <p className="font-semibold text-gray-700 dark:text-gray-300">Conversion Formula:</p>
                    <code className="block bg-white dark:bg-gray-950 p-2 rounded-lg border border-gray-150 dark:border-gray-900 text-center font-bold text-brand-primary">
                      Percentage (%) = (SGPA - 0.75) * 10
                    </code>
                  </div>
                </div>
              </Card>
            </div>

            {/* Results Section */}
            <div className="md:col-span-6 space-y-6">
              <Card className="bg-brand-primary/5 border-brand-primary/10">
                <CardHeader>
                  <CardTitle className="text-center text-xs font-bold text-brand-primary uppercase tracking-wider">Calculation Output</CardTitle>
                </CardHeader>
                <div className="text-center py-6">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Equivalent Percentage</span>
                  <h2 className="text-5xl font-extrabold text-brand-primary mt-1.5">{percentage.toFixed(1)}%</h2>
                  
                  <div className="mt-8">
                    <div className="p-4 bg-white dark:bg-gray-950 rounded-xl border border-gray-150 dark:border-gray-900 flex justify-between items-center">
                      <span className="text-[10px] uppercase font-bold text-gray-400">Letter Grade</span>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${gradeDetails.color}`}>
                        {gradeDetails.grade} ({gradeDetails.classification})
                      </span>
                    </div>
                  </div>

                  {sgpaNum > 0 && (
                    <div className="mt-6 p-3 bg-white dark:bg-gray-950 rounded-xl border border-gray-150 dark:border-gray-900 text-left text-xs text-gray-500 space-y-1">
                      <span className="font-bold text-gray-700 dark:text-gray-300 block">Step-by-step Calculation:</span>
                      <p>1. Subtract 0.75: {sgpaNum.toFixed(2)} - 0.75 = {(sgpaNum - 0.75).toFixed(2)}</p>
                      <p>2. Multiply by 10: {(sgpaNum - 0.75).toFixed(2)} * 10 = {percentage.toFixed(1)}%</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>

          {/* Educational Content / Guide */}
          <div className="mt-12 space-y-6 text-sm text-gray-650 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-gray-900 pt-8">
            <h3 className="text-xl font-bold text-gray-950 dark:text-white">How MAKAUT Evaluates SGPA to Percentage</h3>
            <p>
              Maulana Abul Kalam Azad University of Technology (MAKAUT) implements a 10-point credit grading system. Since many job placements, national level competitive tests (like GATE, CAT), and West Bengal government scholarships (like SVMCM / Oasis) require a percentage equivalent, MAKAUT established a standardized conversion policy.
            </p>
            <p>
              The subtraction factor of <strong>0.75</strong> accounts for variance in grade point distributions, ensuring that a standard 10-point GPA translates accurately into standard corporate and scholarship percentage brackets. For instance, a 6.75 CGPA corresponds to 60.0% marks, which is the baseline eligibility threshold for the Swami Vivekananda Merit-cum-Means scholarship.
            </p>
            <div className="flex gap-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 text-amber-500 text-xs">
              <HelpCircle className="w-5 h-5 shrink-0" />
              <div>
                <strong>Portal Notice:</strong> Some applications require submitting overall year marks instead of percentages. You can use our <Link href="/marks-calculator" className="underline font-bold">Marks Calculator</Link> to estimate total and obtained marks based on your SGPA.
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
