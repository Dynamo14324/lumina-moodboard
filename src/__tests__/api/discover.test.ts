import 'isomorphic-fetch';

import { GET } from '@/app/api/discover/route';
import { NextRequest, NextResponse } from 'next/server';

// Fix TS error for global fetch mock
interface GlobalFetchMock extends jest.Mock {
  mockResolvedValueOnce: (val: unknown) => this;
}

// Mock fetch
global.fetch = jest.fn() as unknown as GlobalFetchMock;

// Polyfill Response.json for Next.js 13+ environment in Jest
if (!Response.json) {
  // @ts-expect-error - Response.json is not standard yet in Jest environment
  Response.json = (data: unknown, init?: ResponseInit) => {
    return new Response(JSON.stringify(data), {
        ...init,
        headers: {
            'content-type': 'application/json',
            ...init?.headers,
        }
    });
  }
}

describe('Discovery API', () => {
  beforeEach(() => {
    (global.fetch as unknown as jest.Mock).mockClear();
    process.env.TMDB_API_KEY = 'mock-key';
  });

  it('fetches data from TMDB successfully', async () => {
    const mockData = { results: [{ id: 1, title: 'Test Movie' }] };
    (global.fetch as unknown as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const req = new NextRequest('http://localhost:3000/api/discover?sort_by=popularity.desc');
    const res = await GET(req);

    expect(res).toBeInstanceOf(NextResponse);
    const data = await res.json();
    expect(data).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('api.themoviedb.org'), expect.any(Object));
  });

  it('returns synthetic data when API key is missing', async () => {
    const originalKey = process.env.TMDB_API_KEY;
    delete process.env.TMDB_API_KEY;
    delete process.env.NEXT_PUBLIC_TMDB_API_KEY;

    const req = new NextRequest('http://localhost:3000/api/discover');
    const res = await GET(req);
    const data = await res.json();

    expect(data.results).toBeDefined();
    expect(data.results.length).toBeGreaterThan(0);
    expect(data.results[0].title).toBeDefined();

    process.env.TMDB_API_KEY = originalKey;
  });

  it('validates input parameters', async () => {
    (global.fetch as unknown as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    });

    // Valid request
    const req = new NextRequest('http://localhost:3000/api/discover?page=1');
    const res = await GET(req);
    expect(res.status).toBe(200);
  });
});
