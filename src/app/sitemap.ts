import { MetadataRoute } from 'next'
import { MOODS } from '@/lib/constants'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lumina-moodboard.vercel.app'
  
  const moodEntries = MOODS.map((mood) => ({
    url: `${baseUrl}?mood=${mood.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...moodEntries
  ]
}
