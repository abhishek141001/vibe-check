import { User, Invite, Comparison, MusicTasteScore } from './types';

// In-memory database (replace with real database in production)
class Database {
  private users: Map<string, User> = new Map();
  private invites: Map<string, Invite> = new Map();
  private comparisons: Map<string, Comparison> = new Map();

  // User operations
  async createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const id = Math.random().toString(36).substr(2, 9);
    const newUser: User = {
      ...user,
      id,
      createdAt: new Date(),
    };
    this.users.set(id, newUser);
    return newUser;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async getUserBySpotifyId(spotifyId: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.spotifyId === spotifyId) {
        return user;
      }
    }
    return null;
  }

  async updateUserScore(userId: string, score: MusicTasteScore): Promise<User | null> {
    const user = this.users.get(userId);
    if (user) {
      user.musicTasteScore = score;
      this.users.set(userId, user);
      return user;
    }
    return null;
  }

  // Invite operations
  async createInvite(inviterId: string, inviterName: string, inviterScore?: MusicTasteScore): Promise<Invite> {
    const inviteCode = Math.random().toString(36).substr(2, 9);
    const invite: Invite = {
      id: Math.random().toString(36).substr(2, 9),
      inviteCode,
      inviterId,
      inviterName,
      inviterScore,
      status: 'pending',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    };
    this.invites.set(invite.id, invite);
    return invite;
  }

  async getInviteByCode(inviteCode: string): Promise<Invite | null> {
    for (const invite of this.invites.values()) {
      if (invite.inviteCode === inviteCode) {
        return invite;
      }
    }
    return null;
  }

  async acceptInvite(inviteId: string, inviteeId: string): Promise<Invite | null> {
    const invite = this.invites.get(inviteId);
    if (invite && invite.status === 'pending') {
      invite.inviteeId = inviteeId;
      invite.status = 'accepted';
      this.invites.set(inviteId, invite);
      return invite;
    }
    return null;
  }

  // Comparison operations
  async createComparison(
    user1Id: string,
    user2Id: string,
    user1Score: MusicTasteScore,
    user2Score: MusicTasteScore
  ): Promise<Comparison> {
    const comparison: Comparison = {
      id: Math.random().toString(36).substr(2, 9),
      user1Id,
      user2Id,
      user1Score,
      user2Score,
      winner: user1Score.overall > user2Score.overall ? 'user1' : 
              user2Score.overall > user1Score.overall ? 'user2' : 'tie',
      createdAt: new Date(),
    };
    this.comparisons.set(comparison.id, comparison);
    return comparison;
  }

  async getComparison(id: string): Promise<Comparison | null> {
    return this.comparisons.get(id) || null;
  }

  async getUserComparisons(userId: string): Promise<Comparison[]> {
    const userComparisons: Comparison[] = [];
    for (const comparison of this.comparisons.values()) {
      if (comparison.user1Id === userId || comparison.user2Id === userId) {
        userComparisons.push(comparison);
      }
    }
    return userComparisons;
  }
}

export const db = new Database();
