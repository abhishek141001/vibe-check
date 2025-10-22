export interface DynamicQuiz {
  id: string;
  title: string;
  titleHindi?: string;
  description: string;
  descriptionHindi?: string;
  emoji: string;
  category: string;
  tags: string[];
  isViral: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  questions: DynamicQuestion[];
  results: DynamicResult[];
  resultMapping: Record<string, string>;
  metadata: {
    views: number;
    completions: number;
    shares: number;
    avgRating: number;
    trendingScore: number;
  };
}

export interface DynamicQuestion {
  id: string;
  question: string;
  questionHindi?: string;
  type: 'single' | 'multiple' | 'rating' | 'text';
  options: DynamicOption[];
  required: boolean;
  order: number;
}

export interface DynamicOption {
  id: string;
  text: string;
  textHindi?: string;
  value: string;
  weight?: number;
  emoji?: string;
}

export interface DynamicResult {
  id: string;
  name: string;
  nameHindi?: string;
  emoji: string;
  description: string;
  descriptionHindi?: string;
  color: string;
  shareableText: string;
  shareableTextHindi?: string;
  hashtags: string[];
  viralPotential: number;
}

export interface QuizCategory {
  id: string;
  name: string;
  nameHindi?: string;
  emoji: string;
  description: string;
  descriptionHindi?: string;
  color: string;
  isActive: boolean;
}

export interface ViralTrend {
  id: string;
  title: string;
  titleHindi?: string;
  description: string;
  descriptionHindi?: string;
  hashtags: string[];
  emoji: string;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  quizIds: string[];
}

// Predefined categories for viral content
export const quizCategories: QuizCategory[] = [
  {
    id: 'personality',
    name: 'Personality Tests',
    nameHindi: 'व्यक्तित्व परीक्षण',
    emoji: '🧠',
    description: 'Discover your true personality',
    descriptionHindi: 'अपना सच्चा व्यक्तित्व खोजें',
    color: 'bg-purple-500',
    isActive: true
  },
  {
    id: 'culture',
    name: 'Cultural Heritage',
    nameHindi: 'सांस्कृतिक विरासत',
    emoji: '🏛️',
    description: 'Connect with your cultural roots',
    descriptionHindi: 'अपनी सांस्कृतिक जड़ों से जुड़ें',
    color: 'bg-orange-500',
    isActive: true
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    nameHindi: 'मनोरंजन',
    emoji: '🎬',
    description: 'Fun and engaging quizzes',
    descriptionHindi: 'मजेदार और आकर्षक क्विज़',
    color: 'bg-pink-500',
    isActive: true
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    nameHindi: 'जीवनशैली',
    emoji: '🌟',
    description: 'Your lifestyle preferences',
    descriptionHindi: 'आपकी जीवनशैली की पसंद',
    color: 'bg-green-500',
    isActive: true
  },
  {
    id: 'trending',
    name: 'Trending Now',
    nameHindi: 'अभी ट्रेंडिंग',
    emoji: '🔥',
    description: 'What\'s viral right now',
    descriptionHindi: 'अभी क्या वायरल है',
    color: 'bg-red-500',
    isActive: true
  }
];

// Viral trends and hashtags
export const viralTrends: ViralTrend[] = [
  {
    id: 'chhath-festival',
    title: 'Chhath Festival Special',
    titleHindi: 'छठ पर्व विशेष',
    description: 'Celebrate Bihar\'s sacred festival',
    descriptionHindi: 'बिहार के पवित्र त्योहार का जश्न मनाएं',
    hashtags: ['#ChhathPuja', '#BiharHeritage', '#छठपूजा', '#बिहारविरासत'],
    emoji: '🌅',
    startDate: new Date('2024-10-01'),
    endDate: new Date('2024-11-15'),
    isActive: true,
    quizIds: ['bihar-heritage']
  },
  {
    id: 'diwali-special',
    title: 'Diwali Celebrations',
    titleHindi: 'दीवाली उत्सव',
    description: 'Festival of lights special',
    descriptionHindi: 'रोशनी के त्योहार का विशेष',
    hashtags: ['#Diwali', '#FestivalOfLights', '#दीवाली', '#रोशनीकात्योहार'],
    emoji: '🪔',
    startDate: new Date('2024-10-20'),
    endDate: new Date('2024-11-05'),
    isActive: true,
    quizIds: []
  },
  {
    id: 'new-year',
    title: 'New Year Vibes',
    titleHindi: 'नए साल के वाइब्स',
    description: 'What\'s your new year energy?',
    descriptionHindi: 'आपकी नए साल की ऊर्जा क्या है?',
    hashtags: ['#NewYear', '#2025Vibes', '#नववर्ष', '#नएसाल'],
    emoji: '🎊',
    startDate: new Date('2024-12-15'),
    endDate: new Date('2025-01-31'),
    isActive: false,
    quizIds: []
  }
];

