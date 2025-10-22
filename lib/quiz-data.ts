export interface QuizQuestion {
  id: string;
  question: string;
  questionHindi?: string;
  options: {
    id: string;
    text: string;
    textHindi?: string;
    value: string;
  }[];
}

export interface QuizResult {
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

export interface Theme {
  id: string;
  name: string;
  nameHindi?: string;
  description: string;
  descriptionHindi?: string;
  emoji: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  layout: {
    borderRadius: string;
    spacing: string;
    shadows: string;
  };
  animations: {
    duration: string;
    easing: string;
    framerEasing: string;
  };
  isDefault?: boolean;
  isPremium?: boolean;
}

export interface QuizCustomization {
  themeId: string;
  defaultLanguage: 'en' | 'hi';
  showProgress: boolean;
  showTimer: boolean;
  allowRetake: boolean;
  showShareButtons: boolean;
  enablePersonalization: boolean;
  personalizationFields: ('name' | 'age')[];
  customColors?: Partial<Theme['colors']>;
  customFonts?: Partial<Theme['fonts']>;
  backgroundImage?: string;
  logo?: string;
  customCSS?: string;
}

export interface ScoringRule {
  questionId: string;
  answerValue: string;
  results: Record<string, number>; // resultId -> score
}

export interface ScoringConfig {
  rules: ScoringRule[];
  defaultResult?: string; // fallback result if no rules match
}

export interface Quiz {
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
  createdAt?: Date;
  updatedAt?: Date;
  questions: QuizQuestion[];
  results: QuizResult[];
  resultMapping?: Record<string, string>; // Maps answer combinations to result IDs (legacy)
  metadata?: {
    views: number;
    completions: number;
    shares: number;
    avgRating: number;
    trendingScore: number;
  };
  // Quiz-specific configuration
  defaultLanguage?: 'en' | 'hi';
  defaultTheme?: string;
  defaultCustomization?: Partial<QuizCustomization>;
  // Dynamic customization options
  customization?: QuizCustomization;
  theme?: Theme;
  // Modular scoring configuration
  scoringConfig?: ScoringConfig;
}

// Predefined themes
export const themes: Theme[] = [
  {
    id: 'default',
    name: 'Default',
    nameHindi: 'डिफ़ॉल्ट',
    description: 'Clean and modern default theme',
    descriptionHindi: 'साफ और आधुनिक डिफ़ॉल्ट थीम',
    emoji: '🎨',
    isDefault: true,
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6'
    },
    fonts: {
      heading: 'Inter, system-ui, sans-serif',
      body: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace'
    },
    layout: {
      borderRadius: '0.5rem',
      spacing: '1rem',
      shadows: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
    },
    animations: {
      duration: '300ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      framerEasing: 'easeInOut'
    }
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    nameHindi: 'डार्क मोड',
    description: 'Sleek dark theme for night owls',
    descriptionHindi: 'रात के उल्लुओं के लिए चिकना डार्क थीम',
    emoji: '🌙',
    colors: {
      primary: '#6366f1',
      secondary: '#a855f7',
      accent: '#fbbf24',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      textSecondary: '#94a3b8',
      border: '#334155',
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171',
      info: '#60a5fa'
    },
    fonts: {
      heading: 'Inter, system-ui, sans-serif',
      body: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace'
    },
    layout: {
      borderRadius: '0.75rem',
      spacing: '1.25rem',
      shadows: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
    },
    animations: {
      duration: '400ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      framerEasing: 'easeInOut'
    }
  },
  {
    id: 'vibrant',
    name: 'Vibrant',
    nameHindi: 'जीवंत',
    description: 'Bold and colorful theme',
    descriptionHindi: 'बोल्ड और रंगीन थीम',
    emoji: '🌈',
    colors: {
      primary: '#ec4899',
      secondary: '#8b5cf6',
      accent: '#f59e0b',
      background: '#fef3c7',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#fbbf24',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6'
    },
    fonts: {
      heading: 'Poppins, system-ui, sans-serif',
      body: 'Poppins, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace'
    },
    layout: {
      borderRadius: '1rem',
      spacing: '1.5rem',
      shadows: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
    },
    animations: {
      duration: '500ms',
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      framerEasing: 'easeOutBack'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    nameHindi: 'न्यूनतम',
    description: 'Clean and minimal design',
    descriptionHindi: 'साफ और न्यूनतम डिज़ाइन',
    emoji: '⚪',
    colors: {
      primary: '#000000',
      secondary: '#6b7280',
      accent: '#3b82f6',
      background: '#ffffff',
      surface: '#f9fafb',
      text: '#111827',
      textSecondary: '#6b7280',
      border: '#d1d5db',
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626',
      info: '#0284c7'
    },
    fonts: {
      heading: 'Helvetica, system-ui, sans-serif',
      body: 'Helvetica, system-ui, sans-serif',
      mono: 'Monaco, monospace'
    },
    layout: {
      borderRadius: '0.25rem',
      spacing: '0.75rem',
      shadows: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
    },
    animations: {
      duration: '200ms',
      easing: 'ease-in-out',
      framerEasing: 'easeInOut'
    }
  },
  {
    id: 'neon',
    name: 'Neon',
    nameHindi: 'नीयन',
    description: 'Cyberpunk neon theme',
    descriptionHindi: 'साइबरपंक नीयन थीम',
    emoji: '💫',
    isPremium: true,
    colors: {
      primary: '#00ff88',
      secondary: '#ff0080',
      accent: '#00ffff',
      background: '#0a0a0a',
      surface: '#1a1a1a',
      text: '#00ff88',
      textSecondary: '#80ff80',
      border: '#00ff88',
      success: '#00ff88',
      warning: '#ffff00',
      error: '#ff0080',
      info: '#00ffff'
    },
    fonts: {
      heading: 'Orbitron, monospace',
      body: 'Orbitron, monospace',
      mono: 'JetBrains Mono, monospace'
    },
    layout: {
      borderRadius: '0.5rem',
      spacing: '1rem',
      shadows: '0 0 20px rgb(0 255 136 / 0.3)'
    },
    animations: {
      duration: '300ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      framerEasing: 'easeInOut'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset',
    nameHindi: 'सूर्यास्त',
    description: 'Warm sunset colors',
    descriptionHindi: 'गर्म सूर्यास्त रंग',
    emoji: '🌅',
    colors: {
      primary: '#f97316',
      secondary: '#ec4899',
      accent: '#fbbf24',
      background: '#fef3c7',
      surface: '#ffffff',
      text: '#92400e',
      textSecondary: '#a16207',
      border: '#f59e0b',
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626',
      info: '#0284c7'
    },
    fonts: {
      heading: 'Playfair Display, serif',
      body: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace'
    },
    layout: {
      borderRadius: '1.5rem',
      spacing: '1.25rem',
      shadows: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)'
    },
    animations: {
      duration: '600ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      framerEasing: 'easeInOut'
    }
  }
];

export const quizzes: Quiz[] = [
  {
    id: 'bihar-heritage',
    title: 'Bihar Heritage & Chhath Festival Quiz',
    titleHindi: 'बिहार विरासत और छठ पर्व क्विज़',
    description: 'Discover your connection to Bihar\'s rich culture and traditions!',
    descriptionHindi: 'बिहार की समृद्ध संस्कृति और परंपराओं से अपना जुड़ाव खोजें!',
    emoji: '🏛️',
    category: 'culture',
    tags: ['bihar', 'chhath', 'festival', 'heritage', 'culture'],
    isViral: true,
    isFeatured: false,
    defaultLanguage: 'hi', // Default to Hindi for Bihar quiz
    defaultTheme: 'sunset', // Use sunset theme for cultural feel
    defaultCustomization: {
      enablePersonalization: true,
      personalizationFields: ['name'], // Only name for cultural quiz
      showProgress: true,
      showShareButtons: true,
      allowRetake: true
    },
    scoringConfig: {
      rules: [
        // Question 1: Which festival is closest to your heart?
        { questionId: 'q1', answerValue: 'chhath', results: { 'chhath-devotee': 5, 'spiritual-seeker': 3 } },
        { questionId: 'q1', answerValue: 'durga', results: { 'cultural-ambassador': 4, 'bihar-scholar': 3 } },
        { questionId: 'q1', answerValue: 'diwali', results: { 'cultural-ambassador': 4, 'spiritual-seeker': 2 } },
        { questionId: 'q1', answerValue: 'holi', results: { 'cultural-ambassador': 4, 'bihar-scholar': 2 } },
        
        // Question 2: Your favorite Bihar dish is:
        { questionId: 'q2', answerValue: 'litti', results: { 'bihar-scholar': 5, 'cultural-ambassador': 3 } },
        { questionId: 'q2', answerValue: 'sattu', results: { 'bihar-scholar': 4, 'chhath-devotee': 3 } },
        { questionId: 'q2', answerValue: 'dalpuri', results: { 'cultural-ambassador': 4, 'spiritual-seeker': 2 } },
        { questionId: 'q2', answerValue: 'thekua', results: { 'chhath-devotee': 5, 'spiritual-seeker': 3 } },
        
        // Question 3: What represents Bihar's glory to you?
        { questionId: 'q3', answerValue: 'nalanda', results: { 'bihar-scholar': 5, 'cultural-ambassador': 3 } },
        { questionId: 'q3', answerValue: 'buddha', results: { 'spiritual-seeker': 5, 'chhath-devotee': 3 } },
        { questionId: 'q3', answerValue: 'ganga', results: { 'chhath-devotee': 4, 'spiritual-seeker': 4 } },
        { questionId: 'q3', answerValue: 'bhojpuri', results: { 'cultural-ambassador': 5, 'bihar-scholar': 3 } },
        
        // Question 4: How do you prefer to celebrate?
        { questionId: 'q4', answerValue: 'ghat', results: { 'chhath-devotee': 5, 'spiritual-seeker': 4 } },
        { questionId: 'q4', answerValue: 'home', results: { 'spiritual-seeker': 4, 'bihar-scholar': 3 } },
        { questionId: 'q4', answerValue: 'community', results: { 'cultural-ambassador': 5, 'chhath-devotee': 3 } },
        { questionId: 'q4', answerValue: 'spiritual', results: { 'spiritual-seeker': 5, 'chhath-devotee': 4 } }
      ],
      defaultResult: 'cultural-ambassador'
    },
    createdAt: new Date('2024-10-01'),
    updatedAt: new Date(),
    metadata: {
      views: 1250,
      completions: 890,
      shares: 156,
      avgRating: 4.8,
      trendingScore: 95
    },
    questions: [
      {
        id: 'q1',
        question: 'What is your favorite Bihar festival?',
        questionHindi: 'आपका पसंदीदा बिहारी त्योहार कौन सा है?',
        options: [
          { id: 'a1', text: 'Chhath Puja', textHindi: 'छठ पूजा', value: 'chhath' },
          { id: 'a2', text: 'Durga Puja', textHindi: 'दुर्गा पूजा', value: 'durga' },
          { id: 'a3', text: 'Diwali', textHindi: 'दीवाली', value: 'diwali' },
          { id: 'a4', text: 'Holi', textHindi: 'होली', value: 'holi' }
        ]
      },
      {
        id: 'q2',
        question: 'Which Bihar dish do you love most?',
        questionHindi: 'आपको कौन सा बिहारी व्यंजन सबसे ज्यादा पसंद है?',
        options: [
          { id: 'b1', text: 'Litti Chokha', textHindi: 'लिट्टी चोखा', value: 'litti' },
          { id: 'b2', text: 'Sattu Paratha', textHindi: 'सत्तू पराठा', value: 'sattu' },
          { id: 'b3', text: 'Dal Puri', textHindi: 'दाल पूरी', value: 'dalpuri' },
          { id: 'b4', text: 'Thekua', textHindi: 'ठेकुआ', value: 'thekua' }
        ]
      },
      {
        id: 'q3',
        question: 'What represents Bihar\'s spirit to you?',
        questionHindi: 'बिहार की भावना का प्रतिनिधित्व क्या करता है?',
        options: [
          { id: 'c1', text: 'Nalanda University', textHindi: 'नालंदा विश्वविद्यालय', value: 'nalanda' },
          { id: 'c2', text: 'Buddha\'s Enlightenment', textHindi: 'बुद्ध का ज्ञानोदय', value: 'buddha' },
          { id: 'c3', text: 'Ganga Aarti', textHindi: 'गंगा आरती', value: 'ganga' },
          { id: 'c4', text: 'Bhojpuri Culture', textHindi: 'भोजपुरी संस्कृति', value: 'bhojpuri' }
        ]
      },
      {
        id: 'q4',
        question: 'How do you celebrate Chhath Puja?',
        questionHindi: 'आप छठ पूजा कैसे मनाते हैं?',
        options: [
          { id: 'd1', text: 'At the Ghat with family', textHindi: 'घाट पर परिवार के साथ', value: 'ghat' },
          { id: 'd2', text: 'Traditional rituals at home', textHindi: 'घर पर पारंपरिक अनुष्ठान', value: 'home' },
          { id: 'd3', text: 'Community celebration', textHindi: 'सामुदायिक उत्सव', value: 'community' },
          { id: 'd4', text: 'Spiritual meditation', textHindi: 'आध्यात्मिक ध्यान', value: 'spiritual' }
        ]
      }
    ],
    results: [
      { 
        id: 'chhath-devotee', 
        name: 'Chhath Devotee', 
        nameHindi: 'छठ भक्त',
        emoji: '🌅', 
        description: 'You are a true Chhath devotee! Your connection to Bihar\'s most sacred festival runs deep in your soul.',
        descriptionHindi: 'आप एक सच्चे छठ भक्त हैं! बिहार के सबसे पवित्र त्योहार से आपका जुड़ाव आपकी आत्मा में गहरा है।',
        color: 'bg-orange-500',
        personalizedMessage: 'Your devotion to Chhath Puja shows your deep spiritual connection to Bihar\'s sacred traditions. You find peace in the rhythmic chants and the golden glow of the setting sun during the holy rituals.',
        personalizedMessageHindi: 'छठ पूजा के प्रति आपकी भक्ति बिहार की पवित्र परंपराओं के साथ आपके गहरे आध्यात्मिक जुड़ाव को दर्शाती है। आप पवित्र अनुष्ठानों के दौरान मंत्रों की लय और सूर्यास्त की सुनहरी चमक में शांति पाते हैं।'
      },
      { 
        id: 'bihar-scholar', 
        name: 'Bihar Scholar', 
        nameHindi: 'बिहार विद्वान',
        emoji: '📚', 
        description: 'You embody Bihar\'s intellectual heritage! Like Nalanda, you seek knowledge and wisdom.',
        descriptionHindi: 'आप बिहार की बौद्धिक विरासत का प्रतिनिधित्व करते हैं! नालंदा की तरह, आप ज्ञान और बुद्धिमत्ता की तलाश करते हैं।',
        color: 'bg-blue-500',
        personalizedMessage: 'Your intellectual curiosity about Bihar\'s ancient universities and scholarly traditions reflects a deep appreciation for knowledge and learning. You understand that Bihar has been a center of wisdom for centuries.',
        personalizedMessageHindi: 'बिहार के प्राचीन विश्वविद्यालयों और विद्वत परंपराओं के बारे में आपकी बौद्धिक जिज्ञासा ज्ञान और सीखने के प्रति गहरी सराहना को दर्शाती है। आप समझते हैं कि बिहार सदियों से ज्ञान का केंद्र रहा है।'
      },
      { 
        id: 'cultural-ambassador', 
        name: 'Cultural Ambassador', 
        nameHindi: 'सांस्कृतिक राजदूत',
        emoji: '🎭', 
        description: 'You are Bihar\'s cultural ambassador! You keep traditions alive and share them with the world.',
        descriptionHindi: 'आप बिहार के सांस्कृतिक राजदूत हैं! आप परंपराओं को जीवित रखते हैं और दुनिया के साथ साझा करते हैं।',
        color: 'bg-green-500',
        personalizedMessage: 'Your passion for Bihar\'s cultural heritage makes you a true ambassador of its traditions. You take pride in sharing the rich tapestry of Bihar\'s festivals, food, and customs with others.',
        personalizedMessageHindi: 'बिहार की सांस्कृतिक विरासत के प्रति आपका जुनून आपको इसकी परंपराओं का सच्चा राजदूत बनाता है। आप बिहार के त्योहारों, भोजन और रीति-रिवाजों की समृद्ध विविधता को दूसरों के साथ साझा करने पर गर्व करते हैं।'
      },
      { 
        id: 'spiritual-seeker', 
        name: 'Spiritual Seeker', 
        nameHindi: 'आध्यात्मिक साधक',
        emoji: '🕉️', 
        description: 'You are a spiritual seeker! Like Buddha, you find enlightenment in Bihar\'s sacred traditions.',
        descriptionHindi: 'आप एक आध्यात्मिक साधक हैं! बुद्ध की तरह, आप बिहार की पवित्र परंपराओं में ज्ञानोदय पाते हैं।',
        color: 'bg-purple-500',
        personalizedMessage: 'Your spiritual journey is deeply connected to Bihar\'s sacred places and ancient wisdom. You find solace in the Ganga\'s flowing waters and the profound teachings that have emerged from this holy land.',
        personalizedMessageHindi: 'आपकी आध्यात्मिक यात्रा बिहार के पवित्र स्थानों और प्राचीन ज्ञान से गहराई से जुड़ी है। आप गंगा की बहती धाराओं और इस पवित्र भूमि से निकली गहन शिक्षाओं में शांति पाते हैं।'
      }
    ],
    resultMapping: {
      'chhath-litti-nalanda-ghat': 'chhath-devotee',
      'durga-sattu-buddha-home': 'bihar-scholar',
      'diwali-dalpuri-ganga-community': 'cultural-ambassador',
      'holi-thekua-bhojpuri-spiritual': 'spiritual-seeker'
    }
  },
  {
    id: 'programming-language',
    title: 'Which Programming Language Matches You?',
    description: 'Discover your coding personality!',
    emoji: '💻',
    category: 'personality',
    tags: ['programming', 'coding', 'tech', 'developer'],
    isViral: true,
    isFeatured: true,
    defaultLanguage: 'en', // Default to English for tech quiz
    defaultTheme: 'Default', // Use neon theme for tech feel
    defaultCustomization: {
      enablePersonalization: false, // No personalization for tech quiz
      personalizationFields: [], // No personalization fields
      showProgress: true,
      showShareButtons: true,
      allowRetake: true
    },
    scoringConfig: {
      rules: [
        // Question 1: What type of development interests you most?
        { questionId: 'q1', answerValue: 'frontend', results: { javascript: 5, swift: 3, python: 1 } },
        { questionId: 'q1', answerValue: 'backend', results: { go: 4, java: 4, csharp: 4, python: 2 } },
        { questionId: 'q1', answerValue: 'algorithm', results: { rust: 5, cpp: 4, python: 1 } },
        { questionId: 'q1', answerValue: 'data', results: { python: 5, go: 2 } },
        
        // Question 2: What's your ideal work environment?
        { questionId: 'q2', answerValue: 'startup', results: { javascript: 3, python: 2 } },
        { questionId: 'q2', answerValue: 'enterprise', results: { java: 4, csharp: 4, go: 3 } },
        { questionId: 'q2', answerValue: 'freelance', results: { python: 3, javascript: 2 } },
        { questionId: 'q2', answerValue: 'research', results: { python: 3, rust: 3 } },
        
        // Question 3: What matters most to you?
        { questionId: 'q3', answerValue: 'compatibility', results: { javascript: 3 } },
        { questionId: 'q3', answerValue: 'performance', results: { go: 3, rust: 3, cpp: 3 } },
        { questionId: 'q3', answerValue: 'loops', results: { rust: 3, cpp: 3 } },
        { questionId: 'q3', answerValue: 'syntax', results: { python: 3, swift: 3 } }
      ],
      defaultResult: 'python'
    },
    createdAt: new Date('2024-09-15'),
    updatedAt: new Date(),
    metadata: {
      views: 2100,
      completions: 1650,
      shares: 320,
      avgRating: 4.6,
      trendingScore: 88
    },
    questions: [
      {
        id: 'q1',
        question: 'What motivates you most in coding?',
        options: [
          { id: 'a1', text: 'Building beautiful user interfaces', value: 'frontend' },
          { id: 'a2', text: 'Creating robust backend systems', value: 'backend' },
          { id: 'a3', text: 'Solving complex algorithms', value: 'algorithm' },
          { id: 'a4', text: 'Working with data and analytics', value: 'data' }
        ]
      },
      {
        id: 'q2',
        question: 'Your ideal work environment is:',
        options: [
          { id: 'b1', text: 'Fast-paced startup', value: 'startup' },
          { id: 'b2', text: 'Large tech company', value: 'enterprise' },
          { id: 'b3', text: 'Remote freelancing', value: 'freelance' },
          { id: 'b4', text: 'Research lab', value: 'research' }
        ]
      },
      {
        id: 'q3',
        question: 'What frustrates you most?',
        options: [
          { id: 'c1', text: 'Browser compatibility issues', value: 'compatibility' },
          { id: 'c2', text: 'Database performance problems', value: 'performance' },
          { id: 'c3', text: 'Infinite loops', value: 'loops' },
          { id: 'c4', text: 'Missing semicolons', value: 'syntax' }
        ]
      }
    ],
    results: [
      { id: 'python', name: 'Python', emoji: '🐍', description: 'You are Python - versatile, readable, and loved by everyone!', color: 'bg-yellow-500', personalizedMessage: 'Your love for clean, readable code and versatility makes you a Python developer at heart. You appreciate the beauty of simple syntax and the power of libraries that make complex tasks elegant.', personalizedMessageHindi: 'साफ, पठनीय कोड और बहुमुखी प्रतिभा के प्रति आपका प्रेम आपको दिल से पायथन डेवलपर बनाता है। आप सरल सिंटैक्स की सुंदरता और लाइब्रेरीज़ की शक्ति की सराहना करते हैं जो जटिल कार्यों को सुंदर बनाती हैं।' },
      { id: 'javascript', name: 'JavaScript', emoji: '⚡', description: 'You are JavaScript - dynamic, flexible, and everywhere!', color: 'bg-yellow-400', personalizedMessage: 'Your dynamic personality and adaptability shine through in your JavaScript approach. You thrive in the fast-paced world of web development and love the flexibility that comes with being everywhere.', personalizedMessageHindi: 'आपका गतिशील व्यक्तित्व और अनुकूलनशीलता आपके जावास्क्रिप्ट दृष्टिकोण में चमकती है। आप वेब डेवलपमेंट की तेज़ दुनिया में पनपते हैं और हर जगह होने की लचीलापन से प्यार करते हैं।' },
      { id: 'rust', name: 'Rust', emoji: '🦀', description: 'You are Rust - safe, fast, and uncompromising!', color: 'bg-orange-600', personalizedMessage: 'Your uncompromising standards for safety and performance make you a perfect Rust developer. You believe in doing things right the first time and value the security that comes with memory safety.' },
      { id: 'go', name: 'Go', emoji: '🐹', description: 'You are Go - simple, efficient, and reliable!', color: 'bg-cyan-500', personalizedMessage: 'Your preference for simplicity and efficiency aligns perfectly with Go\'s philosophy. You value clean, maintainable code and appreciate the reliability that comes from Google\'s engineering excellence.' },
      { id: 'java', name: 'Java', emoji: '☕', description: 'You are Java - enterprise-ready, robust, and battle-tested!', color: 'bg-red-600', personalizedMessage: 'Your enterprise mindset and focus on robustness make you a natural Java developer. You appreciate the stability and scalability that Java brings to large-scale applications.' },
      { id: 'csharp', name: 'C#', emoji: '🔷', description: 'You are C# - powerful, elegant, and Microsoft\'s pride!', color: 'bg-purple-600', personalizedMessage: 'Your appreciation for elegant design and powerful features makes you a C# developer. You value the comprehensive ecosystem and the productivity that comes with Microsoft\'s development tools.' },
      { id: 'cpp', name: 'C++', emoji: '⚙️', description: 'You are C++ - fast, precise, and uncompromising!', color: 'bg-blue-700', personalizedMessage: 'Your need for speed and precision makes you a C++ developer. You enjoy the control and performance that comes with low-level programming and aren\'t afraid of complexity when it leads to better results.' },
      { id: 'swift', name: 'Swift', emoji: '🦉', description: 'You are Swift - modern, safe, and Apple\'s darling!', color: 'bg-orange-500', personalizedMessage: 'Your appreciation for modern design and safety makes you a Swift developer. You love the clean syntax and the innovative features that make iOS development both powerful and enjoyable.' }
    ],
    resultMapping: {}
  },
  {
    id: 'dev-superpower',
    title: 'Your Dev Superpower',
    description: 'What makes you a coding superhero?',
    emoji: '🦸‍♂️',
    category: 'personality',
    tags: ['programming', 'coding', 'tech', 'developer'],
    isViral: true,
    isFeatured: false,
    scoringConfig: {
      rules: [
        // Question 1: When debugging, you:
        { questionId: 'q1', answerValue: 'analytical', results: { 'bug-slayer': 5, 'code-architect': 3 } },
        { questionId: 'q1', answerValue: 'debugger', results: { 'debug-master': 5, 'bug-slayer': 2 } },
        { questionId: 'q1', answerValue: 'researcher', results: { 'stack-overflow-hero': 5, 'code-architect': 2 } },
        { questionId: 'q1', answerValue: 'refactorer', results: { 'code-architect': 5, 'debug-master': 2 } },
        
        // Question 2: Your ideal project is:
        { questionId: 'q2', answerValue: 'startup', results: { 'full-stack-ninja': 4, 'stack-overflow-hero': 3 } },
        { questionId: 'q2', answerValue: 'enterprise', results: { 'code-architect': 4, 'debug-master': 3 } },
        { questionId: 'q2', answerValue: 'open-source', results: { 'stack-overflow-hero': 4, 'bug-slayer': 3 } },
        { questionId: 'q2', answerValue: 'research', results: { 'code-architect': 4, 'full-stack-ninja': 2 } },
        
        // Question 3: You're most proud of:
        { questionId: 'q3', answerValue: 'clean-code', results: { 'code-architect': 4, 'debug-master': 2 } },
        { questionId: 'q3', answerValue: 'fast-debugging', results: { 'debug-master': 4, 'bug-slayer': 3 } },
        { questionId: 'q3', answerValue: 'helping-others', results: { 'stack-overflow-hero': 4, 'full-stack-ninja': 2 } },
        { questionId: 'q3', answerValue: 'learning-new', results: { 'full-stack-ninja': 4, 'code-architect': 2 } }
      ],
      defaultResult: 'full-stack-ninja'
    },
    createdAt: new Date('2024-09-15'),
    updatedAt: new Date(),
    metadata: {
      views: 1800,
      completions: 1420,
      shares: 280,
      avgRating: 4.5,
      trendingScore: 82
    },
    questions: [
      {
        id: 'q1',
        question: 'When debugging, you:',
        options: [
          { id: 'a1', text: 'Read the error message carefully', value: 'analytical' },
          { id: 'a2', text: 'Add console.logs everywhere', value: 'debugger' },
          { id: 'a3', text: 'Ask Stack Overflow', value: 'researcher' },
          { id: 'a4', text: 'Rewrite the entire function', value: 'refactorer' }
        ]
      },
      {
        id: 'q2',
        question: 'Your code review style is:',
        options: [
          { id: 'b1', text: 'Thorough and detailed', value: 'thorough' },
          { id: 'b2', text: 'Quick and efficient', value: 'efficient' },
          { id: 'b3', text: 'Focus on best practices', value: 'best-practices' },
          { id: 'b4', text: 'Encouraging and supportive', value: 'supportive' }
        ]
      },
      {
        id: 'q3',
        question: 'You excel at:',
        options: [
          { id: 'c1', text: 'Finding edge cases', value: 'edge-cases' },
          { id: 'c2', text: 'Optimizing performance', value: 'optimization' },
          { id: 'c3', text: 'Writing clean code', value: 'clean-code' },
          { id: 'c4', text: 'Mentoring others', value: 'mentoring' }
        ]
      }
    ],
    results: [
      { id: 'bug-slayer', name: 'Bug Slayer', emoji: '🐛⚔️', description: 'You hunt down bugs with precision and never let them escape!', color: 'bg-red-500', personalizedMessage: 'Your analytical mind and attention to detail make you an exceptional bug hunter. You approach debugging like a detective, following every clue until you find the root cause.' },
      { id: 'code-optimizer', name: 'Code Optimizer', emoji: '⚡', description: 'You make code run faster than the speed of light!', color: 'bg-blue-500', personalizedMessage: 'Your focus on performance and efficiency drives you to optimize every line of code. You believe that good code should not only work but work exceptionally well.' },
      { id: 'clean-coder', name: 'Clean Coder', emoji: '✨', description: 'Your code is so clean, it sparkles!', color: 'bg-green-500', personalizedMessage: 'Your commitment to clean, maintainable code sets you apart. You write code that not only works but is a joy to read and maintain for years to come.' },
      { id: 'team-mentor', name: 'Team Mentor', emoji: '👨‍🏫', description: 'You guide others to coding greatness!', color: 'bg-purple-500', personalizedMessage: 'Your natural ability to teach and guide others makes you an invaluable team member. You help elevate everyone around you to new levels of coding excellence.' },
      { id: 'architecture-master', name: 'Architecture Master', emoji: '🏗️', description: 'You design systems that stand the test of time!', color: 'bg-indigo-600', personalizedMessage: 'Your ability to see the big picture and design robust systems makes you an architecture master. You create solutions that scale and evolve with changing requirements.' },
      { id: 'security-guardian', name: 'Security Guardian', emoji: '🛡️', description: 'You protect code from vulnerabilities and threats!', color: 'bg-gray-700', personalizedMessage: 'Your security-first mindset makes you a guardian of code integrity. You think like an attacker to build better defenses and protect users from harm.' },
      { id: 'innovation-pioneer', name: 'Innovation Pioneer', emoji: '🚀', description: 'You push boundaries and create the future!', color: 'bg-pink-500', personalizedMessage: 'Your innovative spirit drives you to explore new technologies and approaches. You\'re not afraid to challenge the status quo and create solutions that didn\'t exist before.' },
      { id: 'debugging-detective', name: 'Debugging Detective', emoji: '🔍', description: 'You solve the most complex mysteries in code!', color: 'bg-yellow-600', personalizedMessage: 'Your detective skills in debugging are unmatched. You approach every bug as a mystery to be solved, using logic, patience, and creativity to crack the case.' }
    ]
  },
  {
    id: 'anime-character',
    title: 'Which Anime Character Are You?',
    description: 'Find your anime alter ego!',
    emoji: '🎌',
    category: 'entertainment',
    tags: ['anime', 'character', 'personality', 'japanese'],
    isViral: true,
    isFeatured: false,
    defaultLanguage: 'en', // Default to English for anime quiz
    defaultTheme: 'vibrant', // Use vibrant theme for anime feel
    defaultCustomization: {
      enablePersonalization: true,
      personalizationFields: ['name', 'age'], // Include both name and age for anime quiz
      showProgress: true,
      showShareButtons: true,
      allowRetake: true,
      showTimer: true // Add timer for anime quiz
    },
    scoringConfig: {
      rules: [
        // Question 1: What's your fighting style?
        { questionId: 'q1', answerValue: 'determination', results: { 'naruto': 5, 'goku': 3 } },
        { questionId: 'q1', answerValue: 'strategy', results: { 'light': 5, 'lelouch': 4 } },
        { questionId: 'q1', answerValue: 'friendship', results: { 'naruto': 4, 'goku': 4 } },
        { questionId: 'q1', answerValue: 'justice', results: { 'lelouch': 5, 'light': 3 } },
        
        // Question 2: Your ideal weekend is:
        { questionId: 'q2', answerValue: 'training', results: { 'goku': 5, 'naruto': 3 } },
        { questionId: 'q2', answerValue: 'studying', results: { 'light': 5, 'lelouch': 4 } },
        { questionId: 'q2', answerValue: 'hanging-out', results: { 'naruto': 4, 'goku': 3 } },
        { questionId: 'q2', answerValue: 'planning', results: { 'lelouch': 5, 'light': 4 } },
        
        // Question 3: When facing a challenge, you:
        { questionId: 'q3', answerValue: 'never-give-up', results: { 'naruto': 5, 'goku': 4 } },
        { questionId: 'q3', answerValue: 'think-it-through', results: { 'light': 5, 'lelouch': 4 } },
        { questionId: 'q3', answerValue: 'ask-friends', results: { 'goku': 4, 'naruto': 3 } },
        { questionId: 'q3', answerValue: 'create-plan', results: { 'lelouch': 5, 'light': 3 } }
      ],
      defaultResult: 'naruto'
    },
    createdAt: new Date('2024-09-20'),
    updatedAt: new Date(),
    metadata: {
      views: 3200,
      completions: 2580,
      shares: 450,
      avgRating: 4.7,
      trendingScore: 92
    },
    questions: [
      {
        id: 'q1',
        question: 'Your ideal superpower would be:',
        options: [
          { id: 'a1', text: 'Super strength and speed', value: 'physical' },
          { id: 'a2', text: 'Mind control and telepathy', value: 'mental' },
          { id: 'a3', text: 'Elemental manipulation', value: 'elemental' },
          { id: 'a4', text: 'Healing and support abilities', value: 'support' }
        ]
      },
      {
        id: 'q2',
        question: 'In a team, you prefer to:',
        options: [
          { id: 'b1', text: 'Lead from the front', value: 'leader' },
          { id: 'b2', text: 'Support from behind', value: 'supporter' },
          { id: 'b3', text: 'Work independently', value: 'lone-wolf' },
          { id: 'b4', text: 'Analyze and strategize', value: 'strategist' }
        ]
      },
      {
        id: 'q3',
        question: 'Your biggest fear is:',
        options: [
          { id: 'c1', text: 'Losing loved ones', value: 'loss' },
          { id: 'c2', text: 'Not being strong enough', value: 'weakness' },
          { id: 'c3', text: 'Being alone', value: 'loneliness' },
          { id: 'c4', text: 'Making the wrong choice', value: 'choice' }
        ]
      }
    ],
    results: [
      { id: 'naruto', name: 'Naruto Uzumaki', emoji: '🦊', description: 'Never give up! Your determination inspires everyone around you!', color: 'bg-orange-500' },
      { id: 'goku', name: 'Goku', emoji: '🐒', description: 'Always seeking to become stronger and protect your friends!', color: 'bg-blue-500' },
      { id: 'luffy', name: 'Monkey D. Luffy', emoji: '🏴‍☠️', description: 'Free-spirited and loyal, you follow your dreams no matter what!', color: 'bg-red-500' },
      { id: 'ichigo', name: 'Ichigo Kurosaki', emoji: '⚔️', description: 'Protecting others is your greatest strength!', color: 'bg-black' }
    ]
  },
  {
    id: 'anime-power',
    title: 'Your Anime Power',
    description: 'What supernatural ability matches your personality?',
    emoji: '⚡',
    category: 'entertainment',
    tags: ['anime', 'power', 'supernatural', 'personality'],
    isViral: true,
    isFeatured: false,
    scoringConfig: {
      rules: [
        // Question 1: Your ideal way to solve problems is:
        { questionId: 'q1', answerValue: 'direct', results: { 'chakra': 5, 'haki': 3 } },
        { questionId: 'q1', answerValue: 'strategic', results: { 'stand': 5, 'devil-fruit': 3 } },
        { questionId: 'q1', answerValue: 'teamwork', results: { 'haki': 4, 'chakra': 3 } },
        { questionId: 'q1', answerValue: 'creative', results: { 'devil-fruit': 5, 'stand': 3 } },
        
        // Question 2: You value most:
        { questionId: 'q2', answerValue: 'justice', results: { 'haki': 5, 'chakra': 3 } },
        { questionId: 'q2', answerValue: 'knowledge', results: { 'stand': 5, 'devil-fruit': 2 } },
        { questionId: 'q2', answerValue: 'friendship', results: { 'chakra': 4, 'haki': 3 } },
        { questionId: 'q2', answerValue: 'freedom', results: { 'devil-fruit': 4, 'stand': 3 } },
        
        // Question 3: Your energy level is:
        { questionId: 'q3', answerValue: 'high', results: { 'chakra': 5, 'haki': 3 } },
        { questionId: 'q3', answerValue: 'calm', results: { 'stand': 5, 'devil-fruit': 2 } },
        { questionId: 'q3', answerValue: 'variable', results: { 'devil-fruit': 4, 'haki': 3 } },
        { questionId: 'q3', answerValue: 'focused', results: { 'haki': 4, 'stand': 3 } }
      ],
      defaultResult: 'chakra'
    },
    createdAt: new Date('2024-09-20'),
    updatedAt: new Date(),
    metadata: {
      views: 2800,
      completions: 2200,
      shares: 380,
      avgRating: 4.6,
      trendingScore: 88
    },
    questions: [
      {
        id: 'q1',
        question: 'Your ideal way to solve problems is:',
        options: [
          { id: 'a1', text: 'Direct confrontation', value: 'direct' },
          { id: 'a2', text: 'Strategic planning', value: 'strategic' },
          { id: 'a3', text: 'Team collaboration', value: 'teamwork' },
          { id: 'a4', text: 'Creative solutions', value: 'creative' }
        ]
      },
      {
        id: 'q2',
        question: 'You value most:',
        options: [
          { id: 'b1', text: 'Justice and fairness', value: 'justice' },
          { id: 'b2', text: 'Knowledge and wisdom', value: 'knowledge' },
          { id: 'b3', text: 'Friendship and bonds', value: 'friendship' },
          { id: 'b4', text: 'Freedom and adventure', value: 'freedom' }
        ]
      },
      {
        id: 'q3',
        question: 'Your energy level is:',
        options: [
          { id: 'c1', text: 'Always high and energetic', value: 'high' },
          { id: 'c2', text: 'Calm and collected', value: 'calm' },
          { id: 'c3', text: 'Variable based on situation', value: 'variable' },
          { id: 'c4', text: 'Intense when focused', value: 'focused' }
        ]
      }
    ],
    results: [
      { id: 'chakra', name: 'Chakra Control', emoji: '🌀', description: 'You can harness your inner energy to perform incredible feats!', color: 'bg-blue-500' },
      { id: 'haki', name: 'Haki', emoji: '👁️', description: 'Your willpower is so strong it becomes a tangible force!', color: 'bg-purple-500' },
      { id: 'devil-fruit', name: 'Devil Fruit Power', emoji: '🍎', description: 'You possess a unique ability that sets you apart from others!', color: 'bg-red-500' },
      { id: 'stand', name: 'Stand', emoji: '👻', description: 'Your fighting spirit manifests as a powerful entity!', color: 'bg-yellow-500' }
    ],
    resultMapping: {
      'direct-justice-high': 'chakra',
      'strategic-knowledge-calm': 'haki',
      'teamwork-friendship-variable': 'devil-fruit',
      'creative-freedom-focused': 'stand'
    }
  },
  {
    id: 'cricket-player',
    title: 'Which Cricket Player Are You?',
    description: 'Discover your cricket personality!',
    emoji: '🏏',
    category: 'sports',
    tags: ['cricket', 'sports', 'india', 'personality'],
    isViral: true,
    isFeatured: false,
    scoringConfig: {
      rules: [
        // Question 1: Your batting style is:
        { questionId: 'q1', answerValue: 'aggressive', results: { 'virat-kohli': 5, 'rohit-sharma': 3 } },
        { questionId: 'q1', answerValue: 'defensive', results: { 'sachin-tendulkar': 4, 'rahul-dravid': 5 } },
        { questionId: 'q1', answerValue: 'adaptive', results: { 'ms-dhoni': 5, 'sachin-tendulkar': 3 } },
        { questionId: 'q1', answerValue: 'elegant', results: { 'sachin-tendulkar': 5, 'rohit-sharma': 3 } },
        
        // Question 2: You prefer to:
        { questionId: 'q2', answerValue: 'lead-team', results: { 'virat-kohli': 5, 'ms-dhoni': 4 } },
        { questionId: 'q2', answerValue: 'support-others', results: { 'rahul-dravid': 5, 'ms-dhoni': 3 } },
        { questionId: 'q2', answerValue: 'focus-batting', results: { 'sachin-tendulkar': 5, 'rohit-sharma': 4 } },
        { questionId: 'q2', answerValue: 'innovate-game', results: { 'ms-dhoni': 5, 'virat-kohli': 3 } },
        
        // Question 3: Your biggest strength is:
        { questionId: 'q3', answerValue: 'consistency', results: { 'sachin-tendulkar': 5, 'rahul-dravid': 4 } },
        { questionId: 'q3', answerValue: 'leadership', results: { 'virat-kohli': 5, 'ms-dhoni': 4 } },
        { questionId: 'q3', answerValue: 'technique', results: { 'rahul-dravid': 5, 'sachin-tendulkar': 3 } },
        { questionId: 'q3', answerValue: 'calm-under-pressure', results: { 'ms-dhoni': 5, 'rohit-sharma': 3 } }
      ],
      defaultResult: 'sachin-tendulkar'
    },
    createdAt: new Date('2024-09-25'),
    updatedAt: new Date(),
    metadata: {
      views: 2500,
      completions: 1900,
      shares: 320,
      avgRating: 4.4,
      trendingScore: 85
    },
    questions: [
      {
        id: 'q1',
        question: 'Your batting style is:',
        options: [
          { id: 'a1', text: 'Aggressive and attacking', value: 'aggressive' },
          { id: 'a2', text: 'Defensive and patient', value: 'defensive' },
          { id: 'a3', text: 'Adaptive to situation', value: 'adaptive' },
          { id: 'a4', text: 'Elegant and stylish', value: 'elegant' }
        ]
      },
      {
        id: 'q2',
        question: 'You prefer to:',
        options: [
          { id: 'b1', text: 'Open the innings', value: 'opener' },
          { id: 'b2', text: 'Anchor the middle order', value: 'anchor' },
          { id: 'b3', text: 'Finish the game', value: 'finisher' },
          { id: 'b4', text: 'Play all formats', value: 'all-rounder' }
        ]
      },
      {
        id: 'q3',
        question: 'Your signature shot is:',
        options: [
          { id: 'c1', text: 'Straight drive', value: 'straight' },
          { id: 'c2', text: 'Cover drive', value: 'cover' },
          { id: 'c3', text: 'Pull shot', value: 'pull' },
          { id: 'c4', text: 'Sweep shot', value: 'sweep' }
        ]
      }
    ],
    results: [
      { id: 'virat', name: 'Virat Kohli', emoji: '👑', description: 'The King of Cricket! Your passion and aggression inspire millions!', color: 'bg-blue-500' },
      { id: 'sachin', name: 'Sachin Tendulkar', emoji: '🏆', description: 'The Master Blaster! Your technique and dedication are legendary!', color: 'bg-yellow-500' },
      { id: 'msd', name: 'MS Dhoni', emoji: '🦁', description: 'Captain Cool! Your calmness under pressure is unmatched!', color: 'bg-green-500' },
      { id: 'rohit', name: 'Rohit Sharma', emoji: '🎯', description: 'The Hitman! Your timing and power are extraordinary!', color: 'bg-orange-500' }
    ],
    resultMapping: {
      'aggressive-opener-straight': 'virat',
      'defensive-anchor-cover': 'sachin',
      'adaptive-finisher-pull': 'msd',
      'elegant-all-rounder-sweep': 'rohit'
    }
  },
  {
    id: 'cricket-role',
    title: 'Your Cricket Role',
    description: 'What position suits you best on the cricket field?',
    emoji: '🏏',
    category: 'sports',
    tags: ['cricket', 'sports', 'role', 'position'],
    isViral: false,
    isFeatured: false,
    scoringConfig: {
      rules: [
        // Question 1: Your ideal fielding position is:
        { questionId: 'q1', answerValue: 'slips', results: { 'wicket-keeper': 5, 'all-rounder': 3 } },
        { questionId: 'q1', answerValue: 'boundary', results: { 'fielder': 5, 'all-rounder': 3 } },
        { questionId: 'q1', answerValue: 'close-in', results: { 'wicket-keeper': 4, 'fielder': 3 } },
        { questionId: 'q1', answerValue: 'anywhere', results: { 'all-rounder': 5, 'fielder': 2 } },
        
        // Question 2: Your batting approach is:
        { questionId: 'q2', answerValue: 'aggressive', results: { 'batsman': 5, 'all-rounder': 3 } },
        { questionId: 'q2', answerValue: 'defensive', results: { 'wicket-keeper': 4, 'batsman': 3 } },
        { questionId: 'q2', answerValue: 'supportive', results: { 'all-rounder': 4, 'wicket-keeper': 3 } },
        { questionId: 'q2', answerValue: 'situational', results: { 'all-rounder': 5, 'batsman': 2 } },
        
        // Question 3: Your bowling style is:
        { questionId: 'q3', answerValue: 'fast', results: { 'bowler': 5, 'all-rounder': 3 } },
        { questionId: 'q3', answerValue: 'spin', results: { 'bowler': 4, 'all-rounder': 3 } },
        { questionId: 'q3', answerValue: 'varied', results: { 'all-rounder': 5, 'bowler': 2 } },
        { questionId: 'q3', answerValue: 'occasional', results: { 'fielder': 4, 'wicket-keeper': 3 } }
      ],
      defaultResult: 'all-rounder'
    },
    createdAt: new Date('2024-09-25'),
    updatedAt: new Date(),
    metadata: {
      views: 1200,
      completions: 950,
      shares: 150,
      avgRating: 4.2,
      trendingScore: 75
    },
    questions: [
      {
        id: 'q1',
        question: 'Your ideal fielding position is:',
        options: [
          { id: 'a1', text: 'Behind the stumps', value: 'wicket-keeper' },
          { id: 'a2', text: 'In the slips', value: 'slips' },
          { id: 'a3', text: 'At the boundary', value: 'boundary' },
          { id: 'a4', text: 'Close to the batsman', value: 'close-in' }
        ]
      },
      {
        id: 'q2',
        question: 'You enjoy:',
        options: [
          { id: 'b1', text: 'Bowling fast', value: 'fast-bowler' },
          { id: 'b2', text: 'Spinning the ball', value: 'spinner' },
          { id: 'b3', text: 'Batting aggressively', value: 'batsman' },
          { id: 'b4', text: 'All-round performance', value: 'all-rounder' }
        ]
      },
      {
        id: 'q3',
        question: 'Your strength is:',
        options: [
          { id: 'c1', text: 'Physical fitness', value: 'fitness' },
          { id: 'c2', text: 'Mental toughness', value: 'mental' },
          { id: 'c3', text: 'Technical skills', value: 'technical' },
          { id: 'c4', text: 'Leadership', value: 'leadership' }
        ]
      }
    ],
    results: [
      { id: 'batsman', name: 'Batsman', emoji: '🏏', description: 'You are the backbone of the team, scoring runs when it matters most!', color: 'bg-red-500' },
      { id: 'bowler', name: 'Bowler', emoji: '⚾', description: 'You are the wicket-taker, the game-changer with every delivery!', color: 'bg-blue-500' },
      { id: 'all-rounder', name: 'All-Rounder', emoji: '⭐', description: 'You can do it all - bat, bowl, and field with excellence!', color: 'bg-purple-500' },
      { id: 'wicket-keeper', name: 'Wicket Keeper', emoji: '🧤', description: 'You are the team\'s eyes and ears, always alert and ready!', color: 'bg-green-500' }
    ],
    resultMapping: {
      'wicket-keeper-batsman-technical': 'batsman',
      'slips-fast-bowler-fitness': 'bowler',
      'boundary-all-rounder-mental': 'all-rounder',
      'close-in-spinner-leadership': 'wicket-keeper'
    }
  },
  {
    id: 'song-mood',
    title: 'Which Song Matches Your Mood?',
    description: 'Find your musical soulmate!',
    emoji: '🎵',
    category: 'entertainment',
    tags: ['music', 'mood', 'personality', 'songs'],
    isViral: true,
    isFeatured: false,
    scoringConfig: {
      rules: [
        // Question 1: Your current mood is:
        { questionId: 'q1', answerValue: 'happy', results: { 'uptempo': 5, 'pop': 4 } },
        { questionId: 'q1', answerValue: 'sad', results: { 'ballad': 5, 'indie': 3 } },
        { questionId: 'q1', answerValue: 'energetic', results: { 'rock': 5, 'electronic': 4 } },
        { questionId: 'q1', answerValue: 'chill', results: { 'indie': 5, 'ballad': 3 } },
        
        // Question 2: You prefer music that is:
        { questionId: 'q2', answerValue: 'catchy', results: { 'pop': 5, 'uptempo': 3 } },
        { questionId: 'q2', answerValue: 'meaningful', results: { 'ballad': 5, 'indie': 4 } },
        { questionId: 'q2', answerValue: 'powerful', results: { 'rock': 5, 'electronic': 3 } },
        { questionId: 'q2', answerValue: 'experimental', results: { 'electronic': 5, 'indie': 4 } },
        
        // Question 3: Your ideal listening environment is:
        { questionId: 'q3', answerValue: 'party', results: { 'uptempo': 5, 'pop': 4 } },
        { questionId: 'q3', answerValue: 'alone', results: { 'ballad': 5, 'indie': 3 } },
        { questionId: 'q3', answerValue: 'concert', results: { 'rock': 5, 'electronic': 3 } },
        { questionId: 'q3', answerValue: 'headphones', results: { 'indie': 5, 'electronic': 4 } }
      ],
      defaultResult: 'pop'
    },
    createdAt: new Date('2024-09-30'),
    updatedAt: new Date(),
    metadata: {
      views: 4000,
      completions: 3200,
      shares: 580,
      avgRating: 4.8,
      trendingScore: 95
    },
    questions: [
      {
        id: 'q1',
        question: 'Your current mood is:',
        options: [
          { id: 'a1', text: 'Energetic and pumped', value: 'energetic' },
          { id: 'a2', text: 'Melancholic and reflective', value: 'melancholic' },
          { id: 'a3', text: 'Happy and carefree', value: 'happy' },
          { id: 'a4', text: 'Motivated and determined', value: 'motivated' }
        ]
      },
      {
        id: 'q2',
        question: 'You prefer music that is:',
        options: [
          { id: 'b1', text: 'Fast-paced and intense', value: 'fast' },
          { id: 'b2', text: 'Slow and emotional', value: 'slow' },
          { id: 'b3', text: 'Catchy and memorable', value: 'catchy' },
          { id: 'b4', text: 'Deep and meaningful', value: 'meaningful' }
        ]
      },
      {
        id: 'q3',
        question: 'Your ideal listening environment is:',
        options: [
          { id: 'c1', text: 'At a party or club', value: 'party' },
          { id: 'c2', text: 'Alone in your room', value: 'alone' },
          { id: 'c3', text: 'With friends', value: 'friends' },
          { id: 'c4', text: 'During a workout', value: 'workout' }
        ]
      }
    ],
    results: [
      { id: 'bohemian-rhapsody', name: 'Bohemian Rhapsody', emoji: '👑', description: 'A masterpiece that defies categorization - just like you!', color: 'bg-purple-500' },
      { id: 'imagine', name: 'Imagine', emoji: '🕊️', description: 'A timeless anthem of hope and peace that resonates with your soul!', color: 'bg-blue-500' },
      { id: 'dancing-queen', name: 'Dancing Queen', emoji: '💃', description: 'A celebration of joy and freedom that makes everyone dance!', color: 'bg-pink-500' },
      { id: 'eye-of-the-tiger', name: 'Eye of the Tiger', emoji: '🐅', description: 'The ultimate anthem of determination and triumph!', color: 'bg-orange-500' }
    ],
    resultMapping: {
      'energetic-fast-party': 'bohemian-rhapsody',
      'melancholic-slow-alone': 'imagine',
      'happy-catchy-friends': 'dancing-queen',
      'motivated-meaningful-workout': 'eye-of-the-tiger'
    }
  },
  {
    id: 'music-genre',
    title: 'Your Music Genre',
    description: 'What musical style defines you?',
    emoji: '🎶',
    category: 'entertainment',
    tags: ['music', 'genre', 'personality', 'style'],
    isViral: true,
    isFeatured: false,
    scoringConfig: {
      rules: [
        // Question 1: Your ideal concert would be:
        { questionId: 'q1', answerValue: 'rock-concert', results: { 'rock': 5, 'alternative': 3 } },
        { questionId: 'q1', answerValue: 'jazz-club', results: { 'jazz': 5, 'blues': 3 } },
        { questionId: 'q1', answerValue: 'pop-show', results: { 'pop': 5, 'indie': 2 } },
        { questionId: 'q1', answerValue: 'classical-hall', results: { 'classical': 5, 'jazz': 2 } },
        
        // Question 2: You prefer music that is:
        { questionId: 'q2', answerValue: 'energetic', results: { 'rock': 5, 'electronic': 4 } },
        { questionId: 'q2', answerValue: 'melodic', results: { 'pop': 5, 'indie': 3 } },
        { questionId: 'q2', answerValue: 'complex', results: { 'jazz': 5, 'classical': 4 } },
        { questionId: 'q2', answerValue: 'emotional', results: { 'blues': 5, 'indie': 3 } },
        
        // Question 3: Your music discovery method is:
        { questionId: 'q3', answerValue: 'radio', results: { 'pop': 5, 'rock': 3 } },
        { questionId: 'q3', answerValue: 'streaming', results: { 'electronic': 5, 'indie': 4 } },
        { questionId: 'q3', answerValue: 'recommendations', results: { 'jazz': 5, 'classical': 4 } },
        { questionId: 'q3', answerValue: 'exploration', results: { 'alternative': 5, 'blues': 3 } }
      ],
      defaultResult: 'pop'
    },
    createdAt: new Date('2024-09-30'),
    updatedAt: new Date(),
    metadata: {
      views: 3500,
      completions: 2800,
      shares: 520,
      avgRating: 4.6,
      trendingScore: 90
    },
    questions: [
      {
        id: 'q1',
        question: 'Your ideal concert would be:',
        options: [
          { id: 'a1', text: 'A massive stadium show', value: 'stadium' },
          { id: 'a2', text: 'An intimate acoustic set', value: 'acoustic' },
          { id: 'a3', text: 'A club with dancing', value: 'club' },
          { id: 'a4', text: 'A classical symphony', value: 'classical' }
        ]
      },
      {
        id: 'q2',
        question: 'You connect most with:',
        options: [
          { id: 'b1', text: 'Raw emotion and energy', value: 'emotion' },
          { id: 'b2', text: 'Complex melodies and harmonies', value: 'complexity' },
          { id: 'b3', text: 'Rhythm and beats', value: 'rhythm' },
          { id: 'b4', text: 'Storytelling and lyrics', value: 'storytelling' }
        ]
      },
      {
        id: 'q3',
        question: 'Your musical instrument of choice is:',
        options: [
          { id: 'c1', text: 'Electric guitar', value: 'guitar' },
          { id: 'c2', text: 'Piano', value: 'piano' },
          { id: 'c3', text: 'Drums', value: 'drums' },
          { id: 'c4', text: 'Violin', value: 'violin' }
        ]
      }
    ],
    results: [
      { id: 'rock', name: 'Rock', emoji: '🎸', description: 'You are Rock - rebellious, powerful, and unapologetically authentic!', color: 'bg-red-500' },
      { id: 'jazz', name: 'Jazz', emoji: '🎷', description: 'You are Jazz - sophisticated, improvisational, and endlessly creative!', color: 'bg-purple-500' },
      { id: 'electronic', name: 'Electronic', emoji: '🎛️', description: 'You are Electronic - innovative, futuristic, and always evolving!', color: 'bg-cyan-500' },
      { id: 'classical', name: 'Classical', emoji: '🎼', description: 'You are Classical - timeless, elegant, and deeply moving!', color: 'bg-gold-500' }
    ],
    resultMapping: {
      'stadium-emotion-guitar': 'rock',
      'acoustic-complexity-piano': 'jazz',
      'club-rhythm-drums': 'electronic',
      'classical-storytelling-violin': 'classical'
    }
  },
  {
    id: 'movie-character',
    title: 'Which Movie Character Are You?',
    description: 'Find your cinematic alter ego!',
    emoji: '🎬',
    category: 'entertainment',
    tags: ['movies', 'character', 'cinema', 'personality'],
    isViral: true,
    isFeatured: false,
    scoringConfig: {
      rules: [
        // Question 1: Your ideal adventure would be:
        { questionId: 'q1', answerValue: 'space-exploration', results: { 'hero': 5, 'villain': 2 } },
        { questionId: 'q1', answerValue: 'time-travel', results: { 'mentor': 5, 'hero': 3 } },
        { questionId: 'q1', answerValue: 'mystery-solving', results: { 'detective': 5, 'mentor': 3 } },
        { questionId: 'q1', answerValue: 'world-domination', results: { 'villain': 5, 'anti-hero': 3 } },
        
        // Question 2: Your approach to problems is:
        { questionId: 'q2', answerValue: 'direct-action', results: { 'hero': 5, 'anti-hero': 3 } },
        { questionId: 'q2', answerValue: 'strategic-planning', results: { 'villain': 5, 'mentor': 4 } },
        { questionId: 'q2', answerValue: 'gathering-info', results: { 'detective': 5, 'mentor': 3 } },
        { questionId: 'q2', answerValue: 'moral-ambiguity', results: { 'anti-hero': 5, 'villain': 3 } },
        
        // Question 3: Your greatest strength is:
        { questionId: 'q3', answerValue: 'courage', results: { 'hero': 5, 'anti-hero': 2 } },
        { questionId: 'q3', answerValue: 'intelligence', results: { 'villain': 5, 'mentor': 4 } },
        { questionId: 'q3', answerValue: 'wisdom', results: { 'mentor': 5, 'detective': 3 } },
        { questionId: 'q3', answerValue: 'determination', results: { 'anti-hero': 5, 'hero': 3 } }
      ],
      defaultResult: 'hero'
    },
    createdAt: new Date('2024-10-01'),
    updatedAt: new Date(),
    metadata: {
      views: 3000,
      completions: 2400,
      shares: 420,
      avgRating: 4.5,
      trendingScore: 87
    },
    questions: [
      {
        id: 'q1',
        question: 'Your ideal adventure would be:',
        options: [
          { id: 'a1', text: 'Saving the world from evil', value: 'hero' },
          { id: 'a2', text: 'Exploring unknown territories', value: 'explorer' },
          { id: 'a3', text: 'Solving mysteries and puzzles', value: 'detective' },
          { id: 'a4', text: 'Building relationships and connections', value: 'connector' }
        ]
      },
      {
        id: 'q2',
        question: 'Your approach to challenges is:',
        options: [
          { id: 'b1', text: 'Face them head-on with courage', value: 'courage' },
          { id: 'b2', text: 'Use intelligence and strategy', value: 'intelligence' },
          { id: 'b3', text: 'Rely on friends and teamwork', value: 'teamwork' },
          { id: 'b4', text: 'Adapt and improvise', value: 'adaptation' }
        ]
      },
      {
        id: 'q3',
        question: 'Your greatest strength is:',
        options: [
          { id: 'c1', text: 'Physical prowess', value: 'physical' },
          { id: 'c2', text: 'Mental acuity', value: 'mental' },
          { id: 'c3', text: 'Emotional intelligence', value: 'emotional' },
          { id: 'c4', text: 'Creative problem-solving', value: 'creative' }
        ]
      }
    ],
    results: [
      { id: 'superman', name: 'Superman', emoji: '🦸‍♂️', description: 'You are Superman - powerful, noble, and always fighting for justice!', color: 'bg-blue-500' },
      { id: 'indiana-jones', name: 'Indiana Jones', emoji: '🗿', description: 'You are Indiana Jones - adventurous, intelligent, and always ready for the next quest!', color: 'bg-brown-500' },
      { id: 'sherlock', name: 'Sherlock Holmes', emoji: '🔍', description: 'You are Sherlock Holmes - brilliant, observant, and master of deduction!', color: 'bg-gray-500' },
      { id: 'forrest-gump', name: 'Forrest Gump', emoji: '🏃‍♂️', description: 'You are Forrest Gump - kind-hearted, determined, and life\'s unexpected hero!', color: 'bg-green-500' }
    ],
    resultMapping: {
      'hero-courage-physical': 'superman',
      'explorer-intelligence-mental': 'indiana-jones',
      'detective-teamwork-emotional': 'sherlock',
      'connector-adaptation-creative': 'forrest-gump'
    }
  },
  {
    id: 'work-superpower',
    title: 'Your Work Superpower',
    description: 'What makes you unstoppable at work?',
    emoji: '💼',
    category: 'lifestyle',
    tags: ['work', 'career', 'productivity', 'personality'],
    isViral: true,
    isFeatured: false,
    scoringConfig: {
      rules: [
        // Question 1: Your ideal workday starts with:
        { questionId: 'q1', answerValue: 'planning', results: { 'strategist': 5, 'organizer': 4 } },
        { questionId: 'q1', answerValue: 'emails', results: { 'communicator': 5, 'organizer': 3 } },
        { questionId: 'q1', answerValue: 'creative-work', results: { 'innovator': 5, 'problem-solver': 3 } },
        { questionId: 'q1', answerValue: 'meetings', results: { 'leader': 5, 'communicator': 3 } },
        
        // Question 2: You excel at:
        { questionId: 'q2', answerValue: 'problem-solving', results: { 'problem-solver': 5, 'innovator': 3 } },
        { questionId: 'q2', answerValue: 'team-building', results: { 'leader': 5, 'communicator': 3 } },
        { questionId: 'q2', answerValue: 'organizing', results: { 'organizer': 5, 'strategist': 3 } },
        { questionId: 'q2', answerValue: 'innovating', results: { 'innovator': 5, 'problem-solver': 2 } },
        
        // Question 3: Your biggest work challenge is:
        { questionId: 'q3', answerValue: 'time-management', results: { 'organizer': 5, 'strategist': 3 } },
        { questionId: 'q3', answerValue: 'communication', results: { 'communicator': 5, 'leader': 3 } },
        { questionId: 'q3', answerValue: 'bureaucracy', results: { 'innovator': 5, 'problem-solver': 3 } },
        { questionId: 'q3', answerValue: 'motivation', results: { 'leader': 5, 'communicator': 3 } }
      ],
      defaultResult: 'problem-solver'
    },
    createdAt: new Date('2024-10-01'),
    updatedAt: new Date(),
    metadata: {
      views: 2200,
      completions: 1750,
      shares: 310,
      avgRating: 4.3,
      trendingScore: 80
    },
    questions: [
      {
        id: 'q1',
        question: 'Your ideal workday starts with:',
        options: [
          { id: 'a1', text: 'A detailed to-do list', value: 'organized' },
          { id: 'a2', text: 'Checking emails and messages', value: 'communicative' },
          { id: 'a3', text: 'Jumping into the most important task', value: 'focused' },
          { id: 'a4', text: 'Brainstorming new ideas', value: 'creative' }
        ]
      },
      {
        id: 'q2',
        question: 'You handle deadlines by:',
        options: [
          { id: 'b1', text: 'Planning ahead and starting early', value: 'planner' },
          { id: 'b2', text: 'Working efficiently under pressure', value: 'pressure' },
          { id: 'b3', text: 'Breaking tasks into smaller chunks', value: 'chunker' },
          { id: 'b4', text: 'Collaborating with the team', value: 'collaborator' }
        ]
      },
      {
        id: 'q3',
        question: 'Your biggest work satisfaction comes from:',
        options: [
          { id: 'c1', text: 'Completing projects perfectly', value: 'perfectionist' },
          { id: 'c2', text: 'Helping colleagues succeed', value: 'helper' },
          { id: 'c3', text: 'Learning new skills', value: 'learner' },
          { id: 'c4', text: 'Leading and inspiring others', value: 'leader' }
        ]
      }
    ],
    results: [
      { id: 'productivity-master', name: 'Productivity Master', emoji: '⚡', description: 'You are the Productivity Master - efficient, organized, and always ahead of schedule!', color: 'bg-green-500' },
      { id: 'team-player', name: 'Team Player', emoji: '🤝', description: 'You are the Team Player - collaborative, supportive, and the glue that holds teams together!', color: 'bg-blue-500' },
      { id: 'innovation-leader', name: 'Innovation Leader', emoji: '💡', description: 'You are the Innovation Leader - creative, forward-thinking, and always pushing boundaries!', color: 'bg-purple-500' },
      { id: 'mentor-coach', name: 'Mentor Coach', emoji: '👨‍🏫', description: 'You are the Mentor Coach - wise, patient, and dedicated to helping others grow!', color: 'bg-orange-500' }
    ],
    resultMapping: {
      'organized-planner-perfectionist': 'productivity-master',
      'communicative-collaborator-helper': 'team-player',
      'focused-chunker-learner': 'innovation-leader',
      'creative-pressure-leader': 'mentor-coach'
    }
  }
];

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find(quiz => quiz.id === id);
}

