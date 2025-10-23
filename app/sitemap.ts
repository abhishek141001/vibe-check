import { MetadataRoute } from 'next';
import { getAllQuizIds, getQuizForSEO } from '@/lib/quiz-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vibe-check.vercel.app';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  // Dynamic quiz pages
  const quizPages = getAllQuizIds().map((quizId) => {
    const quizData = getQuizForSEO(quizId);
    return {
      url: `${baseUrl}/quiz/${quizId}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: quizData?.isFeatured ? 0.8 : 0.7,
    };
  });

  return [...staticPages, ...quizPages];
}
