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

const keywordLinkMap: { keyword: string; href: string }[] = [
  { keyword: '横浜市', href: '/area/yokohama' },
  { keyword: '川崎市', href: '/area/kawasaki' },
  { keyword: '厚木市', href: '/area/atsugi' },
  { keyword: '海老名市', href: '/area/ebina' },
  { keyword: 'エコジョーズ', href: '/guide/eco-jaws' },
  { keyword: 'エラー111', href: '/trouble/error-111' },
  { keyword: 'お湯が出ない', href: '/trouble/no-hot-water' },
  { keyword: '号数', href: '/guide/capacity' },
  { keyword: 'フルオート', href: '/guide/full-auto-auto' },
  { keyword: '寿命', href: '/guide/lifespan' },
]

/**
 * WordPress HTML内の特定キーワードに内部リンクを追加する
 * - 各キーワードの最初の出現のみリンク化（多重リンク回避）
 * - すでに <a> タグ内にある場合はスキップ
 */
function addKeywordLinks(html: string): string {
  let result = html
  for (const { keyword, href } of keywordLinkMap) {
    if (result.includes(`href="${href}"`)) continue
    const regex = new RegExp(`(?<!<[^>]*)(${keyword})(?![^<]*>)`, 'u')
    result = result.replace(
      regex,
      `<a href="${href}" class="text-brand-700 underline underline-offset-2 hover:text-brand-900 font-semibold">${keyword}</a>`
    )
  }
  return result
}

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

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title.rendered,
    datePublished: post.date,
    dateModified: post.modified,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: 'https://www.houmiya-boiler.com',
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.houmiya-boiler.com/logo.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.houmiya-boiler.com/blog/${slug}`,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'トップ', item: 'https://www.houmiya-boiler.com' },
      { '@type': 'ListItem', position: 2, name: '給湯器コラム', item: 'https://www.houmiya-boiler.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title.rendered, item: `https://www.houmiya-boiler.com/blog/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
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
            dangerouslySetInnerHTML={{ __html: addKeywordLinks(post.content.rendered) }}
          />

          {/* 記事下CTA */}
          <div className="mt-12 bg-brand-50 border border-brand-200 rounded-xl p-6 text-center">
            <div className="text-brand-900 font-black text-lg mb-1">給湯器の交換・お見積りはお気軽に</div>
            <p className="text-brand-700 text-sm mb-4">
              横浜市・川崎市・厚木市・海老名市対応。無料見積もり受付中。
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
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
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition-colors shadow"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.03 2 11c0 3.28 1.84 6.16 4.6 7.9-.14.43-.31.84-.52 1.22-.2.36-.1.81.26 1.06.19.14.42.2.64.14.06-.02 5.96-1.66 7.02-2.01C14.95 19.41 16 18.49 17 17.4 17 17.4 22 14.65 22 11c0-4.97-4.48-9-10-9z" />
                </svg>
                LINEで写真相談
              </a>
            </div>
          </div>

          {/* 関連ページ内部リンク */}
          <div className="mt-10 border border-gray-200 rounded-xl p-5">
            <p className="text-xs font-black text-gray-600 uppercase tracking-wider mb-4">関連するページ</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
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
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">横浜市・川崎市 区ページ</p>
                <ul className="space-y-1.5">
                  {[
                    { href: '/area/yokohama/kohoku', label: '横浜市港北区' },
                    { href: '/area/yokohama/totsuka', label: '横浜市戸塚区' },
                    { href: '/area/yokohama/aoba', label: '横浜市青葉区' },
                    { href: '/area/kawasaki/nakahara', label: '川崎市中原区' },
                    { href: '/area/yokohama', label: '横浜市 全18区を見る' },
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
