'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { QuizResult } from '@/lib/quiz-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, RotateCcw, Download, Facebook, Instagram, MessageCircle } from 'lucide-react';
import Confetti from 'react-confetti';
import { useLanguage } from './LanguageToggle';
import { useTheme } from '../theme/ThemeProvider';
import { QuizCustomization } from '@/lib/quiz-data';
import html2canvas from 'html2canvas';
import RecommendedQuizzes from './RecommendedQuizzes';

interface UserInfo {
  name: string;
  age: number;
}

interface ResultCardProps {
  result: QuizResult;
  quizId: string;
  onRetake: () => void;
  aiDescription?: string;
  userInfo?: UserInfo | null;
  customization?: QuizCustomization;
}

export default function ResultCard({ result, quizId, onRetake, aiDescription, userInfo, customization: quizCustomization }: ResultCardProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showShareOptions, setShowShareOptions] = useState(false);
  const resultCardRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const { currentTheme, customization } = useTheme();
  
  // Use quiz-specific customization if provided, otherwise fall back to theme context
  const finalCustomization = quizCustomization || customization || {
    showShareButtons: true,
    allowRetake: true,
    enablePersonalization: true,
    personalizationFields: ['name']
  };

  // Generate personalized message based on user info and result
  const getPersonalizedMessage = () => {
    // If personalization is disabled or no user info, return AI description or default
    if (!finalCustomization.enablePersonalization || !userInfo) {
      return aiDescription || result.description;
    }
    
    // Check if we have valid user info
    const name = userInfo.name?.trim();
    const age = userInfo.age;
    
    // If no name or age is 0, return default description
    if (!name || age === 0) {
      return aiDescription || result.description;
    }
    
    // Use predefined personalized message from quiz data if available
    if (result.personalizedMessage) {
      // Choose the appropriate language version of the message
      let personalizedMessage = result.personalizedMessage; // Default to English
      
      // Use Hindi version if language is Hindi and Hindi message exists
      if (language === 'hi' && result.personalizedMessageHindi) {
        personalizedMessage = result.personalizedMessageHindi;
      }
      
      // Replace placeholder with actual name if the message contains placeholders
      return personalizedMessage.replace(/\{name\}/g, name).replace(/\{age\}/g, age.toString());
    }
    
    // Fallback to AI description or default description
    return aiDescription || result.description;
  };

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    
    // Stop confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = async () => {
    if (!resultCardRef.current) return;
    
    try {
      // Create a temporary container with simplified styling
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      tempContainer.style.width = '800px';
      tempContainer.style.height = '600px';
      tempContainer.style.background = `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`;
      tempContainer.style.borderRadius = '16px';
      tempContainer.style.padding = '40px';
      tempContainer.style.display = 'flex';
      tempContainer.style.flexDirection = 'column';
      tempContainer.style.alignItems = 'center';
      tempContainer.style.justifyContent = 'center';
      tempContainer.style.color = 'white';
      tempContainer.style.fontFamily = currentTheme.fonts.body;
      tempContainer.style.textAlign = 'center';
      
      // Add content
      tempContainer.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 20px;">${result.emoji}</div>
        <div style="font-size: 36px; font-weight: bold; margin-bottom: 20px;">${result.name}</div>
        <div style="font-size: 18px; line-height: 1.5; max-width: 600px;">${getPersonalizedMessage()}</div>
        <div style="font-size: 16px; margin-top: 20px; opacity: 0.8;">Take the quiz to find yours!</div>
      `;
      
      document.body.appendChild(tempContainer);
      
      const canvas = await html2canvas(tempContainer, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        width: 800,
        height: 600
      });
      
      // Clean up
      document.body.removeChild(tempContainer);
      
      const link = document.createElement('a');
      link.download = `${result.name}-quiz-result.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image. Please try again.');
    }
  };

  const getShareText = () => {
    const quizUrl = `${window.location.origin}/quiz/${quizId}`;
    return `"${getPersonalizedMessage()} ${result.emoji} Take the quiz to find yours! ${quizUrl} #QuizTime"`;
  };

  const generateShareImage = async () => {
    if (!resultCardRef.current) return null;
    
    try {
      // Create a temporary container with simplified styling
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      tempContainer.style.width = '800px';
      tempContainer.style.height = '600px';
      tempContainer.style.background = `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`;
      tempContainer.style.borderRadius = '16px';
      tempContainer.style.padding = '40px';
      tempContainer.style.display = 'flex';
      tempContainer.style.flexDirection = 'column';
      tempContainer.style.alignItems = 'center';
      tempContainer.style.justifyContent = 'center';
      tempContainer.style.color = 'white';
      tempContainer.style.fontFamily = currentTheme.fonts.body;
      tempContainer.style.textAlign = 'center';
      
      // Add content
      tempContainer.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 20px;">${result.emoji}</div>
        <div style="font-size: 36px; font-weight: bold; margin-bottom: 20px;">${result.name}</div>
        <div style="font-size: 18px; line-height: 1.5; max-width: 600px;">${getPersonalizedMessage()}</div>
        <div style="font-size: 16px; margin-top: 20px; opacity: 0.8;">Take the quiz to find yours!</div>
      `;
      
      document.body.appendChild(tempContainer);
      
      const canvas = await html2canvas(tempContainer, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        width: 800,
        height: 600
      });
      
      // Clean up
      document.body.removeChild(tempContainer);
      
      return canvas.toDataURL();
    } catch (error) {
      console.error('Error generating share image:', error);
      return null;
    }
  };

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  const handleSocialShare = async (platform: string) => {
    const shareText = getShareText();
    const quizUrl = `${window.location.origin}/quiz/${quizId}`;
    
    // Generate the share image
    const imageDataUrl = await generateShareImage();
    
    switch (platform) {
      case 'facebook':
        // For Facebook, we'll use the Web Share API if available, otherwise fallback to URL
        if (navigator.share && imageDataUrl) {
          try {
            // Convert data URL to blob
            const response = await fetch(imageDataUrl);
            const blob = await response.blob();
            const file = new File([blob], `${result.name}-quiz-result.png`, { type: 'image/png' });
            
            await navigator.share({
              title: result.name,
              text: shareText,
              url: quizUrl,
              files: [file]
            });
            return;
          } catch (error) {
            console.log('Web Share API failed, falling back to URL');
          }
        }
        // Fallback to URL sharing
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(quizUrl)}&quote=${encodeURIComponent(shareText)}`;
        window.open(facebookUrl, '_blank', 'width=600,height=400');
        break;
        
      case 'instagram':
        // For Instagram, we'll download the image and try to open Instagram
        if (imageDataUrl) {
          // Download the image first
          const link = document.createElement('a');
          link.download = `${result.name}-quiz-result.png`;
          link.href = imageDataUrl;
          link.click();
          
          // Try to open Instagram app or web
          const instagramUrl = 'instagram://story-camera';
          const instagramWebUrl = 'https://www.instagram.com/';
          
          // Try to open Instagram app first
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = instagramUrl;
          document.body.appendChild(iframe);
          
          // Fallback to web after a short delay
          setTimeout(() => {
            document.body.removeChild(iframe);
            window.open(instagramWebUrl, '_blank');
          }, 1000);
          
          // Copy text to clipboard
          navigator.clipboard.writeText(shareText);
          alert('Image downloaded! Instagram will open - you can add the image to your story and paste the text.');
        }
        break;
        
      case 'whatsapp':
        // For WhatsApp, we'll use the Web Share API if available
        if (navigator.share && imageDataUrl) {
          try {
            const response = await fetch(imageDataUrl);
            const blob = await response.blob();
            const file = new File([blob], `${result.name}-quiz-result.png`, { type: 'image/png' });
            
            await navigator.share({
              title: result.name,
              text: shareText,
              url: quizUrl,
              files: [file]
            });
            return;
          } catch (error) {
            console.log('Web Share API failed, falling back to URL');
          }
        }
        // Fallback to URL sharing
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(whatsappUrl, '_blank', 'width=600,height=400');
        break;
        
      case 'twitter':
        // For Twitter, we'll use the Web Share API if available
        if (navigator.share && imageDataUrl) {
          try {
            const response = await fetch(imageDataUrl);
            const blob = await response.blob();
            const file = new File([blob], `${result.name}-quiz-result.png`, { type: 'image/png' });
            
            await navigator.share({
              title: result.name,
              text: shareText,
              url: quizUrl,
              files: [file]
            });
            return;
          } catch (error) {
            console.log('Web Share API failed, falling back to URL');
          }
        }
        // Fallback to URL sharing
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        window.open(twitterUrl, '_blank', 'width=600,height=400');
        break;
        
      default:
        return;
    }
  };

  const handleCopyLink = async () => {
    const shareText = getShareText();
    const quizUrl = `${window.location.origin}/quiz/${quizId}`;
    const imageDataUrl = await generateShareImage();
    
    // Try to use Web Share API first (works on mobile and some desktop browsers)
    if (navigator.share && imageDataUrl) {
      try {
        const response = await fetch(imageDataUrl);
        const blob = await response.blob();
        const file = new File([blob], `${result.name}-quiz-result.png`, { type: 'image/png' });
        
        await navigator.share({
          title: result.name,
          text: shareText,
          url: quizUrl,
          files: [file]
        });
        setShowShareOptions(false);
        return;
      } catch (error) {
        console.log('Web Share API failed, falling back to download + copy');
      }
    }
    
    // Fallback: Download image and copy text
    if (imageDataUrl) {
      const link = document.createElement('a');
      link.download = `${result.name}-quiz-result.png`;
      link.href = imageDataUrl;
      link.click();
    }
    
    navigator.clipboard.writeText(shareText);
    alert('Image downloaded and link copied to clipboard!');
    setShowShareOptions(false);
  };


  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          style={{ pointerEvents: 'none' }}
        />
      )}

      <motion.div
        ref={resultCardRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: parseFloat(currentTheme.animations.duration) / 1000, 
          delay: 0.2,
          ease: currentTheme.animations.framerEasing
        }}
      >
        <Card 
          className="p-4 sm:p-6 lg:p-8 text-center text-white relative overflow-hidden"
          style={{
            backgroundColor: currentTheme.colors.primary,
            borderRadius: currentTheme.layout.borderRadius,
            boxShadow: currentTheme.layout.shadows
          }}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 text-3xl sm:text-4xl lg:text-6xl">{result.emoji}</div>
            <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 text-2xl sm:text-3xl lg:text-4xl">{result.emoji}</div>
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: parseFloat(currentTheme.animations.duration) / 1000, 
                delay: 0.4,
                ease: currentTheme.animations.framerEasing
              }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">{result.emoji}</h1>
              <h2 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 px-2"
                style={{ fontFamily: currentTheme.fonts.heading }}
              >
                {language === 'hi' ? 'आप हैं' : 'You are'} {language === 'hi' && result.nameHindi ? result.nameHindi : result.name}!
              </h2>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: parseFloat(currentTheme.animations.duration) / 1000, 
                delay: 0.6,
                ease: currentTheme.animations.framerEasing
              }}
            >
              <p 
                className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed px-2"
                style={{ fontFamily: currentTheme.fonts.body }}
              >
                {getPersonalizedMessage()}
              </p>
            </motion.div>

            {finalCustomization.showShareButtons && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: parseFloat(currentTheme.animations.duration) / 1000, 
                  delay: 0.8,
                  ease: currentTheme.animations.framerEasing
                }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
              >
                <Button
                  onClick={handleDownload}
                  className="bg-white text-gray-800 hover:bg-gray-100 flex items-center gap-2 px-4 py-2 text-sm sm:text-base"
                  style={{
                    borderRadius: currentTheme.layout.borderRadius,
                    fontFamily: currentTheme.fonts.body,
                    transition: `all ${currentTheme.animations.duration} ${currentTheme.animations.easing}`
                  }}
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                
                <Button
                  onClick={handleShare}
                  className="bg-white text-gray-800 hover:bg-gray-100 flex items-center gap-2 px-4 py-2 text-sm sm:text-base"
                  style={{
                    borderRadius: currentTheme.layout.borderRadius,
                    fontFamily: currentTheme.fonts.body,
                    transition: `all ${currentTheme.animations.duration} ${currentTheme.animations.easing}`
                  }}
                >
                  <Share2 className="w-4 h-4" />
                  Share Result
                </Button>
                
                
                {finalCustomization.allowRetake && (
                  <Button
                    onClick={onRetake}
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-gray-800 flex items-center gap-2 px-4 py-2 text-sm sm:text-base"
                    style={{
                      borderRadius: currentTheme.layout.borderRadius,
                      fontFamily: currentTheme.fonts.body,
                      transition: `all ${currentTheme.animations.duration} ${currentTheme.animations.easing}`
                    }}
                  >
                    <RotateCcw className="w-4 h-4" />
                    {language === 'hi' ? 'फिर से करें' : 'Retake Quiz'}
                  </Button>
                )}
              </motion.div>
            )}

            {/* Share Options Dropdown */}
            {showShareOptions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 bg-white rounded-lg shadow-lg"
                style={{ borderRadius: currentTheme.layout.borderRadius }}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">Share on:</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => handleSocialShare('facebook')}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </Button>
                  
                  <Button
                    onClick={() => handleSocialShare('instagram')}
                    className="bg-pink-600 hover:bg-pink-700 text-white flex items-center gap-2"
                  >
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </Button>
                  
                  <Button
                    onClick={() => handleSocialShare('whatsapp')}
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </Button>
                  
                  <Button
                    onClick={handleCopyLink}
                    className="bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Copy Link
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Shareable text for social media */}
      {finalCustomization.showShareButtons && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: parseFloat(currentTheme.animations.duration) / 1000, 
            delay: 1,
            ease: currentTheme.animations.framerEasing
          }}
          className="mt-6 sm:mt-8 p-3 sm:p-4 rounded-lg"
          style={{
            backgroundColor: currentTheme.colors.surface,
            borderRadius: currentTheme.layout.borderRadius,
            borderColor: currentTheme.colors.border
          }}
        >
          <h3 
            className="text-base sm:text-lg font-semibold mb-2"
            style={{ 
              color: currentTheme.colors.text,
              fontFamily: currentTheme.fonts.heading
            }}
          >
            Share this result:
          </h3>
          <p 
            className="text-sm sm:text-base italic"
            style={{ 
              color: currentTheme.colors.textSecondary,
              fontFamily: currentTheme.fonts.body
            }}
          >
            "{getPersonalizedMessage()} {result.emoji} Take the quiz to find yours! #QuizTime"
          </p>
        </motion.div>
      )}

      {/* Recommended Quizzes */}
      <RecommendedQuizzes currentQuizId={quizId} limit={3} />
    </div>
  );
}
