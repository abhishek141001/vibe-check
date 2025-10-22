import mongoose, { Document, Schema } from 'mongoose';

export interface IQuizResult extends Document {
  userId?: string;
  sessionId: string;
  quizId: string;
  answers: Record<string, string>;
  resultId: string;
  resultName: string;
  resultEmoji: string;
  resultDescription: string;
  resultColor: string;
  aiGeneratedDescription?: string;
  userInfo?: {
    name: string;
    age: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const QuizResultSchema = new Schema<IQuizResult>({
  userId: {
    type: String,
    required: false,
    index: true
  },
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  quizId: {
    type: String,
    required: true,
    index: true
  },
  answers: {
    type: Map,
    of: String,
    required: true
  },
  resultId: {
    type: String,
    required: true
  },
  resultName: {
    type: String,
    required: true
  },
  resultEmoji: {
    type: String,
    required: true
  },
  resultDescription: {
    type: String,
    required: true
  },
  resultColor: {
    type: String,
    required: true
  },
  aiGeneratedDescription: {
    type: String,
    required: false
  },
  userInfo: {
    name: {
      type: String,
      required: false
    },
    age: {
      type: Number,
      required: false
    }
  }
}, {
  timestamps: true
});

// Create indexes for better performance
QuizResultSchema.index({ sessionId: 1, quizId: 1 });
QuizResultSchema.index({ userId: 1, quizId: 1 });
QuizResultSchema.index({ createdAt: -1 });

export default mongoose.models.QuizResult || mongoose.model<IQuizResult>('QuizResult', QuizResultSchema);
