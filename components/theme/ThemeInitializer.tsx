'use client';

import { useEffect } from 'react';
import { getInitialTheme, applyThemeToDocument } from '@/lib/quiz-data';

interface ThemeInitializerProps {
  children: React.ReactNode;
}

export default function ThemeInitializer({ children }: ThemeInitializerProps) {
  useEffect(() => {
    // Apply the initial theme immediately on mount
    const initialTheme = getInitialTheme();
    applyThemeToDocument(initialTheme);
  }, []);

  return <>{children}</>;
}
