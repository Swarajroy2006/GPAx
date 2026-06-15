import { SemesterData } from '../types';

/**
 * SGPA or CGPA to Percentage converter for MAKAUT.
 * Formula: (GPA - 0.75) * 10
 */
export function gpaToPercentage(gpa: number): number {
  if (gpa <= 0.75) return 0;
  return Math.max(0, Math.min(100, (gpa - 0.75) * 10));
}

/**
 * Percentage to GPA (SGPA/CGPA) converter.
 * Formula: (Percentage / 10) + 0.75
 */
export function percentageToGpa(percentage: number): number {
  if (percentage <= 0) return 0.75;
  return Math.max(0, Math.min(10, (percentage / 10) + 0.75));
}

/**
 * Calculate YGPA from Odd and Even semester SGPAs and credit weightings.
 * Formula: (Odd_SGPA * Odd_Credits + Even_SGPA * Even_Credits) / (Odd_Credits + Even_Credits)
 */
export function calculateYgpa(
  oddSgpa: number,
  evenSgpa: number,
  oddCredits: number = 20,
  evenCredits: number = 20
): number {
  const totalCredits = oddCredits + evenCredits;
  if (totalCredits <= 0) return 0;
  return (oddSgpa * oddCredits + evenSgpa * evenCredits) / totalCredits;
}

/**
 * Calculate 4-Year Degree Grade Point Average (DGPA).
 * Formula: (YGPA1 + YGPA2 + 1.5 * YGPA3 + 1.5 * YGPA4) / 5
 */
export function calculateDgpa4Year(
  ygpa1: number,
  ygpa2: number,
  ygpa3: number,
  ygpa4: number
): number {
  return (ygpa1 + ygpa2 + 1.5 * ygpa3 + 1.5 * ygpa4) / 5;
}

/**
 * Calculate Lateral Entry Degree Grade Point Average (DGPA).
 * Formula: (YGPA2 + 1.5 * YGPA3 + 1.5 * YGPA4) / 4
 */
export function calculateDgpaLateral(
  ygpa2: number,
  ygpa3: number,
  ygpa4: number
): number {
  return (ygpa2 + 1.5 * ygpa3 + 1.5 * ygpa4) / 4;
}

/**
 * Calculate 3-Year Degree Grade Point Average (DGPA) (e.g. BCA/BBA/B.Sc under 3-Yr Exit or legacy course).
 * Formula: (YGPA1 + YGPA2 + YGPA3) / 3
 */
export function calculateDgpa3Year(
  ygpa1: number,
  ygpa2: number,
  ygpa3: number
): number {
  return (ygpa1 + ygpa2 + ygpa3) / 3;
}

/**
 * Calculate 2-Year Degree Grade Point Average (DGPA) (e.g. MCA).
 * Formula: (YGPA1 + YGPA2) / 2
 */
export function calculateDgpa2Year(
  ygpa1: number,
  ygpa2: number
): number {
  return (ygpa1 + ygpa2) / 2;
}

/**
 * Calculate 1-Year Degree Grade Point Average (DGPA).
 * Formula: YGPA1
 */
export function calculateDgpa1Year(
  ygpa1: number
): number {
  return ygpa1;
}

/**
 * Calculate CGPA based on semester SGPAs and credit allocations.
 * Formula: Sum(SGPA * Credits) / Sum(Credits)
 */
export function calculateCgpa(semesters: { sgpa: number; credits: number }[]): number {
  const activeSems = semesters.filter(s => s.sgpa > 0 && s.credits > 0);
  if (activeSems.length === 0) return 0;
  
  const totalPoints = activeSems.reduce((acc, curr) => acc + curr.sgpa * curr.credits, 0);
  const totalCredits = activeSems.reduce((acc, curr) => acc + curr.credits, 0);
  
  return totalCredits > 0 ? totalPoints / totalCredits : 0;
}

/**
 * Determine letter grade, classification, and grade points for a given score percentage.
 */
export interface GradeDetails {
  grade: 'O' | 'E' | 'A' | 'B' | 'C' | 'D' | 'F';
  classification: string;
  points: number;
  color: string;
}

export function percentageToGrade(percentage: number): GradeDetails {
  if (percentage >= 90) {
    return { grade: 'O', classification: 'Outstanding', points: 10, color: 'text-emerald-500 bg-emerald-500/10' };
  } else if (percentage >= 80) {
    return { grade: 'E', classification: 'Excellent', points: 9, color: 'text-cyan-500 bg-cyan-500/10' };
  } else if (percentage >= 70) {
    return { grade: 'A', classification: 'Very Good', points: 8, color: 'text-indigo-500 bg-indigo-500/10' };
  } else if (percentage >= 60) {
    return { grade: 'B', classification: 'Good', points: 7, color: 'text-blue-500 bg-blue-500/10' };
  } else if (percentage >= 50) {
    return { grade: 'C', classification: 'Average', points: 6, color: 'text-yellow-500 bg-yellow-500/10' };
  } else if (percentage >= 40) {
    return { grade: 'D', classification: 'Pass', points: 5, color: 'text-orange-500 bg-orange-500/10' };
  } else {
    return { grade: 'F', classification: 'Fail', points: 0, color: 'text-rose-500 bg-rose-500/10' };
  }
}

