import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import FaqAccordion from '@/components/FaqAccordion'
import { guidesData, getGuideBySlug } from '@/data/guides'
import { siteConfig } from '@/data/site'

const BASE_URL = 'https://www.houmiya-boiler.com'

export async function generateStaticParams() {
  return guidesData.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) return {}
  const title = `${guide.title}｜宝宮設備`
  return {
    title,
    description: guide.description,
    alternates: { canonical: `${BASE_URL}/guide/${guide.slug}` },
    openGraph: { title, description: guide.description, locale: 'ja_JP', type: 'article' },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) notFound()

  const shortTitle = guide.title.split('｜')[0]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'トップ', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: '給湯器の基礎知識', item: `${BASE_URL}/guide` },
      { '@type': 'ListItem', position: 3, name: shortTitle, item: `${BASE_URL}/guide/${guide.slug}` },
    ],
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: shortTitle,
    description: guide.description,
    author: { '@type': 'Organization', name: '株式会社宝宮設備' },
    publisher: { '@type': 'Organization', name: '株式会社宝宮設備' },
    mainEntityOfPage: `${BASE_URL}/guide/${guide.slug}`,
  }

  // 目次用にH2見出しへアンカーIDを付与
  const sectionsWithId = guide.content.map((section, i) => ({ ...section, id: `section-${i}` }))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Header />
      <main className="pt-[100px]">

        <section className="bg-brand-900 text-white py-10">
          <div className="max-w-4xl mx-auto px-4">
            <nav className="flex items-center gap-3 mb-4 text-sm flex-wrap" aria-label="パンくずリスト">
              <Link href="/" className="text-blue-200 hover:text-white">トップ</Link>
              <span className="text-blue-400">›</span>
              <Link href="/guide" className="text-blue-200 hover:text-white">給湯器の基礎知識</Link>
              <span className="text-blue-400">›</span>
              <span className="truncate">{shortTitle}</span>
            </nav>
            <span className="text-blue-300 text-xs bg-white/10 px-2 py-0.5 rounded mb-3 inline-block">{guide.category}</span>
            <h1 className="text-2xl md:text-3xl font-black">{shortTitle}</h1>
          </div>
        </section>

        <section className="py-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid lg:grid-cols-[1fr_280px] gap-8">

              {/* メインコンテンツ */}
              <article className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                <p className="text-gray-500 text-sm mb-6 leading-relaxed border-b border-gray-100 pb-6">
                  {guide.description}
                </p>

                {/* 目次 */}
                <nav aria-label="目次" className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
                  <div className="font-black text-gray-900 text-sm mb-3">目次</div>
                  <ol className="space-y-1.5 list-decimal list-inside">
                    {sectionsWithId.map((section) => (
                      <li key={section.id} className="text-sm">
                        <a href={`#${section.id}`} className="text-brand-700 hover:underline">
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <div className="space-y-8">
                  {sectionsWithId.map((section) => (
                    <div key={section.id} id={section.id} className="scroll-mt-[110px]">
                      <h2 className="text-lg font-black text-gray-900 mb-3 pb-2 border-b-2 border-brand-200">
                        {section.heading}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed">{section.body}</p>
                      {section.list && (
                        <ul className="mt-4 space-y-2">
                          {section.list.map((item, k) => (
                            <li key={k} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                              <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.table && (
                        <div className="mt-4 overflow-x-auto">
                          <table className="w-full text-sm border-collapse">
                            <thead>
                              <tr className="bg-brand-900 text-white">
                                {section.table.headers.map((h, j) => (
                                  <th key={j} className="text-left px-4 py-2.5 font-bold text-xs">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {section.table.rows.map((row, j) => (
                                <tr key={j} className={j % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                  {row.map((cell, k) => (
                                    <td key={k} className={`px-4 py-2.5 border-b border-gray-100 text-xs ${k === 0 ? 'font-bold text-gray-700' : 'text-gray-600'}`}>
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* FAQ */}
                <div className="mt-10">
                  <h2 className="text-lg font-black text-gray-900 mb-4 pb-2 border-b-2 border-brand-200">よくある質問</h2>
                  <FaqAccordion faqs={guide.faqs} />
                </div>

                {/* 関連ページ */}
                {guide.relatedLinks && guide.relatedLinks.length > 0 && (
                  <div className="mt-10">
                    <h2 className="text-base font-black text-gray-700 mb-3">関連する基礎知識・トラブル</h2>
                    <div className="grid grid-cols-2 gap-2">
                      {guide.relatedLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-brand-700 transition-colors text-center">
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-10 bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                  <h3 className="font-black text-gray-900 text-lg mb-2">給湯器交換のご相談は宝宮設備へ</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {siteConfig.areas.join('・')}対応。無料見積もり受付中。
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                      href="/estimate"
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-colors w-full sm:w-auto justify-center"
                    >
                      無料見積もりを依頼する
                    </Link>
                    <a
                      href={siteConfig.phoneHref}
                      className="flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white font-bold px-6 py-3 rounded-lg transition-colors w-full sm:w-auto justify-center"
                    >
                      {siteConfig.phone}
                    </a>
                    <a
                      href={siteConfig.lineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white font-bold px-6 py-3 rounded-lg transition-colors w-full sm:w-auto justify-center"
                      style={{ backgroundColor: '#00B900' }}
                    >
                      LINEで相談する
                    </a>
                  </div>
                </div>
              </article>

              {/* サイドバー */}
              <aside>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
                  <h2 className="font-black text-gray-900 text-sm mb-4 border-b border-gray-200 pb-2">
                    給湯器の基礎知識
                  </h2>
                  <ul className="space-y-2">
                    {guidesData.map((g) => (
                      <li key={g.slug}>
                        <Link
                          href={`/guide/${g.slug}`}
                          className={`text-sm block py-1.5 hover:text-brand-700 transition-colors ${
                            g.slug === slug ? 'text-brand-700 font-black' : 'text-gray-600'
                          }`}
                        >
                          {g.title.split('｜')[0]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-brand-900 text-white rounded-xl p-5">
                  <div className="font-black text-base mb-2">お気軽にご相談ください</div>
                  <div className="text-blue-200 text-xs mb-4">受付 {siteConfig.hours}</div>
                  <a
                    href={siteConfig.phoneHref}
                    className="block text-center bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-lg px-4 py-3 rounded-lg mb-3 transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                  <Link
                    href="/estimate"
                    className="block text-center bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-4 py-2.5 rounded-lg transition-colors"
                  >
                    無料見積もりフォーム
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}
