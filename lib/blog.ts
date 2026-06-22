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
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getPostBySlug(slug: string): BlogPost | null {
  const files = getPostFiles()
  const file = files.find((f) => {
    const fileSlug = f.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '')
    return fileSlug === slug
  })
  if (!file) return null
  return parsePost(file)
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
