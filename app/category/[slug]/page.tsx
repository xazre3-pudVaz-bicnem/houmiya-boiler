import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import ProductCard from '@/components/ProductCard'
import CapacityGuide from '@/components/CapacityGuide'
import FaqAccordion from '@/components/FaqAccordion'
import { productsData, getProductsByCategory, getProductsByInstallation } from '@/data/products'
import { siteConfig } from '@/data/site'
import { categorySeoConfigs } from '@/data/category-seo-configs'

type CategoryConfig = {
  title: string
  description: string
  metaTitle: string
  metaDescription: string
}

const categoryConfigs: Record<string, CategoryConfig> = {
  'gas-furo': {
    title: 'ガスふろ給湯器 一覧',
    description: 'ガスふろ給湯器（オート・フルオート）の商品一覧。リンナイ・ノーリツ・パロマ各メーカーの壁掛型を工事費込み価格でご提供。',
    metaTitle: 'ガスふろ給湯器の交換・販売｜横浜・川崎・厚木・海老名｜宝宮設備',
    metaDescription: 'ガスふろ給湯器の交換・販売なら宝宮設備。リンナイ・ノーリツ・パロマ対応。工事費込み価格。横浜市・川崎市・厚木市・海老名市。',
  },
  'gas-kyuto': {
    title: '給湯専用 給湯器 一覧',
    description: '給湯専用タイプの給湯器。シンプルな機能でリーズナブルな価格帯。1〜2人世帯や賃貸物件のオーナー様に人気。',
    metaTitle: '給湯専用給湯器の交換・販売｜横浜・川崎・厚木・海老名｜宝宮設備',
    metaDescription: '給湯専用給湯器の交換・販売なら宝宮設備。リンナイ・ノーリツ・パロマ対応。工事費込み価格。横浜市・川崎市・厚木市・海老名市。',
  },
  'eco-jaws': {
    title: 'エコジョーズ 給湯器 一覧',
    description: '省エネ型のエコジョーズ給湯器。従来型より熱効率が高く、ガス代の節約が期待できます。補助金対象機種もあります。',
    metaTitle: 'エコジョーズ給湯器の交換・販売｜横浜・川崎・厚木・海老名｜宝宮設備',
    metaDescription: 'エコジョーズ給湯器の交換・販売なら宝宮設備。省エネ・ガス代節約。リンナイ・ノーリツ・パロマ対応。横浜市・川崎市・厚木市・海老名市。',
  },
  'warm-water-heating': {
    title: 'ガス温水暖房付ふろ給湯器 一覧',
    description: '給湯と温水暖房が一体になったタイプ。TES熱源機からの交換にも対応。床暖房・パネルヒーターとの組み合わせに最適。',
    metaTitle: 'ガス温水暖房付ふろ給湯器の交換・販売｜横浜・川崎・厚木・海老名｜宝宮設備',
    metaDescription: 'ガス温水暖房付ふろ給湯器の交換・販売なら宝宮設備。TES熱源機からの交換対応。横浜市・川崎市・厚木市・海老名市。',
  },
  'ps-standard': {
    title: 'マンション PS標準設置型 給湯器 一覧',
    description: 'マンションのパイプスペース（PS）に設置する標準設置型給湯器。マンション規格に適合した機種を取り扱っています。',
    metaTitle: 'PS標準設置型給湯器の交換・販売｜マンション対応｜横浜・川崎・厚木・海老名｜宝宮設備',
    metaDescription: 'マンションPS標準設置型給湯器の交換・販売なら宝宮設備。マンション規格対応機種。横浜市・川崎市・厚木市・海老名市。',
  },
  'ps-door': {
    title: 'マンション PS扉内設置型 給湯器 一覧',
    description: 'マンションのパイプスペース扉内に設置するコンパクト型給湯器。スペースが限られた環境に対応した機種をご提供。',
    metaTitle: 'PS扉内設置型給湯器の交換・販売｜マンション対応｜横浜・川崎・厚木・海老名｜宝宮設備',
    metaDescription: 'マンションPS扉内設置型給湯器の交換・販売なら宝宮設備。コンパクト設置対応。横浜市・川崎市・厚木市・海老名市。',
  },
  'balanced-flue': {
    title: 'BF式（バランス型）給湯器 一覧',
    description: '浴室内に設置するBF式（バランス型）給湯器。給排気が独立したバランス釜タイプからの交換対応。',
    metaTitle: 'BF式給湯器の交換・販売｜横浜・川崎・厚木・海老名｜宝宮設備',
    metaDescription: 'BF式（バランス型）給湯器の交換・販売なら宝宮設備。バランス釜からの交換対応。横浜市・川崎市・厚木市・海老名市。',
  },
}

const categoryToProductCategory: Record<string, Parameters<typeof getProductsByCategory>[0]> = {
  'gas-furo': 'gas-furo',
  'gas-kyuto': 'gas-kyuto',
  'eco-jaws': 'eco-jaws',
  'warm-water-heating': 'warm-water-heating',
}

