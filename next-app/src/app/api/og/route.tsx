import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Dynamic params
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Full-Stack Engineer';

    const subtitle = searchParams.get('subtitle') || 'Ashif E.K';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundImage: 'linear-gradient(135deg, #0D1117 0%, #161B22 100%)',
            padding: '80px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Subtle grid pattern overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)',
              backgroundSize: '50px 50px',
              pointerEvents: 'none',
            }}
          />
          
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              zIndex: 10,
            }}
          >
            <h2
              style={{
                fontSize: '32px',
                color: '#66b2ff',
                marginBottom: '20px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {subtitle}
            </h2>
            <h1
              style={{
                fontSize: '72px',
                color: '#ffffff',
                lineHeight: 1.1,
                fontWeight: '900',
                margin: 0,
                maxWidth: '900px',
              }}
            >
              {title}
            </h1>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '60px',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '4px',
                  backgroundColor: '#66b2ff',
                  marginRight: '20px',
                }}
              />
              <span
                style={{
                  fontSize: '24px',
                  color: '#8b949e',
                }}
              >
                ashifek.com
              </span>
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
