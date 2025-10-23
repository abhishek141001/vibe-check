'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThemeProvider, useTheme } from '@/components/theme/ThemeProvider';
import { LanguageProvider, useLanguage } from '@/components/quiz/LanguageToggle';
import StoryHeader from './StoryHeader';
import UserInfoForm from '@/components/quiz/UserInfoForm';

type StoryChoice = {
  id: string;
  text: string;
  textHindi?: string;
  nextId?: string;
};

type StoryNode = {
  id: string;
  text: string;
  textHindi?: string;
  image?: string;
  choices: [StoryChoice, StoryChoice];
  ending?: boolean;
  endingTitle?: string;
  endingTitleHindi?: string;
  endingEmoji?: string;
};

type Story = {
  id: string;
  title: string;
  titleHindi?: string;
  description: string;
  descriptionHindi?: string;
  emoji: string;
  startNodeId: string;
  maxSlides?: number;
  nodes: StoryNode[];
  customization?: Record<string, any>;
};

type UserInfo = {
  name: string;
  age: number;
};

interface StoryPageProps {
  storyId: string;
}

function StoryPageContent({ storyId }: StoryPageProps) {
  const [story, setStory] = useState<Story | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [steps, setSteps] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { language } = useLanguage();
  const { currentTheme } = useTheme();
  const maxSlides = story?.maxSlides ?? 7;

  const nodeById = useMemo(() => {
    const map = new Map<string, StoryNode>();
    story?.nodes.forEach(n => map.set(n.id, n));
    return map;
  }, [story]);

  const currentNode = currentNodeId ? nodeById.get(currentNodeId) : undefined;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/story/${encodeURIComponent(storyId)}`);
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data?.story) {
          setStory(data.story);
          setCurrentNodeId(data.story.startNodeId);
          console.log('rawBgImage', data.story.nodes[0].image);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [storyId]);

  const handleChoice = (choice: StoryChoice) => {
    if (finished) return;
    const nextId = choice.nextId;
    const nextNode = nextId ? nodeById.get(nextId) : undefined;
    const nextSteps = steps + 1;
    setSteps(nextSteps);
    if (!nextNode || nextNode.ending || nextSteps >= maxSlides) {
      // finish
      setFinished(true);
      if (nextNode?.id) setCurrentNodeId(nextNode.id);
      return;
    }
    setCurrentNodeId(nextNode.id);
  };

  const handleRestart = () => {
    setFinished(false);
    setSteps(0);
    setCurrentNodeId(story?.startNodeId || null);
    // Optionally re-ask info on restart: uncomment next line if desired
    // setShowUserInfo(true);
  };

  const handleUserInfoComplete = (info: UserInfo) => {
    setUserInfo(info);
    setShowUserInfo(false);
  };

  if (isLoading || !story || !currentNode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-700">Loading story...</div>
      </div>
    );
  }

  const rawBgImage = currentNode.image || story.customization?.backgroundImage;
  
  const normalizedBg = rawBgImage
    ? (rawBgImage.startsWith('http') || rawBgImage.startsWith('/') ? rawBgImage : `/${rawBgImage}`)
    : undefined;
  const safeBg = normalizedBg ? encodeURI(normalizedBg) : undefined;

  const userInfoCustomization = {
    enablePersonalization: true,
    personalizationFields: ['name', 'age'] as ('name' | 'age')[]
  };

  const userInfoForceColors = showUserInfo ? {
    text: '#e5e7eb',
    textSecondary: '#cbd5e1',
    primary: '#6366f1',
    secondary: '#06b6d4',
    background: '#0f172a',
    surface: '#111827',
    error: '#ef4444'
  } : undefined;

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{
        backgroundColor: 'transparent',
        backgroundImage: showUserInfo
          ? `linear-gradient(135deg, #0f172a, #1e293b)`
          : (safeBg
              ? `linear-gradient(135deg, ${currentTheme.colors.primary}40, ${currentTheme.colors.secondary}40, ${currentTheme.colors.accent}30), url("${safeBg}")`
              : `linear-gradient(135deg, ${currentTheme.colors.primary}40, ${currentTheme.colors.secondary}40, ${currentTheme.colors.accent}30)`),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        <StoryHeader storyId={story.id} title={language === 'hi' && story.titleHindi ? story.titleHindi : story.title} emoji={story.emoji} />
        <div className="text-sm mb-2" style={{ color: currentTheme.colors.textSecondary }}>
          Step {Math.min(steps + 1, maxSlides)} / {maxSlides}
        </div>

        {showUserInfo ? (
          <UserInfoForm
            quizTitle={language === 'hi' && story.titleHindi ? story.titleHindi : story.title}
            quizEmoji={story.emoji}
            onComplete={handleUserInfoComplete}
            customization={userInfoCustomization}
            forceColors={userInfoForceColors}
          />
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentNode.id + String(finished)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col"
              >
                <div className="mt-2 w-full max-w-3xl mx-auto">
                  <motion.div
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-3xl text-center p-4 sm:p-6 md:p-8 rounded-xl"
                    style={{
                      backgroundColor: `${currentTheme.colors.surface}CC`,
                      color: currentTheme.colors.text,
                      boxShadow: currentTheme.layout.shadows,
                    }}
                  >
                    {/* Story text */}
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                      {finished && currentNode.endingTitle
                        ? (language === 'hi' && currentNode.endingTitleHindi ? currentNode.endingTitleHindi : currentNode.endingTitle)
                        : ''}
                    </h2>
                    <div className="text-6xl mb-3">{finished && currentNode.endingEmoji ? currentNode.endingEmoji : ''}</div>
                    <p className="text-lg sm:text-xl leading-relaxed">
                      {language === 'hi' && currentNode.textHindi ? currentNode.textHindi : currentNode.text}
                    </p>
                  </motion.div>
                </div>

                {/* Choices or restart */}
                <div className="mt-auto pt-6 sm:pt-8 pb-4 sm:pb-6">
                  {finished ? (
                    <div className="flex items-center justify-center">
                      <Button onClick={handleRestart} className="px-6 py-3 text-lg">
                        Play Again
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                      {currentNode.choices.map((choice, idx) => (
                        <motion.button
                          key={choice.id}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleChoice(choice)}
                          className="w-full p-4 sm:p-5 rounded-lg text-left"
                          style={{
                            backgroundColor: `${currentTheme.colors.surface}CC`,
                            color: currentTheme.colors.text,
                            border: `2px solid ${currentTheme.colors.primary}55`,
                          }}
                        >
                          <div className="text-2xl mb-2">{idx === 0 ? '🅰️' : '🅱️'}</div>
                          <div className="text-base sm:text-lg font-semibold">
                            {language === 'hi' && choice.textHindi ? choice.textHindi : choice.text}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}

export default function StoryPage({ storyId }: StoryPageProps) {
  const defaultLanguage: 'en' | 'hi' = 'en';
  return (
    <ThemeProvider>
      <LanguageProvider initialLanguage={defaultLanguage}>
        <StoryPageContent storyId={storyId} />
      </LanguageProvider>
    </ThemeProvider>
  );
}


