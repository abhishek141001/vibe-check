'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Calendar, TrendingUp, Plus } from 'lucide-react';

export default function CreateQuiz() {
  const [activeTab, setActiveTab] = useState('viral');
  const [suggestions, setSuggestions] = useState({ trending: [], seasonal: [] });
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('personality');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [loading, setLoading] = useState(false);
  const [createdQuiz, setCreatedQuiz] = useState<any>(null);

  const categories = [
    { id: 'personality', name: 'Personality', emoji: '🧠' },
    { id: 'culture', name: 'Culture', emoji: '🏛️' },
    { id: 'entertainment', name: 'Entertainment', emoji: '🎬' },
    { id: 'lifestyle', name: 'Lifestyle', emoji: '🌟' }
  ];

  const seasons = [
    { id: 'diwali', name: 'Diwali', emoji: '🪔' },
    { id: 'holi', name: 'Holi', emoji: '🎨' },
    { id: 'newYear', name: 'New Year', emoji: '🎊' }
  ];

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const response = await fetch('/api/quiz/create');
      const data = await response.json();
      if (data.success) {
        setSuggestions(data.suggestions);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const createQuiz = async () => {
    setLoading(true);
    try {
      const body = activeTab === 'viral' 
        ? { type: 'viral', topic: selectedTopic, category: selectedCategory }
        : { type: 'seasonal', season: selectedSeason };

      const response = await fetch('/api/quiz/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      if (data.success) {
        setCreatedQuiz(data.quiz);
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Create Viral Quiz</h1>
          <p className="text-sm sm:text-base text-gray-600">Generate trending and seasonal quizzes automatically</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-1 bg-white p-1 rounded-lg shadow-lg mb-6 sm:mb-8">
          <button
            onClick={() => setActiveTab('viral')}
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'viral'
                ? 'bg-purple-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Viral Content</span>
            <span className="sm:hidden">Viral</span>
          </button>
          <button
            onClick={() => setActiveTab('seasonal')}
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'seasonal'
                ? 'bg-purple-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Seasonal</span>
            <span className="sm:hidden">Season</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Creation Form */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4">
              {activeTab === 'viral' ? 'Create Viral Quiz' : 'Create Seasonal Quiz'}
            </h2>

            {activeTab === 'viral' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trending Topic
                  </label>
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select a trending topic</option>
                    {suggestions.trending?.map((topic, index) => (
                      <option key={index} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-2 sm:p-3 rounded-lg border-2 transition-colors ${
                          selectedCategory === category.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-xl sm:text-2xl mb-1">{category.emoji}</div>
                        <div className="text-xs sm:text-sm font-medium">{category.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Season/Festival
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {seasons.map((season) => (
                      <button
                        key={season.id}
                        onClick={() => setSelectedSeason(season.id)}
                        className={`p-3 sm:p-4 rounded-lg border-2 transition-colors ${
                          selectedSeason === season.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="text-xl sm:text-2xl">{season.emoji}</div>
                          <div className="text-sm sm:text-lg font-medium">{season.name}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={createQuiz}
              disabled={loading || (activeTab === 'viral' ? !selectedTopic : !selectedSeason)}
              className="w-full mt-4 sm:mt-6 bg-purple-500 hover:bg-purple-600 text-sm sm:text-base"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                  <span className="text-sm sm:text-base">Creating...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-sm sm:text-base">Create Quiz</span>
                </div>
              )}
            </Button>
          </Card>

          {/* Preview */}
          {createdQuiz && (
            <Card className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-4">Generated Quiz</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-2">{createdQuiz.emoji}</div>
                  <h4 className="text-base sm:text-lg font-bold">{createdQuiz.title}</h4>
                  {createdQuiz.titleHindi && (
                    <h4 className="text-base sm:text-lg font-bold text-gray-600">{createdQuiz.titleHindi}</h4>
                  )}
                  <p className="text-sm sm:text-base text-gray-600 mt-2">{createdQuiz.description}</p>
                  {createdQuiz.descriptionHindi && (
                    <p className="text-sm sm:text-base text-gray-600">{createdQuiz.descriptionHindi}</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {createdQuiz.tags.map((tag: string, index: number) => (
                    <span key={index} className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button className="flex-1 bg-green-500 hover:bg-green-600 text-sm sm:text-base">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Publish
                  </Button>
                  <Button variant="outline" className="flex-1 text-sm sm:text-base">
                    Preview
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
