'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Music, Users, Trophy, Zap, Heart, Volume2 } from 'lucide-react';

interface InviteData {
  inviteCode: string;
  inviterName: string;
  inviterScore?: {
    overall: number;
    diversity: number;
    mainstream: number;
    discovery: number;
    energy: number;
    valence: number;
    danceability: number;
    acousticness: number;
    instrumentalness: number;
    liveness: number;
    speechiness: number;
  };
  status: string;
}

interface ComparisonResult {
  comparisonId: string;
  inviterName: string;
  inviteeName: string;
  inviterScore: any;
  inviteeScore: any;
  winner: 'user1' | 'user2' | 'tie';
}

export default function InvitePage() {
  const { code } = useParams();
  const { data: session, status } = useSession();
  const [inviteData, setInviteData] = useState<InviteData | null>(null);
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (code) {
      fetchInviteData();
    }
  }, [code]);

  const fetchInviteData = async () => {
    try {
      const response = await fetch(`/api/invite/${code}`);
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error);
        return;
      }
      
      setInviteData(data);
    } catch (err) {
      setError('Failed to load invite');
    }
  };

  const acceptInvite = async () => {
    if (!session) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/invite/${code}`, {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error);
        return;
      }
      
      setComparison(data);
    } catch (err) {
      setError('Failed to accept invite');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (value: number) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getComparisonIcon = (user1: number, user2: number) => {
    if (user1 > user2) return '🏆';
    if (user1 < user2) return '📈';
    return '🤝';
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle className="text-center">Sign In Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              You need to sign in with Spotify to accept this music taste challenge!
            </p>
            <Button onClick={() => window.location.href = '/api/auth/signin'}>
              Sign In with Spotify
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle className="text-center text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={() => window.location.href = '/'}>
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (comparison) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-4xl font-bold">Music Taste Battle Results!</h1>
              <p className="text-xl text-muted-foreground">
                {comparison.inviterName} vs {comparison.inviteeName}
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Trophy className="mr-2 h-6 w-6" />
                  {comparison.winner === 'tie' ? 'It\'s a Tie!' : 
                   comparison.winner === 'user1' ? `${comparison.inviterName} Wins!` : 
                   `${comparison.inviteeName} Wins!`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Overall Score Comparison */}
                  <div className="text-center space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-2xl font-bold text-primary">{comparison.inviterName}</div>
                        <div className="text-4xl font-bold">{comparison.inviterScore.overall}</div>
                        <Progress value={comparison.inviterScore.overall} />
                      </div>
                      <div className="space-y-2">
                        <div className="text-2xl font-bold text-secondary-foreground">{comparison.inviteeName}</div>
                        <div className="text-4xl font-bold">{comparison.inviteeScore.overall}</div>
                        <Progress value={comparison.inviteeScore.overall} />
                      </div>
                    </div>
                  </div>

                  {/* Detailed Comparison */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-center">Detailed Breakdown</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Diversity */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Diversity</span>
                          <span className="text-sm">
                            {getComparisonIcon(comparison.inviterScore.diversity, comparison.inviteeScore.diversity)}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>{comparison.inviterName}: {comparison.inviterScore.diversity}</span>
                            <span>{comparison.inviteeName}: {comparison.inviteeScore.diversity}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Progress value={comparison.inviterScore.diversity} />
                            <Progress value={comparison.inviteeScore.diversity} />
                          </div>
                        </div>
                      </div>

                      {/* Discovery */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Discovery</span>
                          <span className="text-sm">
                            {getComparisonIcon(comparison.inviterScore.discovery, comparison.inviteeScore.discovery)}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>{comparison.inviterName}: {comparison.inviterScore.discovery}</span>
                            <span>{comparison.inviteeName}: {comparison.inviteeScore.discovery}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Progress value={comparison.inviterScore.discovery} />
                            <Progress value={comparison.inviteeScore.discovery} />
                          </div>
                        </div>
                      </div>

                      {/* Energy */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Energy</span>
                          <span className="text-sm">
                            {getComparisonIcon(comparison.inviterScore.energy, comparison.inviteeScore.energy)}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>{comparison.inviterName}: {comparison.inviterScore.energy}</span>
                            <span>{comparison.inviteeName}: {comparison.inviteeScore.energy}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Progress value={comparison.inviterScore.energy} />
                            <Progress value={comparison.inviteeScore.energy} />
                          </div>
                        </div>
                      </div>

                      {/* Valence */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Valence</span>
                          <span className="text-sm">
                            {getComparisonIcon(comparison.inviterScore.valence, comparison.inviteeScore.valence)}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>{comparison.inviterName}: {comparison.inviterScore.valence}</span>
                            <span>{comparison.inviteeName}: {comparison.inviteeScore.valence}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Progress value={comparison.inviterScore.valence} />
                            <Progress value={comparison.inviteeScore.valence} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <Button onClick={() => window.location.href = '/'}>
                      Create Your Own Challenge
                    </Button>
                    <Button variant="outline" onClick={() => window.location.href = `/comparison/${comparison.comparisonId}`}>
                      View Full Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!inviteData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold">Music Taste Challenge!</h1>
            <p className="text-xl text-muted-foreground">
              {inviteData.inviterName} has challenged you to a music taste battle!
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Challenge Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {inviteData.inviterScore && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Your Opponent's Score</h4>
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-primary">{inviteData.inviterScore.overall}</div>
                      <div className="text-sm text-muted-foreground">Overall Music Taste Score</div>
                      <Progress value={inviteData.inviterScore.overall} className="w-full" />
                    </div>
                  </div>
                )}

                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    Accept this challenge to compare your music taste and see who has the most unique style!
                  </p>
                  <Button
                    onClick={acceptInvite}
                    disabled={loading}
                    size="lg"
                    className="bg-[#1DB954] hover:bg-[#1ed760] text-white"
                  >
                    {loading ? 'Calculating...' : 'Accept Challenge'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
