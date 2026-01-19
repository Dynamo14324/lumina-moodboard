import 'isomorphic-fetch';
import { GET } from '@/app/api/health/route';
import { NextResponse } from 'next/server';

// Polyfill Response.json
if (!Response.json) {
  // @ts-expect-error - Polyfilling static method
  Response.json = (data: unknown, init?: ResponseInit) => {
    return new Response(JSON.stringify(data), {
        ...init,
        headers: {
            'content-type': 'application/json',
            ...(init?.headers || {}),
        }
    });
  }
}

describe('Health API', () => {
  it('returns a healthy status', async () => {
    const res = await GET();
    expect(res).toBeInstanceOf(NextResponse);
    const data = await res.json();
    expect(data.status).toBe('healthy');
    expect(data.timestamp).toBeDefined();
    expect(data.version).toBeDefined();
  });
});
