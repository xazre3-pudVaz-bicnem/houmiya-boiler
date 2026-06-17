import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import { siteConfig } from '@/data/site'
import {
  getPostBySlug,
  getFeaturedImage,
  getFeaturedImageAlt,
  getCategories,
  stripHtml,
  formatDate,
} from '@/lib/wordpress'

// WordPressの最新記事を毎リクエスト取得（即時反映）
export const dynamic = 'force-dynamic'
export const revalidate = 0

const FALLBACK_IMAGE = '/hero-banner.png'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  const title = `${post.title.rendered} | ${siteConfig.name}`
  const description = stripHtml(post.excerpt.rendered).slice(0, 120)
  const imgSrc = getFeaturedImage(post)
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: 'ja_JP',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      ...(imgSrc ? { images: [{ url: imgSrc }] } : {}),
    },
    twitter: { card: 'summary_large_image' },
    alternates: { canonical: `https://www.houmiya-boiler.com/blog/${slug}` },
  }
}

export default async function BlogDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const imgSrc = getFeaturedImage(post) ?? FALLBACK_IMAGE
  const imgAlt = getFeaturedImageAlt(post)
  const cats = getCategories(post)

  return (
    <>
      <Header />
      <main className="pt-[100px]">

        {/* パンくず */}
        <nav className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center gap-2 text-xs text-gray-400 flex-wrap">
            <Link href="/" className="hover:text-brand-700 transition-colors">ホーム</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-brand-700 transition-colors">給湯器コラム</Link>
            <span>›</span>
            <span className="text-gray-600 line-clamp-1">{post.title.rendered}</span>
          </div>
        </nav>

        <article className="max-w-3xl mx-auto px-4 py-12">

          {/* カテゴリ・日付 */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {cats.map((cat) => (
              <span key={cat.id} className="bg-brand-50 text-brand-700 border border-brand-200 text-xs font-bold px-3 py-1 rounded-full">
                {cat.name}
              </span>
            ))}
            <time dateTime={post.date} className="text-gray-400 text-xs ml-auto">
              {formatDate(post.date)}
            </time>
          </div>

          {/* タイトル */}
          <h1 className="font-black text-2xl md:text-3xl text-gray-900 leading-snug mb-6">
            {post.title.rendered}
          </h1>

          {/* アイキャッチ */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-100 mb-8 shadow-card">
            <Image
              src={imgSrc}
              alt={imgAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              unoptimized={imgSrc.startsWith('https://wp.')}
            />
          </div>

          {/* 本文 */}
          <div
            className="wp-content"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* 記事下CTA */}
          <div className="mt-12 bg-brand-50 border border-brand-200 rounded-xl p-6 text-center">
            <div className="text-brand-900 font-black text-lg mb-1">給湯器の交換・お見積りはお気軽に</div>
            <p className="text-brand-700 text-sm mb-4">
              横浜市・川崎市・厚木市・海老名市対応。無料見積もり受付中。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/estimate"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black px-6 py-3 rounded-lg transition-colors shadow"
              >
                無料見積もりを依頼する
              </Link>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                {siteConfig.phone}
              </a>
            </div>
          </div>

          {/* 関連ページ内部リンク */}
          <div className="mt-10 border border-gray-200 rounded-xl p-5">
            <p className="text-xs font-black text-gray-600 uppercase tracking-wider mb-4">関連するページ</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">対応エリア</p>
                <ul className="space-y-1.5">
                  {[
                    { href: '/area/yokohama', label: '横浜市の給湯器交換' },
                    { href: '/area/kawasaki', label: '川崎市の給湯器交換' },
                    { href: '/area/atsugi', label: '厚木市の給湯器交換' },
                    { href: '/area/ebina', label: '海老名市の給湯器交換' },
                  ].map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-xs text-brand-700 hover:text-brand-900 font-bold hover:underline">
                        {l.label} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">給湯器の基礎知識</p>
                <ul className="space-y-1.5">
                  {[
                    { href: '/guide/full-auto-auto', label: 'フルオートとオートの違い' },
                    { href: '/guide/capacity', label: '号数の選び方' },
                    { href: '/guide/eco-jaws', label: 'エコジョーズとは' },
                    { href: '/guide/lifespan', label: '給湯器の寿命' },
                    { href: '/guide/error-code', label: 'エラーコード一覧' },
                  ].map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-xs text-brand-700 hover:text-brand-900 font-bold hover:underline">
                        {l.label} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">トラブル症状</p>
                <ul className="space-y-1.5">
                  {[
                    { href: '/trouble/no-hot-water', label: 'お湯が出ない' },
                    { href: '/trouble/error-111', label: 'エラーコード111' },
                    { href: '/trouble/water-leak', label: '水漏れがある' },
                    { href: '/trouble/temperature-unstable', label: '温度が安定しない' },
                    { href: '/trouble', label: 'トラブル症状一覧' },
                  ].map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-xs text-brand-700 hover:text-brand-900 font-bold hover:underline">
                        {l.label} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ブログ一覧へ戻る */}
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-brand-700 text-sm font-bold hover:text-brand-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              給湯器コラム一覧へ
            </Link>
          </div>

        </article>
      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}
