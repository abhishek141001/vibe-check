import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import StoryModel from '@/lib/models/Story';
import { getAllStories } from '@/lib/story-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const trending = searchParams.get('trending');
    const viral = searchParams.get('viral');
    const featured = searchParams.get('featured');

    await connectDB();

    const query: Record<string, any> = {};
    if (category) query.category = category;
    if (viral === 'true') query.isViral = true;
    if (featured === 'true') query.isFeatured = true;
    if (trending === 'true') query['metadata.trendingScore'] = { $gt: 80 };

    const docs = await StoryModel.find(query).lean();
    let stories = docs as any[];
    if (!stories.length && !category && !trending && !viral && !featured) {
      stories = getAllStories();
    }

    if (trending === 'true') {
      stories = stories.sort((a, b) => (b?.metadata?.trendingScore || 0) - (a?.metadata?.trendingScore || 0));
    } else if (viral === 'true') {
      stories = stories.sort((a, b) => (b?.metadata?.shares || 0) - (a?.metadata?.shares || 0));
    }

    return NextResponse.json({ success: true, stories, total: stories.length });
  } catch (error) {
    console.error('Error fetching stories:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, storyId, data } = body;

    switch (action) {
      case 'update_metrics':
        await connectDB();
        if (storyId && data) {
          await StoryModel.updateOne(
            { id: storyId },
            { $set: { ...Object.fromEntries(Object.entries(data).map(([k, v]) => ([`metadata.${k}`, v]))), updatedAt: new Date() } }
          );
        }
        break;
      case 'toggle_featured':
        await connectDB();
        if (storyId) {
          const doc = await StoryModel.findOne({ id: storyId });
          if (doc) {
            doc.isFeatured = !doc.isFeatured;
            doc.updatedAt = new Date();
            await doc.save();
          }
        }
        break;
      case 'toggle_viral':
        await connectDB();
        if (storyId) {
          const docV = await StoryModel.findOne({ id: storyId });
          if (docV) {
            docV.isViral = !docV.isViral;
            docV.updatedAt = new Date();
            await docV.save();
          }
        }
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Story updated successfully' });
  } catch (error) {
    console.error('Error updating story:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


