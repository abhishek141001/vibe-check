'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';
import { themes } from '@/lib/quiz-data';
import { Palette, Settings, RotateCcw } from 'lucide-react';

interface ThemeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemeSelector({ isOpen, onClose }: ThemeSelectorProps) {
  const { currentTheme, setTheme, customization, updateCustomization, resetToDefault } = useTheme();
  const [activeTab, setActiveTab] = useState<'themes' | 'settings'>('themes');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Palette className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Customize Your Quiz</h2>
                <p className="text-gray-600">
                  Current theme: <span className="font-semibold text-purple-600">{currentTheme.name}</span>
                </p>
              </div>
            </div>
            <Button
              onClick={onClose}
              variant="outline"
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('themes')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'themes'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Themes
            </div>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'settings'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'themes' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {themes.map((theme) => (
                  <motion.div
                    key={theme.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={`p-4 cursor-pointer transition-all ${
                        currentTheme.id === theme.id
                          ? 'ring-2 ring-purple-500 bg-purple-50'
                          : 'hover:shadow-lg'
                      }`}
                      onClick={() => setTheme(theme.id)}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{theme.emoji}</div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{theme.name}</h3>
                            <p className="text-sm text-gray-600">{theme.description}</p>
                          </div>
                        </div>
                        
                        {/* Color Preview */}
                        <div className="flex gap-2">
                          <div
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: theme.colors.primary }}
                          />
                          <div
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: theme.colors.secondary }}
                          />
                          <div
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: theme.colors.accent }}
                          />
                        </div>
                        
                        {theme.isPremium && (
                          <div className="text-xs text-purple-600 font-medium">
                            ⭐ Premium
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Language Settings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Language</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => updateCustomization({ defaultLanguage: 'en' })}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      customization.defaultLanguage === 'en'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg mb-1">🇺🇸</div>
                      <div className="font-medium">English</div>
                    </div>
                  </button>
                  <button
                    onClick={() => updateCustomization({ defaultLanguage: 'hi' })}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      customization.defaultLanguage === 'hi'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg mb-1">🇮🇳</div>
                      <div className="font-medium">हिंदी</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Quiz Settings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Quiz Features</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={customization.showProgress}
                      onChange={(e) => updateCustomization({ showProgress: e.target.checked })}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-gray-700">Show progress bar</span>
                  </label>
                  
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={customization.showTimer}
                      onChange={(e) => updateCustomization({ showTimer: e.target.checked })}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-gray-700">Show timer</span>
                  </label>
                  
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={customization.allowRetake}
                      onChange={(e) => updateCustomization({ allowRetake: e.target.checked })}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-gray-700">Allow quiz retake</span>
                  </label>
                  
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={customization.showShareButtons}
                      onChange={(e) => updateCustomization({ showShareButtons: e.target.checked })}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-gray-700">Show share buttons</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <Button
            onClick={resetToDefault}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Default
          </Button>
          
          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button onClick={onClose} className="bg-purple-600 hover:bg-purple-700">
              Apply Changes
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
