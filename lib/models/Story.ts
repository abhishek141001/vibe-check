import mongoose, { Schema, Document } from 'mongoose';

export interface IStoryChoice {
  id: string;
  text: string;
  textHindi?: string;
  nextId?: string; // If undefined, this choice ends the story
}

export interface IStoryNode {
  id: string;
  text: string;
  textHindi?: string;
  image?: string;
  choices: [IStoryChoice, IStoryChoice]; // always two choices for this game
  ending?: boolean; // if true, node is terminal
  endingTitle?: string;
  endingTitleHindi?: string;
  endingEmoji?: string;
}

export interface IStory extends Document {
  id: string;
  title: string;
  titleHindi?: string;
  description: string;
  descriptionHindi?: string;
  emoji: string;
  category?: string;
  tags?: string[];
  isViral?: boolean;
  isFeatured?: boolean;
  nodes: IStoryNode[];
  startNodeId: string;
  maxSlides?: number; // safety guard, default 7
  defaultLanguage?: 'en' | 'hi';
  customization?: Record<string, any>;
  metadata?: {
    views: number;
    completions: number;
    shares: number;
    avgRating: number;
    trendingScore: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const StoryChoiceSchema = new Schema<IStoryChoice>({
  id: { type: String, required: true },
  text: { type: String, required: true },
  textHindi: { type: String },
  nextId: { type: String }
}, { _id: false });

const StoryNodeSchema = new Schema<IStoryNode>({
  id: { type: String, required: true },
  text: { type: String, required: true },
  textHindi: { type: String },
  image: { type: String },
  choices: { type: [StoryChoiceSchema], required: true, validate: [(arr: any[]) => Array.isArray(arr) && arr.length === 2, 'Exactly two choices are required'] },
  ending: { type: Boolean, default: false },
  endingTitle: { type: String },
  endingTitleHindi: { type: String },
  endingEmoji: { type: String }
}, { _id: false });

const StorySchema = new Schema<IStory>({
  id: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  titleHindi: { type: String },
  description: { type: String, required: true },
  descriptionHindi: { type: String },
  emoji: { type: String, required: true },
  category: { type: String },
  tags: { type: [String], default: [] },
  isViral: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  nodes: { type: [StoryNodeSchema], required: true },
  startNodeId: { type: String, required: true },
  maxSlides: { type: Number, default: 7 },
  defaultLanguage: { type: String, enum: ['en', 'hi'], default: 'en' },
  customization: { type: Schema.Types.Mixed },
  metadata: {
    views: { type: Number, default: 0 },
    completions: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
    trendingScore: { type: Number, default: 0 }
  }
}, { timestamps: true });

export default mongoose.models.Story || mongoose.model<IStory>('Story', StorySchema);


