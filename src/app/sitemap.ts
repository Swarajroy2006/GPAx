import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gpa-x.swaraj.ai.in';

  // Core static routes
  const staticRoutes = [
    '',
    '/gpa-calculator',
    '/sgpa-to-percentage',
    '/cgpa-to-percentage',
    '/dgpa-calculator',
    '/ygpa-calculator',
    '/marks-calculator',
    '/scholarship-calculator',
    '/gpa-planner',
    '/analytics',
    '/blog',
    '/contact',
    '/privacy',
    '/about',
    '/ai-assistant',
    '/svmcm-calculator',
    '/oasis-scholarship-calculator',
    '/aikyashree-calculator',
    '/btech-gpa-calculator',
    '/bca-gpa-calculator',
    '/mca-gpa-calculator',
    '/bba-gpa-calculator',
    '/bsc-gpa-calculator',
  ];

  // Semester calculators routes
  const semesterRoutes = Array.from({ length: 8 }, (_, i) => `/semester-${i + 1}-gpa-calculator`);

  const sitemaps: MetadataRoute.Sitemap = [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1.0 : 0.8,
    })),
    ...semesterRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...BLOG_POSTS.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];

  return sitemaps;
}
