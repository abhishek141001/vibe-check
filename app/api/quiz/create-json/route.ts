import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import QuizModel, { IQuiz } from '@/lib/models/Quiz';
import { Quiz } from '@/lib/quiz-data';

export async function POST(request: NextRequest) {
  try {
    const quizData = await request.json();

    // Validate required fields
    const requiredFields = ['id', 'title', 'description', 'emoji', 'questions', 'results'];
    const missingFields = requiredFields.filter(field => !quizData[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate questions structure
    if (!Array.isArray(quizData.questions) || quizData.questions.length === 0) {
      return NextResponse.json(
        { error: 'Questions must be a non-empty array' },
        { status: 400 }
      );
    }

    // Validate results structure
    if (!Array.isArray(quizData.results) || quizData.results.length === 0) {
      return NextResponse.json(
        { error: 'Results must be a non-empty array' },
        { status: 400 }
      );
    }

    // Validate each question
    for (let i = 0; i < quizData.questions.length; i++) {
      const question = quizData.questions[i];
      if (!question.id || !question.question) {
        return NextResponse.json(
          { error: `Question ${i + 1}: Missing id or question text` },
          { status: 400 }
        );
      }
      
      if (!Array.isArray(question.options) || question.options.length < 2) {
        return NextResponse.json(
          { error: `Question ${i + 1}: Must have at least 2 options` },
          { status: 400 }
        );
      }

      for (let j = 0; j < question.options.length; j++) {
        const option = question.options[j];
        if (!option.id || !option.text || !option.value) {
          return NextResponse.json(
            { error: `Question ${i + 1}, Option ${j + 1}: Missing id, text, or value` },
            { status: 400 }
          );
        }
      }
    }

    // Validate each result
    for (let i = 0; i < quizData.results.length; i++) {
      const result = quizData.results[i];
      const requiredResultFields = ['id', 'name', 'emoji', 'description', 'color'];
      const missingResultFields = requiredResultFields.filter(field => !result[field]);
      
      if (missingResultFields.length > 0) {
        return NextResponse.json(
          { error: `Result ${i + 1}: Missing required fields: ${missingResultFields.join(', ')}` },
          { status: 400 }
        );
      }
    }

    // Connect DB
    await connectDB();

    // Check if quiz ID already exists in DB
    const existingInDb = await QuizModel.findOne({ id: quizData.id }).lean();
    if (existingInDb) {
      return NextResponse.json(
        { error: `Quiz with ID '${quizData.id}' already exists` },
        { status: 409 }
      );
    }

    // Create the quiz object with proper typing
    const newQuiz: Quiz = {
      id: quizData.id,
      title: quizData.title,
      titleHindi: quizData.titleHindi,
      description: quizData.description,
      descriptionHindi: quizData.descriptionHindi,
      emoji: quizData.emoji,
      category: quizData.category || 'general',
      tags: quizData.tags || [],
      isViral: quizData.isViral || false,
      isFeatured: quizData.isFeatured || false,
      createdAt: new Date(),
      updatedAt: new Date(),
      questions: quizData.questions.map((q: any) => ({
        id: q.id,
        question: q.question,
        questionHindi: q.questionHindi,
        options: q.options.map((opt: any) => ({
          id: opt.id,
          text: opt.text,
          textHindi: opt.textHindi,
          value: opt.value
        }))
      })),
      results: quizData.results.map((r: any) => ({
        id: r.id,
        name: r.name,
        nameHindi: r.nameHindi,
        emoji: r.emoji,
        description: r.description,
        descriptionHindi: r.descriptionHindi,
        color: r.color,
        personalizedMessage: r.personalizedMessage,
        personalizedMessageHindi: r.personalizedMessageHindi
      })),
      defaultLanguage: quizData.defaultLanguage || 'en',
      defaultTheme: quizData.defaultTheme,
      defaultCustomization: quizData.defaultCustomization,
      customization: quizData.customization,
      scoringConfig: quizData.scoringConfig ? {
        rules: quizData.scoringConfig.rules || [],
        defaultResult: quizData.scoringConfig.defaultResult
      } : undefined,
      metadata: {
        views: 0,
        completions: 0,
        shares: 0,
        avgRating: 0,
        trendingScore: 0
      }
    };

    // Save the quiz in MongoDB
    const savedQuizDoc = await QuizModel.create(newQuiz as unknown as IQuiz);

    return NextResponse.json({
      success: true,
      message: 'Quiz created successfully',
      quiz: savedQuizDoc
    });

  } catch (error) {
    console.error('Error creating quiz:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// no helper functions needed; DB is used directly above
