import { NextRequest, NextResponse } from 'next/server';
import { generateViralQuiz, generateSeasonalQuiz, getTrendingSuggestions, getSeasonalSuggestions } from '@/lib/viral-generator';

export async function POST(request: NextRequest) {
  try {
    const { type, topic, category, season } = await request.json();

    let newQuiz;

    switch (type) {
      case 'viral':
        if (!topic || !category) {
          return NextResponse.json(
            { error: 'Topic and category are required for viral quiz' },
            { status: 400 }
          );
        }
        newQuiz = generateViralQuiz(topic, category);
        break;

      case 'seasonal':
        if (!season) {
          return NextResponse.json(
            { error: 'Season is required for seasonal quiz' },
            { status: 400 }
          );
        }
        newQuiz = generateSeasonalQuiz(season);
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid quiz type. Use "viral" or "seasonal"' },
          { status: 400 }
        );
    }

    // In a real app, you would save this to the database
    // For now, we'll just return the generated quiz
    return NextResponse.json({
      success: true,
      quiz: newQuiz,
      message: 'Quiz generated successfully'
    });

  } catch (error) {
    console.error('Error creating quiz:', error);
    return NextResponse.json(
      { error: 'Failed to create quiz' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const trendingSuggestions = getTrendingSuggestions();
    const seasonalSuggestions = getSeasonalSuggestions();

    return NextResponse.json({
      success: true,
      suggestions: {
        trending: trendingSuggestions,
        seasonal: seasonalSuggestions
      }
    });

  } catch (error) {
    console.error('Error getting suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to get suggestions' },
      { status: 500 }
    );
  }
}
