'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageToggle';
import { useTheme } from '../theme/ThemeProvider';
import { Quiz, QuizCustomization } from '@/lib/quiz-data';

interface QuizFormProps {
  quiz: Quiz;
  customization?: QuizCustomization;
  onComplete: (answers: Record<string, string>) => void;
}

export default function QuizForm({ quiz, customization, onComplete }: QuizFormProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { language } = useLanguage();
  const { currentTheme } = useTheme();

  // Default customization values
  const defaultCustomization: QuizCustomization = {
    themeId: 'default',
    defaultLanguage: 'en',
    showProgress: true,
    showTimer: false,
    allowRetake: true,
    showShareButtons: true,
    enablePersonalization: true,
    personalizationFields: ['name'],
    customColors: {},
    customFonts: {},
    backgroundImage: undefined,
    logo: undefined
  };

  const finalCustomization = customization || defaultCustomization;

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    
    // Find the option value instead of using the ID
    const selectedOption = currentQuestion.options.find(option => option.id === answerId);
    const optionValue = selectedOption?.value || answerId;
    
    console.log('🎯 QuizForm: Selected answer ID:', answerId);
    console.log('🎯 QuizForm: Selected option value:', optionValue);
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionValue
    }));
  };

  const handleNext = () => {
    if (selectedAnswer) {
      if (currentQuestionIndex === quiz.questions.length - 1) {
        onComplete(answers);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer('');
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      const previousQuestionId = quiz.questions[currentQuestionIndex - 1].id;
      setSelectedAnswer(answers[previousQuestionId] || '');
    }
  };

  return (
    <div 
      className="h-screen w-full flex flex-col justify-center p-4 sm:p-6 md:p-8"
    >
      {/* Progress Bar */}
      {finalCustomization.showProgress && (
        <motion.div 
          className="mb-6 sm:mb-8 w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-center mb-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-3"
            >
              <span className="text-2xl sm:text-3xl">🎯</span>
              <span 
                className="text-lg sm:text-xl font-bold"
                style={{ 
                  color: currentTheme.colors.text,
                  fontFamily: currentTheme.fonts.heading
                }}
              >
                Level {currentQuestionIndex + 1} of {quiz.questions.length}
              </span>
            </motion.div>
            <motion.div
              className="flex items-center gap-3"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="text-2xl sm:text-3xl">⚡</span>
              <span 
                className="text-lg sm:text-xl font-bold"
                style={{ 
                  color: currentTheme.colors.primary,
                  fontFamily: currentTheme.fonts.heading
                }}
              >
                {Math.round(progress)}%
              </span>
            </motion.div>
          </div>
          <div 
            className="relative h-4 sm:h-5 rounded-full overflow-hidden"
            style={{
              backgroundColor: `${currentTheme.colors.border}40`,
              borderRadius: '2rem',
              boxShadow: `inset 0 2px 4px ${currentTheme.colors.primary}20`
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full relative overflow-hidden"
              style={{
                backgroundColor: 'transparent',
                backgroundImage: `linear-gradient(90deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                boxShadow: `0 0 20px ${currentTheme.colors.primary}60`
              }}
            >
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -50 }}
          transition={{ 
            duration: 0.6, 
            ease: currentTheme.animations.framerEasing 
          }}
          className="w-full max-w-4xl mx-auto mb-6 sm:mb-8"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center"
            style={{ 
              color: currentTheme.colors.text,
              fontFamily: currentTheme.fonts.heading,
              textShadow: `0 2px 4px ${currentTheme.colors.primary}30`
            }}
          >
            {language === 'hi' && currentQuestion.questionHindi 
              ? currentQuestion.questionHindi 
              : currentQuestion.question}
          </motion.h2>

          {/* Answer Options */}
          <div className="space-y-4 sm:space-y-6">
            {currentQuestion.options.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -2,
                  boxShadow: `0 10px 25px ${currentTheme.colors.primary}40`
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <button
                  onClick={() => handleAnswerSelect(option.id)}
                  className={`w-full p-4 sm:p-5 md:p-6 text-left rounded-lg transition-all duration-300 relative overflow-hidden ${
                    selectedAnswer === option.id
                      ? 'transform scale-105'
                      : 'hover:scale-102'
                  }`}
                  style={{
                    backgroundColor: selectedAnswer === option.id 
                      ? `${currentTheme.colors.primary}20` 
                      : 'transparent',
                    color: currentTheme.colors.text,
                    fontFamily: currentTheme.fonts.body,
                    borderRadius: '0.75rem',
                    border: selectedAnswer === option.id 
                      ? `2px solid ${currentTheme.colors.primary}`
                      : `2px solid ${currentTheme.colors.primary}40`,
                    backdropFilter: 'blur(10px)',
                    boxShadow: selectedAnswer === option.id 
                      ? `0 0 30px ${currentTheme.colors.primary}40`
                      : 'none'
                  }}
                >
                  {/* Selection Indicator */}
                  {selectedAnswer === option.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 text-2xl sm:text-3xl"
                    >
                      ✅
                    </motion.div>
                  )}
                  
                  {/* Option Content */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <motion.div
                      animate={selectedAnswer === option.id ? { 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, 0]
                      } : {}}
                      transition={{ duration: 0.6 }}
                      className="text-2xl sm:text-3xl md:text-4xl"
                    >
                      {index === 0 ? '🅰️' : index === 1 ? '🅱️' : index === 2 ? '🅲' : '🅳'}
                    </motion.div>
                    <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold flex-1">
                      {language === 'hi' && option.textHindi 
                        ? option.textHindi 
                        : option.text}
                    </span>
                  </div>
                  
                  {/* Hover Effect Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                    whileHover={{ opacity: 0.15 }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.div 
        className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 mt-6 sm:mt-8 w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto"
        >
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="w-full px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-bold order-2 sm:order-1"
            style={{
              borderColor: currentTheme.colors.primary,
              color: currentTheme.colors.text,
              fontFamily: currentTheme.fonts.body,
              borderRadius: '0.75rem',
              borderWidth: '2px',
              backgroundColor: 'transparent',
              boxShadow: 'none'
            }}
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            <span>← Back</span>
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto"
        >
          <Button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="w-full px-8 sm:px-10 py-3 sm:py-4 text-lg sm:text-xl font-bold relative overflow-hidden order-1 sm:order-2"
            style={{
              backgroundColor: selectedAnswer 
                ? currentTheme.colors.primary
                : currentTheme.colors.border,
              color: 'white',
              fontFamily: currentTheme.fonts.body,
              borderRadius: '0.75rem',
              border: 'none',
              boxShadow: selectedAnswer 
                ? `0 0 20px ${currentTheme.colors.primary}50`
                : 'none',
              opacity: !selectedAnswer ? 0.5 : 1,
              transition: `all ${currentTheme.animations.duration} ${currentTheme.animations.easing}`
            }}
          >
            <motion.div
              animate={selectedAnswer ? { 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0]
              } : {}}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <span className="text-xl sm:text-2xl">
                {currentQuestionIndex === quiz.questions.length - 1 ? '🏁' : '⚡'}
              </span>
              <span>
                {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quest!' : 'Next Level'}
              </span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}