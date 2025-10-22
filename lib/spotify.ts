// Server-side Spotify API functions using fetch

export interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  images: Array<{ url: string; height: number; width: number }>;
  followers: { total: number };
  country: string;
  product: string;
}

export interface SpotifyTrack {
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

export interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
  images: Array<{ url: string; height: number; width: number }>;
  popularity: number;
  followers: { total: number };
  external_urls: { spotify: string };
}

export interface MusicTasteScore {
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
}

export const calculateMusicTasteScore = async (
  accessToken: string,
  timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term'
): Promise<MusicTasteScore> => {
  try {
    console.log('Starting music taste score calculation...');
    
    // Use fetch API instead of SpotifyWebApi for server-side compatibility
    const baseUrl = 'https://api.spotify.com/v1';
    
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    // Get user's top tracks and artists
    const [tracksResponse, artistsResponse] = await Promise.all([
      fetch(`${baseUrl}/me/top/tracks?limit=50&time_range=${timeRange}`, { headers }),
      fetch(`${baseUrl}/me/top/artists?limit=50&time_range=${timeRange}`, { headers })
    ]);

    if (!tracksResponse.ok) {
      console.error('Tracks response:', tracksResponse.status, await tracksResponse.text());
      throw new Error(`Failed to fetch top tracks: ${tracksResponse.status}`);
    }
    
    if (!artistsResponse.ok) {
      console.error('Artists response:', artistsResponse.status, await artistsResponse.text());
      throw new Error(`Failed to fetch top artists: ${artistsResponse.status}`);
    }

    const topTracks = await tracksResponse.json();
    const topArtists = await artistsResponse.json();
    
    console.log(`Found ${topTracks.items.length} tracks and ${topArtists.items.length} artists`);

    // Get audio features for top tracks
    const trackIds = topTracks.items.map((track: any) => track.id);
    console.log(`Fetching audio features for ${trackIds.length} tracks`);
    
    // Spotify API has a limit of 100 track IDs per request
    const audioFeaturesPromises = [];
    for (let i = 0; i < trackIds.length; i += 100) {
      const batch = trackIds.slice(i, i + 100);
      const batchIds = batch.join(',');
      console.log(`Fetching audio features batch ${Math.floor(i/100) + 1} with ${batch.length} tracks`);
      audioFeaturesPromises.push(
        fetch(`${baseUrl}/audio-features?ids=${batchIds}`, { headers })
      );
    }
    
    const audioFeaturesResponses = await Promise.all(audioFeaturesPromises);
    
    // Check if any response failed
    const failedResponses = audioFeaturesResponses.filter(response => !response.ok);
    let audioFeatures: { audio_features: any[] } = { audio_features: [] };
    
    if (failedResponses.length > 0) {
      console.error('Some audio features requests failed:', failedResponses.map(r => r.status));
      console.log('Continuing without audio features...');
    } else {
      // Combine all audio features
      const audioFeaturesResults = await Promise.all(
        audioFeaturesResponses.map(response => response.json())
      );
      
      audioFeatures = {
        audio_features: audioFeaturesResults.flatMap((result: any) => result.audio_features)
      };
    }

    // Calculate scores based on audio features
    const features = audioFeatures.audio_features.filter((f: any) => f !== null);
    console.log(`Found ${features.length} audio features`);
    
    // Calculate audio features with fallback values if no features available
    const avgEnergy = features.length > 0 ? features.reduce((sum: number, f: any) => sum + f.energy, 0) / features.length : 0.5;
    const avgValence = features.length > 0 ? features.reduce((sum: number, f: any) => sum + f.valence, 0) / features.length : 0.5;
    const avgDanceability = features.length > 0 ? features.reduce((sum: number, f: any) => sum + f.danceability, 0) / features.length : 0.5;
    const avgAcousticness = features.length > 0 ? features.reduce((sum: number, f: any) => sum + f.acousticness, 0) / features.length : 0.5;
    const avgInstrumentalness = features.length > 0 ? features.reduce((sum: number, f: any) => sum + f.instrumentalness, 0) / features.length : 0.5;
    const avgLiveness = features.length > 0 ? features.reduce((sum: number, f: any) => sum + f.liveness, 0) / features.length : 0.5;
    const avgSpeechiness = features.length > 0 ? features.reduce((sum: number, f: any) => sum + f.speechiness, 0) / features.length : 0.5;

    // Calculate diversity score based on genre variety
    const allGenres = topArtists.items.flatMap((artist: any) => artist.genres);
    const uniqueGenres = new Set(allGenres);
    const diversity = Math.min(uniqueGenres.size / 10, 1) * 100; // Normalize to 0-100

    // Calculate mainstream score based on popularity
    const avgPopularity = topTracks.items.reduce((sum: number, track: any) => sum + track.popularity, 0) / topTracks.items.length;
    const mainstream = avgPopularity;

    // Calculate discovery score (inverse of mainstream)
    const discovery = Math.max(0, 100 - mainstream);

    // Calculate overall score
    const overall = (diversity + discovery + avgEnergy * 100 + avgValence * 100) / 4;

    return {
      overall: Math.round(overall),
      diversity: Math.round(diversity),
      mainstream: Math.round(mainstream),
      discovery: Math.round(discovery),
      energy: Math.round(avgEnergy * 100),
      valence: Math.round(avgValence * 100),
      danceability: Math.round(avgDanceability * 100),
      acousticness: Math.round(avgAcousticness * 100),
      instrumentalness: Math.round(avgInstrumentalness * 100),
      liveness: Math.round(avgLiveness * 100),
      speechiness: Math.round(avgSpeechiness * 100),
    };
  } catch (error) {
    console.error('Error calculating music taste score:', error);
    throw new Error('Failed to calculate music taste score');
  }
};