// Dynamic quiz templates for quick creation
export const quizTemplates = {
  personality: {
    title: 'What\'s Your Personality Type?',
    titleHindi: 'आपका व्यक्तित्व प्रकार क्या है?',
    description: 'Discover your unique personality',
    descriptionHindi: 'अपना अनूठा व्यक्तित्व खोजें',
    emoji: '🧠',
    questions: [
      {
        question: 'How do you recharge your energy?',
        questionHindi: 'आप अपनी ऊर्जा कैसे रिचार्ज करते हैं?',
        options: [
          { text: 'Alone time', textHindi: 'अकेले समय', value: 'introvert' },
          { text: 'With friends', textHindi: 'दोस्तों के साथ', value: 'extrovert' }
        ]
      }
    ]
  },
  culture: {
    title: 'Your Cultural Connection',
    titleHindi: 'आपका सांस्कृतिक जुड़ाव',
    description: 'Explore your cultural heritage',
    descriptionHindi: 'अपनी सांस्कृतिक विरासत का अन्वेषण करें',
    emoji: '🏛️',
    questions: [
      {
        question: 'What cultural tradition means most to you?',
        questionHindi: 'कौन सी सांस्कृतिक परंपरा आपके लिए सबसे महत्वपूर्ण है?',
        options: [
          { text: 'Festivals', textHindi: 'त्योहार', value: 'festivals' },
          { text: 'Food', textHindi: 'भोजन', value: 'food' }
        ]
      }
    ]
  },
  entertainment: {
    title: 'Your Entertainment Style',
    titleHindi: 'आपकी मनोरंजन शैली',
    description: 'What entertains you most?',
    descriptionHindi: 'आपको सबसे ज्यादा क्या मनोरंजन करता है?',
    emoji: '🎬',
    questions: [
      {
        question: 'Your ideal weekend activity?',
        questionHindi: 'आपकी आदर्श सप्ताहांत गतिविधि?',
        options: [
          { text: 'Movie night', textHindi: 'फिल्म रात', value: 'movies' },
          { text: 'Outdoor adventure', textHindi: 'बाहरी रोमांच', value: 'adventure' }
        ]
      }
    ]
  }
};

// Utility functions for dynamic quiz management
export function createDynamicQuiz(template: any, customizations: any): DynamicQuiz {
  return {
    id: `quiz-${Date.now()}`,
    title: customizations.title || template.title,
    titleHindi: customizations.titleHindi || template.titleHindi,
    description: customizations.description || template.description,
    descriptionHindi: customizations.descriptionHindi || template.descriptionHindi,
    emoji: customizations.emoji || template.emoji,
    category: customizations.category || 'personality',
    tags: customizations.tags || [],
    isViral: customizations.isViral || false,
    isFeatured: customizations.isFeatured || false,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: template.questions.map((q: any, index: number) => ({
      ...q,
      id: `q${index + 1}`,
      type: 'single' as const,
      required: true,
      order: index + 1
    })),
    results: [],
    resultMapping: {},
    metadata: {
      views: 0,
      completions: 0,
      shares: 0,
      avgRating: 0,
      trendingScore: 0
    }
  };
}

export function getTrendingQuizzes(quizzes: DynamicQuiz[]): DynamicQuiz[] {
  return quizzes
    .filter(quiz => quiz.metadata.trendingScore > 0)
    .sort((a, b) => b.metadata.trendingScore - a.metadata.trendingScore);
}

export function getViralQuizzes(quizzes: DynamicQuiz[]): DynamicQuiz[] {
  return quizzes
    .filter(quiz => quiz.isViral)
    .sort((a, b) => b.metadata.shares - a.metadata.shares);
}

export function getQuizzesByCategory(quizzes: DynamicQuiz[], categoryId: string): DynamicQuiz[] {
  return quizzes.filter(quiz => quiz.category === categoryId);
}

export function updateQuizMetrics(quizId: string, action: 'view' | 'complete' | 'share' | 'rate'): void {
  // This would typically update the database
  console.log(`Updating metrics for quiz ${quizId}: ${action}`);
}
