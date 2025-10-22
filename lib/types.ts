export interface User {
  id: string;
  spotifyId: string;
  displayName: string;
  email: string;
  image?: string;
  musicTasteScore?: MusicTasteScore;
  createdAt: Date;
}

export interface Invite {
  id: string;
  inviteCode: string;
  inviterId: string;
  inviterName: string;
  inviterScore?: MusicTasteScore;
  inviteeId?: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
  expiresAt: Date;
}

export interface Comparison {
  id: string;
  user1Id: string;
  user2Id: string;
  user1Score: MusicTasteScore;
  user2Score: MusicTasteScore;
  winner?: 'user1' | 'user2' | 'tie';
  createdAt: Date;
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
