'use client';

import { useSession, signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Music, Users, Trophy } from 'lucide-react';

export function UserProfile() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
              <AvatarFallback>
                {session.user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-2xl">{session.user?.name}</CardTitle>
              <p className="text-muted-foreground">{session.user?.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Music className="mr-2 h-4 w-4" />
              My Music Taste
            </Button>
            <Button variant="outline" size="sm">
              <Users className="mr-2 h-4 w-4" />
              Compare with Friends
            </Button>
            <Button variant="outline" size="sm">
              <Trophy className="mr-2 h-4 w-4" />
              Leaderboard
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button variant="ghost" onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
