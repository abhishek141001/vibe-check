import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/database';
import { calculateMusicTasteScore } from '@/lib/spotify';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  try {
    const invite = await db.getInviteByCode(code);
    
    if (!invite) {
      return NextResponse.json({ error: 'Invite not found' }, { status: 404 });
    }

    if (invite.status !== 'pending') {
      return NextResponse.json({ error: 'Invite already used' }, { status: 400 });
    }

    if (new Date() > invite.expiresAt) {
      return NextResponse.json({ error: 'Invite expired' }, { status: 400 });
    }

    return NextResponse.json({
      inviteCode: invite.inviteCode,
      inviterName: invite.inviterName,
      inviterScore: invite.inviterScore,
      status: invite.status,
    });
  } catch (error) {
    console.error('Error fetching invite:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invite' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const invite = await db.getInviteByCode(code);
    
    if (!invite) {
      return NextResponse.json({ error: 'Invite not found' }, { status: 404 });
    }

    if (invite.status !== 'pending') {
      return NextResponse.json({ error: 'Invite already used' }, { status: 400 });
    }

    if (new Date() > invite.expiresAt) {
      return NextResponse.json({ error: 'Invite expired' }, { status: 400 });
    }

    // Get or create invitee user
    let invitee = await db.getUserBySpotifyId(session.user.email);
    if (!invitee) {
      invitee = await db.createUser({
        spotifyId: session.user.email,
        displayName: session.user.name || 'Unknown',
        email: session.user.email,
        image: session.user.image || undefined,
      });
    }

    // Calculate invitee's music taste score
    let inviteeScore = invitee.musicTasteScore;
    if (!inviteeScore && session.accessToken) {
      try {
        inviteeScore = await calculateMusicTasteScore(session.accessToken as string);
        await db.updateUserScore(invitee.id, inviteeScore);
      } catch (error) {
        console.error('Error calculating invitee score:', error);
        return NextResponse.json(
          { error: 'Failed to calculate your music taste score' },
          { status: 500 }
        );
      }
    }

    if (!inviteeScore) {
      return NextResponse.json(
        { error: 'Unable to calculate your music taste score' },
        { status: 400 }
      );
    }

    // Accept invite
    await db.acceptInvite(invite.id, invitee.id);

    // Create comparison
    const comparison = await db.createComparison(
      invite.inviterId,
      invitee.id,
      invite.inviterScore!,
      inviteeScore
    );

    return NextResponse.json({
      comparisonId: comparison.id,
      inviterName: invite.inviterName,
      inviteeName: invitee.displayName,
      inviterScore: invite.inviterScore,
      inviteeScore: inviteeScore,
      winner: comparison.winner,
    });
  } catch (error) {
    console.error('Error accepting invite:', error);
    return NextResponse.json(
      { error: 'Failed to accept invite' },
      { status: 500 }
    );
  }
}
