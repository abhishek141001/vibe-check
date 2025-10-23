'use client';

import { useState, useEffect, useRef } from 'react';
import { getQuizWithCustomization, QuizResult, enrichQuiz } from '@/lib/quiz-data';
import QuizForm from './QuizForm';
import ResultCard from './ResultCard';
import QuizNavigation from './QuizNavigation';
import UserInfoForm from './UserInfoForm';
import LanguageToggle, { LanguageProvider, useLanguage } from './LanguageToggle';
import { ThemeProvider, useTheme } from '../theme/ThemeProvider';
import QuizShareButton from './QuizShareButton';
import { motion } from 'framer-motion';

interface QuizResultWithAI extends QuizResult {
  aiDescription?: string;
}

interface UserInfo {
  name: string;
  age: number;
}

interface QuizPageProps {
  quizId: string;
}

function QuizPageContent({ quizId }: QuizPageProps) {
  const [quiz, setQuiz] = useState(getQuizWithCustomization(quizId));
  const [showUserInfo, setShowUserInfo] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QuizResultWithAI | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));
  const themeAppliedRef = useRef(false);
  const { language } = useLanguage();
  const { currentTheme, customization, useThemeClasses, setTheme } = useTheme();
  const themeClasses = useThemeClasses();

  // Fetch quiz from API (DB-first), then enrich with customization defaults
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/quiz/${encodeURIComponent(quizId)}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data?.quiz && !cancelled) {
          setQuiz(enrichQuiz(data.quiz));
        }
      } catch {
        // ignore network errors; fallback already set
      }
    })();
    return () => { cancelled = true; };
  }, [quizId]);

  // Apply quiz's default theme and language when quiz loads (only once)
  useEffect(() => {
    if (quiz?.customization?.themeId && !themeAppliedRef.current) {
      setTheme(quiz.customization.themeId);
      themeAppliedRef.current = true;
    }
  }, [quiz?.customization?.themeId, setTheme]);

  const handleUserInfoComplete = (userInfo: UserInfo) => {
    setUserInfo(userInfo);
    setShowUserInfo(false);
  };

  const handleQuizComplete = async (answers: Record<string, string>) => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizId,
          answers,
          sessionId,
          language,
          userInfo
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setResult(data.result);
        setShowResult(true);
      } else {
        console.error('Error submitting quiz:', data.error);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetake = () => {
    setShowResult(false);
    setResult(null);
    setShowUserInfo(true);
    setUserInfo(null);
  };

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Quiz not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-4 sm:py-8 relative"
      style={{ 
        backgroundColor: 'transparent',
        backgroundImage: customization.backgroundImage 
          ? `linear-gradient(135deg, ${currentTheme.colors.primary}40, ${currentTheme.colors.secondary}40, ${currentTheme.colors.accent}30), url(${customization.backgroundImage})`
          : `linear-gradient(135deg, ${currentTheme.colors.primary}40, ${currentTheme.colors.secondary}40, ${currentTheme.colors.accent}30)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <QuizNavigation />
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 flex flex-col gap-2">
        <QuizShareButton 
          quizId={quizId}
          quizTitle={language === 'hi' && quiz.titleHindi ? quiz.titleHindi : quiz.title}
          quizEmoji={quiz.emoji}
          quizDescription={language === 'hi' && quiz.descriptionHindi ? quiz.descriptionHindi : quiz.description}
          result={result?.name}
        />
        <LanguageToggle />
      </div>
      {/* Quiz Content */}
      {showUserInfo ? (
        <UserInfoForm
          quizTitle={language === 'hi' && quiz.titleHindi ? quiz.titleHindi : quiz.title}
          quizEmoji={quiz.emoji}
          onComplete={handleUserInfoComplete}
          customization={quiz.customization}
        />
      ) : !showResult ? (
        <QuizForm quiz={quiz} onComplete={handleQuizComplete} customization={quiz.customization} />
      ) : (
        result && (
          <ResultCard
            result={result}
            quizId={quizId}
            onRetake={handleRetake}
            aiDescription={result.aiDescription}
            userInfo={userInfo}
            customization={quiz.customization || undefined}
          />
        )
      )}

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            className="p-6 rounded-lg text-center"
            style={{
              backgroundColor: currentTheme.colors.surface,
              color: currentTheme.colors.text,
              borderRadius: currentTheme.layout.borderRadius,
              boxShadow: currentTheme.layout.shadows
            }}
          >
            <div 
              className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4"
              style={{ borderColor: currentTheme.colors.primary }}
            ></div>
            <p>Calculating your result...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function QuizPage({ quizId }: QuizPageProps) {
  // Get quiz data to extract default language
  const quiz = getQuizWithCustomization(quizId);
  const defaultLanguage = quiz?.customization?.defaultLanguage || 'en';

  return (
    <ThemeProvider>
      <LanguageProvider initialLanguage={defaultLanguage}>
        <QuizPageContent quizId={quizId} />
      </LanguageProvider>
    </ThemeProvider>
  );
}
