import { MetadataRoute } from 'next'
import { areaPages } from '@/data/subpage-areas'
import { productsData } from '@/data/products'
import { fetchAllPostSlugs } from '@/lib/wordpress'
import { allWards } from '@/data/ward-configs'
import { troubleList } from '@/data/trouble-configs'
import { casesData } from '@/data/cases'
import { areaConfigs } from '@/data/area-configs'

const BASE_URL = 'https://www.houmiya-boiler.com'

// 地域×症状ページ
const areaTroublePages = [
  { citySlug: 'yokohama', troubleSlug: 'no-hot-water' },
  { citySlug: 'yokohama', troubleSlug: 'error-111' },
  { citySlug: 'yokohama', troubleSlug: 'water-leak' },
  { citySlug: 'kawasaki', troubleSlug: 'no-hot-water' },
  { citySlug: 'kawasaki', troubleSlug: 'error-111' },
  { citySlug: 'kawasaki', troubleSlug: 'water-leak' },
  { citySlug: 'atsugi', troubleSlug: 'no-hot-water' },
  { citySlug: 'atsugi', troubleSlug: 'error-111' },
  { citySlug: 'atsugi', troubleSlug: 'water-leak' },
  { citySlug: 'ebina', troubleSlug: 'no-hot-water' },
  { citySlug: 'ebina', troubleSlug: 'error-111' },
  { citySlug: 'ebina', troubleSlug: 'water-leak' },
]

// 地域×設置タイプページ
const areaInstalltypePages = [
  { citySlug: 'yokohama', typeSlug: 'mansion-ps' },
  { citySlug: 'yokohama', typeSlug: 'wall-mounted' },
  { citySlug: 'yokohama', typeSlug: 'eco-jaws' },
  { citySlug: 'kawasaki', typeSlug: 'mansion-ps' },
  { citySlug: 'kawasaki', typeSlug: 'wall-mounted' },
  { citySlug: 'kawasaki', typeSlug: 'eco-jaws' },
  { citySlug: 'atsugi', typeSlug: 'wall-mounted' },
  { citySlug: 'atsugi', typeSlug: 'floor-standing' },
  { citySlug: 'atsugi', typeSlug: 'eco-jaws' },
  { citySlug: 'ebina', typeSlug: 'wall-mounted' },
  { citySlug: 'ebina', typeSlug: 'floor-standing' },
  { citySlug: 'ebina', typeSlug: 'eco-jaws' },
]

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
  'color-variation',
]

// 横浜市 駅ページ（46件）
const yokohamaStationUrls = [
  'yokohama', 'sakuragicho', 'kannai', 'ishikawacho', 'motomachi-chukagai',
  'minatomirai', 'bashamichi', 'yamate', 'shin-yokohama', 'kikuna',
  'hiyoshi', 'tsunashima', 'okurayama', 'aobadai', 'tama-plaza', 'azamino',
  'center-kita', 'center-minami', 'nakamachidai', 'ryokuentoshi',
  'totsuka', 'higashi-totsuka', 'maioka', 'kamiooka', 'konandai',
  'yokodai', 'kanazawa-bunko', 'kanazawa-hakkei',
  'tsurumi', 'namamugi', 'higashi-kanagawa', 'hakuraku',
  'futamatagawa', 'tsurugamine', 'nishiya', 'shimonagaya',
  'kamoi', 'nakayama', 'nagatsuta', 'seya',
  'mitsukyo', 'izumino', 'tateba', 'yayoi-dai',
  'hongodai', 'ofuna',
].map(s => ({
  url: `https://www.houmiya-boiler.com/area/yokohama/station/${s}`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.7,
}))

