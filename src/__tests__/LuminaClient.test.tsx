import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { LuminaClient } from '@/app/LuminaClient'

// Mock child components to avoid context issues
jest.mock('@/app/components/MovieDetailsModal', () => ({
  MovieDetailsModal: () => <div data-testid="movie-details-modal">Mock Modal</div>
}));

jest.mock('@/app/components/WatchlistDrawer', () => ({
  WatchlistDrawer: () => <div data-testid="watchlist-drawer">Mock Drawer</div>
}));

jest.mock('@/app/components/AudioAmbience', () => ({
  AudioAmbience: () => <div data-testid="audio-ambience">Mock Audio</div>
}));

// Mock the hook
jest.mock('@/lib/hooks/useLumina', () => ({
  useLumina: () => ({
    selectedMood: null,
    movies: [],
    loading: false,
    selectedMovieId: null,
    watchlist: [],
    isDrawerOpen: false,
    setIsDrawerOpen: jest.fn(),
    handleMoodSelect: jest.fn(),
    handleMovieSelect: jest.fn(),
    handleCloseModal: jest.fn(),
    toggleWatchlist: jest.fn()
  })
}))

// Mock IntersectionObserver for the AdUnit and other components
beforeAll(() => {
  // @ts-ignore
  global.IntersectionObserver = class IntersectionObserver {
    constructor(callback: any) {}
    observe() { return null; }
    disconnect() { return null; }
    unobserve() { return null; }
  };
});

describe('LuminaClient', () => {
  it('renders the main title', () => {
    render(<LuminaClient />)
    const heading = screen.getByRole('heading', { level: 1, name: /Lumina/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders the empty state when no mood is selected', () => {
    render(<LuminaClient />)
    const moodText = screen.getByText(/Select a mood to begin/i)
    expect(moodText).toBeInTheDocument()
  })
})