// Helper function to ensure all quizzes have default metadata
function ensureQuizMetadata(quiz: Quiz): Quiz {
  return {
    ...quiz,
    category: quiz.category || 'personality',
    tags: quiz.tags || [],
    isViral: quiz.isViral || false,
    isFeatured: quiz.isFeatured || false,
    createdAt: quiz.createdAt || new Date(),
    updatedAt: quiz.updatedAt || new Date(),
    metadata: quiz.metadata || {
      views: 0,
      completions: 0,
      shares: 0,
      avgRating: 0,
      trendingScore: 0
    }
  };
}

// Apply metadata to all quizzes
export const quizzesWithMetadata: Quiz[] = quizzes.map(ensureQuizMetadata);

export function calculateQuizResult(quiz: Quiz, answers: Record<string, string>): QuizResult | null {
  console.log('🚀 === CALCULATE QUIZ RESULT CALLED ===');
  console.log('Quiz ID:', quiz.id);
  console.log('Quiz title:', quiz.title);
  console.log('Answers received:', answers);
  console.log('Answers type:', typeof answers);
  console.log('Answers keys:', Object.keys(answers));
  console.log('Answers values:', Object.values(answers));
  
  // Check if answers are valid
  if (!answers || Object.keys(answers).length === 0) {
    console.log('❌ No answers provided!');
    return quiz.results[0];
  }
  
  console.log('✅ Answers are valid, proceeding to generic calculation');
  
  // Use generic scoring system
  const result = calculateGenericResult(quiz, answers);
  console.log('🎯 Returning result from calculateQuizResult:', result?.name, '(', result?.id, ')');
  return result;
}

