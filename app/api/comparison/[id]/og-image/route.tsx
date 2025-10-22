import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    // Fetch comparison data from the regular API
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/comparison/${id}/image`);
    
    if (!response.ok) {
      return new Response('Comparison not found', { status: 404 });
    }
    
    const comparison = await response.json();

    const { user1Score, user2Score, winner } = comparison;
    
    // Determine winner text and colors
    const winnerText = winner === 'tie' ? 'Tie!' : 
                      winner === 'user1' ? 'Player 1 Wins!' : 'Player 2 Wins!';
    
    const winnerColor = winner === 'tie' ? '#6B7280' : 
                       winner === 'user1' ? '#10B981' : '#3B82F6';

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
            backgroundColor: '#0F172A',
            backgroundImage: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#FFFFFF',
                marginBottom: '8px',
              }}
            >
              🎵 Music Taste Battle
            </div>
            <div
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: winnerColor,
              }}
            >
              {winnerText}
            </div>
          </div>

          {/* Score Comparison */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '800px',
              padding: '0 40px',
            }}
          >
            {/* Player 1 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: '24px',
                  color: '#94A3B8',
                  marginBottom: '16px',
                }}
              >
                Player 1
              </div>
              <div
                style={{
                  fontSize: '72px',
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  marginBottom: '8px',
                }}
              >
                {user1Score.overall}
              </div>
              <div
                style={{
                  width: '200px',
                  height: '20px',
                  backgroundColor: '#374151',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: `${user1Score.overall}%`,
                    height: '100%',
                    backgroundColor: '#10B981',
                    borderRadius: '10px',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '16px',
                  color: '#94A3B8',
                }}
              >
                Overall Score
              </div>
            </div>

            {/* VS */}
            <div
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#FFFFFF',
                margin: '0 40px',
              }}
            >
              VS
            </div>

            {/* Player 2 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: '24px',
                  color: '#94A3B8',
                  marginBottom: '16px',
                }}
              >
                Player 2
              </div>
              <div
                style={{
                  fontSize: '72px',
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  marginBottom: '8px',
                }}
              >
                {user2Score.overall}
              </div>
              <div
                style={{
                  width: '200px',
                  height: '20px',
                  backgroundColor: '#374151',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: `${user2Score.overall}%`,
                    height: '100%',
                    backgroundColor: '#3B82F6',
                    borderRadius: '10px',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '16px',
                  color: '#94A3B8',
                }}
              >
                Overall Score
              </div>
            </div>
          </div>

          {/* Detailed Scores */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '800px',
              marginTop: '40px',
              padding: '0 40px',
            }}
          >
            {/* Diversity */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: '18px',
                  color: '#94A3B8',
                  marginBottom: '8px',
                }}
              >
                Diversity
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#10B981',
                  }}
                >
                  {user1Score.diversity}
                </div>
                <div
                  style={{
                    fontSize: '16px',
                    color: '#6B7280',
                  }}
                >
                  vs
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#3B82F6',
                  }}
                >
                  {user2Score.diversity}
                </div>
              </div>
            </div>

            {/* Discovery */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: '18px',
                  color: '#94A3B8',
                  marginBottom: '8px',
                }}
              >
                Discovery
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#10B981',
                  }}
                >
                  {user1Score.discovery}
                </div>
                <div
                  style={{
                    fontSize: '16px',
                    color: '#6B7280',
                  }}
                >
                  vs
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#3B82F6',
                  }}
                >
                  {user2Score.discovery}
                </div>
              </div>
            </div>

            {/* Energy */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: '18px',
                  color: '#94A3B8',
                  marginBottom: '8px',
                }}
              >
                Energy
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#10B981',
                  }}
                >
                  {user1Score.energy}
                </div>
                <div
                  style={{
                    fontSize: '16px',
                    color: '#6B7280',
                  }}
                >
                  vs
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#3B82F6',
                  }}
                >
                  {user2Score.energy}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              fontSize: '20px',
              color: '#94A3B8',
            }}
          >
            Challenge your friends at Vibe Check
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}
