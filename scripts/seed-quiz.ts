/*
  Usage: ts-node scripts/seed-quiz.ts
  Ensures a sample quiz exists in MongoDB (upsert by id).
*/
import 'dotenv/config';
import connectDB from '@/lib/mongodb';
import QuizModel from '@/lib/models/Quiz';
import { quizzesWithMetadata } from '@/lib/quiz-data';

async function main() {
  await connectDB();

  for (const quiz of quizzesWithMetadata) {
    await QuizModel.updateOne({ id: quiz.id }, { $set: quiz }, { upsert: true });
    // eslint-disable-next-line no-console
    console.log('Seeded quiz:', quiz.id);
  }
  process.exit(0);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});


