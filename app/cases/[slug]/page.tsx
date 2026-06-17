import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import { casesData } from '@/data/cases'
import { siteConfig } from '@/data/site'

const BASE_URL = 'https://www.houmiya-boiler.com'

const areaLinks: Record<string, { name: string; href: string }> = {
  yokohama: { name: '横浜市の給湯器交換', href: '/area/yokohama' },
  kawasaki: { name: '川崎市の給湯器交換', href: '/area/kawasaki' },
  atsugi: { name: '厚木市の給湯器交換', href: '/area/atsugi' },
  ebina: { name: '海老名市の給湯器交換', href: '/area/ebina' },
}

export async function generateStaticParams() {
  return casesData.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const c = casesData.find((x) => x.slug === slug)
  if (!c) return {}
  const title = `${c.area} ${c.buildingType} ${c.afterModel} 給湯器交換施工事例｜宝宮設備`
  const description = `${c.area}の${c.buildingType}で${c.maker}${c.capacity}号${c.type}タイプへ交換した施工事例。設置タイプ：${c.installationType}、施工時間：${c.duration}。`
  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: c.imageSrc }] },
    alternates: { canonical: `${BASE_URL}/cases/${c.slug}` },
  }
}

const guideLinks = [
  { href: '/guide/full-auto-auto', label: 'フルオートとオートの違い' },
  { href: '/guide/capacity', label: '号数の選び方' },
  { href: '/guide/eco-jaws', label: 'エコジョーズとは' },
  { href: '/guide/lifespan', label: '給湯器の寿命の目安' },
]

