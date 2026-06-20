import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import FaqAccordion from '@/components/FaqAccordion'
import { siteConfig } from '@/data/site'
import {
  yokohamaTroubles,
  allYokohamaTroubles,
  yokohamaWardNames,
} from '@/data/yokohama-troubles'

type Props = { params: Promise<{ slug: string; symptom: string }> }

export async function generateStaticParams() {
  return allYokohamaTroubles.map((t) => ({ slug: 'yokohama', symptom: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { symptom } = await params
  const config = yokohamaTroubles[symptom]
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
  { id: 'symptom-overview', label: '症状の概要' },
  { id: 'symptom-yokohama', label: '横浜市特有の状況' },
  { id: 'symptom-causes', label: '主な原因・診断' },
  { id: 'symptom-check', label: 'まず確認するセルフチェック' },
  { id: 'symptom-judge', label: '修理と交換の判断基準' },
  { id: 'symptom-cost', label: '交換費用について' },
  { id: 'symptom-work', label: '工事のポイント' },
  { id: 'symptom-faq', label: 'よくある質問' },
]

export default async function YokohamaTroublePage({ params }: Props) {
  const { slug, symptom } = await params
  const config = yokohamaTroubles[symptom]
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

        {/* 安全警告 */}
        {config.isSafetyRisk && config.safetyNote && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-4xl mx-auto mt-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="font-bold text-red-700 text-sm leading-relaxed">{config.safetyNote}</p>
            </div>
          </div>
        )}

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

        {/* 症状の概要 */}
        <section id="symptom-overview" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">
              横浜市で「{config.title.replace('横浜市で', '').replace('横浜市', '')}」が起きたら
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{config.symptomOverview}</p>
            </div>
          </div>
        </section>

        {/* 横浜市特有の状況 */}
        <section id="symptom-yokohama" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">横浜市の住宅環境とこの症状の関係</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">{config.yokohamaContext}</p>
            </div>
          </div>
        </section>

        {/* 原因・診断 */}
        <section id="symptom-causes" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">主な原因と診断のポイント</h2>
            <p className="text-gray-500 text-sm mb-5">考えられる主な原因を挙げます。原因によって修理・交換の判断が変わります。</p>
            <div className="space-y-3">
              {config.causes.map((c, i) => (
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

        {/* セルフチェック */}
        <section id="symptom-check" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">業者に連絡する前のセルフチェック</h2>
            <p className="text-gray-500 text-sm mb-5">まずはご自身で確認できる項目です。これで解決する場合もあります。</p>
            <div className="space-y-3">
              {config.checkFirst.map((c, i) => (
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

        {/* 修理 vs 交換 */}
        <section id="symptom-judge" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-5">修理で済むケースと交換を検討すべきケース</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white border border-green-200 rounded-xl p-6">
                <h3 className="font-black text-green-700 text-base mb-3">修理で済む可能性があるケース</h3>
                <ul className="space-y-2">
                  {config.repairVsReplace.repairOk.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-orange-200 rounded-xl p-6">
                <h3 className="font-black text-orange-700 text-base mb-3">交換を検討した方がよいケース</h3>
                <ul className="space-y-2">
                  {config.repairVsReplace.replaceRecommended.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                      <svg className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 中間CTA */}
        <section className="py-10 bg-brand-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-xl font-black mb-2">横浜市の給湯器トラブルはお任せください</h2>
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

        {/* 費用について */}
        <section id="symptom-cost" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">交換費用について</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">{config.costNote}</p>
            </div>
          </div>
        </section>

        {/* 工事のポイント */}
        <section id="symptom-work" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">交換工事のポイント</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <ul className="space-y-2.5">
                {config.workPoints.map((item, i) => (
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

        {/* FAQ */}
        <section id="symptom-faq" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">よくある質問</h2>
            <FaqAccordion faqs={config.faqs} />
          </div>
        </section>

        {/* 関連ページ */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-base font-black text-gray-900 mb-5">関連ページ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">横浜市の区別ページ</p>
                <ul className="space-y-1.5">
                  {config.relatedWardSlugs.map((wardSlug) => (
                    <li key={wardSlug}>
                      <Link href={`/area/yokohama/${wardSlug}`} className="text-xs text-brand-700 hover:underline font-semibold">
                        横浜市{yokohamaWardNames[wardSlug] ?? wardSlug}の給湯器交換 →
                      </Link>
                    </li>
                  ))}
                  <li><Link href="/area/yokohama" className="text-xs text-brand-700 hover:underline font-semibold">横浜市全18区の対応エリア →</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">その他のトラブル症状</p>
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
