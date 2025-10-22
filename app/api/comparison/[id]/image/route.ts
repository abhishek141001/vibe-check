import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const comparison = await db.getComparison(id);
    
    if (!comparison) {
      return NextResponse.json({ error: 'Comparison not found' }, { status: 404 });
    }

    // For now, return a simple JSON response with the comparison data
    // In production, you would generate an actual image using libraries like:
    // - @vercel/og (for Open Graph images)
    // - canvas
    // - puppeteer
    // - sharp
    
    return NextResponse.json({
      comparisonId: comparison.id,
      user1Score: comparison.user1Score,
      user2Score: comparison.user2Score,
      winner: comparison.winner,
      createdAt: comparison.createdAt,
      // This would be the image URL in production
      imageUrl: `/api/comparison/${id}/og-image`,
    });
  } catch (error) {
    console.error('Error fetching comparison:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comparison' },
      { status: 500 }
    );
  }
}
