import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import QuizModel from '@/lib/models/Quiz';
import { getQuizById } from '@/lib/quiz-data';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await connectDB();

    // Prefer DB
    const quizDoc = await QuizModel.findOne({ id }).lean();
    if (quizDoc) {
      return NextResponse.json({ success: true, quiz: quizDoc });
    }

    // Fallback to in-memory quizzes
    const local = getQuizById(id);
    if (local) {
      return NextResponse.json({ success: true, quiz: local });
    }

    return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


