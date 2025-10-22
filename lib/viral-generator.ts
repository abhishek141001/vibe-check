import { DynamicQuiz, QuizCategory, ViralTrend } from './dynamic-quiz';

// Viral content templates for different categories
export const viralTemplates = {
  personality: [
    {
      title: "What's Your Hidden Superpower?",
      titleHindi: "आपकी छुपी सुपरपावर क्या है?",
      description: "Discover the superpower you never knew you had!",
      descriptionHindi: "वह सुपरपावर खोजें जो आपको नहीं पता था!",
      emoji: "🦸‍♂️",
      questions: [
        {
          question: "In a crisis, you would:",
          questionHindi: "संकट में, आप करेंगे:",
          options: [
            { text: "Take charge immediately", textHindi: "तुरंत नेतृत्व करें", value: "leader" },
            { text: "Analyze the situation first", textHindi: "पहले स्थिति का विश्लेषण करें", value: "analyst" },
            { text: "Help others stay calm", textHindi: "दूसरों को शांत रखने में मदद करें", value: "supporter" },
            { text: "Find creative solutions", textHindi: "रचनात्मक समाधान खोजें", value: "innovator" }
          ]
        }
      ]
    }
  ],
  culture: [
    {
      title: "Your Cultural Spirit Animal",
      titleHindi: "आपका सांस्कृतिक आत्मा पशु",
      description: "Which cultural spirit represents your soul?",
      descriptionHindi: "कौन सा सांस्कृतिक आत्मा आपकी आत्मा का प्रतिनिधित्व करता है?",
      emoji: "🦅",
      questions: [
        {
          question: "Your ideal festival celebration involves:",
          questionHindi: "आपका आदर्श त्योहार उत्सव शामिल करता है:",
          options: [
            { text: "Traditional rituals", textHindi: "पारंपरिक अनुष्ठान", value: "traditional" },
            { text: "Community gathering", textHindi: "सामुदायिक सभा", value: "community" },
            { text: "Family time", textHindi: "पारिवारिक समय", value: "family" },
            { text: "Spiritual reflection", textHindi: "आध्यात्मिक चिंतन", value: "spiritual" }
          ]
        }
      ]
    }
  ],
  entertainment: [
    {
      title: "Your Netflix Personality",
      titleHindi: "आपका नेटफ्लिक्स व्यक्तित्व",
      description: "What does your binge-watching say about you?",
      descriptionHindi: "आपकी बिंज-वॉचिंग आपके बारे में क्या कहती है?",
      emoji: "📺",
      questions: [
        {
          question: "Your go-to genre is:",
          questionHindi: "आपकी पसंदीदा शैली है:",
          options: [
            { text: "Thriller/Mystery", textHindi: "थ्रिलर/रहस्य", value: "thriller" },
            { text: "Romance/Drama", textHindi: "रोमांस/ड्रामा", value: "romance" },
            { text: "Comedy", textHindi: "कॉमेडी", value: "comedy" },
            { text: "Sci-Fi/Fantasy", textHindi: "साइ-फाई/फंतासी", value: "scifi" }
          ]
        }
      ]
    }
  ]
};

// Trending topics and hashtags
export const trendingTopics = [
  {
    topic: "AI Revolution",
    topicHindi: "एआई क्रांति",
    hashtags: ["#AI", "#FutureTech", "#एआई", "#भविष्यतकनीक"],
    emoji: "🤖",
    category: "technology"
  },
  {
    topic: "Climate Action",
    topicHindi: "जलवायु कार्य",
    hashtags: ["#ClimateAction", "#GreenLiving", "#जलवायुकार्य", "#हरितजीवन"],
    emoji: "🌱",
    category: "lifestyle"
  },
  {
    topic: "Mental Health",
    topicHindi: "मानसिक स्वास्थ्य",
    hashtags: ["#MentalHealth", "#SelfCare", "#मानसिकस्वास्थ्य", "#आत्मदेखभाल"],
    emoji: "🧠",
    category: "wellness"
  },
  {
    topic: "Digital Nomad",
    topicHindi: "डिजिटल नोमैड",
    hashtags: ["#DigitalNomad", "#RemoteWork", "#डिजिटलनोमैड", "#दूरस्थकाम"],
    emoji: "💻",
    category: "lifestyle"
  }
];

