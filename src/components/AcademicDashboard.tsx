'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  useLocalStorage 
} from '../hooks/useLocalStorage';
import { 
  StudentProfile, 
  SemesterData, 
  CourseType, 
  ScholarshipType 
} from '../types';
import { 
  gpaToPercentage, 
  calculateCgpa, 
  percentageToGrade, 
  getDivision, 
  calculateAcademicHealth, 
  evaluatePlacementEligibility, 
  calculateYgpa, 
  calculateDgpa3Year, 
  calculateDgpa4Year, 
  calculateDgpaLateral,
  calculateGpaPlanner,
  calculateBacklogImpact,
  calculateAttendance,
  calculateInternalMarks
} from '../lib/formulas';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from './ui/Card';
import { 
  GraduationCap, 
  Plus, 
  Trash2, 
  Share2, 
  Printer, 
  TrendingUp, 
  Award, 
  Calendar, 
  Briefcase, 
  Calculator, 
  Sparkles, 
  AlertCircle,
  CheckCircle2,
  BookOpen,
  Info
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Client-side confetti import
const triggerConfetti = async () => {
  try {
    const confetti = (await import('canvas-confetti')).default;
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  } catch (err) {
    console.error(err);
  }
};

const DEFAULT_PROFILE: StudentProfile = {
  name: '',
  rollNumber: '',
  universityRoll: '',
  course: 'B.Tech',
  currentSemester: 1,
  scholarshipType: 'None',
  semesters: [],
  annualFamilyIncome: 150000,
  category: 'General',
  isWestBengalDomicile: true
};

const COURSE_CREDITS: Record<CourseType, number> = {
  'B.Tech': 20,
  'BCA': 22,
  'MCA': 22,
  'BBA': 20,
  'B.Sc': 20
};

export default function AcademicDashboard({ defaultCourse }: { defaultCourse?: CourseType }) {
  const [profile, setProfile] = useLocalStorage<StudentProfile>('student_profile', DEFAULT_PROFILE);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'planner' | 'predictor' | 'utilities' | 'charts'>('dashboard');
  
  // Local state for adding semester
  const [inputSemNum, setInputSemNum] = useState<number>(1);
  const [inputSgpa, setInputSgpa] = useState<string>('');
  const [inputCredits, setInputCredits] = useState<string>('');
  const [inputObtainedMarks, setInputObtainedMarks] = useState<string>('');
  const [inputTotalMarks, setInputTotalMarks] = useState<string>('');

  // Target Planner inputs
  const [targetCgpa, setTargetCgpa] = useState<string>('');
  const [remainingCredits, setRemainingCredits] = useState<string>('');

  // Backlog inputs
  const [backlogCount, setBacklogCount] = useState<number>(0);
  const [backlogCredits, setBacklogCredits] = useState<number>(0);

  // Attendance inputs
  const [attendedClasses, setAttendedClasses] = useState<string>('');
  const [totalClasses, setTotalClasses] = useState<string>('');

  // Internal Marks inputs
  const [caScores, setCaScores] = useState<string[]>(['', '', '', '']);
  const [attendanceScore, setAttendanceScore] = useState<string>('');

  // Hydration state
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Prefill course if specified
    if (defaultCourse && profile.semesters.length === 0 && profile.course !== defaultCourse) {
      setProfile(prev => ({
        ...prev,
        course: defaultCourse
      }));
      setInputCredits(COURSE_CREDITS[defaultCourse].toString());
    }

    // Auto-load shared data from URL if exists
    const hash = window.location.hash;
    if (hash && hash.startsWith('#share=')) {
      try {
        const encoded = hash.substring(7);
        const decoded = JSON.parse(atob(encoded));
        if (decoded && decoded.course) {
          setProfile(decoded);
          toast.success('Shared academic profile loaded successfully!');
          window.location.hash = ''; // Clear hash
        }
      } catch (err) {
        console.error('Failed to load shared profile:', err);
      }
    }
  }, [defaultCourse, setProfile]);

  if (!isClient) return <div className="p-8 text-center text-gray-500">Loading Academic Workspace...</div>;

  // Calculations
  const semestersSorted = [...profile.semesters].sort((a, b) => a.semesterNumber - b.semesterNumber);
  const semestersRecordedCount = semestersSorted.length;
  
  const currentCgpa = calculateCgpa(profile.semesters);
  const currentPercentage = gpaToPercentage(currentCgpa);
  
  const gpas = semestersSorted.map(s => s.sgpa);
  const highestGpa = gpas.length > 0 ? Math.max(...gpas) : 0;
  const lowestGpa = gpas.length > 0 ? Math.min(...gpas) : 0;
  
  const totalCredits = semestersSorted.reduce((acc, curr) => acc + curr.credits, 0);

  // Find semester SGPAs to compute Yearly averages under NEP 2020
  const getSemSgpa = (semNum: number) => {
    const sem = profile.semesters.find(s => s.semesterNumber === semNum);
    return sem ? sem.sgpa : 0;
  };

  const s1 = getSemSgpa(1);
  const s2 = getSemSgpa(2);
  const s3 = getSemSgpa(3);
  const s4 = getSemSgpa(4);
  const s5 = getSemSgpa(5);
  const s6 = getSemSgpa(6);
  const s7 = getSemSgpa(7);
  const s8 = getSemSgpa(8);

  const getSemCredits = (semNum: number) => {
    const sem = profile.semesters.find(s => s.semesterNumber === semNum);
    return sem ? sem.credits : 0;
  };

  const c1 = getSemCredits(1);
  const c2 = getSemCredits(2);
  const c3 = getSemCredits(3);
  const c4 = getSemCredits(4);
  const c5 = getSemCredits(5);
  const c6 = getSemCredits(6);
  const c7 = getSemCredits(7);
  const c8 = getSemCredits(8);

  const calculateYgpaFromSems = (sgpaA: number, creditsA: number, sgpaB: number, creditsB: number) => {
    if (sgpaA > 0 && sgpaB > 0) {
      const total = creditsA + creditsB;
      return total > 0 ? (sgpaA * creditsA + sgpaB * creditsB) / total : 0;
    }
    return sgpaA || sgpaB; // Fallback if only one semester is recorded
  };

  const y1 = calculateYgpaFromSems(s1, c1, s2, c2);
  const y2 = calculateYgpaFromSems(s3, c3, s4, c4);
  const y3 = calculateYgpaFromSems(s5, c5, s6, c6);
  const y4 = calculateYgpaFromSems(s7, c7, s8, c8);

  let dgpaHonors = 0;
  if (y1 > 0 && y2 > 0 && y3 > 0 && y4 > 0) {
    dgpaHonors = calculateDgpa4Year(y1, y2, y3, y4);
  } else {
    dgpaHonors = currentCgpa;
  }

  let dgpaExit = 0;
  if (y1 > 0 && y2 > 0 && y3 > 0) {
    dgpaExit = calculateDgpa3Year(y1, y2, y3);
  } else {
    dgpaExit = currentCgpa;
  }

  // Projected Year averages (replacing missing years with current CGPA to predict final DGPA)
  const py1 = y1 > 0 ? y1 : (currentCgpa > 0 ? currentCgpa : 8.0);
  const py2 = y2 > 0 ? y2 : (currentCgpa > 0 ? currentCgpa : 8.0);
  const py3 = y3 > 0 ? y3 : (currentCgpa > 0 ? currentCgpa : 8.0);
  const py4 = y4 > 0 ? y4 : (currentCgpa > 0 ? currentCgpa : 8.0);

  const dgpaHonorsProjected = calculateDgpa4Year(py1, py2, py3, py4);
  const dgpaExitProjected = calculateDgpa3Year(py1, py2, py3);

  // Academic health and Placement metrics
  const activeBacklogs = backlogCount;
  const healthDetails = calculateAcademicHealth(currentCgpa, profile.scholarshipType !== 'None', activeBacklogs);
  const placementDetails = evaluatePlacementEligibility(currentCgpa, activeBacklogs, currentPercentage);

  // Scholarship calculations
  let scholarshipEligibilityText = 'Ineligible';
  let scholarshipStatusColor = 'text-rose-500 bg-rose-500/10 border-rose-500/20';
  let scholarshipDetailsText = '';

  if (profile.scholarshipType === 'SVMCM') {
    const freshEligible = profile.isWestBengalDomicile && profile.annualFamilyIncome <= 250000 && currentPercentage >= 60;
    const renewalEligible = currentPercentage >= 60 && activeBacklogs === 0;
    if (semestersRecordedCount === 0) {
      scholarshipEligibilityText = 'Requires >= 60% average';
      scholarshipStatusColor = 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    } else if (freshEligible || (semestersRecordedCount > 0 && renewalEligible)) {
      scholarshipEligibilityText = 'SVMCM Eligible';
      scholarshipStatusColor = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      scholarshipDetailsText = 'Meets income (< 2.5L), domicile, and academic criteria (>= 60%).';
    } else {
      scholarshipEligibilityText = 'SVMCM Ineligible';
      if (currentPercentage < 60) scholarshipDetailsText = 'Required percentage is 60%. Currently at ' + currentPercentage.toFixed(1) + '%. ';
      if (profile.annualFamilyIncome > 250000) scholarshipDetailsText += 'Family income exceeds ₹2.5 Lakhs. ';
      if (activeBacklogs > 0) scholarshipDetailsText += 'Active backlogs are not allowed for renewal.';
    }
  } else if (profile.scholarshipType === 'Oasis') {
    const eligible = profile.isWestBengalDomicile && currentPercentage >= 50;
    if (semestersRecordedCount === 0) {
      scholarshipEligibilityText = 'Requires >= 50% average';
      scholarshipStatusColor = 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    } else if (eligible) {
      scholarshipEligibilityText = 'Oasis Eligible';
      scholarshipStatusColor = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      scholarshipDetailsText = 'SC/ST/OBC domicile student with percentage >= 50%.';
    } else {
      scholarshipEligibilityText = 'Oasis Ineligible';
      scholarshipDetailsText = 'Oasis requires at least 50% score. Domicile required.';
    }
  } else if (profile.scholarshipType === 'Aikyashree') {
    const eligible = profile.isWestBengalDomicile && currentPercentage >= 50;
    if (semestersRecordedCount === 0) {
      scholarshipEligibilityText = 'Requires >= 50% average';
      scholarshipStatusColor = 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    } else if (eligible) {
      scholarshipEligibilityText = 'Aikyashree Eligible';
      scholarshipStatusColor = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      scholarshipDetailsText = 'Minority student meeting domicile and academic criteria (>= 50%).';
    } else {
      scholarshipEligibilityText = 'Aikyashree Ineligible';
      scholarshipDetailsText = 'Aikyashree requires at least 50% score. Domicile required.';
    }
  } else {
    scholarshipEligibilityText = 'No Scholarship Tracked';
    scholarshipStatusColor = 'text-gray-500 bg-gray-500/10 border-gray-500/20';
  }

  // Handle adding semester
  const handleAddSemester = (e: React.FormEvent) => {
    e.preventDefault();
    const sgpaNum = parseFloat(inputSgpa);
    const creditsNum = parseInt(inputCredits);
    
    if (isNaN(sgpaNum) || sgpaNum < 0 || sgpaNum > 10) {
      toast.error('Please enter a valid SGPA between 0.00 and 10.00');
      return;
    }
    if (isNaN(creditsNum) || creditsNum <= 0) {
      toast.error('Please enter valid credits');
      return;
    }

    const exists = profile.semesters.some(s => s.semesterNumber === inputSemNum);
    if (exists) {
      toast.error(`Semester ${inputSemNum} is already recorded. Delete it first to re-add.`);
      return;
    }

    const newSem: SemesterData = {
      semesterNumber: inputSemNum,
      sgpa: sgpaNum,
      credits: creditsNum,
      totalMarks: inputTotalMarks ? parseInt(inputTotalMarks) : undefined,
      obtainedMarks: inputObtainedMarks ? parseInt(inputObtainedMarks) : undefined
    };

    const updatedSems = [...profile.semesters, newSem].sort((a, b) => a.semesterNumber - b.semesterNumber);
    setProfile({ ...profile, semesters: updatedSems });
    
    // Reset inputs
    setInputSgpa('');
    setInputObtainedMarks('');
    setInputTotalMarks('');
    
    // Auto increment sem selector
    const nextSem = Math.min(8, inputSemNum + 1);
    setInputSemNum(nextSem);
    
    triggerConfetti();
    toast.success(`Semester ${inputSemNum} results logged!`);
  };

  // Delete semester
  const handleDeleteSem = (semNum: number) => {
    const updatedSems = profile.semesters.filter(s => s.semesterNumber !== semNum);
    setProfile({ ...profile, semesters: updatedSems });
    toast.info(`Semester ${semNum} results removed.`);
  };

  // Save profile info
  const handleUpdateProfile = (field: keyof StudentProfile, value: any) => {
    setProfile({ ...profile, [field]: value });
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // Share profile
  const handleShare = () => {
    try {
      const encoded = btoa(JSON.stringify(profile));
      const shareUrl = `${window.location.origin}${window.location.pathname}#share=${encoded}`;
      navigator.clipboard.writeText(shareUrl);
      toast.success('Shareable profile URL copied to clipboard!');
    } catch (err) {
      toast.error('Failed to generate sharing URL.');
    }
  };

  // Recharts Data
  const chartData = semestersSorted.map(s => ({
    name: `Sem ${s.semesterNumber}`,
    SGPA: s.sgpa,
    Percentage: parseFloat(gpaToPercentage(s.sgpa).toFixed(1))
  }));

  // GPA Planner Result
  const plannerTargetCgpaNum = parseFloat(targetCgpa);
  const plannerRemainingCreditsNum = parseInt(remainingCredits);
  let plannerResult: any = null;
  if (!isNaN(plannerTargetCgpaNum) && !isNaN(plannerRemainingCreditsNum) && plannerRemainingCreditsNum > 0) {
    plannerResult = calculateGpaPlanner(
      currentCgpa,
      totalCredits,
      plannerTargetCgpaNum,
      plannerRemainingCreditsNum
    );
  }

  // Attendance Result
  const attTotal = parseInt(totalClasses);
  const attAttended = parseInt(attendedClasses);
  let attendanceResult: any = null;
  if (!isNaN(attTotal) && !isNaN(attAttended) && attTotal > 0 && attAttended >= 0) {
    attendanceResult = calculateAttendance(attAttended, attTotal, 75);
  }

  // Internal Marks Result
  const caListNumbers = caScores.map(v => parseFloat(v)).filter(v => !isNaN(v));
  const attendancePoint = parseFloat(attendanceScore);
  let internalMarksResult: any = null;
  if (caListNumbers.length > 0 && !isNaN(attendancePoint)) {
    internalMarksResult = calculateInternalMarks(caListNumbers, attendancePoint);
  }

  // Backlog Impact Result
  const backlogImpactResult = calculateBacklogImpact(
    currentCgpa,
    backlogCount,
    backlogCredits,
    totalCredits
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 print-container">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      {/* Top Header / Profile Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-gray-250 dark:border-gray-900 pb-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-2 inline-block">
            Workspace
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Academic Intelligence Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Analyze, plan, and optimize your MAKAUT grades and placements in real-time.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 no-print">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors"
          >
            <Share2 className="w-4 h-4 text-brand-secondary" /> Share Profile
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors"
          >
            <Printer className="w-4 h-4 text-brand-accent" /> Print PDF
          </button>
        </div>
      </div>

      {/* Profile Setup / Mini Form Card (No-print) */}
      <Card className="mb-8 no-print">
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-brand-primary" />
            <CardTitle>Academic Profile Details</CardTitle>
          </div>
          <CardDescription>Configure your program context to calibrate scholarship checks and placement eligibility scores.</CardDescription>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleUpdateProfile('name', e.target.value)}
              placeholder="Student Name"
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Course / Degree</label>
            <select
              value={profile.course}
              onChange={(e) => {
                const course = e.target.value as CourseType;
                setProfile({
                  ...profile,
                  course,
                  // prefill standard credit if empty semesters
                  semesters: profile.semesters.map(s => ({ ...s, credits: COURSE_CREDITS[course] }))
                });
                setInputCredits(COURSE_CREDITS[course].toString());
              }}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors dark:bg-gray-950 text-gray-900 dark:text-white"
            >
              <option value="B.Tech">B.Tech (4 Year)</option>
              <option value="BCA">BCA (4 Year / 3-Yr Exit)</option>
              <option value="MCA">MCA (2 Year)</option>
              <option value="BBA">BBA (4 Year / 3-Yr Exit)</option>
              <option value="B.Sc">B.Sc (4 Year / 3-Yr Exit)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Scholarship Portal</label>
            <select
              value={profile.scholarshipType}
              onChange={(e) => handleUpdateProfile('scholarshipType', e.target.value as ScholarshipType)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors dark:bg-gray-950"
            >
              <option value="None">None</option>
              <option value="SVMCM">SVMCM (Bikash Bhavan)</option>
              <option value="Oasis">Oasis Scholarship</option>
              <option value="Aikyashree">Aikyashree</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Family Income (Annual)</label>
            <input
              type="number"
              value={profile.annualFamilyIncome}
              onChange={(e) => handleUpdateProfile('annualFamilyIncome', parseInt(e.target.value) || 0)}
              placeholder="Income in INR"
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Category & Domicile</label>
            <div className="flex gap-2">
              <select
                value={profile.category}
                onChange={(e) => handleUpdateProfile('category', e.target.value)}
                className="w-1/2 px-2 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors dark:bg-gray-950"
              >
                <option value="General">General</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="OBC">OBC</option>
                <option value="Minority">Minority</option>
              </select>
              <button
                onClick={() => handleUpdateProfile('isWestBengalDomicile', !profile.isWestBengalDomicile)}
                className={`w-1/2 px-2 py-2 border rounded-xl text-xs font-semibold transition-colors ${profile.isWestBengalDomicile ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-gray-500/10 text-gray-500 border-gray-500/20'}`}
              >
                {profile.isWestBengalDomicile ? 'WB Domicile' : 'Non-WB Domicile'}
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card className="flex flex-col justify-between py-5 border-l-4 border-l-brand-primary">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Current CGPA</span>
            <TrendingUp className="w-5 h-5 text-brand-primary" />
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-none">
              {currentCgpa > 0 ? currentCgpa.toFixed(2) : '0.00'}
            </h2>
            <p className="text-xs text-gray-400 mt-1.5 font-medium">
              Equiv: {currentPercentage.toFixed(1)}% Marks
            </p>
          </div>
        </Card>

        <Card className="flex flex-col justify-between py-5 border-l-4 border-l-brand-secondary">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Scholarship Rank</span>
            <Award className="w-5 h-5 text-brand-secondary" />
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-bold truncate leading-none">
              {scholarshipEligibilityText}
            </h2>
            <p className="text-[11px] text-gray-400 mt-1.5 leading-tight line-clamp-1">
              {scholarshipDetailsText || 'Select a portal above'}
            </p>
          </div>
        </Card>

        <Card className="flex flex-col justify-between py-5 border-l-4 border-l-brand-accent">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Placement Readiness</span>
            <Briefcase className="w-5 h-5 text-brand-accent" />
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-none">
              {placementDetails.score}%
            </h2>
            <p className="text-[11px] text-gray-400 mt-1.5 leading-tight line-clamp-1">
              {placementDetails.productCompanyEligible ? 'Product-company Ready' : placementDetails.serviceCompanyEligible ? 'Service-company Ready' : 'Criteria incomplete'}
            </p>
          </div>
        </Card>

        <Card className="flex flex-col justify-between py-5 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Academic Standing</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-none">
              {healthDetails.score}
            </h2>
            <p className="text-xs text-gray-400 mt-1.5 font-medium truncate">
              {healthDetails.status}
            </p>
          </div>
        </Card>
      </div>

      {/* Tabs Layout */}
      <div className="flex border-b border-gray-200 dark:border-gray-900 mb-8 overflow-x-auto gap-2 no-print">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'dashboard' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
        >
          Semester Logs
        </button>
        <button
          onClick={() => setActiveTab('charts')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'charts' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
        >
          Performance Charts
        </button>
        <button
          onClick={() => setActiveTab('planner')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'planner' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
        >
          CGPA Planner
        </button>
        <button
          onClick={() => setActiveTab('predictor')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'predictor' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
        >
          Smart Predictor
        </button>
        <button
          onClick={() => setActiveTab('utilities')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'utilities' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
        >
          Auxiliary Tools
        </button>
      </div>

      {/* Active Tab Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left main panel */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* TAB: DASHBOARD (SEMESTER ENTRY) */}
          {activeTab === 'dashboard' && (
            <>
              {/* Form to Log Sem results (No-print) */}
              <Card className="no-print">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-brand-primary" />
                    <CardTitle>Log Semester Results</CardTitle>
                  </div>
                  <CardDescription>Enter SGPA and credits for completed semesters to calculate your cumulative statistics.</CardDescription>
                </CardHeader>
                <form onSubmit={handleAddSemester} className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Semester</label>
                    <select
                      value={inputSemNum}
                      onChange={(e) => {
                        const sNum = parseInt(e.target.value);
                        setInputSemNum(sNum);
                        // prefill credits based on course
                        if (!inputCredits) {
                          setInputCredits(COURSE_CREDITS[profile.course].toString());
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors dark:bg-gray-950 text-gray-900 dark:text-white"
                    >
                      {(profile.course === 'MCA' ? [1,2,3,4] : [1,2,3,4,5,6,7,8]).map(n => (
                        <option key={n} value={n}>Semester {n}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">SGPA</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      required
                      placeholder="e.g. 8.24"
                      value={inputSgpa}
                      onChange={(e) => setInputSgpa(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Credits</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 20"
                      value={inputCredits}
                      onChange={(e) => setInputCredits(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Obt. Marks (Opt.)</label>
                    <input
                      type="number"
                      placeholder="e.g. 580"
                      value={inputObtainedMarks}
                      onChange={(e) => setInputObtainedMarks(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-1/2">
                      <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Total (Opt.)</label>
                      <input
                        type="number"
                        placeholder="800"
                        value={inputTotalMarks}
                        onChange={(e) => setInputTotalMarks(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-900 dark:text-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-1/2 p-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-xl font-bold flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow h-10"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </Card>

              {/* Recorded Semesters List */}
              <Card className="print-page-break">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-brand-secondary" />
                      <CardTitle>Recorded Semesters ({semestersRecordedCount}/{profile.course === 'MCA' ? 4 : 8})</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                {semestersRecordedCount === 0 ? (
                  <div className="p-8 text-center text-gray-400 text-sm">
                    No semester data recorded. Add semester results above to generate academic charts and calculators.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">
                          <th className="py-3 px-4">Semester</th>
                          <th className="py-3 px-4">SGPA</th>
                          <th className="py-3 px-4">Credits</th>
                          <th className="py-3 px-4">Percentage</th>
                          <th className="py-3 px-4">Marks (Obtained/Total)</th>
                          <th className="py-3 px-4 no-print">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {semestersSorted.map((sem) => {
                          const percentage = gpaToPercentage(sem.sgpa);
                          return (
                            <tr key={sem.semesterNumber} className="border-b border-gray-100 dark:border-gray-900/60 hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors">
                              <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">Semester {sem.semesterNumber}</td>
                              <td className="py-3.5 px-4 font-semibold text-brand-primary">{sem.sgpa.toFixed(2)}</td>
                              <td className="py-3.5 px-4">{sem.credits}</td>
                              <td className="py-3.5 px-4 font-medium">{percentage.toFixed(1)}%</td>
                              <td className="py-3.5 px-4">
                                {sem.obtainedMarks !== undefined && sem.totalMarks !== undefined 
                                  ? `${sem.obtainedMarks} / ${sem.totalMarks}`
                                  : '-'}
                              </td>
                              <td className="py-3.5 px-4 no-print">
                                <button
                                  onClick={() => handleDeleteSem(sem.semesterNumber)}
                                  className="text-rose-500 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                                  aria-label="Delete Semester"
                                >
                                  <Trash2 className="w-4.5 h-4.5" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            </>
          )}

          {/* TAB: CHARTS */}
          {activeTab === 'charts' && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-brand-accent" />
                  <CardTitle>Academic Growth & Trends</CardTitle>
                </div>
                <CardDescription>Interactive visualization of SGPA fluctuations and semester-over-semester percentages.</CardDescription>
              </CardHeader>
              {semestersRecordedCount < 2 ? (
                <div className="p-12 text-center text-gray-400 text-sm">
                  Add at least 2 semester records to render academic trends charts.
                </div>
              ) : (
                <div className="space-y-8">
                  {/* SGPA Line Chart */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 px-2">Semester SGPA Profile</h4>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#2a303c" opacity={0.1} />
                          <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                          <YAxis stroke="#64748b" fontSize={11} domain={[0, 10]} />
                          <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff' }} />
                          <Line type="monotone" dataKey="SGPA" stroke="#2563eb" strokeWidth={3} activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  {/* Percentage Bar Chart */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 px-2">Percentage Conversion Trend</h4>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#2a303c" opacity={0.1} />
                          <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                          <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                          <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff' }} />
                          <Bar dataKey="Percentage" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* TAB: PLANNER */}
          {activeTab === 'planner' && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-primary" />
                  <CardTitle>CGPA Target Planner</CardTitle>
                </div>
                <CardDescription>Determine what average SGPA you need in subsequent semesters to secure your target degree GPA.</CardDescription>
              </CardHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Target CGPA</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      placeholder="e.g. 8.5"
                      value={targetCgpa}
                      onChange={(e) => setTargetCgpa(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Remaining Credits</label>
                    <input
                      type="number"
                      placeholder="e.g. 40"
                      value={remainingCredits}
                      onChange={(e) => setRemainingCredits(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/40 rounded-xl text-xs space-y-2 border border-gray-200 dark:border-gray-900">
                    <p className="font-semibold text-gray-700 dark:text-gray-300">How this works:</p>
                    <p className="text-gray-500">Based on your logged {totalCredits} credits (GPA: {currentCgpa > 0 ? currentCgpa.toFixed(2) : '0.00'}), we calculate the required SGPA for your remaining semesters.</p>
                  </div>
                </div>

                <div>
                  {plannerResult ? (
                    <div className="p-6 rounded-2xl bg-brand-primary/5 border border-brand-primary/10 flex flex-col gap-4 text-center">
                      <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">Analysis Result</span>
                      
                      {plannerResult.isPossible ? (
                        <>
                          <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400 block">Required Future GPA</span>
                            <span className="text-4xl font-extrabold text-brand-primary mt-1 block">{plannerResult.requiredGpa}</span>
                          </div>

                          <div className="w-full bg-gray-200 dark:bg-gray-800 h-2.5 rounded-full overflow-hidden mt-2">
                            <div 
                              className="bg-brand-primary h-full rounded-full transition-all duration-500" 
                              style={{ width: `${plannerResult.probability}%` }}
                            />
                          </div>
                          
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>Achievability:</span>
                            <span className="font-bold text-brand-primary">{plannerResult.probability}% Chance</span>
                          </div>

                          <div className="p-3 bg-white dark:bg-gray-950 rounded-xl text-xs text-gray-500 dark:text-gray-400 text-left border border-gray-150 dark:border-gray-900 mt-2 flex gap-2">
                            <Info className="w-4 h-4 shrink-0 text-brand-secondary mt-0.5" />
                            <span>
                              {plannerResult.requiredGpa > 8.5 
                                ? 'This will require consistent and exceptional scores (>= 8.5 SGPA). Dedicate extra hours to internals and theory CAs.' 
                                : 'This is highly achievable with standard MAKAUT preparation. Keep checking your attendance logs.'}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="py-4">
                          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-2" />
                          <h4 className="font-bold text-gray-900 dark:text-white">Goal Mathematically Impossible</h4>
                          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                            To hit {targetCgpa} CGPA, you would need an SGPA of {plannerResult.requiredGpa}, which exceeds the 10.0 scale limit. Try setting a slightly lower target CGPA.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col justify-center items-center p-8 text-center text-gray-400 text-sm border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
                      <GraduationCap className="w-8 h-8 text-gray-300 mb-2" />
                      Enter target CGPA and remaining credits on the left to review your action plan.
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* TAB: PREDICTOR */}
          {activeTab === 'predictor' && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-secondary" />
                  <CardTitle>Smart Academic Predictor</CardTitle>
                </div>
                <CardDescription>Predicts final degree statistics based on current performance and local trends.</CardDescription>
              </CardHeader>

              {semestersRecordedCount === 0 ? (
                <div className="p-8 text-center text-gray-400 text-sm">
                  Log at least 1 semester to run predictions.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left stats */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">Projected Degree Output</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-250 dark:border-gray-900">
                        <span className="text-[10px] uppercase font-bold text-gray-400">Predicted CGPA</span>
                        <span className="text-xl font-bold block text-brand-primary mt-1">{currentCgpa.toFixed(2)}</span>
                      </div>
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-250 dark:border-gray-900">
                        <span className="text-[10px] uppercase font-bold text-gray-400">Degree Division</span>
                        <span className="text-sm font-bold block text-emerald-500 mt-1.5 truncate">{getDivision(currentPercentage)}</span>
                      </div>
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-250 dark:border-gray-900">
                        <span className="text-[10px] uppercase font-bold text-gray-400">DGPA Projection</span>
                        <div className="text-sm font-bold block text-brand-secondary mt-1.5 leading-tight">
                          {profile.course === 'MCA' ? (
                            <span>{currentCgpa.toFixed(2)}</span>
                          ) : profile.course === 'B.Tech' ? (
                            <div className="space-y-0.5">
                              <div className="text-sm">
                                {y4 > 0 ? `${dgpaHonors.toFixed(2)} (Calc)` : `${dgpaHonorsProjected.toFixed(2)} (Proj)`}
                              </div>
                              {y4 === 0 && <span className="text-[9px] text-gray-400 font-normal">Assumes current trend for Y4</span>}
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <div className="text-xs">
                                <span className="text-[10px] text-gray-400 block font-normal">4-Yr Honors:</span>
                                {y1 > 0 && y2 > 0 && y3 > 0 && y4 > 0 ? `${dgpaHonors.toFixed(2)} (Calc)` : `${dgpaHonorsProjected.toFixed(2)} (Proj)`}
                              </div>
                              <div className="text-xs border-t border-gray-250 dark:border-gray-800 pt-1">
                                <span className="text-[10px] text-gray-400 block font-normal">3-Yr Exit:</span>
                                {y1 > 0 && y2 > 0 && y3 > 0 ? `${dgpaExit.toFixed(2)} (Calc)` : `${dgpaExitProjected.toFixed(2)} (Proj)`}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-250 dark:border-gray-900">
                        <span className="text-[10px] uppercase font-bold text-gray-400">Degree Percentage</span>
                        <span className="text-xl font-bold block text-brand-accent mt-1">{currentPercentage.toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-900 text-xs text-gray-500 dark:text-gray-400 space-y-2">
                      <span className="font-bold block text-gray-700 dark:text-gray-300">MAKAUT DGPA Formula Weights:</span>
                      <p>DGPA is heavily weighted towards final years. Keep your SGPAs in semesters 5 to 8 above 8.25 to secure First Class with Distinction.</p>
                    </div>
                  </div>

                  {/* Right analysis */}
                  <div className="p-5 rounded-2xl bg-brand-secondary/5 border border-brand-secondary/10 flex flex-col gap-4">
                    <span className="text-xs font-bold text-brand-secondary uppercase tracking-wider text-center">Placement Readiness Score</span>
                    <div className="flex flex-col items-center">
                      <div className="relative w-28 h-28 flex items-center justify-center rounded-full bg-white dark:bg-gray-950 border-4 border-brand-secondary shadow-lg">
                        <span className="text-3xl font-extrabold text-brand-secondary">{placementDetails.score}%</span>
                      </div>
                    </div>
                    <div className="space-y-2.5 mt-2">
                      {placementDetails.feedback.map((feed, idx) => (
                        <div key={idx} className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                          <span>{feed}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* TAB: UTILITIES */}
          {activeTab === 'utilities' && (
            <div className="space-y-6">
              
              {/* Attendance Calculator */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-brand-primary" />
                    <CardTitle>Attendance & Absence Tracker</CardTitle>
                  </div>
                  <CardDescription>Determine classes needed to reach 75% or check how many classes you can safely miss.</CardDescription>
                </CardHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Attended Classes</label>
                        <input
                          type="number"
                          placeholder="e.g. 45"
                          value={attendedClasses}
                          onChange={(e) => setAttendedClasses(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Total Classes Conducted</label>
                        <input
                          type="number"
                          placeholder="e.g. 60"
                          value={totalClasses}
                          onChange={(e) => setTotalClasses(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    {attendanceResult ? (
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-900 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-gray-400">Current Percentage:</span>
                          <span className={`text-lg font-bold ${attendanceResult.status === 'safe' ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {attendanceResult.currentPercentage}%
                          </span>
                        </div>
                        {attendanceResult.currentPercentage < 75 ? (
                          <div className="text-xs text-rose-500 flex gap-2 p-2 bg-rose-500/5 rounded-lg border border-rose-500/10">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>You must attend <strong>{attendanceResult.classesNeeded}</strong> consecutive classes to reach the required 75% target.</span>
                          </div>
                        ) : (
                          <div className="text-xs text-emerald-500 flex gap-2 p-2 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>Awesome! Your attendance is in the safe zone. You can safely miss up to <strong>{attendanceResult.safeAbsences}</strong> classes.</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center text-xs text-gray-400 p-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                        Enter attended and total classes to calculate stats.
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Internal Marks Calculator */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-brand-secondary" />
                    <CardTitle>Internal Marks Estimator (Theory)</CardTitle>
                  </div>
                  <CardDescription>Enter up to 4 Continuous Assessment (CA) scores to find your best-of-2 scaled average + attendance points.</CardDescription>
                </CardHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-2">
                      {[0,1,2,3].map((idx) => (
                        <div key={idx}>
                          <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">CA {idx+1} (/25)</label>
                          <input
                            type="number"
                            min="0"
                            max="25"
                            placeholder="0-25"
                            value={caScores[idx]}
                            onChange={(e) => {
                              const newScores = [...caScores];
                              newScores[idx] = e.target.value;
                              setCaScores(newScores);
                            }}
                            className="w-full px-2 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-center text-gray-900 dark:text-white"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Attendance Score (0 to 5)</label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        placeholder="e.g. 5"
                        value={attendanceScore}
                        onChange={(e) => setAttendanceScore(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    {internalMarksResult ? (
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-900 space-y-3">
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>Best 2 Average (/25):</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{internalMarksResult.bestAverage}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>Attendance Points (/5):</span>
                          <span className="font-semibold text-gray-900 dark:text-white">+{internalMarksResult.attendance}</span>
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-800 pt-2 font-bold">
                          <span className="text-sm">Final Internal Marks:</span>
                          <span className="text-lg text-brand-secondary">{internalMarksResult.total} / 30</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-xs text-gray-400 p-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                        Enter CA scores and attendance marks to compute internals.
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Backlog Impact Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-rose-500" />
                    <CardTitle>Backlog Impact Analyzer</CardTitle>
                  </div>
                  <CardDescription>Determine how backlog papers impact your CGPA and read recommendations for recovery.</CardDescription>
                </CardHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Backlog Papers Count</label>
                        <input
                          type="number"
                          placeholder="e.g. 1"
                          value={backlogCount}
                          onChange={(e) => setBacklogCount(parseInt(e.target.value) || 0)}
                          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Backlog Credits Weight</label>
                        <input
                          type="number"
                          placeholder="e.g. 4"
                          value={backlogCredits}
                          onChange={(e) => setBacklogCredits(parseInt(e.target.value) || 0)}
                          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    {backlogCount > 0 ? (
                      <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 space-y-3">
                        <div className="flex justify-between items-center text-xs text-rose-500">
                          <span>Estimated CGPA Drop:</span>
                          <span className="font-bold">-{backlogImpactResult.gpaDrop}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-400">
                          <span>Recovery Credits Needed:</span>
                          <span className="font-bold text-gray-800 dark:text-gray-200">{backlogImpactResult.recoveryCreditsNeeded} credits</span>
                        </div>
                        <div className="text-[11px] text-gray-500 border-t border-gray-200 dark:border-gray-800/80 pt-2 leading-relaxed">
                          <strong>Recovery Strategy:</strong> Standard MAKAUT backlog papers must be cleared in the next matching semester (odd/even). Ensure you secure at least an <strong>E (Excellent/9 Point)</strong> grade in the backlog exam to neutralize the GPA drop.
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-xs text-emerald-500 bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl font-medium">
                        No active backlogs logged. You have a clean academic standing!
                      </div>
                    )}
                  </div>
                </div>
              </Card>

            </div>
          )}
        </div>

        {/* Right Sidebar panel */}
        <div className="lg:col-span-4 space-y-6 print-container">
          
          {/* Quick Academic Analytics (Side block) */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4.5 h-4.5 text-brand-primary" />
                <CardTitle>Academic Summary</CardTitle>
              </div>
            </CardHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-900 pb-2">
                <span className="text-gray-400 font-medium">Course Duration</span>
                <span className="font-bold text-gray-900 dark:text-white">{profile.course}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-900 pb-2">
                <span className="text-gray-400 font-medium">Recorded Semesters</span>
                <span className="font-bold text-gray-900 dark:text-white">{semestersRecordedCount} / {profile.course === 'MCA' ? 4 : 8}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-900 pb-2">
                <span className="text-gray-400 font-medium">Total Logged Credits</span>
                <span className="font-bold text-gray-900 dark:text-white">{totalCredits}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-900 pb-2">
                <span className="text-gray-400 font-medium">Highest SGPA</span>
                <span className="font-semibold text-emerald-500">{highestGpa > 0 ? highestGpa.toFixed(2) : '-'}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-900 pb-2">
                <span className="text-gray-400 font-medium">Lowest SGPA</span>
                <span className="font-semibold text-rose-500">{lowestGpa > 0 ? lowestGpa.toFixed(2) : '-'}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-medium">Overall Division</span>
                <span className="font-bold text-brand-primary">{currentCgpa > 0 ? getDivision(currentPercentage) : '-'}</span>
              </div>
            </div>
          </Card>

          {/* Scholarship details sidebar block */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Award className="w-4.5 h-4.5 text-brand-secondary" />
                <CardTitle>Scholarship Audit</CardTitle>
              </div>
            </CardHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-900 pb-2">
                <span className="text-gray-400 font-medium">Tracked Scholarship</span>
                <span className="font-bold text-gray-900 dark:text-white">{profile.scholarshipType}</span>
              </div>
              <div className={`p-3 rounded-xl border text-xs font-semibold text-center ${scholarshipStatusColor}`}>
                {scholarshipEligibilityText}
              </div>
              {scholarshipDetailsText && (
                <div className="p-3 bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-900 rounded-xl text-[11px] leading-relaxed text-gray-500">
                  {scholarshipDetailsText}
                </div>
              )}
            </div>
          </Card>

          {/* Quick Clear Local Storage (no-print) */}
          <Card className="no-print">
            <CardHeader>
              <CardTitle className="text-sm">Reset Workspace</CardTitle>
            </CardHeader>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear your local student profile and all recorded semesters? This action cannot be undone.')) {
                  setProfile(DEFAULT_PROFILE);
                  toast.warn('All workspace profile and semester logs have been cleared.');
                }
              }}
              className="w-full py-2 bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/20 text-rose-500 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Clear Local Data
            </button>
          </Card>

        </div>
      </div>
    </div>
  );
}
