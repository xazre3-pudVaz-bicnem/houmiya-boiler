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
  yokohamaMakers,
  allYokohamaMakers,
  yokohamaWardNames,
} from '@/data/yokohama-makers'

type Props = { params: Promise<{ slug: string; maker: string }> }

export async function generateStaticParams() {
  return allYokohamaMakers.map((m) => ({ slug: 'yokohama', maker: m.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { maker } = await params
  const config = yokohamaMakers[maker]
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

export default async function YokohamaMakerPage({ params }: Props) {
  const { slug, maker } = await params
  if (slug !== CITY_SLUG) notFound()
  const config = yokohamaMakers[maker]
  if (!config) notFound()

  const recommendedProducts = productsData.filter((p) =>
    config.recommendedProductSlugs.includes(p.slug),
  )
  const targetCases = casesData
    .filter((c) => c.areaSlug === 'yokohama' && c.maker === config.makerName)
    .slice(0, 3)
  const fallbackCases = casesData.filter((c) => c.areaSlug === 'yokohama').slice(0, 3)
  const displayCases = targetCases.length > 0 ? targetCases : fallbackCases

  const toc = [
    { id: 'maker-overview', label: `${config.makerName}とは（横浜市での実績）` },
    { id: 'maker-strength', label: `${config.makerName}の強み` },
    { id: 'maker-suitable', label: 'どんな方に向いているか' },
    { id: 'maker-capacity', label: '号数別ラインナップ' },
    { id: 'maker-eco', label: 'エコジョーズ製品' },
    { id: 'maker-mansion', label: 'マンション向け商品' },
    { id: 'maker-change', label: '他メーカーからの乗り換え' },
    { id: 'maker-products', label: '推奨商品' },
    { id: 'maker-series', label: '人気シリーズの特徴' },
    { id: 'maker-notes', label: '交換・修理の注意点' },
    { id: 'maker-remote', label: 'リモコンの互換性' },
    { id: 'maker-warranty', label: '保証について' },
    { id: 'maker-cases', label: '施工事例' },
    { id: 'maker-faq', label: 'よくある質問' },
  ]

  const otherMakers = Object.values(yokohamaMakers).filter((m) => m.slug !== config.slug)

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
              <span>{config.makerName}</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-black mb-3 leading-snug">
              {CITY_NAME}の{config.makerName}製給湯器交換
            </h1>
            <p className="text-blue-100 text-sm mb-5 leading-relaxed max-w-3xl">
              横浜市全18区対応。{config.makerName}（{config.makerNameEn}）製給湯器の交換・販売・撤去・処分まで一貫対応。工事費込みの明朗価格で、写真を送るだけの無料見積もりを受け付けています。
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
        <section id="maker-overview" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">
              {config.makerName}（{config.makerNameEn}）とは｜{CITY_NAME}での実績
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-gray-700 text-sm leading-relaxed">{config.makerOverview}</p>
            </div>
          </div>
        </section>

        {/* 強み */}
        <section id="maker-strength" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-5">{config.makerName}の強み</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {config.strengthPoints.map((s, i) => (
                <div key={i} className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-brand-700 text-white text-xs font-black flex items-center justify-center rounded-full mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* どんな方に向いているか */}
        <section id="maker-suitable" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.makerName}はどんな方に向いているか</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">{config.suitableFor}</p>
            </div>
          </div>
        </section>

        {/* 号数別ラインナップ */}
        <section id="maker-capacity" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-5">{config.makerName}の号数別ラインナップ</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-black text-brand-700 mb-2 text-base">16号</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{config.capacity16Desc}</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-black text-brand-700 mb-2 text-base">20号</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{config.capacity20Desc}</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-black text-brand-700 mb-2 text-base">24号</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{config.capacity24Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* エコジョーズ製品 */}
        <section id="maker-eco" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.makerName}のエコジョーズ製品</h2>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">{config.ecoJawsDesc}</p>
            </div>
          </div>
        </section>

        {/* マンション向け商品 */}
        <section id="maker-mansion" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.makerName}のマンション向け商品</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">{config.mansionProductDesc}</p>
            </div>
          </div>
        </section>

        {/* 他メーカーからの乗り換え */}
        <section id="maker-change" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">他メーカーからの乗り換え時の注意点</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">{config.changeFromOtherMakerNote}</p>
            </div>
          </div>
        </section>

        {/* 推奨商品 */}
        {recommendedProducts.length > 0 && (
          <section id="maker-products" className="py-10 bg-white scroll-mt-28">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-xl font-black text-gray-900 mb-2">{CITY_NAME}でおすすめの{config.makerName}製給湯器</h2>
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

        {/* 人気シリーズ */}
        <section id="maker-series" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">{config.makerName}の人気シリーズの特徴</h2>
            <p className="text-gray-500 text-sm mb-5">
              ご家庭の使い方や設置環境に合わせて、最適なシリーズをご提案します。
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {config.popularSeries.map((s, i) => (
                <div key={i} className="border border-gray-200 bg-white rounded-xl p-5">
                  <h3 className="font-black text-gray-900 mb-2 text-base">{s.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 中間CTA */}
        <MidEstimateCta heading={`${CITY_NAME}の${config.makerName}製給湯器交換はお任せください`} />

        {/* 交換・修理の注意点 */}
        <section id="maker-notes" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-5">{config.makerName}の交換・修理の注意点</h2>
            <div className="space-y-4">
              {config.makerNotes.map((n, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
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

        {/* リモコン互換性 */}
        <section id="maker-remote" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.makerName}のリモコンの互換性について</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">{config.remoteNote}</p>
            </div>
          </div>
        </section>

        {/* 保証 */}
        <section id="maker-warranty" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.makerName}の保証について</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">{config.warrantyNote}</p>
            </div>
          </div>
        </section>

        {/* 施工事例 */}
        {displayCases.length > 0 && (
          <section id="maker-cases" className="py-10 bg-white scroll-mt-28">
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
        <section id="maker-faq" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">
              {CITY_NAME}の{config.makerName}製給湯器 よくある質問
            </h2>
            <FaqAccordion faqs={config.faqs} />
          </div>
        </section>

        {/* 関連内部リンク */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-black text-gray-500 mb-3">{config.makerName}対応の主な横浜市エリア</p>
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
                <p className="text-sm font-black text-gray-500 mb-3">他メーカー・基礎知識</p>
                <div className="flex flex-wrap gap-2">
                  {otherMakers.map((m) => (
                    <Link
                      key={m.slug}
                      href={`/area/${CITY_SLUG}/maker/${m.slug}`}
                      className="text-xs font-bold text-brand-700 bg-white border border-blue-200 rounded-lg px-3 py-2 hover:bg-blue-50 transition-colors"
                    >
                      横浜市の{m.makerName}
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
            <h2 className="text-2xl font-black mb-2">{CITY_NAME}の{config.makerName}製給湯器交換はお任せください</h2>
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
