#!/bin/bash

echo "🎯 Setting up Viral Quiz App..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp env.template .env.local
    echo "✅ Created .env.local - please add your MongoDB URI and Gemini API key"
else
    echo "✅ .env.local already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Add your MongoDB URI to .env.local"
echo "2. Add your Gemini API key to .env.local"
echo "3. Start MongoDB (if running locally)"
echo "4. Run: npm run dev"
echo "5. Visit: http://localhost:3000/quiz"
echo ""
echo "Happy quizzing! 🎯"
