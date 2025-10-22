import { NextRequest, NextResponse } from 'next/server';
import { calculateMusicTasteScore } from '@/lib/spotify';

export async function POST(request: NextRequest) {
  try {
    const { accessToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json({ error: 'Access token required' }, { status: 400 });
    }

    const score = await calculateMusicTasteScore(accessToken);
    
    return NextResponse.json(score);
  } catch (error) {
    console.error('Error calculating music taste score:', error);
    return NextResponse.json(
      { error: 'Failed to calculate music taste score' },
      { status: 500 }
    );
  }
}
