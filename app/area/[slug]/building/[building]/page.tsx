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
  yokohamaBuildings,
  allYokohamaBuildings,
  yokohamaWardNames,
} from '@/data/yokohama-buildings'

type Props = { params: Promise<{ slug: string; building: string }> }

export async function generateStaticParams() {
  return allYokohamaBuildings.map((b) => ({ slug: 'yokohama', building: b.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { building } = await params
  const config = yokohamaBuildings[building]
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

// 設置タイプページへのクロスリンク
const installTypeLinks = [
  { href: `/area/${CITY_SLUG}/type/mansion-ps`, label: '横浜市のマンションPS設置型' },
  { href: `/area/${CITY_SLUG}/type/wall-mounted`, label: '横浜市の壁掛け型交換' },
  { href: `/area/${CITY_SLUG}/type/eco-jaws`, label: '横浜市のエコジョーズ交換' },
]

export default async function YokohamaBuildingPage({ params }: Props) {
  const { slug, building } = await params
  if (slug !== CITY_SLUG) notFound()
  const config = yokohamaBuildings[building]
  if (!config) notFound()

  const recommendedProducts = productsData.filter((p) =>
    config.recommendedProductSlugs.includes(p.slug),
  )
  const displayCases = casesData.filter((c) => c.areaSlug === 'yokohama').slice(0, 3)

  const toc = [
    { id: 'bld-overview', label: `${config.buildingType}の給湯器交換とは` },
    { id: 'bld-context', label: `${CITY_NAME}での特徴` },
    { id: 'bld-target', label: '対象ユーザー' },
    { id: 'bld-notes', label: '交換時の注意点' },
    { id: 'bld-documents', label: '必要な書類・確認事項' },
    { id: 'bld-photo', label: '写真見積もりで重要な箇所' },
    { id: 'bld-installtypes', label: 'よくある設置タイプ' },
    { id: 'bld-products', label: '推奨商品' },
    { id: 'bld-workflow', label: '工事の特記事項' },
    { id: 'bld-cost', label: '費用について' },
    { id: 'bld-precheck', label: '工事前確認事項' },
    { id: 'bld-cases', label: '施工事例' },
    { id: 'bld-faq', label: 'よくある質問' },
  ]

  const otherBuildings = Object.values(yokohamaBuildings).filter((b) => b.slug !== config.slug)

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
        postalCode: '243-0032',
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
              <span>{config.buildingType}</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-black mb-3 leading-snug">
              {CITY_NAME}の{config.buildingType}の給湯器交換
            </h1>
            <p className="text-blue-100 text-sm mb-5 leading-relaxed max-w-3xl">
              横浜市全18区対応。{config.buildingType}ならではの注意点を踏まえて対応します。工事費込みの明朗価格で、写真を送るだけの無料見積もりを受け付けています。
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
        <section id="bld-overview" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.buildingType}の給湯器交換について</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-gray-700 text-sm leading-relaxed">{config.buildingOverview}</p>
            </div>
          </div>
        </section>

        {/* 横浜市での特徴 */}
        <section id="bld-context" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{CITY_NAME}の{config.buildingType}の特徴</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">{config.yokohamaContext}</p>
            </div>
          </div>
        </section>

        {/* 対象ユーザー */}
        <section id="bld-target" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-5">こんな方におすすめ</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {config.targetUsers.map((u, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm text-gray-700 leading-relaxed">{u}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 交換時の注意点 */}
        <section id="bld-notes" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-5">{config.buildingType}の交換時の注意点</h2>
            <div className="space-y-4">
              {config.buildingNotes.map((n, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <h3 className="font-black text-gray-900 mb-2 text-base flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-700 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {n.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{n.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 必要な書類・確認事項 */}
        <section id="bld-documents" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">工事に必要な書類・確認事項</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <ul className="space-y-2.5">
                {config.documentsNeeded.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                    <span className="flex-shrink-0 w-5 h-5 bg-brand-700 text-white text-xs font-black flex items-center justify-center rounded-full mt-0.5">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 写真見積もりで重要な箇所 */}
        <section id="bld-photo" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">写真見積もりで特に重要な箇所</h2>
            <p className="text-gray-500 text-sm mb-4">
              下記の写真をLINEまたはフォームでお送りいただければ、現地調査なしで概算見積もりをご案内できます。
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <ul className="space-y-2.5">
                {config.photoPoints.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                    <span className="flex-shrink-0 w-5 h-5 bg-yellow-400 text-gray-900 text-xs font-black flex items-center justify-center rounded-full mt-0.5">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* よくある設置タイプ */}
        <section id="bld-installtypes" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.buildingType}でよくある設置タイプ</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
              <ul className="space-y-2">
                {config.commonInstallTypes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              {installTypeLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-bold text-brand-700 bg-white border border-blue-200 rounded-lg px-3 py-2 hover:bg-blue-50 transition-colors"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 推奨商品 */}
        {recommendedProducts.length > 0 && (
          <section id="bld-products" className="py-10 bg-white scroll-mt-28">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-xl font-black text-gray-900 mb-2">{config.buildingType}でおすすめの給湯器</h2>
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

        {/* 中間CTA */}
        <MidEstimateCta heading={`${CITY_NAME}の${config.buildingType}の給湯器交換はお任せください`} />

        {/* 工事の特記事項 */}
        <section id="bld-workflow" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.buildingType}での工事の特記事項</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">{config.workflowNote}</p>
            </div>
          </div>
        </section>

        {/* 費用について */}
        <section id="bld-cost" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">費用について</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">{config.costNote}</p>
            </div>
          </div>
        </section>

        {/* 工事前確認事項 */}
        <section id="bld-precheck" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.buildingType}の工事前確認事項</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <ul className="space-y-2">
                {config.preCheckItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 施工事例 */}
        {displayCases.length > 0 && (
          <section id="bld-cases" className="py-10 bg-white scroll-mt-28">
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
        <section id="bld-faq" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">
              {CITY_NAME}の{config.buildingType}の給湯器交換 よくある質問
            </h2>
            <FaqAccordion faqs={config.faqs} />
          </div>
        </section>

        {/* 関連内部リンク */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-black text-gray-500 mb-3">対応の多い横浜市エリア</p>
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
                <p className="text-sm font-black text-gray-500 mb-3">設置タイプ別・他の建物タイプ</p>
                <div className="flex flex-wrap gap-2">
                  {installTypeLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-xs font-bold text-brand-700 bg-white border border-blue-200 rounded-lg px-3 py-2 hover:bg-blue-50 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  {otherBuildings.map((b) => (
                    <Link
                      key={b.slug}
                      href={`/area/${CITY_SLUG}/building/${b.slug}`}
                      className="text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-blue-50 transition-colors"
                    >
                      {b.buildingType}
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
            <h2 className="text-2xl font-black mb-2">{CITY_NAME}の{config.buildingType}の給湯器交換はお任せください</h2>
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
