import { MetadataRoute } from 'next'
import { areaPages } from '@/data/subpage-areas'
import { productsData } from '@/data/products'
import { fetchAllPostSlugs } from '@/lib/wordpress'

const BASE_URL = 'https://www.houmiya-boiler.com'

const categorySlugList = [
  'gas-furo',
  'gas-kyuto',
  'eco-jaws',
  'warm-water-heating',
  'ps-standard',
  'ps-door',
  'balanced-flue',
]

const guideSlugList = [
  'full-auto-auto',
  'capacity',
  'eco-jaws',
  'model-number',
  'error-code',
  'lifespan',
  'installation-type',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/area`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/rinnai`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/noritz`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/paloma`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/products`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/estimate`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/cases`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/warranty`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/voice`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/ecojoys`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ]

  const wpSlugs = await fetchAllPostSlugs()
  const blogDetailPages: MetadataRoute.Sitemap = wpSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const productDetailPages: MetadataRoute.Sitemap = productsData.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const categoryPages: MetadataRoute.Sitemap = categorySlugList.map((slug) => ({
    url: `${BASE_URL}/category/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const guidePages: MetadataRoute.Sitemap = guideSlugList.map((slug) => ({
    url: `${BASE_URL}/guide/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const areaPageUrls: MetadataRoute.Sitemap = areaPages.map((area) => ({
    url: `${BASE_URL}/area/${area.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [
    ...staticPages,
    ...blogDetailPages,
    ...productDetailPages,
    ...categoryPages,
    ...guidePages,
    ...areaPageUrls,
  ]
}
