'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp, Flame, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ThemeProvider, useTheme } from '@/components/theme/ThemeProvider';
import { LanguageProvider } from '@/components/quiz/LanguageToggle';
import QuizShareButton from '@/components/quiz/QuizShareButton';

function QuizHomeContent() {
  const [activeTab, setActiveTab] = useState('all');
  const [filteredQuizzes, setFilteredQuizzes] = useState<any[]>([]);
  const [featuredQuiz, setFeaturedQuiz] = useState<any | null>(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const { currentTheme } = useTheme();

  const tabs = [
    { id: 'all', label: 'All Quizzes', icon: Sparkles },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'viral', label: 'Viral', icon: Flame },
    { id: 'featured', label: 'Featured', icon: Star }
  ];

  // Load featured quiz once
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/quiz?featured=true', { next: { revalidate: 60 } } as any);
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data?.quizzes) && data.quizzes.length > 0) {
          setFeaturedQuiz(data.quizzes[0]);
        }
      } catch {}
      finally { setLoadingFeatured(false); }
    })();
  }, []);

  // Load quizzes for active tab from API
  useEffect(() => {
    (async () => {
      try {
        setLoadingList(true);
        let url = '/api/quiz';
        if (activeTab === 'trending') url = '/api/quiz?trending=true';
        else if (activeTab === 'viral') url = '/api/quiz?viral=true';
        else if (activeTab === 'featured') url = '/api/quiz?featured=true';
        const res = await fetch(url, { next: { revalidate: 60 } } as any);
        if (!res.ok) return setFilteredQuizzes([]);
        const data = await res.json();
        setFilteredQuizzes(Array.isArray(data?.quizzes) ? data.quizzes : []);
      } catch { setFilteredQuizzes([]); }
      finally { setLoadingList(false); }
    })();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Theme Indicator */}
        <div className="absolute top-4 right-4 z-10">
          <div 
            className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
            style={{
              backgroundColor: currentTheme.colors.surface,
              color: currentTheme.colors.text,
              border: `1px solid ${currentTheme.colors.border}`
            }}
          >
            Theme: {currentTheme.name}
          </div>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-3 sm:mb-4">
            🎯 Viral Quizzes
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Discover your personality, superpowers, and hidden talents with our collection of fun and engaging quizzes!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-gray-500 px-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-center sm:text-left">Powered by AI • Shareable Results • Instant Fun</span>
          </div>
        </motion.div>

        {/* Featured Quiz - Dynamic (from DB) */}
        {loadingFeatured ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 sm:mb-12"
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center max-w-4xl mx-auto shadow-2xl border border-gray-100">
              <div className="animate-pulse h-8 w-20 bg-gray-200 rounded mx-auto mb-4"></div>
              <div className="animate-pulse h-6 w-64 bg-gray-200 rounded mx-auto mb-3"></div>
              <div className="animate-pulse h-4 w-72 bg-gray-200 rounded mx-auto"></div>
            </div>
          </motion.div>
        ) : featuredQuiz && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 sm:mb-12"
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white text-center max-w-4xl mx-auto shadow-2xl">
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">{featuredQuiz.emoji}</div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 px-2">{featuredQuiz.title}</h2>
              {featuredQuiz.titleHindi && (
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 px-2">{featuredQuiz.titleHindi}</h2>
              )}
              <p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90 px-2">
                {featuredQuiz.description}
              </p>
              {featuredQuiz.descriptionHindi && (
                <p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90 px-2">
                  {featuredQuiz.descriptionHindi}
                </p>
              )}
              <Link href={`/quiz/${featuredQuiz.id}`}>
                <Button className="bg-white text-purple-600 hover:bg-gray-100 px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold w-full sm:w-auto">
                  Take Quiz Now
                </Button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Dynamic Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mb-6 sm:mb-8"
        >
          <div className="flex flex-wrap justify-center gap-1 bg-white p-1 rounded-lg shadow-lg max-w-full overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-purple-500 text-white'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Quiz Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {loadingList ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-4 sm:p-6 bg-white rounded-lg shadow-lg border border-gray-100">
                <div className="animate-pulse h-8 w-12 bg-gray-200 rounded mb-3"></div>
                <div className="animate-pulse h-5 w-40 bg-gray-200 rounded mb-2"></div>
                <div className="animate-pulse h-4 w-56 bg-gray-200 rounded mb-4"></div>
                <div className="animate-pulse h-4 w-32 bg-gray-200 rounded"></div>
              </div>
            ))
          ) : filteredQuizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="group"
            >
              <Link href={`/quiz/${quiz.id}`}>
                <Card className="p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200 relative overflow-hidden h-full">
                  {/* Badges */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1">
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

                  {/* Share Button */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <QuizShareButton 
                      quizId={quiz.id}
                      quizTitle={quiz.title}
                      quizEmoji={quiz.emoji}
                      quizDescription={quiz.description}
                      className="scale-75 sm:scale-100"
                    />
                  </div>

                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{quiz.emoji}</div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {quiz.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 sm:mb-4 line-clamp-2">
                      {quiz.description}
                    </p>
                    
                    {/* Metadata */}
                    <div className="flex justify-center gap-2 sm:gap-4 text-xs text-gray-500 mb-3 sm:mb-4">
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

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 sm:mt-16 lg:mt-20 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 px-4">
            Why Our Quizzes Are Special
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🤖</div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">AI-Powered Results</h3>
              <p className="text-gray-600 text-sm">
                Get personalized descriptions generated by advanced AI for unique, shareable results.
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🎨</div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Beautiful Design</h3>
              <p className="text-gray-600 text-sm">
                Enjoy smooth animations, confetti celebrations, and Instagram-ready result cards.
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg sm:col-span-2 lg:col-span-1">
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">📱</div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Shareable Results</h3>
              <p className="text-gray-600 text-sm">
                Download your results as images or share directly to social media with one click.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center text-sm"
          style={{ color: currentTheme.colors.textSecondary }}
        >
          <p>Made with ❤️ for quiz lovers everywhere</p>
        </motion.div>
      </div>
    </div>
  );
}

export default function QuizHome() {
  return (
    <ThemeProvider>
      <LanguageProvider initialLanguage="en">
        <QuizHomeContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
