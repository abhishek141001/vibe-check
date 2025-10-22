'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MusicTasteScore } from '@/lib/spotify';
import { Music, TrendingUp, Zap, Heart, Volume2, Mic, Headphones } from 'lucide-react';

interface MusicTasteDisplayProps {
  onScoreCalculated?: (score: MusicTasteScore) => void;
}

export function MusicTasteDisplay({ onScoreCalculated }: MusicTasteDisplayProps) {
  const { data: session } = useSession();
  const [score, setScore] = useState<MusicTasteScore | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateScore = async () => {
    if (!session?.accessToken) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/calculate-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken: session.accessToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to calculate score');
      }

      const scoreData = await response.json();
      setScore(scoreData);
      onScoreCalculated?.(scoreData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (value: number) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreDescription = (value: number) => {
    if (value >= 80) return 'Excellent';
    if (value >= 60) return 'Good';
    if (value >= 40) return 'Average';
    return 'Needs Improvement';
  };

  if (!session) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Please sign in to view your music taste</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Music className="mr-2 h-5 w-5" />
            Your Music Taste Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!score && !loading && (
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Discover your unique music taste profile based on your Spotify listening habits.
              </p>
              <Button onClick={calculateScore} disabled={loading}>
                {loading ? 'Calculating...' : 'Calculate My Score'}
              </Button>
            </div>
          )}

          {loading && (
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p>Analyzing your music taste...</p>
            </div>
          )}

          {error && (
            <div className="text-center space-y-4">
              <p className="text-destructive">{error}</p>
              <Button onClick={calculateScore} variant="outline">
                Try Again
              </Button>
            </div>
          )}

          {score && (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-primary">{score.overall}</div>
                <div className="text-sm text-muted-foreground">Overall Music Taste Score</div>
                <Progress value={score.overall} className="w-full" />
              </div>

              {/* Detailed Scores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Diversity</span>
                    <span className={`text-sm font-bold ${getScoreColor(score.diversity)}`}>
                      {score.diversity}
                    </span>
                  </div>
                  <Progress value={score.diversity} />
                  <p className="text-xs text-muted-foreground">
                    {getScoreDescription(score.diversity)} genre variety
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Discovery</span>
                    <span className={`text-sm font-bold ${getScoreColor(score.discovery)}`}>
                      {score.discovery}
                    </span>
                  </div>
                  <Progress value={score.discovery} />
                  <p className="text-xs text-muted-foreground">
                    {getScoreDescription(score.discovery)} underground taste
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Energy</span>
                    <span className={`text-sm font-bold ${getScoreColor(score.energy)}`}>
                      {score.energy}
                    </span>
                  </div>
                  <Progress value={score.energy} />
                  <p className="text-xs text-muted-foreground">
                    {getScoreDescription(score.energy)} high-energy music
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Valence</span>
                    <span className={`text-sm font-bold ${getScoreColor(score.valence)}`}>
                      {score.valence}
                    </span>
                  </div>
                  <Progress value={score.valence} />
                  <p className="text-xs text-muted-foreground">
                    {getScoreDescription(score.valence)} positive mood
                  </p>
                </div>
              </div>

              {/* Audio Features */}
              <div className="space-y-4">
                <h4 className="font-semibold">Audio Characteristics</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Zap className="mr-1 h-3 w-3" />
                      Danceability
                    </div>
                    <Progress value={score.danceability} />
                    <div className="text-xs text-muted-foreground">{score.danceability}%</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Headphones className="mr-1 h-3 w-3" />
                      Acousticness
                    </div>
                    <Progress value={score.acousticness} />
                    <div className="text-xs text-muted-foreground">{score.acousticness}%</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Mic className="mr-1 h-3 w-3" />
                      Speechiness
                    </div>
                    <Progress value={score.speechiness} />
                    <div className="text-xs text-muted-foreground">{score.speechiness}%</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button onClick={calculateScore} variant="outline">
                  Recalculate Score
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
