import { MetadataRoute } from 'next'
import { areaPages } from '@/data/subpage-areas'
import { productsData } from '@/data/products'
import { getAllPosts } from '@/lib/blog'
import { allWards } from '@/data/ward-configs'
import { troubleList } from '@/data/trouble-configs'
import { casesData } from '@/data/cases'
import { areaConfigs } from '@/data/area-configs'
import { guidesData } from '@/data/guides'

const BASE_URL = 'https://www.houmiya-boiler.com'

// 地域×症状ページ（yokohamaは /trouble/ サブディレクトリへ301リダイレクト済みのため除外）
const areaTroublePages = [
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

// 地域×設置タイプページ（yokohamaは /type/ サブディレクトリへ301リダイレクト済みのため除外）
const areaInstalltypePages = [
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

// ガイドは data/guides.ts と同一ソースから生成（二重管理による記載漏れ防止）
const guideSlugList = guidesData.map((g) => g.slug)

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
  changeFrequency: 'monthly' as const,
  priority: 0.6,
}))

// 横浜市 症状ページ（19件）
const yokohamaTroubleUrls = [
  'no-hot-water', 'error-111', 'water-leak', 'no-ignition',
  'temperature-unstable', 'remote-control-error', 'exhaust-smell',
  'noise', 'pilot-off', 'freeze', 'bath-autofill', 'hot-water-flow',
  'error-110', 'no-reheating', 'remote-controller', 'strange-noise',
  'gas-smell', 'freezing', 'old-boiler',
].map(t => ({
  url: `https://www.houmiya-boiler.com/area/yokohama/trouble/${t}`,
  changeFrequency: 'monthly' as const,
  priority: 0.75,
}))

// 横浜市 設置タイプページ（18件）
const yokohamaTypeUrls = [
  'mansion-ps', 'wall-mounted', 'floor-standing', 'eco-jaws',
  'full-auto', 'auto', 'outdoor', 'indoor', 'propane',
  'city-gas', 'heat-pump', 'replacement-only',
  'ps-standard', 'ps-door', 'ps-upper-exhaust', 'balcony',
  'gas-furo', 'warm-water-heating',
].map(t => ({
  url: `https://www.houmiya-boiler.com/area/yokohama/type/${t}`,
  changeFrequency: 'monthly' as const,
  priority: 0.7,
}))

// 横浜市 メーカーページ（3件）
const yokohamaMakerUrls = ['rinnai', 'noritz', 'paloma'].map(m => ({
  url: `https://www.houmiya-boiler.com/area/yokohama/maker/${m}`,
  changeFrequency: 'monthly' as const,
  priority: 0.65,
}))

// 横浜市 号数ページ（3件）
const yokohamaCapacityUrls = ['16', '20', '24'].map(c => ({
  url: `https://www.houmiya-boiler.com/area/yokohama/capacity/${c}`,
  changeFrequency: 'monthly' as const,
  priority: 0.65,
}))

// 横浜市 建物タイプページ（5件）
const yokohamaBuildingUrls = [
  'condominium', 'rental-apartment', 'detached-house', 'old-building', 'new-construction',
].map(b => ({
  url: `https://www.houmiya-boiler.com/area/yokohama/building/${b}`,
  changeFrequency: 'monthly' as const,
  priority: 0.65,
}))

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/area`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/rinnai`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/noritz`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/paloma`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/products`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/estimate`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/cases`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/warranty`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/voice`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/ecojoys`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/trouble`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/guide`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/company`, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const blogPosts = getAllPosts()
  const blogDetailPages: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const postDate = post.date ? new Date(post.date) : now
    return {
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: isNaN(postDate.getTime()) ? now : postDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  })

  const productDetailPages: MetadataRoute.Sitemap = productsData.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const categoryPages: MetadataRoute.Sitemap = categorySlugList.map((slug) => ({
    url: `${BASE_URL}/category/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const guidePages: MetadataRoute.Sitemap = guideSlugList.map((slug) => ({
    url: `${BASE_URL}/guide/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const casePageUrls: MetadataRoute.Sitemap = casesData.map((c) => ({
    url: `${BASE_URL}/cases/${c.slug}`,
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
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }))

  const wardPageUrls: MetadataRoute.Sitemap = allWards.map((w) => ({
    url: `${BASE_URL}/area/${w.citySlug}/${w.wardSlug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const troublePageUrls: MetadataRoute.Sitemap = troubleList.map((t) => ({
    url: `${BASE_URL}/trouble/${t.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const areaTroublePageUrls: MetadataRoute.Sitemap = areaTroublePages.map(p => ({
    url: `${BASE_URL}/area/${p.citySlug}/${p.troubleSlug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const areaInstalltypePageUrls: MetadataRoute.Sitemap = areaInstalltypePages.map(p => ({
    url: `${BASE_URL}/area/${p.citySlug}/${p.typeSlug}`,
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
