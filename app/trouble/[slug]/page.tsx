import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import FaqAccordion from '@/components/FaqAccordion'
import ProductCard from '@/components/ProductCard'
import { getProductsByMaker } from '@/data/products'
import { siteConfig } from '@/data/site'
import { troubleConfigs, troubleList } from '@/data/trouble-configs'

export async function generateStaticParams() {
  return troubleList.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const config = troubleConfigs[slug]
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
  }
}

const featuredProducts = [
  ...getProductsByMaker('rinnai').filter((p) => p.capacity === 24 && p.type === 'auto').slice(0, 1),
  ...getProductsByMaker('noritz').filter((p) => p.capacity === 24 && p.type === 'auto').slice(0, 1),
  ...getProductsByMaker('paloma').filter((p) => p.capacity === 24 && p.type === 'auto').slice(0, 1),
]

const areaLinks = [
  { name: '横浜市の給湯器交換', href: '/area/yokohama' },
  { name: '川崎市の給湯器交換', href: '/area/kawasaki' },
  { name: '厚木市の給湯器交換', href: '/area/atsugi' },
  { name: '海老名市の給湯器交換', href: '/area/ebina' },
]

export default async function TroublePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const config = troubleConfigs[slug]
  if (!config) notFound()

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
      {
        '@type': 'ListItem',
        position: 2,
        name: '給湯器のトラブル',
        item: 'https://www.houmiya-boiler.com/trouble',
      },
      { '@type': 'ListItem', position: 3, name: config.title, item: config.canonical },
    ],
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `給湯器の${config.title}の点検・修理・交換`,
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
  }

  const otherTroubles = troubleList.filter((t) => t.slug !== slug).slice(0, 4)

  // 目次用セクション構築
  const tocItems: { id: string; label: string }[] = []
  if (config.overview) tocItems.push({ id: 'toc-overview', label: `${config.title}とは｜症状の概要` })
  if (config.situations?.length) tocItems.push({ id: 'toc-situations', label: 'よくある発生状況' })
  tocItems.push({ id: 'toc-causes', label: '考えられる主な原因' })
  tocItems.push({ id: 'toc-checkfirst', label: 'まず確認すべきこと' })
  if (config.doNot?.length) tocItems.push({ id: 'toc-donot', label: 'やってはいけないこと' })
  tocItems.push({ id: 'toc-repair', label: '修理で済むケース・交換を検討するケース' })
  if (config.sections?.length) {
    config.sections.forEach((s, i) => tocItems.push({ id: `toc-section-${i}`, label: s.heading }))
  }
  tocItems.push({ id: 'toc-faq', label: 'よくある質問' })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Header />
      <main className="pt-[100px]">

        {/* 安全警告バナー */}
        {config.isSafety && config.safetyNote && (
          <div className="bg-red-600 text-white">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm font-bold leading-relaxed">{config.safetyNote}</p>
              </div>
            </div>
          </div>
        )}

        {/* Hero */}
        <section className="bg-brand-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <nav
              className="flex items-center gap-3 mb-4 text-sm flex-wrap"
              aria-label="パンくずリスト"
            >
              <Link href="/" className="text-blue-200 hover:text-white">トップ</Link>
              <span className="text-blue-400">›</span>
              <Link href="/trouble" className="text-blue-200 hover:text-white">
                給湯器のトラブル
              </Link>
              <span className="text-blue-400">›</span>
              <span>{config.title}</span>
            </nav>
            <h1 className="text-3xl font-black mb-3">{config.heading}</h1>
            <p className="text-blue-100 text-sm max-w-2xl leading-relaxed">{config.description}</p>
          </div>
        </section>

        {/* 目次 */}
        <section className="py-8 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <nav aria-label="目次" className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <div className="font-black text-gray-900 text-sm mb-3">目次</div>
              <ol className="space-y-1.5 list-decimal list-inside">
                {tocItems.map((item) => (
                  <li key={item.id} className="text-sm">
                    <a href={`#${item.id}`} className="text-brand-700 hover:underline">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </section>

        {/* 症状の概要 */}
        {config.overview && (
          <section id="toc-overview" className="py-10 bg-white scroll-mt-[110px]">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-xl font-black text-gray-900 mb-4">{config.title}とは｜症状の概要</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <p className="text-sm text-gray-700 leading-relaxed">{config.overview}</p>
              </div>
            </div>
          </section>
        )}

        {/* よくある発生状況 */}
        {config.situations && config.situations.length > 0 && (
          <section id="toc-situations" className="py-10 bg-gray-50 scroll-mt-[110px]">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-xl font-black text-gray-900 mb-4">よくある発生状況</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {config.situations.map((s, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4">
                    <span className="flex-shrink-0 w-2 h-2 bg-brand-700 rounded-full mt-1.5" />
                    <span className="text-sm text-gray-700 leading-relaxed">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 考えられる原因 */}
        <section id="toc-causes" className="py-10 bg-white scroll-mt-[110px]">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">考えられる主な原因</h2>
            <ul className="space-y-2">
              {config.causes.map((cause, i) => (
                <li key={i} className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-brand-700 text-white text-xs font-black flex items-center justify-center rounded-full mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-700 leading-relaxed">{cause}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* まず確認すること */}
        <section id="toc-checkfirst" className="py-10 bg-white scroll-mt-[110px]">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">まず確認すべきこと</h2>
            <div className="space-y-2">
              {config.checkFirst.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <svg
                    className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            {config.selfCheck && (
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5">
                <div className="font-black text-gray-900 text-sm mb-2">自分で確認できる範囲</div>
                <p className="text-sm text-gray-700 leading-relaxed">{config.selfCheck}</p>
              </div>
            )}
          </div>
        </section>

        {/* やってはいけないこと */}
        {config.doNot && config.doNot.length > 0 && (
          <section id="toc-donot" className="py-10 bg-gray-50 scroll-mt-[110px]">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-xl font-black text-gray-900 mb-4">やってはいけないこと</h2>
              <ul className="space-y-2">
                {config.doNot.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 bg-white border border-red-200 rounded-xl p-4">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* 修理 vs 交換 */}
        <section id="toc-repair" className="py-10 bg-gray-50 scroll-mt-[110px]">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">修理で済むケース・交換を検討するケース</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white border border-blue-200 rounded-xl p-5">
                <div className="font-black text-blue-700 text-sm mb-3">修理で対応できる場合</div>
                <ul className="space-y-2">
                  {config.repairCases.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-red-200 rounded-xl p-5">
                <div className="font-black text-red-600 text-sm mb-3">交換を検討した方がよい場合</div>
                <ul className="space-y-2">
                  {config.replaceCases.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 使用年数の注意 */}
        <section className="py-8 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5">
              <div className="font-black text-gray-900 text-sm mb-2">使用年数10〜15年以上の場合</div>
              <p className="text-sm text-gray-700 leading-relaxed">{config.lifespanNote}</p>
            </div>
            {config.yearNote && (
              <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5 mt-4">
                <div className="font-black text-gray-900 text-sm mb-2">使用年数による判断の目安</div>
                <p className="text-sm text-gray-700 leading-relaxed">{config.yearNote}</p>
              </div>
            )}
          </div>
        </section>

        {/* マンション・戸建ての注意点 */}
        {(config.mansionNote || config.detachedNote) && (
          <section className="py-10 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-xl font-black text-gray-900 mb-4">住宅タイプ別の注意点</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {config.mansionNote && (
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="font-black text-gray-900 text-sm mb-2">マンションの場合</div>
                    <p className="text-sm text-gray-600 leading-relaxed">{config.mansionNote}</p>
                  </div>
                )}
                {config.detachedNote && (
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="font-black text-gray-900 text-sm mb-2">戸建ての場合</div>
                    <p className="text-sm text-gray-600 leading-relaxed">{config.detachedNote}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 追加セクション */}
        {config.sections && config.sections.length > 0 && (
          <section className="py-10 bg-white">
            <div className="max-w-6xl mx-auto px-4 space-y-6">
              {config.sections.map((s, i) => (
                <div key={i} id={`toc-section-${i}`} className="scroll-mt-[110px]">
                  <h2 className="text-xl font-black text-gray-900 mb-3">{s.heading}</h2>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 関連商品・基礎知識への内部リンク */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-base font-black text-gray-700 mb-4">関連する基礎知識・トラブル</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                { href: '/guide/lifespan', label: '給湯器の寿命' },
                { href: '/guide/error-code', label: 'エラーコード一覧' },
                { href: '/guide/capacity', label: '号数の選び方' },
                { href: '/guide/eco-jaws', label: 'エコジョーズとは' },
                { href: '/products', label: '給湯器の商品一覧' },
                { href: '/cases', label: '施工事例一覧' },
                { href: '/estimate', label: '無料見積もり' },
                { href: '/trouble', label: 'トラブル症状一覧' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-brand-700 transition-colors text-center">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 対応エリア */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-base font-black text-gray-700 mb-3">対応エリアからご相談ください</h2>
            <div className="flex flex-wrap gap-3">
              {areaLinks.map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className="text-sm font-bold text-brand-700 bg-white border border-blue-200 rounded-lg px-4 py-2 hover:bg-blue-50 transition-colors"
                >
                  {a.name} →
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 関連商品 */}
        {!config.isSafety && (
          <section className="py-12 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-xl font-black text-gray-900 mb-2">給湯器交換をご検討の方へ</h2>
              <p className="text-gray-500 text-sm mb-6">24号オートタイプ（工事費込み税込価格）</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Link href="/products" className="text-brand-700 font-bold text-sm hover:underline">
                  全商品一覧を見る →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section id="toc-faq" className="py-10 bg-gray-50 scroll-mt-[110px]">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">よくある質問</h2>
            <FaqAccordion faqs={config.faqs} />
          </div>
        </section>

        {/* 他の症状 */}
        <section className="py-8 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <p className="text-sm font-black text-gray-500 mb-3">他の症状・トラブル</p>
            <div className="flex flex-wrap gap-2">
              {otherTroubles.map((t) => (
                <Link
                  key={t.slug}
                  href={`/trouble/${t.slug}`}
                  className="text-sm font-bold text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 hover:bg-blue-50 hover:text-brand-700 transition-colors"
                >
                  {t.title}
                </Link>
              ))}
              <Link
                href="/trouble"
                className="text-sm font-bold text-brand-700 bg-white border border-blue-200 rounded-lg px-3 py-2 hover:bg-blue-50 transition-colors"
              >
                症状一覧を見る
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-brand-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-black mb-2">給湯器のトラブルはお気軽にご相談ください</h2>
            <p className="text-blue-200 text-sm mb-6">
              横浜市・川崎市・厚木市・海老名市対応。無料見積もり受付中。
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
