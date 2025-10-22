import SpotifyWebApi from 'spotify-web-api-js';

// Create a function to get a new instance of SpotifyWebApi
export const createSpotifyApi = (accessToken: string) => {
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(accessToken);
  return spotifyApi;
};

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

    if (!tracksResponse.ok || !artistsResponse.ok) {
      throw new Error('Failed to fetch user data from Spotify');
    }

    const topTracks = await tracksResponse.json();
    const topArtists = await artistsResponse.json();

    // Get audio features for top tracks
    const trackIds = topTracks.items.map((track: any) => track.id).join(',');
    const audioFeaturesResponse = await fetch(`${baseUrl}/audio-features?ids=${trackIds}`, { headers });
    
    if (!audioFeaturesResponse.ok) {
      throw new Error('Failed to fetch audio features from Spotify');
    }
    
    const audioFeatures = await audioFeaturesResponse.json();

    // Calculate scores based on audio features
    const features = audioFeatures.audio_features.filter((f: any) => f !== null);
    
    if (features.length === 0) {
      throw new Error('No audio features available');
    }
    
    const avgEnergy = features.reduce((sum: number, f: any) => sum + f.energy, 0) / features.length;
    const avgValence = features.reduce((sum: number, f: any) => sum + f.valence, 0) / features.length;
    const avgDanceability = features.reduce((sum: number, f: any) => sum + f.danceability, 0) / features.length;
    const avgAcousticness = features.reduce((sum: number, f: any) => sum + f.acousticness, 0) / features.length;
    const avgInstrumentalness = features.reduce((sum: number, f: any) => sum + f.instrumentalness, 0) / features.length;
    const avgLiveness = features.reduce((sum: number, f: any) => sum + f.liveness, 0) / features.length;
    const avgSpeechiness = features.reduce((sum: number, f: any) => sum + f.speechiness, 0) / features.length;

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