const categoryToInstallation: Record<string, Parameters<typeof getProductsByInstallation>[0]> = {
  'ps-standard': 'ps-standard',
  'ps-door': 'ps-door',
  'balanced-flue': 'balanced-flue',
}

const areaLinks = [
  { href: '/area/yokohama', label: '横浜市' },
  { href: '/area/kawasaki', label: '川崎市' },
  { href: '/area/atsugi', label: '厚木市' },
  { href: '/area/ebina', label: '海老名市' },
]

export async function generateStaticParams() {
  return Object.keys(categoryConfigs).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const config = categoryConfigs[slug]
  if (!config) return {}
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: { canonical: `https://www.houmiya-boiler.com/category/${slug}` },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const config = categoryConfigs[slug]
  if (!config) notFound()

  const seo = categorySeoConfigs[slug]

  const products = categoryToProductCategory[slug]
    ? getProductsByCategory(categoryToProductCategory[slug])
    : categoryToInstallation[slug]
    ? getProductsByInstallation(categoryToInstallation[slug])
    : productsData.slice(0, 6)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'トップ', item: 'https://www.houmiya-boiler.com' },
      { '@type': 'ListItem', position: 2, name: config.title, item: `https://www.houmiya-boiler.com/category/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main className="pt-[100px]">

        {/* Hero */}
        <section className="bg-brand-900 text-white py-10">
          <div className="max-w-6xl mx-auto px-4">
            <nav className="flex items-center gap-3 mb-4 text-sm flex-wrap">
              <Link href="/" className="text-blue-200 hover:text-white">トップ</Link>
              <span className="text-blue-400">›</span>
              <span>{config.title}</span>
            </nav>
            <h1 className="text-2xl md:text-3xl font-black mb-3">{config.title}</h1>
            <p className="text-blue-100 text-sm max-w-2xl">{config.description}</p>
          </div>
        </section>

        {/* 号数ガイド */}
        <section className="py-6 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <CapacityGuide />
          </div>
        </section>

        {/* 商品一覧 */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
                  </svg>
                </div>
                <div className="text-gray-500 text-lg font-bold mb-2">この設置タイプは要見積もりです</div>
                <p className="text-gray-400 text-sm mb-6">
                  設置タイプ・メーカー・号数に合わせた最適な機種をご提案します。
                </p>
                <Link
                  href="/estimate"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg transition-colors"
                >
                  無料見積もりを依頼する
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* SEOコンテンツ */}
        {seo && (
          <>
            <section className="py-10 bg-white">
              <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-xl font-black text-gray-900 mb-4">{config.title}について</h2>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">{seo.longDescription}</p>

                <h3 className="text-base font-black text-gray-900 mb-3">こんな方にご利用いただいています</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{seo.whoNeeds}</p>

                <h3 className="text-base font-black text-gray-900 mb-3">交換時に確認すること</h3>
                <ul className="space-y-2">
                  {seo.exchangeNotes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {seo.mansionNote && (
              <section className="py-6 bg-yellow-50">
                <div className="max-w-4xl mx-auto px-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <div>
                      <p className="text-sm font-black text-yellow-800 mb-1">マンションの場合の注意点</p>
                      <p className="text-sm text-yellow-700 leading-relaxed">{seo.mansionNote}</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {seo.faqs.length > 0 && (
              <section className="py-10 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4">
                  <h2 className="text-xl font-black text-gray-900 mb-6">{config.title} よくある質問</h2>
                  <FaqAccordion faqs={seo.faqs} />
                </div>
              </section>
            )}

            <section className="py-10 bg-white">
              <div className="max-w-4xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-sm font-black text-gray-700 mb-3">関連する基礎知識</h3>
                    <ul className="space-y-2">
                      {seo.guideLinks.map((g) => (
                        <li key={g.href}>
                          <Link href={g.href} className="text-sm text-brand-700 hover:text-brand-900 font-bold hover:underline">
                            {g.label} →
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-700 mb-3">関連する設置タイプ</h3>
                    <ul className="space-y-2">
                      {seo.relatedCategoryLinks.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className="text-sm text-brand-700 hover:text-brand-900 font-bold hover:underline">
                            {c.label} →
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-black text-gray-700 mb-3">対応エリア</h3>
                  <div className="flex flex-wrap gap-2">
                    {areaLinks.map((a) => (
                      <Link
                        key={a.href}
                        href={a.href}
                        className="text-xs font-bold text-brand-700 border border-brand-200 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        {a.label}の給湯器交換
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* CTA */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 text-center">
              <h2 className="font-black text-xl text-gray-900 mb-2">お探しの機種が見つからない場合</h2>
              <p className="text-gray-600 text-sm mb-4">
                掲載していない機種・設置タイプも対応可能な場合があります。お気軽にご相談ください。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/estimate"
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-colors w-full sm:w-auto justify-center"
                >
                  無料見積もりを依頼する
                </Link>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center gap-2 border-2 border-brand-700 text-brand-700 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors w-full sm:w-auto justify-center"
                >
                  {siteConfig.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}
