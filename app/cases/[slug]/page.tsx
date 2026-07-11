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
  const description = `${c.area}の${c.buildingType}で${c.maker}${c.capacity}号${c.type}タイプへ交換した施工事例。${c.date}施工。${c.beforeModel}からの交換。設置タイプ：${c.installationType}、施工時間：${c.duration}。`
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/cases/${c.slug}`,
      siteName: '宝宮設備 給湯器交換専門サイト',
      locale: 'ja_JP',
      type: 'article',
      images: [{ url: c.imageSrc.startsWith('/') ? `${BASE_URL}${c.imageSrc}` : c.imageSrc }],
    },
    twitter: { card: 'summary_large_image' },
    alternates: { canonical: `${BASE_URL}/cases/${c.slug}` },
  }
}

// '2026年6月' のような和暦テキストをISO 8601の月精度表記（'2026-06'）へ変換
function toIsoMonth(dateJa: string): string {
  const m = dateJa.match(/(\d{4})年(\d{1,2})月/)
  if (!m) return dateJa
  return `${m[1]}-${m[2].padStart(2, '0')}`
}

const guideLinks = [
  { href: '/guide/full-auto-auto', label: 'フルオートとオートの違い' },
  { href: '/guide/capacity', label: '号数の選び方' },
  { href: '/guide/eco-jaws', label: 'エコジョーズとは' },
  { href: '/guide/lifespan', label: '給湯器の寿命の目安' },
  { href: '/guide/cost', label: '交換費用の相場' },
  { href: '/guide/photo-estimate', label: '写真見積もりの手順' },
  { href: '/guide/warranty', label: '保証・アフターサービス' },
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
  const wardLink = c.areaSlug === 'yokohama' && c.wardSlug
    ? { href: `/area/yokohama/${c.wardSlug}`, name: `${c.area}の給湯器交換` }
    : null

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
    description: `${c.area}の${c.buildingType}で${c.maker}${c.capacity}号${c.type}タイプへ交換した施工事例。${c.date}施工。`,
    image: c.imageSrc.startsWith('/') ? `${BASE_URL}${c.imageSrc}` : c.imageSrc,
    datePublished: toIsoMonth(c.date),
    dateModified: toIsoMonth(c.date),
    author: { '@type': 'Organization', name: siteConfig.name, url: BASE_URL },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/cases/${c.slug}` },
    contentLocation: {
      '@type': 'Place',
      name: c.area,
      address: { '@type': 'PostalAddress', addressLocality: c.city, addressRegion: '神奈川県', addressCountry: 'JP' },
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

  const isPS = c.installationType.includes('PS')
  const isManshon = c.buildingType === 'マンション' || c.buildingType.includes('マンション')

  const faqItems: { q: string; a: string }[] = [
    {
      q: `${c.installationType}タイプの給湯器交換はどのくらいの時間がかかりますか？`,
      a: `標準的な${c.installationType}タイプの給湯器交換は${c.duration}程度が目安です。既存配管の状態や付帯工事の有無によって前後することがあります。事前に写真見積もりで確認し、当日の施工をスムーズに進められるよう準備しています。`,
    },
    isPS
      ? {
          q: `マンションのパイプスペース（PS）設置型は、どのメーカーの機種でも交換できますか？`,
          a: `PS設置型は、PS扉の内寸・排気方式（強制給排気・屋外排気など）に適合した機種を選ぶ必要があります。${c.maker}をはじめ主要メーカーに対応していますが、マンションの管理規約によって使用できるメーカーや機種が指定されている場合もあります。事前に管理組合への確認をお願いすることがあります。`,
        }
      : {
          q: `屋外壁掛型の給湯器交換で、配管を新設する必要はありますか？`,
          a: `既存の配管が良好な状態であれば、そのまま流用できるケースが多いです。今回の事例でも既存配管を確認のうえ再利用しています。ただし、配管の劣化・腐食・口径変更が必要な場合は配管工事が加わるため、見積もり時に状態を確認します。`,
        },
    {
      q: `給湯器の号数（${c.capacity}号）は変更できますか？`,
      a: `号数の変更は可能ですが、ガス供給量・配管口径・設置スペースの確認が必要です。号数を上げる場合はガス管の容量確認が必要になることがあります。現在の生活人数や使用状況に合わせた号数選びについては、無料見積もり時にご相談ください。`,
    },
    {
      q: `${c.maker}製の給湯器に交換した場合、保証はどうなりますか？`,
      a: `${c.maker}製品はメーカー標準保証（1〜2年）が付属します。弊社では工事保証も提供しており、施工に起因する不具合については対応いたします。保証の詳細は機種・工事内容により異なりますので、見積もり時にご確認ください。`,
    },
    {
      q: `${isManshon ? 'マンション' : '戸建て'}での給湯器交換で注意することはありますか？`,
      a: isManshon
        ? `マンションの場合、管理規約・管理組合への届け出が必要なケースがあります。また、PS（パイプスペース）の扉サイズや排気方式の制約があるため、適合機種の確認が重要です。工事前に必要な確認事項を整理し、スムーズに進められるようご案内します。`
        : `戸建ての場合は設置スペースの確保・ドレン排水の処理方法（エコジョーズの場合）・ガス供給量の確認が主なチェックポイントです。設置環境の写真をお送りいただければ、事前に確認事項を整理した状態でご訪問できます。`,
    },
    {
      q: `給湯器交換の見積もりはどのように依頼すればよいですか？`,
      a: `LINEでの写真見積もり、またはWebフォームからお申し込みいただけます。給湯器本体の型番シールや設置箇所の写真をお送りいただくことで、現地確認不要で正確なお見積もりを提示できることが多いです。横浜市・川崎市・厚木市・海老名市のエリアは自社スタッフが対応します。`,
    },
  ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
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
                      <th scope="row" className="text-left text-gray-500 font-bold px-4 py-3 w-36 align-top">{label}</th>
                      <td className="text-gray-800 px-4 py-3">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              ※ 掲載内容には、代表的な施工内容をもとに構成した交換ケース例を含みます。実際の工事内容・時間は現場状況により異なります。
            </p>
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

          {/* 工事内容の詳細 */}
          {c.workContent && (
            <section className="py-8 border-b border-gray-100">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-lg font-black text-gray-900 mb-3">工事の内容</h2>
                <p className="text-sm text-gray-700 leading-relaxed">{c.workContent}</p>
              </div>
            </section>
          )}

          {/* 確認したポイント + 写真で確認した内容 */}
          {(c.checkPoints || c.photoPoints) && (
            <section className="py-8 border-b border-gray-100">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {c.checkPoints && (
                    <div>
                      <h3 className="text-sm font-black text-gray-800 mb-3">交換時に確認したポイント</h3>
                      <ul className="space-y-2">
                        {c.checkPoints.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <svg className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                            </svg>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {c.photoPoints && (
                    <div>
                      <h3 className="text-sm font-black text-gray-800 mb-3">写真見積もりで確認した内容</h3>
                      <ul className="space-y-2">
                        {c.photoPoints.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

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
          {(areaLink || wardLink) && (
            <section className="mb-10">
              <h2 className="text-lg font-black text-gray-900 mb-3">施工エリア</h2>
              <div className="flex flex-wrap gap-3">
                {wardLink && (
                  <Link
                    href={wardLink.href}
                    className="inline-flex items-center gap-2 border border-brand-200 text-brand-700 bg-brand-50 hover:bg-brand-100 font-bold text-sm px-4 py-2.5 rounded-lg transition-colors"
                  >
                    {wardLink.name}の詳細情報 →
                  </Link>
                )}
                {areaLink && (
                  <Link
                    href={areaLink.href}
                    className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 font-bold text-sm px-4 py-2.5 rounded-lg transition-colors"
                  >
                    {areaLink.name}の施工事例一覧 →
                  </Link>
                )}
              </div>
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

          {/* よくある質問 */}
          <section className="mb-10" id="faq">
            <h2 className="text-xl font-black text-gray-900 mb-6">よくある質問（FAQ）</h2>
            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer bg-white hover:bg-gray-50 transition-colors list-none">
                    <span className="flex items-start gap-3">
                      <span className="text-brand-700 font-black text-sm flex-shrink-0 mt-0.5">Q</span>
                      <span className="text-sm font-bold text-gray-800">{item.q}</span>
                    </span>
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 font-black text-sm flex-shrink-0 mt-0.5">A</span>
                      <p className="text-sm text-gray-700 leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </details>
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
