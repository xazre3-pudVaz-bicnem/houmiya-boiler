import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import CTABanner from '@/components/CTABanner'
import { getAllPosts, formatBlogDate } from '@/lib/blog'

export const metadata: Metadata = {
  title: '給湯器コラム｜株式会社宝宮設備',
  description:
    '給湯器の交換時期、エラーコード、メーカー比較、費用相場など、給湯器に関するお役立ち情報を発信しています。',
  alternates: { canonical: 'https://www.houmiya-boiler.com/blog' },
  openGraph: {
    title: '給湯器コラム｜宝宮設備',
    description: '給湯器の交換時期、エラーコード、メーカー比較、費用相場など、給湯器に関するお役立ち情報を発信。',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

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

export default function BlogPage() {
  const posts = getAllPosts()

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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">記事が見つかりませんでした。</p>
                <Link href="/" className="inline-block mt-6 text-brand-700 text-sm font-bold hover:underline">
                  トップページへ戻る
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-card hover:shadow-card-md hover:border-brand-300 transition-all duration-200 flex flex-col p-5"
                  >
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className={`border text-[11px] font-bold px-2.5 py-0.5 rounded-full ${categoryClass(post.category)}`}>
                        {post.category}
                      </span>
                      <time dateTime={post.date} className="text-gray-400 text-[11px] ml-auto">
                        {formatBlogDate(post.date)}
                      </time>
                    </div>
                    <h2 className="font-black text-gray-900 text-sm leading-snug mb-2 flex-1">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-brand-700 transition-colors line-clamp-2"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    {post.description && (
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">
                        {post.description}
                      </p>
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
                  </article>
                ))}
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
