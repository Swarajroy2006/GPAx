'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { StudentProfile } from '@/types';
import { calculateCgpa, gpaToPercentage, getDivision, evaluatePlacementEligibility } from '@/lib/formulas';
import { BarChart3, LineChart as LineIcon, TrendingUp, CheckCircle, Info } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

export default function AnalyticsPage() {
  const [profile] = useLocalStorage<StudentProfile>('student_profile', {
    name: '',
    rollNumber: '',
    universityRoll: '',
    course: 'B.Tech',
    currentSemester: 1,
    scholarshipType: 'None',
    semesters: [],
    annualFamilyIncome: 0,
    category: 'General',
    isWestBengalDomicile: true
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div className="p-8 text-center text-gray-500">Loading Academic Analytics...</div>;

  const semestersSorted = [...profile.semesters].sort((a, b) => a.semesterNumber - b.semesterNumber);
  const semestersRecordedCount = semestersSorted.length;

  const currentCgpa = calculateCgpa(profile.semesters);
  const currentPercentage = gpaToPercentage(currentCgpa);
  const placementDetails = evaluatePlacementEligibility(currentCgpa, 0, currentPercentage);

  const chartData = semestersSorted.map(s => ({
    name: `Sem ${s.semesterNumber}`,
    SGPA: s.sgpa,
    Percentage: parseFloat(gpaToPercentage(s.sgpa).toFixed(1))
  }));

  const breadcrumbs = [
    { label: 'Workspace', href: '/gpa-calculator' },
    { label: 'Academic Analytics' }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50/50 dark:bg-gray-950/20 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={breadcrumbs} />

          <div className="text-center mb-8">
            <span className="px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold uppercase tracking-wider">Analytics</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-950 dark:text-white mt-3">Interactive Academic Analytics</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
              Unlock deep performance insights, GPA progress curves, and career placement readiness scores.
            </p>
          </div>

          {semestersRecordedCount < 2 ? (
            <Card className="text-center py-12 flex flex-col items-center gap-4">
              <BarChart3 className="w-12 h-12 text-gray-300 dark:text-gray-700 animate-pulse" />
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Insufficient Semester Log Records</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                  You need to record at least 2 semester SGPA entries in the student dashboard to activate advanced interactive analytics.
                </p>
              </div>
              <Link
                href="/gpa-calculator"
                className="mt-2 px-5 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Go to Student Dashboard
              </Link>
            </Card>
          ) : (
            <div className="space-y-8">
              
              {/* Overview Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-900 text-center">
                  <span className="text-[10px] uppercase font-bold text-gray-400">CGPA</span>
                  <span className="text-2xl font-extrabold text-brand-primary block mt-1">{currentCgpa.toFixed(2)}</span>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-900 text-center">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Equivalent %</span>
                  <span className="text-2xl font-extrabold text-brand-secondary block mt-1">{currentPercentage.toFixed(1)}%</span>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-900 text-center">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Division</span>
                  <span className="text-xs font-bold text-emerald-500 block mt-2.5 truncate">{getDivision(currentPercentage)}</span>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-900 text-center">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Readiness Score</span>
                  <span className="text-2xl font-extrabold text-brand-accent block mt-1">{placementDetails.score}%</span>
                </div>
              </div>

              {/* Chart Sections */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <LineIcon className="w-5 h-5 text-brand-primary" />
                    <CardTitle>Semester SGPA Trajectory</CardTitle>
                  </div>
                  <CardDescription>Visualizes your grading fluctuations across active semester terms.</CardDescription>
                </CardHeader>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a303c" opacity={0.1} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} domain={[4, 10]} />
                      <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff' }} />
                      <Line type="monotone" dataKey="SGPA" stroke="#2563eb" strokeWidth={3} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-brand-secondary" />
                    <CardTitle>Percentage Conversion Scaling</CardTitle>
                  </div>
                  <CardDescription>Track relative percentage outputs derived from semester grading scales.</CardDescription>
                </CardHeader>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a303c" opacity={0.1} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                      <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff' }} />
                      <Bar dataKey="Percentage" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Placement Readiness Breakdown */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-brand-accent" />
                    <CardTitle>Placement Readiness Audit</CardTitle>
                  </div>
                  <CardDescription>Evaluates your cumulative credentials against standard MNC hiring metrics.</CardDescription>
                </CardHeader>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-900 pb-2">
                    <span className="text-gray-400 font-medium">Service-based MNC Eligibility (TCS/Wipro/etc.)</span>
                    <span className={`font-bold ${placementDetails.serviceCompanyEligible ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {placementDetails.serviceCompanyEligible ? 'Eligible' : 'Ineligible'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-900 pb-2">
                    <span className="text-gray-400 font-medium">Product-based MNC Eligibility (Amazon/Microsoft/etc.)</span>
                    <span className={`font-bold ${placementDetails.productCompanyEligible ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {placementDetails.productCompanyEligible ? 'Eligible' : 'Ineligible'}
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/40 rounded-xl text-xs space-y-2 border border-gray-250 dark:border-gray-900 text-gray-500">
                    <span className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5"><Info className="w-4 h-4 text-brand-primary" /> Placement Advice:</span>
                    <p>Maintaining a CGPA of <strong>7.5+</strong> with zero active backlogs is the safest way to ensure placement eligibility for over 90% of visiting companies.</p>
                  </div>
                </div>
              </Card>

            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
