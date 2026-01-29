import { NextResponse } from 'next/server';

export function middleware() {
  const response = NextResponse.next();
  
  // Security Headers
  const headers = response.headers;
  
  headers.set('X-DNS-Prefetch-Control', 'on');
  headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'origin-when-cross-origin');
  
  // Basic CSP - Open enough for Next.js, Analytics, and AdSense, but restrictive against XSS
  // optimizing for AdSense and TMDB images
  const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://pagead2.googlesyndication.com https://partner.googleadservices.com https://tpc.googlesyndication.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://image.tmdb.org https://lumina-moodboard.vercel.app https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://api.themoviedb.org https://vitals.vercel-insights.com https://pagead2.googlesyndication.com https://www.google.com https://googleads.g.doubleclick.net;
    frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://www.youtube.com https://youtube.com;
  `.replace(/\s{2,}/g, ' ').trim();

  headers.set('Content-Security-Policy', csp);

  return response;
}

export const config = {
  matcher: '/:path*',
};
