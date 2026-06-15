'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Calculator, BookOpen, GraduationCap, Trophy, BarChart3, Bot, Compass } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCalcsOpen, setIsCalcsOpen] = useState(false);

  const calculators = [
    { name: 'SGPA to Percentage', href: '/sgpa-to-percentage', desc: 'Standard MAKAUT SGPA converter' },
    { name: 'CGPA to Percentage', href: '/cgpa-to-percentage', desc: 'Cumulative CGPA calculator' },
    { name: 'YGPA Calculator', href: '/ygpa-calculator', desc: 'Odd & Even semester evaluator' },
    { name: 'DGPA Calculator', href: '/dgpa-calculator', desc: 'Degree GPA (4 Yr / Lateral / 3 Yr)' },
    { name: 'Marks Calculator', href: '/marks-calculator', desc: 'Convert SGPA to obtained/total marks' },
    { name: 'GPA Planner', href: '/gpa-planner', desc: 'Target GPA achievement strategist' },
  ];

  const extraTools = [
    { name: 'Scholarship Eligibility', href: '/scholarship-calculator', icon: Trophy },
    { name: 'Academic Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'AI Academic Assistant', href: '/ai-assistant', icon: Bot },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-navbar py-4 px-6 md:px-12 flex items-center justify-between">
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-2 group">
        <img src="/logo.svg" alt="GPA-X Logo" className="w-10 h-10 rounded-xl shadow-lg shadow-brand-primary/20 group-hover:scale-105 transition-transform" />
        <div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">GPA-X</span>
          <span className="text-[10px] block font-medium text-gray-500 dark:text-gray-400 -mt-1">Academic Intelligence</span>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-8 font-medium text-sm text-gray-600 dark:text-gray-300">
        <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
        
        {/* Calculators Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsCalcsOpen(!isCalcsOpen)}
            onMouseEnter={() => setIsCalcsOpen(true)}
            className="flex items-center gap-1 hover:text-brand-primary transition-colors py-2 cursor-pointer"
          >
            Calculators <ChevronDown className={`w-4 h-4 transition-transform ${isCalcsOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isCalcsOpen && (
            <div
              onMouseLeave={() => setIsCalcsOpen(false)}
              className="absolute left-0 top-full mt-2 w-72 rounded-2xl bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-800 shadow-xl p-4 grid gap-2"
            >
              <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider px-2 mb-1 flex items-center gap-1">
                <Calculator className="w-3.5 h-3.5 text-brand-primary" /> Grade Calculators
              </div>
              {calculators.map((calc) => (
                <Link
                  key={calc.name}
                  href={calc.href}
                  onClick={() => setIsCalcsOpen(false)}
                  className="p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors flex flex-col gap-0.5 group/item"
                >
                  <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm group-hover/item:text-brand-primary transition-colors">{calc.name}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{calc.desc}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Other Links */}
        <Link href="/scholarship-calculator" className="hover:text-brand-primary transition-colors">Scholarship</Link>
        <Link href="/analytics" className="hover:text-brand-primary transition-colors">Analytics</Link>
        <Link href="/gpa-planner" className="hover:text-brand-primary transition-colors">Planner</Link>
        <Link href="/blog" className="hover:text-brand-primary transition-colors">Blog</Link>
        <Link href="/ai-assistant" className="hover:text-brand-primary transition-colors flex items-center gap-1.5 bg-brand-primary/10 text-brand-primary px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-brand-primary/20 transition-all">
          <Bot className="w-3.5 h-3.5" /> AI Assistant
        </Link>
      </div>

      {/* Right Actions */}
      <div className="hidden lg:flex items-center gap-4">
        <ThemeToggle />
        <Link
          href="/gpa-calculator"
          className="px-5 py-2.5 bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-lg hover:shadow-brand-primary/20 text-white rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Student Dashboard
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 lg:hidden">
        <ThemeToggle />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-155 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-xl py-6 px-6 flex flex-col gap-4 lg:hidden">
          <div className="text-xs uppercase font-bold text-gray-400 tracking-wider flex items-center gap-1 border-b border-gray-100 dark:border-gray-900 pb-2">
            <Compass className="w-4 h-4 text-brand-primary" /> Navigation
          </div>
          <Link href="/" onClick={() => setIsOpen(false)} className="py-2 text-gray-800 dark:text-gray-200 font-medium">Home</Link>
          <Link href="/gpa-calculator" onClick={() => setIsOpen(false)} className="py-2 text-brand-primary font-bold">Student Dashboard</Link>
          
          <div className="text-xs uppercase font-bold text-gray-400 tracking-wider flex items-center gap-1 border-b border-gray-100 dark:border-gray-900 pb-2 mt-2">
            <Calculator className="w-4 h-4 text-brand-secondary" /> Calculators
          </div>
          <div className="grid grid-cols-2 gap-2 pl-2">
            {calculators.map((calc) => (
              <Link
                key={calc.name}
                href={calc.href}
                onClick={() => setIsOpen(false)}
                className="py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-primary"
              >
                {calc.name}
              </Link>
            ))}
          </div>

          <div className="text-xs uppercase font-bold text-gray-400 tracking-wider flex items-center gap-1 border-b border-gray-100 dark:border-gray-900 pb-2 mt-2">
            <GraduationCap className="w-4 h-4 text-brand-accent" /> Scholarships & Tools
          </div>
          <div className="flex flex-col gap-2 pl-2">
            {extraTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                onClick={() => setIsOpen(false)}
                className="py-1 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
              >
                <tool.icon className="w-4 h-4 text-gray-400" /> {tool.name}
              </Link>
            ))}
            <Link href="/blog" onClick={() => setIsOpen(false)} className="py-1 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gray-400" /> Blog Articles
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
