'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { quizzesWithMetadata } from '@/lib/quiz-data';
import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp, Flame, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ThemeProvider, useTheme } from '@/components/theme/ThemeProvider';

function QuizHomeContent() {
  const [activeTab, setActiveTab] = useState('all');
  const [filteredQuizzes, setFilteredQuizzes] = useState(quizzesWithMetadata);
  const { currentTheme } = useTheme();

  const tabs = [
    { id: 'all', label: 'All Quizzes', icon: Sparkles },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'viral', label: 'Viral', icon: Flame },
    { id: 'featured', label: 'Featured', icon: Star }
  ];

  useEffect(() => {
    let filtered = quizzesWithMetadata;
    
    switch (activeTab) {
      case 'trending':
        filtered = quizzesWithMetadata.filter(q => (q.metadata?.trendingScore || 0) > 80).sort((a, b) => (b.metadata?.trendingScore || 0) - (a.metadata?.trendingScore || 0));
        break;
      case 'viral':
        filtered = quizzesWithMetadata.filter(q => q.isViral).sort((a, b) => (b.metadata?.shares || 0) - (a.metadata?.shares || 0));
        break;
      case 'featured':
        filtered = quizzesWithMetadata.filter(q => q.isFeatured);
        break;
      default:
        filtered = quizzesWithMetadata;
    }
    
    setFilteredQuizzes(filtered);
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

        {/* Featured Quiz - Dynamic */}
        {quizzesWithMetadata.find(quiz => quiz.isFeatured) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 sm:mb-12"
          >
            {(() => {
              const featuredQuiz = quizzesWithMetadata.find(quiz => quiz.isFeatured);
              if (!featuredQuiz) return null;
              
              return (
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
              );
            })()}
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
          {filteredQuizzes.map((quiz, index) => (
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
      <QuizHomeContent />
    </ThemeProvider>
  );
}
