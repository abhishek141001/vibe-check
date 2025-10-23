'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  FileText, 
  Copy, 
  Check, 
  AlertCircle, 
  Eye, 
  Save, 
  Download,
  Upload,
  Code,
  Sparkles
} from 'lucide-react';

interface QuizTemplate {
  id: string;
  name: string;
  description: string;
  emoji: string;
  json: any;
}

export default function JsonQuizCreator() {
  const [jsonInput, setJsonInput] = useState('');
  const [quizPreview, setQuizPreview] = useState<any>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const templates: QuizTemplate[] = [
    {
      id: 'personality',
      name: 'Personality Quiz',
      description: 'A simple personality quiz with multiple choice questions',
      emoji: '🧠',
      json: {
        id: 'sample-personality-quiz',
        title: 'What\'s Your Personality Type?',
        titleHindi: 'आपका व्यक्तित्व कैसा है?',
        description: 'Discover your unique personality traits through this fun quiz!',
        descriptionHindi: 'इस मजेदार क्विज के माध्यम से अपने अनूठे व्यक्तित्व लक्षणों को खोजें!',
        emoji: '🧠',
        category: 'personality',
        tags: ['personality', 'psychology', 'self-discovery'],
        questions: [
          {
            id: 'q1',
            question: 'What do you do on a Friday night?',
            questionHindi: 'शुक्रवार की रात आप क्या करते हैं?',
            options: [
              { id: 'a1', text: 'Go out with friends', textHindi: 'दोस्तों के साथ बाहर जाएं', value: 'social' },
              { id: 'a2', text: 'Stay home and read', textHindi: 'घर पर रहकर पढ़ें', value: 'introvert' },
              { id: 'a3', text: 'Work on a project', textHindi: 'किसी प्रोजेक्ट पर काम करें', value: 'ambitious' },
              { id: 'a4', text: 'Watch movies', textHindi: 'फिल्में देखें', value: 'relaxed' }
            ]
          },
          {
            id: 'q2',
            question: 'How do you handle stress?',
            questionHindi: 'तनाव से कैसे निपटते हैं?',
            options: [
              { id: 'b1', text: 'Talk to friends', textHindi: 'दोस्तों से बात करें', value: 'social' },
              { id: 'b2', text: 'Meditate or exercise', textHindi: 'ध्यान या व्यायाम करें', value: 'mindful' },
              { id: 'b3', text: 'Make a plan', textHindi: 'योजना बनाएं', value: 'organized' },
              { id: 'b4', text: 'Take a break', textHindi: 'ब्रेक लें', value: 'relaxed' }
            ]
          }
        ],
        results: [
          {
            id: 'social-butterfly',
            name: 'Social Butterfly',
            nameHindi: 'सामाजिक तितली',
            emoji: '🦋',
            description: 'You love being around people and thrive in social situations!',
            descriptionHindi: 'आप लोगों के आसपास रहना पसंद करते हैं और सामाजिक स्थितियों में फलते-फूलते हैं!',
            color: '#FF6B6B'
          },
          {
            id: 'wise-owl',
            name: 'Wise Owl',
            nameHindi: 'बुद्धिमान उल्लू',
            emoji: '🦉',
            description: 'You are thoughtful, introspective, and value deep connections.',
            descriptionHindi: 'आप विचारशील, आत्मनिरीक्षण करने वाले हैं और गहरे संबंधों को महत्व देते हैं।',
            color: '#4ECDC4'
          },
          {
            id: 'go-getter',
            name: 'Go-Getter',
            nameHindi: 'लक्ष्य प्राप्तकर्ता',
            emoji: '🚀',
            description: 'You are ambitious, driven, and always working towards your goals!',
            descriptionHindi: 'आप महत्वाकांक्षी, प्रेरित हैं और हमेशा अपने लक्ष्यों की ओर काम करते रहते हैं!',
            color: '#45B7D1'
          },
          {
            id: 'zen-master',
            name: 'Zen Master',
            nameHindi: 'ध्यान गुरु',
            emoji: '🧘',
            description: 'You are calm, balanced, and find peace in simplicity.',
            descriptionHindi: 'आप शांत, संतुलित हैं और सादगी में शांति पाते हैं।',
            color: '#96CEB4'
          }
        ],
        scoringConfig: {
          rules: [
            {
              questionId: 'q1',
              answerValue: 'social',
              results: { 'social-butterfly': 2, 'go-getter': 1 }
            },
            {
              questionId: 'q1',
              answerValue: 'introvert',
              results: { 'wise-owl': 2, 'zen-master': 1 }
            },
            {
              questionId: 'q1',
              answerValue: 'ambitious',
              results: { 'go-getter': 2, 'social-butterfly': 1 }
            },
            {
              questionId: 'q1',
              answerValue: 'relaxed',
              results: { 'zen-master': 2, 'wise-owl': 1 }
            },
            {
              questionId: 'q2',
              answerValue: 'social',
              results: { 'social-butterfly': 2 }
            },
            {
              questionId: 'q2',
              answerValue: 'mindful',
              results: { 'zen-master': 2, 'wise-owl': 1 }
            },
            {
              questionId: 'q2',
              answerValue: 'organized',
              results: { 'go-getter': 2 }
            },
            {
              questionId: 'q2',
              answerValue: 'relaxed',
              results: { 'zen-master': 1, 'social-butterfly': 1 }
            }
          ],
          defaultResult: 'zen-master'
        }
      }
    },
    {
      id: 'entertainment',
      name: 'Entertainment Quiz',
      description: 'A quiz about movies, music, and pop culture',
      emoji: '🎬',
      json: {
        id: 'sample-entertainment-quiz',
        title: 'What\'s Your Entertainment Vibe?',
        titleHindi: 'आपका मनोरंजन वाइब क्या है?',
        description: 'Find out what type of entertainment matches your personality!',
        descriptionHindi: 'पता करें कि किस प्रकार का मनोरंजन आपके व्यक्तित्व से मेल खाता है!',
        emoji: '🎬',
        category: 'entertainment',
        tags: ['movies', 'music', 'entertainment', 'pop-culture'],
        questions: [
          {
            id: 'q1',
            question: 'What\'s your ideal Friday night?',
            questionHindi: 'आपकी आदर्श शुक्रवार रात क्या है?',
            options: [
              { id: 'a1', text: 'Netflix and chill', textHindi: 'नेटफ्लिक्स और आराम', value: 'streaming' },
              { id: 'a2', text: 'Concert or live music', textHindi: 'कॉन्सर्ट या लाइव संगीत', value: 'live' },
              { id: 'a3', text: 'Movie theater', textHindi: 'सिनेमा हॉल', value: 'cinema' },
              { id: 'a4', text: 'Gaming marathon', textHindi: 'गेमिंग मैराथन', value: 'gaming' }
            ]
          }
        ],
        results: [
          {
            id: 'streaming-queen',
            name: 'Streaming Queen',
            nameHindi: 'स्ट्रीमिंग क्वीन',
            emoji: '📺',
            description: 'You love discovering new shows and have the best recommendations!',
            descriptionHindi: 'आप नए शो खोजना पसंद करते हैं और सबसे अच्छी सिफारिशें देते हैं!',
            color: '#E91E63'
          },
          {
            id: 'music-lover',
            name: 'Music Lover',
            nameHindi: 'संगीत प्रेमी',
            emoji: '🎵',
            description: 'You live and breathe music, always discovering new artists!',
            descriptionHindi: 'आप संगीत में जीते और सांस लेते हैं, हमेशा नए कलाकारों की खोज करते रहते हैं!',
            color: '#9C27B0'
          },
          {
            id: 'cinema-buff',
            name: 'Cinema Buff',
            nameHindi: 'सिनेमा प्रेमी',
            emoji: '🎭',
            description: 'You appreciate the art of filmmaking and love discussing movies!',
            descriptionHindi: 'आप फिल्म निर्माण की कला की सराहना करते हैं और फिल्मों पर चर्चा करना पसंद करते हैं!',
            color: '#FF9800'
          },
          {
            id: 'gaming-enthusiast',
            name: 'Gaming Enthusiast',
            nameHindi: 'गेमिंग उत्साही',
            emoji: '🎮',
            description: 'You love immersive gaming experiences and virtual adventures!',
            descriptionHindi: 'आप गहन गेमिंग अनुभवों और आभासी रोमांच को पसंद करते हैं!',
            color: '#4CAF50'
          }
        ],
        scoringConfig: {
          rules: [
            {
              questionId: 'q1',
              answerValue: 'streaming',
              results: { 'streaming-queen': 3 }
            },
            {
              questionId: 'q1',
              answerValue: 'live',
              results: { 'music-lover': 3 }
            },
            {
              questionId: 'q1',
              answerValue: 'cinema',
              results: { 'cinema-buff': 3 }
            },
            {
              questionId: 'q1',
              answerValue: 'gaming',
              results: { 'gaming-enthusiast': 3 }
            }
          ],
          defaultResult: 'streaming-queen'
        }
      }
    },
    {
      id: 'minimal',
      name: 'Minimal Quiz',
      description: 'A simple quiz with basic structure',
      emoji: '⚡',
      json: {
        id: 'minimal-quiz',
        title: 'Quick Personality Check',
        description: 'A simple 2-question personality assessment',
        emoji: '⚡',
        questions: [
          {
            id: 'q1',
            question: 'What energizes you more?',
            options: [
              { id: 'a1', text: 'Being around people', value: 'extrovert' },
              { id: 'a2', text: 'Quiet time alone', value: 'introvert' }
            ]
          },
          {
            id: 'q2',
            question: 'How do you make decisions?',
            options: [
              { id: 'b1', text: 'Follow your heart', value: 'feeling' },
              { id: 'b2', text: 'Analyze the facts', value: 'thinking' }
            ]
          }
        ],
        results: [
          {
            id: 'extrovert-feeling',
            name: 'The People Person',
            emoji: '🤝',
            description: 'You love connecting with others and making decisions based on feelings.',
            color: '#FF6B6B'
          },
          {
            id: 'extrovert-thinking',
            name: 'The Leader',
            emoji: '👑',
            description: 'You enjoy being around people and make logical decisions.',
            color: '#4ECDC4'
          },
          {
            id: 'introvert-feeling',
            name: 'The Empath',
            emoji: '💝',
            description: 'You prefer quiet environments and trust your emotions.',
            color: '#45B7D1'
          },
          {
            id: 'introvert-thinking',
            name: 'The Analyst',
            emoji: '🔍',
            description: 'You enjoy solitude and make decisions based on analysis.',
            color: '#96CEB4'
          }
        ],
        scoringConfig: {
          rules: [
            {
              questionId: 'q1',
              answerValue: 'extrovert',
              results: { 'extrovert-feeling': 1, 'extrovert-thinking': 1 }
            },
            {
              questionId: 'q1',
              answerValue: 'introvert',
              results: { 'introvert-feeling': 1, 'introvert-thinking': 1 }
            },
            {
              questionId: 'q2',
              answerValue: 'feeling',
              results: { 'extrovert-feeling': 1, 'introvert-feeling': 1 }
            },
            {
              questionId: 'q2',
              answerValue: 'thinking',
              results: { 'extrovert-thinking': 1, 'introvert-thinking': 1 }
            }
          ],
          defaultResult: 'extrovert-feeling'
        }
      }
    }
  ];

  useEffect(() => {
    validateJson();
  }, [jsonInput]);

  const validateJson = () => {
    if (!jsonInput.trim()) {
      setValidationErrors([]);
      setIsValid(false);
      setQuizPreview(null);
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      const errors: string[] = [];

      // Required fields validation
      if (!parsed.id) errors.push('Missing required field: id');
      if (!parsed.title) errors.push('Missing required field: title');
      if (!parsed.description) errors.push('Missing required field: description');
      if (!parsed.emoji) errors.push('Missing required field: emoji');
      if (!parsed.questions || !Array.isArray(parsed.questions)) {
        errors.push('Missing or invalid field: questions (must be an array)');
      }
      if (!parsed.results || !Array.isArray(parsed.results)) {
        errors.push('Missing or invalid field: results (must be an array)');
      }

      // Questions validation
      if (parsed.questions && Array.isArray(parsed.questions)) {
        parsed.questions.forEach((question: any, index: number) => {
          if (!question.id) errors.push(`Question ${index + 1}: Missing id`);
          if (!question.question) errors.push(`Question ${index + 1}: Missing question text`);
          if (!question.options || !Array.isArray(question.options)) {
            errors.push(`Question ${index + 1}: Missing or invalid options array`);
          } else {
            question.options.forEach((option: any, optIndex: number) => {
              if (!option.id) errors.push(`Question ${index + 1}, Option ${optIndex + 1}: Missing id`);
              if (!option.text) errors.push(`Question ${index + 1}, Option ${optIndex + 1}: Missing text`);
              if (!option.value) errors.push(`Question ${index + 1}, Option ${optIndex + 1}: Missing value`);
            });
          }
        });
      }

      // Results validation
      if (parsed.results && Array.isArray(parsed.results)) {
        parsed.results.forEach((result: any, index: number) => {
          if (!result.id) errors.push(`Result ${index + 1}: Missing id`);
          if (!result.name) errors.push(`Result ${index + 1}: Missing name`);
          if (!result.emoji) errors.push(`Result ${index + 1}: Missing emoji`);
          if (!result.description) errors.push(`Result ${index + 1}: Missing description`);
          if (!result.color) errors.push(`Result ${index + 1}: Missing color`);
        });
      }

      setValidationErrors(errors);
      setIsValid(errors.length === 0);
      setQuizPreview(errors.length === 0 ? parsed : null);
    } catch (error) {
      setValidationErrors(['Invalid JSON format']);
      setIsValid(false);
      setQuizPreview(null);
    }
  };

  const copyTemplate = async (template: QuizTemplate) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(template.json, null, 2));
      setCopiedTemplate(template.id);
      setTimeout(() => setCopiedTemplate(null), 2000);
    } catch (error) {
      console.error('Failed to copy template:', error);
    }
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
    } catch (error) {
      // Invalid JSON, can't format
    }
  };

  const downloadJson = () => {
    const blob = new Blob([jsonInput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${quizPreview?.id || 'quiz'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const uploadJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setJsonInput(content);
      };
      reader.readAsText(file);
    }
  };

  const saveQuiz = async () => {
    if (!isValid || !quizPreview) return;

    setLoading(true);
    try {
      const response = await fetch('/api/quiz/create-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizPreview)
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const error = await response.json();
        setValidationErrors([error.message || 'Failed to save quiz']);
      }
    } catch (error) {
      setValidationErrors(['Network error. Please try again.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">JSON Quiz Creator</h1>
          <p className="text-sm sm:text-base text-gray-600">Create quizzes by pasting JSON or using our templates</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Templates Sidebar */}
          <div className="xl:col-span-1">
            <Card className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Templates
              </h2>
              <p className="text-sm text-gray-600 mb-4">Click to copy a template to get started</p>
              
              <div className="space-y-3">
                {templates.map((template) => (
                  <motion.div
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={() => copyTemplate(template)}
                      className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{template.emoji}</div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{template.name}</h3>
                          <p className="text-xs text-gray-600">{template.description}</p>
                        </div>
                        {copiedTemplate === template.id ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Editor */}
          <div className="xl:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* JSON Editor */}
              <Card className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    JSON Editor
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={formatJson}
                      disabled={!jsonInput.trim()}
                    >
                      Format
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={downloadJson}
                      disabled={!jsonInput.trim()}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <label className="cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <input
                        type="file"
                        accept=".json"
                        onChange={uploadJson}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="json-input">Quiz JSON</Label>
                    <textarea
                      id="json-input"
                      value={jsonInput}
                      onChange={(e) => setJsonInput(e.target.value)}
                      placeholder="Paste your quiz JSON here or use a template..."
                      className="w-full h-64 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Validation Errors */}
                  {validationErrors.length > 0 && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium text-red-700">Validation Errors</span>
                      </div>
                      <ul className="text-xs text-red-600 space-y-1">
                        {validationErrors.map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Success Message */}
                  {success && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-700">Quiz saved successfully!</span>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={saveQuiz}
                    disabled={!isValid || loading}
                    className="w-full bg-purple-500 hover:bg-purple-600"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Saving...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        <span>Save Quiz</span>
                      </div>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Preview */}
              {quizPreview && (
                <Card className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Preview
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl mb-2">{quizPreview.emoji}</div>
                      <h3 className="text-lg font-bold">{quizPreview.title}</h3>
                      {quizPreview.titleHindi && (
                        <h3 className="text-lg font-bold text-gray-600">{quizPreview.titleHindi}</h3>
                      )}
                      <p className="text-sm text-gray-600 mt-2">{quizPreview.description}</p>
                      {quizPreview.descriptionHindi && (
                        <p className="text-sm text-gray-600">{quizPreview.descriptionHindi}</p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Questions ({quizPreview.questions?.length || 0})</h4>
                        <div className="space-y-2">
                          {quizPreview.questions?.slice(0, 2).map((question: any, index: number) => (
                            <div key={question.id} className="p-2 bg-gray-50 rounded text-xs">
                              <div className="font-medium">{index + 1}. {question.question}</div>
                              <div className="text-gray-600 mt-1">
                                {question.options?.length || 0} options
                              </div>
                            </div>
                          ))}
                          {quizPreview.questions?.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{quizPreview.questions.length - 2} more questions
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-2">Results ({quizPreview.results?.length || 0})</h4>
                        <div className="space-y-2">
                          {quizPreview.results?.slice(0, 3).map((result: any) => (
                            <div key={result.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-xs">
                              <span className="text-lg">{result.emoji}</span>
                              <div>
                                <div className="font-medium">{result.name}</div>
                                <div className="text-gray-600 truncate">{result.description}</div>
                              </div>
                            </div>
                          ))}
                          {quizPreview.results?.length > 3 && (
                            <div className="text-xs text-gray-500">
                              +{quizPreview.results.length - 3} more results
                            </div>
                          )}
                        </div>
                      </div>

                      {quizPreview.tags && (
                        <div>
                          <h4 className="font-medium text-sm mb-2">Tags</h4>
                          <div className="flex flex-wrap gap-1">
                            {quizPreview.tags.map((tag: string) => (
                              <span key={tag} className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
