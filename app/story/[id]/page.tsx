import connectDB from '@/lib/mongodb';
import StoryModel from '@/lib/models/Story';
import { notFound } from 'next/navigation';
import StoryPage from '@/components/story/StoryPage';
import { getStoryById } from '@/lib/story-data';

interface StoryRouteProps {
  params: Promise<{ id: string }>;
}

export default async function DynamicStoryPage({ params }: StoryRouteProps) {
  const { id } = await params;
  await connectDB();
  const existsInDb = await StoryModel.exists({ id });
  if (!existsInDb && !getStoryById(id)) notFound();
  return <StoryPage storyId={id} />;
}

export async function generateStaticParams() {
  return [] as { id: string }[];
}


