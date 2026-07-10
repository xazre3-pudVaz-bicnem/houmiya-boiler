import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import FaqAccordion from '@/components/FaqAccordion'
import { siteConfig } from '@/data/site'
import { yokohamaDistricts, allYokohamaDistricts } from '@/data/yokohama-districts'
import { yokohamaStations } from '@/data/yokohama-stations'
import { getProductBySlug, formatPrice, type ProductItem } from '@/data/products'
import { casesData } from '@/data/cases'

export async function generateStaticParams() {
  return allYokohamaDistricts.map((d) => ({ slug: 'yokohama', district: d.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; district: string }>
}): Promise<Metadata> {
  const { district } = await params
  const config = yokohamaDistricts[district]
  if (!config) return {}
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: { canonical: config.canonical },
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      locale: 'ja_JP',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

const capacityRows = [
  { go: '16号', family: '一人暮らし向け', use: 'シャワー中心・同時使用が少ない' },
  { go: '20号', family: '2〜3人家族向け', use: 'キッチンとシャワーを順番に使う' },
  { go: '24号', family: '4人以上の家族向け', use: 'お風呂とキッチンの同時使用が多い' },
]

// 症状スラッグ → ラベル
const troubleLabels: Record<string, string> = {
  'no-hot-water': 'お湯が出ない',
  'error-111': 'エラー111が出る',
  'water-leak': '水漏れがする',
  'no-ignition': '点火しない',
  'temperature-unstable': 'お湯の温度が不安定',
  'remote-control-error': 'リモコンのエラー・故障',
  'exhaust-smell': '異臭・排気ガス臭がする',
  noise: '異音がする',
  'pilot-off': '種火が消える・不完全燃焼',
  freeze: '凍結・凍結防止',
  'bath-autofill': '自動湯張りが動かない',
  'hot-water-flow': 'お湯の出が悪い',
}

export default async function DistrictPage({
  params,
}: {
  params: Promise<{ slug: string; district: string }>
}) {
  const { slug, district } = await params
  const config = yokohamaDistricts[district]
  if (!config || slug !== 'yokohama') notFound()

  const districtTitle = `${config.name}周辺`

  // 最寄り駅（駅ページが存在するもののみ）
  const nearStations = config.nearestStations
    .map((s) => yokohamaStations[s])
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  // 近隣地域（地域ページが存在するもののみ）
  const nearbyDistricts = config.nearbyDistrictSlugs
    .map((s) => yokohamaDistricts[s])
    .filter((d): d is NonNullable<typeof d> => Boolean(d))

  // 推奨商品
  const products = config.recommendedProductSlugs
    .map((s) => getProductBySlug(s))
    .filter((p): p is ProductItem => Boolean(p))

  // よくある症状
  const troubles = config.commonTroubles.filter((t) => troubleLabels[t])

  // 施工事例（同じ区の横浜市内事例）
  const districtCases = casesData
    .filter((c) => c.city === '横浜市' && c.wardSlug === config.wardSlug)
    .slice(0, 3)

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${districtTitle}の給湯器交換・販売`,
    description: config.metaDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: '株式会社宝宮設備',
      telephone: siteConfig.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '温水西1-4-39',
        addressLocality: '厚木市',
        addressRegion: '神奈川県',
        postalCode: '243-0039',
        addressCountry: 'JP',
      },
    },
    areaServed: { '@type': 'Place', name: `${config.name}（横浜市${config.wardName}）` },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'トップ', item: 'https://www.houmiya-boiler.com' },
      { '@type': 'ListItem', position: 2, name: '対応エリア', item: 'https://www.houmiya-boiler.com/area' },
      { '@type': 'ListItem', position: 3, name: '横浜市', item: 'https://www.houmiya-boiler.com/area/yokohama' },
      { '@type': 'ListItem', position: 4, name: `${config.name}周辺`, item: config.canonical },
    ],
  }

  const toc = [
    { id: 'dt-area', label: `${config.name}周辺の住宅事情・生活圏` },
    { id: 'dt-housing', label: '住宅タイプ別の交換ガイド' },
    { id: 'dt-installtype', label: `${config.name}周辺で多い設置タイプ` },
    { id: 'dt-capacity', label: '号数（16号・20号・24号）の選び方' },
    { id: 'dt-products', label: '対応メーカーとおすすめ機種' },
    { id: 'dt-troubles', label: 'よくある給湯器の症状' },
    { id: 'dt-photo', label: '写真見積もりの進め方' },
    { id: 'dt-cases', label: `横浜市${config.wardName}の施工事例` },
    { id: 'dt-faq', label: 'よくある質問' },
  ]

  const photoChecklist = [
    '給湯器本体の正面全体',
    '側面・背面の型番シール',
    '設置場所周辺の状況（配管など）',
    config.housingType === 'mansion' || config.housingType === 'mixed'
      ? 'マンションの場合はPS扉を開けた状態'
      : '屋外設置の場合は本体の周辺スペース',
    '追い焚き配管・給排気口の周辺',
    'エラー表示がある場合はリモコンの画面',
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main className="pt-[100px]">

        {/* Hero */}
        <section className="bg-brand-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <nav className="flex items-center gap-3 mb-4 text-sm flex-wrap" aria-label="パンくずリスト">
              <Link href="/" className="text-blue-200 hover:text-white">トップ</Link>
              <span className="text-blue-400">›</span>
              <Link href="/area" className="text-blue-200 hover:text-white">対応エリア</Link>
              <span className="text-blue-400">›</span>
              <Link href="/area/yokohama" className="text-blue-200 hover:text-white">横浜市</Link>
              <span className="text-blue-400">›</span>
              <Link href={`/area/yokohama/${config.wardSlug}`} className="text-blue-200 hover:text-white">
                {config.wardName}
              </Link>
              <span className="text-blue-400">›</span>
              <span>{config.name}周辺</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-black mb-3 leading-snug">
              {config.name}周辺の給湯器交換
            </h1>
            <p className="text-blue-100 text-sm mb-5 max-w-2xl leading-relaxed">
              {config.name}エリアの給湯器交換なら株式会社宝宮設備。横浜市{config.wardName}全域対応。
              マンションのPS設置型・戸建ての屋外型・エコジョーズに対応し、工事費込み価格で無料見積もり受付中。写真を送るだけで概算をご案内します。
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-base px-5 py-2.5 rounded-lg transition-colors"
              >
                {siteConfig.phone}
              </a>
              <Link
                href="/estimate"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black text-base px-5 py-2.5 rounded-lg transition-colors"
              >
                無料見積もりを依頼する
              </Link>
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white font-bold text-base px-5 py-2.5 rounded-lg transition-colors"
                style={{ backgroundColor: '#00B900' }}
              >
                LINEで写真を送って相談
              </a>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <section className="py-5 bg-gray-50 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <p className="text-xs font-black text-gray-700 mb-3 uppercase tracking-wider">目次</p>
              <ol className="space-y-1.5 list-decimal list-inside columns-2">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="text-xs text-brand-700 hover:underline">{t.label}</a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">
              {config.name}周辺での給湯器交換について
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-gray-700 text-sm leading-relaxed">{config.intro}</p>
            </div>
          </div>
        </section>

        {/* 住宅事情・生活圏 */}
        <section id="dt-area" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.name}周辺の住宅事情・生活圏</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-4">
              <h3 className="font-black text-gray-900 text-sm mb-2">給湯器交換の傾向</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{config.areaDesc}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-black text-gray-900 text-sm mb-2">{config.name}という街・生活圏</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{config.districtCharacter}</p>
            </div>
          </div>
        </section>

        {/* 住宅タイプ別ガイド */}
        <section id="dt-housing" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">{config.name}周辺の住宅タイプ別 交換ガイド</h2>
            <p className="text-gray-500 text-sm mb-5">
              住宅タイプによって設置タイプや確認事項が異なります。お住まいに合わせてご確認ください。
            </p>
            <div className="space-y-3">
              {config.mansionDesc && (
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="font-black text-brand-700 text-sm mb-2">マンション・集合住宅の場合</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{config.mansionDesc}</p>
                </div>
              )}
              {config.detachedDesc && (
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="font-black text-brand-700 text-sm mb-2">戸建ての場合</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{config.detachedDesc}</p>
                </div>
              )}
              {config.rentalDesc && (
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="font-black text-brand-700 text-sm mb-2">アパート・賃貸物件の場合</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{config.rentalDesc}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 設置タイプ */}
        <section id="dt-installtype" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.name}周辺で多い設置タイプ</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
              <p className="text-sm text-gray-700 leading-relaxed">{config.installTypeGuide}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {config.primaryInstallTypes.map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1.5 rounded-full border border-brand-100">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 号数の選び方 */}
        <section id="dt-capacity" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">給湯器 号数の選び方</h2>
            <p className="text-gray-500 text-sm mb-4">
              号数は1分間に作れるお湯の量の目安です。家族構成と使い方に合わせて選びましょう。
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200 mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-900 text-white">
                    <th className="px-4 py-3 text-left font-bold">号数</th>
                    <th className="px-4 py-3 text-left font-bold">家族構成の目安</th>
                    <th className="px-4 py-3 text-left font-bold">向いている使い方</th>
                  </tr>
                </thead>
                <tbody>
                  {capacityRows.map((row, i) => (
                    <tr key={row.go} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-bold text-gray-800">{row.go}</td>
                      <td className="px-4 py-3 text-gray-700">{row.family}</td>
                      <td className="px-4 py-3 text-gray-600">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-3">
              <h3 className="font-black text-gray-900 text-sm mb-2">{config.name}周辺での号数選びのポイント</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{config.capacityGuideText}</p>
            </div>
            <Link href="/guide/capacity" className="text-sm font-bold text-brand-700 hover:underline">
              号数の選び方 詳しく見る →
            </Link>
          </div>
        </section>

        {/* 対応メーカー + 商品カード */}
        <section id="dt-products" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">対応メーカーとおすすめ機種</h2>
            <p className="text-gray-500 text-sm mb-5">
              リンナイ・ノーリツ・パロマの主要3メーカーに対応。{config.name}周辺で多い住宅タイプに合わせたおすすめ機種です。価格は本体・リモコン・標準工事費を含む工事費込みです。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {products.map((p) => (
                <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col">
                  <div className="text-xs font-bold text-brand-700 mb-1">{p.makerLabel}・{p.capacity}号・{p.typeLabel}</div>
                  <div className="font-black text-gray-900 text-sm mb-1 leading-snug">{p.model}</div>
                  <div className="text-xs text-gray-500 mb-3 leading-relaxed flex-1">{p.installationLabel}</div>
                  <div className="mt-auto">
                    <div className="text-xs text-gray-400">工事費込み（税込）</div>
                    <div className="text-lg font-black text-brand-900 mb-2">{formatPrice(p.totalInTax)}円</div>
                    <Link href={p.detailUrl} className="text-xs font-bold text-brand-700 hover:underline">
                      この機種の詳細を見る →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/products" className="text-sm font-bold text-brand-700 hover:underline">
                すべての取扱商品を見る →
              </Link>
            </div>
          </div>
        </section>

        {/* よくある症状 */}
        <section id="dt-troubles" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">{config.name}周辺でよくある給湯器の症状</h2>
            <p className="text-gray-500 text-sm mb-5">
              次のような症状が出たら、修理・交換のサインかもしれません。各症状の原因と対処をまとめています。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {troubles.map((t) => (
                <Link
                  key={t}
                  href={`/area/yokohama/trouble/${t}`}
                  className="flex items-center justify-between gap-2 bg-white border border-gray-200 rounded-xl p-4 hover:border-brand-300 transition-colors"
                >
                  <span className="text-sm font-bold text-gray-800">横浜市で{troubleLabels[t]}</span>
                  <span className="text-brand-700 text-sm font-bold flex-shrink-0">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 中間CTA */}
        <section className="py-10 bg-brand-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-xl font-black mb-2">{config.name}周辺の給湯器交換はお任せください</h2>
            <p className="text-blue-200 text-sm mb-5">
              写真を送るだけで概算見積もりが可能です。電話・LINE・フォームからご相談ください。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/estimate"
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-base px-6 py-3 rounded-lg transition-colors w-full sm:w-auto justify-center"
              >
                無料見積もりを依頼する
              </Link>
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-black text-base px-6 py-3 rounded-lg transition-colors w-full sm:w-auto justify-center"
              >
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white font-bold text-base px-6 py-3 rounded-lg transition-colors w-full sm:w-auto justify-center"
                style={{ backgroundColor: '#00B900' }}
              >
                LINEで写真を送る
              </a>
            </div>
          </div>
        </section>

        {/* 写真見積もり */}
        <section id="dt-photo" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">
              {config.name}周辺での写真見積もりの進め方
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              以下の写真をLINEまたはフォームでお送りいただければ、現地に伺う前に概算見積もりをご案内します。
            </p>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <ul className="space-y-2">
                {photoChecklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs font-bold text-gray-500 mb-1">標準工事費（税抜）</div>
                <div className="text-2xl font-black text-brand-900">
                  {siteConfig.constructionFeeDisplay}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">撤去・取付・試運転・説明含む</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs font-bold text-gray-500 mb-1">見積もりは無料</div>
                <div className="text-sm font-bold text-brand-700">
                  写真確認または現地確認後に正式価格をご案内
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  追加費用が発生する場合は事前にご説明します
                </div>
              </div>
            </div>
            <div className="mt-4">
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-bold text-sm px-5 py-3 rounded-lg transition-colors"
                style={{ backgroundColor: '#00B900' }}
              >
                LINEで写真を送って相談する
              </a>
            </div>
          </div>
        </section>

        {/* 施工事例 */}
        {districtCases.length > 0 && (
          <section id="dt-cases" className="py-10 bg-gray-50 scroll-mt-28">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-xl font-black text-gray-900 mb-2">横浜市{config.wardName}の施工事例</h2>
              <p className="text-gray-500 text-sm mb-5">
                {config.name}を含む横浜市{config.wardName}での給湯器交換の施工事例です。
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {districtCases.map((c) => (
                  <div key={c.id} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col">
                    <div className="text-xs font-bold text-brand-700 mb-1">{c.area}・{c.buildingType}</div>
                    <div className="font-black text-gray-900 text-sm mb-1 leading-snug">{c.afterModel}</div>
                    <div className="text-xs text-gray-500 mb-2">{c.installationType}／{c.duration}</div>
                    <p className="text-xs text-gray-600 leading-relaxed">{c.comment}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/cases" className="text-sm font-bold text-brand-700 hover:underline">
                  施工事例をもっと見る →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section id="dt-faq" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">
              {config.name}周辺の給湯器交換 よくある質問
            </h2>
            <FaqAccordion faqs={config.faqs} />
          </div>
        </section>

        {/* 関連ページ */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-base font-black text-gray-900 mb-5">関連ページ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">最寄り駅・近隣エリア</p>
                <ul className="space-y-1.5">
                  {nearStations.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/area/yokohama/station/${s.slug}`}
                        className="text-xs text-brand-700 hover:underline font-semibold"
                      >
                        {s.name}駅周辺の給湯器交換 →
                      </Link>
                    </li>
                  ))}
                  {nearbyDistricts.map((d) => (
                    <li key={d.slug}>
                      <Link
                        href={`/area/yokohama/district/${d.slug}`}
                        className="text-xs text-brand-700 hover:underline font-semibold"
                      >
                        {d.name}周辺の給湯器交換 →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">横浜市{config.wardName}・トラブル症状</p>
                <ul className="space-y-1.5">
                  <li>
                    <Link href={`/area/yokohama/${config.wardSlug}`} className="text-xs text-brand-700 hover:underline font-semibold">
                      横浜市{config.wardName}の給湯器交換を見る →
                    </Link>
                  </li>
                  <li>
                    <Link href="/area/yokohama" className="text-xs text-brand-700 hover:underline font-semibold">
                      横浜市の給湯器交換（全18区対応）→
                    </Link>
                  </li>
                  {troubles.slice(0, 3).map((t) => (
                    <li key={t}>
                      <Link href={`/area/yokohama/trouble/${t}`} className="text-xs text-brand-700 hover:underline font-semibold">
                        横浜市で{troubleLabels[t]} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">基礎知識・給湯器情報</p>
                <ul className="space-y-1.5">
                  <li>
                    <Link href="/guide/eco-jaws" className="text-xs text-brand-700 hover:underline font-semibold">
                      エコジョーズとは →
                    </Link>
                  </li>
                  <li>
                    <Link href="/guide/capacity" className="text-xs text-brand-700 hover:underline font-semibold">
                      号数の選び方 →
                    </Link>
                  </li>
                  <li>
                    <Link href="/guide/installation-type" className="text-xs text-brand-700 hover:underline font-semibold">
                      設置タイプの選び方 →
                    </Link>
                  </li>
                  <li>
                    <Link href="/estimate" className="text-xs text-brand-700 hover:underline font-semibold">
                      無料見積もりを依頼する →
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 末尾CTA */}
        <section className="py-12 bg-brand-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-black mb-2">{config.name}周辺の給湯器交換はお任せください</h2>
            <p className="text-blue-200 text-sm mb-6">
              無料見積もり受付中。電話・LINE・フォームからご相談ください。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/estimate"
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-lg px-8 py-4 rounded-lg transition-colors w-full sm:w-auto justify-center"
              >
                無料見積もりを依頼する
              </Link>
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-black text-lg px-8 py-4 rounded-lg transition-colors w-full sm:w-auto justify-center"
              >
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white font-bold text-base px-6 py-3 rounded-lg transition-colors w-full sm:w-auto justify-center"
                style={{ backgroundColor: '#00B900' }}
              >
                LINEで写真を送る
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}
