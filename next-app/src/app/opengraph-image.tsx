import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const alt = 'Ashif E.K - Full-stack Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const imagePath = join(process.cwd(), 'public', 'preview.jpeg')
  const bgImage = readFileSync(imagePath)
  const bgImageBase64 = `data:image/jpeg;base64,${bgImage.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
        }}
      >
        <img
          src={bgImageBase64}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        
        {/* Subtle gradient at the bottom so the white text is readable without a solid box */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '40%',
            backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            zIndex: 1,
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            bottom: 40,
            left: 50,
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontSize: 54,
              fontWeight: 800,
              color: 'white',
              marginBottom: 4,
              letterSpacing: '-0.02em',
            }}
          >
            Ashif E.K
          </div>
          <div
            style={{
              fontSize: 30,
              color: '#e4e4e7',
              fontWeight: 500,
              letterSpacing: '0.05em',
            }}
          >
            Full-stack Engineer
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
