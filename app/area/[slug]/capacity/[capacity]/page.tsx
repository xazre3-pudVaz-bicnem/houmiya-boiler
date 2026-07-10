import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import FaqAccordion from '@/components/FaqAccordion'
import { siteConfig } from '@/data/site'
import { productsData } from '@/data/products'
import { casesData } from '@/data/cases'
import {
  yokohamaCapacities,
  allYokohamaCapacities,
  yokohamaWardNames,
} from '@/data/yokohama-capacities'

type Props = { params: Promise<{ slug: string; capacity: string }> }

export async function generateStaticParams() {
  return allYokohamaCapacities.map((c) => ({ slug: 'yokohama', capacity: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { capacity } = await params
  const config = yokohamaCapacities[capacity]
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

const CITY_NAME = '横浜市'
const CITY_SLUG = 'yokohama'

// 16/20/24号 比較表データ
const comparisonRows = [
  { label: '目安の世帯', '16': '単身〜2人', '20': '2〜3人', '24': '4人以上' },
  { label: '同時使用', '16': '苦手', '20': '順番ならOK', '24': '得意' },
  { label: '冬場の湯量', '16': 'やや不足しやすい', '20': '標準', '24': '余裕あり' },
  { label: '本体サイズ', '16': 'コンパクト', '20': '標準', '24': 'やや大きい' },
  { label: '主な設置', '16': '単身マンション', '20': 'ファミリーマンション', '24': '戸建て' },
]

export default async function YokohamaCapacityPage({ params }: Props) {
  const { slug, capacity } = await params
  if (slug !== CITY_SLUG) notFound()
  const config = yokohamaCapacities[capacity]
  if (!config) notFound()

  const recommendedProducts = productsData.filter((p) =>
    config.recommendedProductSlugs.includes(p.slug),
  )
  const targetCases = casesData
    .filter((c) => c.areaSlug === 'yokohama' && c.capacity === config.capacityNum)
    .slice(0, 3)
  const fallbackCases = casesData.filter((c) => c.areaSlug === 'yokohama').slice(0, 3)
  const displayCases = targetCases.length > 0 ? targetCases : fallbackCases

  const toc = [
    { id: 'cap-overview', label: `${config.capacityLabel}とは` },
    { id: 'cap-suitable', label: '向いているご家庭' },
    { id: 'cap-notsuitable', label: '向いていないケース' },
    { id: 'cap-house', label: '住宅タイプ別の選び方' },
    { id: 'cap-winter', label: '冬場・同時使用の注意' },
    { id: 'cap-compare', label: '16/20/24号 比較表' },
    { id: 'cap-usecases', label: `${CITY_NAME}での利用シーン` },
    { id: 'cap-change', label: '号数変更時の注意' },
    { id: 'cap-products', label: '推奨商品' },
    { id: 'cap-cases', label: '施工事例' },
    { id: 'cap-faq', label: 'よくある質問' },
  ]

  const otherCapacities = Object.values(yokohamaCapacities).filter((c) => c.slug !== config.slug)

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
      { '@type': 'ListItem', position: 3, name: CITY_NAME, item: `https://www.houmiya-boiler.com/area/${CITY_SLUG}` },
      { '@type': 'ListItem', position: 4, name: config.pageTitle, item: config.canonical },
    ],
  }
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: config.pageTitle,
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
    areaServed: { '@type': 'City', name: CITY_NAME },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <Header />
      <main className="pt-[100px]">

        {/* Hero / パンくず */}
        <section className="bg-brand-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <nav className="flex items-center gap-3 mb-4 text-sm flex-wrap" aria-label="パンくずリスト">
              <Link href="/" className="text-blue-200 hover:text-white">トップ</Link>
              <span className="text-blue-400">›</span>
              <Link href="/area" className="text-blue-200 hover:text-white">対応エリア</Link>
              <span className="text-blue-400">›</span>
              <Link href={`/area/${CITY_SLUG}`} className="text-blue-200 hover:text-white">{CITY_NAME}</Link>
              <span className="text-blue-400">›</span>
              <span>{config.capacityLabel}</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-black mb-3 leading-snug">
              {CITY_NAME}の{config.capacityLabel}給湯器交換
            </h1>
            <p className="text-blue-100 text-sm mb-5 leading-relaxed max-w-3xl">
              横浜市全18区対応。{config.capacityLabel}給湯器の特徴・選び方から交換まで。工事費込みの明朗価格で、写真を送るだけの無料見積もりを受け付けています。
            </p>
            <CtaButtons />
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

        {/* H1 + 概要 */}
        <section id="cap-overview" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.capacityLabel}給湯器とは</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-gray-700 text-sm leading-relaxed">{config.capacityOverview}</p>
            </div>
          </div>
        </section>

        {/* 向いているご家庭 */}
        <section id="cap-suitable" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-5">{config.capacityLabel}が向いているご家庭</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {config.suitableFor.map((s, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-5">
                  <h3 className="font-black text-gray-900 mb-2 text-base">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 向いていないケース */}
        <section id="cap-notsuitable" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.capacityLabel}が向いていないケース</h2>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <ul className="space-y-2">
                {config.notSuitableFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                    <svg className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 住宅タイプ別の選び方 */}
        <section id="cap-house" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-5">住宅タイプ別の{config.capacityLabel}の選び方</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-black text-gray-900 mb-2 text-base">マンションでの選び方</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{config.mansionNote}</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-black text-gray-900 mb-2 text-base">戸建てでの選び方</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{config.detachedNote}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 冬場・同時使用の注意 */}
        <section id="cap-winter" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-5">冬場・同時使用の注意点</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2 text-sm">冬場の湯量について</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{config.winterNote}</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2 text-sm">同時使用について</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{config.simultaneousUseNote}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 比較表 */}
        <section id="cap-compare" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">16号・20号・24号の比較表</h2>
            <p className="text-gray-500 text-sm mb-5">
              現在お使いの{config.capacityLabel}を基準に、他の号数との違いをご確認ください。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left font-black text-gray-700 border-b border-gray-200"></th>
                    <th className={`p-3 text-center font-black border-b border-gray-200 ${config.slug === '16' ? 'bg-brand-700 text-white' : 'text-gray-700'}`}>16号</th>
                    <th className={`p-3 text-center font-black border-b border-gray-200 ${config.slug === '20' ? 'bg-brand-700 text-white' : 'text-gray-700'}`}>20号</th>
                    <th className={`p-3 text-center font-black border-b border-gray-200 ${config.slug === '24' ? 'bg-brand-700 text-white' : 'text-gray-700'}`}>24号</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 font-bold text-gray-700 border-b border-gray-100">{row.label}</td>
                      <td className={`p-3 text-center text-gray-700 border-b border-gray-100 ${config.slug === '16' ? 'bg-blue-50 font-bold' : ''}`}>{row['16']}</td>
                      <td className={`p-3 text-center text-gray-700 border-b border-gray-100 ${config.slug === '20' ? 'bg-blue-50 font-bold' : ''}`}>{row['20']}</td>
                      <td className={`p-3 text-center text-gray-700 border-b border-gray-100 ${config.slug === '24' ? 'bg-blue-50 font-bold' : ''}`}>{row['24']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              号数は1分間に作れるお湯の量（水温＋25℃時）の目安です。数字が大きいほど一度に多くのお湯を使えます。
            </p>
          </div>
        </section>

        {/* 横浜市での利用シーン */}
        <section id="cap-usecases" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{CITY_NAME}での{config.capacityLabel}の利用シーン</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">{config.yokohamaUseCases}</p>
            </div>
          </div>
        </section>

        {/* 中間CTA */}
        <MidEstimateCta heading={`${CITY_NAME}の${config.capacityLabel}給湯器交換はお任せください`} />

        {/* 号数変更時の注意 */}
        <section id="cap-change" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-5">号数変更（アップ・ダウン）時の注意</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2 text-sm">号数アップ時の注意</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{config.upgradeNote}</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2 text-sm">号数ダウン時の注意</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{config.downgradeNote}</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">{config.changeNote}</p>
            </div>
          </div>
        </section>

        {/* 推奨商品 */}
        {recommendedProducts.length > 0 && (
          <section id="cap-products" className="py-10 bg-white scroll-mt-28">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-xl font-black text-gray-900 mb-2">{CITY_NAME}でおすすめの{config.capacityLabel}給湯器</h2>
              <p className="text-gray-500 text-sm mb-5">
                価格は工事費込み（税込）の目安です。設置状況により変動する場合があります。
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {recommendedProducts.map((product) => (
                  <Link href={`/products/${product.slug}`} key={product.slug}>
                    <div className="border border-gray-200 rounded-xl p-4 hover:border-brand-400 transition-colors h-full">
                      <p className="text-xs text-gray-500 mb-1">{product.makerLabel} / {product.capacity}号 / {product.typeLabel}</p>
                      <p className="font-bold text-sm text-gray-900 mb-2">{product.model}</p>
                      <p className="text-brand-700 font-black text-lg">{product.totalInTax.toLocaleString()}円</p>
                      <p className="text-xs text-gray-400">工事費込み・税込</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-5 text-center">
                <Link href="/products" className="text-sm font-bold text-brand-700 hover:underline">
                  すべての商品を見る →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* 施工事例 */}
        {displayCases.length > 0 && (
          <section id="cap-cases" className="py-10 bg-gray-50 scroll-mt-28">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-xl font-black text-gray-900 mb-5">{CITY_NAME}の施工事例</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {displayCases.map((c) => (
                  <Link href={`/cases/${c.slug}`} key={c.id}>
                    <div className="border border-gray-200 rounded-xl p-4 bg-white hover:border-brand-400 transition-colors h-full">
                      <p className="text-xs text-gray-500">{c.area}</p>
                      <p className="font-bold text-sm text-gray-900 mb-1">{c.buildingType}</p>
                      <p className="text-xs text-gray-600">{c.maker} / {c.capacity}号 / {c.duration}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-5 text-center">
                <Link href="/cases" className="text-sm font-bold text-brand-700 hover:underline">
                  施工事例をもっと見る →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section id="cap-faq" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">
              {CITY_NAME}の{config.capacityLabel}給湯器交換 よくある質問
            </h2>
            <FaqAccordion faqs={config.faqs} />
          </div>
        </section>

        {/* 関連内部リンク */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-black text-gray-500 mb-3">{config.capacityLabel}の需要が多い横浜市エリア</p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/area/${CITY_SLUG}`}
                    className="text-xs font-bold text-brand-700 bg-white border border-blue-200 rounded-lg px-3 py-2 hover:bg-blue-50 transition-colors"
                  >
                    {CITY_NAME}の対応エリアを見る
                  </Link>
                  {config.relatedWardSlugs.map((w) => (
                    <Link
                      key={w}
                      href={`/area/${CITY_SLUG}/${w}`}
                      className="text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-blue-50 transition-colors"
                    >
                      {yokohamaWardNames[w] ?? w}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-black text-gray-500 mb-3">他の号数・基礎知識</p>
                <div className="flex flex-wrap gap-2">
                  {otherCapacities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/area/${CITY_SLUG}/capacity/${c.slug}`}
                      className="text-xs font-bold text-brand-700 bg-white border border-blue-200 rounded-lg px-3 py-2 hover:bg-blue-50 transition-colors"
                    >
                      横浜市の{c.capacityLabel}
                    </Link>
                  ))}
                  {[
                    { href: '/guide/capacity', label: '号数の選び方' },
                    { href: '/guide/eco-jaws', label: 'エコジョーズとは' },
                    { href: '/guide/lifespan', label: '給湯器の寿命' },
                    { href: '/cases', label: '施工事例' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-blue-50 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 末尾CTA */}
        <section className="py-12 bg-brand-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-black mb-2">{CITY_NAME}の{config.capacityLabel}給湯器交換はお任せください</h2>
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

function CtaButtons() {
  return (
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
  )
}

function MidEstimateCta({ heading }: { heading: string }) {
  return (
    <section className="py-10 bg-brand-900 text-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-xl font-black mb-2">{heading}</h2>
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
  )
}
