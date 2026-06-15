const WP_API_BASE = 'https://wp.houmiya-boiler.com/wp-json/wp/v2'

// Xserver は User-Agent なしのリクエストをブロックする場合があるため必須
const BASE_HEADERS = {
  Accept: 'application/json',
  'User-Agent': 'Mozilla/5.0 (compatible; HoumiyaBoilerBot/1.0; +https://www.houmiya-boiler.com)',
}

// no-store: ブログ一覧・詳細ページ用（毎リクエスト最新を取得）
const NO_STORE: RequestInit = {
  cache: 'no-store',
  headers: BASE_HEADERS,
}

// revalidate 60s: トップページ最新記事用（ホームページを dynamic にしない）
const REVALIDATE_60: RequestInit = {
  next: { revalidate: 60 },
  headers: BASE_HEADERS,
}

// ─── 型定義 ───────────────────────────────────────────────

export type WPCategory = {
  id: number
  name: string
  slug: string
}

export type WPFeaturedMedia = {
  source_url: string
  alt_text: string
}

export type WPPost = {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  date: string
  modified: string
  link: string
  _embedded?: {
    'wp:featuredmedia'?: WPFeaturedMedia[]
    'wp:term'?: WPCategory[][]
  }
}

// ─── ユーティリティ ──────────────────────────────────────

export function getFeaturedImage(post: WPPost): string | null {
  return post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null
}

export function getFeaturedImageAlt(post: WPPost): string {
  return post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered
}

export function getCategories(post: WPPost): WPCategory[] {
  return post._embedded?.['wp:term']?.[0] ?? []
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// ─── API 取得関数 ─────────────────────────────────────────

/**
 * ブログ一覧ページ用。no-store で毎回最新を取得。
 */
export async function getPosts(perPage = 12): Promise<WPPost[]> {
  const url = `${WP_API_BASE}/posts?_embed&per_page=${perPage}&orderby=date&order=desc`
  try {
    const res = await fetch(url, NO_STORE)
    const contentType = res.headers.get('content-type') ?? ''
    if (!res.ok) {
      console.error(`[WP API] getPosts HTTP ${res.status} ${res.statusText}`)
      return []
    }
    if (!contentType.includes('application/json')) {
      const text = await res.text()
      console.error(`[WP API] getPosts wrong content-type: ${contentType} | body: ${text.slice(0, 300)}`)
      return []
    }
    const data = (await res.json()) as WPPost[]
    console.log(`[WP API] getPosts OK: ${data.length} posts`)
    return data
  } catch (err) {
    console.error('[WP API] getPosts error:', err)
    return []
  }
}

/**
 * ブログ詳細ページ用。no-store で毎回最新を取得。
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const url = `${WP_API_BASE}/posts?slug=${encodeURIComponent(slug)}&_embed`
  try {
    const res = await fetch(url, NO_STORE)
    if (!res.ok) {
      console.error(`[WP API] getPostBySlug failed: HTTP ${res.status} ${res.statusText}`)
      return null
    }
    const posts = (await res.json()) as WPPost[]
    return posts[0] ?? null
  } catch (err) {
    console.error('[WP API] getPostBySlug network error:', err)
    return null
  }
}

/**
 * トップページ最新記事用。60秒 revalidate でホームの静的性能を維持。
 */
export async function getLatestPosts(limit = 3): Promise<WPPost[]> {
  const url = `${WP_API_BASE}/posts?_embed&per_page=${limit}&orderby=date&order=desc`
  try {
    const res = await fetch(url, REVALIDATE_60)
    if (!res.ok) {
      console.error(`[WP API] getLatestPosts failed: HTTP ${res.status} ${res.statusText}`)
      return []
    }
    return (await res.json()) as WPPost[]
  } catch (err) {
    console.error('[WP API] getLatestPosts network error:', err)
    return []
  }
}

/**
 * サイトマップ生成用。
 */
export async function fetchAllPostSlugs(): Promise<string[]> {
  const url = `${WP_API_BASE}/posts?per_page=100&_fields=slug&orderby=date&order=desc`
  try {
    const res = await fetch(url, NO_STORE)
    if (!res.ok) {
      console.error(`[WP API] fetchAllPostSlugs failed: HTTP ${res.status} ${res.statusText}`)
      return []
    }
    const posts = (await res.json()) as Array<{ slug: string }>
    return posts.map((p) => p.slug)
  } catch (err) {
    console.error('[WP API] fetchAllPostSlugs network error:', err)
    return []
  }
}