function calculateGenericResult(quiz: Quiz, answers: Record<string, string>): QuizResult | null {
  console.log('=== GENERIC CALCULATION START ===');
  console.log('Quiz ID:', quiz.id);
  console.log('Quiz title:', quiz.title);
  console.log('Answers received:', answers);
  console.log('Answers type:', typeof answers);
  console.log('Answers keys:', Object.keys(answers));
  console.log('Answers values:', Object.values(answers));
  
  // Check if quiz has scoring config
  console.log('Quiz has scoringConfig:', !!quiz.scoringConfig);
  if (quiz.scoringConfig) {
    console.log('Scoring config rules count:', quiz.scoringConfig.rules?.length || 0);
    console.log('Default result:', quiz.scoringConfig.defaultResult);
  }
  
  // Initialize scores for all results
  const scores: Record<string, number> = {};
  console.log('Available results:', quiz.results.map(r => r.id));
  quiz.results.forEach(result => {
    scores[result.id] = 0;
  });
  
  console.log('Initial scores:', scores);
  
  // Apply scoring rules from quiz configuration
  if (quiz.scoringConfig && quiz.scoringConfig.rules) {
    console.log('✅ Using scoring config with', quiz.scoringConfig.rules.length, 'rules');
    
    let rulesMatched = 0;
    quiz.scoringConfig.rules.forEach((rule, index) => {
      const answerValue = answers[rule.questionId];
      console.log(`\n--- Rule ${index + 1} ---`);
      console.log(`Question ID: ${rule.questionId}`);
      console.log(`Expected answer: ${rule.answerValue}`);
      console.log(`Actual answer: ${answerValue}`);
      console.log(`Rule results:`, rule.results);
      
      if (answerValue === rule.answerValue) {
        rulesMatched++;
        console.log('✅ Rule matched! Applying scores:', rule.results);
        Object.entries(rule.results).forEach(([resultId, score]) => {
          const oldScore = scores[resultId] || 0;
          scores[resultId] = oldScore + score;
          console.log(`Added ${score} points to ${resultId}: ${oldScore} + ${score} = ${scores[resultId]}`);
        });
      } else {
        console.log('❌ Rule did not match');
      }
    });
    
    console.log(`\nTotal rules matched: ${rulesMatched}/${quiz.scoringConfig.rules.length}`);
  } else {
    console.log('❌ No scoring config found, using fallback scoring');
    console.log('Quiz scoringConfig:', quiz.scoringConfig);
    return calculateFallbackResult(quiz, answers);
  }
  
  console.log('\n=== FINAL SCORING ===');
  console.log('Final scores:', scores);
  
  // Find the result with highest score
  let maxScore = -1;
  let bestResult = quiz.results[0];
  
  console.log('\nFinding best result:');
  Object.entries(scores).forEach(([resultId, score]) => {
    console.log(`Checking ${resultId}: ${score} points`);
    if (score > maxScore) {
      maxScore = score;
      bestResult = quiz.results.find(result => result.id === resultId) || quiz.results[0];
      console.log(`🏆 New best: ${resultId} with ${score} points`);
    }
  });
  
  console.log('\n=== RESULT SELECTION ===');
  console.log('Max score:', maxScore);
  console.log('Best result ID:', bestResult.id);
  console.log('Best result name:', bestResult.name);
  
  // If no scores were applied, use default result
  if (maxScore === 0 && quiz.scoringConfig?.defaultResult) {
    const defaultResult = quiz.results.find(result => result.id === quiz.scoringConfig?.defaultResult);
    if (defaultResult) {
      console.log('⚠️ No scores applied, using default result:', defaultResult.id);
      return defaultResult;
    }
  }
  
  console.log('🎯 Final result:', bestResult.name, '(', bestResult.id, ') with score:', maxScore);
  console.log('=== GENERIC CALCULATION END ===\n');
  
  return bestResult;
}

