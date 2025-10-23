import mongoose, { Schema, Document } from 'mongoose';

export interface IQuizQuestionOption {
  id: string;
  text: string;
  textHindi?: string;
  value: string;
}

export interface IQuizQuestion {
  id: string;
  question: string;
  questionHindi?: string;
  options: IQuizQuestionOption[];
}

export interface IQuizResultDef {
  id: string;
  name: string;
  nameHindi?: string;
  emoji: string;
  description: string;
  descriptionHindi?: string;
  color: string;
  personalizedMessage?: string;
  personalizedMessageHindi?: string;
}

export interface IScoringRule {
  questionId: string;
  answerValue: string;
  results: Record<string, number>;
}

export interface IScoringConfig {
  rules: IScoringRule[];
  defaultResult?: string;
}

export interface IQuiz extends Document {
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
  questions: IQuizQuestion[];
  results: IQuizResultDef[];
  defaultLanguage?: 'en' | 'hi';
  defaultTheme?: string;
  defaultCustomization?: Record<string, any>;
  customization?: Record<string, any>;
  scoringConfig?: IScoringConfig;
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

const QuizQuestionOptionSchema = new Schema<IQuizQuestionOption>({
  id: { type: String, required: true },
  text: { type: String, required: true },
  textHindi: { type: String },
  value: { type: String, required: true }
}, { _id: false });

const QuizQuestionSchema = new Schema<IQuizQuestion>({
  id: { type: String, required: true },
  question: { type: String, required: true },
  questionHindi: { type: String },
  options: { type: [QuizQuestionOptionSchema], required: true }
}, { _id: false });

const QuizResultDefSchema = new Schema<IQuizResultDef>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  nameHindi: { type: String },
  emoji: { type: String, required: true },
  description: { type: String, required: true },
  descriptionHindi: { type: String },
  color: { type: String, required: true },
  personalizedMessage: { type: String },
  personalizedMessageHindi: { type: String }
}, { _id: false });

const ScoringRuleSchema = new Schema<IScoringRule>({
  questionId: { type: String, required: true },
  answerValue: { type: String, required: true },
  results: { type: Map, of: Number, required: true }
}, { _id: false });

const ScoringConfigSchema = new Schema<IScoringConfig>({
  rules: { type: [ScoringRuleSchema], required: true },
  defaultResult: { type: String }
}, { _id: false });

const QuizSchema = new Schema<IQuiz>({
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
  questions: { type: [QuizQuestionSchema], required: true },
  results: { type: [QuizResultDefSchema], required: true },
  defaultLanguage: { type: String, enum: ['en', 'hi'], default: 'en' },
  defaultTheme: { type: String },
  defaultCustomization: { type: Schema.Types.Mixed },
  customization: { type: Schema.Types.Mixed },
  scoringConfig: { type: ScoringConfigSchema, required: false },
  metadata: {
    views: { type: Number, default: 0 },
    completions: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
    trendingScore: { type: Number, default: 0 }
  }
}, { timestamps: true });

export default mongoose.models.Quiz || mongoose.model<IQuiz>('Quiz', QuizSchema);


