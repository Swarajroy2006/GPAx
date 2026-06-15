'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: 'What is the official MAKAUT SGPA to percentage formula?',
      answer: 'The official formula to convert SGPA/YGPA/CGPA to percentage in MAKAUT is: Percentage (%) = (GPA - 0.75) * 10. For example, an SGPA of 8.25 corresponds to (8.25 - 0.75) * 10 = 75%.'
    },
    {
      question: 'How is YGPA (Yearly Grade Point Average) calculated?',
      answer: 'YGPA is calculated by taking the average of the odd and even semesters of a academic year. YGPA = (Odd Semester SGPA + Even Semester SGPA) / 2. This YGPA is then used for scholarship renewal and promotional eligibility.'
    },
    {
      question: 'How does the SVMCM scholarship eligibility check work?',
      answer: 'For Swami Vivekananda Merit-cum-Means (SVMCM) scholarship fresh UG applications, students need at least 60% marks in their last qualifying exam. For renewal, UG students need at least 60% (or 6.75 CGPA/YGPA) in their promotional exam. Family annual income must be under ₹2,50,000.'
    },
    {
      question: 'How is DGPA (Degree Grade Point Average) calculated under NEP 2020?',
      answer: 'Under NEP 2020, graduating DGPA is calculated as follows:\n• 4-Year B.Tech & Honors degrees (BCA/BBA/B.Sc): DGPA = (YGPA1 + YGPA2 + 1.5 * YGPA3 + 1.5 * YGPA4) / 5\n• 3-Year Exit Option (BCA/BBA/B.Sc): DGPA = (YGPA1 + YGPA2 + YGPA3) / 3\n• B.Tech Lateral Entry: DGPA = (YGPA2 + 1.5 * YGPA3 + 1.5 * YGPA4) / 4.'
    },
    {
      question: 'Can I calculate my obtained marks from my SGPA?',
      answer: 'Yes, GPA-X provides a tool that calculates your approximate obtained marks. Formula: Obtained Marks = (Percentage / 100) * Total Marks. For a semester of 800 total marks and 8.0 SGPA (which is 72.5%), obtained marks are approximately 580.'
    },
    {
      question: 'Is my data secure on GPA-X?',
      answer: 'Yes, absolutely. GPA-X is entirely database-free. All student profile records, course choices, and semester GPA details are saved locally in your own browser using localStorage. Your data never leaves your device.'
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqItems.map((item) => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };

  return (
    <section className="py-12 border-t border-gray-200 dark:border-gray-900">
      {/* FAQ Schema Inject */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-3">Frequently Asked Questions</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Find answers to the most common queries about MAKAUT academics and calculations.</p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-950 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-brand-primary shrink-0" />
                    {item.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isOpen && (
                  <div className="p-5 pt-0 border-t border-gray-100 dark:border-gray-900 text-sm text-gray-600 dark:text-gray-400 leading-relaxed bg-gray-50/50 dark:bg-gray-900/30">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
