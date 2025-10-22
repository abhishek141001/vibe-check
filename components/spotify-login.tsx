'use client';

import { signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Music, LogIn } from 'lucide-react';

export function SpotifyLogin() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (session) {
    return null; // User is logged in, don't show login button
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      <div className="text-center space-y-2">
        <Music className="h-16 w-16 mx-auto text-primary" />
        <h2 className="text-2xl font-bold">Connect with Spotify</h2>
        <p className="text-muted-foreground max-w-md">
          Connect your Spotify account to discover your music taste and compare it with friends.
        </p>
      </div>
      
      <Button
        onClick={() => signIn('spotify')}
        size="lg"
        className="bg-[#1DB954] hover:bg-[#1ed760] text-white"
      >
        <LogIn className="mr-2 h-4 w-4" />
        Connect with Spotify
      </Button>
    </div>
  );
}
