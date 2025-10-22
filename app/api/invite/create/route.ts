import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/database';
import { calculateMusicTasteScore } from '@/lib/spotify';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get or create user
    let user = await db.getUserBySpotifyId(session.user.email);
    if (!user) {
      user = await db.createUser({
        spotifyId: session.user.email,
        displayName: session.user.name || 'Unknown',
        email: session.user.email,
        image: session.user.image || undefined,
      });
    }

    // Calculate user's music taste score if not already calculated
    let userScore = user.musicTasteScore;
    if (!userScore && session.accessToken) {
      try {
        userScore = await calculateMusicTasteScore(session.accessToken as string);
        await db.updateUserScore(user.id, userScore);
      } catch (error) {
        console.error('Error calculating score for invite:', error);
        // Continue without score
      }
    }

    // Create invite
    const invite = await db.createInvite(
      user.id,
      user.displayName,
      userScore
    );

    return NextResponse.json({
      inviteCode: invite.inviteCode,
      inviteUrl: `${process.env.NEXTAUTH_URL}/invite/${invite.inviteCode}`,
      expiresAt: invite.expiresAt,
    });
  } catch (error) {
    console.error('Error creating invite:', error);
    return NextResponse.json(
      { error: 'Failed to create invite' },
      { status: 500 }
    );
  }
}
