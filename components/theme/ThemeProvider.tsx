'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Theme, QuizCustomization, getThemeById, getDefaultTheme, getInitialTheme, saveThemeToStorage, applyThemeToDocument } from '@/lib/quiz-data';

interface ThemeContextType {
  currentTheme: Theme;
  customization: QuizCustomization;
  setTheme: (themeId: string) => void;
  updateCustomization: (customization: Partial<QuizCustomization>) => void;
  resetToDefault: () => void;
  useThemeClasses: () => {
    bg: string;
    bgSurface: string;
    text: string;
    textSecondary: string;
    border: string;
    btnPrimary: string;
    btnSecondary: string;
    btnAccent: string;
    card: string;
    input: string;
    transition: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  initialThemeId?: string;
  initialCustomization?: Partial<QuizCustomization>;
}

export function ThemeProvider({ 
  children, 
  initialThemeId,
  initialCustomization = {}
}: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    // Use provided initialThemeId if available, otherwise get from storage or default
    if (initialThemeId) {
      return getThemeById(initialThemeId) || getDefaultTheme();
    }
    return getInitialTheme();
  });
  
  const [customization, setCustomization] = useState<QuizCustomization>({
    themeId: currentTheme.id,
    defaultLanguage: 'en',
    showProgress: true,
    showTimer: false,
    allowRetake: true,
    showShareButtons: true,
    enablePersonalization: true,
    personalizationFields: ['name'],
    ...initialCustomization
  });

  // Apply theme to document when it changes
  useEffect(() => {
    applyThemeToDocument(currentTheme);
  }, [currentTheme]);

  const setTheme = useCallback((themeId: string) => {
    const theme = getThemeById(themeId);
    if (theme) {
      setCurrentTheme(theme);
      setCustomization(prev => ({ ...prev, themeId }));
      saveThemeToStorage(themeId);
    }
  }, []);

  const updateCustomization = useCallback((newCustomization: Partial<QuizCustomization>) => {
    setCustomization(prev => ({ ...prev, ...newCustomization }));
  }, []);

  const resetToDefault = useCallback(() => {
    const defaultTheme = getDefaultTheme();
    setCurrentTheme(defaultTheme);
    setCustomization({
      themeId: defaultTheme.id,
      defaultLanguage: 'en',
      showProgress: true,
      showTimer: false,
      allowRetake: true,
      showShareButtons: true,
      enablePersonalization: true,
      personalizationFields: ['name']
    });
    saveThemeToStorage(defaultTheme.id);
  }, []);

  const useThemeClasses = useCallback(() => {
    return {
      // Background classes
      bg: `bg-[${currentTheme.colors.background}]`,
      bgSurface: `bg-[${currentTheme.colors.surface}]`,
      
      // Text classes
      text: `text-[${currentTheme.colors.text}]`,
      textSecondary: `text-[${currentTheme.colors.textSecondary}]`,
      
      // Border classes
      border: `border-[${currentTheme.colors.border}]`,
      
      // Button classes
      btnPrimary: `bg-[${currentTheme.colors.primary}] hover:opacity-90 text-white`,
      btnSecondary: `bg-[${currentTheme.colors.secondary}] hover:opacity-90 text-white`,
      btnAccent: `bg-[${currentTheme.colors.accent}] hover:opacity-90 text-white`,
      
      // Card classes
      card: `bg-[${currentTheme.colors.surface}] border border-[${currentTheme.colors.border}] rounded-[${currentTheme.layout.borderRadius}] shadow-[${currentTheme.layout.shadows}]`,
      
      // Input classes
      input: `bg-[${currentTheme.colors.background}] border border-[${currentTheme.colors.border}] text-[${currentTheme.colors.text}] focus:border-[${currentTheme.colors.primary}] rounded-[${currentTheme.layout.borderRadius}]`,
      
      // Animation classes
      transition: `transition-all duration-[${currentTheme.animations.duration}] ease-[${currentTheme.animations.easing}]`
    };
  }, [currentTheme]);

  const value: ThemeContextType = {
    currentTheme,
    customization,
    setTheme,
    updateCustomization,
    resetToDefault,
    useThemeClasses
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

