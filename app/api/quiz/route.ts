import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import QuizModel from '@/lib/models/Quiz';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const trending = searchParams.get('trending');
    const viral = searchParams.get('viral');
    const featured = searchParams.get('featured');

    console.log('🔍 API: Category:', category);

    await connectDB();

    const query: Record<string, any> = {};
    if (category) query.category = category;
    if (viral === 'true') query.isViral = true;
    if (featured === 'true') query.isFeatured = true;
    if (trending === 'true') query['metadata.trendingScore'] = { $gt: 80 };

    const docs = await QuizModel.find(query).lean();

    // Client-side-like sorting to mirror previous behavior
    let quizzes = docs as any[];
    if (trending === 'true') {
      quizzes = quizzes.sort((a, b) => (b?.metadata?.trendingScore || 0) - (a?.metadata?.trendingScore || 0));
    } else if (viral === 'true') {
      quizzes = quizzes.sort((a, b) => (b?.metadata?.shares || 0) - (a?.metadata?.shares || 0));
    }

    console.log('🔍 API: Quizzes:', quizzes);

    return NextResponse.json({
      success: true,
      quizzes,
      total: quizzes.length
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
        // Update quiz metrics (views, shares, etc.) in DB
        await connectDB();
        if (quizId && data) {
          await QuizModel.updateOne(
            { id: quizId },
            { $set: { ...Object.fromEntries(Object.entries(data).map(([k,v]) => ([`metadata.${k}`, v]))), updatedAt: new Date() } }
          );
        }
        break;

      case 'toggle_featured':
        await connectDB();
        if (quizId) {
          const doc = await QuizModel.findOne({ id: quizId });
          if (doc) {
            doc.isFeatured = !doc.isFeatured;
            doc.updatedAt = new Date();
            await doc.save();
          }
        }
        break;

      case 'toggle_viral':
        await connectDB();
        if (quizId) {
          const docV = await QuizModel.findOne({ id: quizId });
          if (docV) {
            docV.isViral = !docV.isViral;
            docV.updatedAt = new Date();
            await docV.save();
          }
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
