'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Gamepad2, Brain, Heart, Music, Zap, Star } from 'lucide-react';

export default function Home() {
  const quizCategories = [
    {
      title: 'Programming & Tech',
      description: 'Discover your coding personality and superpowers',
      icon: <Brain className="h-8 w-8" />,
      color: 'from-blue-500 to-purple-600',
      quizzes: [
        { name: 'Programming Language', path: '/quiz/programming-language', emoji: '💻' },
        { name: 'Dev Superpower', path: '/quiz/dev-superpower', emoji: '🦸‍♂️' },
        { name: 'Work Superpower', path: '/quiz/work-superpower', emoji: '⚡' }
      ]
    },
    {
      title: 'Entertainment & Culture',
      description: 'Find your anime alter ego and movie character',
      icon: <Star className="h-8 w-8" />,
      color: 'from-pink-500 to-red-600',
      quizzes: [
        { name: 'Anime Character', path: '/quiz/anime-character', emoji: '🎌' },
        { name: 'Anime Power', path: '/quiz/anime-power', emoji: '⚡' },
        { name: 'Movie Character', path: '/quiz/movie-character', emoji: '🎬' }
      ]
    },
    {
      title: 'Sports & Music',
      description: 'Discover your cricket style and music taste',
      icon: <Zap className="h-8 w-8" />,
      color: 'from-green-500 to-teal-600',
      quizzes: [
        { name: 'Cricket Player', path: '/quiz/cricket-player', emoji: '🏏' },
        { name: 'Cricket Role', path: '/quiz/cricket-role', emoji: '⚾' },
        { name: 'Music Genre', path: '/quiz/music-genre', emoji: '🎵' },
        { name: 'Song Mood', path: '/quiz/song-mood', emoji: '🎶' }
      ]
    },
    {
      title: 'Culture & Heritage',
      description: 'Connect with your cultural roots',
      icon: <Heart className="h-8 w-8" />,
      color: 'from-orange-500 to-yellow-600',
      quizzes: [
        { name: 'Bihar Heritage', path: '/quiz/bihar-heritage', emoji: '🏛️' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20" />
        <div className="relative container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              >
                <Gamepad2 className="h-10 w-10 text-white" />
              </motion.div>
              
              <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Fun Quiz Games
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover your personality, superpowers, and hidden talents through our collection of 
                <span className="font-semibold text-purple-600"> viral quiz games</span>! 
                Share your results and challenge your friends.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex justify-center"
            >
              <Link
                href="/quiz"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Start Playing
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Quiz Categories */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Adventure
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore different categories and find the perfect quiz for you
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {quizCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white mr-4`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                {category.quizzes.map((quiz) => (
                  <Link
                    key={quiz.name}
                    href={quiz.path}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 group"
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{quiz.emoji}</span>
                      <span className="font-medium text-gray-900">{quiz.name}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-8">Why Choose Our Quizzes?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Viral & Fun</h3>
                <p className="text-white/80">Engaging quizzes designed to go viral on social media</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <Music className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Shareable Results</h3>
                <p className="text-white/80">Beautiful result cards perfect for Instagram and Facebook</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Personalized</h3>
                <p className="text-white/80">Get personalized results based on your answers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            Ready to Discover Yourself?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of people who have discovered their hidden talents and personality traits
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            <Gamepad2 className="h-6 w-6 mr-3" />
            Start Your Quiz Journey
            <ArrowRight className="h-6 w-6 ml-3" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
