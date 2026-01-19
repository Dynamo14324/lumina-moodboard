import 'isomorphic-fetch';
import { GET } from '@/app/api/movie/[id]/route';
import { NextRequest, NextResponse } from 'next/server';

// Fix TS error for global fetch mock
interface GlobalFetchMock extends jest.Mock {
  mockResolvedValueOnce: (val: unknown) => this;
}

// Mock fetch
global.fetch = jest.fn() as unknown as GlobalFetchMock;

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

describe('Movie Details API', () => {
  beforeEach(() => {
    (global.fetch as unknown as jest.Mock).mockClear();
    process.env.TMDB_API_KEY = 'mock-key';
  });

  it('fetches movie details from TMDB successfully', async () => {
    const mockData = { id: 123, title: 'Mock Movie' };
    (global.fetch as unknown as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const req = new NextRequest('http://localhost:3000/api/movie/123');
    const params = Promise.resolve({ id: '123' });
    const res = await GET(req, { params });

    expect(res).toBeInstanceOf(NextResponse);
    const data = await res.json();
    expect(data.id).toBe(123);
    expect(data.title).toBe('Mock Movie');
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/movie/123'), expect.any(Object));
  });

  it('returns synthetic details when API key is missing', async () => {
    delete process.env.TMDB_API_KEY;
    delete process.env.NEXT_PUBLIC_TMDB_API_KEY;

    const req = new NextRequest('http://localhost:3000/api/movie/101');
    const params = Promise.resolve({ id: '101' });
    const res = await GET(req, { params });
    const data = await res.json();

    expect(data.id).toBe(101);
    expect(data.title).toBe('Blade Runner 2049');
  });

  it('handles 404 from TMDB', async () => {
    (global.fetch as unknown as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const req = new NextRequest('http://localhost:3000/api/movie/999');
    const params = Promise.resolve({ id: '999' });
    const res = await GET(req, { params });

    expect(res.status).toBe(404);
    const data = await res.json();
    expect(data.error).toBe('Movie not found');
  });
});
