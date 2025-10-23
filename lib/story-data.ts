export type StoryChoice = {
  id: string;
  text: string;
  textHindi?: string;
  nextId?: string;
};

export type StoryNode = {
  id: string;
  text: string;
  textHindi?: string;
  image?: string;
  choices: [StoryChoice, StoryChoice];
  ending?: boolean;
  endingTitle?: string;
  endingTitleHindi?: string;
  endingEmoji?: string;
};

export type StoryCustomization = {
  themeId?: string;
  defaultLanguage?: 'en' | 'hi';
  backgroundImage?: string;
};

export type StoryMeta = {
  id: string;
  title: string;
  titleHindi?: string;
  description: string;
  descriptionHindi?: string;
  emoji: string;
  startNodeId: string;
  maxSlides?: number;
  nodes: StoryNode[];
  customization?: StoryCustomization;
  isViral?: boolean;
  isFeatured?: boolean;
  metadata?: {
    views: number;
    completions: number;
    shares: number;
    avgRating: number;
    trendingScore: number;
  };
};

// Sample in-memory story for fallback
const stories: StoryMeta[] = [
  {
    id: 'lost-forest',
    title: 'Lost in the Whispering Forest',
    titleHindi: 'फुसफुसाते जंगल में खोए',
    description: 'You wake up in a misty forest. Every path whispers your name. Which way will you go?',
    descriptionHindi: 'आप एक धुंधले जंगल में जागते हैं। हर रास्ता आपका नाम फुसफुसाता है। आप किस ओर जाएंगे?',
    emoji: '🌲',
    startNodeId: 'n1',
    maxSlides: 7,
    customization: {
      themeId: 'default',
      defaultLanguage: 'en',
      backgroundImage: '/window.svg'
    },
    isFeatured: true,
    isViral: true,
    metadata: { views: 0, completions: 0, shares: 0, avgRating: 0, trendingScore: 90 },
    nodes: [
      {
        id: 'n1',
        text: 'A forked path appears. To the left, glowing mushrooms hum softly. To the right, a warm light flickers.',
        textHindi: 'दो राहें दिखती हैं। बाईं ओर चमकते मशरूम धीमे गूंजते हैं। दाईं ओर एक गर्म रोशनी टिमटिमा रही है।',
        image: '/globe.svg',
        choices: [
          { id: 'c1', text: 'Follow the mushrooms', textHindi: 'मशरूम के पीछे जाएं', nextId: 'n2' },
          { id: 'c2', text: 'Walk toward the light', textHindi: 'रोशनी की ओर चलें', nextId: 'n3' }
        ]
      },
      {
        id: 'n2',
        text: 'The mushrooms sing an ancient tune. A hidden door opens in a tree.',
        textHindi: 'मशरूम एक प्राचीन धुन गाते हैं। एक पेड़ में छिपा दरवाज़ा खुल जाता है।',
        image: '/next.svg',
        choices: [
          { id: 'c3', text: 'Enter the door', textHindi: 'दरवाज़े से अंदर जाएं', nextId: 'n4' },
          { id: 'c4', text: 'Stay on the path', textHindi: 'राह पर बने रहें', nextId: 'n5' }
        ]
      },
      {
        id: 'n3',
        text: 'A campfire burns unattended. A journal lies nearby with your name on it.',
        textHindi: 'एक अलाव अकेला जल रहा है। पास में एक डायरी पड़ी है जिस पर आपका नाम लिखा है।',
        image: '/vercel.svg',
        choices: [
          { id: 'c5', text: 'Read the journal', textHindi: 'डायरी पढ़ें', nextId: 'n5' },
          { id: 'c6', text: 'Extinguish the fire', textHindi: 'अलाव बुझाएं', nextId: 'n6' }
        ]
      },
      {
        id: 'n4',
        text: 'Inside, a gentle deer speaks: "Your heart knows the way."',
        textHindi: 'अंदर, एक कोमल हिरण कहता है: "तुम्हारा दिल रास्ता जानता है।"',
        choices: [
          { id: 'c7', text: 'Trust your heart', textHindi: 'दिल पर भरोसा करें', nextId: 'end1' },
          { id: 'c8', text: 'Ask for a map', textHindi: 'नक्शा मांगें', nextId: 'end2' }
        ]
      },
      {
        id: 'n5',
        text: 'A river blocks your way. The water sings your childhood song.',
        textHindi: 'एक नदी रास्ता रोकती है। पानी आपका बचपन का गीत गाता है।',
        choices: [
          { id: 'c9', text: 'Cross the river', textHindi: 'नदी पार करें', nextId: 'end2' },
          { id: 'c10', text: 'Follow the river', textHindi: 'नदी के किनारे चलें', nextId: 'end3' }
        ]
      },
      {
        id: 'n6',
        text: 'The forest grows quiet. The stars rearrange into an arrow pointing north.',
        textHindi: 'जंगल शांत हो जाता है। तारे उत्तर की ओर इशारा करते हुए तीर बन जाते हैं।',
        choices: [
          { id: 'c11', text: 'Head north', textHindi: 'उत्तर की ओर जाएं', nextId: 'end1' },
          { id: 'c12', text: 'Wait for dawn', textHindi: 'भोर तक प्रतीक्षा करें', nextId: 'end3' }
        ]
      },
      {
        id: 'end1',
        text: 'You find a hidden village that welcomes you home. You were never lost—just returning.',
        textHindi: 'आपको एक छुपा हुआ गाँव मिलता है जो आपका स्वागत करता है। आप खोए नहीं थे—बस लौट रहे थे।',
        choices: [
          { id: 'e1', text: 'Play again', textHindi: 'दोबारा खेलें' },
          { id: 'e2', text: 'Play again', textHindi: 'दोबारा खेलें' }
        ],
        ending: true,
        endingTitle: 'Homecoming',
        endingTitleHindi: 'घर वापसी',
        endingEmoji: '🏡'
      },
      {
        id: 'end2',
        text: 'You step into a memory and realize the forest is your guardian.',
        textHindi: 'आप एक याद में प्रवेश करते हैं और समझते हैं कि जंगल आपका संरक्षक है।',
        choices: [
          { id: 'e3', text: 'Play again', textHindi: 'दोबारा खेलें' },
          { id: 'e4', text: 'Play again', textHindi: 'दोबारा खेलें' }
        ],
        ending: true,
        endingTitle: 'Forest Guardian',
        endingTitleHindi: 'जंगल का रक्षक',
        endingEmoji: '🦌'
      },
      {
        id: 'end3',
        text: 'At sunrise, a boat appears. It carries you to the edge of the known world.',
        textHindi: 'सूर्योदय पर, एक नाव प्रकट होती है। यह आपको ज्ञात दुनिया के किनारे तक ले जाती है।',
        choices: [
          { id: 'e5', text: 'Play again', textHindi: 'दोबारा खेलें' },
          { id: 'e6', text: 'Play again', textHindi: 'दोबारा खेलें' }
        ],
        ending: true,
        endingTitle: 'New Horizons',
        endingTitleHindi: 'नए क्षितिज',
        endingEmoji: '⛵'
      }
    ]
  },
  {
    id: 'mystic-fork',
    title: 'Mystic Fork',
    titleHindi: 'रहस्यमयी दोराहा',
    description: 'A short interactive tale where each choice reshapes your fate.',
    descriptionHindi: 'एक छोटी इंटरएक्टिव कहानी जहाँ हर चुनाव आपकी किस्मत बदलता है।',
    emoji: '🧭',
    startNodeId: 'n1',
    maxSlides: 7,
    customization: {
      themeId: 'default',
      defaultLanguage: 'en',
      backgroundImage: '/globe.svg'
    },
    isFeatured: false,
    isViral: false,
    metadata: { views: 0, completions: 0, shares: 0, avgRating: 0, trendingScore: 0 },
    nodes: [
      {
        id: 'n1',
        text: 'At a forest fork, a silver path gleams while a shadowed trail beckons.',
        textHindi: 'जंगल के दोराहे पर, एक चांदी-सा रास्ता चमकता है और दूसरा साया बुलाता है।',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpqd7GwVECdd0p7kSiB8pdll5SL5Q9Iut6HQ&s',
        choices: [
          { id: 'c1', text: 'Take the silver path', textHindi: 'चांदी वाला रास्ता', nextId: 'n2' },
          { id: 'c2', text: 'Enter the shadowed trail', textHindi: 'साये वाला रास्ता', nextId: 'n3' }
        ]
      },
      {
        id: 'n2',
        text: 'Moonlight reveals carved runes pointing to a hidden glade.',
        textHindi: 'चांदनी में नक्काशीदार रून्स एक गुप्त उपवन की ओर इशारा करते हैं।',
        image: '/Users/mipl/Downloads/N2.png',
        choices: [
          { id: 'c3', text: 'Follow the runes', textHindi: 'रून्स का पीछा करें', nextId: 'end1' },
          { id: 'c4', text: 'Ignore and keep walking', textHindi: 'नज़रअंदाज़ करें और आगे बढ़ें', nextId: 'n4' }
        ]
      },
      {
        id: 'n3',
        text: 'A whisper offers guidance; a warm lantern glows to the east.',
        textHindi: 'एक फुसफुसाहट मार्गदर्शन देती है; पूरब में एक लालटेन गरमजोशी से चमकती है।',
        image: '/Users/mipl/Downloads/N3.png',
        choices: [
          { id: 'c5', text: 'Follow the whisper', textHindi: 'फुसफुसाहट का पीछा करें', nextId: 'n4' },
          { id: 'c6', text: 'Head to the lantern', textHindi: 'लालटेन की ओर जाएं', nextId: 'end2' }
        ]
      },
      {
        id: 'n4',
        text: 'You reach a river singing your name. A narrow bridge sways.',
        textHindi: 'आप एक नदी तक पहुँचते हैं जो आपका नाम गाती है। एक संकरा पुल हिलता है।',
        image: '/Users/mipl/Downloads/N4.png',
        choices: [
          { id: 'c7', text: 'Cross the bridge', textHindi: 'पुल पार करें', nextId: 'end2' },
          { id: 'c8', text: 'Walk along the bank', textHindi: 'किनारे-किनारे चलें', nextId: 'end3' }
        ]
      },
      {
        id: 'end1',
        text: 'The glade welcomes you home—you’ve found what you were missing.',
        textHindi: 'उपवन आपका स्वागत करता है—आपने वह पा लिया जो खोया था।',
        image: '/Users/mipl/Downloads/End 1.png',
        choices: [
          { id: 'e1', text: 'Play again', textHindi: 'दोबारा खेलें' },
          { id: 'e2', text: 'Play again', textHindi: 'दोबारा खेलें' }
        ],
        ending: true,
        endingTitle: 'Home Found',
        endingTitleHindi: 'घर मिला',
        endingEmoji: '🏡'
      },
      {
        id: 'end2',
        text: 'The lantern leads to an old friend—the forest was guiding you all along.',
        textHindi: 'लालटेन आपको एक पुराने दोस्त तक ले जाती है—जंगल हमेशा से आपका मार्गदर्शक था।',
        image:'/Users/mipl/Downloads/ENd 2.png',
        choices: [
          { id: 'e3', text: 'Play again', textHindi: 'दोबारा खेलें' },
          { id: 'e4', text: 'Play again', textHindi: 'दोबारा खेलें' }
        ],
        ending: true,
        endingTitle: 'Guided Light',
        endingTitleHindi: 'मार्गदर्शक रोशनी',
        endingEmoji: '🕯️'
      },
      {
        id: 'end3',
        text: 'At sunrise, a boat arrives and carries you beyond old horizons.',
        image:'/Users/mipl/Downloads/End 3.png',
        textHindi: 'सूर्योदय पर, एक नाव आती है और आपको पुराने क्षितिजों के पार ले जाती है।',
        choices: [
          { id: 'e5', text: 'Play again', textHindi: 'दोबारा खेलें' },
          { id: 'e6', text: 'Play again', textHindi: 'दोबारा खेलें' }
        ],
        ending: true,
        endingTitle: 'New Horizons',
        endingTitleHindi: 'नए क्षितिज',
        endingEmoji: '⛵'
      }
    ]
  },
  {
    id: "faded-bookmark",
    title: "The Faded Bookmark",
    titleHindi: "फीका पड़ा बुकमार्क",
    description: "An old bookstore, a familiar face. What will you say?",
    descriptionHindi: "एक पुरानी किताबों की दुकान, एक जाना-पहचाना चेहरा। आप क्या कहेंगे?",
    emoji: "📖",
    startNodeId: "n1",
    maxSlides: 7,
    customization: {
      themeId: "default",
      defaultLanguage: "en",
      backgroundImage: "/globe.svg"
    },
    // tags: ["story", "interactive", "romance"],
    isViral: false,
    isFeatured: false,
    nodes: [
      {
        id: "n1",
        text: "You're browsing the history section of an old bookstore. You turn a corner and see her... your ex. She hasn't seen you yet.",
        textHindi: "आप एक पुरानी किताबों की दुकान में इतिहास खंड ब्राउज़ कर रहे हैं। आप एक कोना मुड़ते हैं और उसे देखते हैं... आपकी पूर्व प्रेमिका। उसने अभी तक आपको नहीं देखा है।",
        image: "https://ik.imagekit.io/d9alrv9jnx/N1.png?updatedAt=1761251651310",
        choices: [
          { id: "c1", text: "Walk over and say hello", textHindi: "चलकर जाएँ और नमस्ते कहें", nextId: "n2" },
          { id: "c2", text: "Quietly leave the aisle", textHindi: "चुपचाप गलियारा छोड़ दें", nextId: "n3" }
        ]
      },
      {
        id: "n2",
        text: "She looks up, surprised, then smiles faintly. \"Hey... it's been a long time.\" An awkward silence hangs in the air.",
        textHindi: "वह चौंककर ऊपर देखती है, फिर हल्की सी मुस्कुराती है। \"हे... बहुत समय हो गया।\" हवा में एक अजीब सी खामोशी छा जाती है।",
        image: "https://ik.imagekit.io/d9alrv9jnx/N2.png?updatedAt=1761251651308",
        choices: [
          { id: "c3", text: "\"How have you been?\"", textHindi: "\"तुम कैसी हो?\"", nextId: "n4" },
          { id: "c4", text: "\"I was just grabbing a book.\"", textHindi: "\"मैं बस एक किताब ले रहा था।\"", nextId: "end1" }
        ]
      },
      {
        id: "n3",
        text: "You hide behind a tall shelf, your heart pounding. You peek... she's picking up a book on poetry, one you both used to love.",
        textHindi: "आप एक ऊँची शेल्फ के पीछे छिप जाते हैं, आपका दिल धड़क रहा है। आप झाँकते हैं... वह कविता की एक किताब उठा रही है, जो आप दोनों को पसंद थी।",
        image: "https://ik.imagekit.io/d9alrv9jnx/N3.png?updatedAt=1761251651340",
        choices: [
          { id: "c5", text: "Go talk to her", textHindi: "उससे बात करने जाएँ", nextId: "n2" },
          { id: "c6", text: "Head to the checkout", textHindi: "चेकआउट की ओर बढ़ें", nextId: "end2" }
        ]
      },
      {
        id: "n4",
        text: "She opens up a little. \"Life's been... different. Good, but different. You?\" You talk for a few minutes, the old familiarity mixing with the new distance.",
        textHindi: "वह थोड़ा खुलती है। \"ज़िंदगी... अलग रही है। अच्छी, लेकिन अलग। तुम?\" आप कुछ मिनट बात करते हैं, पुरानी जान-पहचान नई दूरी के साथ मिल जाती है।",
        image:'https://ik.imagekit.io/d9alrv9jnx/N4.png?updatedAt=1761251651021',
        choices: [
          { id: "c7", text: "\"We should catch up. Coffee?\"", textHindi: "\"हमें मिलना चाहिए। कॉफ़ी?\"", nextId: "end3" },
          { id: "c8", text: "\"Great seeing you. Bye.\"", textHindi: "\"मिलकर अच्छा लगा। अलविदा।\"", nextId: "end1" }
        ]
      },
      {
        id: "end1",
        text: "You exchange a polite goodbye. It's a closed chapter, and that feels... okay. You leave with your book and a sense of closure.",
        textHindi: "आप एक विनम्र अलविदा कहते हैं। यह एक बंद अध्याय है, और यह... ठीक लगता है। आप अपनी किताब और एक समाप्ति की भावना के साथ निकल जाते हैं।",
        image:'https://ik.imagekit.io/d9alrv9jnx/End%201.png?updatedAt=1761251651295',
        choices: [
          { id: "e1", text: "Play again" },
          { id: "e2", text: "Play again" }
        ],
        ending: true,
        endingTitle: "A Closed Chapter",
        endingTitleHindi: "एक बंद अध्याय",
        endingEmoji: "📕"
      },
      {
        id: "end2",
        text: "You leave the store, the words unsaid heavy in your pocket. Maybe some things are better left in the past.",
        textHindi: "आप दुकान से निकल जाते हैं, अनकहे शब्द आपकी जेब में भारी हैं। शायद कुछ चीज़ें अतीत में ही छोड़ देना बेहतर है।",
        image:'https://ik.imagekit.io/d9alrv9jnx/ENd%202.png?updatedAt=1761251650946',
        choices: [
          { id: "e3", text: "Play again" },
          { id: "e4", text: "Play again" }
        ],
        ending: true,
        endingTitle: "Words Unsaid",
        endingTitleHindi: "अनकहे शब्द",
        endingEmoji: "💨"
      },
      {
        id: "end3",
        text: "She smiles, genuinely this time. \"Yeah... I'd like that.\" You exchange numbers. It's not the past, but it might be a new beginning.",
        textHindi: "वह मुस्कुराती है, इस बार सच में। \"हाँ... मुझे अच्छा लगेगा।\" आप नंबरों का आदान-प्रदान करते हैं। यह अतीत नहीं है, लेकिन यह एक नई शुरुआत हो सकती है।",
        image:'https://ik.imagekit.io/d9alrv9jnx/End%203.png?updatedAt=1761251651293',
        choices: [
          { id: "e5", text: "Play again" },
          { id: "e6", text: "Play again" }
        ],
        ending: true,
        endingTitle: "A New Page?",
        endingTitleHindi: "एक नया पन्ना?",
        endingEmoji: "☕"
      }
    ]
  }
  
];

export function getAllStories(): StoryMeta[] {
  return stories;
}

export function getStoryById(id: string): StoryMeta | undefined {
  return stories.find(s => s.id === id);
}

export function getStoryForSEO(id: string) {
  const story = getStoryById(id);
  if (!story) return null;
  return {
    title: story.title,
    description: story.description,
    emoji: story.emoji,
    keywords: ['story', 'game', 'choices', 'interactive', 'adventure']
  };
}