/**
 * Get division corresponding to a percentage or CGPA.
 */
export function getDivision(percentage: number): string {
  if (percentage >= 75) return 'First Class with Distinction';
  if (percentage >= 60) return 'First Division';
  if (percentage >= 50) return 'Second Division';
  if (percentage >= 40) return 'Pass Division';
  return 'Fail';
}

/**
 * Convert SGPA to Obtained Marks based on total marks of semester.
 * Formula: ((SGPA - 0.75) * 10 / 100) * TotalMarks
 */
export function sgpaToObtainedMarks(sgpa: number, totalMarks: number): number {
  const percentage = gpaToPercentage(sgpa);
  return Math.round((percentage / 100) * totalMarks);
}

/**
 * Calculate Internal Marks out of 30.
 * Four class tests: take best 2 averages (out of 25) + Attendance (out of 5).
 */
export function calculateInternalMarks(
  caList: number[], // List of up to 4 CA scores out of 25
  attendanceScore: number // Attendance score out of 5
): { bestAverage: number; attendance: number; total: number } {
  // Filter and sort CAs descending to pick top 2
  const sortedCAs = [...caList].filter(v => !isNaN(v)).sort((a, b) => b - a);
  const bestTwo = sortedCAs.slice(0, 2);
  const bestAverage = bestTwo.length > 0 
    ? bestTwo.reduce((a, b) => a + b, 0) / bestTwo.length 
    : 0;
  
  const attendance = Math.max(0, Math.min(5, attendanceScore));
  const total = parseFloat((bestAverage + attendance).toFixed(2));
  
  return {
    bestAverage: parseFloat(bestAverage.toFixed(2)),
    attendance,
    total
  };
}

/**
 * Attendance Calculator utilities.
 */
export interface AttendanceResult {
  currentPercentage: number;
  classesNeeded: number;
  safeAbsences: number;
  status: 'critical' | 'warn' | 'safe';
}

export function calculateAttendance(
  attended: number,
  total: number,
  target: number = 75
): AttendanceResult {
  if (total <= 0) {
    return { currentPercentage: 0, classesNeeded: 0, safeAbsences: 0, status: 'critical' };
  }
  
  const currentPercentage = (attended / total) * 100;
  
  let classesNeeded = 0;
  let safeAbsences = 0;
  
  if (currentPercentage < target) {
    // How many consecutive classes to attend to reach target
    // (attended + X) / (total + X) = target / 100
    // 100 * attended + 100 * X = target * total + target * X
    // X * (100 - target) = target * total - 100 * attended
    // X = (target * total - 100 * attended) / (100 - target)
    classesNeeded = Math.ceil((target * total - 100 * attended) / (100 - target));
  } else {
    // How many classes can be missed without going below target
    // attended / (total + Y) = target / 100
    // 100 * attended = target * total + target * Y
    // Y * target = 100 * attended - target * total
    // Y = (100 * attended - target * total) / target
    safeAbsences = Math.floor((100 * attended - target * total) / target);
  }

  let status: 'critical' | 'warn' | 'safe' = 'safe';
  if (currentPercentage < 60) {
    status = 'critical'; // Detained warning
  } else if (currentPercentage < 75) {
    status = 'warn'; // Require medical or condonation
  }

  return {
    currentPercentage: parseFloat(currentPercentage.toFixed(2)),
    classesNeeded: Math.max(0, classesNeeded),
    safeAbsences: Math.max(0, safeAbsences),
    status
  };
}

/**
 * Calculate target future semesters average GPA.
 */
export function calculateGpaPlanner(
  currentCgpa: number,
  completedCredits: number,
  targetCgpa: number,
  remainingCredits: number
): { requiredGpa: number; isPossible: boolean; probability: number } {
  if (remainingCredits <= 0) {
    return { requiredGpa: 0, isPossible: false, probability: 0 };
  }
  
  // (currentCgpa * completedCredits + requiredGpa * remainingCredits) / (completedCredits + remainingCredits) = targetCgpa
  // currentCgpa * completedCredits + requiredGpa * remainingCredits = targetCgpa * (completedCredits + remainingCredits)
  // requiredGpa * remainingCredits = targetCgpa * (completedCredits + remainingCredits) - currentCgpa * completedCredits
  const totalCredits = completedCredits + remainingCredits;
  const requiredGpa = (targetCgpa * totalCredits - currentCgpa * completedCredits) / remainingCredits;
  
  const isPossible = requiredGpa >= 0 && requiredGpa <= 10.0;
  
  // Calculate a mock "probability" of achieving it based on how high the required GPA is
  let probability = 0;
  if (isPossible) {
    if (requiredGpa <= 6.5) probability = 95;
    else if (requiredGpa <= 7.5) probability = 85;
    else if (requiredGpa <= 8.5) probability = 70;
    else if (requiredGpa <= 9.0) probability = 50;
    else if (requiredGpa <= 9.5) probability = 25;
    else probability = 5;
  }
  
  return {
    requiredGpa: parseFloat(requiredGpa.toFixed(2)),
    isPossible,
    probability
  };
}

