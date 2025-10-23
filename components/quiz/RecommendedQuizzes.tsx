'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp, Flame, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getQuizRecommendations } from '@/lib/quiz-data';
import { useTheme } from '../theme/ThemeProvider';
import { useLanguage } from './LanguageToggle';

interface RecommendedQuizzesProps {
  currentQuizId: string;
  limit?: number;
}

export default function RecommendedQuizzes({ currentQuizId, limit = 3 }: RecommendedQuizzesProps) {
  const [recommendedQuizzes, setRecommendedQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentTheme } = useTheme();
  const { language } = useLanguage();

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const recommendations = getQuizRecommendations(currentQuizId, limit);
        setRecommendedQuizzes(recommendations);
      } catch (error) {
        console.error('Error loading quiz recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [currentQuizId, limit]);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4" style={{ borderColor: currentTheme.colors.primary }}></div>
          <p style={{ color: currentTheme.colors.textSecondary }}>Finding your next quiz...</p>
        </div>
      </div>
    );
  }

  if (recommendedQuizzes.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: 0.3,
        ease: currentTheme.animations.framerEasing
      }}
      className="w-full max-w-4xl mx-auto mt-8 sm:mt-12"
    >
      <div className="text-center mb-6 sm:mb-8">
        <h2 
          className="text-2xl sm:text-3xl font-bold mb-2"
          style={{ 
            color: currentTheme.colors.text,
            fontFamily: currentTheme.fonts.heading
          }}
        >
          🎯 You Might Also Like
        </h2>
        <p 
          className="text-base sm:text-lg"
          style={{ 
            color: currentTheme.colors.textSecondary,
            fontFamily: currentTheme.fonts.body
          }}
        >
          Based on your interests, here are some quizzes you'll love!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {recommendedQuizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.1 * index,
              ease: currentTheme.animations.framerEasing
            }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="group"
          >
            <Link href={`/quiz/${quiz.id}`}>
              <Card 
                className="p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200 relative overflow-hidden h-full"
                style={{
                  backgroundColor: currentTheme.colors.surface,
                  borderColor: currentTheme.colors.border,
                  borderRadius: currentTheme.layout.borderRadius
                }}
              >
                {/* Badges */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col sm:flex-row gap-1">
                  {quiz.isFeatured && (
                    <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      <span className="hidden sm:inline">Featured</span>
                    </span>
                  )}
                  {quiz.isViral && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      <span className="hidden sm:inline">Viral</span>
                    </span>
                  )}
                </div>

                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{quiz.emoji}</div>
                  <h3 
                    className="text-lg sm:text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2"
                    style={{ 
                      color: currentTheme.colors.text,
                      fontFamily: currentTheme.fonts.heading
                    }}
                  >
                    {language === 'hi' && quiz.titleHindi ? quiz.titleHindi : quiz.title}
                  </h3>
                  <p 
                    className="text-sm mb-3 sm:mb-4 line-clamp-2"
                    style={{ 
                      color: currentTheme.colors.textSecondary,
                      fontFamily: currentTheme.fonts.body
                    }}
                  >
                    {language === 'hi' && quiz.descriptionHindi ? quiz.descriptionHindi : quiz.description}
                  </p>
                  
                  {/* Metadata */}
                  <div className="flex justify-center gap-2 sm:gap-4 text-xs mb-3 sm:mb-4" style={{ color: currentTheme.colors.textSecondary }}>
                    <span className="flex items-center gap-1">
                      👁️ {quiz.metadata?.views || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      ⭐ {quiz.metadata?.avgRating || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      🔥 {quiz.metadata?.trendingScore || 0}
                    </span>
                  </div>

                  <div className="flex items-center justify-center text-blue-500 font-medium group-hover:text-blue-600 transition-colors text-sm">
                    <span>Take Quiz</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View All Quizzes Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.5,
          ease: currentTheme.animations.framerEasing
        }}
        className="text-center mt-6 sm:mt-8"
      >
        <Link href="/quiz">
          <Button 
            className="px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold"
            style={{
              backgroundColor: currentTheme.colors.primary,
              color: 'white',
              borderRadius: currentTheme.layout.borderRadius
            }}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Explore All Quizzes
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
