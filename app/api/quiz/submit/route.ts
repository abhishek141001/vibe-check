import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import QuizResult from '@/lib/models/QuizResult';
import QuizModel from '@/lib/models/Quiz';
import { getQuizWithCustomization, calculateQuizResult, enrichQuiz } from '@/lib/quiz-data';
import { generateQuizDescription } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { quizId, answers, sessionId, userId, language = 'en', userInfo } = await request.json();

    if (!quizId || !answers || !sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get quiz data with customization (DB first, fallback to in-memory)
    let quiz = null as any;
    const doc = await QuizModel.findOne({ id: quizId }).lean();
    if (doc) {
      quiz = enrichQuiz(doc as any);
    } else {
      quiz = getQuizWithCustomization(quizId);
    }
    if (!quiz) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      );
    }

    // Calculate result
    console.log('🔍 API: About to call calculateQuizResult');
    console.log('🔍 API: Quiz ID:', quiz.id);
    console.log('🔍 API: Answers:', answers);
    const result = calculateQuizResult(quiz, answers);
    console.log('🔍 API: Result received:', result?.name, '(', result?.id, ')');
    
    if (!result) {
      console.log('❌ API: No result calculated');
      return NextResponse.json(
        { error: 'Unable to calculate result' },
        { status: 500 }
      );
    }
    
    console.log('✅ API: Result calculated successfully:', result.name);

    // Use predefined personalized message or generate AI description
    let aiDescription = '';
    try {
      // Check if we have a predefined personalized message
      if (result.personalizedMessage) {
        // Choose the appropriate language version of the message
        let personalizedMessage = result.personalizedMessage; // Default to English
        
        // Use Hindi version if language is Hindi and Hindi message exists
        if (language === 'hi' && result.personalizedMessageHindi) {
          personalizedMessage = result.personalizedMessageHindi;
        }
        
        // Replace placeholders if needed
        if (userInfo && userInfo.name?.trim()) {
          personalizedMessage = personalizedMessage.replace(/\{name\}/g, userInfo.name.trim());
        }
        
        if (userInfo && userInfo.age && userInfo.age > 0) {
          personalizedMessage = personalizedMessage.replace(/\{age\}/g, userInfo.age.toString());
        }
        
        aiDescription = personalizedMessage;
        console.log('✅ Using predefined personalized message in', language, ':', aiDescription);
      } else {
        // Fallback to AI generation if no predefined message
        const shouldPersonalize = quiz.customization?.enablePersonalization && userInfo && userInfo.name?.trim();
        
        let prompt = result.description;
        if (shouldPersonalize) {
          // Create personalized prompt based on available user info
          const personalizationFields = quiz.customization?.personalizationFields || ['name'];
          let personalizationText = '';
          
          if (personalizationFields.includes('name') && userInfo.name?.trim()) {
            personalizationText += ` for ${userInfo.name.trim()}`;
          }
          
          if (personalizationFields.includes('age') && userInfo.age && userInfo.age > 0) {
            const ageGroup = userInfo.age < 18 ? 'young' : userInfo.age < 30 ? 'young adult' : userInfo.age < 50 ? 'adult' : 'mature';
            personalizationText += ` (${ageGroup} at ${userInfo.age} years old)`;
          }
          
          prompt = `Generate a personalized description${personalizationText} who got the result "${result.name}". ${result.description}`;
        }
        
        aiDescription = await generateQuizDescription(quizId, result.name, prompt, answers, language);
      }
    } catch (error) {
      console.error('Error generating AI description:', error);
      // Continue without AI description
    }

    // Save result to database
    const quizResult = new QuizResult({
      userId: userId || null,
      sessionId,
      quizId,
      answers,
      resultId: result.id,
      resultName: result.name,
      resultEmoji: result.emoji,
      resultDescription: result.description,
      resultColor: result.color,
      aiGeneratedDescription: aiDescription || null,
      userInfo: userInfo || null
    });

    await quizResult.save();

    return NextResponse.json({
      success: true,
      result: {
        ...result,
        aiDescription: aiDescription || result.description
      }
    });

  } catch (error) {
    console.error('Error submitting quiz:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const quizId = searchParams.get('quizId');

    if (!sessionId || !quizId) {
      return NextResponse.json(
        { error: 'Missing sessionId or quizId' },
        { status: 400 }
      );
    }

    // Get latest result for this session and quiz
    const result = await QuizResult.findOne({
      sessionId,
      quizId
    }).sort({ createdAt: -1 });

    if (!result) {
      return NextResponse.json(
        { error: 'No result found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      result: {
        id: result.resultId,
        name: result.resultName,
        emoji: result.resultEmoji,
        description: result.resultDescription,
        color: result.resultColor,
        aiDescription: result.aiGeneratedDescription
      }
    });

  } catch (error) {
    console.error('Error fetching quiz result:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
