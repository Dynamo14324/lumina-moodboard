/* eslint-disable */
import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const alt = 'Lumina - AI Powered Cinematic Discovery'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050505',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
          position: 'relative',
        }}
      >
        {/* Background Gradient */}
        <div 
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.2) 0%, #050505 70%)',
            }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', zIndex: 10 }}>
            {/* Logo Placeholder */}
            <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px'
            }}>
                ✨
            </div>
            <h1 style={{ fontSize: '80px', fontWeight: 'bold', margin: 0, letterSpacing: '-2px' }}>
                Lumina
            </h1>
        </div>

        <p style={{ 
            fontSize: '32px', 
            opacity: 0.8, 
            marginTop: '20px', 
            maxWidth: '800px', 
            textAlign: 'center',
            lineHeight: 1.4,
            zIndex: 10
        }}>
            Stop searching. Start feeling. 
            <br />
            AI-curated movies for your mood.
        </p>

        <div style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '20px',
            opacity: 0.5,
            zIndex: 10
        }}>
            lumina-moodboard.vercel.app
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
