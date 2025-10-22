'use client';

import SpotifyWebApi from 'spotify-web-api-js';

// Client-side Spotify API wrapper
export class SpotifyClient {
  private spotifyApi: SpotifyWebApi;

  constructor(accessToken: string) {
    this.spotifyApi = new SpotifyWebApi();
    this.spotifyApi.setAccessToken(accessToken);
  }

  async getCurrentUser() {
    return await this.spotifyApi.getMe();
  }

  async getTopTracks(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term', limit: number = 50) {
    return await this.spotifyApi.getMyTopTracks({ limit, time_range: timeRange });
  }

  async getTopArtists(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term', limit: number = 50) {
    return await this.spotifyApi.getMyTopArtists({ limit, time_range: timeRange });
  }

  async getAudioFeatures(trackIds: string[]) {
    return await this.spotifyApi.getAudioFeaturesForTracks(trackIds);
  }
}

export const createSpotifyClient = (accessToken: string) => {
  return new SpotifyClient(accessToken);
};
