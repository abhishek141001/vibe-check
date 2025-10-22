'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Providers } from '@/components/providers/session-provider';
import { SpotifyLogin } from '@/components/spotify-login';
import { UserProfile } from '@/components/user-profile';
import { MusicTasteDisplay } from '@/components/music-taste-display';
import { MusicComparison } from '@/components/music-comparison';
import { InviteFriends } from '@/components/invite-friends';
import { MusicTasteScore } from '@/lib/spotify';
import { Music, Trophy, Users } from 'lucide-react';

export default function Home() {
  return (
    <Providers>
      <VibeCheckApp />
    </Providers>
  );
}

function VibeCheckApp() {
  const { data: session, status } = useSession();
  const [userScore, setUserScore] = useState<MusicTasteScore | null>(null);
  const [friendScore, setFriendScore] = useState<MusicTasteScore | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'taste' | 'compare' | 'invite'>('profile');

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Music className="h-16 w-16 mx-auto text-primary" />
              <h1 className="text-4xl font-bold text-foreground">Vibe Check</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover your unique music taste and compare it with friends. 
                See who has the most diverse, underground, or energetic music style!
              </p>
            </div>
            <SpotifyLogin />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-foreground">Vibe Check</h1>
          <p className="text-muted-foreground">Your music taste dashboard</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'profile' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('taste')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'taste' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              My Taste
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'compare' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Compare
            </button>
            <button
              onClick={() => setActiveTab('invite')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'invite' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Invite
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'profile' && <UserProfile />}
          {activeTab === 'taste' && (
            <MusicTasteDisplay onScoreCalculated={setUserScore} />
          )}
          {activeTab === 'compare' && (
            <MusicComparison 
              userScore={userScore!} 
              friendScore={friendScore}
              friendName="Alex"
            />
          )}
          {activeTab === 'invite' && <InviteFriends />}
        </div>
      </div>
    </div>
  );
}
