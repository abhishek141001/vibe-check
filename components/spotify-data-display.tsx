'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Music, Users, TrendingUp, Clock, Play, ExternalLink } from 'lucide-react';

interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ id: string; name: string }>;
  album: {
    id: string;
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  popularity: number;
  duration_ms: number;
  external_urls: { spotify: string };
}

interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
  images: Array<{ url: string; height: number; width: number }>;
  popularity: number;
  followers: { total: number };
  external_urls: { spotify: string };
}

interface AudioFeatures {
  id: string;
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  duration_ms: number;
  time_signature: number;
}

interface SpotifyData {
  user: any;
  topTracks: SpotifyTrack[];
  topArtists: SpotifyArtist[];
  audioFeatures: AudioFeatures[];
}

export function SpotifyDataDisplay() {
  const { data: session } = useSession();
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'tracks' | 'artists' | 'features'>('tracks');

  const fetchSpotifyData = async () => {
    if (!session?.accessToken) return;

    setLoading(true);
    setError(null);

    try {
      const baseUrl = 'https://api.spotify.com/v1';
      const headers = {
        'Authorization': `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      };

      // Fetch user profile
      const userResponse = await fetch(`${baseUrl}/me`, { headers });
      const user = await userResponse.json();

      // Fetch top tracks and artists
      const [tracksResponse, artistsResponse] = await Promise.all([
        fetch(`${baseUrl}/me/top/tracks?limit=50&time_range=medium_term`, { headers }),
        fetch(`${baseUrl}/me/top/artists?limit=50&time_range=medium_term`, { headers })
      ]);

      const topTracks = await tracksResponse.json();
      const topArtists = await artistsResponse.json();

      // Fetch audio features for tracks
      const trackIds = topTracks.items.map((track: any) => track.id);
      const audioFeaturesPromises = [];
      
      for (let i = 0; i < trackIds.length; i += 100) {
        const batch = trackIds.slice(i, i + 100);
        const batchIds = batch.join(',');
        audioFeaturesPromises.push(
          fetch(`${baseUrl}/audio-features?ids=${batchIds}`, { headers })
        );
      }

      const audioFeaturesResponses = await Promise.all(audioFeaturesPromises);
      const audioFeaturesResults = await Promise.all(
        audioFeaturesResponses.map(response => response.json())
      );
      
      const audioFeatures = audioFeaturesResults.flatMap(result => result.audio_features);

      setSpotifyData({
        user,
        topTracks: topTracks.items,
        topArtists: topArtists.items,
        audioFeatures: audioFeatures.filter(f => f !== null)
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  if (!session) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Please sign in to view your Spotify data</p>
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
            Your Spotify Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!spotifyData && !loading && (
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Fetch your complete Spotify listening data including tracks, artists, and audio features.
              </p>
              <Button onClick={fetchSpotifyData} disabled={loading}>
                {loading ? 'Fetching...' : 'Fetch My Data'}
              </Button>
            </div>
          )}

          {loading && (
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p>Fetching your Spotify data...</p>
            </div>
          )}

          {error && (
            <div className="text-center space-y-4">
              <p className="text-destructive">{error}</p>
              <Button onClick={fetchSpotifyData} variant="outline">
                Try Again
              </Button>
            </div>
          )}

          {spotifyData && (
            <div className="space-y-6">
              {/* User Profile */}
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={spotifyData.user.images?.[0]?.url} alt={spotifyData.user.display_name} />
                  <AvatarFallback>
                    {spotifyData.user.display_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{spotifyData.user.display_name}</h3>
                  <p className="text-muted-foreground">{spotifyData.user.email}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatNumber(spotifyData.user.followers?.total || 0)} followers
                  </p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex space-x-1 bg-muted p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('tracks')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'tracks' 
                      ? 'bg-background text-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Top Tracks ({spotifyData.topTracks.length})
                </button>
                <button
                  onClick={() => setActiveTab('artists')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'artists' 
                      ? 'bg-background text-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Top Artists ({spotifyData.topArtists.length})
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'features' 
                      ? 'bg-background text-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Audio Features ({spotifyData.audioFeatures.length})
                </button>
              </div>

              {/* Top Tracks */}
              {activeTab === 'tracks' && (
                <div className="space-y-4">
                  <h4 className="font-semibold">Your Top Tracks</h4>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {spotifyData.topTracks.map((track, index) => (
                      <div key={track.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                        <div className="text-sm font-medium text-muted-foreground w-8">
                          {index + 1}
                        </div>
                        <img
                          src={track.album.images[0]?.url}
                          alt={track.album.name}
                          className="w-12 h-12 rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{track.name}</p>
                          <p className="text-sm text-muted-foreground truncate">
                            {track.artists.map(artist => artist.name).join(', ')}
                          </p>
                          <p className="text-xs text-muted-foreground">{track.album.name}</p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>{track.popularity}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatDuration(track.duration_ms)}</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => window.open(track.external_urls.spotify, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Top Artists */}
              {activeTab === 'artists' && (
                <div className="space-y-4">
                  <h4 className="font-semibold">Your Top Artists</h4>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {spotifyData.topArtists.map((artist, index) => (
                      <div key={artist.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                        <div className="text-sm font-medium text-muted-foreground w-8">
                          {index + 1}
                        </div>
                        <img
                          src={artist.images[0]?.url}
                          alt={artist.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{artist.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatNumber(artist.followers.total)} followers
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {artist.genres.slice(0, 3).map((genre, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-muted px-2 py-1 rounded"
                              >
                                {genre}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>{artist.popularity}</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => window.open(artist.external_urls.spotify, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Audio Features */}
              {activeTab === 'features' && (
                <div className="space-y-4">
                  <h4 className="font-semibold">Audio Features Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {spotifyData.audioFeatures.slice(0, 20).map((features, index) => {
                      const track = spotifyData.topTracks[index];
                      return (
                        <div key={features.id} className="p-4 border rounded-lg space-y-2">
                          <div className="flex items-center space-x-2">
                            <img
                              src={track?.album.images[0]?.url}
                              alt={track?.name}
                              className="w-8 h-8 rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{track?.name}</p>
                              <p className="text-xs text-muted-foreground truncate">
                                {track?.artists.map(a => a.name).join(', ')}
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">Energy:</span>
                              <span className="ml-1 font-medium">{(features.energy * 100).toFixed(0)}%</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Valence:</span>
                              <span className="ml-1 font-medium">{(features.valence * 100).toFixed(0)}%</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Danceability:</span>
                              <span className="ml-1 font-medium">{(features.danceability * 100).toFixed(0)}%</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Acousticness:</span>
                              <span className="ml-1 font-medium">{(features.acousticness * 100).toFixed(0)}%</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Tempo:</span>
                              <span className="ml-1 font-medium">{features.tempo.toFixed(0)} BPM</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Loudness:</span>
                              <span className="ml-1 font-medium">{features.loudness.toFixed(1)} dB</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                <Button onClick={fetchSpotifyData} variant="outline">
                  Refresh Data
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
