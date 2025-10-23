import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import StoryModel from '@/lib/models/Story';
import { getStoryById } from '@/lib/story-data';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await connectDB();

    const story = await StoryModel.findOne({ id }).lean();
    if (story) {
      return NextResponse.json({ success: true, story });
    }

    const local = getStoryById(id);
    if (local) {
      return NextResponse.json({ success: true, story: local });
    }

    return NextResponse.json({ error: 'Story not found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching story:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


