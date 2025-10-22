# Modular Scoring System

## Overview
The quiz system now supports a modular JSON-based scoring configuration that makes it easy to configure different result calculations without modifying code.

## How It Works

### 1. JSON Configuration Structure
```json
{
  "quiz-id": {
    "rules": [
      {
        "questionId": "q1",
        "answerValue": "frontend",
        "results": {
          "javascript": 3,
          "swift": 2,
          "python": 1
        }
      }
    ],
    "defaultResult": "python"
  }
}
```

### 2. Rule Structure
Each rule defines:
- `questionId`: The question identifier (e.g., "q1", "q2")
- `answerValue`: The answer value that triggers this rule
- `results`: Object mapping result IDs to scores

### 3. Scoring Logic
- Each answer contributes points to multiple results
- The result with the highest total score wins
- If no rules match, uses `defaultResult`

## Example Usage

### Creating a New Quiz Scoring Configuration

```typescript
// 1. Add to scoring-configs.json
{
  "my-new-quiz": {
    "rules": [
      {
        "questionId": "q1",
        "answerValue": "creative",
        "results": {
          "artist": 3,
          "designer": 2,
          "writer": 1
        }
      },
      {
        "questionId": "q1",
        "answerValue": "logical",
        "results": {
          "engineer": 3,
          "analyst": 2,
          "scientist": 1
        }
      }
    ],
    "defaultResult": "artist"
  }
}

// 2. Load in your quiz
const scoringConfig = await loadScoringConfig('my-new-quiz');

// 3. Apply to quiz
const quiz = {
  ...myQuiz,
  scoringConfig: scoringConfig
};
```

### Modifying Existing Scoring

To change how a quiz works, simply update the JSON:

```json
{
  "programming-language": {
    "rules": [
      {
        "questionId": "q1",
        "answerValue": "frontend",
        "results": {
          "javascript": 5,  // Increased weight
          "swift": 3,
          "python": 1
        }
      }
    ]
  }
}
```

## Benefits

1. **Easy Configuration**: No code changes needed
2. **Flexible Scoring**: Support complex scoring logic
3. **Maintainable**: All scoring rules in one place
4. **Testable**: Easy to test different configurations
5. **Dynamic**: Can be loaded at runtime

## Advanced Features

### Multiple Rules per Question
```json
{
  "questionId": "q1",
  "answerValue": "frontend",
  "results": {
    "javascript": 3,
    "swift": 2,
    "python": 1
  }
}
```

### Default Results
```json
{
  "defaultResult": "python"  // Fallback when no rules match
}
```

### Complex Scoring
```json
{
  "questionId": "q2",
  "answerValue": "enterprise",
  "results": {
    "java": 3,
    "csharp": 3,
    "go": 2,
    "javascript": 1
  }
}
```

## Migration from Hardcoded Scoring

The system maintains backward compatibility:
1. First tries exact `resultMapping` matches
2. Falls back to `scoringConfig` if available
3. Uses first result as final fallback

This ensures existing quizzes continue to work while new ones can use the modular system.
