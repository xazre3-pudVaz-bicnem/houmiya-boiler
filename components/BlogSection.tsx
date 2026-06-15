import Image from 'next/image'
import Link from 'next/link'
import {
  fetchPosts,
  getFeaturedImage,
  getFeaturedImageAlt,
  getCategories,
  stripHtml,
  formatDate,
} from '@/lib/wordpress'

const FALLBACK_IMAGE = '/hero-banner.png'

export default async function BlogSection() {
  const posts = await fetchPosts(3)
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
          {posts.map((post) => {
            const imgSrc = getFeaturedImage(post) ?? FALLBACK_IMAGE
            const imgAlt = getFeaturedImageAlt(post)
            const cats = getCategories(post)
            const excerpt = stripHtml(post.excerpt.rendered).slice(0, 70)
            return (
              <article
                key={post.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-card hover:shadow-card-md hover:border-brand-300 transition-all duration-200 flex flex-col"
              >
                <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={imgSrc}
                    alt={imgAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    unoptimized={imgSrc.startsWith('https://wp.')}
                  />
                </Link>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {cats.slice(0, 1).map((cat) => (
                      <span key={cat.id} className="bg-brand-50 text-brand-700 border border-brand-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {cat.name}
                      </span>
                    ))}
                    <time dateTime={post.date} className="text-gray-400 text-[10px] ml-auto">
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <h3 className="font-black text-gray-900 text-sm leading-snug mb-1.5 line-clamp-2 flex-1">
                    <Link href={`/blog/${post.slug}`} className="hover:text-brand-700 transition-colors">
                      {post.title.rendered}
                    </Link>
                  </h3>
                  {excerpt && (
                    <p className="text-gray-400 text-xs line-clamp-2 mb-3">{excerpt}</p>
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
                </div>
              </article>
            )
          })}
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
