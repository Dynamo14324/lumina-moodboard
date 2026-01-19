import { renderHook, act } from '@testing-library/react'
import { useLumina } from '@/lib/hooks/useLumina'
import { useRouter, useSearchParams } from 'next/navigation'
import { useWatchlist } from '@/lib/useWatchlist'

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}))

// Mock Watchlist hook
jest.mock('@/lib/useWatchlist', () => ({
  useWatchlist: jest.fn(),
}))

// Mock API
jest.mock('@/lib/api', () => ({
  fetchMoviesByMood: jest.fn().mockResolvedValue([]),
}))

describe('useLumina hook', () => {
  let currentParams = new URLSearchParams()
  const mockRouter = { 
    push: jest.fn((url: string) => {
      const search = url.split('?')[1] || ''
      currentParams = new URLSearchParams(search)
    }) 
  }
  const mockSearchParams = { 
    get: jest.fn((key: string) => currentParams.get(key)), 
    toString: jest.fn(() => currentParams.toString()) 
  }
  const mockWatchlist = { 
    watchlist: [], 
    addToWatchlist: jest.fn(), 
    removeFromWatchlist: jest.fn(), 
    isInWatchlist: jest.fn() 
  }

  beforeEach(() => {
    jest.clearAllMocks()
    currentParams = new URLSearchParams()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(useSearchParams as jest.Mock).mockReturnValue(mockSearchParams)
    ;(useWatchlist as jest.Mock).mockReturnValue(mockWatchlist)
  })

  it('initializes with null when no mood in URL', async () => {
    const { result } = renderHook(() => useLumina())
    expect(result.current.selectedMood).toBe(null)
  })

  it('handles mood selection and updates URL', async () => {
    const { result } = renderHook(() => useLumina())
    
    act(() => {
      result.current.handleMoodSelect('adrenaline')
    })

    expect(result.current.selectedMood).toBe('adrenaline')
    expect(mockRouter.push).toHaveBeenCalledWith(expect.stringContaining('mood=adrenaline'))
  })

  it('handles movie selection and updates URL', () => {
    const { result } = renderHook(() => useLumina())
    
    act(() => {
      result.current.handleMovieSelect(123)
    })

    expect(result.current.selectedMovieId).toBe(123)
    expect(mockRouter.push).toHaveBeenCalledWith(expect.stringContaining('movie=123'))
  })

  it('handles modal closing and clears URL', () => {
    const { result } = renderHook(() => useLumina())
    
    act(() => {
      result.current.handleCloseModal()
    })

    expect(result.current.selectedMovieId).toBe(null)
    expect(mockRouter.push).toHaveBeenCalled()
  })
})
