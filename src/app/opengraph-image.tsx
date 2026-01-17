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
        tw="w-full h-full flex flex-col items-center justify-center bg-[#050505] text-white font-sans relative"
      >
        {/* Background Gradient */}
        <div 
            tw="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.2)_0%,#050505_70%)]"
        />

        <div 
            tw="flex items-center gap-[20px] z-10"
        >
            {/* Logo Placeholder */}
            <div 
                tw="w-[80px] h-[80px] rounded-full bg-[linear-gradient(135deg,#6366f1,#a855f7)] flex items-center justify-center text-[40px]"
            >
                ✨
            </div>
            <h1 
                tw="text-[80px] font-bold m-0 tracking-[-2px]"
            >
                Lumina
            </h1>
        </div>

        <p 
            tw="text-[32px] opacity-80 mt-[20px] max-w-[800px] text-center leading-[1.4] z-10"
        >
            Stop searching. Start feeling. 
            <br />
            AI-curated movies for your mood.
        </p>

        <div 
            tw="absolute bottom-[40px] text-[20px] opacity-50 z-10"
        >
            lumina-moodboard.vercel.app
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
