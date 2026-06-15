'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { BLOG_POSTS } from '@/lib/blog-data';
import { Calendar, User, Clock, ChevronRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', 'Scholarships', 'GPA Guides', 'Placement Preparation'];

  const filteredPosts = selectedCategory === 'All' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === selectedCategory);

  const breadcrumbs = [
    { label: 'Blog Articles' }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50/50 dark:bg-gray-950/20 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={breadcrumbs} />

          <div className="text-center mb-10">
            <span className="px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 justify-center max-w-[150px] mx-auto">
              <BookOpen className="w-3.5 h-3.5" /> News & Guides
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-950 dark:text-white mt-3">GPA-X Academic Blog</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
              Latest news on MAKAUT examinations, SVMCM scholarship updates, and career placement resources.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2.5 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedCategory === cat ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/10' : 'bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-brand-primary'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts list */}
          <div className="grid grid-cols-1 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.slug} className="hover:-translate-y-1 transition-all">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  <CardTitle className="text-xl md:text-2xl mt-1 hover:text-brand-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                  
                  <CardDescription className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-3">
                    {post.summary}
                  </CardDescription>

                  <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-900/60 pt-4 mt-2">
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" /> {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {post.readTime}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Read Full Article <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
