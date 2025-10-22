# 🏛️ Bihar Heritage & Chhath Festival Quiz

A special bilingual quiz celebrating Bihar's rich cultural heritage and the sacred Chhath festival.

## ✨ Features

### 🌅 Chhath Festival Special
- **Festival Focus**: Dedicated questions about Chhath Puja traditions
- **Cultural Heritage**: Questions about Bihar's historical significance
- **Traditional Foods**: Litti Chokha, Sattu, Thekua, and more
- **Spiritual Elements**: Nalanda, Buddha, Ganga Aarti

### 🔄 Full Bilingual Support
- **Hindi & English**: Complete translation support
- **Language Toggle**: Switch between languages anytime
- **Cultural Context**: Proper Hindi translations with cultural nuances
- **AI Descriptions**: Gemini AI generates descriptions in both languages

### 🎯 Quiz Results
1. **Chhath Devotee** (छठ भक्त) - True festival devotees
2. **Bihar Scholar** (बिहार विद्वान) - Intellectual heritage lovers
3. **Cultural Ambassador** (सांस्कृतिक राजदूत) - Tradition keepers
4. **Spiritual Seeker** (आध्यात्मिक साधक) - Enlightenment seekers

## 🎨 Special Design Elements

### Bihar-Themed Styling
- **Color Scheme**: Orange and red gradients (Chhath colors)
- **Background**: Warm sunset colors representing Chhath
- **Decorations**: Sun and temple emojis (🌅🏛️🌅)
- **Greetings**: "Happy Chhath Puja!" / "छठ पूजा की शुभकामनाएं!"

### Cultural Questions
1. **Festival Preferences**: Chhath, Durga Puja, Diwali, Holi
2. **Traditional Foods**: Litti Chokha, Sattu Paratha, Dal Puri, Thekua
3. **Cultural Symbols**: Nalanda, Buddha's Enlightenment, Ganga Aarti, Bhojpuri Culture
4. **Celebration Style**: Ghat rituals, home traditions, community events, spiritual practices

## 🚀 Technical Implementation

### Bilingual Architecture
```typescript
interface QuizQuestion {
  question: string;
  questionHindi?: string;
  options: {
    text: string;
    textHindi?: string;
  }[];
}

interface QuizResult {
  name: string;
  nameHindi?: string;
  description: string;
  descriptionHindi?: string;
}
```

### Language Context
- **React Context**: Global language state management
- **Language Toggle**: Real-time language switching
- **AI Integration**: Language-aware description generation
- **Fallback Support**: English fallback for missing translations

### Special Features
- **Cultural Accuracy**: Proper Hindi translations with cultural context
- **Festival Timing**: Special greetings during Chhath season
- **Result Personalization**: AI-generated descriptions in both languages
- **Shareable Content**: Bilingual social media sharing

## 🎯 Usage

### Access the Quiz
```
/quiz/bihar-heritage
```

### Language Switching
- Toggle between English and Hindi using the language button
- All content updates in real-time
- AI descriptions generated in selected language

### Cultural Elements
- **Chhath Puja**: Questions about ghat rituals and traditions
- **Bihar Foods**: Traditional cuisine preferences
- **Historical Sites**: Nalanda, Bodh Gaya connections
- **Spiritual Practices**: Meditation, prayer, community celebration

## 🌟 Special Features for Chhath Festival

### Festival-Specific Content
- **Chhath Questions**: Detailed questions about festival traditions
- **Ghat Rituals**: Questions about river-side celebrations
- **Traditional Foods**: Thekua, special festival dishes
- **Spiritual Practices**: Sun worship, meditation, prayer

### Cultural Authenticity
- **Proper Hindi**: Native-level translations
- **Cultural Context**: Bihar-specific references
- **Festival Spirit**: Respectful representation of traditions
- **Community Focus**: Emphasis on family and community celebration

## 📱 Shareable Results

### Bilingual Sharing
- **English**: "I'm a Chhath Devotee! 🌅 Take the quiz to find yours!"
- **Hindi**: "मैं एक छठ भक्त हूँ! 🌅 अपना पता लगाने के लिए क्विज़ करें!"

### Cultural Hashtags
- #ChhathPuja #BiharHeritage #छठपूजा #बिहारविरासत
- #CulturalQuiz #FestivalVibes #संस्कृतिक्विज़

## 🎨 Design Philosophy

### Cultural Respect
- **Authentic Representation**: True to Bihar's culture
- **Festival Spirit**: Captures the essence of Chhath
- **Community Values**: Emphasizes family and tradition
- **Spiritual Elements**: Respectful treatment of religious practices

### User Experience
- **Easy Language Switch**: One-click language toggle
- **Cultural Context**: Explanations for non-Bihari users
- **Festival Feel**: Warm, celebratory design
- **Accessibility**: Clear, readable fonts for both languages

---

**Made with ❤️ for Bihar's rich cultural heritage and the sacred Chhath festival**
