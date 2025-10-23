'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Copy, Check, Facebook, Instagram, Twitter, MessageCircle, Mail, QrCode, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTheme } from '../theme/ThemeProvider';
import { useLanguage } from './LanguageToggle';

interface QuizShareButtonProps {
  quizId: string;
  quizTitle: string;
  quizEmoji: string;
  quizDescription?: string;
  result?: string;
  className?: string;
}

export default function QuizShareButton({ 
  quizId, 
  quizTitle, 
  quizEmoji, 
  quizDescription,
  result,
  className = ""
}: QuizShareButtonProps) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const { currentTheme } = useTheme();
  const { language } = useLanguage();

  const quizUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/quiz/${quizId}`;
  const shareText = result 
    ? `I got "${result}" in the ${quizTitle} quiz! ${quizEmoji} Take the quiz to find yours: ${quizUrl}`
    : `Check out this fun quiz: ${quizTitle} ${quizEmoji} ${quizUrl}`;
  
  const shareTextHindi = result
    ? `मैंने "${result}" प्राप्त किया ${quizTitle} क्विज़ में! ${quizEmoji} अपना परिणाम जानने के लिए क्विज़ करें: ${quizUrl}`
    : `इस मजेदार क्विज़ को देखें: ${quizTitle} ${quizEmoji} ${quizUrl}`;

  const finalShareText = language === 'hi' ? shareTextHindi : shareText;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(quizUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleSocialShare = (platform: string) => {
    const encodedText = encodeURIComponent(finalShareText);
    const encodedUrl = encodeURIComponent(quizUrl);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct URL sharing, so we'll copy the text
        navigator.clipboard.writeText(finalShareText);
        alert('Text copied! Paste it in your Instagram story or post.');
        return;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(quizTitle)}&body=${encodedText}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const shareOptions = [
    {
      id: 'copy',
      name: language === 'hi' ? 'लिंक कॉपी करें' : 'Copy Link',
      icon: copied ? Check : Copy,
      action: handleCopyLink,
      color: 'bg-gray-600 hover:bg-gray-700',
      showCopied: copied
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      action: () => handleSocialShare('twitter'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      action: () => handleSocialShare('facebook'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageCircle,
      action: () => handleSocialShare('whatsapp'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      action: () => handleSocialShare('instagram'),
      color: 'bg-pink-500 hover:bg-pink-600'
    },
    {
      id: 'email',
      name: language === 'hi' ? 'ईमेल' : 'Email',
      icon: Mail,
      action: () => handleSocialShare('email'),
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className={`relative ${className}`}>
      <Button
        onClick={() => setShowShareOptions(!showShareOptions)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium"
        style={{
          backgroundColor: currentTheme.colors.primary,
          color: 'white',
          borderRadius: currentTheme.layout.borderRadius
        }}
      >
        <Share2 className="w-4 h-4" />
        {language === 'hi' ? 'शेयर करें' : 'Share Quiz'}
        <ExternalLink className="w-3 h-3" />
      </Button>

      <AnimatePresence>
        {showShareOptions && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-20 z-40"
              onClick={() => setShowShareOptions(false)}
            />
            
            {/* Share Options */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-full left-0 mt-2 z-50 w-64 sm:w-72"
            >
              <Card 
                className="p-4 shadow-xl border-0"
                style={{
                  backgroundColor: currentTheme.colors.surface,
                  borderRadius: currentTheme.layout.borderRadius,
                  borderColor: currentTheme.colors.border
                }}
              >
                <div className="space-y-3">
                  <div className="text-center">
                    <h3 
                      className="text-lg font-semibold mb-1"
                      style={{ 
                        color: currentTheme.colors.text,
                        fontFamily: currentTheme.fonts.heading
                      }}
                    >
                      {language === 'hi' ? 'क्विज़ शेयर करें' : 'Share Quiz'}
                    </h3>
                    <p 
                      className="text-sm"
                      style={{ 
                        color: currentTheme.colors.textSecondary,
                        fontFamily: currentTheme.fonts.body
                      }}
                    >
                      {language === 'hi' ? 'अपने दोस्तों के साथ साझा करें' : 'Share with your friends'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {shareOptions.map((option) => (
                      <motion.div
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={option.action}
                          className={`w-full flex items-center gap-2 text-white text-sm font-medium ${option.color} transition-all duration-200`}
                          style={{ borderRadius: currentTheme.layout.borderRadius }}
                        >
                          <option.icon className="w-4 h-4" />
                          <span className="truncate">{option.name}</span>
                          {option.showCopied && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-green-300"
                            >
                              ✓
                            </motion.span>
                          )}
                        </Button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Share Text Preview */}
                  <div 
                    className="p-3 rounded-lg text-xs"
                    style={{ 
                      backgroundColor: currentTheme.colors.background,
                      color: currentTheme.colors.textSecondary,
                      fontFamily: currentTheme.fonts.body
                    }}
                  >
                    <div className="font-medium mb-1">
                      {language === 'hi' ? 'शेयर टेक्स्ट:' : 'Share Text:'}
                    </div>
                    <div className="line-clamp-3 italic">
                      "{finalShareText}"
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2 pt-2 border-t" style={{ borderColor: currentTheme.colors.border }}>
                    <Button
                      onClick={handleCopyLink}
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      style={{
                        borderColor: currentTheme.colors.border,
                        color: currentTheme.colors.text,
                        backgroundColor: 'transparent'
                      }}
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 mr-1" />
                          {language === 'hi' ? 'कॉपी हो गया!' : 'Copied!'}
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1" />
                          {language === 'hi' ? 'कॉपी करें' : 'Copy Text'}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
