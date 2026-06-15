'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { percentageToGrade, gpaToPercentage } from '@/lib/formulas';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Calculator, Plus, Trash2, Sparkles } from 'lucide-react';

interface SubjectInput {
  id: string;
  name: string;
  gradePoint: number;
  credits: number;
}

const SEMESTER_PRESETS: Record<number, { name: string; credits: number }[]> = {
  1: [
    { name: 'Physics / Chemistry', credits: 4 },
    { name: 'Mathematics I', credits: 4 },
    { name: 'Basic Electrical Eng.', credits: 4 },
    { name: 'Physics / Chemistry Lab', credits: 1.5 },
    { name: 'Basic Electrical Lab', credits: 1 },
    { name: 'Workshop Practice', credits: 2 }
  ],
  2: [
    { name: 'Chemistry / Physics', credits: 4 },
    { name: 'Mathematics II', credits: 4 },
    { name: 'Programming for Problem Solving', credits: 3 },
    { name: 'English', credits: 2 },
    { name: 'Programming Lab', credits: 2 },
    { name: 'Engineering Graphics & Design', credits: 3 }
  ],
  3: [
    { name: 'Analog Electronic Circuits', credits: 3 },
    { name: 'Data Structure & Algorithms', credits: 3 },
    { name: 'Computer Organisation', credits: 3 },
    { name: 'Mathematics III', credits: 4 },
    { name: 'Economics for Engineers', credits: 3 },
    { name: 'Data Structure Lab', credits: 2 }
  ],
  4: [
    { name: 'Discrete Mathematics', credits: 4 },
    { name: 'Computer Architecture', credits: 3 },
    { name: 'Formal Language & Automata', credits: 3 },
    { name: 'Design & Analysis of Algorithms', credits: 3 },
    { name: 'Biology for Engineers', credits: 3 },
    { name: 'Algorithm Lab', credits: 2 }
  ],
  5: [
    { name: 'Software Engineering', credits: 3 },
    { name: 'Compiler Design', credits: 3 },
    { name: 'Operating Systems', credits: 3 },
    { name: 'Object Oriented Programming', credits: 3 },
    { name: 'Constitution of India', credits: 0 },
    { name: 'Operating System Lab', credits: 2 }
  ],
  6: [
    { name: 'Database Management Systems', credits: 3 },
    { name: 'Computer Networks', credits: 3 },
    { name: 'Professional Elective I', credits: 3 },
    { name: 'Open Elective I', credits: 3 },
    { name: 'DBMS Lab', credits: 2 },
    { name: 'Computer Network Lab', credits: 2 }
  ],
  7: [
    { name: 'Professional Elective II', credits: 3 },
    { name: 'Open Elective II', credits: 3 },
    { name: 'Project I', credits: 3 },
    { name: 'Industrial Training / Seminar', credits: 2 },
    { name: 'Elective Lab', credits: 2 }
  ],
  8: [
    { name: 'Project II / Grand Viva', credits: 6 },
    { name: 'Professional Elective III', credits: 3 },
    { name: 'Open Elective III', credits: 3 }
  ]
};

