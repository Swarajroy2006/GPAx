import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { BLOG_POSTS } from '@/lib/blog-data';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | GPA-X Blog`,
    description: post.summary,
    alternates: {
      canonical: `https://gpa-x.swaraj.ai.in/blog/${post.slug}`
    }
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Blog', href: '/blog' },
    { label: post.title }
  ];

  // Article Schema for SEO
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': post.title,
    'datePublished': post.date,
    'author': {
      '@type': 'Person',
      'name': post.author
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'GPA-X Academic Platform',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://gpa-x.swaraj.ai.in/favicon.ico'
      }
    },
    'description': post.summary
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <Navbar />
      <main className="flex-grow bg-gray-50/50 dark:bg-gray-950/20 py-8 px-6">
        <div className="max-w-3xl mx-auto">
          <Breadcrumb items={breadcrumbs} />

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-brand-primary transition-colors mb-6 no-print"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </Link>

          <article className="space-y-6">
            {/* Main Header Card */}
            <Card>
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

                <h1 className="text-2xl md:text-4xl font-extrabold text-gray-950 dark:text-white mt-1 leading-tight">
                  {post.title}
                </h1>

                <div className="flex items-center gap-4 text-xs text-gray-400 border-t border-gray-100 dark:border-gray-900/60 pt-4 mt-2">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" /> {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {post.readTime}
                  </span>
                </div>
              </div>
            </Card>

            {/* Content Body */}
            <Card>
              <div className="prose prose-slate dark:prose-invert max-w-none text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300 space-y-5 whitespace-pre-wrap">
                {post.content.trim()}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100 dark:border-gray-900/60">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-900 text-xs font-semibold text-gray-500 dark:text-gray-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Card>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
