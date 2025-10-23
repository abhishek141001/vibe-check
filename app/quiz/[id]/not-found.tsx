import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function QuizNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Quiz Not Found</h1>
        <p className="text-gray-600 mb-6">
          The quiz you're looking for doesn't exist or may have been moved.
        </p>
        
        <div className="space-y-3">
          <Link href="/quiz" className="block">
            <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
              <Home className="w-4 h-4 mr-2" />
              Browse All Quizzes
            </Button>
          </Link>
          
          <Link href="/" className="block">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-2">Popular Quizzes:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/quiz/programming-language" className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              Programming Language
            </Link>
            <Link href="/quiz/bihar-heritage" className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
              Bihar Heritage
            </Link>
            <Link href="/quiz/anime-character" className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">
              Anime Character
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
