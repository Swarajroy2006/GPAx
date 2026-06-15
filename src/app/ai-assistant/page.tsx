'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { AIMessage } from '@/types';
import { Bot, Send, User, Sparkles, AlertCircle } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I am your GPA-X Academic Assistant. Ask me anything about MAKAUT GPA rules, sessional internal marks, SVMCM scholarships, or degree calculations!',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const breadcrumbs = [
    { label: 'Calculators', href: '/' },
    { label: 'AI Academic Assistant' }
  ];

  // Client-side rule-based response matching for high fidelity mock assistant
  const getMockResponse = (input: string): string => {
    const text = input.toLowerCase();
    
    if (text.includes('svmcm') || text.includes('vivenkananda') || text.includes('scholarship')) {
      return 'For Swami Vivekananda Merit-cum-Means (SVMCM) scholarship: \n• UG students need at least 60% marks in their promotional exam / yearly aggregate (which equals a YGPA/CGPA of 6.75).\n• Annual family income must be under ₹2,50,000.\n• SC/ST/OBC students can also explore Oasis, and minority students can look into Aikyashree.';
    }
    if (text.includes('internal') || text.includes('ca') || text.includes('test')) {
      return 'In MAKAUT, theory subjects have 30 marks reserved for internals. \n• This is composed of 25 marks for class tests (continuous assessment CA1, CA2, CA3, CA4, taking the average of the best two) and 5 marks for attendance.\n• Sessional/practicals usually have 40 internal marks.';
    }
    if (text.includes('formula') || text.includes('convert') || text.includes('percentage')) {
      return 'The official MAKAUT conversion formula is: \nPercentage (%) = (GPA - 0.75) * 10.\n• So a CGPA/SGPA of 8.0 translates to (8.0 - 0.75) * 10 = 72.5%.\n• Similarly, a 6.75 GPA equals 60.0%.';
    }
    if (text.includes('dgpa') || text.includes('degree')) {
      return 'Degree GPA (DGPA) is calculated at graduation: \n• B.Tech & 4-Yr Honors (BCA/BBA/B.Sc): (YGPA1 + YGPA2 + 1.5 * YGPA3 + 1.5 * YGPA4) / 5.\n• B.Tech Lateral Entry: (YGPA2 + 1.5 * YGPA3 + 1.5 * YGPA4) / 4.\n• 3-Yr NEP Exit Option (BCA/BBA/B.Sc): (YGPA1 + YGPA2 + YGPA3) / 3.';
    }
    if (text.includes('backlog') || text.includes('fail')) {
      return 'If you fail a subject in MAKAUT: \n• That credit will carry 0 grade points in your SGPA, causing a significant drop.\n• You can clear the backlog in the subsequent matching semester (odd backlogs in odd semesters, evens in evens).\n• Clearing backlogs requires re-registering and appearing for the backlog exam.';
    }
    
    return "I'm here to help! I can answer questions about MAKAUT percentage conversions, SVMCM scholarship cutoffs, sessional internal marks calculations, and degree DGPA weighting structures. Try asking about 'SVMCM requirements' or 'MAKAUT percentage formula'.";
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const replyText = getMockResponse(userMsg.content);
      const assistantMsg: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: replyText,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, assistantMsg]);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Navbar />
      <main className="flex-grow bg-gray-50/50 dark:bg-gray-950/20 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={breadcrumbs} />

          <div className="text-center mb-8">
            <span className="px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 justify-center max-w-[150px] mx-auto">
              <Bot className="w-3.5 h-3.5" /> AI Advisor
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-950 dark:text-white mt-3">GPA-X Academic Assistant</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
              Ask academic questions and receive instant answers based on official MAKAUT university rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Chat Interface */}
            <div className="md:col-span-8 space-y-4">
              <Card className="h-[450px] flex flex-col p-4">
                <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-brand-primary text-white' : 'bg-gray-150 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
                        {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={`p-3.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-brand-primary text-white rounded-tr-none' : 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-gray-800'}`}>
                        <p className="whitespace-pre-line">{msg.content}</p>
                        <span className={`text-[10px] block mt-1.5 text-right ${msg.role === 'user' ? 'text-white/60' : 'text-gray-400'}`}>
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex gap-3 max-w-[85%]">
                      <div className="w-8 h-8 rounded-xl bg-gray-150 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="p-3.5 rounded-2xl text-sm bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-tl-none">
                        <span className="flex gap-1 items-center">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100" />
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200" />
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-300" />
                        </span>
                      </div>
                    </div>
                  )}
                  <div ref={scrollRef} />
                </div>

                <form onSubmit={handleSendMessage} className="border-t border-gray-100 dark:border-gray-900 pt-3 mt-3 flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about SVMCM, internals, backlog..."
                    className="flex-grow px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent text-sm focus:border-brand-primary outline-none transition-colors text-gray-950 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="p-2.5 bg-brand-primary text-white rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </Card>
            </div>

            {/* Sidebar Guidelines */}
            <div className="md:col-span-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Gemini API Integration</CardTitle>
                </CardHeader>
                <div className="text-xs text-gray-500 space-y-3">
                  <div className="flex gap-2 p-2 bg-amber-500/5 border border-amber-500/10 text-amber-500 rounded-lg">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Gemini integration is ready. Configure endpoints to start AI generation.</span>
                  </div>
                  <p>To enable direct LLM support, edit the messaging handler in: </p>
                  <code className="block p-2 bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 truncate font-mono">
                    src/app/ai-assistant/page.tsx
                  </code>
                  <p>Incorporate standard Vercel AI SDK or direct Google Generative AI REST requests to query live data.</p>
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
