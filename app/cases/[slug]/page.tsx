import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import ProductCard from '@/components/ProductCard'
import { casesData } from '@/data/cases'
import { productsData } from '@/data/products'
import { siteConfig } from '@/data/site'

const makerLabelToKey: Record<string, 'rinnai' | 'noritz' | 'paloma'> = {
  'リンナイ': 'rinnai',
  'ノーリツ': 'noritz',
  'パロマ': 'paloma',
}

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

  // 同じメーカー・同じ号数の関連商品
  const makerKey = makerLabelToKey[c.maker]
  let relatedProducts = makerKey
    ? productsData.filter((p) => p.maker === makerKey && p.capacity === c.capacity)
    : []
  // 同号数が無い場合は同メーカーの商品でフォールバック
  if (relatedProducts.length === 0 && makerKey) {
    relatedProducts = productsData.filter((p) => p.maker === makerKey)
  }
  relatedProducts = relatedProducts.slice(0, 3)

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

          {/* この施工事例のポイント */}
          <section className="mb-10">
            <h2 className="text-xl font-black text-gray-900 mb-3">この施工事例のポイント</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
              <p className="text-gray-700 text-sm leading-relaxed">
                今回の事例は{c.area}の{c.buildingType}での給湯器交換です。設置タイプは{c.installationType}、号数は{c.capacity}号、
                {c.type}タイプへの交換を行いました。建物タイプ・設置タイプ・号数は、現在お使いの給湯器の型番と
                設置場所の写真を確認したうえで判断しています。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                {c.installationType.includes('PS')
                  ? 'マンションのパイプスペース（PS）設置型では、PS扉の寸法や排気方式に適合した機種を選ぶ必要があります。管理規約で機種が指定されている場合もあるため、事前の確認が大切です。'
                  : '屋外壁掛型では、設置スペースや配管の状態を確認したうえで、適した号数・タイプの機種を選定します。号数を変更する場合はガス供給量や配管の確認が必要になります。'}
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                交換にあたっては、既存機の撤去・処分から新規取付・試運転・使用説明までを行いました。
                施工時間は{c.duration}です。同じような設置条件での交換も承っていますので、お気軽にご相談ください。
              </p>
            </div>
          </section>

          {/* 同じ条件の方に選ばれる商品 */}
          {relatedProducts.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-black text-gray-900 mb-3">同じ条件の方に選ばれる商品</h2>
              <p className="text-gray-600 text-sm mb-4">
                {c.maker}の{c.capacity}号クラスの給湯器です。工事費込みの価格を掲載しています。
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}

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

          {/* 関連ページ */}
          <section className="mb-10">
            <h2 className="text-lg font-black text-gray-900 mb-3">関連ページ</h2>
            <div className="flex flex-wrap gap-2">
              {areaLink && (
                <Link
                  href={areaLink.href}
                  className="text-sm font-bold text-brand-700 border border-brand-200 bg-brand-50 hover:bg-brand-100 px-4 py-2 rounded-lg transition-colors"
                >
                  {areaLink.name} →
                </Link>
              )}
              {makerCategoryMap[c.maker] && (
                <Link
                  href={makerCategoryMap[c.maker]}
                  className="text-sm font-bold text-brand-700 border border-brand-200 bg-brand-50 hover:bg-brand-100 px-4 py-2 rounded-lg transition-colors"
                >
                  {c.maker}の給湯器一覧 →
                </Link>
              )}
              {guideLinks.map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className="text-sm font-bold text-brand-700 border border-brand-200 bg-brand-50 hover:bg-brand-100 px-4 py-2 rounded-lg transition-colors"
                >
                  {g.label} →
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
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#00B900] hover:bg-[#009a00] text-white font-bold px-6 py-3.5 rounded-lg transition-colors w-full sm:w-auto justify-center"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.07 9.437-6.975C23.176 14.393 24 12.458 24 10.314" /></svg>
                LINEで相談
              </a>
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
