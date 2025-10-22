# Vibe Check - Music Taste Comparison App

A beautiful Next.js application that analyzes your Spotify music taste and allows you to compare it with friends. Discover who has the most diverse, underground, or energetic music style!

## Features

- 🎵 **Spotify Integration**: Connect your Spotify account to analyze your music taste
- 📊 **Music Taste Scoring**: Get detailed scores for diversity, discovery, energy, valence, and more
- 👥 **Friend Comparisons**: Invite friends and compare your music tastes
- 🎨 **Beautiful UI**: Modern, responsive design with shadcn/ui components
- 📱 **Mobile Friendly**: Works perfectly on all devices

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **NextAuth.js** - Authentication
- **Spotify Web API** - Music data
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Spotify Developer Account

### 1. Clone and Install

```bash
cd my-next-app
pnpm install
```

### 2. Spotify Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications)
2. Create a new app
3. Add `http://localhost:3000/api/auth/callback/spotify` to Redirect URIs
4. Copy your Client ID and Client Secret

### 3. Environment Variables

Copy the environment template and fill in your values:

```bash
cp env.template .env.local
```

Edit `.env.local` with your Spotify credentials:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

Generate a NextAuth secret:
```bash
openssl rand -base64 32
```

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## How It Works

1. **Connect Spotify**: Sign in with your Spotify account
2. **Calculate Score**: The app analyzes your top tracks and artists to create a unique music taste profile
3. **Compare**: Invite friends to compare your music tastes
4. **Discover**: See who has the most unique, diverse, or energetic music style!

## Music Taste Scoring

The app calculates several scores based on your Spotify data:

- **Overall Score**: Combined score of all factors
- **Diversity**: Genre variety in your music
- **Discovery**: How underground/unique your taste is
- **Energy**: High-energy vs low-energy music preference
- **Valence**: Positive vs negative mood in your music
- **Audio Features**: Danceability, acousticness, speechiness, etc.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own music taste comparisons!
