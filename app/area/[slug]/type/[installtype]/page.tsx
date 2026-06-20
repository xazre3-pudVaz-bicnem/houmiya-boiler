import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import FaqAccordion from '@/components/FaqAccordion'
import { siteConfig } from '@/data/site'
import {
  yokohamaTypes,
  allYokohamaTypes,
  yokohamaTypeWardNames,
} from '@/data/yokohama-types'

type Props = { params: Promise<{ slug: string; installtype: string }> }

export async function generateStaticParams() {
  return allYokohamaTypes.map((t) => ({ slug: 'yokohama', installtype: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { installtype } = await params
  const config = yokohamaTypes[installtype]
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

const toc = [
  { id: 'type-whatis', label: 'この設置タイプとは' },
  { id: 'type-yokohama', label: '横浜市での状況' },
  { id: 'type-exchange', label: '交換時の注意点' },
  { id: 'type-confirm', label: '交換前に確認すること' },
  { id: 'type-cost', label: '追加費用が発生するケース' },
  { id: 'type-workflow', label: '施工の流れ' },
  { id: 'type-faq', label: 'よくある質問' },
]

export default async function YokohamaTypePage({ params }: Props) {
  const { slug, installtype } = await params
  const config = yokohamaTypes[installtype]
  if (!config || slug !== 'yokohama') notFound()

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'トップ', item: 'https://www.houmiya-boiler.com' },
      { '@type': 'ListItem', position: 2, name: '対応エリア', item: 'https://www.houmiya-boiler.com/area' },
      { '@type': 'ListItem', position: 3, name: '横浜市', item: 'https://www.houmiya-boiler.com/area/yokohama' },
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
    areaServed: { '@type': 'City', name: '横浜市' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
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
              <span>{config.title}</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-black mb-4 leading-snug">{config.pageTitle}</h1>
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

        {/* この設置タイプとは */}
        <section id="type-whatis" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.title}について</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-gray-700 text-sm leading-relaxed">{config.whatIs}</p>
            </div>
          </div>
        </section>

        {/* 横浜市での状況 */}
        <section id="type-yokohama" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">横浜市でのこの設置タイプの状況</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">{config.yokohamaContext}</p>
            </div>
          </div>
        </section>

        {/* 交換時の注意点 */}
        <section id="type-exchange" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-5">交換時の注意点</h2>
            <div className="space-y-3">
              {config.exchangeNotes.map((c, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="font-black text-gray-900 text-sm mb-2 flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-brand-700 text-white text-xs font-black flex items-center justify-center rounded-full mt-0.5">
                      {i + 1}
                    </span>
                    {c.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed pl-7">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 交換前に確認すること */}
        <section id="type-confirm" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-5">交換前に確認すること</h2>
            <div className="space-y-3">
              {config.confirmBeforeExchange.map((c, i) => (
                <div key={i} className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 text-sm mb-1.5 flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {c.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed pl-6">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 中間CTA */}
        <section className="py-10 bg-brand-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-xl font-black mb-2">横浜市の{config.title}はお任せください</h2>
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

        {/* 追加費用が発生するケース */}
        <section id="type-cost" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">追加費用が発生するケース</h2>
            <p className="text-gray-500 text-sm mb-4">
              追加費用が見込まれる場合は、工事前に必ずご説明します。事前説明なく請求することはありません。
            </p>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <ul className="space-y-2.5">
                {config.additionalCostCases.map((item, i) => (
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

        {/* 施工の流れ */}
        <section id="type-workflow" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-5">施工の流れ</h2>
            <ol className="space-y-3">
              {config.workflowSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <span className="flex-shrink-0 w-7 h-7 bg-brand-700 text-white text-sm font-black flex items-center justify-center rounded-full">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-700 leading-relaxed pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section id="type-faq" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">よくある質問</h2>
            <FaqAccordion faqs={config.faqs} />
          </div>
        </section>

        {/* 関連ページ */}
        <section className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-base font-black text-gray-900 mb-5">関連ページ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">横浜市の区別ページ</p>
                <ul className="space-y-1.5">
                  {config.relatedWardSlugs.map((wardSlug) => (
                    <li key={wardSlug}>
                      <Link href={`/area/yokohama/${wardSlug}`} className="text-xs text-brand-700 hover:underline font-semibold">
                        横浜市{yokohamaTypeWardNames[wardSlug] ?? wardSlug}の給湯器交換 →
                      </Link>
                    </li>
                  ))}
                  <li><Link href="/area/yokohama" className="text-xs text-brand-700 hover:underline font-semibold">横浜市全18区の対応エリア →</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">横浜市のトラブル症状</p>
                <ul className="space-y-1.5">
                  <li><Link href="/area/yokohama/trouble/no-hot-water" className="text-xs text-brand-700 hover:underline font-semibold">横浜市でお湯が出ない →</Link></li>
                  <li><Link href="/area/yokohama/trouble/error-111" className="text-xs text-brand-700 hover:underline font-semibold">横浜市でエラー111 →</Link></li>
                  <li><Link href="/area/yokohama/trouble/water-leak" className="text-xs text-brand-700 hover:underline font-semibold">横浜市で水漏れ →</Link></li>
                  <li><Link href="/trouble" className="text-xs text-brand-700 hover:underline font-semibold">トラブル症状一覧 →</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">給湯器の基礎知識・交換</p>
                <ul className="space-y-1.5">
                  <li><Link href="/guide/eco-jaws" className="text-xs text-brand-700 hover:underline font-semibold">エコジョーズとは →</Link></li>
                  <li><Link href="/guide/lifespan" className="text-xs text-brand-700 hover:underline font-semibold">給湯器の寿命 →</Link></li>
                  <li><Link href="/guide/capacity" className="text-xs text-brand-700 hover:underline font-semibold">号数の選び方 →</Link></li>
                  <li><Link href="/estimate" className="text-xs text-brand-700 hover:underline font-semibold">無料見積もりを依頼する →</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 末尾CTA */}
        <section className="py-12 bg-brand-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-black mb-2">横浜市の給湯器交換はお任せください</h2>
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
