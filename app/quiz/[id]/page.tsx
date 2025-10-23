import { notFound } from 'next/navigation';
import { getQuizById, isValidQuizId, getQuizForSEO } from '@/lib/quiz-data';
import QuizPage from '@/components/quiz/QuizPage';

interface QuizPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DynamicQuizPage({ params }: QuizPageProps) {
  const { id } = await params;
  
  // Check if quiz exists
  if (!isValidQuizId(id)) {
    notFound();
  }
  
  return <QuizPage quizId={id} />;
}

// Generate static params for all quizzes at build time
export async function generateStaticParams() {
  const { getAllQuizIds } = await import('@/lib/quiz-data');
  
  return getAllQuizIds().map((id) => ({
    id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: QuizPageProps) {
  const { id } = await params;
  const quizData = getQuizForSEO(id);
  
  if (!quizData) {
    return {
      title: 'Quiz Not Found',
      description: 'The requested quiz could not be found.',
    };
  }
  
  return {
    title: `${quizData.title} - Viral Quizzes`,
    description: quizData.description,
    keywords: quizData.keywords,
    openGraph: {
      title: quizData.title,
      description: quizData.description,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(quizData.title)}&emoji=${encodeURIComponent(quizData.emoji)}&description=${encodeURIComponent(quizData.description)}`,
          width: 1200,
          height: 630,
          alt: quizData.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: quizData.title,
      description: quizData.description,
      images: [`/api/og?title=${encodeURIComponent(quizData.title)}&emoji=${encodeURIComponent(quizData.emoji)}&description=${encodeURIComponent(quizData.description)}`],
    },
  };
}
