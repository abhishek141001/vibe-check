'use client';

// Client-side Spotify API functions using fetch
export class SpotifyClient {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async makeRequest(endpoint: string) {
    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    return response.json();
  }

  async getCurrentUser() {
    return await this.makeRequest('/me');
  }

  async getTopTracks(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term', limit: number = 50) {
    return await this.makeRequest(`/me/top/tracks?limit=${limit}&time_range=${timeRange}`);
  }

  async getTopArtists(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term', limit: number = 50) {
    return await this.makeRequest(`/me/top/artists?limit=${limit}&time_range=${timeRange}`);
  }

  async getAudioFeatures(trackIds: string[]) {
    return await this.makeRequest(`/audio-features?ids=${trackIds.join(',')}`);
  }
}

export const createSpotifyClient = (accessToken: string) => {
  return new SpotifyClient(accessToken);
};