function calculateFallbackResult(quiz: Quiz, answers: Record<string, string>): QuizResult | null {
  console.log('Using fallback calculation for quiz:', quiz.id);
  
  // Simple fallback: return result based on first answer
  const firstAnswer = Object.values(answers)[0];
  console.log('First answer:', firstAnswer);
  
  // Try to find a result that matches the answer pattern
  const matchingResult = quiz.results.find(result => 
    result.id.toLowerCase().includes(firstAnswer.toLowerCase()) ||
    result.name.toLowerCase().includes(firstAnswer.toLowerCase())
  );
  
  if (matchingResult) {
    console.log('Found matching result:', matchingResult.name);
    return matchingResult;
  }
  
  // Return first result as final fallback
  console.log('No match found, using first result');
  return quiz.results[0];
}

// Helper function to create scoring configuration from JSON
export function createScoringConfig(config: {
  rules: Array<{
    questionId: string;
    answerValue: string;
    results: Record<string, number>;
  }>;
  defaultResult?: string;
}): ScoringConfig {
  return {
    rules: config.rules,
    defaultResult: config.defaultResult
  };
}

// Load scoring configuration from JSON file
export async function loadScoringConfig(quizId: string): Promise<ScoringConfig | null> {
  try {
    const configs = await import('./scoring-configs.json') as any;
    const config = configs.default[quizId];
    if (config) {
      return createScoringConfig(config);
    }
    return null;
  } catch (error) {
    console.error(`Failed to load scoring config for quiz ${quizId}:`, error);
    return null;
  }
}

