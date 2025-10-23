'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// DB-backed admin: fetch quizzes via API
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Flame, TrendingUp, Eye, Share, ThumbsUp, Plus, Code } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [quizData, setQuizData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const loadQuizzes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/quiz', { cache: 'no-store' });
      const data = await res.json();
      if (Array.isArray(data?.quizzes)) setQuizData(data.quizzes);
    } catch (e) {
      console.error('Failed to load quizzes', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  const updateMetrics = async (quizId: string, patch: Record<string, number>) => {
    try {
      setUpdating(quizId);
      await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_metrics', quizId, data: patch })
      });
      setQuizData(prev => prev.map(q => q.id === quizId ? { ...q, metadata: { ...q.metadata, ...patch } } : q));
    } catch (e) {
      console.error('Failed to update metrics', e);
    } finally {
      setUpdating(null);
    }
  };

  const recalcTrending = (q: any) => {
    const views = q.metadata?.views || 0;
    const completions = q.metadata?.completions || 0;
    const shares = q.metadata?.shares || 0;
    const score = Math.max(0, Math.min(100, Math.round(views * 0.1 + completions * 0.4 + shares * 1.2)));
    return score;
  };

  const toggleFeatured = async (quizId: string) => {
    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle_featured',
          quizId
        })
      });
      
      if (response.ok) {
        setQuizData(prev => prev.map(quiz => 
          quiz.id === quizId 
            ? { ...quiz, isFeatured: !quiz.isFeatured }
            : quiz
        ));
      }
    } catch (error) {
      console.error('Error toggling featured:', error);
    }
  };

  const toggleViral = async (quizId: string) => {
    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle_viral',
          quizId
        })
      });
      
      if (response.ok) {
        setQuizData(prev => prev.map(quiz => 
          quiz.id === quizId 
            ? { ...quiz, isViral: !quiz.isViral }
            : quiz
        ));
      }
    } catch (error) {
      console.error('Error toggling viral:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Quiz Admin Dashboard</h1>
              <p className="text-sm sm:text-base text-gray-600">Manage your viral quiz collection</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link href="/admin/create">
                <Button className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Quiz
                </Button>
              </Link>
              <Link href="/admin/json-quiz">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Code className="w-4 h-4 mr-2" />
                  JSON Creator
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Refresh + Stats Overview */}
        <div className="flex items-center justify-between mb-3">
          <div></div>
          <Button variant="outline" onClick={loadQuizzes} className="text-xs">Refresh</Button>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1 sm:p-2 bg-blue-100 rounded-lg">
                <Eye className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold">{quizData.reduce((sum, quiz) => sum + (quiz.metadata?.views || 0), 0)}</p>
                <p className="text-xs sm:text-sm text-gray-600">Total Views</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1 sm:p-2 bg-green-100 rounded-lg">
                <ThumbsUp className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold">{quizData.reduce((sum, quiz) => sum + (quiz.metadata?.completions || 0), 0)}</p>
                <p className="text-xs sm:text-sm text-gray-600">Completions</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1 sm:p-2 bg-red-100 rounded-lg">
                <Flame className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold">{quizData.filter(q => q.isViral).length}</p>
                <p className="text-xs sm:text-sm text-gray-600">Viral Quizzes</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1 sm:p-2 bg-yellow-100 rounded-lg">
                <Star className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold">{quizData.filter(q => q.isFeatured).length}</p>
                <p className="text-xs sm:text-sm text-gray-600">Featured</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quiz Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-4 sm:p-6 bg-white rounded-xl border border-gray-100">
                <div className="animate-pulse h-6 w-48 bg-gray-200 rounded mb-2"></div>
                <div className="animate-pulse h-4 w-64 bg-gray-200 rounded"></div>
              </div>
            ))
          ) : quizData.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="text-2xl sm:text-3xl">{quiz.emoji}</div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg">{quiz.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{quiz.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <Button
                      size="sm"
                      variant={quiz.isFeatured ? "default" : "outline"}
                      onClick={() => toggleFeatured(quiz.id)}
                      className="flex items-center gap-1 text-xs"
                    >
                      <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">{quiz.isFeatured ? 'Featured' : 'Feature'}</span>
                      <span className="sm:hidden">{quiz.isFeatured ? '★' : '☆'}</span>
                    </Button>
                    
                    <Button
                      size="sm"
                      variant={quiz.isViral ? "default" : "outline"}
                      onClick={() => toggleViral(quiz.id)}
                      className="flex items-center gap-1 text-xs"
                    >
                      <Flame className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">{quiz.isViral ? 'Viral' : 'Make Viral'}</span>
                      <span className="sm:hidden">{quiz.isViral ? '🔥' : '❄️'}</span>
                    </Button>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-center">
                  <div>
                    <p className="text-sm sm:text-lg font-semibold">{quiz.metadata?.views || 0}</p>
                    <p className="text-xs text-gray-600">Views</p>
                    <Button size="sm" variant="outline" className="mt-1 h-7 text-xs" disabled={updating===quiz.id}
                      onClick={() => updateMetrics(quiz.id, { views: (quiz.metadata?.views || 0) + 1 })}>+1</Button>
                  </div>
                  <div>
                    <p className="text-sm sm:text-lg font-semibold">{quiz.metadata?.completions || 0}</p>
                    <p className="text-xs text-gray-600">Completions</p>
                    <Button size="sm" variant="outline" className="mt-1 h-7 text-xs" disabled={updating===quiz.id}
                      onClick={() => updateMetrics(quiz.id, { completions: (quiz.metadata?.completions || 0) + 1 })}>+1</Button>
                  </div>
                  <div>
                    <p className="text-sm sm:text-lg font-semibold">{quiz.metadata?.shares || 0}</p>
                    <p className="text-xs text-gray-600">Shares</p>
                    <Button size="sm" variant="outline" className="mt-1 h-7 text-xs" disabled={updating===quiz.id}
                      onClick={() => updateMetrics(quiz.id, { shares: (quiz.metadata?.shares || 0) + 1 })}>+1</Button>
                  </div>
                  <div>
                    <p className="text-sm sm:text-lg font-semibold">{quiz.metadata?.trendingScore || 0}</p>
                    <p className="text-xs text-gray-600">Trending</p>
                    <Button size="sm" className="mt-1 h-7 text-xs" disabled={updating===quiz.id}
                      onClick={() => updateMetrics(quiz.id, { trendingScore: recalcTrending(quiz) })}>Recalc</Button>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {(quiz.tags || []).map((tag: string) => (
                    <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
