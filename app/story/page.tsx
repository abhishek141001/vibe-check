'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Flame, Star, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThemeProvider, useTheme } from '@/components/theme/ThemeProvider';

function StoryHomeContent() {
  const [activeTab, setActiveTab] = useState('all');
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentTheme } = useTheme();

  const tabs = [
    { id: 'all', label: 'All Stories', icon: Sparkles },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'viral', label: 'Viral', icon: Flame },
    { id: 'featured', label: 'Featured', icon: Star }
  ];

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let url = '/api/story';
        if (activeTab === 'trending') url = '/api/story?trending=true';
        else if (activeTab === 'viral') url = '/api/story?viral=true';
        else if (activeTab === 'featured') url = '/api/story?featured=true';
        const res = await fetch(url, { next: { revalidate: 60 } } as any);
        if (!res.ok) return setStories([]);
        const data = await res.json();
        setStories(Array.isArray(data?.stories) ? data.stories : []);
      } catch {
        setStories([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-cyan-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-3 sm:mb-4">📖 Story Games</h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Make choices and see where the story goes. Every decision matters!
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex justify-center mb-6 sm:mb-8">
          <div className="flex flex-wrap justify-center gap-1 bg-white p-1 rounded-lg shadow-lg max-w-full overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon as any;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:text-gray-800'
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-4 sm:p-6 bg-white rounded-lg shadow-lg border border-gray-100">
                <div className="animate-pulse h-8 w-12 bg-gray-200 rounded mb-3"></div>
                <div className="animate-pulse h-5 w-40 bg-gray-200 rounded mb-2"></div>
                <div className="animate-pulse h-4 w-56 bg-gray-200 rounded mb-4"></div>
                <div className="animate-pulse h-4 w-32 bg-gray-200 rounded"></div>
              </div>
            ))
          ) : (
            stories.map((story, index) => (
              <motion.div key={story.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ scale: 1.02, y: -2 }} className="group">
                <Link href={`/story/${story.id}`}>
                  <Card className="p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-indigo-200 relative overflow-hidden h-full">
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1">
                      {story.isFeatured && (
                        <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">Featured</span>
                      )}
                      {story.isViral && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Viral</span>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{story.emoji}</div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">{story.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 sm:mb-4 line-clamp-2">{story.description}</p>
                      <div className="flex items-center justify-center text-indigo-500 font-medium group-hover:text-indigo-600 transition-colors text-sm">
                        <span>Play Story</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function StoryHome() {
  return (
    <ThemeProvider>
      <StoryHomeContent />
    </ThemeProvider>
  );
}