// Theme management functions
export function getThemeById(id: string): Theme | undefined {
  return themes.find(theme => theme.id === id);
}

export function getDefaultTheme(): Theme {
  return themes.find(theme => theme.isDefault) || themes[0];
}

export function getThemeFromStorage(): Theme | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem('quiz-theme');
    if (stored) {
      const theme = getThemeById(stored);
      return theme || null;
    }
  } catch (error) {
    console.warn('Failed to load theme from storage:', error);
  }
  
  return null;
}

export function saveThemeToStorage(themeId: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('quiz-theme', themeId);
  } catch (error) {
    console.warn('Failed to save theme to storage:', error);
  }
}

export function getInitialTheme(): Theme {
  const storedTheme = getThemeFromStorage();
  return storedTheme || getDefaultTheme();
}

export function applyThemeToDocument(theme: Theme) {
  const root = document.documentElement;
  
  // Apply CSS custom properties
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
  
  Object.entries(theme.fonts).forEach(([key, value]) => {
    root.style.setProperty(`--font-${key}`, value);
  });
  
  Object.entries(theme.layout).forEach(([key, value]) => {
    root.style.setProperty(`--layout-${key}`, value);
  });
  
  Object.entries(theme.animations).forEach(([key, value]) => {
    root.style.setProperty(`--animation-${key}`, value);
  });
  
  // Apply theme class
  root.className = root.className.replace(/theme-\w+/g, '');
  root.classList.add(`theme-${theme.id}`);
}

