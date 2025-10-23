import { notFound } from 'next/navigation';
import { getQuizById, getQuizForSEO } from '@/lib/quiz-data';
import connectDB from '@/lib/mongodb';
import QuizModel from '@/lib/models/Quiz';
import QuizPage from '@/components/quiz/QuizPage';

interface QuizPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DynamicQuizPage({ params }: QuizPageProps) {
  const { id } = await params;
  
  // Check DB first; fallback to local
  await connectDB();
  const existsInDb = await QuizModel.exists({ id });
  if (!existsInDb && !getQuizById(id)) notFound();
  
  return <QuizPage quizId={id} />;
}

// Generate static params for all quizzes at build time
export async function generateStaticParams() {
  // No longer prebuild all quiz IDs (DB is dynamic). Return empty to use fallback
  return [] as { id: string }[];
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