// 横浜市 地域ページ（25件）
const yokohamaDistrictUrls = [
  'minato-mirai', 'bashamichi', 'isezakicho', 'motomachi', 'chinatown',
  'yamashita-koen', 'noge', 'shin-yokohama', 'kohoku-new-town',
  'tama-plaza', 'aobadai', 'totsuka', 'kamiooka', 'hiyoshi',
  'tsunashima', 'futamatagawa', 'kanazawa-bunko', 'higashi-totsuka',
  'hakuraku', 'yamate', 'hongodai', 'nagatsuta', 'kamoi',
  'sakuragicho', 'kannai',
].map(d => ({
  url: `https://www.houmiya-boiler.com/area/yokohama/district/${d}`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.6,
}))

// 横浜市 症状ページ（12件）
const yokohamaTroubleUrls = [
  'no-hot-water', 'error-111', 'water-leak', 'no-ignition',
  'temperature-unstable', 'remote-control-error', 'exhaust-smell',
  'noise', 'pilot-off', 'freeze', 'bath-autofill', 'hot-water-flow',
].map(t => ({
  url: `https://www.houmiya-boiler.com/area/yokohama/trouble/${t}`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.75,
}))

// 横浜市 設置タイプページ（12件）
const yokohamaTypeUrls = [
  'mansion-ps', 'wall-mounted', 'floor-standing', 'eco-jaws',
  'full-auto', 'auto', 'outdoor', 'indoor', 'propane',
  'city-gas', 'heat-pump', 'replacement-only',
].map(t => ({
  url: `https://www.houmiya-boiler.com/area/yokohama/type/${t}`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.7,
}))

// 横浜市 メーカーページ（3件）
const yokohamaMakerUrls = ['rinnai', 'noritz', 'paloma'].map(m => ({
  url: `https://www.houmiya-boiler.com/area/yokohama/maker/${m}`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.65,
}))

// 横浜市 号数ページ（3件）
const yokohamaCapacityUrls = ['16', '20', '24'].map(c => ({
  url: `https://www.houmiya-boiler.com/area/yokohama/capacity/${c}`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.65,
}))

// 横浜市 建物タイプページ（5件）
const yokohamaBuildingUrls = [
  'condominium', 'rental-apartment', 'detached-house', 'old-building', 'new-construction',
].map(b => ({
  url: `https://www.houmiya-boiler.com/area/yokohama/building/${b}`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.65,
}))

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
    { url: `${BASE_URL}/trouble`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
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

  const casePageUrls: MetadataRoute.Sitemap = casesData.map((c) => ({
    url: `${BASE_URL}/cases/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const showableAreaSlugs = Object.entries(areaConfigs)
    .filter(([, config]) => config.show !== false)
    .map(([slug]) => slug)

  const areaPageUrls: MetadataRoute.Sitemap = areaPages
    .filter((area) => showableAreaSlugs.includes(area.slug))
    .map((area) => ({
      url: `${BASE_URL}/area/${area.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }))

  const wardPageUrls: MetadataRoute.Sitemap = allWards.map((w) => ({
    url: `${BASE_URL}/area/${w.citySlug}/${w.wardSlug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const troublePageUrls: MetadataRoute.Sitemap = troubleList.map((t) => ({
    url: `${BASE_URL}/trouble/${t.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const areaTroublePageUrls: MetadataRoute.Sitemap = areaTroublePages.map(p => ({
    url: `${BASE_URL}/area/${p.citySlug}/${p.troubleSlug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const areaInstalltypePageUrls: MetadataRoute.Sitemap = areaInstalltypePages.map(p => ({
    url: `${BASE_URL}/area/${p.citySlug}/${p.typeSlug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    ...staticPages,
    ...blogDetailPages,
    ...productDetailPages,
    ...categoryPages,
    ...guidePages,
    ...areaPageUrls,
    ...wardPageUrls,
    ...troublePageUrls,
    ...casePageUrls,
    ...areaTroublePageUrls,
    ...areaInstalltypePageUrls,
    ...yokohamaStationUrls,
    ...yokohamaDistrictUrls,
    ...yokohamaTroubleUrls,
    ...yokohamaTypeUrls,
    ...yokohamaMakerUrls,
    ...yokohamaCapacityUrls,
    ...yokohamaBuildingUrls,
  ]
}
