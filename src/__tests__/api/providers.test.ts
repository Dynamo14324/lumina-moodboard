import 'isomorphic-fetch';
import { GET } from '@/app/api/movie/[id]/providers/route';
import { NextRequest, NextResponse } from 'next/server';

// Fix TS error for global fetch mock
interface GlobalFetchMock extends jest.Mock {
  mockResolvedValueOnce: (val: any) => this;
}

// Mock fetch
global.fetch = jest.fn() as unknown as GlobalFetchMock;

// Polyfill Response.json
if (!Response.json) {
  // @ts-ignore
  Response.json = (data: any, init?: ResponseInit) => {
    return new Response(JSON.stringify(data), {
        ...init,
        headers: {
            'content-type': 'application/json',
            ...init?.headers,
        }
    });
  }
}

describe('Watch Providers API', () => {
  beforeEach(() => {
    (global.fetch as unknown as jest.Mock).mockClear();
    process.env.TMDB_API_KEY = 'mock-key';
  });

  it('fetches providers from TMDB successfully', async () => {
    const mockData = {
      results: {
        US: {
          flatrate: [{ provider_name: "Netflix" }]
        }
      }
    };
    
    (global.fetch as unknown as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const req = new NextRequest('http://localhost:3000/api/movie/123/providers?region=US');
    const params = Promise.resolve({ id: '123' });
    const res = await GET(req, { params });

    expect(res).toBeInstanceOf(NextResponse);
    const data = await res.json();
    expect(data).toHaveLength(1);
    expect(data[0].provider_name).toBe("Netflix");
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/movie/123/watch/providers'), expect.any(Object));
  });

  it('returns synthetic providers when API key is missing', async () => {
    delete process.env.TMDB_API_KEY;
    delete process.env.NEXT_PUBLIC_TMDB_API_KEY;

    const req = new NextRequest('http://localhost:3000/api/movie/123/providers');
    const params = Promise.resolve({ id: '123' });
    const res = await GET(req, { params });
    const data = await res.json();

    expect(data).toBeDefined();
    expect(data[0].provider_name).toBe("Netflix"); // Synthetic default
  });
});
