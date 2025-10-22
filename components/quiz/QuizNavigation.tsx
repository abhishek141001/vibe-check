'use client';

import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function QuizNavigation() {
  return (
    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10">
      <Link href="/quiz">
        <Button variant="outline" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Back to Quizzes</span>
          <span className="sm:hidden">Back</span>
        </Button>
      </Link>
    </div>
  );
}
