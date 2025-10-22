'use client';

import { useState, createContext, useContext, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

interface LanguageContextType {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ 
  children, 
  initialLanguage = 'en' 
}: { 
  children: React.ReactNode;
  initialLanguage?: 'en' | 'hi';
}) {
  const [language, setLanguage] = useState<'en' | 'hi'>(initialLanguage);

  // Update language when initialLanguage changes
  useEffect(() => {
    setLanguage(initialLanguage);
  }, [initialLanguage]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 sm:gap-2 bg-white rounded-lg p-1 shadow-lg">
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="px-2 sm:px-3 py-1 text-xs"
      >
        <span className="hidden sm:inline">English</span>
        <span className="sm:hidden">EN</span>
      </Button>
      <Button
        variant={language === 'hi' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('hi')}
        className="px-2 sm:px-3 py-1 text-xs"
      >
        <span className="hidden sm:inline">हिंदी</span>
        <span className="sm:hidden">हि</span>
      </Button>
    </div>
  );
}