// Seasonal and festival content
export const seasonalContent = {
  diwali: {
    title: "Your Diwali Energy",
    titleHindi: "आपकी दीवाली ऊर्जा",
    description: "What kind of Diwali celebration matches your vibe?",
    descriptionHindi: "किस तरह का दीवाली उत्सव आपके वाइब से मेल खाता है?",
    emoji: "🪔",
    hashtags: ["#Diwali", "#FestivalOfLights", "#दीवाली", "#रोशनीकात्योहार"]
  },
  holi: {
    title: "Your Holi Color",
    titleHindi: "आपका होली रंग",
    description: "Which color represents your personality this Holi?",
    descriptionHindi: "कौन सा रंग इस होली में आपके व्यक्तित्व का प्रतिनिधित्व करता है?",
    emoji: "🎨",
    hashtags: ["#Holi", "#FestivalOfColors", "#होली", "#रंगोंकात्योहार"]
  },
  newYear: {
    title: "Your 2025 Vibe",
    titleHindi: "आपका 2025 वाइब",
    description: "What energy will you bring to the new year?",
    descriptionHindi: "नए साल में आप कौन सी ऊर्जा लाएंगे?",
    emoji: "🎊",
    hashtags: ["#NewYear", "#2025Vibes", "#नववर्ष", "#नएसाल"]
  }
};

// Function to generate viral quiz based on trending topics
export function generateViralQuiz(topic: string, category: string): DynamicQuiz {
  const template = viralTemplates[category as keyof typeof viralTemplates]?.[0];
  const trendingTopic = trendingTopics.find(t => t.topic.toLowerCase().includes(topic.toLowerCase()));
  
  if (!template) {
    throw new Error(`No template found for category: ${category}`);
  }

  const quizId = `viral-${topic.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
  
  return {
    id: quizId,
    title: template.title,
    titleHindi: template.titleHindi,
    description: template.description,
    descriptionHindi: template.descriptionHindi,
    emoji: template.emoji,
    category: category,
    tags: trendingTopic ? trendingTopic.hashtags : [topic.toLowerCase()],
    isViral: true,
    isFeatured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: template.questions.map((q: any, index: number) => ({
      ...q,
      id: `q${index + 1}`,
      type: 'single' as const,
      required: true,
      order: index + 1
    })),
    results: generateResults(template.title, template.emoji),
    resultMapping: generateResultMapping(template.questions),
    metadata: {
      views: 0,
      completions: 0,
      shares: 0,
      avgRating: 0,
      trendingScore: 100 // High trending score for new viral content
    }
  };
}

// Function to generate seasonal quiz
export function generateSeasonalQuiz(season: string): DynamicQuiz {
  const content = seasonalContent[season as keyof typeof seasonalContent];
  
  if (!content) {
    throw new Error(`No seasonal content found for: ${season}`);
  }

  const quizId = `seasonal-${season}-${Date.now()}`;
  
  return {
    id: quizId,
    title: content.title,
    titleHindi: content.titleHindi,
    description: content.description,
    descriptionHindi: content.descriptionHindi,
    emoji: content.emoji,
    category: 'culture',
    tags: content.hashtags,
    isViral: true,
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: generateSeasonalQuestions(season),
    results: generateSeasonalResults(season),
    resultMapping: generateSeasonalMapping(season),
    metadata: {
      views: 0,
      completions: 0,
      shares: 0,
      avgRating: 0,
      trendingScore: 95
    }
  };
}

// Helper functions
function generateResults(title: string, emoji: string) {
  return [
    {
      id: 'result-1',
      name: 'Type A',
      nameHindi: 'टाइप ए',
      emoji: '🔥',
      description: 'You are a natural leader with incredible energy!',
      descriptionHindi: 'आप एक प्राकृतिक नेता हैं जिनमें अविश्वसनीय ऊर्जा है!',
      color: 'bg-red-500',
      shareableText: `Just discovered I'm Type A! 🔥 Take the ${title} quiz to find yours!`,
      shareableTextHindi: `अभी पता चला कि मैं टाइप ए हूं! 🔥 अपना पता लगाने के लिए ${title} क्विज़ करें!`,
      hashtags: ['#Quiz', '#Personality', '#TypeA'],
      viralPotential: 85
    },
    {
      id: 'result-2',
      name: 'Type B',
      nameHindi: 'टाइप बी',
      emoji: '💙',
      description: 'You are calm, thoughtful, and deeply wise!',
      descriptionHindi: 'आप शांत, विचारशील और गहरे बुद्धिमान हैं!',
      color: 'bg-blue-500',
      shareableText: `Just discovered I'm Type B! 💙 Take the ${title} quiz to find yours!`,
      shareableTextHindi: `अभी पता चला कि मैं टाइप बी हूं! 💙 अपना पता लगाने के लिए ${title} क्विज़ करें!`,
      hashtags: ['#Quiz', '#Personality', '#TypeB'],
      viralPotential: 80
    }
  ];
}

