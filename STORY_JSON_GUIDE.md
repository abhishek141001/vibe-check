# JSON Story Creator

Create interactive, choice-based stories by pasting JSON. Each node shows text, an optional background image, and exactly two choices that determine the next node. Stories should end in at most 7 slides.

## Quick Start

1. Author a story JSON using the structure below
2. Save it to your DB (collection: `stories`) or adapt an admin UI
3. Test via `/story/{id}`

A sample file is included at `samples/story-sample.json`.

## JSON Structure

```json
{
  "id": "unique-story-id",
  "title": "Story Title",
  "titleHindi": "हिंदी शीर्षक (optional)",
  "description": "Short story description",
  "descriptionHindi": "हिंदी विवरण (optional)",
  "emoji": "📖",
  "startNodeId": "n1",
  "maxSlides": 7,
  "customization": {
    "themeId": "default",
    "defaultLanguage": "en",
    "backgroundImage": "/images/optional-bg.jpg"
  },
  "isViral": false,
  "isFeatured": false,
  "tags": ["adventure", "interactive"],
  "nodes": [
    {
      "id": "n1",
      "text": "Opening scene text...",
      "textHindi": "शुरुआती दृश्य... (optional)",
      "image": "/images/scene-1.jpg",
      "choices": [
        { "id": "c1", "text": "Choice A", "textHindi": "विकल्प A (optional)", "nextId": "n2" },
        { "id": "c2", "text": "Choice B", "textHindi": "विकल्प B (optional)", "nextId": "n3" }
      ]
    },
    {
      "id": "end1",
      "text": "Ending text...",
      "textHindi": "अंत का पाठ... (optional)",
      "choices": [
        { "id": "e1", "text": "Play again" },
        { "id": "e2", "text": "Play again" }
      ],
      "ending": true,
      "endingTitle": "Happy Ending",
      "endingTitleHindi": "खुश अंत (optional)",
      "endingEmoji": "🎉"
    }
  ]
}
```

## Required Fields
- **story**: `id`, `title`, `description`, `emoji`, `startNodeId`, `nodes`
- **node**: `id`, `text`, `choices` (exactly 2)
- **choice**: `id`, `text` (and optional `nextId`)

## Optional Fields
- **story**: `titleHindi`, `descriptionHindi`, `tags`, `isViral`, `isFeatured`, `maxSlides` (default 7), `customization`
- **node**: `textHindi`, `image`, `ending`, `endingTitle`, `endingTitleHindi`, `endingEmoji`
- **choice**: `textHindi`

## Authoring Rules
- Exactly two choices per node
- Endings: set `ending: true` and omit `nextId` on choices (UI ignores it)
- Keep total steps ≤ `maxSlides` (7 default)
- Use unique IDs across nodes and choices

## Usage
- List: `GET /api/story`
- Get by id: `GET /api/story/{id}` (DB-first, falls back to in-memory sample)
- Frontend pages: `/story` and `/story/{id}`

## Tips
- Add background images per-node via `image` for visual variety
- Localize with `titleHindi`, `descriptionHindi`, `textHindi`
- Reuse themes via `customization.themeId`