export function generateThemeCSS(theme: Theme): string {
  return `
    .theme-${theme.id} {
      --color-primary: ${theme.colors.primary};
      --color-secondary: ${theme.colors.secondary};
      --color-accent: ${theme.colors.accent};
      --color-background: ${theme.colors.background};
      --color-surface: ${theme.colors.surface};
      --color-text: ${theme.colors.text};
      --color-text-secondary: ${theme.colors.textSecondary};
      --color-border: ${theme.colors.border};
      --color-success: ${theme.colors.success};
      --color-warning: ${theme.colors.warning};
      --color-error: ${theme.colors.error};
      --color-info: ${theme.colors.info};
      
      --font-heading: ${theme.fonts.heading};
      --font-body: ${theme.fonts.body};
      --font-mono: ${theme.fonts.mono};
      
      --layout-border-radius: ${theme.layout.borderRadius};
      --layout-spacing: ${theme.layout.spacing};
      --layout-shadows: ${theme.layout.shadows};
      
      --animation-duration: ${theme.animations.duration};
      --animation-easing: ${theme.animations.easing};
    }
  `;
}

// Quiz customization functions
export function getQuizWithCustomization(quizId: string, customization?: Partial<QuizCustomization>): Quiz | null {
  const quiz = getQuizById(quizId);
  if (!quiz) return null;
  
  // Start with global defaults
  const globalDefaultCustomization: QuizCustomization = {
    themeId: 'default',
    defaultLanguage: 'en',
    showProgress: true,
    showTimer: false,
    allowRetake: true,
    showShareButtons: true,
    enablePersonalization: true,
    personalizationFields: ['name']
  };
  
  // Apply quiz-specific defaults
  const quizDefaultCustomization: QuizCustomization = {
    ...globalDefaultCustomization,
    themeId: quiz.defaultTheme || globalDefaultCustomization.themeId,
    defaultLanguage: quiz.defaultLanguage || globalDefaultCustomization.defaultLanguage,
    ...quiz.defaultCustomization
  };
  
  // Apply user-provided customization
  const finalCustomization = { ...quizDefaultCustomization, ...customization };
  const theme = getThemeById(finalCustomization.themeId) || getDefaultTheme();
  
  return {
    ...quiz,
    customization: finalCustomization,
    theme
  };
}

export function createCustomQuiz(quiz: Quiz, customization: QuizCustomization): Quiz {
  const theme = getThemeById(customization.themeId) || getDefaultTheme();
  
  return {
    ...quiz,
    customization,
    theme
  };
}

// Helper functions for quiz defaults
export function getQuizDefaultLanguage(quizId: string): 'en' | 'hi' {
  const quiz = getQuizById(quizId);
  return quiz?.defaultLanguage || 'en';
}

export function getQuizDefaultTheme(quizId: string): string {
  const quiz = getQuizById(quizId);
  return quiz?.defaultTheme || 'default';
}

export function getQuizDefaultCustomization(quizId: string): Partial<QuizCustomization> {
  const quiz = getQuizById(quizId);
  return quiz?.defaultCustomization || {};
}
