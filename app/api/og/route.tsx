import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Viral Quiz';
    const emoji = searchParams.get('emoji') || '🎯';
    const description = searchParams.get('description') || 'Discover your personality with our fun quiz!';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8fafc',
            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '48px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              maxWidth: '800px',
              margin: '0 24px',
            }}
          >
            <div
              style={{
                fontSize: '80px',
                marginBottom: '24px',
              }}
            >
              {emoji}
            </div>
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#1f2937',
                textAlign: 'center',
                margin: '0 0 16px 0',
                lineHeight: '1.2',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '24px',
                color: '#6b7280',
                textAlign: 'center',
                margin: '0 0 32px 0',
                lineHeight: '1.4',
              }}
            >
              {description}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '20px',
                color: '#8b5cf6',
                fontWeight: '600',
              }}
            >
              <span>🎯</span>
              <span>Viral Quizzes</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