export default function SemesterGpaCalculator({ semesterNumber }: { semesterNumber: number }) {
  const presets = SEMESTER_PRESETS[semesterNumber] || [];
  
  const [subjects, setSubjects] = useState<SubjectInput[]>(
    presets.map((p, idx) => ({
      id: idx.toString(),
      name: p.name,
      credits: p.credits,
      gradePoint: 8
    }))
  );

  const [customName, setCustomName] = useState('');
  const [customCredits, setCustomCredits] = useState('3');
  const [sgpa, setSgpa] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    let totalPoints = 0;
    let totalCredits = 0;
    
    subjects.forEach(sub => {
      totalPoints += sub.gradePoint * sub.credits;
      totalCredits += sub.credits;
    });

    if (totalCredits > 0) {
      const computedSgpa = totalPoints / totalCredits;
      setSgpa(computedSgpa);
      setPercentage(gpaToPercentage(computedSgpa));
    } else {
      setSgpa(0);
      setPercentage(0);
    }
  }, [subjects]);

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    const cr = parseFloat(customCredits);
    if (!customName.trim() || isNaN(cr) || cr <= 0) {
      toast.error('Please enter a valid subject name and credits.');
      return;
    }

    const newSub: SubjectInput = {
      id: Date.now().toString(),
      name: customName,
      credits: cr,
      gradePoint: 8
    };

    setSubjects([...subjects, newSub]);
    setCustomName('');
    toast.success('Custom subject added!');
  };

  const handleDeleteSub = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const handleGradeChange = (id: string, gradePoint: number) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, gradePoint } : s));
  };

  const breadcrumbs = [
    { label: 'Calculators', href: '/' },
    { label: `Semester ${semesterNumber} GPA Calculator` }
  ];

  // FAQ Schema JSON-LD
  const faqJson = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': `How are Semester ${semesterNumber} credits structured in MAKAUT?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Semester ${semesterNumber} typically comprises core engineering modules. Standard credits hover around ${presets.reduce((a, b) => a + b.credits, 0)} credits. SGPAs are calculated as Sum(GradePoint * Credits) / Sum(Credits).`
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
      
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Navbar />
      <main className="flex-grow bg-gray-50/50 dark:bg-gray-950/20 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={breadcrumbs} />

          <div className="text-center mb-8">
            <span className="px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold uppercase tracking-wider">Semester Specialist</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-950 dark:text-white mt-3">MAKAUT Semester {semesterNumber} GPA Calculator</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
              Select estimated grades for typical Semester {semesterNumber} papers to compute your prospective SGPA.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Subject Input grid */}
            <div className="lg:col-span-8 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-brand-primary" />
                    <CardTitle>Log Grades per Subject</CardTitle>
                  </div>
                  <CardDescription>Select expected grades for Semester {semesterNumber} subjects.</CardDescription>
                </CardHeader>

                <div className="space-y-4">
                  {subjects.map((sub) => (
                    <div key={sub.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 rounded-xl border border-gray-150 dark:border-gray-900 bg-gray-50/30 dark:bg-gray-900/10">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">{sub.name}</span>
                        <span className="text-[11px] text-gray-400 font-medium">Credits: {sub.credits}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <select
                          value={sub.gradePoint}
                          onChange={(e) => handleGradeChange(sub.id, parseInt(e.target.value))}
                          className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-xs font-semibold focus:border-brand-primary outline-none text-gray-900 dark:text-white"
                        >
                          <option value={10}>O Grade (10 Point / 90%+)</option>
                          <option value={9}>E Grade (9 Point / 80-89%)</option>
                          <option value={8}>A Grade (8 Point / 70-79%)</option>
                          <option value={7}>B Grade (7 Point / 60-69%)</option>
                          <option value={6}>C Grade (6 Point / 50-59%)</option>
                          <option value={5}>D Grade (5 Point / 40-49%)</option>
                          <option value={0}>F Grade (0 Point / Fail)</option>
                        </select>

                        <button
                          onClick={() => handleDeleteSub(sub.id)}
                          className="text-rose-500 hover:text-rose-600 p-1 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add Custom Subject Form */}
                  <form onSubmit={handleAddSubject} className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-150 dark:border-gray-900">
                    <input
                      type="text"
                      placeholder="Add custom paper name..."
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="flex-grow px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-xs focus:border-brand-primary outline-none transition-colors text-gray-900 dark:text-white"
                    />
                    <div className="flex gap-2 shrink-0">
                      <input
                        type="number"
                        step="0.5"
                        placeholder="Credits"
                        value={customCredits}
                        onChange={(e) => setCustomCredits(e.target.value)}
                        className="w-16 px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-xs focus:border-brand-primary outline-none text-center text-gray-900 dark:text-white"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-xs font-semibold rounded-xl flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> Add
                      </button>
                    </div>
                  </form>
                </div>
              </Card>
            </div>

            {/* Calculations Panel */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="bg-brand-primary/5 border-brand-primary/10">
                <CardHeader>
                  <CardTitle className="text-center text-xs font-bold text-brand-primary uppercase tracking-wider">SGPA Estimate Output</CardTitle>
                </CardHeader>
                <div className="text-center py-4 space-y-5">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Estimated SGPA</span>
                    <h2 className="text-4xl font-extrabold text-brand-primary mt-1.5">{sgpa.toFixed(2)}</h2>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Semester Percentage</span>
                    <h2 className="text-4xl font-extrabold text-brand-primary mt-1.5">{percentage.toFixed(1)}%</h2>
                  </div>
                  
                  {percentage >= 60 && (
                    <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl text-[10px] font-semibold flex items-center justify-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> High Score (SVMCM limit qualified)
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
