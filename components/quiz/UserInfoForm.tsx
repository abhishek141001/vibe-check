'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, User, Calendar } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';

interface UserInfo {
  name: string;
  age: number;
}

interface UserInfoFormProps {
  quizTitle: string;
  quizEmoji: string;
  onComplete: (userInfo: UserInfo) => void;
  customization?: {
    enablePersonalization: boolean;
    personalizationFields: ('name' | 'age')[];
  };
}

export default function UserInfoForm({ quizTitle, quizEmoji, onComplete, customization }: UserInfoFormProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState<{ name?: string; age?: string }>({});
  const { currentTheme } = useTheme();

  // Default personalization settings
  const defaultCustomization = {
    enablePersonalization: true,
    personalizationFields: ['name'] as ('name' | 'age')[]
  };

  const finalCustomization = customization || defaultCustomization;
  const isPersonalizationEnabled = finalCustomization.enablePersonalization || false;
  const shouldShowAge = isPersonalizationEnabled && finalCustomization.personalizationFields?.includes('age') || false;

  // Auto-proceed if personalization is disabled
  useEffect(() => {
    if (!isPersonalizationEnabled) {
      onComplete({
        name: '',
        age: 0
      });
    }
  }, [isPersonalizationEnabled, onComplete]);

  const validateForm = () => {
    const newErrors: { name?: string; age?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (shouldShowAge) {
      const ageNum = parseInt(age);
      if (!age.trim()) {
        newErrors.age = 'Age is required';
      } else if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        newErrors.age = 'Please enter a valid age (1-120)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPersonalizationEnabled) {
      // Skip personalization, go directly to quiz
      onComplete({
        name: '',
        age: 0
      });
      return;
    }
    
    if (validateForm()) {
      onComplete({
        name: name.trim(),
        age: shouldShowAge ? parseInt(age) : 0
      });
    }
  };

  // If personalization is disabled, show loading while auto-proceeding
  if (!isPersonalizationEnabled) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Quiz...</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="h-screen w-full flex flex-col justify-center items-center p-4 sm:p-6 md:p-8"
    >
      {/* Quiz Header */}
      <motion.div 
        className="text-center mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6"
        >
          {quizEmoji}
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
          style={{ 
            color: currentTheme.colors.text,
            fontFamily: currentTheme.fonts.heading,
            textShadow: `0 4px 8px ${currentTheme.colors.primary}30`
          }}
        >
          {quizTitle}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl mb-2"
          style={{ 
            color: currentTheme.colors.textSecondary,
            fontFamily: currentTheme.fonts.body
          }}
        >
          🎮 Ready to discover your personality?
        </motion.p>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-base sm:text-lg md:text-xl"
          style={{ 
            color: currentTheme.colors.textSecondary,
            fontFamily: currentTheme.fonts.body
          }}
        >
          Tell us a bit about yourself to get personalized results!
        </motion.p>
      </motion.div>

      {/* User Info Form */}
      <motion.form 
        onSubmit={handleSubmit} 
        className="w-full max-w-2xl space-y-6 sm:space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <motion.div 
          className="text-left w-full"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-2xl sm:text-3xl">👤</span>
            <Label 
              htmlFor="name" 
              className="text-lg sm:text-xl md:text-2xl font-bold"
              style={{ 
                color: currentTheme.colors.text,
                fontFamily: currentTheme.fonts.heading
              }}
            >
              What's your name, champion? *
            </Label>
          </motion.div>
          <motion.div 
            className="relative w-full"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <User 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" 
              style={{ color: currentTheme.colors.primary }}
            />
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className={`pl-12 py-4 text-lg w-full ${errors.name ? 'border-red-500' : ''}`}
              style={{
                backgroundColor: `${currentTheme.colors.background}90`,
                borderColor: errors.name ? currentTheme.colors.error : currentTheme.colors.primary,
                color: currentTheme.colors.text,
                borderRadius: '1rem',
                fontFamily: currentTheme.fonts.body,
                borderWidth: '2px',
                backdropFilter: 'blur(10px)',
                boxShadow: `0 8px 25px ${currentTheme.colors.primary}20`
              }}
            />
          </motion.div>
          {errors.name && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm mt-2 flex items-center gap-2"
              style={{ color: currentTheme.colors.error }}
            >
              <span className="text-lg">⚠️</span> {errors.name}
            </motion.p>
          )}
        </motion.div>

        {shouldShowAge && (
          <motion.div 
            className="text-left w-full"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="text-2xl sm:text-3xl">🎂</span>
              <Label 
                htmlFor="age" 
                className="text-lg sm:text-xl md:text-2xl font-bold"
                style={{ 
                  color: currentTheme.colors.text,
                  fontFamily: currentTheme.fonts.heading
                }}
              >
                How old are you, legend? *
              </Label>
            </motion.div>
            <motion.div 
              className="relative w-full"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Calendar 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                style={{ color: currentTheme.colors.primary }}
              />
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
                min="1"
                max="120"
                className={`pl-12 py-4 text-lg w-full ${errors.age ? 'border-red-500' : ''}`}
                style={{
                  backgroundColor: `${currentTheme.colors.background}90`,
                  borderColor: errors.age ? currentTheme.colors.error : currentTheme.colors.primary,
                  color: currentTheme.colors.text,
                  borderRadius: '1rem',
                  fontFamily: currentTheme.fonts.body,
                  borderWidth: '2px',
                  backdropFilter: 'blur(10px)',
                  boxShadow: `0 8px 25px ${currentTheme.colors.primary}20`
                }}
              />
            </motion.div>
            {errors.age && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm mt-2 flex items-center gap-2"
                style={{ color: currentTheme.colors.error }}
              >
                <span className="text-lg">⚠️</span> {errors.age}
              </motion.p>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full"
        >
          <Button
            type="submit"
            className="w-full text-white font-bold py-5 px-8 text-xl relative overflow-hidden"
            style={{
              backgroundColor: 'transparent',
              backgroundImage: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
              borderRadius: '1.5rem',
              fontFamily: currentTheme.fonts.body,
              border: 'none',
              boxShadow: `0 15px 40px ${currentTheme.colors.primary}40`,
              transition: `all ${currentTheme.animations.duration} ${currentTheme.animations.easing}`
            }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex items-center justify-center gap-4"
            >
              <span className="text-2xl sm:text-3xl">🚀</span>
              <span>Start Your Adventure!</span>
              <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </motion.div>
          </Button>
        </motion.div>
      </motion.form>

      {/* Privacy Note */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7 }}
        className="mt-6 sm:mt-8 max-w-2xl"
      >
        <p 
          className="text-sm flex items-center gap-2 text-center"
          style={{ 
            color: currentTheme.colors.textSecondary,
            fontFamily: currentTheme.fonts.body
          }}
        >
          <span className="text-lg">🔒</span>
          <span>Your information is safe and will only be used to personalize your quiz results. We don't store or share your personal data.</span>
        </p>
      </motion.div>
    </div>
  );
}