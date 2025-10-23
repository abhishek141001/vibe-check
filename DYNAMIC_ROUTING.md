# Dynamic Quiz Routing System

This document explains how the dynamic quiz routing system works in the Vibe Check application.

## Overview

The application now uses Next.js dynamic routing to automatically handle all quiz pages without needing individual page files for each quiz. This makes it easy to add new quizzes by simply updating the `quiz-data.ts` file.

## File Structure

```
app/
├── quiz/
│   ├── page.tsx                    # Quiz listing page
│   └── [id]/
│       ├── page.tsx               # Dynamic quiz page
│       └── not-found.tsx          # 404 page for invalid quiz IDs
├── api/
│   └── og/
│       └── route.tsx              # Open Graph image generation
├── sitemap.ts                     # SEO sitemap
└── robots.ts                      # SEO robots.txt
```

## How It Works

### 1. Dynamic Route Handler (`/quiz/[id]/page.tsx`)

- Handles all quiz routes dynamically using the `[id]` parameter
- Validates quiz existence using `isValidQuizId()`
- Generates static params at build time for all quizzes
- Provides SEO metadata for each quiz

### 2. Quiz Data Integration

The system integrates with `quiz-data.ts` through several utility functions:

- `getAllQuizIds()`: Returns all quiz IDs for static generation
- `isValidQuizId(id)`: Validates if a quiz ID exists
- `getQuizForSEO(id)`: Returns SEO-optimized quiz data
- `getQuizMetadata(id)`: Returns quiz metadata

### 3. SEO Features

- **Static Generation**: All quiz pages are pre-generated at build time
- **Metadata**: Dynamic title, description, and keywords for each quiz
- **Open Graph**: Auto-generated social sharing images
- **Sitemap**: Automatic sitemap generation including all quiz pages
- **Robots.txt**: SEO-friendly robots.txt configuration

## Adding New Quizzes

To add a new quiz:

1. **Add to quiz-data.ts**: Simply add your quiz object to the `quizzes` array
2. **No additional files needed**: The dynamic routing system handles everything automatically
3. **SEO is automatic**: Metadata, sitemap, and social sharing are handled automatically

Example:
```typescript
// In quiz-data.ts
export const quizzes: Quiz[] = [
  // ... existing quizzes
  {
    id: 'my-new-quiz',
    title: 'My New Quiz',
    description: 'A fun new quiz',
    emoji: '🎉',
    // ... rest of quiz configuration
  }
];
```

## URL Structure

- Quiz listing: `/quiz`
- Individual quiz: `/quiz/[quiz-id]`
- Invalid quiz: Shows 404 page with helpful navigation

## Benefits

1. **Scalability**: Easy to add unlimited quizzes
2. **SEO Optimized**: Automatic metadata and sitemap generation
3. **Performance**: Static generation for fast loading
4. **Maintainability**: Single source of truth in quiz-data.ts
5. **Social Sharing**: Auto-generated Open Graph images

## Migration from Static Routes

If you have existing static quiz routes (like `/quiz/bihar-heritage/page.tsx`), you can:

1. **Keep them**: They'll continue to work alongside dynamic routes
2. **Remove them**: The dynamic routes will handle all quiz pages
3. **Gradual migration**: Move quizzes to dynamic routing over time

## Technical Details

### Static Generation
```typescript
export async function generateStaticParams() {
  const { getAllQuizIds } = await import('@/lib/quiz-data');
  return getAllQuizIds().map((id) => ({ id }));
}
```

### SEO Metadata
```typescript
export async function generateMetadata({ params }: QuizPageProps) {
  const quizData = getQuizForSEO(params.id);
  return {
    title: `${quizData.title} - Viral Quizzes`,
    description: quizData.description,
    // ... Open Graph and Twitter metadata
  };
}
```

### Open Graph Images
The `/api/og` route generates dynamic social sharing images with:
- Quiz title and emoji
- Branded design
- Proper dimensions (1200x630)

## Testing

To test the dynamic routing:

1. **Valid quiz**: Visit `/quiz/programming-language`
2. **Invalid quiz**: Visit `/quiz/non-existent-quiz` (should show 404)
3. **SEO**: Check page source for proper metadata
4. **Social sharing**: Test Open Graph images in social media previews

## Future Enhancements

Potential improvements:
- Quiz categories with dynamic filtering
- Search functionality
- Quiz analytics and tracking
- A/B testing for quiz variations
- Multi-language support expansion
