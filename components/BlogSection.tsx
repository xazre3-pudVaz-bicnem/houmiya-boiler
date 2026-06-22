import Link from 'next/link'
import { getAllPosts, formatBlogDate } from '@/lib/blog'

const CATEGORY_COLORS: Record<string, string> = {
  'トラブル': 'bg-red-50 text-red-700 border-red-200',
  '選び方': 'bg-blue-50 text-blue-700 border-blue-200',
  '基礎知識': 'bg-brand-50 text-brand-700 border-brand-200',
  '種類': 'bg-green-50 text-green-700 border-green-200',
  'コスト': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  '地域情報': 'bg-purple-50 text-purple-700 border-purple-200',
}

function categoryClass(cat: string): string {
  return CATEGORY_COLORS[cat] ?? 'bg-brand-50 text-brand-700 border-brand-200'
}

export default function BlogSection() {
  const posts = getAllPosts().slice(0, 3)
  if (posts.length === 0) return null

  return (
    <section className="py-14 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">

        <div className="text-center mb-10">
          <div className="inline-block text-xs font-bold uppercase tracking-widest text-sky mb-2">Column</div>
          <h2 className="text-2xl md:text-3xl font-black text-brand-900">給湯器コラム</h2>
          <p className="text-gray-500 text-sm mt-2">給湯器に関するお役立ち情報を発信しています</p>
          <span className="block w-8 h-0.5 bg-sky mx-auto mt-3" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-card hover:shadow-card-md hover:border-brand-300 transition-all duration-200 flex flex-col p-4"
            >
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={`border text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryClass(post.category)}`}>
                  {post.category}
                </span>
                <time dateTime={post.date} className="text-gray-400 text-[10px] ml-auto">
                  {formatBlogDate(post.date)}
                </time>
              </div>
              <h3 className="font-black text-gray-900 text-sm leading-snug mb-1.5 flex-1">
                <Link href={`/blog/${post.slug}`} className="hover:text-brand-700 transition-colors line-clamp-2">
                  {post.title}
                </Link>
              </h3>
              {post.description && (
                <p className="text-gray-400 text-xs line-clamp-2 mb-3">{post.description}</p>
              )}
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-brand-700 text-xs font-bold hover:gap-2 transition-all mt-auto"
              >
                続きを読む
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border border-brand-700 text-brand-700 hover:bg-brand-700 hover:text-white font-bold px-6 py-2.5 rounded-lg transition-colors text-sm"
          >
            コラム一覧を見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  )
}
