'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MusicTasteScore } from '@/lib/spotify';
import { Users, Trophy, TrendingUp, Zap, Heart, Volume2, Mic, Headphones } from 'lucide-react';

interface MusicComparisonProps {
  userScore: MusicTasteScore;
  friendScore?: MusicTasteScore;
  friendName?: string;
}

export function MusicComparison({ userScore, friendScore, friendName }: MusicComparisonProps) {
  const [showComparison, setShowComparison] = useState(false);

  const getScoreColor = (value: number) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getComparisonColor = (user: number, friend: number) => {
    if (user > friend) return 'text-green-600';
    if (user < friend) return 'text-red-600';
    return 'text-blue-600';
  };

  const getComparisonIcon = (user: number, friend: number) => {
    if (user > friend) return '🏆';
    if (user < friend) return '📈';
    return '🤝';
  };

  if (!friendScore) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Compare with Friends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Invite friends to compare your music tastes and see who has the most unique style!
            </p>
            <Button onClick={() => setShowComparison(true)}>
              <Users className="mr-2 h-4 w-4" />
              Invite Friends
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="mr-2 h-5 w-5" />
            Music Taste Battle: You vs {friendName || 'Friend'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Overall Score Comparison */}
            <div className="text-center space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">You</div>
                  <div className="text-4xl font-bold">{userScore.overall}</div>
                  <Progress value={userScore.overall} />
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-secondary-foreground">
                    {friendName || 'Friend'}
                  </div>
                  <div className="text-4xl font-bold">{friendScore.overall}</div>
                  <Progress value={friendScore.overall} />
                </div>
              </div>
              
              <div className="text-lg font-semibold">
                {userScore.overall > friendScore.overall ? '🏆 You Win!' : 
                 userScore.overall < friendScore.overall ? '📈 They Win!' : 
                 '🤝 It\'s a Tie!'}
              </div>
            </div>

            {/* Detailed Comparison */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Detailed Breakdown</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Diversity */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Diversity</span>
                    <span className="text-sm">
                      {getComparisonIcon(userScore.diversity, friendScore.diversity)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>You: {userScore.diversity}</span>
                      <span>{friendName || 'Friend'}: {friendScore.diversity}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Progress value={userScore.diversity} />
                      <Progress value={friendScore.diversity} />
                    </div>
                  </div>
                </div>

                {/* Discovery */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Discovery</span>
                    <span className="text-sm">
                      {getComparisonIcon(userScore.discovery, friendScore.discovery)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>You: {userScore.discovery}</span>
                      <span>{friendName || 'Friend'}: {friendScore.discovery}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Progress value={userScore.discovery} />
                      <Progress value={friendScore.discovery} />
                    </div>
                  </div>
                </div>

                {/* Energy */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Energy</span>
                    <span className="text-sm">
                      {getComparisonIcon(userScore.energy, friendScore.energy)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>You: {userScore.energy}</span>
                      <span>{friendName || 'Friend'}: {friendScore.energy}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Progress value={userScore.energy} />
                      <Progress value={friendScore.energy} />
                    </div>
                  </div>
                </div>

                {/* Valence */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Valence</span>
                    <span className="text-sm">
                      {getComparisonIcon(userScore.valence, friendScore.valence)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>You: {userScore.valence}</span>
                      <span>{friendName || 'Friend'}: {friendScore.valence}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Progress value={userScore.valence} />
                      <Progress value={friendScore.valence} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Audio Features Comparison */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Audio Characteristics</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Zap className="mr-1 h-3 w-3" />
                    Danceability
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>You: {userScore.danceability}%</span>
                      <span>{friendName || 'Friend'}: {friendScore.danceability}%</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Progress value={userScore.danceability} />
                      <Progress value={friendScore.danceability} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Headphones className="mr-1 h-3 w-3" />
                    Acousticness
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>You: {userScore.acousticness}%</span>
                      <span>{friendName || 'Friend'}: {friendScore.acousticness}%</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Progress value={userScore.acousticness} />
                      <Progress value={friendScore.acousticness} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Mic className="mr-1 h-3 w-3" />
                    Speechiness
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>You: {userScore.speechiness}%</span>
                      <span>{friendName || 'Friend'}: {friendScore.speechiness}%</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Progress value={userScore.speechiness} />
                      <Progress value={friendScore.speechiness} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Invite More Friends
              </Button>
              <Button variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                Share Results
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
