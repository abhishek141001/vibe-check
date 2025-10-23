'use client';

import StoryShareButton from './StoryShareButton';
import { useTheme } from '@/components/theme/ThemeProvider';

interface StoryHeaderProps {
  storyId: string;
  title: string;
  emoji: string;
}

export default function StoryHeader({ storyId, title, emoji }: StoryHeaderProps) {
  const { currentTheme } = useTheme();
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2 text-xl">
        <span>{emoji}</span>
        <span className="font-bold" style={{ color: currentTheme.colors.text }}>{title}</span>
      </div>
      <StoryShareButton storyId={storyId} storyTitle={title} storyEmoji={emoji} />
    </div>
  );
}