function generateResultMapping(questions: any[]) {
  // Simple mapping logic - can be enhanced
  return {
    'leader-analyst': 'result-1',
    'supporter-innovator': 'result-2'
  };
}

function generateSeasonalQuestions(season: string) {
  // Generate questions based on season
  return [
    {
      id: 'q1',
      question: `How do you celebrate ${season}?`,
      questionHindi: `आप ${season} कैसे मनाते हैं?`,
      type: 'single' as const,
      required: true,
      order: 1,
      options: [
        { id: 'a1', text: 'With family', textHindi: 'परिवार के साथ', value: 'family' },
        { id: 'a2', text: 'With friends', textHindi: 'दोस्तों के साथ', value: 'friends' },
        { id: 'a3', text: 'Quietly', textHindi: 'शांतिपूर्वक', value: 'quiet' },
        { id: 'a4', text: 'Big celebration', textHindi: 'बड़ा उत्सव', value: 'big' }
      ]
    }
  ];
}

function generateSeasonalResults(season: string) {
  return [
    {
      id: 'family-celebrator',
      name: 'Family Celebrator',
      nameHindi: 'पारिवारिक उत्सवकर्ता',
      emoji: '👨‍👩‍👧‍👦',
      description: `You make ${season} special with family traditions!`,
      descriptionHindi: `आप पारिवारिक परंपराओं से ${season} को खास बनाते हैं!`,
      color: 'bg-green-500',
      shareableText: `Just discovered I'm a Family Celebrator! 👨‍👩‍👧‍👦 Take the ${season} quiz to find yours!`,
      shareableTextHindi: `अभी पता चला कि मैं एक पारिवारिक उत्सवकर्ता हूं! 👨‍👩‍👧‍👦 अपना पता लगाने के लिए ${season} क्विज़ करें!`,
      hashtags: ['#Quiz', '#Family', '#Celebration'],
      viralPotential: 90
    }
  ];
}

function generateSeasonalMapping(season: string) {
  return {
    'family': 'family-celebrator'
  };
}

// Function to get trending content suggestions
export function getTrendingSuggestions(): string[] {
  return [
    "AI and Technology",
    "Climate Change",
    "Mental Health",
    "Remote Work",
    "Sustainable Living",
    "Digital Wellness",
    "Cultural Heritage",
    "Future of Work"
  ];
}

// Function to get seasonal suggestions
export function getSeasonalSuggestions(): string[] {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  
  if (month >= 10 && month <= 11) return ['diwali'];
  if (month >= 2 && month <= 3) return ['holi'];
  if (month === 1) return ['newYear'];
  
  return ['diwali', 'holi', 'newYear'];
}
