import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type BlogPost = {
  title: string
  slug: string
  description: string
  date: string
  category: string
  tags: string[]
  content: string
}

const postsDirectory = path.join(process.cwd(), 'content/blog')

function getPostFiles(): string[] {
  if (!fs.existsSync(postsDirectory)) return []
  return fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md'))
}

function parsePost(filename: string): BlogPost {
  const filePath = path.join(postsDirectory, filename)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  const fileSlug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '')
  return {
    title: data.title ?? '',
    slug: data.slug ?? fileSlug,
    description: data.description ?? '',
    date: data.date ? String(data.date) : '',
    category: data.category ?? '給湯器コラム',
    tags: Array.isArray(data.tags) ? data.tags : [],
    content,
  }
}

export function getAllPosts(): BlogPost[] {
  const files = getPostFiles()
  const posts = files.map(parsePost)
  // 同一slugの記事が複数存在する場合は最新日付の1件のみ採用（重複URL防止）
  const bySlug = new Map<string, BlogPost>()
  for (const post of posts) {
    const existing = bySlug.get(post.slug)
    if (!existing || post.date > existing.date) bySlug.set(post.slug, post)
  }
  return Array.from(bySlug.values()).sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getPostBySlug(slug: string): BlogPost | null {
  // 一覧・詳細・sitemapでslug解決ルールを統一（frontmatter slug優先）
  return getAllPosts().find((p) => p.slug === slug) ?? null
}

export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts()
  return posts.filter((p) => p.category === category)
}

export function formatBlogDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

// 本文キーワードの内部リンク化マップ（旧WordPress版のkeywordLinkMapをMarkdown版に移植）
const keywordLinkMap: { keyword: string; href: string }[] = [
  { keyword: '横浜市', href: '/area/yokohama' },
  { keyword: '川崎市', href: '/area/kawasaki' },
  { keyword: '厚木市', href: '/area/atsugi' },
  { keyword: '海老名市', href: '/area/ebina' },
  { keyword: 'エコジョーズ', href: '/guide/eco-jaws' },
  { keyword: 'エラーコード', href: '/guide/error-code' },
  { keyword: 'お湯が出ない', href: '/trouble/no-hot-water' },
  { keyword: '号数', href: '/guide/capacity' },
  { keyword: 'フルオート', href: '/guide/full-auto-auto' },
  { keyword: '寿命', href: '/guide/lifespan' },
]

/**
 * Markdown本文内の特定キーワードを内部リンク化する
 * - 各キーワード・各リンク先とも最初の1回のみ（過剰最適化の回避）
 * - 見出し・表・引用・コードブロック・既存リンク内はスキップ
 */
export function addKeywordLinks(markdown: string): string {
  const linkedHrefs = new Set<string>()
  for (const { href } of keywordLinkMap) {
    if (markdown.includes(`](${href})`)) linkedHrefs.add(href)
  }
  const doneKeywords = new Set<string>()
  let inCodeBlock = false
  const lines = markdown.split('\n').map((line) => {
    if (line.trimStart().startsWith('```')) {
      inCodeBlock = !inCodeBlock
      return line
    }
    if (inCodeBlock) return line
    const trimmed = line.trimStart()
    if (trimmed.startsWith('#') || trimmed.startsWith('|') || trimmed.startsWith('>')) return line
    let out = line
    for (const { keyword, href } of keywordLinkMap) {
      if (doneKeywords.has(keyword) || linkedHrefs.has(href)) continue
      const idx = out.indexOf(keyword)
      if (idx === -1) continue
      // 既存の [リンクテキスト] 内に含まれる場合はスキップ（簡易判定）
      const before = out.slice(0, idx)
      const opens = (before.match(/\[/g) || []).length
      const closes = (before.match(/\]/g) || []).length
      if (opens > closes) continue
      out = `${out.slice(0, idx)}[${keyword}](${href})${out.slice(idx + keyword.length)}`
      doneKeywords.add(keyword)
      linkedHrefs.add(href)
    }
    return out
  })
  return lines.join('\n')
}
