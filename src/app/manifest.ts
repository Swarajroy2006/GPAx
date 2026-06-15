import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GPA-X | MAKAUT Academic Intelligence Platform',
    short_name: 'GPA-X',
    description: 'Calculate SGPA, CGPA, DGPA, YGPA, sessional internal marks and track West Bengal SVMCM scholarship status.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
