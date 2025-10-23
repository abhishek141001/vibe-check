# JSON Quiz Creator

The JSON Quiz Creator allows administrators to create quizzes by pasting JSON directly into the interface. This is perfect for bulk quiz creation or when you have quiz data in JSON format.

## Features

- **Template Library**: Pre-built quiz templates for quick start
- **Real-time Validation**: Instant feedback on JSON structure and required fields
- **Live Preview**: See how your quiz will look before saving
- **Copy to Clipboard**: Easy template copying with one click
- **File Upload/Download**: Import/export JSON files
- **Format JSON**: Auto-format your JSON for better readability

## Quick Start

1. Navigate to `/admin/json-quiz`
2. Choose a template from the sidebar or paste your own JSON
3. The interface will validate your JSON in real-time
4. Preview your quiz on the right side
5. Click "Save Quiz" when ready

## JSON Structure

Here's the basic structure for a quiz JSON:

```json
{
  "id": "unique-quiz-id",
  "title": "Quiz Title",
  "titleHindi": "क्विज शीर्षक (optional)",
  "description": "Quiz description",
  "descriptionHindi": "क्विज विवरण (optional)",
  "emoji": "🎯",
  "category": "personality",
  "tags": ["tag1", "tag2"],
  "questions": [
    {
      "id": "q1",
      "question": "What is your favorite color?",
      "questionHindi": "आपका पसंदीदा रंग क्या है? (optional)",
      "options": [
        {
          "id": "a1",
          "text": "Red",
          "textHindi": "लाल (optional)",
          "value": "red"
        },
        {
          "id": "a2",
          "text": "Blue",
          "textHindi": "नीला (optional)",
          "value": "blue"
        }
      ]
    }
  ],
  "results": [
    {
      "id": "result1",
      "name": "Red Lover",
      "nameHindi": "लाल प्रेमी (optional)",
      "emoji": "❤️",
      "description": "You love the color red!",
      "descriptionHindi": "आप लाल रंग से प्यार करते हैं! (optional)",
      "color": "#FF0000",
      "personalizedMessage": "Custom message (optional)",
      "personalizedMessageHindi": "कस्टम संदेश (optional)"
    }
  ],
  "scoringConfig": {
    "rules": [
      {
        "questionId": "q1",
        "answerValue": "red",
        "results": {
          "result1": 2
        }
      }
    ],
    "defaultResult": "result1"
  }
}
```

## Required Fields

### Quiz Level
- `id`: Unique identifier (string)
- `title`: Quiz title (string)
- `description`: Quiz description (string)
- `emoji`: Quiz emoji (string)
- `questions`: Array of question objects
- `results`: Array of result objects

### Question Level
- `id`: Unique question identifier (string)
- `question`: Question text (string)
- `options`: Array of option objects (minimum 2)

### Option Level
- `id`: Unique option identifier (string)
- `text`: Option text (string)
- `value`: Option value for scoring (string)

### Result Level
- `id`: Unique result identifier (string)
- `name`: Result name (string)
- `emoji`: Result emoji (string)
- `description`: Result description (string)
- `color`: Result color (hex string)

## Optional Fields

### Quiz Level
- `titleHindi`: Hindi title
- `descriptionHindi`: Hindi description
- `category`: Quiz category
- `tags`: Array of tag strings
- `isViral`: Boolean for viral status
- `isFeatured`: Boolean for featured status
- `defaultLanguage`: 'en' or 'hi'
- `defaultTheme`: Theme ID
- `customization`: Customization object
- `scoringConfig`: Scoring configuration

### Question Level
- `questionHindi`: Hindi question text

### Option Level
- `textHindi`: Hindi option text

### Result Level
- `nameHindi`: Hindi result name
- `descriptionHindi`: Hindi result description
- `personalizedMessage`: Custom message
- `personalizedMessageHindi`: Hindi custom message

## Scoring Configuration

The `scoringConfig` object defines how answers map to results:

```json
{
  "scoringConfig": {
    "rules": [
      {
        "questionId": "q1",
        "answerValue": "red",
        "results": {
          "result1": 2,
          "result2": 1
        }
      }
    ],
    "defaultResult": "result1"
  }
}
```

- `rules`: Array of scoring rules
- `questionId`: Which question this rule applies to
- `answerValue`: Which answer value triggers this rule
- `results`: Object mapping result IDs to point values
- `defaultResult`: Fallback result if no rules match

## Templates

The interface includes several pre-built templates:

1. **Personality Quiz**: Complete personality assessment with scoring
2. **Entertainment Quiz**: Pop culture and entertainment themed
3. **Minimal Quiz**: Simple 2-question example

Click any template to copy it to your editor instantly.

## Tips

1. **Use unique IDs**: Ensure all `id` fields are unique within their scope
2. **Test your scoring**: Make sure your scoring rules cover all possible answer combinations
3. **Include fallback**: Always set a `defaultResult` in your scoring config
4. **Validate colors**: Use valid hex color codes (e.g., "#FF0000")
5. **Preview first**: Always preview your quiz before saving

## Error Handling

The interface will show validation errors for:
- Missing required fields
- Invalid JSON syntax
- Duplicate IDs
- Insufficient options (less than 2 per question)
- Invalid color formats

Fix all validation errors before the quiz can be saved.
