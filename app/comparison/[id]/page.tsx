'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Share2, Download, Twitter, Facebook, Copy } from 'lucide-react';

interface ComparisonData {
  comparisonId: string;
  user1Score: {
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
  user2Score: {
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
  winner: 'user1' | 'user2' | 'tie';
  createdAt: string;
}

export default function ComparisonPage() {
  const { id } = useParams();
  const [comparison, setComparison] = useState<ComparisonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) {
      fetchComparison();
    }
  }, [id]);

  const fetchComparison = async () => {
    try {
      const response = await fetch(`/api/comparison/${id}/image`);
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error);
        return;
      }
      
      setComparison(data);
    } catch (err) {
      setError('Failed to load comparison');
    } finally {
      setLoading(false);
    }
  };

  const getComparisonIcon = (user1: number, user2: number) => {
    if (user1 > user2) return '🏆';
    if (user1 < user2) return '📈';
    return '🤝';
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const imageUrl = `/api/comparison/${id}/og-image`;

  const shareToTwitter = () => {
    const text = `Check out this music taste battle! Who has the better taste? 🎵`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !comparison) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle className="text-center text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">{error || 'Comparison not found'}</p>
            <Button onClick={() => window.location.href = '/'}>
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold">Music Taste Battle Results</h1>
            <p className="text-xl text-muted-foreground">
              See who has the most unique music taste!
            </p>
          </div>

          {/* Shareable Card Preview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Share2 className="mr-2 h-5 w-5" />
                Shareable Card
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt="Music Taste Battle Results"
                    className="w-full rounded-lg border"
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button onClick={copyLink} variant="outline">
                    <Copy className="mr-2 h-4 w-4" />
                    {copied ? 'Copied!' : 'Copy Link'}
                  </Button>
                  <Button onClick={shareToTwitter} variant="outline">
                    <Twitter className="mr-2 h-4 w-4" />
                    Share on Twitter
                  </Button>
                  <Button onClick={shareToFacebook} variant="outline">
                    <Facebook className="mr-2 h-4 w-4" />
                    Share on Facebook
                  </Button>
                  <Button 
                    onClick={() => window.open(imageUrl, '_blank')} 
                    variant="outline"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Image
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 h-5 w-5" />
                Detailed Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Overall Score Comparison */}
                <div className="text-center space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-primary">Player 1</div>
                      <div className="text-4xl font-bold">{comparison.user1Score.overall}</div>
                      <Progress value={comparison.user1Score.overall} />
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-secondary-foreground">Player 2</div>
                      <div className="text-4xl font-bold">{comparison.user2Score.overall}</div>
                      <Progress value={comparison.user2Score.overall} />
                    </div>
                  </div>
                  
                  <div className="text-lg font-semibold">
                    {comparison.winner === 'tie' ? '🤝 It\'s a Tie!' : 
                     comparison.winner === 'user1' ? '🏆 Player 1 Wins!' : 
                     '🏆 Player 2 Wins!'}
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Detailed Breakdown</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Diversity */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Diversity</span>
                        <span className="text-sm">
                          {getComparisonIcon(comparison.user1Score.diversity, comparison.user2Score.diversity)}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Player 1: {comparison.user1Score.diversity}</span>
                          <span>Player 2: {comparison.user2Score.diversity}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Progress value={comparison.user1Score.diversity} />
                          <Progress value={comparison.user2Score.diversity} />
                        </div>
                      </div>
                    </div>

                    {/* Discovery */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Discovery</span>
                        <span className="text-sm">
                          {getComparisonIcon(comparison.user1Score.discovery, comparison.user2Score.discovery)}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Player 1: {comparison.user1Score.discovery}</span>
                          <span>Player 2: {comparison.user2Score.discovery}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Progress value={comparison.user1Score.discovery} />
                          <Progress value={comparison.user2Score.discovery} />
                        </div>
                      </div>
                    </div>

                    {/* Energy */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Energy</span>
                        <span className="text-sm">
                          {getComparisonIcon(comparison.user1Score.energy, comparison.user2Score.energy)}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Player 1: {comparison.user1Score.energy}</span>
                          <span>Player 2: {comparison.user2Score.energy}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Progress value={comparison.user1Score.energy} />
                          <Progress value={comparison.user2Score.energy} />
                        </div>
                      </div>
                    </div>

                    {/* Valence */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Valence</span>
                        <span className="text-sm">
                          {getComparisonIcon(comparison.user1Score.valence, comparison.user2Score.valence)}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Player 1: {comparison.user1Score.valence}</span>
                          <span>Player 2: {comparison.user2Score.valence}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Progress value={comparison.user1Score.valence} />
                          <Progress value={comparison.user2Score.valence} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button onClick={() => window.location.href = '/'}>
                    Create Your Own Challenge
                  </Button>
                  <Button variant="outline" onClick={shareToTwitter}>
                    <Twitter className="mr-2 h-4 w-4" />
                    Share Results
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
