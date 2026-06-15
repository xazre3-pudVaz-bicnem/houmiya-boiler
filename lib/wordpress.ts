const WP_API_BASE = 'https://wp.houmiya-boiler.com/wp-json/wp/v2'

// no-store: ブログ一覧・詳細ページ用（毎リクエスト最新を取得）
const NO_STORE: RequestInit = {
  cache: 'no-store',
  headers: { Accept: 'application/json' },
}

// revalidate 60s: トップページ最新記事用（ホームページを dynamic にしない）
const REVALIDATE_60: RequestInit = {
  next: { revalidate: 60 },
  headers: { Accept: 'application/json' },
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
  try {
    const res = await fetch(
      `${WP_API_BASE}/posts?_embed&per_page=${perPage}&orderby=date&order=desc`,
      NO_STORE
    )
    if (!res.ok) return []
    return (await res.json()) as WPPost[]
  } catch {
    return []
  }
}

/**
 * ブログ詳細ページ用。no-store で毎回最新を取得。
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(
      `${WP_API_BASE}/posts?slug=${encodeURIComponent(slug)}&_embed`,
      NO_STORE
    )
    if (!res.ok) return null
    const posts = (await res.json()) as WPPost[]
    return posts[0] ?? null
  } catch {
    return null
  }
}

/**
 * トップページ最新記事用。60秒 revalidate でホームの静的性能を維持。
 */
export async function getLatestPosts(limit = 3): Promise<WPPost[]> {
  try {
    const res = await fetch(
      `${WP_API_BASE}/posts?_embed&per_page=${limit}&orderby=date&order=desc`,
      REVALIDATE_60
    )
    if (!res.ok) return []
    return (await res.json()) as WPPost[]
  } catch {
    return []
  }
}

/**
 * サイトマップ生成用。ビルド時に一覧取得するだけなので no-store で問題なし。
 */
export async function fetchAllPostSlugs(): Promise<string[]> {
  try {
    const res = await fetch(
      `${WP_API_BASE}/posts?per_page=100&_fields=slug&orderby=date&order=desc`,
      NO_STORE
    )
    if (!res.ok) return []
    const posts = (await res.json()) as Array<{ slug: string }>
    return posts.map((p) => p.slug)
  } catch {
    return []
  }
}
