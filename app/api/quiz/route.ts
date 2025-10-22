import { NextRequest, NextResponse } from 'next/server';
import { quizzesWithMetadata } from '@/lib/quiz-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const trending = searchParams.get('trending');
    const viral = searchParams.get('viral');
    const featured = searchParams.get('featured');

    let filteredQuizzes = quizzesWithMetadata;

    // Filter by category
    if (category) {
      filteredQuizzes = filteredQuizzes.filter(quiz => quiz.category === category);
    }

    // Filter by trending
    if (trending === 'true') {
      filteredQuizzes = filteredQuizzes
        .filter(quiz => (quiz.metadata?.trendingScore || 0) > 80)
        .sort((a, b) => (b.metadata?.trendingScore || 0) - (a.metadata?.trendingScore || 0));
    }

    // Filter by viral
    if (viral === 'true') {
      filteredQuizzes = filteredQuizzes
        .filter(quiz => quiz.isViral)
        .sort((a, b) => (b.metadata?.shares || 0) - (a.metadata?.shares || 0));
    }

    // Filter by featured
    if (featured === 'true') {
      filteredQuizzes = filteredQuizzes.filter(quiz => quiz.isFeatured);
    }

    return NextResponse.json({
      success: true,
      quizzes: filteredQuizzes,
      total: filteredQuizzes.length
    });

  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, quizId, data } = body;

    switch (action) {
      case 'update_metrics':
        // Update quiz metrics (views, shares, etc.)
        const quiz = quizzesWithMetadata.find(q => q.id === quizId);
        if (quiz && data) {
          quiz.metadata = { ...quiz.metadata, ...data };
          quiz.updatedAt = new Date();
        }
        break;

      case 'toggle_featured':
        const featuredQuiz = quizzesWithMetadata.find(q => q.id === quizId);
        if (featuredQuiz) {
          featuredQuiz.isFeatured = !featuredQuiz.isFeatured;
          featuredQuiz.updatedAt = new Date();
        }
        break;

      case 'toggle_viral':
        const viralQuiz = quizzesWithMetadata.find(q => q.id === quizId);
        if (viralQuiz) {
          viralQuiz.isViral = !viralQuiz.isViral;
          viralQuiz.updatedAt = new Date();
        }
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message: 'Quiz updated successfully'
    });

  } catch (error) {
    console.error('Error updating quiz:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
