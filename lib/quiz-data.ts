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
      framerEasing: 'easeOut'
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
  },
  {
    id: 'startup-culture',
    title: 'Which Startup Stereotype Are You?',
    description: 'Find your startup alter ego!',
    emoji: '🚀',
    category: 'lifestyle',
    tags: ['startup', 'culture', 'tech', 'personality'],
    isViral: true,
    isFeatured: false,
    defaultLanguage: 'en',
    defaultTheme: 'neon',
    defaultCustomization: {
      enablePersonalization: true,
      personalizationFields: ['name'],
      showProgress: true,
      showShareButtons: true,
      allowRetake: true
    },
    scoringConfig: {
      rules: [
        // Question 1: Your ideal office setup is:
        { questionId: 'q1', answerValue: 'open-plan', results: { 'hustle-bro': 5, 'pivot-master': 3 } },
        { questionId: 'q1', answerValue: 'remote-first', results: { 'digital-nomad': 5, 'unicorn-hunter': 3 } },
        { questionId: 'q1', answerValue: 'co-working', results: { 'networking-ninja': 5, 'hustle-bro': 2 } },
        { questionId: 'q1', answerValue: 'corner-office', results: { 'unicorn-hunter': 5, 'pivot-master': 2 } },
        
        // Question 2: Your favorite startup phrase is:
        { questionId: 'q2', answerValue: 'disrupt', results: { 'hustle-bro': 5, 'pivot-master': 3 } },
        { questionId: 'q2', answerValue: 'scale', results: { 'unicorn-hunter': 5, 'networking-ninja': 3 } },
        { questionId: 'q2', answerValue: 'synergy', results: { 'networking-ninja': 5, 'digital-nomad': 2 } },
        { questionId: 'q2', answerValue: 'iterate', results: { 'pivot-master': 5, 'hustle-bro': 2 } },
        
        // Question 3: Your ideal workday starts with:
        { questionId: 'q3', answerValue: 'standup', results: { 'hustle-bro': 5, 'pivot-master': 3 } },
        { questionId: 'q3', answerValue: 'coffee-run', results: { 'networking-ninja': 5, 'digital-nomad': 3 } },
        { questionId: 'q3', answerValue: 'slack-check', results: { 'digital-nomad': 5, 'unicorn-hunter': 2 } },
        { questionId: 'q3', answerValue: 'pitch-prep', results: { 'unicorn-hunter': 5, 'hustle-bro': 2 } }
      ],
      defaultResult: 'hustle-bro'
    },
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date(),
    metadata: {
      views: 1500,
      completions: 1200,
      shares: 250,
      avgRating: 4.7,
      trendingScore: 88
    },
    questions: [
      {
        id: 'q1',
        question: 'Your ideal office setup is:',
        options: [
          { id: 'a1', text: 'Open-plan with ping pong table', value: 'open-plan' },
          { id: 'a2', text: 'Remote from a beach in Bali', value: 'remote-first' },
          { id: 'a3', text: 'Co-working space with free coffee', value: 'co-working' },
          { id: 'a4', text: 'Corner office with city views', value: 'corner-office' }
        ]
      },
      {
        id: 'q2',
        question: 'Your favorite startup phrase is:',
        options: [
          { id: 'b1', text: 'We\'re disrupting the industry!', value: 'disrupt' },
          { id: 'b2', text: 'We need to scale this fast!', value: 'scale' },
          { id: 'b3', text: 'Let\'s create synergy here', value: 'synergy' },
          { id: 'b4', text: 'We need to iterate on this', value: 'iterate' }
        ]
      },
      {
        id: 'q3',
        question: 'Your ideal workday starts with:',
        options: [
          { id: 'c1', text: 'Daily standup meeting', value: 'standup' },
          { id: 'c2', text: 'Coffee run to the local roastery', value: 'coffee-run' },
          { id: 'c3', text: 'Checking Slack notifications', value: 'slack-check' },
          { id: 'c4', text: 'Preparing investor pitch deck', value: 'pitch-prep' }
        ]
      }
    ],
    results: [
      { 
        id: 'hustle-bro', 
        name: 'Hustle Bro', 
        emoji: '💪', 
        description: 'You live and breathe the hustle! 5 AM workouts, cold showers, and "disrupting" everything in sight!', 
        color: 'bg-red-500',
        personalizedMessage: 'You\'re the embodiment of startup culture - always hustling, never sleeping, and convinced that your app will change the world. Your LinkedIn is 90% motivational quotes and your calendar is booked solid with "synergy sessions."'
      },
      { 
        id: 'pivot-master', 
        name: 'Pivot Master', 
        emoji: '🔄', 
        description: 'You pivot so fast, you\'re basically a human fidget spinner! Every setback is just a "learning opportunity"!', 
        color: 'bg-blue-500',
        personalizedMessage: 'You\'ve pivoted your startup idea 47 times this month alone. From "Uber for cats" to "AI-powered pet rock therapy," you\'re convinced the next pivot will be THE ONE. Your investors are getting whiplash.'
      },
      { 
        id: 'digital-nomad', 
        name: 'Digital Nomad', 
        emoji: '🌴', 
        description: 'You work from beaches, mountains, and coffee shops with questionable WiFi. Location independence is your superpower!', 
        color: 'bg-green-500',
        personalizedMessage: 'You\'ve mastered the art of working from anywhere with a laptop and a dream. Your Instagram is 90% sunset photos with your laptop, and you\'ve convinced yourself that slow WiFi builds character.'
      },
      { 
        id: 'networking-ninja', 
        name: 'Networking Ninja', 
        emoji: '🤝', 
        description: 'You know everyone, everywhere, all the time. Your LinkedIn connections could populate a small country!', 
        color: 'bg-purple-500',
        personalizedMessage: 'You attend every networking event, collect business cards like Pokémon, and have mastered the art of the elevator pitch. You could probably get a meeting with Elon Musk through your network of connections.'
      },
      { 
        id: 'unicorn-hunter', 
        name: 'Unicorn Hunter', 
        emoji: '🦄', 
        description: 'You\'re on a quest for the mythical billion-dollar valuation! Your pitch deck is longer than a Tolstoy novel!', 
        color: 'bg-pink-500',
        personalizedMessage: 'You\'re convinced your startup is the next unicorn, even though you\'re still figuring out how to monetize. Your pitch deck has 200 slides and includes a section on "world domination strategy."'
      }
    ]
  },
  {
    id: 'corporate-culture',
    title: 'Which Corporate Stereotype Are You?',
    description: 'Find your corporate alter ego!',
    emoji: '🏢',
    category: 'lifestyle',
    tags: ['corporate', 'culture', 'office', 'personality'],
    isViral: true,
    isFeatured: false,
    defaultLanguage: 'en',
    defaultTheme: 'minimal',
    defaultCustomization: {
      enablePersonalization: true,
      personalizationFields: ['name'],
      showProgress: true,
      showShareButtons: true,
      allowRetake: true
    },
    scoringConfig: {
      rules: [
        // Question 1: Your ideal meeting is:
        { questionId: 'q1', answerValue: 'powerpoint', results: { 'meeting-master': 5, 'synergy-specialist': 3 } },
        { questionId: 'q1', answerValue: 'brainstorm', results: { 'innovation-champion': 5, 'synergy-specialist': 2 } },
        { questionId: 'q1', answerValue: 'status-update', results: { 'process-perfectionist': 5, 'meeting-master': 3 } },
        { questionId: 'q1', answerValue: 'team-building', results: { 'synergy-specialist': 5, 'innovation-champion': 2 } },
        
        // Question 2: Your favorite corporate phrase is:
        { questionId: 'q2', answerValue: 'synergy', results: { 'synergy-specialist': 5, 'meeting-master': 3 } },
        { questionId: 'q2', answerValue: 'leverage', results: { 'meeting-master': 5, 'process-perfectionist': 3 } },
        { questionId: 'q2', answerValue: 'paradigm', results: { 'innovation-champion': 5, 'synergy-specialist': 2 } },
        { questionId: 'q2', answerValue: 'optimize', results: { 'process-perfectionist': 5, 'meeting-master': 2 } },
        
        // Question 3: Your ideal workday ends with:
        { questionId: 'q3', answerValue: 'email-catchup', results: { 'process-perfectionist': 5, 'meeting-master': 3 } },
        { questionId: 'q3', answerValue: 'team-huddle', results: { 'synergy-specialist': 5, 'innovation-champion': 2 } },
        { questionId: 'q3', answerValue: 'innovation-session', results: { 'innovation-champion': 5, 'synergy-specialist': 2 } },
        { questionId: 'q3', answerValue: 'powerpoint-polish', results: { 'meeting-master': 5, 'process-perfectionist': 2 } }
      ],
      defaultResult: 'meeting-master'
    },
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date(),
    metadata: {
      views: 1800,
      completions: 1450,
      shares: 320,
      avgRating: 4.6,
      trendingScore: 85
    },
    questions: [
      {
        id: 'q1',
        question: 'Your ideal meeting is:',
        options: [
          { id: 'a1', text: 'PowerPoint presentation with 50 slides', value: 'powerpoint' },
          { id: 'a2', text: 'Brainstorming session with sticky notes', value: 'brainstorm' },
          { id: 'a3', text: 'Status update with detailed metrics', value: 'status-update' },
          { id: 'a4', text: 'Team building with trust falls', value: 'team-building' }
        ]
      },
      {
        id: 'q2',
        question: 'Your favorite corporate phrase is:',
        options: [
          { id: 'b1', text: 'Let\'s create synergy here', value: 'synergy' },
          { id: 'b2', text: 'We need to leverage our assets', value: 'leverage' },
          { id: 'b3', text: 'This is a paradigm shift', value: 'paradigm' },
          { id: 'b4', text: 'We should optimize this process', value: 'optimize' }
        ]
      },
      {
        id: 'q3',
        question: 'Your ideal workday ends with:',
        options: [
          { id: 'c1', text: 'Catching up on 200 unread emails', value: 'email-catchup' },
          { id: 'c2', text: 'Team huddle with motivational quotes', value: 'team-huddle' },
          { id: 'c3', text: 'Innovation session with whiteboards', value: 'innovation-session' },
          { id: 'c4', text: 'Polishing PowerPoint presentations', value: 'powerpoint-polish' }
        ]
      }
    ],
    results: [
      { 
        id: 'meeting-master', 
        name: 'Meeting Master', 
        emoji: '📊', 
        description: 'You could schedule a meeting to discuss scheduling meetings! Your calendar is a work of art!', 
        color: 'bg-blue-500',
        personalizedMessage: 'You\'ve perfected the art of corporate meetings. You can make a 2-hour meeting feel like 2 minutes, and you\'ve never met a PowerPoint presentation you couldn\'t make longer. Your calendar is booked solid until 2026.'
      },
      { 
        id: 'synergy-specialist', 
        name: 'Synergy Specialist', 
        emoji: '🤝', 
        description: 'You create synergy like it\'s going out of style! Every conversation is a "collaborative opportunity"!', 
        color: 'bg-green-500',
        personalizedMessage: 'You\'re the master of corporate buzzwords. You can turn "let\'s work together" into a 20-minute speech about synergy, collaboration, and leveraging our collective intelligence. Your LinkedIn is a masterpiece of corporate speak.'
      },
      { 
        id: 'process-perfectionist', 
        name: 'Process Perfectionist', 
        emoji: '⚙️', 
        description: 'You have a process for everything, including how to create processes! Your spreadsheets have spreadsheets!', 
        color: 'bg-purple-500',
        personalizedMessage: 'You\'ve created so many processes that you need a process to manage your processes. Your Excel skills are legendary, and you can create a pivot table that would make accountants weep with joy. You\'ve never met a problem that couldn\'t be solved with a flowchart.'
      },
      { 
        id: 'innovation-champion', 
        name: 'Innovation Champion', 
        emoji: '💡', 
        description: 'You innovate so hard, you\'re basically a human lightbulb! Every idea is "disruptive" and "game-changing"!', 
        color: 'bg-yellow-500',
        personalizedMessage: 'You\'re the corporate equivalent of a startup founder, but with a salary and benefits. You\'ve never met a problem that couldn\'t be solved with "innovative thinking" and "outside-the-box solutions." Your whiteboard is a work of art.'
      },
      { 
        id: 'email-warrior', 
        name: 'Email Warrior', 
        emoji: '📧', 
        description: 'You battle through 500 emails daily like a corporate gladiator! Your inbox is your battlefield!', 
        color: 'bg-red-500',
        personalizedMessage: 'You\'ve mastered the art of corporate email warfare. You can reply to 50 emails in the time it takes others to write one. Your signature is longer than most people\'s emails, and you\'ve never met a "reply all" you couldn\'t handle.'
      }
    ]
  },
  {
    id: 'office-politics',
    title: 'Which Office Politics Player Are You?',
    description: 'Navigate the corporate jungle like a pro!',
    emoji: '🕴️',
    category: 'lifestyle',
    tags: ['office', 'politics', 'corporate', 'personality'],
    isViral: true,
    isFeatured: false,
    defaultLanguage: 'en',
    defaultTheme: 'dark',
    defaultCustomization: {
      enablePersonalization: true,
      personalizationFields: ['name'],
      showProgress: true,
      showShareButtons: true,
      allowRetake: true
    },
    scoringConfig: {
      rules: [
        // Question 1: Your ideal office strategy is:
        { questionId: 'q1', answerValue: 'coffee-chat', results: { 'coffee-diplomat': 5, 'lunch-networker': 3 } },
        { questionId: 'q1', answerValue: 'email-cc', results: { 'cc-master': 5, 'coffee-diplomat': 2 } },
        { questionId: 'q1', answerValue: 'meeting-presence', results: { 'meeting-dominator': 5, 'lunch-networker': 3 } },
        { questionId: 'q1', answerValue: 'lunch-networking', results: { 'lunch-networker': 5, 'coffee-diplomat': 2 } },
        
        // Question 2: Your favorite office move is:
        { questionId: 'q2', answerValue: 'credit-steal', results: { 'credit-thief': 5, 'meeting-dominator': 3 } },
        { questionId: 'q2', answerValue: 'blame-shift', results: { 'blame-master': 5, 'cc-master': 3 } },
        { questionId: 'q2', answerValue: 'gossip-spread', results: { 'gossip-queen': 5, 'lunch-networker': 2 } },
        { questionId: 'q2', answerValue: 'alliance-build', results: { 'alliance-builder': 5, 'coffee-diplomat': 3 } },
        
        // Question 3: Your ideal office weapon is:
        { questionId: 'q3', answerValue: 'passive-aggressive', results: { 'passive-aggressive-pro': 5, 'cc-master': 3 } },
        { questionId: 'q3', answerValue: 'meeting-interruption', results: { 'meeting-dominator': 5, 'credit-thief': 2 } },
        { questionId: 'q3', answerValue: 'email-bomb', results: { 'cc-master': 5, 'blame-master': 2 } },
        { questionId: 'q3', answerValue: 'social-manipulation', results: { 'gossip-queen': 5, 'alliance-builder': 3 } }
      ],
      defaultResult: 'coffee-diplomat'
    },
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date(),
    metadata: {
      views: 2000,
      completions: 1600,
      shares: 380,
      avgRating: 4.8,
      trendingScore: 92
    },
    questions: [
      {
        id: 'q1',
        question: 'Your ideal office strategy is:',
        options: [
          { id: 'a1', text: 'Coffee chat with the boss', value: 'coffee-chat' },
          { id: 'a2', text: 'CC everyone on important emails', value: 'email-cc' },
          { id: 'a3', text: 'Dominate every meeting', value: 'meeting-presence' },
          { id: 'a4', text: 'Lunch networking sessions', value: 'lunch-networking' }
        ]
      },
      {
        id: 'q2',
        question: 'Your favorite office move is:',
        options: [
          { id: 'b1', text: 'Taking credit for others\' work', value: 'credit-steal' },
          { id: 'b2', text: 'Shifting blame to colleagues', value: 'blame-shift' },
          { id: 'b3', text: 'Spreading office gossip', value: 'gossip-spread' },
          { id: 'b4', text: 'Building strategic alliances', value: 'alliance-build' }
        ]
      },
      {
        id: 'q3',
        question: 'Your ideal office weapon is:',
        options: [
          { id: 'c1', text: 'Passive-aggressive emails', value: 'passive-aggressive' },
          { id: 'c2', text: 'Meeting interruptions', value: 'meeting-interruption' },
          { id: 'c3', text: 'Email bombing campaigns', value: 'email-bomb' },
          { id: 'c4', text: 'Social manipulation', value: 'social-manipulation' }
        ]
      }
    ],
    results: [
      { 
        id: 'coffee-diplomat', 
        name: 'Coffee Diplomat', 
        emoji: '☕', 
        description: 'You solve office conflicts over coffee! Your diplomatic skills are legendary in the break room!', 
        color: 'bg-brown-500',
        personalizedMessage: 'You\'re the office equivalent of a UN diplomat. You can resolve any conflict with a well-timed coffee invitation and a sympathetic ear. Your break room conversations are more productive than most board meetings.'
      },
      { 
        id: 'cc-master', 
        name: 'CC Master', 
        emoji: '📧', 
        description: 'You CC everyone on everything! Your email game is so strong, people fear your "reply all"!', 
        color: 'bg-blue-500',
        personalizedMessage: 'You\'ve mastered the art of the CC. You can make any email look important by adding the right people to the thread. Your "reply all" game is so strong, people have started creating email filters just for you.'
      },
      { 
        id: 'meeting-dominator', 
        name: 'Meeting Dominator', 
        emoji: '🎯', 
        description: 'You own every meeting! Your PowerPoint skills are so good, people forget what the meeting was about!', 
        color: 'bg-red-500',
        personalizedMessage: 'You\'re the meeting equivalent of a chess grandmaster. You can turn any discussion into a 2-hour presentation about your latest project. Your PowerPoint skills are so advanced, you could probably animate a spreadsheet.'
      },
      { 
        id: 'lunch-networker', 
        name: 'Lunch Networker', 
        emoji: '🍽️', 
        description: 'You network over every meal! Your lunch calendar is more booked than a celebrity chef\'s restaurant!', 
        color: 'bg-green-500',
        personalizedMessage: 'You\'ve turned lunch into an art form. You can network over a sandwich like it\'s a high-stakes business deal. Your lunch calendar is so packed, you\'ve started scheduling breakfast meetings and dinner follow-ups.'
      },
      { 
        id: 'gossip-queen', 
        name: 'Gossip Queen', 
        emoji: '👑', 
        description: 'You know everything about everyone! Your office intel is more valuable than the company\'s trade secrets!', 
        color: 'bg-pink-500',
        personalizedMessage: 'You\'re the office equivalent of a CIA operative. You know who\'s dating whom, who\'s getting promoted, and who\'s about to quit before they even know it. Your information network is more efficient than the company\'s internal communication system.'
      },
      { 
        id: 'credit-thief', 
        name: 'Credit Thief', 
        emoji: '🎭', 
        description: 'You\'re a master of taking credit! Your ability to claim others\' work as your own is legendary!', 
        color: 'bg-orange-500',
        personalizedMessage: 'You\'ve perfected the art of the credit grab. You can turn any team effort into your personal victory, and your ability to phrase things just right makes it seem like you did all the work. Your colleagues are both impressed and slightly terrified of your skills.'
      },
      { 
        id: 'blame-master', 
        name: 'Blame Master', 
        emoji: '🎯', 
        description: 'You\'re the office scapegoat specialist! Your blame-shifting skills are unmatched!', 
        color: 'bg-red-500',
        personalizedMessage: 'You\'re the office equivalent of a professional deflector. You can turn any crisis into someone else\'s problem with just a few well-chosen words. Your ability to redirect blame is so advanced, you could probably blame the weather for a missed deadline.'
      },
      { 
        id: 'alliance-builder', 
        name: 'Alliance Builder', 
        emoji: '🤝', 
        description: 'You\'re the master of office alliances! Your networking and relationship-building skills are legendary!', 
        color: 'bg-indigo-500',
        personalizedMessage: 'You\'re the office equivalent of a political strategist. You can build alliances that would make Game of Thrones characters jealous. Your ability to bring people together for common goals is so advanced, you could probably get cats to collaborate on a project.'
      },
      { 
        id: 'passive-aggressive-pro', 
        name: 'Passive-Aggressive Pro', 
        emoji: '😏', 
        description: 'You\'re the master of subtle office warfare! Your passive-aggressive skills are legendary!', 
        color: 'bg-gray-500',
        personalizedMessage: 'You\'re the office equivalent of a ninja. You can deliver the most cutting remarks with a smile, and your ability to make people feel guilty without saying anything directly is unmatched. Your passive-aggressive game is so strong, people start apologizing before you even finish your sentence.'
      }
    ]
  },
  {
    id: 'meeting-culture',
    title: 'Which Meeting Culture Are You?',
    description: 'Discover your meeting personality!',
    emoji: '📅',
    category: 'lifestyle',
    tags: ['meetings', 'corporate', 'culture', 'personality'],
    isViral: true,
    isFeatured: false,
    defaultLanguage: 'en',
    defaultTheme: 'default',
    defaultCustomization: {
      enablePersonalization: true,
      personalizationFields: ['name'],
      showProgress: true,
      showShareButtons: true,
      allowRetake: true
    },
    scoringConfig: {
      rules: [
        // Question 1: Your ideal meeting duration is:
        { questionId: 'q1', answerValue: '15-min', results: { 'efficiency-expert': 5, 'time-master': 3 } },
        { questionId: 'q1', answerValue: '1-hour', results: { 'meeting-marathoner': 5, 'efficiency-expert': 2 } },
        { questionId: 'q1', answerValue: 'all-day', results: { 'meeting-marathoner': 5, 'time-master': 2 } },
        { questionId: 'q1', answerValue: 'flexible', results: { 'time-master': 5, 'efficiency-expert': 3 } },
        
        // Question 2: Your favorite meeting tool is:
        { questionId: 'q2', answerValue: 'powerpoint', results: { 'slide-master': 5, 'meeting-marathoner': 3 } },
        { questionId: 'q2', answerValue: 'whiteboard', results: { 'whiteboard-wizard': 5, 'time-master': 2 } },
        { questionId: 'q2', answerValue: 'zoom', results: { 'zoom-commander': 5, 'efficiency-expert': 3 } },
        { questionId: 'q2', answerValue: 'sticky-notes', results: { 'sticky-note-sage': 5, 'whiteboard-wizard': 2 } },
        
        // Question 3: Your ideal meeting outcome is:
        { questionId: 'q3', answerValue: 'action-items', results: { 'efficiency-expert': 5, 'time-master': 3 } },
        { questionId: 'q3', answerValue: 'follow-up', results: { 'meeting-marathoner': 5, 'slide-master': 3 } },
        { questionId: 'q3', answerValue: 'consensus', results: { 'consensus-builder': 5, 'whiteboard-wizard': 2 } },
        { questionId: 'q3', answerValue: 'next-meeting', results: { 'meeting-marathoner': 5, 'zoom-commander': 2 } }
      ],
      defaultResult: 'efficiency-expert'
    },
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date(),
    metadata: {
      views: 1600,
      completions: 1280,
      shares: 280,
      avgRating: 4.5,
      trendingScore: 82
    },
    questions: [
      {
        id: 'q1',
        question: 'Your ideal meeting duration is:',
        options: [
          { id: 'a1', text: '15 minutes (get in, get out)', value: '15-min' },
          { id: 'a2', text: '1 hour (proper discussion)', value: '1-hour' },
          { id: 'a3', text: 'All day (deep dive)', value: 'all-day' },
          { id: 'a4', text: 'Flexible (depends on the topic)', value: 'flexible' }
        ]
      },
      {
        id: 'q2',
        question: 'Your favorite meeting tool is:',
        options: [
          { id: 'b1', text: 'PowerPoint presentations', value: 'powerpoint' },
          { id: 'b2', text: 'Whiteboard brainstorming', value: 'whiteboard' },
          { id: 'b3', text: 'Zoom video calls', value: 'zoom' },
          { id: 'b4', text: 'Sticky notes everywhere', value: 'sticky-notes' }
        ]
      },
      {
        id: 'q3',
        question: 'Your ideal meeting outcome is:',
        options: [
          { id: 'c1', text: 'Clear action items', value: 'action-items' },
          { id: 'c2', text: 'Follow-up meeting scheduled', value: 'follow-up' },
          { id: 'c3', text: 'Team consensus reached', value: 'consensus' },
          { id: 'c4', text: 'Next meeting planned', value: 'next-meeting' }
        ]
      }
    ],
    results: [
      { 
        id: 'efficiency-expert', 
        name: 'Efficiency Expert', 
        emoji: '⚡', 
        description: 'You can solve world hunger in a 15-minute standup! Your meetings are legendary for their brevity!', 
        color: 'bg-green-500',
        personalizedMessage: 'You\'re the meeting equivalent of a Formula 1 pit crew. You can extract more value from a 15-minute meeting than most people get from a 2-hour session. Your action items are so clear, they practically execute themselves.'
      },
      { 
        id: 'meeting-marathoner', 
        name: 'Meeting Marathoner', 
        emoji: '🏃‍♂️', 
        description: 'You can turn a 5-minute chat into a 3-hour deep dive! Your endurance is unmatched!', 
        color: 'bg-blue-500',
        personalizedMessage: 'You\'re the meeting equivalent of an ultramarathon runner. You can discuss the same topic for hours without breaking a sweat. Your meetings are so thorough, they could be used as training materials for new employees.'
      },
      { 
        id: 'slide-master', 
        name: 'Slide Master', 
        emoji: '📊', 
        description: 'Your PowerPoint skills are so good, you could animate a spreadsheet! Every slide tells a story!', 
        color: 'bg-purple-500',
        personalizedMessage: 'You\'re the meeting equivalent of a Hollywood director. You can turn the most boring data into a cinematic experience. Your PowerPoint presentations are so engaging, people actually look forward to your meetings.'
      },
      { 
        id: 'whiteboard-wizard', 
        name: 'Whiteboard Wizard', 
        emoji: '🧙‍♂️', 
        description: 'You can turn any whiteboard into a masterpiece! Your diagrams are works of art!', 
        color: 'bg-yellow-500',
        personalizedMessage: 'You\'re the meeting equivalent of a Renaissance artist. You can visualize complex concepts with a few strokes of a marker. Your whiteboard skills are so advanced, you could probably draw a flowchart that would make architects jealous.'
      },
      { 
        id: 'zoom-commander', 
        name: 'Zoom Commander', 
        emoji: '📹', 
        description: 'You rule the virtual meeting space! Your screen sharing skills are legendary!', 
        color: 'bg-cyan-500',
        personalizedMessage: 'You\'re the meeting equivalent of a tech wizard. You can troubleshoot any technical issue while maintaining perfect eye contact with the camera. Your virtual meeting skills are so advanced, you could probably host a conference call from a coffee shop.'
      },
      { 
        id: 'time-master', 
        name: 'Time Master', 
        emoji: '⏰', 
        description: 'You\'re the master of meeting timing! Your ability to manage time is legendary!', 
        color: 'bg-indigo-500',
        personalizedMessage: 'You\'re the meeting equivalent of a Swiss watch. You can time meetings to the second and always know exactly when to wrap things up. Your time management skills are so precise, you could probably schedule a meeting with a stopwatch.'
      },
      { 
        id: 'sticky-note-sage', 
        name: 'Sticky Note Sage', 
        emoji: '📝', 
        description: 'You\'re the master of sticky note organization! Your note-taking skills are legendary!', 
        color: 'bg-yellow-500',
        personalizedMessage: 'You\'re the meeting equivalent of a librarian. You can organize information on sticky notes like it\'s a work of art, and your ability to capture every important detail is unmatched. Your sticky note skills are so advanced, you could probably organize a hurricane.'
      },
      { 
        id: 'consensus-builder', 
        name: 'Consensus Builder', 
        emoji: '🤝', 
        description: 'You\'re the master of building consensus! Your facilitation skills are legendary!', 
        color: 'bg-green-500',
        personalizedMessage: 'You\'re the meeting equivalent of a diplomat. You can get everyone to agree on anything, even if they started with completely opposite views. Your consensus-building skills are so advanced, you could probably get cats to agree on a dinner menu.'
      }
    ]
  },
  {
    id: 'workplace-personality',
    title: 'Which Workplace Personality Are You?',
    description: 'Discover your office alter ego!',
    emoji: '💼',
    category: 'lifestyle',
    tags: ['workplace', 'personality', 'office', 'culture'],
    isViral: true,
    isFeatured: false,
    defaultLanguage: 'en',
    defaultTheme: 'vibrant',
    defaultCustomization: {
      enablePersonalization: true,
      personalizationFields: ['name'],
      showProgress: true,
      showShareButtons: true,
      allowRetake: true
    },
    scoringConfig: {
      rules: [
        // Question 1: Your ideal workspace is:
        { questionId: 'q1', answerValue: 'open-office', results: { 'social-butterfly': 5, 'collaboration-king': 3 } },
        { questionId: 'q1', answerValue: 'private-office', results: { 'hermit-genius': 5, 'focus-master': 3 } },
        { questionId: 'q1', answerValue: 'coffee-shop', results: { 'digital-nomad': 5, 'social-butterfly': 2 } },
        { questionId: 'q1', answerValue: 'home-office', results: { 'work-life-balancer': 5, 'hermit-genius': 2 } },
        
        // Question 2: Your ideal work style is:
        { questionId: 'q2', answerValue: 'collaborative', results: { 'collaboration-king': 5, 'social-butterfly': 3 } },
        { questionId: 'q2', answerValue: 'independent', results: { 'hermit-genius': 5, 'focus-master': 3 } },
        { questionId: 'q2', answerValue: 'flexible', results: { 'work-life-balancer': 5, 'digital-nomad': 3 } },
        { questionId: 'q2', answerValue: 'structured', results: { 'process-perfectionist': 5, 'focus-master': 2 } },
        
        // Question 3: Your ideal workday ends with:
        { questionId: 'q3', answerValue: 'team-drinks', results: { 'social-butterfly': 5, 'collaboration-king': 3 } },
        { questionId: 'q3', answerValue: 'quiet-reflection', results: { 'hermit-genius': 5, 'focus-master': 3 } },
        { questionId: 'q3', answerValue: 'workout-session', results: { 'work-life-balancer': 5, 'digital-nomad': 2 } },
        { questionId: 'q3', answerValue: 'planning-tomorrow', results: { 'process-perfectionist': 5, 'focus-master': 2 } }
      ],
      defaultResult: 'social-butterfly'
    },
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date(),
    metadata: {
      views: 2200,
      completions: 1760,
      shares: 420,
      avgRating: 4.7,
      trendingScore: 90
    },
    questions: [
      {
        id: 'q1',
        question: 'Your ideal workspace is:',
        options: [
          { id: 'a1', text: 'Open office with lots of people', value: 'open-office' },
          { id: 'a2', text: 'Private office with a door', value: 'private-office' },
          { id: 'a3', text: 'Coffee shop with ambient noise', value: 'coffee-shop' },
          { id: 'a4', text: 'Home office with perfect setup', value: 'home-office' }
        ]
      },
      {
        id: 'q2',
        question: 'Your ideal work style is:',
        options: [
          { id: 'b1', text: 'Collaborative and team-focused', value: 'collaborative' },
          { id: 'b2', text: 'Independent and self-directed', value: 'independent' },
          { id: 'b3', text: 'Flexible and adaptable', value: 'flexible' },
          { id: 'b4', text: 'Structured and organized', value: 'structured' }
        ]
      },
      {
        id: 'q3',
        question: 'Your ideal workday ends with:',
        options: [
          { id: 'c1', text: 'Team drinks and socializing', value: 'team-drinks' },
          { id: 'c2', text: 'Quiet reflection and planning', value: 'quiet-reflection' },
          { id: 'c3', text: 'Workout session and self-care', value: 'workout-session' },
          { id: 'c4', text: 'Planning tomorrow\'s tasks', value: 'planning-tomorrow' }
        ]
      }
    ],
    results: [
      { 
        id: 'social-butterfly', 
        name: 'Social Butterfly', 
        emoji: '🦋', 
        description: 'You know everyone in the office! Your networking skills are legendary, and you\'re the life of every meeting!', 
        color: 'bg-pink-500',
        personalizedMessage: 'You\'re the office equivalent of a social media influencer. You can turn any elevator ride into a networking opportunity, and your coffee break conversations are more productive than most board meetings. You\'ve never met a stranger, only friends you haven\'t made yet.'
      },
      { 
        id: 'hermit-genius', 
        name: 'Hermit Genius', 
        emoji: '🧙‍♂️', 
        description: 'You work in mysterious ways! Your productivity is legendary, and you emerge from your cave with solutions!', 
        color: 'bg-purple-500',
        personalizedMessage: 'You\'re the office equivalent of a wizard in a tower. You can solve problems that would stump entire teams, and you do it all from the comfort of your headphones. Your colleagues are convinced you have magical powers, and they\'re probably right.'
      },
      { 
        id: 'collaboration-king', 
        name: 'Collaboration King', 
        emoji: '👑', 
        description: 'You make teamwork look easy! Your facilitation skills are unmatched, and you\'re the glue that holds teams together!', 
        color: 'bg-blue-500',
        personalizedMessage: 'You\'re the office equivalent of a conductor leading an orchestra. You can make any group of people work together harmoniously, and your team-building skills are so advanced, you could probably get cats to collaborate on a project.'
      },
      { 
        id: 'work-life-balancer', 
        name: 'Work-Life Balancer', 
        emoji: '⚖️', 
        description: 'You\'ve mastered the art of balance! Your boundaries are legendary, and you\'re the poster child for healthy work habits!', 
        color: 'bg-green-500',
        personalizedMessage: 'You\'re the office equivalent of a zen master. You can maintain perfect work-life balance while still being incredibly productive. Your colleagues are in awe of your ability to leave work at work and live life to the fullest.'
      },
      { 
        id: 'process-perfectionist', 
        name: 'Process Perfectionist', 
        emoji: '⚙️', 
        description: 'You have a system for everything! Your organizational skills are legendary, and you could probably organize a hurricane!', 
        color: 'bg-orange-500',
        personalizedMessage: 'You\'re the office equivalent of a Swiss watchmaker. You can create processes so efficient, they practically run themselves. Your organizational skills are so advanced, you could probably organize a tornado and make it more efficient.'
      },
      { 
        id: 'focus-master', 
        name: 'Focus Master', 
        emoji: '🎯', 
        description: 'You\'re the master of deep focus! Your concentration skills are legendary, and you can tune out any distraction!', 
        color: 'bg-purple-500',
        personalizedMessage: 'You\'re the office equivalent of a meditation guru. You can focus on a single task for hours without breaking concentration, and your ability to tune out distractions is unmatched. Your focus skills are so advanced, you could probably work in a circus and still get work done.'
      }
    ]
  },
  {
    id: 'debugging-style',
    title: 'What\'s Your Debugging Style?',
    description: 'Discover your unique approach to solving bugs!',
    emoji: '🐛',
    category: 'personality',
    tags: ['debugging', 'programming', 'bugs', 'developer'],
    isViral: true,
    isFeatured: false,
    defaultLanguage: 'en',
    defaultTheme: 'dark',
    defaultCustomization: {
      enablePersonalization: true,
      personalizationFields: ['name'],
      showProgress: true,
      showShareButtons: true,
      allowRetake: true
    },
    scoringConfig: {
      rules: [
        // Question 1: When you encounter a bug, you:
        { questionId: 'q1', answerValue: 'console-log', results: { 'console-logger': 5, 'stack-overflow-hunter': 3 } },
        { questionId: 'q1', answerValue: 'google-search', results: { 'stack-overflow-hunter': 5, 'rubber-duck': 2 } },
        { questionId: 'q1', answerValue: 'talk-out-loud', results: { 'rubber-duck': 5, 'console-logger': 2 } },
        { questionId: 'q1', answerValue: 'rewrite-everything', results: { 'nuclear-option': 5, 'console-logger': 1 } },
        
        // Question 2: Your favorite debugging tool is:
        { questionId: 'q2', answerValue: 'debugger', results: { 'methodical-debugger': 5, 'stack-overflow-hunter': 2 } },
        { questionId: 'q2', answerValue: 'stack-overflow', results: { 'stack-overflow-hunter': 5, 'rubber-duck': 2 } },
        { questionId: 'q2', answerValue: 'rubber-duck', results: { 'rubber-duck': 5, 'methodical-debugger': 2 } },
        { questionId: 'q2', answerValue: 'delete-code', results: { 'nuclear-option': 5, 'console-logger': 1 } },
        
        // Question 3: When debugging fails, you:
        { questionId: 'q3', answerValue: 'add-more-logs', results: { 'console-logger': 5, 'methodical-debugger': 2 } },
        { questionId: 'q3', answerValue: 'search-again', results: { 'stack-overflow-hunter': 5, 'rubber-duck': 2 } },
        { questionId: 'q3', answerValue: 'explain-to-duck', results: { 'rubber-duck': 5, 'methodical-debugger': 2 } },
        { questionId: 'q3', answerValue: 'start-over', results: { 'nuclear-option': 5, 'console-logger': 1 } }
      ],
      defaultResult: 'console-logger'
    },
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date(),
    metadata: {
      views: 1500,
      completions: 1200,
      shares: 250,
      avgRating: 4.6,
      trendingScore: 85
    },
    questions: [
      {
        id: 'q1',
        question: 'When you encounter a bug, you:',
        options: [
          { id: 'a1', text: 'Add console.log() everywhere', value: 'console-log' },
          { id: 'a2', text: 'Google the error message', value: 'google-search' },
          { id: 'a3', text: 'Talk to your rubber duck', value: 'talk-out-loud' },
          { id: 'a4', text: 'Rewrite the entire function', value: 'rewrite-everything' }
        ]
      },
      {
        id: 'q2',
        question: 'Your favorite debugging tool is:',
        options: [
          { id: 'b1', text: 'Browser debugger', value: 'debugger' },
          { id: 'b2', text: 'Stack Overflow', value: 'stack-overflow' },
          { id: 'b3', text: 'Rubber duck', value: 'rubber-duck' },
          { id: 'b4', text: 'Delete button', value: 'delete-code' }
        ]
      },
      {
        id: 'q3',
        question: 'When debugging fails, you:',
        options: [
          { id: 'c1', text: 'Add more console.logs', value: 'add-more-logs' },
          { id: 'c2', text: 'Search for more solutions', value: 'search-again' },
          { id: 'c3', text: 'Explain the problem to your duck', value: 'explain-to-duck' },
          { id: 'c4', text: 'Start the project from scratch', value: 'start-over' }
        ]
      }
    ],
    results: [
      { 
        id: 'console-logger', 
        name: 'Console Logger', 
        emoji: '📝', 
        description: 'You debug with the power of console.log! Your code is a masterpiece of logging statements!', 
        color: 'bg-blue-500',
        personalizedMessage: 'You\'re the debugging equivalent of a detective with a magnifying glass. You can solve any mystery by adding enough console.logs, and your code looks like a diary of your debugging journey. You\'ve never met a variable you couldn\'t log.'
      },
      { 
        id: 'stack-overflow-hunter', 
        name: 'Stack Overflow Hunter', 
        emoji: '🔍', 
        description: 'You\'re the master of copy-paste debugging! Your Google-fu is legendary!', 
        color: 'bg-green-500',
        personalizedMessage: 'You\'re the debugging equivalent of a treasure hunter. You can find the perfect solution on Stack Overflow faster than most people can type "error". Your browser history is 90% Stack Overflow, and you\'ve never met a problem that couldn\'t be solved with the right search query.'
      },
      { 
        id: 'rubber-duck', 
        name: 'Rubber Duck', 
        emoji: '🦆', 
        description: 'You solve problems by talking to inanimate objects! Your rubber duck is your best debugging partner!', 
        color: 'bg-yellow-500',
        personalizedMessage: 'You\'re the debugging equivalent of a therapist. You can solve any problem by explaining it to your rubber duck, and your colleagues are convinced you have magical powers. Your rubber duck has heard more debugging stories than most people have heard in their lifetime.'
      },
      { 
        id: 'methodical-debugger', 
        name: 'Methodical Debugger', 
        emoji: '🔬', 
        description: 'You debug with scientific precision! Your systematic approach is unmatched!', 
        color: 'bg-purple-500',
        personalizedMessage: 'You\'re the debugging equivalent of a scientist. You can solve any problem by breaking it down into smaller pieces, and your debugging process is so systematic, it could be published in a research paper. You\'ve never met a bug that couldn\'t be solved with the right methodology.'
      },
      { 
        id: 'nuclear-option', 
        name: 'Nuclear Option', 
        emoji: '💥', 
        description: 'You solve problems by deleting everything and starting over! Your "fix" is always the nuclear option!', 
        color: 'bg-red-500',
        personalizedMessage: 'You\'re the debugging equivalent of a demolition expert. You can solve any problem by deleting the entire codebase and starting fresh, and your approach is so extreme, it makes other developers question their life choices. You\'ve never met a bug that couldn\'t be solved with a complete rewrite.'
      }
    ]
  },
  {
    id: 'git-commit-style',
    title: 'What\'s Your Git Commit Style?',
    description: 'Discover your unique approach to version control!',
    emoji: '📝',
    category: 'personality',
    tags: ['git', 'version-control', 'commits', 'developer'],
    isViral: true,
    isFeatured: false,
    defaultLanguage: 'en',
    defaultTheme: 'minimal',
    defaultCustomization: {
      enablePersonalization: true,
      personalizationFields: ['name'],
      showProgress: true,
      showShareButtons: true,
      allowRetake: true
    },
    scoringConfig: {
      rules: [
        // Question 1: Your typical commit message is:
        { questionId: 'q1', answerValue: 'fix-typo', results: { 'fix-master': 5, 'emoji-committer': 2 } },
        { questionId: 'q1', answerValue: 'wip', results: { 'wip-king': 5, 'fix-master': 1 } },
        { questionId: 'q1', answerValue: 'emoji-commit', results: { 'emoji-committer': 5, 'wip-king': 2 } },
        { questionId: 'q1', answerValue: 'novel-commit', results: { 'novel-writer': 5, 'emoji-committer': 2 } },
        
        // Question 2: You commit when:
        { questionId: 'q2', answerValue: 'every-change', results: { 'commit-addict': 5, 'fix-master': 2 } },
        { questionId: 'q2', answerValue: 'feature-done', results: { 'feature-completer': 5, 'commit-addict': 2 } },
        { questionId: 'q2', answerValue: 'end-of-day', results: { 'daily-committer': 5, 'feature-completer': 2 } },
        { questionId: 'q2', answerValue: 'never', results: { 'commit-phobic': 5, 'daily-committer': 1 } },
        
        // Question 3: Your commit frequency is:
        { questionId: 'q3', answerValue: 'every-minute', results: { 'commit-addict': 5, 'wip-king': 2 } },
        { questionId: 'q3', answerValue: 'when-working', results: { 'feature-completer': 5, 'daily-committer': 2 } },
        { questionId: 'q3', answerValue: 'end-of-day', results: { 'daily-committer': 5, 'feature-completer': 2 } },
        { questionId: 'q3', answerValue: 'what-is-commit', results: { 'commit-phobic': 5, 'daily-committer': 1 } }
      ],
      defaultResult: 'fix-master'
    },
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date(),
    metadata: {
      views: 1800,
      completions: 1450,
      shares: 320,
      avgRating: 4.7,
      trendingScore: 88
    },
    questions: [
      {
        id: 'q1',
        question: 'Your typical commit message is:',
        options: [
          { id: 'a1', text: 'fix typo', value: 'fix-typo' },
          { id: 'a2', text: 'wip', value: 'wip' },
          { id: 'a3', text: '✨ Add amazing feature', value: 'emoji-commit' },
          { id: 'a4', text: 'A comprehensive refactoring of the entire system...', value: 'novel-commit' }
        ]
      },
      {
        id: 'q2',
        question: 'You commit when:',
        options: [
          { id: 'b1', text: 'Every single change', value: 'every-change' },
          { id: 'b2', text: 'Feature is complete', value: 'feature-done' },
          { id: 'b3', text: 'End of the day', value: 'end-of-day' },
          { id: 'b4', text: 'What is commit?', value: 'never' }
        ]
      },
      {
        id: 'q3',
        question: 'Your commit frequency is:',
        options: [
          { id: 'c1', text: 'Every minute', value: 'every-minute' },
          { id: 'c2', text: 'When I finish something', value: 'when-working' },
          { id: 'c3', text: 'End of each day', value: 'end-of-day' },
          { id: 'c4', text: 'What is commit?', value: 'what-is-commit' }
        ]
      }
    ],
    results: [
      { 
        id: 'fix-master', 
        name: 'Fix Master', 
        emoji: '🔧', 
        description: 'You\'re the master of "fix typo" commits! Your commit history is a masterpiece of fixes!', 
        color: 'bg-orange-500',
        personalizedMessage: 'You\'re the commit equivalent of a handyman. You can fix any typo, and your commit history looks like a repair log. You\'ve never met a typo you couldn\'t fix, and your colleagues are convinced you have a sixth sense for spotting errors.'
      },
      { 
        id: 'wip-king', 
        name: 'WIP King', 
        emoji: '👑', 
        description: 'You\'re the king of "wip" commits! Your work-in-progress game is legendary!', 
        color: 'bg-yellow-500',
        personalizedMessage: 'You\'re the commit equivalent of a work-in-progress specialist. You can turn any incomplete feature into a WIP commit, and your commit history looks like a construction site. You\'ve never met a feature you couldn\'t mark as WIP, and your colleagues are convinced you\'re always in the middle of something.'
      },
      { 
        id: 'emoji-committer', 
        name: 'Emoji Committer', 
        emoji: '🎨', 
        description: 'You make commits beautiful with emojis! Your commit messages are works of art!', 
        color: 'bg-pink-500',
        personalizedMessage: 'You\'re the commit equivalent of an artist. You can turn any change into a beautiful emoji-filled commit message, and your commit history looks like a rainbow. You\'ve never met a commit that couldn\'t be improved with the right emoji, and your colleagues are convinced you have a PhD in emoji studies.'
      },
      { 
        id: 'commit-addict', 
        name: 'Commit Addict', 
        emoji: '💉', 
        description: 'You commit every single change! Your commit frequency is unmatched!', 
        color: 'bg-blue-500',
        personalizedMessage: 'You\'re the commit equivalent of a caffeine addict. You can commit every single change, and your commit history looks like a heartbeat monitor. You\'ve never met a change that couldn\'t be committed, and your colleagues are convinced you have a commit button permanently pressed.'
      },
      { 
        id: 'novel-writer', 
        name: 'Novel Writer', 
        emoji: '📚', 
        description: 'You write commit messages like novels! Your documentation skills are legendary!', 
        color: 'bg-purple-500',
        personalizedMessage: 'You\'re the commit equivalent of a novelist. You can turn any change into a comprehensive commit message, and your commit history looks like a library. You\'ve never met a change that couldn\'t be documented in detail, and your colleagues are convinced you\'re writing the next great American novel in your commit messages.'
      },
      { 
        id: 'commit-phobic', 
        name: 'Commit Phobic', 
        emoji: '😱', 
        description: 'You\'re terrified of commits! Your fear of version control is legendary!', 
        color: 'bg-red-500',
        personalizedMessage: 'You\'re the commit equivalent of someone who\'s afraid of the dark. You can avoid commits like the plague, and your commit history looks like a ghost town. You\'ve never met a change that couldn\'t be avoided, and your colleagues are convinced you\'re living in a parallel universe where version control doesn\'t exist.'
      }
    ]
  },
  {
    id: 'code-review-style',
    title: 'What\'s Your Code Review Style?',
    description: 'Discover your unique approach to reviewing code!',
    emoji: '👀',
    category: 'personality',
    tags: ['code-review', 'programming', 'teamwork', 'developer'],
    isViral: true,
    isFeatured: false,
    defaultLanguage: 'en',
    defaultTheme: 'default',
    defaultCustomization: {
      enablePersonalization: true,
      personalizationFields: ['name'],
      showProgress: true,
      showShareButtons: true,
      allowRetake: true
    },
    scoringConfig: {
      rules: [
        // Question 1: Your typical code review comment is:
        { questionId: 'q1', answerValue: 'nitpick', results: { 'nitpicker': 5, 'perfectionist': 3 } },
        { questionId: 'q1', answerValue: 'approve', results: { 'approver': 5, 'nitpicker': 1 } },
        { questionId: 'q1', answerValue: 'suggest', results: { 'suggester': 5, 'approver': 2 } },
        { questionId: 'q1', answerValue: 'rewrite', results: { 'rewriter': 5, 'suggester': 2 } },
        
        // Question 2: You review code by:
        { questionId: 'q2', answerValue: 'line-by-line', results: { 'perfectionist': 5, 'nitpicker': 3 } },
        { questionId: 'q2', answerValue: 'quick-scan', results: { 'approver': 5, 'perfectionist': 1 } },
        { questionId: 'q2', answerValue: 'focus-areas', results: { 'suggester': 5, 'approver': 2 } },
        { questionId: 'q2', answerValue: 'rewrite-everything', results: { 'rewriter': 5, 'suggester': 2 } },
        
        // Question 3: Your review frequency is:
        { questionId: 'q3', answerValue: 'immediately', results: { 'perfectionist': 5, 'nitpicker': 3 } },
        { questionId: 'q3', answerValue: 'when-asked', results: { 'approver': 5, 'perfectionist': 2 } },
        { questionId: 'q3', answerValue: 'selectively', results: { 'suggester': 5, 'approver': 2 } },
        { questionId: 'q3', answerValue: 'never', results: { 'ghost-reviewer': 5, 'approver': 1 } }
      ],
      defaultResult: 'approver'
    },
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date(),
    metadata: {
      views: 2000,
      completions: 1600,
      shares: 380,
      avgRating: 4.8,
      trendingScore: 90
    },
    questions: [
      {
        id: 'q1',
        question: 'Your typical code review comment is:',
        options: [
          { id: 'a1', text: 'Missing semicolon on line 42', value: 'nitpick' },
          { id: 'a2', text: 'LGTM 👍', value: 'approve' },
          { id: 'a3', text: 'Consider using a different approach', value: 'suggest' },
          { id: 'a4', text: 'This should be completely rewritten', value: 'rewrite' }
        ]
      },
      {
        id: 'q2',
        question: 'You review code by:',
        options: [
          { id: 'b1', text: 'Line by line analysis', value: 'line-by-line' },
          { id: 'b2', text: 'Quick scan and approve', value: 'quick-scan' },
          { id: 'b3', text: 'Focus on key areas', value: 'focus-areas' },
          { id: 'b4', text: 'Rewrite everything', value: 'rewrite-everything' }
        ]
      },
      {
        id: 'q3',
        question: 'Your review frequency is:',
        options: [
          { id: 'c1', text: 'Immediately when PR is created', value: 'immediately' },
          { id: 'c2', text: 'When specifically asked', value: 'when-asked' },
          { id: 'c3', text: 'Only for important changes', value: 'selectively' },
          { id: 'c4', text: 'What is code review?', value: 'never' }
        ]
      }
    ],
    results: [
      { 
        id: 'nitpicker', 
        name: 'Nitpicker', 
        emoji: '🔍', 
        description: 'You find every tiny issue! Your attention to detail is legendary!', 
        color: 'bg-yellow-500',
        personalizedMessage: 'You\'re the code review equivalent of a forensic scientist. You can find every missing semicolon, every typo, and every formatting issue, and your reviews are so detailed, they could be used as training materials. You\'ve never met a code that couldn\'t be improved with your nitpicking skills.'
      },
      { 
        id: 'approver', 
        name: 'Approver', 
        emoji: '✅', 
        description: 'You approve everything! Your trust in your team is unmatched!', 
        color: 'bg-green-500',
        personalizedMessage: 'You\'re the code review equivalent of a cheerleader. You can approve any code with enthusiasm, and your reviews are so positive, they make everyone feel good about their work. You\'ve never met a PR that couldn\'t be approved, and your colleagues are convinced you have a permanent thumbs-up emoji.'
      },
      { 
        id: 'suggester', 
        name: 'Suggester', 
        emoji: '💡', 
        description: 'You suggest improvements! Your constructive feedback is legendary!', 
        color: 'bg-blue-500',
        personalizedMessage: 'You\'re the code review equivalent of a mentor. You can suggest improvements that make everyone better, and your reviews are so helpful, they could be used as learning materials. You\'ve never met a code that couldn\'t be improved with your suggestions, and your colleagues are convinced you have a PhD in code improvement.'
      },
      { 
        id: 'rewriter', 
        name: 'Rewriter', 
        emoji: '🔄', 
        description: 'You rewrite everything! Your perfectionism is unmatched!', 
        color: 'bg-red-500',
        personalizedMessage: 'You\'re the code review equivalent of a perfectionist. You can rewrite any code to make it perfect, and your reviews are so thorough, they could be used as examples of excellence. You\'ve never met a code that couldn\'t be improved with a complete rewrite, and your colleagues are convinced you have a PhD in code perfection.'
      },
      { 
        id: 'perfectionist', 
        name: 'Perfectionist', 
        emoji: '🎯', 
        description: 'You demand perfection! Your standards are legendary!', 
        color: 'bg-purple-500',
        personalizedMessage: 'You\'re the code review equivalent of a quality inspector. You can find every issue and demand perfection, and your reviews are so thorough, they could be used as quality standards. You\'ve never met a code that couldn\'t be improved with your perfectionist approach, and your colleagues are convinced you have a PhD in code quality.'
      },
      { 
        id: 'ghost-reviewer', 
        name: 'Ghost Reviewer', 
        emoji: '👻', 
        description: 'You never review code! Your invisibility is legendary!', 
        color: 'bg-gray-500',
        personalizedMessage: 'You\'re the code review equivalent of a ghost. You can avoid reviews like the plague, and your presence is so invisible, your colleagues are convinced you don\'t exist. You\'ve never met a PR that couldn\'t be ignored, and your colleagues are convinced you\'re living in a parallel universe where code reviews don\'t exist.'
      }
    ]
  },
  {
    id: 'stack-overflow-user',
    title: 'What Type of Stack Overflow User Are You?',
    description: 'Discover your unique approach to the developer\'s best friend!',
    emoji: '📚',
    category: 'personality',
    tags: ['stack-overflow', 'programming', 'community', 'developer'],
    isViral: true,
    isFeatured: false,
    defaultLanguage: 'en',
    defaultTheme: 'vibrant',
    defaultCustomization: {
      enablePersonalization: true,
      personalizationFields: ['name'],
      showProgress: true,
      showShareButtons: true,
      allowRetake: true
    },
    scoringConfig: {
      rules: [
        // Question 1: Your typical Stack Overflow question is:
        { questionId: 'q1', answerValue: 'homework', results: { 'homework-asker': 5, 'duplicate-finder': 2 } },
        { questionId: 'q1', answerValue: 'duplicate', results: { 'duplicate-finder': 5, 'homework-asker': 2 } },
        { questionId: 'q1', answerValue: 'expert', results: { 'expert-answerer': 5, 'duplicate-finder': 2 } },
        { questionId: 'q1', answerValue: 'downvoter', results: { 'downvote-master': 5, 'expert-answerer': 2 } },
        
        // Question 2: You use Stack Overflow to:
        { questionId: 'q2', answerValue: 'copy-paste', results: { 'copy-paster': 5, 'homework-asker': 2 } },
        { questionId: 'q2', answerValue: 'learn', results: { 'learner': 5, 'copy-paster': 2 } },
        { questionId: 'q2', answerValue: 'help-others', results: { 'helper': 5, 'learner': 2 } },
        { questionId: 'q2', answerValue: 'judge', results: { 'judge': 5, 'helper': 2 } },
        
        // Question 3: Your Stack Overflow reputation is:
        { questionId: 'q3', answerValue: 'negative', results: { 'homework-asker': 5, 'duplicate-finder': 2 } },
        { questionId: 'q3', answerValue: 'low', results: { 'copy-paster': 5, 'homework-asker': 2 } },
        { questionId: 'q3', answerValue: 'high', results: { 'expert-answerer': 5, 'helper': 2 } },
        { questionId: 'q3', answerValue: 'legendary', results: { 'stack-overflow-god': 5, 'expert-answerer': 2 } }
      ],
      defaultResult: 'copy-paster'
    },
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date(),
    metadata: {
      views: 2200,
      completions: 1800,
      shares: 420,
      avgRating: 4.9,
      trendingScore: 95
    },
    questions: [
      {
        id: 'q1',
        question: 'Your typical Stack Overflow question is:',
        options: [
          { id: 'a1', text: 'How do I do my homework?', value: 'homework' },
          { id: 'a2', text: 'This is a duplicate of...', value: 'duplicate' },
          { id: 'a3', text: 'Here\'s a comprehensive solution', value: 'expert' },
          { id: 'a4', text: 'This question is terrible', value: 'downvoter' }
        ]
      },
      {
        id: 'q2',
        question: 'You use Stack Overflow to:',
        options: [
          { id: 'b1', text: 'Copy and paste code', value: 'copy-paste' },
          { id: 'b2', text: 'Learn new concepts', value: 'learn' },
          { id: 'b3', text: 'Help other developers', value: 'help-others' },
          { id: 'b4', text: 'Judge question quality', value: 'judge' }
        ]
      },
      {
        id: 'q3',
        question: 'Your Stack Overflow reputation is:',
        options: [
          { id: 'c1', text: 'Negative (I ask too many bad questions)', value: 'negative' },
          { id: 'c2', text: 'Low (I mostly lurk)', value: 'low' },
          { id: 'c3', text: 'High (I help others regularly)', value: 'high' },
          { id: 'c4', text: 'Legendary (I\'m a Stack Overflow god)', value: 'legendary' }
        ]
      }
    ],
    results: [
      { 
        id: 'homework-asker', 
        name: 'Homework Asker', 
        emoji: '📝', 
        description: 'You ask Stack Overflow to do your homework! Your academic approach is legendary!', 
        color: 'bg-yellow-500',
        personalizedMessage: 'You\'re the Stack Overflow equivalent of a student who forgot to do their homework. You can turn any assignment into a Stack Overflow question, and your questions are so academic, they could be used as exam questions. You\'ve never met a problem that couldn\'t be solved by asking Stack Overflow to do your work for you.'
      },
      { 
        id: 'duplicate-finder', 
        name: 'Duplicate Finder', 
        emoji: '🔍', 
        description: 'You find duplicates everywhere! Your detective skills are unmatched!', 
        color: 'bg-blue-500',
        personalizedMessage: 'You\'re the Stack Overflow equivalent of a detective. You can find duplicates of any question, and your detective skills are so advanced, you could probably find a duplicate of a question that hasn\'t been asked yet. You\'ve never met a question that couldn\'t be marked as a duplicate, and your colleagues are convinced you have a PhD in duplicate detection.'
      },
      { 
        id: 'copy-paster', 
        name: 'Copy Paster', 
        emoji: '📋', 
        description: 'You copy and paste everything! Your efficiency is legendary!', 
        color: 'bg-green-500',
        personalizedMessage: 'You\'re the Stack Overflow equivalent of a copy machine. You can copy and paste any solution, and your efficiency is so high, you could probably copy-paste your way to a working application. You\'ve never met a problem that couldn\'t be solved with the right copy-paste, and your colleagues are convinced you have a PhD in copy-paste engineering.'
      },
      { 
        id: 'expert-answerer', 
        name: 'Expert Answerer', 
        emoji: '🧠', 
        description: 'You provide expert answers! Your knowledge is legendary!', 
        color: 'bg-purple-500',
        personalizedMessage: 'You\'re the Stack Overflow equivalent of a professor. You can answer any question with expertise, and your knowledge is so vast, you could probably answer questions about programming languages that don\'t exist yet. You\'ve never met a problem that couldn\'t be solved with your expertise, and your colleagues are convinced you have a PhD in everything.'
      },
      { 
        id: 'downvote-master', 
        name: 'Downvote Master', 
        emoji: '⬇️', 
        description: 'You downvote everything! Your critical eye is unmatched!', 
        color: 'bg-red-500',
        personalizedMessage: 'You\'re the Stack Overflow equivalent of a critic. You can downvote any answer with precision, and your critical eye is so sharp, you could probably downvote a perfect solution. You\'ve never met an answer that couldn\'t be improved with your downvotes, and your colleagues are convinced you have a PhD in criticism.'
      },
      { 
        id: 'stack-overflow-god', 
        name: 'Stack Overflow God', 
        emoji: '👑', 
        description: 'You\'re a Stack Overflow legend! Your reputation is unmatched!', 
        color: 'bg-gold-500',
        personalizedMessage: 'You\'re the Stack Overflow equivalent of a deity. You can answer any question with god-like knowledge, and your reputation is so high, you could probably answer questions about the meaning of life. You\'ve never met a problem that couldn\'t be solved with your divine knowledge, and your colleagues are convinced you\'re the reincarnation of the first programmer.'
      }
    ]
  },
  {
    id: 'meeting-aversion',
    title: 'What\'s Your Meeting Aversion Level?',
    description: 'Discover your unique relationship with meetings!',
    emoji: '😴',
    category: 'personality',
    tags: ['meetings', 'productivity', 'developer', 'workplace'],
    isViral: true,
    isFeatured: false,
    defaultLanguage: 'en',
    defaultTheme: 'dark',
    defaultCustomization: {
      enablePersonalization: true,
      personalizationFields: ['name'],
      showProgress: true,
      showShareButtons: true,
      allowRetake: true
    },
    scoringConfig: {
      rules: [
        // Question 1: When you see a meeting invite, you:
        { questionId: 'q1', answerValue: 'decline', results: { 'meeting-hater': 5, 'meeting-avoider': 3 } },
        { questionId: 'q1', answerValue: 'ignore', results: { 'meeting-avoider': 5, 'meeting-hater': 2 } },
        { questionId: 'q1', answerValue: 'attend', results: { 'meeting-attendee': 5, 'meeting-avoider': 2 } },
        { questionId: 'q1', answerValue: 'excited', results: { 'meeting-lover': 5, 'meeting-attendee': 2 } },
        
        // Question 2: Your ideal meeting duration is:
        { questionId: 'q2', answerValue: 'zero', results: { 'meeting-hater': 5, 'meeting-avoider': 3 } },
        { questionId: 'q2', answerValue: '5-minutes', results: { 'meeting-avoider': 5, 'meeting-hater': 2 } },
        { questionId: 'q2', answerValue: '30-minutes', results: { 'meeting-attendee': 5, 'meeting-avoider': 2 } },
        { questionId: 'q2', answerValue: 'all-day', results: { 'meeting-lover': 5, 'meeting-attendee': 2 } },
        
        // Question 3: Your meeting participation style is:
        { questionId: 'q3', answerValue: 'silent', results: { 'meeting-hater': 5, 'meeting-avoider': 3 } },
        { questionId: 'q3', answerValue: 'minimal', results: { 'meeting-avoider': 5, 'meeting-hater': 2 } },
        { questionId: 'q3', answerValue: 'engaged', results: { 'meeting-attendee': 5, 'meeting-avoider': 2 } },
        { questionId: 'q3', answerValue: 'dominant', results: { 'meeting-lover': 5, 'meeting-attendee': 2 } }
      ],
      defaultResult: 'meeting-avoider'
    },
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date(),
    metadata: {
      views: 2500,
      completions: 2000,
      shares: 500,
      avgRating: 4.8,
      trendingScore: 92
    },
    questions: [
      {
        id: 'q1',
        question: 'When you see a meeting invite, you:',
        options: [
          { id: 'a1', text: 'Decline immediately', value: 'decline' },
          { id: 'a2', text: 'Ignore it completely', value: 'ignore' },
          { id: 'a3', text: 'Attend reluctantly', value: 'attend' },
          { id: 'a4', text: 'Get excited about it', value: 'excited' }
        ]
      },
      {
        id: 'q2',
        question: 'Your ideal meeting duration is:',
        options: [
          { id: 'b1', text: 'Zero minutes', value: 'zero' },
          { id: 'b2', text: '5 minutes max', value: '5-minutes' },
          { id: 'b3', text: '30 minutes', value: '30-minutes' },
          { id: 'b4', text: 'All day long', value: 'all-day' }
        ]
      },
      {
        id: 'q3',
        question: 'Your meeting participation style is:',
        options: [
          { id: 'c1', text: 'Silent observer', value: 'silent' },
          { id: 'c2', text: 'Minimal participation', value: 'minimal' },
          { id: 'c3', text: 'Engaged contributor', value: 'engaged' },
          { id: 'c4', text: 'Dominant speaker', value: 'dominant' }
        ]
      }
    ],
    results: [
      { 
        id: 'meeting-hater', 
        name: 'Meeting Hater', 
        emoji: '😡', 
        description: 'You despise meetings with every fiber of your being! Your hatred is legendary!', 
        color: 'bg-red-500',
        personalizedMessage: 'You\'re the meeting equivalent of a hermit. You can avoid meetings like the plague, and your hatred for them is so intense, you could probably start a revolution against them. You\'ve never met a meeting that couldn\'t be avoided, and your colleagues are convinced you have a PhD in meeting avoidance.'
      },
      { 
        id: 'meeting-avoider', 
        name: 'Meeting Avoider', 
        emoji: '🙈', 
        description: 'You avoid meetings like the plague! Your evasion skills are unmatched!', 
        color: 'bg-orange-500',
        personalizedMessage: 'You\'re the meeting equivalent of a ninja. You can avoid meetings with stealth, and your evasion skills are so advanced, you could probably avoid a meeting that\'s happening in your own calendar. You\'ve never met a meeting that couldn\'t be evaded, and your colleagues are convinced you have a PhD in meeting evasion.'
      },
      { 
        id: 'meeting-attendee', 
        name: 'Meeting Attendee', 
        emoji: '👥', 
        description: 'You attend meetings when necessary! Your attendance is reliable!', 
        color: 'bg-blue-500',
        personalizedMessage: 'You\'re the meeting equivalent of a responsible adult. You can attend meetings when needed, and your attendance is so reliable, you could probably attend a meeting in your sleep. You\'ve never met a meeting that couldn\'t be attended, and your colleagues are convinced you have a PhD in meeting attendance.'
      },
      { 
        id: 'meeting-lover', 
        name: 'Meeting Lover', 
        emoji: '💕', 
        description: 'You love meetings! Your enthusiasm is legendary!', 
        color: 'bg-pink-500',
        personalizedMessage: 'You\'re the meeting equivalent of a social butterfly. You can love any meeting, and your enthusiasm is so infectious, you could probably make a meeting about watching paint dry exciting. You\'ve never met a meeting that couldn\'t be loved, and your colleagues are convinced you have a PhD in meeting enthusiasm.'
      }
    ]
  },
  {
    id: 'chai-break-style',
    title: 'What\'s Your Chai Break Style?',
    description: 'Discover your unique approach to the most important break of the day!',
    emoji: '☕',
    category: 'personality',
    tags: ['chai', 'break', 'indian', 'workplace', 'culture'],
    isViral: true,
    isFeatured: true,
    defaultLanguage: 'en',
    defaultTheme: 'vibrant',
    defaultCustomization: {
      enablePersonalization: true,
      personalizationFields: ['name'],
      showProgress: true,
      showShareButtons: true,
      allowRetake: true
    },
    scoringConfig: {
      rules: [
        // Question 1: Your ideal chai break duration is:
        { questionId: 'q1', answerValue: '5-minutes', results: { 'quick-chai': 5, 'chai-master': 2 } },
        { questionId: 'q1', answerValue: '15-minutes', results: { 'chai-master': 5, 'chai-philosopher': 3 } },
        { questionId: 'q1', answerValue: '30-minutes', results: { 'chai-philosopher': 5, 'chai-legend': 3 } },
        { questionId: 'q1', answerValue: 'all-day', results: { 'chai-legend': 5, 'chai-master': 2 } },
        
        // Question 2: Your chai preference is:
        { questionId: 'q2', answerValue: 'masala-chai', results: { 'chai-master': 5, 'chai-philosopher': 3 } },
        { questionId: 'q2', answerValue: 'ginger-chai', results: { 'chai-philosopher': 5, 'chai-legend': 3 } },
        { questionId: 'q2', answerValue: 'cardamom-chai', results: { 'chai-legend': 5, 'chai-master': 2 } },
        { questionId: 'q2', answerValue: 'any-chai', results: { 'quick-chai': 5, 'chai-master': 3 } },
        
        // Question 3: During chai break, you:
        { questionId: 'q3', answerValue: 'gossip', results: { 'chai-philosopher': 5, 'chai-legend': 3 } },
        { questionId: 'q3', answerValue: 'work', results: { 'quick-chai': 5, 'chai-master': 2 } },
        { questionId: 'q3', answerValue: 'philosophize', results: { 'chai-legend': 5, 'chai-philosopher': 3 } },
        { questionId: 'q3', answerValue: 'sleep', results: { 'chai-legend': 5, 'chai-philosopher': 2 } }
      ],
      defaultResult: 'chai-master'
    },
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date(),
    metadata: {
      views: 3000,
      completions: 2500,
      shares: 600,
      avgRating: 4.9,
      trendingScore: 95
    },
    questions: [
      {
        id: 'q1',
        question: 'Your ideal chai break duration is:',
        options: [
          { id: 'a1', text: '5 minutes (quick sip)', value: '5-minutes' },
          { id: 'a2', text: '15 minutes (proper break)', value: '15-minutes' },
          { id: 'a3', text: '30 minutes (philosophical session)', value: '30-minutes' },
          { id: 'a4', text: 'All day (chai marathon)', value: 'all-day' }
        ]
      },
      {
        id: 'q2',
        question: 'Your chai preference is:',
        options: [
          { id: 'b1', text: 'Masala chai (spiced)', value: 'masala-chai' },
          { id: 'b2', text: 'Ginger chai (strong)', value: 'ginger-chai' },
          { id: 'b3', text: 'Cardamom chai (aromatic)', value: 'cardamom-chai' },
          { id: 'b4', text: 'Any chai (I\'m not picky)', value: 'any-chai' }
        ]
      },
      {
        id: 'q3',
        question: 'During chai break, you:',
        options: [
          { id: 'c1', text: 'Gossip with colleagues', value: 'gossip' },
          { id: 'c2', text: 'Continue working', value: 'work' },
          { id: 'c3', text: 'Philosophize about life', value: 'philosophize' },
          { id: 'c4', text: 'Take a power nap', value: 'sleep' }
        ]
      }
    ],
    results: [
      { 
        id: 'quick-chai', 
        name: 'Quick Chai', 
        emoji: '⚡', 
        description: 'You\'re the speed demon of chai breaks! Your efficiency is legendary!', 
        color: 'bg-yellow-500',
        personalizedMessage: 'You\'re the chai equivalent of a Formula 1 driver. You can finish a cup of chai faster than most people can say "chai", and your break efficiency is so high, you could probably have 10 chai breaks in the time others have one. You\'ve never met a chai that couldn\'t be consumed in record time.'
      },
      { 
        id: 'chai-master', 
        name: 'Chai Master', 
        emoji: '👑', 
        description: 'You\'re the master of chai breaks! Your chai game is unmatched!', 
        color: 'bg-orange-500',
        personalizedMessage: 'You\'re the chai equivalent of a sommelier. You can distinguish between different chai blends by smell alone, and your chai knowledge is so vast, you could probably write a thesis on the perfect chai temperature. You\'ve never met a chai that couldn\'t be improved with your expertise.'
      },
      { 
        id: 'chai-philosopher', 
        name: 'Chai Philosopher', 
        emoji: '🧘', 
        description: 'You turn chai breaks into philosophical sessions! Your wisdom is legendary!', 
        color: 'bg-purple-500',
        personalizedMessage: 'You\'re the chai equivalent of a guru. You can solve any problem over a cup of chai, and your philosophical insights are so deep, you could probably write a book about the meaning of life based on your chai break conversations. You\'ve never met a chai that couldn\'t inspire profound thoughts.'
      },
      { 
        id: 'chai-legend', 
        name: 'Chai Legend', 
        emoji: '🏆', 
        description: 'You\'re the legend of chai breaks! Your chai skills are mythical!', 
        color: 'bg-red-500',
        personalizedMessage: 'You\'re the chai equivalent of a mythical creature. You can make chai breaks last for hours, and your chai stories are so legendary, they\'ve become part of office folklore. You\'ve never met a chai that couldn\'t be turned into an epic adventure, and your colleagues are convinced you have magical chai powers.'
      }
    ]
  },
  {
    id: 'standup-meeting-style',
    title: 'What\'s Your Standup Meeting Style?',
    description: 'Discover your unique approach to the daily standup ritual!',
    emoji: '🤸',
    category: 'personality',
    tags: ['standup', 'meetings', 'agile', 'developer', 'workplace'],
    isViral: true,
    isFeatured: false,
    defaultLanguage: 'en',
    defaultTheme: 'minimal',
    defaultCustomization: {
      enablePersonalization: true,
      personalizationFields: ['name'],
      showProgress: true,
      showShareButtons: true,
      allowRetake: true
    },
    scoringConfig: {
      rules: [
        // Question 1: Your standup contribution is:
        { questionId: 'q1', answerValue: 'detailed', results: { 'standup-storyteller': 5, 'standup-master': 3 } },
        { questionId: 'q1', answerValue: 'brief', results: { 'standup-master': 5, 'standup-ninja': 3 } },
        { questionId: 'q1', answerValue: 'silent', results: { 'standup-ninja': 5, 'standup-ghost': 3 } },
        { questionId: 'q1', answerValue: 'dominant', results: { 'standup-dictator': 5, 'standup-storyteller': 2 } },
        
        // Question 2: You prepare for standup by:
        { questionId: 'q2', answerValue: 'detailed-prep', results: { 'standup-master': 5, 'standup-storyteller': 3 } },
        { questionId: 'q2', answerValue: 'quick-notes', results: { 'standup-ninja': 5, 'standup-master': 3 } },
        { questionId: 'q2', answerValue: 'wing-it', results: { 'standup-ghost': 5, 'standup-ninja': 3 } },
        { questionId: 'q2', answerValue: 'rehearse', results: { 'standup-dictator': 5, 'standup-storyteller': 3 } },
        
        // Question 3: Your standup timing is:
        { questionId: 'q3', answerValue: 'always-on-time', results: { 'standup-master': 5, 'standup-ninja': 3 } },
        { questionId: 'q3', answerValue: 'usually-late', results: { 'standup-ghost': 5, 'standup-ninja': 3 } },
        { questionId: 'q3', answerValue: 'fashionably-late', results: { 'standup-storyteller': 5, 'standup-dictator': 3 } },
        { questionId: 'q3', answerValue: 'never-show', results: { 'standup-ghost': 5, 'standup-ninja': 2 } }
      ],
      defaultResult: 'standup-master'
    },
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date(),
    metadata: {
      views: 2800,
      completions: 2200,
      shares: 450,
      avgRating: 4.7,
      trendingScore: 88
    },
    questions: [
      {
        id: 'q1',
        question: 'Your standup contribution is:',
        options: [
          { id: 'a1', text: 'Detailed story of everything', value: 'detailed' },
          { id: 'a2', text: 'Brief and to the point', value: 'brief' },
          { id: 'a3', text: 'Silent observer', value: 'silent' },
          { id: 'a4', text: 'Dominant speaker', value: 'dominant' }
        ]
      },
      {
        id: 'q2',
        question: 'You prepare for standup by:',
        options: [
          { id: 'b1', text: 'Detailed preparation', value: 'detailed-prep' },
          { id: 'b2', text: 'Quick mental notes', value: 'quick-notes' },
          { id: 'b3', text: 'Winging it completely', value: 'wing-it' },
          { id: 'b4', text: 'Rehearsing your speech', value: 'rehearse' }
        ]
      },
      {
        id: 'q3',
        question: 'Your standup timing is:',
        options: [
          { id: 'c1', text: 'Always on time', value: 'always-on-time' },
          { id: 'c2', text: 'Usually 5 minutes late', value: 'usually-late' },
          { id: 'c3', text: 'Fashionably late', value: 'fashionably-late' },
          { id: 'c4', text: 'Never show up', value: 'never-show' }
        ]
      }
    ],
    results: [
      { 
        id: 'standup-storyteller', 
        name: 'Standup Storyteller', 
        emoji: '📚', 
        description: 'You turn standups into epic storytelling sessions! Your narrative skills are legendary!', 
        color: 'bg-blue-500',
        personalizedMessage: 'You\'re the standup equivalent of a bard. You can turn any simple task into an epic tale, and your standup contributions are so detailed, they could be published as short stories. You\'ve never met a standup that couldn\'t be improved with your storytelling skills.'
      },
      { 
        id: 'standup-master', 
        name: 'Standup Master', 
        emoji: '🎯', 
        description: 'You\'re the master of efficient standups! Your time management is unmatched!', 
        color: 'bg-green-500',
        personalizedMessage: 'You\'re the standup equivalent of a Swiss watch. You can deliver your updates with precision timing, and your standup efficiency is so high, you could probably run a standup in your sleep. You\'ve never met a standup that couldn\'t be completed in record time.'
      },
      { 
        id: 'standup-ninja', 
        name: 'Standup Ninja', 
        emoji: '🥷', 
        description: 'You appear and disappear from standups like a ninja! Your stealth is legendary!', 
        color: 'bg-gray-500',
        personalizedMessage: 'You\'re the standup equivalent of a shadow. You can participate in standups without anyone noticing, and your stealth skills are so advanced, you could probably attend a standup while being in a different time zone. You\'ve never met a standup that couldn\'t be ninja\'d through.'
      },
      { 
        id: 'standup-ghost', 
        name: 'Standup Ghost', 
        emoji: '👻', 
        description: 'You\'re the ghost of standups! Your invisibility is unmatched!', 
        color: 'bg-purple-500',
        personalizedMessage: 'You\'re the standup equivalent of a phantom. You can avoid standups like the plague, and your invisibility skills are so advanced, your colleagues are convinced you don\'t exist. You\'ve never met a standup that couldn\'t be ghosted, and your presence is so ethereal, people question if you were ever there.'
      },
      { 
        id: 'standup-dictator', 
        name: 'Standup Dictator', 
        emoji: '👑', 
        description: 'You rule standups with an iron fist! Your dominance is legendary!', 
        color: 'bg-red-500',
        personalizedMessage: 'You\'re the standup equivalent of a monarch. You can control any standup with your commanding presence, and your leadership skills are so advanced, you could probably run a standup for the entire company. You\'ve never met a standup that couldn\'t be dominated with your royal authority.'
      }
    ]
  },
  {
    id: 'lunch-break-style',
    title: 'What\'s Your Lunch Break Style?',
    description: 'Discover your unique approach to the most important meal of the day!',
    emoji: '🍽️',
    category: 'personality',
    tags: ['lunch', 'break', 'food', 'workplace', 'culture'],
    isViral: true,
    isFeatured: false,
    defaultLanguage: 'en',
    defaultTheme: 'default',
    defaultCustomization: {
      enablePersonalization: true,
      personalizationFields: ['name'],
      showProgress: true,
      showShareButtons: true,
      allowRetake: true
    },
    scoringConfig: {
      rules: [
        // Question 1: Your lunch break duration is:
        { questionId: 'q1', answerValue: '15-minutes', results: { 'lunch-warrior': 5, 'lunch-master': 2 } },
        { questionId: 'q1', answerValue: '30-minutes', results: { 'lunch-master': 5, 'lunch-philosopher': 3 } },
        { questionId: 'q1', answerValue: '1-hour', results: { 'lunch-philosopher': 5, 'lunch-legend': 3 } },
        { questionId: 'q1', answerValue: 'all-day', results: { 'lunch-legend': 5, 'lunch-philosopher': 2 } },
        
        // Question 2: Your lunch preference is:
        { questionId: 'q2', answerValue: 'home-cooked', results: { 'lunch-master': 5, 'lunch-philosopher': 3 } },
        { questionId: 'q2', answerValue: 'office-cafeteria', results: { 'lunch-warrior': 5, 'lunch-master': 2 } },
        { questionId: 'q2', answerValue: 'restaurant', results: { 'lunch-philosopher': 5, 'lunch-legend': 3 } },
        { questionId: 'q2', answerValue: 'skip-lunch', results: { 'lunch-ghost': 5, 'lunch-warrior': 2 } },
        
        // Question 3: During lunch, you:
        { questionId: 'q3', answerValue: 'eat-quickly', results: { 'lunch-warrior': 5, 'lunch-master': 2 } },
        { questionId: 'q3', answerValue: 'socialize', results: { 'lunch-philosopher': 5, 'lunch-legend': 3 } },
        { questionId: 'q3', answerValue: 'work', results: { 'lunch-ghost': 5, 'lunch-warrior': 3 } },
        { questionId: 'q3', answerValue: 'nap', results: { 'lunch-legend': 5, 'lunch-philosopher': 2 } }
      ],
      defaultResult: 'lunch-master'
    },
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date(),
    metadata: {
      views: 3200,
      completions: 2600,
      shares: 520,
      avgRating: 4.8,
      trendingScore: 92
    },
    questions: [
      {
        id: 'q1',
        question: 'Your lunch break duration is:',
        options: [
          { id: 'a1', text: '15 minutes (quick bite)', value: '15-minutes' },
          { id: 'a2', text: '30 minutes (proper meal)', value: '30-minutes' },
          { id: 'a3', text: '1 hour (leisurely lunch)', value: '1-hour' },
          { id: 'a4', text: 'All day (lunch marathon)', value: 'all-day' }
        ]
      },
      {
        id: 'q2',
        question: 'Your lunch preference is:',
        options: [
          { id: 'b1', text: 'Home-cooked food', value: 'home-cooked' },
          { id: 'b2', text: 'Office cafeteria', value: 'office-cafeteria' },
          { id: 'b3', text: 'Restaurant dining', value: 'restaurant' },
          { id: 'b4', text: 'Skip lunch entirely', value: 'skip-lunch' }
        ]
      },
      {
        id: 'q3',
        question: 'During lunch, you:',
        options: [
          { id: 'c1', text: 'Eat quickly and get back to work', value: 'eat-quickly' },
          { id: 'c2', text: 'Socialize with colleagues', value: 'socialize' },
          { id: 'c3', text: 'Continue working while eating', value: 'work' },
          { id: 'c4', text: 'Take a power nap', value: 'nap' }
        ]
      }
    ],
    results: [
      { 
        id: 'lunch-warrior', 
        name: 'Lunch Warrior', 
        emoji: '⚔️', 
        description: 'You conquer lunch breaks with military precision! Your efficiency is legendary!', 
        color: 'bg-red-500',
        personalizedMessage: 'You\'re the lunch equivalent of a Spartan warrior. You can finish a meal faster than most people can say "lunch", and your break efficiency is so high, you could probably have 5 lunch breaks in the time others have one. You\'ve never met a meal that couldn\'t be conquered in record time.'
      },
      { 
        id: 'lunch-master', 
        name: 'Lunch Master', 
        emoji: '👑', 
        description: 'You\'re the master of lunch breaks! Your meal game is unmatched!', 
        color: 'bg-orange-500',
        personalizedMessage: 'You\'re the lunch equivalent of a chef. You can appreciate every flavor and texture, and your lunch knowledge is so vast, you could probably write a food blog about office lunches. You\'ve never met a meal that couldn\'t be improved with your culinary expertise.'
      },
      { 
        id: 'lunch-philosopher', 
        name: 'Lunch Philosopher', 
        emoji: '🧘', 
        description: 'You turn lunch breaks into philosophical sessions! Your wisdom is legendary!', 
        color: 'bg-purple-500',
        personalizedMessage: 'You\'re the lunch equivalent of a guru. You can solve any problem over a meal, and your lunch conversations are so deep, you could probably write a book about the meaning of life based on your lunch break discussions. You\'ve never met a meal that couldn\'t inspire profound thoughts.'
      },
      { 
        id: 'lunch-legend', 
        name: 'Lunch Legend', 
        emoji: '🏆', 
        description: 'You\'re the legend of lunch breaks! Your meal skills are mythical!', 
        color: 'bg-gold-500',
        personalizedMessage: 'You\'re the lunch equivalent of a mythical creature. You can make lunch breaks last for hours, and your lunch stories are so legendary, they\'ve become part of office folklore. You\'ve never met a meal that couldn\'t be turned into an epic adventure.'
      },
      { 
        id: 'lunch-ghost', 
        name: 'Lunch Ghost', 
        emoji: '👻', 
        description: 'You\'re the ghost of lunch breaks! Your invisibility is unmatched!', 
        color: 'bg-gray-500',
        personalizedMessage: 'You\'re the lunch equivalent of a phantom. You can avoid lunch breaks like the plague, and your invisibility skills are so advanced, your colleagues are convinced you don\'t eat. You\'ve never met a meal that couldn\'t be ghosted, and your presence is so ethereal, people question if you were ever hungry.'
      }
    ]
  },
  {
    id: 'slack-emoji-style',
    title: 'What\'s Your Slack Emoji Style?',
    description: 'Discover your unique approach to workplace communication!',
    emoji: '💬',
    category: 'personality',
    tags: ['slack', 'emoji', 'communication', 'workplace', 'developer'],
    isViral: true,
    isFeatured: false,
    defaultLanguage: 'en',
    defaultTheme: 'vibrant',
    defaultCustomization: {
      enablePersonalization: true,
      personalizationFields: ['name'],
      showProgress: true,
      showShareButtons: true,
      allowRetake: true
    },
    scoringConfig: {
      rules: [
        // Question 1: Your typical Slack message is:
        { questionId: 'q1', answerValue: 'emoji-heavy', results: { 'emoji-master': 5, 'emoji-legend': 3 } },
        { questionId: 'q1', answerValue: 'professional', results: { 'slack-professional': 5, 'emoji-master': 2 } },
        { questionId: 'q1', answerValue: 'minimal', results: { 'slack-minimalist': 5, 'slack-professional': 3 } },
        { questionId: 'q1', answerValue: 'silent', results: { 'slack-ghost': 5, 'slack-minimalist': 2 } },
        
        // Question 2: Your favorite emoji is:
        { questionId: 'q2', answerValue: 'thumbs-up', results: { 'slack-professional': 5, 'emoji-master': 2 } },
        { questionId: 'q2', answerValue: 'fire', results: { 'emoji-master': 5, 'emoji-legend': 3 } },
        { questionId: 'q2', answerValue: 'thinking', results: { 'slack-minimalist': 5, 'slack-professional': 3 } },
        { questionId: 'q2', answerValue: 'none', results: { 'slack-ghost': 5, 'slack-minimalist': 2 } },
        
        // Question 3: Your Slack status is:
        { questionId: 'q3', answerValue: 'always-online', results: { 'slack-professional': 5, 'emoji-master': 3 } },
        { questionId: 'q3', answerValue: 'away', results: { 'slack-minimalist': 5, 'slack-professional': 3 } },
        { questionId: 'q3', answerValue: 'do-not-disturb', results: { 'slack-ghost': 5, 'slack-minimalist': 3 } },
        { questionId: 'q3', answerValue: 'custom-status', results: { 'emoji-legend': 5, 'emoji-master': 3 } }
      ],
      defaultResult: 'slack-professional'
    },
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date(),
    metadata: {
      views: 3500,
      completions: 2800,
      shares: 650,
      avgRating: 4.9,
      trendingScore: 96
    },
    questions: [
      {
        id: 'q1',
        question: 'Your typical Slack message is:',
        options: [
          { id: 'a1', text: '🔥💯🚀 (emoji heavy)', value: 'emoji-heavy' },
          { id: 'a2', text: 'Professional and clear', value: 'professional' },
          { id: 'a3', text: 'Minimal and to the point', value: 'minimal' },
          { id: 'a4', text: 'Silent observer', value: 'silent' }
        ]
      },
      {
        id: 'q2',
        question: 'Your favorite emoji is:',
        options: [
          { id: 'b1', text: '👍 (thumbs up)', value: 'thumbs-up' },
          { id: 'b2', text: '🔥 (fire)', value: 'fire' },
          { id: 'b3', text: '🤔 (thinking)', value: 'thinking' },
          { id: 'b4', text: 'None (I don\'t use emojis)', value: 'none' }
        ]
      },
      {
        id: 'q3',
        question: 'Your Slack status is:',
        options: [
          { id: 'c1', text: 'Always online', value: 'always-online' },
          { id: 'c2', text: 'Away (but really here)', value: 'away' },
          { id: 'c3', text: 'Do not disturb', value: 'do-not-disturb' },
          { id: 'c4', text: 'Custom status with emojis', value: 'custom-status' }
        ]
      }
    ],
    results: [
      { 
        id: 'emoji-master', 
        name: 'Emoji Master', 
        emoji: '🎭', 
        description: 'You communicate entirely in emojis! Your visual language is legendary!', 
        color: 'bg-pink-500',
        personalizedMessage: 'You\'re the Slack equivalent of a hieroglyphic expert. You can express any emotion with just emojis, and your visual communication skills are so advanced, you could probably write a novel using only emojis. You\'ve never met a message that couldn\'t be improved with the right emoji combination.'
      },
      { 
        id: 'slack-professional', 
        name: 'Slack Professional', 
        emoji: '👔', 
        description: 'You maintain professional communication! Your clarity is unmatched!', 
        color: 'bg-blue-500',
        personalizedMessage: 'You\'re the Slack equivalent of a corporate executive. You can communicate with perfect clarity, and your professional skills are so advanced, you could probably write a business proposal in Slack. You\'ve never met a message that couldn\'t be improved with your professional touch.'
      },
      { 
        id: 'slack-minimalist', 
        name: 'Slack Minimalist', 
        emoji: '⚡', 
        description: 'You keep it short and sweet! Your efficiency is legendary!', 
        color: 'bg-green-500',
        personalizedMessage: 'You\'re the Slack equivalent of a haiku master. You can express complex ideas in minimal words, and your communication efficiency is so high, you could probably run a company through Slack messages. You\'ve never met a message that couldn\'t be shortened without losing meaning.'
      },
      { 
        id: 'emoji-legend', 
        name: 'Emoji Legend', 
        emoji: '🏆', 
        description: 'You\'re the legend of emoji communication! Your creativity is mythical!', 
        color: 'bg-gold-500',
        personalizedMessage: 'You\'re the Slack equivalent of a digital artist. You can create entire stories with emojis, and your creative skills are so advanced, you could probably win an emoji Oscar. You\'ve never met a message that couldn\'t be turned into an emoji masterpiece.'
      },
      { 
        id: 'slack-ghost', 
        name: 'Slack Ghost', 
        emoji: '👻', 
        description: 'You\'re the ghost of Slack! Your invisibility is unmatched!', 
        color: 'bg-gray-500',
        personalizedMessage: 'You\'re the Slack equivalent of a phantom. You can avoid Slack like the plague, and your invisibility skills are so advanced, your colleagues are convinced you don\'t exist. You\'ve never met a Slack message that couldn\'t be ghosted, and your presence is so ethereal, people question if you were ever online.'
      }
    ]
  },
  {
    id: 'work-from-home-style',
    title: 'What\'s Your Work From Home Style?',
    description: 'Discover your unique approach to remote work!',
    emoji: '🏠',
    category: 'personality',
    tags: ['wfh', 'remote', 'work', 'home', 'productivity'],
    isViral: true,
    isFeatured: true,
    defaultLanguage: 'en',
    defaultTheme: 'minimal',
    defaultCustomization: {
      enablePersonalization: true,
      personalizationFields: ['name'],
      showProgress: true,
      showShareButtons: true,
      allowRetake: true
    },
    scoringConfig: {
      rules: [
        // Question 1: Your WFH setup is:
        { questionId: 'q1', answerValue: 'dedicated-office', results: { 'wfh-professional': 5, 'wfh-master': 3 } },
        { questionId: 'q1', answerValue: 'kitchen-table', results: { 'wfh-master': 5, 'wfh-ninja': 3 } },
        { questionId: 'q1', answerValue: 'bed', results: { 'wfh-ninja': 5, 'wfh-legend': 3 } },
        { questionId: 'q1', answerValue: 'anywhere', results: { 'wfh-legend': 5, 'wfh-ninja': 2 } },
        
        // Question 2: Your WFH attire is:
        { questionId: 'q2', answerValue: 'business-casual', results: { 'wfh-professional': 5, 'wfh-master': 3 } },
        { questionId: 'q2', answerValue: 'pajamas', results: { 'wfh-ninja': 5, 'wfh-legend': 3 } },
        { questionId: 'q2', answerValue: 'shirt-only', results: { 'wfh-master': 5, 'wfh-ninja': 3 } },
        { questionId: 'q2', answerValue: 'birthday-suit', results: { 'wfh-legend': 5, 'wfh-ninja': 2 } },
        
        // Question 3: Your WFH productivity is:
        { questionId: 'q3', answerValue: 'highly-productive', results: { 'wfh-professional': 5, 'wfh-master': 3 } },
        { questionId: 'q3', answerValue: 'moderately-productive', results: { 'wfh-master': 5, 'wfh-ninja': 3 } },
        { questionId: 'q3', answerValue: 'barely-productive', results: { 'wfh-ninja': 5, 'wfh-legend': 3 } },
        { questionId: 'q3', answerValue: 'not-productive', results: { 'wfh-legend': 5, 'wfh-ninja': 2 } }
      ],
      defaultResult: 'wfh-master'
    },
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date(),
    metadata: {
      views: 4000,
      completions: 3200,
      shares: 750,
      avgRating: 4.9,
      trendingScore: 98
    },
    questions: [
      {
        id: 'q1',
        question: 'Your WFH setup is:',
        options: [
          { id: 'a1', text: 'Dedicated home office', value: 'dedicated-office' },
          { id: 'a2', text: 'Kitchen table', value: 'kitchen-table' },
          { id: 'a3', text: 'Bed (laptop on lap)', value: 'bed' },
          { id: 'a4', text: 'Anywhere with WiFi', value: 'anywhere' }
        ]
      },
      {
        id: 'q2',
        question: 'Your WFH attire is:',
        options: [
          { id: 'b1', text: 'Business casual', value: 'business-casual' },
          { id: 'b2', text: 'Pajamas all day', value: 'pajamas' },
          { id: 'b3', text: 'Shirt only (bottom optional)', value: 'shirt-only' },
          { id: 'b4', text: 'Birthday suit', value: 'birthday-suit' }
        ]
      },
      {
        id: 'q3',
        question: 'Your WFH productivity is:',
        options: [
          { id: 'c1', text: 'Highly productive', value: 'highly-productive' },
          { id: 'c2', text: 'Moderately productive', value: 'moderately-productive' },
          { id: 'c3', text: 'Barely productive', value: 'barely-productive' },
          { id: 'c4', text: 'Not productive at all', value: 'not-productive' }
        ]
      }
    ],
    results: [
      { 
        id: 'wfh-professional', 
        name: 'WFH Professional', 
        emoji: '👔', 
        description: 'You maintain office-level professionalism at home! Your discipline is legendary!', 
        color: 'bg-blue-500',
        personalizedMessage: 'You\'re the WFH equivalent of a corporate executive. You can maintain perfect professionalism even in your pajamas, and your self-discipline is so advanced, you could probably run a Fortune 500 company from your living room. You\'ve never met a workday that couldn\'t be conquered with your professional approach.'
      },
      { 
        id: 'wfh-master', 
        name: 'WFH Master', 
        emoji: '🏆', 
        description: 'You\'re the master of remote work! Your adaptability is unmatched!', 
        color: 'bg-green-500',
        personalizedMessage: 'You\'re the WFH equivalent of a Swiss Army knife. You can work from anywhere with anything, and your adaptability skills are so advanced, you could probably work from a desert island with just a coconut and a laptop. You\'ve never met a work environment that couldn\'t be mastered with your flexibility.'
      },
      { 
        id: 'wfh-ninja', 
        name: 'WFH Ninja', 
        emoji: '🥷', 
        description: 'You work in stealth mode! Your invisibility is legendary!', 
        color: 'bg-gray-500',
        personalizedMessage: 'You\'re the WFH equivalent of a shadow. You can work without anyone knowing, and your stealth skills are so advanced, you could probably work from a crowded coffee shop without anyone noticing. You\'ve never met a work situation that couldn\'t be ninja\'d through.'
      },
      { 
        id: 'wfh-legend', 
        name: 'WFH Legend', 
        emoji: '🏆', 
        description: 'You\'re the legend of remote work! Your skills are mythical!', 
        color: 'bg-gold-500',
        personalizedMessage: 'You\'re the WFH equivalent of a mythical creature. You can work from anywhere in any condition, and your remote work skills are so legendary, they\'ve become part of office folklore. You\'ve never met a work challenge that couldn\'t be turned into an epic adventure from the comfort of your home.'
      }
    ]
  },
  {
    id: 'zoom-meeting-style',
    title: 'What\'s Your Zoom Meeting Style?',
    description: 'Discover your unique approach to virtual meetings!',
    emoji: '📹',
    category: 'personality',
    tags: ['zoom', 'meetings', 'virtual', 'video', 'workplace'],
    isViral: true,
    isFeatured: false,
    defaultLanguage: 'en',
    defaultTheme: 'dark',
    defaultCustomization: {
      enablePersonalization: true,
      personalizationFields: ['name'],
      showProgress: true,
      showShareButtons: true,
      allowRetake: true
    },
    scoringConfig: {
      rules: [
        // Question 1: Your camera status is:
        { questionId: 'q1', answerValue: 'always-on', results: { 'zoom-professional': 5, 'zoom-master': 3 } },
        { questionId: 'q1', answerValue: 'sometimes-on', results: { 'zoom-master': 5, 'zoom-ninja': 3 } },
        { questionId: 'q1', answerValue: 'rarely-on', results: { 'zoom-ninja': 5, 'zoom-ghost': 3 } },
        { questionId: 'q1', answerValue: 'never-on', results: { 'zoom-ghost': 5, 'zoom-ninja': 2 } },
        
        // Question 2: Your background is:
        { questionId: 'q2', answerValue: 'professional', results: { 'zoom-professional': 5, 'zoom-master': 3 } },
        { questionId: 'q2', answerValue: 'virtual', results: { 'zoom-master': 5, 'zoom-ninja': 3 } },
        { questionId: 'q2', answerValue: 'messy-room', results: { 'zoom-ninja': 5, 'zoom-ghost': 3 } },
        { questionId: 'q2', answerValue: 'no-background', results: { 'zoom-ghost': 5, 'zoom-ninja': 2 } },
        
        // Question 3: Your participation style is:
        { questionId: 'q3', answerValue: 'active-speaker', results: { 'zoom-professional': 5, 'zoom-master': 3 } },
        { questionId: 'q3', answerValue: 'occasional-comments', results: { 'zoom-master': 5, 'zoom-ninja': 3 } },
        { questionId: 'q3', answerValue: 'silent-observer', results: { 'zoom-ninja': 5, 'zoom-ghost': 3 } },
        { questionId: 'q3', answerValue: 'muted-always', results: { 'zoom-ghost': 5, 'zoom-ninja': 2 } }
      ],
      defaultResult: 'zoom-master'
    },
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date(),
    metadata: {
      views: 3800,
      completions: 3000,
      shares: 680,
      avgRating: 4.8,
      trendingScore: 94
    },
    questions: [
      {
        id: 'q1',
        question: 'Your camera status is:',
        options: [
          { id: 'a1', text: 'Always on', value: 'always-on' },
          { id: 'a2', text: 'Sometimes on', value: 'sometimes-on' },
          { id: 'a3', text: 'Rarely on', value: 'rarely-on' },
          { id: 'a4', text: 'Never on', value: 'never-on' }
        ]
      },
      {
        id: 'q2',
        question: 'Your background is:',
        options: [
          { id: 'b1', text: 'Professional setup', value: 'professional' },
          { id: 'b2', text: 'Virtual background', value: 'virtual' },
          { id: 'b3', text: 'Messy room', value: 'messy-room' },
          { id: 'b4', text: 'No background (camera off)', value: 'no-background' }
        ]
      },
      {
        id: 'q3',
        question: 'Your participation style is:',
        options: [
          { id: 'c1', text: 'Active speaker', value: 'active-speaker' },
          { id: 'c2', text: 'Occasional comments', value: 'occasional-comments' },
          { id: 'c3', text: 'Silent observer', value: 'silent-observer' },
          { id: 'c4', text: 'Always muted', value: 'muted-always' }
        ]
      }
    ],
    results: [
      { 
        id: 'zoom-professional', 
        name: 'Zoom Professional', 
        emoji: '👔', 
        description: 'You maintain perfect professionalism in virtual meetings! Your setup is legendary!', 
        color: 'bg-blue-500',
        personalizedMessage: 'You\'re the Zoom equivalent of a news anchor. You can maintain perfect professionalism even in your pajamas, and your virtual meeting skills are so advanced, you could probably host a TED talk from your living room. You\'ve never met a Zoom meeting that couldn\'t be conquered with your professional approach.'
      },
      { 
        id: 'zoom-master', 
        name: 'Zoom Master', 
        emoji: '🎯', 
        description: 'You\'re the master of virtual meetings! Your adaptability is unmatched!', 
        color: 'bg-green-500',
        personalizedMessage: 'You\'re the Zoom equivalent of a Swiss Army knife. You can adapt to any virtual meeting situation, and your flexibility skills are so advanced, you could probably run a meeting from a moving car. You\'ve never met a Zoom challenge that couldn\'t be mastered with your adaptability.'
      },
      { 
        id: 'zoom-ninja', 
        name: 'Zoom Ninja', 
        emoji: '🥷', 
        description: 'You participate in stealth mode! Your invisibility is legendary!', 
        color: 'bg-gray-500',
        personalizedMessage: 'You\'re the Zoom equivalent of a shadow. You can participate in meetings without anyone noticing, and your stealth skills are so advanced, you could probably attend a meeting while sleeping. You\'ve never met a Zoom situation that couldn\'t be ninja\'d through.'
      },
      { 
        id: 'zoom-ghost', 
        name: 'Zoom Ghost', 
        emoji: '👻', 
        description: 'You\'re the ghost of virtual meetings! Your invisibility is unmatched!', 
        color: 'bg-purple-500',
        personalizedMessage: 'You\'re the Zoom equivalent of a phantom. You can avoid Zoom meetings like the plague, and your invisibility skills are so advanced, your colleagues are convinced you don\'t exist. You\'ve never met a Zoom meeting that couldn\'t be ghosted, and your presence is so ethereal, people question if you were ever there.'
      }
    ]
  },
  {
    id: 'jira-ticket-style',
    title: 'What\'s Your Jira Ticket Style?',
    description: 'Discover your unique approach to project management!',
    emoji: '🎫',
    category: 'personality',
    tags: ['jira', 'tickets', 'project-management', 'developer', 'workplace'],
    isViral: true,
    isFeatured: false,
    defaultLanguage: 'en',
    defaultTheme: 'default',
    defaultCustomization: {
      enablePersonalization: true,
      personalizationFields: ['name'],
      showProgress: true,
      showShareButtons: true,
      allowRetake: true
    },
    scoringConfig: {
      rules: [
        // Question 1: Your ticket descriptions are:
        { questionId: 'q1', answerValue: 'detailed', results: { 'jira-professional': 5, 'jira-master': 3 } },
        { questionId: 'q1', answerValue: 'brief', results: { 'jira-master': 5, 'jira-ninja': 3 } },
        { questionId: 'q1', answerValue: 'minimal', results: { 'jira-ninja': 5, 'jira-ghost': 3 } },
        { questionId: 'q1', answerValue: 'none', results: { 'jira-ghost': 5, 'jira-ninja': 2 } },
        
        // Question 2: Your ticket priority is:
        { questionId: 'q2', answerValue: 'high', results: { 'jira-professional': 5, 'jira-master': 3 } },
        { questionId: 'q2', answerValue: 'medium', results: { 'jira-master': 5, 'jira-ninja': 3 } },
        { questionId: 'q2', answerValue: 'low', results: { 'jira-ninja': 5, 'jira-ghost': 3 } },
        { questionId: 'q2', answerValue: 'none', results: { 'jira-ghost': 5, 'jira-ninja': 2 } },
        
        // Question 3: Your ticket completion rate is:
        { questionId: 'q3', answerValue: 'always-complete', results: { 'jira-professional': 5, 'jira-master': 3 } },
        { questionId: 'q3', answerValue: 'mostly-complete', results: { 'jira-master': 5, 'jira-ninja': 3 } },
        { questionId: 'q3', answerValue: 'rarely-complete', results: { 'jira-ninja': 5, 'jira-ghost': 3 } },
        { questionId: 'q3', answerValue: 'never-complete', results: { 'jira-ghost': 5, 'jira-ninja': 2 } }
      ],
      defaultResult: 'jira-master'
    },
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date(),
    metadata: {
      views: 4200,
      completions: 3400,
      shares: 800,
      avgRating: 4.9,
      trendingScore: 97
    },
    questions: [
      {
        id: 'q1',
        question: 'Your ticket descriptions are:',
        options: [
          { id: 'a1', text: 'Detailed and comprehensive', value: 'detailed' },
          { id: 'a2', text: 'Brief and to the point', value: 'brief' },
          { id: 'a3', text: 'Minimal (just the title)', value: 'minimal' },
          { id: 'a4', text: 'None (empty tickets)', value: 'none' }
        ]
      },
      {
        id: 'q2',
        question: 'Your ticket priority is:',
        options: [
          { id: 'b1', text: 'Always high priority', value: 'high' },
          { id: 'b2', text: 'Medium priority', value: 'medium' },
          { id: 'b3', text: 'Low priority', value: 'low' },
          { id: 'b4', text: 'No priority set', value: 'none' }
        ]
      },
      {
        id: 'q3',
        question: 'Your ticket completion rate is:',
        options: [
          { id: 'c1', text: 'Always complete on time', value: 'always-complete' },
          { id: 'c2', text: 'Mostly complete', value: 'mostly-complete' },
          { id: 'c3', text: 'Rarely complete', value: 'rarely-complete' },
          { id: 'c4', text: 'Never complete', value: 'never-complete' }
        ]
      }
    ],
    results: [
      { 
        id: 'jira-professional', 
        name: 'Jira Professional', 
        emoji: '👔', 
        description: 'You maintain perfect ticket hygiene! Your project management is legendary!', 
        color: 'bg-blue-500',
        personalizedMessage: 'You\'re the Jira equivalent of a project management guru. You can create tickets so detailed, they could be used as training materials, and your organizational skills are so advanced, you could probably run a Fortune 500 company through Jira tickets. You\'ve never met a project that couldn\'t be conquered with your professional approach.'
      },
      { 
        id: 'jira-master', 
        name: 'Jira Master', 
        emoji: '🎯', 
        description: 'You\'re the master of ticket management! Your efficiency is unmatched!', 
        color: 'bg-green-500',
        personalizedMessage: 'You\'re the Jira equivalent of a Swiss Army knife. You can manage any project with perfect efficiency, and your ticket skills are so advanced, you could probably run a startup through Jira tickets. You\'ve never met a project that couldn\'t be mastered with your efficiency.'
      },
      { 
        id: 'jira-ninja', 
        name: 'Jira Ninja', 
        emoji: '🥷', 
        description: 'You manage tickets in stealth mode! Your invisibility is legendary!', 
        color: 'bg-gray-500',
        personalizedMessage: 'You\'re the Jira equivalent of a shadow. You can manage projects without anyone noticing, and your stealth skills are so advanced, you could probably run a project while sleeping. You\'ve never met a Jira ticket that couldn\'t be ninja\'d through.'
      },
      { 
        id: 'jira-ghost', 
        name: 'Jira Ghost', 
        emoji: '👻', 
        description: 'You\'re the ghost of ticket management! Your invisibility is unmatched!', 
        color: 'bg-purple-500',
        personalizedMessage: 'You\'re the Jira equivalent of a phantom. You can avoid Jira tickets like the plague, and your invisibility skills are so advanced, your colleagues are convinced you don\'t work. You\'ve never met a Jira ticket that couldn\'t be ghosted, and your presence is so ethereal, people question if you were ever assigned any work.'
      }
    ]
  },
  {
    id: 'coffee-break-style',
    title: 'What\'s Your Coffee Break Style?',
    description: 'Discover your unique approach to the most important break of the day!',
    emoji: '☕',
    category: 'personality',
    tags: ['coffee', 'break', 'workplace', 'culture', 'productivity'],
    isViral: true,
    isFeatured: true,
    defaultLanguage: 'en',
    defaultTheme: 'vibrant',
    defaultCustomization: {
      enablePersonalization: true,
      personalizationFields: ['name'],
      showProgress: true,
      showShareButtons: true,
      allowRetake: true
    },
    scoringConfig: {
      rules: [
        // Question 1: Your coffee break frequency is:
        { questionId: 'q1', answerValue: 'every-hour', results: { 'coffee-addict': 5, 'coffee-master': 3 } },
        { questionId: 'q1', answerValue: 'few-times', results: { 'coffee-master': 5, 'coffee-philosopher': 3 } },
        { questionId: 'q1', answerValue: 'once', results: { 'coffee-philosopher': 5, 'coffee-legend': 3 } },
        { questionId: 'q1', answerValue: 'never', results: { 'coffee-ghost': 5, 'coffee-philosopher': 2 } },
        
        // Question 2: Your coffee preference is:
        { questionId: 'q2', answerValue: 'espresso', results: { 'coffee-master': 5, 'coffee-addict': 3 } },
        { questionId: 'q2', answerValue: 'latte', results: { 'coffee-philosopher': 5, 'coffee-master': 3 } },
        { questionId: 'q2', answerValue: 'americano', results: { 'coffee-legend': 5, 'coffee-philosopher': 3 } },
        { questionId: 'q2', answerValue: 'no-coffee', results: { 'coffee-ghost': 5, 'coffee-philosopher': 2 } },
        
        // Question 3: During coffee break, you:
        { questionId: 'q3', answerValue: 'work', results: { 'coffee-addict': 5, 'coffee-master': 3 } },
        { questionId: 'q3', answerValue: 'socialize', results: { 'coffee-philosopher': 5, 'coffee-legend': 3 } },
        { questionId: 'q3', answerValue: 'relax', results: { 'coffee-legend': 5, 'coffee-philosopher': 3 } },
        { questionId: 'q3', answerValue: 'skip', results: { 'coffee-ghost': 5, 'coffee-philosopher': 2 } }
      ],
      defaultResult: 'coffee-master'
    },
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date(),
    metadata: {
      views: 4500,
      completions: 3600,
      shares: 900,
      avgRating: 4.9,
      trendingScore: 99
    },
    questions: [
      {
        id: 'q1',
        question: 'Your coffee break frequency is:',
        options: [
          { id: 'a1', text: 'Every hour', value: 'every-hour' },
          { id: 'a2', text: 'A few times a day', value: 'few-times' },
          { id: 'a3', text: 'Once a day', value: 'once' },
          { id: 'a4', text: 'Never', value: 'never' }
        ]
      },
      {
        id: 'q2',
        question: 'Your coffee preference is:',
        options: [
          { id: 'b1', text: 'Espresso (strong)', value: 'espresso' },
          { id: 'b2', text: 'Latte (milky)', value: 'latte' },
          { id: 'b3', text: 'Americano (black)', value: 'americano' },
          { id: 'b4', text: 'No coffee', value: 'no-coffee' }
        ]
      },
      {
        id: 'q3',
        question: 'During coffee break, you:',
        options: [
          { id: 'c1', text: 'Continue working', value: 'work' },
          { id: 'c2', text: 'Socialize with colleagues', value: 'socialize' },
          { id: 'c3', text: 'Relax and recharge', value: 'relax' },
          { id: 'c4', text: 'Skip coffee breaks', value: 'skip' }
        ]
      }
    ],
    results: [
      { 
        id: 'coffee-addict', 
        name: 'Coffee Addict', 
        emoji: '💉', 
        description: 'You\'re addicted to coffee breaks! Your caffeine dependency is legendary!', 
        color: 'bg-brown-500',
        personalizedMessage: 'You\'re the coffee equivalent of a caffeine vampire. You can\'t function without your regular coffee fix, and your addiction is so advanced, you could probably run a coffee shop from your desk. You\'ve never met a workday that couldn\'t be improved with more coffee breaks.'
      },
      { 
        id: 'coffee-master', 
        name: 'Coffee Master', 
        emoji: '👑', 
        description: 'You\'re the master of coffee breaks! Your timing is unmatched!', 
        color: 'bg-orange-500',
        personalizedMessage: 'You\'re the coffee equivalent of a sommelier. You can time your coffee breaks to perfection, and your coffee knowledge is so vast, you could probably write a thesis on the perfect coffee temperature. You\'ve never met a coffee break that couldn\'t be mastered with your expertise.'
      },
      { 
        id: 'coffee-philosopher', 
        name: 'Coffee Philosopher', 
        emoji: '🧘', 
        description: 'You turn coffee breaks into philosophical sessions! Your wisdom is legendary!', 
        color: 'bg-purple-500',
        personalizedMessage: 'You\'re the coffee equivalent of a guru. You can solve any problem over a cup of coffee, and your coffee break conversations are so deep, you could probably write a book about the meaning of life based on your coffee break discussions. You\'ve never met a coffee that couldn\'t inspire profound thoughts.'
      },
      { 
        id: 'coffee-legend', 
        name: 'Coffee Legend', 
        emoji: '🏆', 
        description: 'You\'re the legend of coffee breaks! Your skills are mythical!', 
        color: 'bg-gold-500',
        personalizedMessage: 'You\'re the coffee equivalent of a mythical creature. You can make coffee breaks last for hours, and your coffee stories are so legendary, they\'ve become part of office folklore. You\'ve never met a coffee that couldn\'t be turned into an epic adventure.'
      },
      { 
        id: 'coffee-ghost', 
        name: 'Coffee Ghost', 
        emoji: '👻', 
        description: 'You\'re the ghost of coffee breaks! Your invisibility is unmatched!', 
        color: 'bg-gray-500',
        personalizedMessage: 'You\'re the coffee equivalent of a phantom. You can avoid coffee breaks like the plague, and your invisibility skills are so advanced, your colleagues are convinced you don\'t drink coffee. You\'ve never met a coffee break that couldn\'t be ghosted, and your presence is so ethereal, people question if you were ever caffeinated.'
      }
    ]
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

// Dynamic routing utilities
export function getAllQuizIds(): string[] {
  return quizzes.map(quiz => quiz.id);
}

export function getQuizSlugs(): string[] {
  return quizzes.map(quiz => quiz.id);
}

export function isValidQuizId(id: string): boolean {
  return quizzes.some(quiz => quiz.id === id);
}

export function getQuizMetadata(quizId: string) {
  const quiz = getQuizById(quizId);
  if (!quiz) return null;
  
  return {
    title: quiz.title,
    titleHindi: quiz.titleHindi,
    description: quiz.description,
    descriptionHindi: quiz.descriptionHindi,
    emoji: quiz.emoji,
    category: quiz.category,
    tags: quiz.tags,
    isViral: quiz.isViral,
    isFeatured: quiz.isFeatured,
    metadata: quiz.metadata
  };
}

export function getQuizForSEO(quizId: string) {
  const quiz = getQuizById(quizId);
  if (!quiz) return null;
  
  return {
    title: quiz.title,
    description: quiz.description,
    keywords: quiz.tags?.join(', ') || '',
    emoji: quiz.emoji,
    category: quiz.category,
    isViral: quiz.isViral,
    isFeatured: quiz.isFeatured
  };
}

// Quiz recommendation system
export function getRecommendedQuizzes(currentQuizId: string, limit: number = 3): Quiz[] {
  const currentQuiz = getQuizById(currentQuizId);
  if (!currentQuiz || !currentQuiz.tags) {
    // Fallback: return featured and viral quizzes
    return quizzes
      .filter(quiz => quiz.id !== currentQuizId)
      .filter(quiz => quiz.isFeatured || quiz.isViral)
      .sort((a, b) => (b.metadata?.trendingScore || 0) - (a.metadata?.trendingScore || 0))
      .slice(0, limit);
  }

  // Calculate similarity score based on tags
  const quizScores = quizzes
    .filter(quiz => quiz.id !== currentQuizId)
    .map(quiz => {
      const currentTags = currentQuiz.tags || [];
      const quizTags = quiz.tags || [];
      
      // Calculate tag overlap
      const commonTags = currentTags.filter(tag => quizTags.includes(tag));
      const similarityScore = commonTags.length / Math.max(currentTags.length, quizTags.length);
      
      // Bonus for same category
      const categoryBonus = currentQuiz.category === quiz.category ? 0.2 : 0;
      
      // Bonus for viral/featured quizzes
      const viralBonus = quiz.isViral ? 0.1 : 0;
      const featuredBonus = quiz.isFeatured ? 0.15 : 0;
      
      const totalScore = similarityScore + categoryBonus + viralBonus + featuredBonus;
      
      return {
        quiz,
        score: totalScore
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return quizScores.map(item => item.quiz);
}

export function getQuizRecommendations(currentQuizId: string, limit: number = 3) {
  const recommendedQuizzes = getRecommendedQuizzes(currentQuizId, limit);
  
  return recommendedQuizzes.map(quiz => ({
    id: quiz.id,
    title: quiz.title,
    titleHindi: quiz.titleHindi,
    description: quiz.description,
    descriptionHindi: quiz.descriptionHindi,
    emoji: quiz.emoji,
    category: quiz.category,
    tags: quiz.tags,
    isViral: quiz.isViral,
    isFeatured: quiz.isFeatured,
    metadata: quiz.metadata
  }));
}
