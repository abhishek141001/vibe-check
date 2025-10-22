import { User, Invite, Comparison, MusicTasteScore } from './types';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Simple file-based database (replace with real database in production)
class Database {
  private dataDir = path.join(process.cwd(), 'data');
  private usersFile = path.join(this.dataDir, 'users.json');
  private invitesFile = path.join(this.dataDir, 'invites.json');
  private comparisonsFile = path.join(this.dataDir, 'comparisons.json');

  private async ensureDataDir() {
    if (!existsSync(this.dataDir)) {
      await mkdir(this.dataDir, { recursive: true });
    }
  }

  private async loadData<T>(filePath: string, defaultValue: T[]): Promise<T[]> {
    try {
      if (!existsSync(filePath)) {
        return defaultValue;
      }
      const data = await readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error loading data from ${filePath}:`, error);
      return defaultValue;
    }
  }

  private async saveData<T>(filePath: string, data: T[]): Promise<void> {
    try {
      await this.ensureDataDir();
      await writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error saving data to ${filePath}:`, error);
    }
  }

  // User operations
  async createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const users = await this.loadData<User>(this.usersFile, []);
    const id = Math.random().toString(36).substr(2, 9);
    const newUser: User = {
      ...user,
      id,
      createdAt: new Date(),
    };
    users.push(newUser);
    await this.saveData(this.usersFile, users);
    return newUser;
  }

  async getUserById(id: string): Promise<User | null> {
    const users = await this.loadData<User>(this.usersFile, []);
    return users.find(user => user.id === id) || null;
  }

  async getUserBySpotifyId(spotifyId: string): Promise<User | null> {
    const users = await this.loadData<User>(this.usersFile, []);
    return users.find(user => user.spotifyId === spotifyId) || null;
  }

  async updateUserScore(userId: string, score: MusicTasteScore): Promise<User | null> {
    const users = await this.loadData<User>(this.usersFile, []);
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      users[userIndex].musicTasteScore = score;
      await this.saveData(this.usersFile, users);
      return users[userIndex];
    }
    return null;
  }

  // Invite operations
  async createInvite(inviterId: string, inviterName: string, inviterScore?: MusicTasteScore): Promise<Invite> {
    const invites = await this.loadData<Invite>(this.invitesFile, []);
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
    invites.push(invite);
    await this.saveData(this.invitesFile, invites);
    return invite;
  }

  async getInviteByCode(inviteCode: string): Promise<Invite | null> {
    const invites = await this.loadData<Invite>(this.invitesFile, []);
    return invites.find(invite => invite.inviteCode === inviteCode) || null;
  }

  async acceptInvite(inviteId: string, inviteeId: string): Promise<Invite | null> {
    const invites = await this.loadData<Invite>(this.invitesFile, []);
    const inviteIndex = invites.findIndex(invite => invite.id === inviteId);
    if (inviteIndex !== -1 && invites[inviteIndex].status === 'pending') {
      invites[inviteIndex].inviteeId = inviteeId;
      invites[inviteIndex].status = 'accepted';
      await this.saveData(this.invitesFile, invites);
      return invites[inviteIndex];
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
    const comparisons = await this.loadData<Comparison>(this.comparisonsFile, []);
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
    comparisons.push(comparison);
    await this.saveData(this.comparisonsFile, comparisons);
    return comparison;
  }

  async getComparison(id: string): Promise<Comparison | null> {
    const comparisons = await this.loadData<Comparison>(this.comparisonsFile, []);
    return comparisons.find(comparison => comparison.id === id) || null;
  }

  async getUserComparisons(userId: string): Promise<Comparison[]> {
    const comparisons = await this.loadData<Comparison>(this.comparisonsFile, []);
    return comparisons.filter(comparison => 
      comparison.user1Id === userId || comparison.user2Id === userId
    );
  }
}

export const db = new Database();
