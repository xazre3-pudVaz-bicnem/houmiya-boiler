import { MetadataRoute } from 'next'
import { areaPages } from '@/data/subpage-areas'
import { makerPages } from '@/data/subpage-makers'

const BASE_URL = 'https://houmiya-boiler.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/cases`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ecojoys`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/voice`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/estimate`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]

  const areaPageUrls: MetadataRoute.Sitemap = areaPages.map((area) => ({
    url: `${BASE_URL}/area/${area.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const makerPageUrls: MetadataRoute.Sitemap = makerPages.map((maker) => ({
    url: `${BASE_URL}/maker/${maker.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...areaPageUrls, ...makerPageUrls]
}
