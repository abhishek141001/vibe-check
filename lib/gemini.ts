import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateQuizDescription(
  quizId: string,
  resultName: string,
  resultDescription: string,
  answers: Record<string, string>,
  language: 'en' | 'hi' = 'en'
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const isHindi = language === 'hi';
    const prompt = `Generate a personalized, engaging 1-2 sentence description for a quiz result. 

Quiz: ${quizId}
Result: ${resultName}
Base Description: ${resultDescription}
User Answers: ${JSON.stringify(answers)}
Language: ${isHindi ? 'Hindi' : 'English'}

${isHindi ? `
Make it in Hindi:
- व्यक्तिगत और आकर्षक
- साझा करने योग्य
- 1-2 वाक्य अधिकतम
- मजेदार और वायरल-योग्य
- प्रासंगिक इमोजी शामिल करें

उदाहरण शैली: "आप एक सच्चे छठ भक्त हैं! 🌅✨ आपकी आस्था और परंपराओं के प्रति समर्पण प्रेरणादायक है!"
` : `
Make it:
- Personalized based on their answers
- Engaging and shareable
- 1-2 sentences max
- Fun and viral-worthy
- Include relevant emojis

Example style: "You're a Python master who codes with the elegance of a zen garden! 🐍✨ Your debugging skills are legendary, and you make complex algorithms look like poetry in motion!"
`}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating AI description:', error);
    // Fallback to original description
    return resultDescription;
  }
}

export async function generateShareableText(
  quizId: string,
  resultName: string,
  resultEmoji: string,
  description: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Generate a shareable social media post for a quiz result.

Quiz: ${quizId}
Result: ${resultName} ${resultEmoji}
Description: ${description}

Make it:
- Instagram/Twitter story ready
- Include relevant hashtags
- Engaging and shareable
- 2-3 lines max
- Include the result emoji

Example: "Just discovered I'm a Python master! 🐍✨ Who else wants to find their coding personality? #QuizTime #Python #Coding"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating shareable text:', error);
    // Fallback
    return `Just discovered I'm ${resultName}! ${resultEmoji} Take the quiz to find yours! #QuizTime`;
  }
}