/**
 * Backlog Impact Calculator
 */
export function calculateBacklogImpact(
  currentCgpa: number,
  backlogCount: number,
  backlogCredits: number,
  totalCreditsSoFar: number
): { projectedCgpa: number; gpaDrop: number; recoveryCreditsNeeded: number } {
  if (totalCreditsSoFar <= 0) {
    return { projectedCgpa: 0, gpaDrop: 0, recoveryCreditsNeeded: 0 };
  }

  // Backlogs treat the subject grade point as 0 until cleared.
  // Assuming currentCgpa includes backlog credits as active but with some points,
  // let's calculate active points:
  const currentPoints = currentCgpa * totalCreditsSoFar;
  
  // If we treat backlog credits as 0 points:
  // (Since we failed, those credits gave us 0 points)
  const adjustedCgpa = Math.max(0, currentCgpa - (backlogCount * 0.5)); // General approximation of drop
  const gpaDrop = parseFloat((currentCgpa - adjustedCgpa).toFixed(2));
  
  // Recovery: How many credits of SGPA 8.5+ we need to raise it back
  const recoveryCreditsNeeded = backlogCount * 12; // Approximation: ~12 credits per backlog to recover fully

  return {
    projectedCgpa: parseFloat(adjustedCgpa.toFixed(2)),
    gpaDrop,
    recoveryCreditsNeeded
  };
}

/**
 * Career placement eligibility evaluation.
 */
export interface PlacementResult {
  score: number; // 0 - 100
  serviceCompanyEligible: boolean;
  productCompanyEligible: boolean;
  feedback: string[];
}

export function evaluatePlacementEligibility(
  cgpa: number,
  activeBacklogs: number,
  percentage: number
): PlacementResult {
  let score = 0;
  const feedback: string[] = [];

  // Base score on CGPA (out of 50)
  score += Math.min(50, (cgpa / 10) * 50);

  // Base score on percentage (out of 35)
  score += Math.min(35, (percentage / 100) * 35);

  // Active backlogs penalty
  if (activeBacklogs === 0) {
    score += 15;
    feedback.push("Excellent: No active backlogs. You are in a safe zone.");
  } else if (activeBacklogs === 1) {
    score += 5;
    feedback.push("Warning: 1 active backlog. Many companies allow up to 1 history, but prefer 0 active.");
  } else {
    score += 0;
    feedback.push("Critical: Multiple active backlogs. Most MNCs will filter you out.");
  }

  // CGPA filters
  const serviceCompanyEligible = cgpa >= 6.0 && activeBacklogs === 0;
  const productCompanyEligible = cgpa >= 7.5 && activeBacklogs === 0;

  if (cgpa < 6.0) {
    feedback.push("CGPA is below 6.0. Service MNCs like TCS/Wipro/Infosys typically require >= 6.0.");
  } else {
    feedback.push("CGPA satisfies the standard criteria (>= 6.0) for Service MNCs.");
  }

  if (cgpa < 7.5) {
    feedback.push("CGPA is below 7.5. Premium product companies (Amazon, Microsoft, etc.) prefer >= 7.5.");
  } else {
    feedback.push("CGPA satisfies the premium criteria (>= 7.5) for Product companies.");
  }

  return {
    score: Math.round(score),
    serviceCompanyEligible,
    productCompanyEligible,
    feedback
  };
}

/**
 * Academic health score based on SGPA and tracking.
 */
export function calculateAcademicHealth(
  cgpa: number,
  hasScholarship: boolean,
  activeBacklogs: number
): { score: number; status: string; color: string } {
  let score = 100;
  
  if (cgpa < 6.0) score -= 30;
  else if (cgpa < 7.5) score -= 15;
  else if (cgpa < 9.0) score -= 5;
  
  score -= activeBacklogs * 25;
  
  if (hasScholarship && cgpa < 6.75) {
    // SVMCM requires 60% which is 6.75 SGPA
    score -= 15;
  }
  
  score = Math.max(10, score);
  
  let status = "Outstanding";
  let color = "from-emerald-500 to-teal-400 text-emerald-500 border-emerald-500/20";
  
  if (score < 40) {
    status = "Critical Assistance Needed";
    color = "from-rose-500 to-orange-400 text-rose-500 border-rose-500/20";
  } else if (score < 60) {
    status = "Needs Improvement";
    color = "from-amber-500 to-yellow-400 text-amber-500 border-amber-500/20";
  } else if (score < 80) {
    status = "Good Academic Stand";
    color = "from-blue-500 to-cyan-400 text-blue-500 border-blue-500/20";
  }
  
  return { score, status, color };
}