const makerCategoryMap: Record<string, string> = {
  'リンナイ': '/rinnai',
  'ノーリツ': '/noritz',
  'パロマ': '/paloma',
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const c = casesData.find((x) => x.slug === slug)
  if (!c) notFound()

  const otherCases = casesData.filter((x) => x.slug !== slug).slice(0, 4)
  const areaLink = c.areaSlug ? areaLinks[c.areaSlug] : null

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'トップ', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: '施工事例一覧', item: `${BASE_URL}/cases` },
      { '@type': 'ListItem', position: 3, name: `${c.area} ${c.afterModel}`, item: `${BASE_URL}/cases/${c.slug}` },
    ],
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${c.area} ${c.buildingType} ${c.afterModel} 給湯器交換施工事例`,
    image: c.imageSrc,
    datePublished: c.date,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: BASE_URL,
    },
  }

  const rows: [string, string][] = [
    ['施工エリア', c.area],
    ['建物種別', c.buildingType],
    ['設置タイプ', c.installationType],
    ['交換前の機種', c.beforeModel],
    ['交換後の機種', c.afterModel],
    ['号数', `${c.capacity}号`],
    ['タイプ', c.type],
    ['施工時間', c.duration],
    ['施工時期', c.date],
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Header />
      <main className="pt-[100px]">

        {/* パンくず */}
        <nav className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center gap-2 text-xs text-gray-400 flex-wrap">
            <Link href="/" className="hover:text-brand-700 transition-colors">トップ</Link>
            <span>›</span>
            <Link href="/cases" className="hover:text-brand-700 transition-colors">施工事例一覧</Link>
            <span>›</span>
            <span className="text-gray-600">{c.area} {c.maker} {c.capacity}号 交換</span>
          </div>
        </nav>

        <article className="max-w-4xl mx-auto px-4 py-10">

          {/* ヘッダー */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs bg-brand-50 text-brand-700 border border-brand-200 font-bold px-2.5 py-0.5 rounded-full">{c.area}</span>
              <span className="text-xs bg-gray-100 text-gray-600 font-bold px-2.5 py-0.5 rounded-full">{c.buildingType}</span>
              <span className="text-xs bg-gray-100 text-gray-600 font-bold px-2.5 py-0.5 rounded-full">{c.installationType}</span>
              <span className="text-xs text-gray-400 ml-auto">{c.date}</span>
            </div>
            <h1 className="font-black text-2xl md:text-3xl text-gray-900 leading-snug">
              {c.area} {c.buildingType}の給湯器交換 — {c.afterModel}
            </h1>
          </div>

          {/* メイン画像 */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-100 mb-8 shadow-card">
            <Image
              src={c.imageSrc}
              alt={c.imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              unoptimized={c.imageSrc.startsWith('https://images.microcms')}
            />
          </div>

          {/* 施工概要テーブル */}
          <section className="mb-10">
            <h2 className="text-xl font-black text-gray-900 mb-4">施工概要</h2>
            <div className="rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {rows.map(([label, value], i) => (
                    <tr key={label} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <th className="text-left text-gray-500 font-bold px-4 py-3 w-36 align-top">{label}</th>
                      <td className="text-gray-800 px-4 py-3">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 施工内容 */}
          <section className="mb-10">
            <h2 className="text-xl font-black text-gray-900 mb-3">施工内容</h2>
            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-gray-700 leading-relaxed text-sm">{c.comment}</p>
            </div>
          </section>

          {/* 関連エリアページ */}
          {areaLink && (
            <section className="mb-10">
              <h2 className="text-lg font-black text-gray-900 mb-3">施工エリア</h2>
              <Link
                href={areaLink.href}
                className="inline-flex items-center gap-2 border border-brand-200 text-brand-700 bg-brand-50 hover:bg-brand-100 font-bold text-sm px-4 py-2.5 rounded-lg transition-colors"
              >
                {areaLink.name}の詳細情報・施工事例 →
              </Link>
            </section>
          )}

          {/* メーカーリンク */}
          <section className="mb-10">
            <h2 className="text-lg font-black text-gray-900 mb-3">交換機種について</h2>
            <div className="flex flex-wrap gap-3">
              {makerCategoryMap[c.maker] && (
                <Link
                  href={makerCategoryMap[c.maker]}
                  className="inline-flex items-center gap-1.5 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
                >
                  {c.maker}の給湯器 一覧 →
                </Link>
              )}
              <Link
                href="/guide/capacity"
                className="inline-flex items-center gap-1.5 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
              >
                号数の選び方 →
              </Link>
              <Link
                href="/guide/full-auto-auto"
                className="inline-flex items-center gap-1.5 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
              >
                フルオートとオートの違い →
              </Link>
            </div>
          </section>

          {/* 基礎知識リンク */}
          <section className="mb-10">
            <h2 className="text-lg font-black text-gray-900 mb-3">関連する基礎知識</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {guideLinks.map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className="text-xs text-brand-700 border border-brand-100 bg-brand-50 hover:bg-brand-100 font-bold px-3 py-2.5 rounded-lg transition-colors text-center"
                >
                  {g.label}
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 text-center mb-10">
            <div className="font-black text-xl text-gray-900 mb-1">同じような給湯器交換のご相談はこちら</div>
            <p className="text-gray-600 text-sm mb-5">
              設置タイプ・号数・エリアに応じた最適な機種をご提案します。無料見積もり受付中。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/estimate"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black px-7 py-3.5 rounded-lg transition-colors shadow w-full sm:w-auto justify-center"
              >
                無料見積もりを依頼する
              </Link>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white font-bold px-6 py-3.5 rounded-lg transition-colors w-full sm:w-auto justify-center"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                {siteConfig.phone}
              </a>
            </div>
          </div>

          {/* 他の施工事例 */}
          <section>
            <h2 className="text-lg font-black text-gray-900 mb-4">他の施工事例</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {otherCases.map((oc) => (
                <Link
                  key={oc.slug}
                  href={`/cases/${oc.slug}`}
                  className="flex gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-blue-200 transition-all group"
                >
                  <div className="relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={oc.imageSrc}
                      alt={oc.imageAlt}
                      fill
                      sizes="80px"
                      className="object-cover"
                      unoptimized={oc.imageSrc.startsWith('https://images.microcms')}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{oc.area}</span>
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{oc.buildingType}</span>
                    </div>
                    <p className="text-xs font-bold text-gray-800 group-hover:text-brand-700 leading-snug line-clamp-2">
                      {oc.afterModel}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{oc.date}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-5 text-center">
              <Link
                href="/cases"
                className="inline-flex items-center gap-2 text-brand-700 text-sm font-bold hover:text-brand-900 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                施工事例一覧へ
              </Link>
            </div>
          </section>

        </article>
      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}
