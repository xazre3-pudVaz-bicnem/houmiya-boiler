import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import CTABanner from '@/components/CTABanner'
import {
  getPosts,
  getFeaturedImage,
  getFeaturedImageAlt,
  getCategories,
  stripHtml,
  formatDate,
} from '@/lib/wordpress'

// WordPressの最新記事を毎リクエスト取得（即時反映）
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: '給湯器コラム｜株式会社宝宮設備',
  description:
    '給湯器の交換時期、エラーコード、メーカー比較、費用相場など、給湯器に関するお役立ち情報を発信しています。',
  alternates: { canonical: 'https://www.houmiya-boiler.com/blog' },
}

const FALLBACK_IMAGE = '/hero-banner.png'

const EXCLUDED_SLUGS = ['hello-world', 'test', 'sample-page']
const EXCLUDED_CATEGORIES = ['uncategorized', '未分類']

export default async function BlogPage() {
  const rawPosts = await getPosts(20)
  const posts = rawPosts.filter((post) => {
    if (EXCLUDED_SLUGS.includes(post.slug)) return false
    const cats = getCategories(post)
    if (cats.length === 0) return false
    if (cats.every((cat) => EXCLUDED_CATEGORIES.includes(cat.slug) || EXCLUDED_CATEGORIES.includes(cat.name))) return false
    return true
  }).slice(0, 12)

  return (
    <>
      <Header />
      <main className="pt-[100px]">

        {/* ヒーロー */}
        <section className="bg-gradient-to-r from-brand-900 to-brand-800 py-12">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="inline-block bg-white/10 text-blue-200 text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
              Column
            </div>
            <h1 className="text-white font-black text-3xl md:text-4xl mb-3">給湯器コラム</h1>
            <p className="text-blue-100 text-sm md:text-base max-w-xl mx-auto">
              給湯器の交換時期、エラーコード、メーカー比較、費用相場など、給湯器に関するお役立ち情報を発信しています。
            </p>
          </div>
        </section>

        {/* パンくず */}
        <nav className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-brand-700 transition-colors">ホーム</Link>
            <span>›</span>
            <span className="text-gray-600">給湯器コラム</span>
          </div>
        </nav>

        {/* 記事一覧 */}
        <section className="bg-white py-14">
          <div className="max-w-5xl mx-auto px-4">
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">記事を取得できませんでした。時間を置いて再度お試しください。</p>
                <Link href="/" className="inline-block mt-6 text-sky-dark text-sm font-bold hover:underline">
                  トップページへ戻る
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => {
                  const imgSrc = getFeaturedImage(post) ?? FALLBACK_IMAGE
                  const imgAlt = getFeaturedImageAlt(post)
                  const cats = getCategories(post)
                  const excerpt = stripHtml(post.excerpt.rendered).slice(0, 80)
                  return (
                    <article key={post.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-card hover:shadow-card-md hover:border-brand-300 transition-all duration-200 flex flex-col">
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
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          {cats.slice(0, 2).map((cat) => (
                            <span key={cat.id} className="bg-brand-50 text-brand-700 border border-brand-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                              {cat.name}
                            </span>
                          ))}
                          <time dateTime={post.date} className="text-gray-400 text-[11px] ml-auto">
                            {formatDate(post.date)}
                          </time>
                        </div>
                        <h2 className="font-black text-gray-900 text-sm leading-snug mb-2 line-clamp-2 flex-1">
                          <Link href={`/blog/${post.slug}`} className="hover:text-brand-700 transition-colors">
                            {post.title.rendered}
                          </Link>
                        </h2>
                        {excerpt && (
                          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">{excerpt}</p>
                        )}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-brand-700 text-xs font-bold hover:gap-2 transition-all mt-auto"
                        >
                          続きを読む
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        <CTABanner variant="full" />
      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}
