import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/share/*',
    },
    sitemap: 'https://gpa-x.swaraj.ai.in/sitemap.xml',
  };
}
