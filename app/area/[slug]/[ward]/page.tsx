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
import { wardConfigs, allWards, type WardConfig } from '@/data/ward-configs'
import {
  areaTroubleConfigs,
  allAreaTroubles,
  type AreaTroubleConfig,
} from '@/data/area-trouble-configs'
import {
  areaInstalltypeConfigs,
  allAreaInstalltypes,
  type AreaInstalltypeConfig,
} from '@/data/area-installtype-configs'

export async function generateStaticParams() {
  const wardParams = allWards.map((w) => ({ slug: w.citySlug, ward: w.wardSlug }))
  const troubleParams = allAreaTroubles.map((t) => ({ slug: t.citySlug, ward: t.troubleSlug }))
  const installtypeParams = allAreaInstalltypes.map((t) => ({ slug: t.citySlug, ward: t.typeSlug }))
  return [...wardParams, ...troubleParams, ...installtypeParams]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; ward: string }>
}): Promise<Metadata> {
  const { slug, ward } = await params

  const wardConfig = wardConfigs[slug]?.[ward]
  if (wardConfig) {
    return {
      title: wardConfig.metaTitle,
      description: wardConfig.metaDescription,
      alternates: { canonical: wardConfig.canonical },
      openGraph: {
        title: wardConfig.metaTitle,
        description: wardConfig.metaDescription,
        locale: 'ja_JP',
        type: 'website',
      },
    }
  }

  const troubleConfig = areaTroubleConfigs[slug]?.[ward]
  if (troubleConfig) {
    return {
      title: troubleConfig.metaTitle,
      description: troubleConfig.metaDescription,
      alternates: { canonical: troubleConfig.canonical },
      openGraph: {
        title: troubleConfig.metaTitle,
        description: troubleConfig.metaDescription,
        locale: 'ja_JP',
        type: 'website',
      },
    }
  }

  const installtypeConfig = areaInstalltypeConfigs[slug]?.[ward]
  if (installtypeConfig) {
    return {
      title: installtypeConfig.metaTitle,
      description: installtypeConfig.metaDescription,
      alternates: { canonical: installtypeConfig.canonical },
      openGraph: {
        title: installtypeConfig.metaTitle,
        description: installtypeConfig.metaDescription,
        locale: 'ja_JP',
        type: 'website',
      },
    }
  }

  return {}
}

const featuredProducts = [
  ...getProductsByMaker('rinnai').filter((p) => p.capacity === 24 && p.type === 'auto').slice(0, 1),
  ...getProductsByMaker('noritz').filter((p) => p.capacity === 24 && p.type === 'auto').slice(0, 1),
  ...getProductsByMaker('paloma').filter((p) => p.capacity === 24 && p.type === 'auto').slice(0, 1),
]

const capacityRows = [
  { go: '16号', family: '一人暮らし向け', use: 'シャワー中心・同時使用が少ない' },
  { go: '20号', family: '2〜3人家族向け', use: 'キッチンとシャワーを順番に使う' },
  { go: '24号', family: '4人以上の家族向け', use: 'お風呂とキッチンの同時使用が多い' },
]

export default async function WardOrSubPage({
  params,
}: {
  params: Promise<{ slug: string; ward: string }>
}) {
  const { slug, ward } = await params

  // === タイプ1: 区ページ（既存機能を完全維持） ===
  const wardConfig = wardConfigs[slug]?.[ward]
  if (wardConfig) {
    return <WardContent config={wardConfig} slug={slug} ward={ward} />
  }

  // === タイプ2: 地域×症状ページ ===
  const troubleConfig = areaTroubleConfigs[slug]?.[ward]
  if (troubleConfig) {
    return <AreaTroublePage config={troubleConfig} />
  }

  // === タイプ3: 地域×設置タイプページ ===
  const installtypeConfig = areaInstalltypeConfigs[slug]?.[ward]
  if (installtypeConfig) {
    return <AreaInstalltypePage config={installtypeConfig} />
  }

  notFound()
}

/* =========================================================================
   タイプ1: 区ページ（既存JSXをそのまま維持）
   ========================================================================= */
function WardContent({
  config,
  slug,
  ward,
}: {
  config: WardConfig
  slug: string
  ward: string
}) {
  const fullName = `${config.cityName}${config.wardName}`

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
      {
        '@type': 'ListItem',
        position: 3,
        name: `${config.cityName}の給湯器交換`,
        item: `https://www.houmiya-boiler.com/area/${config.citySlug}`,
      },
      { '@type': 'ListItem', position: 4, name: `${fullName}の給湯器交換`, item: config.canonical },
    ],
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${fullName}の給湯器交換・販売`,
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
    areaServed: { '@type': 'City', name: fullName },
  }

  const otherWards = Object.entries(wardConfigs[slug] || {})
    .filter(([wardSlug]) => wardSlug !== ward)
    .slice(0, 5)
    .map(([wardSlug, cfg]) => ({ slug: wardSlug, name: cfg.wardName }))

  const housingHeading =
    config.housingType === 'mansion'
      ? `${fullName}のマンション給湯器交換`
      : config.housingType === 'detached'
        ? `${fullName}の戸建て給湯器交換`
        : `${fullName}の住宅タイプ別給湯器交換`

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

        {/* Hero */}
        <section className="bg-brand-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <nav
              className="flex items-center gap-3 mb-4 text-sm flex-wrap"
              aria-label="パンくずリスト"
            >
              <Link href="/" className="text-blue-200 hover:text-white">トップ</Link>
              <span className="text-blue-400">›</span>
              <Link href="/area" className="text-blue-200 hover:text-white">対応エリア</Link>
              <span className="text-blue-400">›</span>
              <Link href={`/area/${config.citySlug}`} className="text-blue-200 hover:text-white">
                {config.cityName}
              </Link>
              <span className="text-blue-400">›</span>
              <span>{config.wardName}</span>
            </nav>
            <h1 className="text-3xl font-black mb-3">{fullName}の給湯器交換・販売</h1>
            <p className="text-blue-100 text-sm mb-5 max-w-2xl leading-relaxed">
              {fullName}で給湯器交換・販売なら株式会社宝宮設備。リンナイ・ノーリツ・パロマ対応。
              戸建て・マンション・アパート対応。工事費込み価格で無料見積もり受付中。
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
        {config.sections && config.sections.length > 0 && (
          <section className="py-5 bg-gray-50 border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4">
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <p className="text-xs font-black text-gray-700 mb-3 uppercase tracking-wider">目次</p>
                <ol className="space-y-1.5 list-decimal list-inside columns-2">
                  {config.sections.map((s, i) => (
                    <li key={i}>
                      <a href={`#section-ward-${i}`} className="text-xs text-brand-700 hover:underline">{s.heading}</a>
                    </li>
                  ))}
                  <li><a href="#ward-faq" className="text-xs text-brand-700 hover:underline">よくある質問</a></li>
                </ol>
              </div>
            </div>
          </section>
        )}

        {/* Intro */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">
              {fullName}での給湯器交換について
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">{config.intro1}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{config.intro2}</p>
              {config.uniqueBody && (
                <p className="text-gray-700 text-sm leading-relaxed">{config.uniqueBody}</p>
              )}
              <p className="text-gray-600 text-sm leading-relaxed">{config.introBody}</p>
            </div>
          </div>
        </section>

        {/* 住宅傾向・設置タイプ・よくある症状 */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">{fullName}の住宅傾向と給湯器交換のポイント</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-black text-gray-900 mb-3 text-base">{fullName}の住宅傾向</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{config.housingTrend}</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-black text-gray-900 mb-3 text-base">{fullName}で多い設置タイプ</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{config.installTypeNote}</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-black text-gray-900 mb-3 text-base">{fullName}でよくある故障症状</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{config.troubleNote}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Housing note */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{housingHeading}</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-4">
              <p className="text-gray-700 text-sm leading-relaxed">{config.housingNote}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
                style={{ backgroundColor: '#00B900' }}
              >
                LINEで設置状況の写真を送る
              </a>
              <Link
                href="/estimate"
                className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
              >
                無料見積もりを依頼する
              </Link>
            </div>
          </div>
        </section>

        {/* 対応メーカー */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">
              {fullName}で対応できる給湯器メーカー
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: 'リンナイ', href: '/rinnai', color: 'border-red-200 bg-red-50', text: 'text-red-700', desc: 'RUF-Aシリーズ。国内シェアNo.1。' },
                { name: 'ノーリツ', href: '/noritz', color: 'border-blue-200 bg-blue-50', text: 'text-blue-700', desc: 'GT-C70シリーズ。エコジョーズが豊富。' },
                { name: 'パロマ', href: '/paloma', color: 'border-indigo-200 bg-indigo-50', text: 'text-indigo-700', desc: 'FH-Eシリーズ。コスパで人気。' },
              ].map((m) => (
                <Link
                  key={m.name}
                  href={m.href}
                  className={`block border rounded-xl p-4 hover:shadow-sm transition-shadow ${m.color}`}
                >
                  <div className={`font-black text-base mb-1 ${m.text}`}>{m.name}</div>
                  <p className="text-xs text-gray-600 mb-2">{m.desc}</p>
                  <span className={`text-xs font-bold ${m.text}`}>{m.name}の一覧を見る →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 工事費 */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">
              {fullName}での給湯器交換費用について
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                宝宮設備では給湯器本体・リモコン・標準取付費を含めた工事費込み価格をご提示しています。
                実際の金額は設置状況・配管状態・追加部材の有無により変わる場合があります。
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
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
            </div>
            <div className="mt-4">
              <Link
                href="/estimate"
                className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-sm px-5 py-3 rounded-lg transition-colors"
              >
                無料見積もりを依頼する
              </Link>
            </div>
          </div>
        </section>

        {/* 号数の選び方 */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">給湯器 号数の選び方</h2>
            <p className="text-gray-500 text-sm mb-4">
              号数は1分間に作れるお湯の量の目安です。家族構成と使い方に合わせて選びましょう。
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200 mb-3">
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
            <Link href="/guide/capacity" className="text-sm font-bold text-brand-700 hover:underline">
              号数の選び方 詳しく見る →
            </Link>
          </div>
        </section>

        {/* 追加セクション */}
        {config.sections && config.sections.length > 0 && (
          <section className="py-10 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 space-y-6">
              {config.sections.map((section, i) => (
                <div key={i} id={`section-ward-${i}`} className="scroll-mt-28">
                  <h2 className="text-xl font-black text-gray-900 mb-3">{section.heading}</h2>
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <p className="text-sm text-gray-600 leading-relaxed">{section.body}</p>
                    {section.list && (
                      <ul className="mt-3 space-y-1.5">
                        {section.list.map((item, k) => (
                          <li key={k} className="flex items-start gap-2 text-sm text-gray-700">
                            <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
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
                                  <td key={k} className="px-4 py-2.5 border-b border-gray-100 text-xs">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 関連トラブル・基礎知識 */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-base font-black text-gray-700 mb-4">{fullName}で多い給湯器トラブル・関連ページ</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                { href: '/trouble/no-hot-water', label: 'お湯が出ない' },
                { href: '/trouble/error-111', label: 'エラーコード111' },
                { href: '/trouble/no-reheating', label: '追い焚きできない' },
                { href: '/trouble/water-leak', label: '水漏れ' },
                { href: '/guide/capacity', label: '号数の選び方' },
                { href: '/guide/eco-jaws', label: 'エコジョーズとは' },
                { href: '/guide/lifespan', label: '給湯器の寿命' },
                { href: `/area/${config.citySlug}`, label: `${config.cityName}全体を見る` },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-brand-700 transition-colors text-center">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="ward-faq" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">
              {fullName}の給湯器交換 よくある質問
            </h2>
            <FaqAccordion faqs={config.faqs} />
          </div>
        </section>

        {/* 関連商品 */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">{fullName}で人気の給湯器</h2>
            <p className="text-gray-500 text-sm mb-6">24号オートタイプ（工事費込み税込価格）</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Link href="/rinnai" className="text-brand-700 font-bold text-sm hover:underline">
                リンナイ 一覧 →
              </Link>
              <Link href="/noritz" className="text-brand-700 font-bold text-sm hover:underline">
                ノーリツ 一覧 →
              </Link>
              <Link href="/paloma" className="text-brand-700 font-bold text-sm hover:underline">
                パロマ 一覧 →
              </Link>
            </div>
          </div>
        </section>

        {/* 内部リンク */}
        <section className="py-8 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-black text-gray-500 mb-3">
                  {config.cityName}の他のエリアを見る
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/area/${config.citySlug}`}
                    className="text-sm font-bold text-brand-700 bg-white border border-blue-200 rounded-lg px-4 py-2 hover:bg-blue-50 transition-colors"
                  >
                    {config.cityName}全体を見る
                  </Link>
                  {otherWards.map((w) => (
                    <Link
                      key={w.slug}
                      href={`/area/${config.citySlug}/${w.slug}`}
                      className="text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
                    >
                      {w.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-black text-gray-500 mb-3">給湯器の基礎知識</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { href: '/guide/capacity', label: '号数の選び方' },
                    { href: '/guide/eco-jaws', label: 'エコジョーズとは' },
                    { href: '/guide/lifespan', label: '給湯器の寿命' },
                    { href: '/guide/full-auto-auto', label: 'オートとフルオート' },
                    { href: '/cases', label: '施工事例' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-xs font-bold text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 hover:bg-blue-50 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-brand-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-black mb-2">{fullName}の給湯器交換はお任せください</h2>
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

/* =========================================================================
   共通パーツ
   ========================================================================= */
function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
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

function SubPageJsonLd({
  faqs,
  cityName,
  citySlug,
  pageTitle,
  canonical,
  metaDescription,
}: {
  faqs: { q: string; a: string }[]
  cityName: string
  citySlug: string
  pageTitle: string
  canonical: string
  metaDescription: string
}) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
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
      {
        '@type': 'ListItem',
        position: 3,
        name: cityName,
        item: `https://www.houmiya-boiler.com/area/${citySlug}`,
      },
      { '@type': 'ListItem', position: 4, name: pageTitle, item: canonical },
    ],
  }
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: pageTitle,
    description: metaDescription,
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
    areaServed: { '@type': 'City', name: cityName },
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    </>
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

/* =========================================================================
   タイプ2: 地域×症状ページ
   ========================================================================= */
function AreaTroublePage({ config }: { config: AreaTroubleConfig }) {
  const toc = [
    { id: 'trouble-causes', label: `${config.troubleTitle}の主な原因` },
    { id: 'trouble-check', label: 'まず確認すること' },
    { id: 'trouble-repair', label: '修理で済むケース' },
    { id: 'trouble-replace', label: '交換を検討した方がよいケース' },
    { id: 'trouble-year', label: '使用年数10年以上の場合' },
    { id: 'trouble-photo', label: '写真見積もりのガイド' },
    { id: 'trouble-faq', label: 'よくある質問' },
  ]

  return (
    <>
      <SubPageJsonLd
        faqs={config.faqs}
        cityName={config.cityName}
        citySlug={config.citySlug}
        pageTitle={config.pageTitle}
        canonical={config.canonical}
        metaDescription={config.metaDescription}
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
              <Link href={`/area/${config.citySlug}`} className="text-blue-200 hover:text-white">
                {config.cityName}
              </Link>
              <span className="text-blue-400">›</span>
              <span>{config.troubleTitle}</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-black mb-4 leading-snug">{config.pageTitle}</h1>
            <CtaButtons />
          </div>
        </section>

        {/* 危険症状の警告 */}
        {config.isSafetyRisk && config.safetyNote && (
          <section className="py-6 bg-orange-50 border-b border-orange-200">
            <div className="max-w-4xl mx-auto px-4">
              <div className="bg-orange-100 border-2 border-orange-400 rounded-xl p-5 flex items-start gap-3">
                <svg className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-orange-900 font-bold leading-relaxed">{config.safetyNote}</p>
              </div>
            </div>
          </section>
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

        {/* Intro */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">
              {config.cityName}で給湯器の{config.troubleTitle}が起きたら
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-gray-700 text-sm leading-relaxed">{config.introText}</p>
            </div>
          </div>
        </section>

        {/* 原因 */}
        <section id="trouble-causes" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.troubleTitle}の主な原因</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <CheckList items={config.causes} />
            </div>
          </div>
        </section>

        {/* まず確認すること */}
        <section id="trouble-check" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">まず確認すること</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <CheckList items={config.checkFirst} />
            </div>
          </div>
        </section>

        {/* 修理で済むケース */}
        <section id="trouble-repair" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">修理で済むケース</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">{config.repairNote}</p>
            </div>
          </div>
        </section>

        {/* 交換を検討した方がよいケース */}
        <section id="trouble-replace" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">交換を検討した方がよいケース</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">{config.replaceNote}</p>
            </div>
          </div>
        </section>

        {/* 使用年数10年以上 */}
        <section id="trouble-year" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">使用年数10年以上の場合</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">{config.yearNote}</p>
            </div>
          </div>
        </section>

        {/* 中間CTA */}
        <MidEstimateCta heading={`${config.cityName}の給湯器${config.troubleTitle}はお任せください`} />

        {/* 写真見積もりのガイド */}
        <section id="trouble-photo" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">写真見積もりに必要な写真</h2>
            <p className="text-gray-500 text-sm mb-4">
              以下の写真をLINEまたはフォームでお送りいただければ、概算見積もりをご案内します。
            </p>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <CheckList items={config.photoGuide} />
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

        {/* FAQ */}
        <section id="trouble-faq" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">
              {config.cityName}の給湯器{config.troubleTitle} よくある質問
            </h2>
            <FaqAccordion faqs={config.faqs} />
          </div>
        </section>

        {/* 関連リンク */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-black text-gray-500 mb-3">給湯器のトラブル別ガイド</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { href: '/trouble/no-hot-water', label: 'お湯が出ない' },
                    { href: '/trouble/error-111', label: 'エラーコード111' },
                    { href: '/trouble/error-110', label: 'エラーコード110' },
                    { href: '/trouble/water-leak', label: '水漏れ' },
                    { href: '/trouble/no-reheating', label: '追い焚きできない' },
                    { href: '/trouble/gas-smell', label: 'ガス臭い' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-blue-50 hover:border-blue-200 hover:text-brand-700 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-black text-gray-500 mb-3">関連エリア・基礎知識</p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/area/${config.citySlug}`}
                    className="text-xs font-bold text-brand-700 bg-white border border-blue-200 rounded-lg px-3 py-2 hover:bg-blue-50 transition-colors"
                  >
                    {config.cityName}の対応エリアを見る
                  </Link>
                  {[
                    { href: '/guide/capacity', label: '号数の選び方' },
                    { href: '/guide/eco-jaws', label: 'エコジョーズとは' },
                    { href: '/guide/lifespan', label: '給湯器の寿命' },
                    { href: '/area', label: '対応エリア一覧' },
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

        {/* CTA */}
        <section className="py-12 bg-brand-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-black mb-2">{config.cityName}の給湯器交換はお任せください</h2>
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

/* =========================================================================
   タイプ3: 地域×設置タイプページ
   ========================================================================= */
function AreaInstalltypePage({ config }: { config: AreaInstalltypeConfig }) {
  const toc = [
    { id: 'it-whatis', label: `${config.typeTitle}とは` },
    { id: 'it-housing', label: 'どんな住宅に多いか' },
    { id: 'it-exchange', label: '交換時の注意点' },
    { id: 'it-confirm', label: '交換前に確認すること' },
    { id: 'it-photo', label: '写真見積もりで必要な写真' },
    { id: 'it-cost', label: '追加費用が発生するケース' },
    { id: 'it-faq', label: 'よくある質問' },
  ]

  return (
    <>
      <SubPageJsonLd
        faqs={config.faqs}
        cityName={config.cityName}
        citySlug={config.citySlug}
        pageTitle={config.pageTitle}
        canonical={config.canonical}
        metaDescription={config.metaDescription}
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
              <Link href={`/area/${config.citySlug}`} className="text-blue-200 hover:text-white">
                {config.cityName}
              </Link>
              <span className="text-blue-400">›</span>
              <span>{config.typeTitle}</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-black mb-4 leading-snug">{config.pageTitle}</h1>
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

        {/* Intro */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">
              {config.cityName}の{config.typeTitle}交換について
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-gray-700 text-sm leading-relaxed">{config.introText}</p>
            </div>
          </div>
        </section>

        {/* この設置タイプとは */}
        <section id="it-whatis" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.typeTitle}とは</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">{config.whatIs}</p>
            </div>
          </div>
        </section>

        {/* どんな住宅に多いか */}
        <section id="it-housing" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">どんな住宅に多いか</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">{config.whichHousing}</p>
            </div>
          </div>
        </section>

        {/* 交換時の注意点 */}
        <section id="it-exchange" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">交換時の注意点</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <CheckList items={config.exchangeNotes} />
            </div>
          </div>
        </section>

        {/* 交換前に確認すること */}
        <section id="it-confirm" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">交換前に確認すること</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <CheckList items={config.confirmBeforeExchange} />
            </div>
          </div>
        </section>

        {/* 中間CTA */}
        <MidEstimateCta heading={`${config.cityName}の${config.typeTitle}交換はお任せください`} />

        {/* 写真見積もりで必要な写真 */}
        <section id="it-photo" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">写真見積もりで必要な写真</h2>
            <p className="text-gray-500 text-sm mb-4">
              以下の写真をLINEまたはフォームでお送りいただければ、概算見積もりをご案内します。
            </p>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <CheckList items={config.photoGuide} />
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

        {/* 追加費用が発生するケース */}
        <section id="it-cost" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">追加費用が発生するケース</h2>
            <p className="text-gray-500 text-sm mb-4">
              追加費用が見込まれる場合は、工事前に必ずご説明します。事前説明なく請求することはありません。
            </p>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <CheckList items={config.additionalCostCases} />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="it-faq" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">
              {config.cityName}の{config.typeTitle}交換 よくある質問
            </h2>
            <FaqAccordion faqs={config.faqs} />
          </div>
        </section>

        {/* 関連リンク */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-black text-gray-500 mb-3">関連エリア</p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/area/${config.citySlug}`}
                    className="text-xs font-bold text-brand-700 bg-white border border-blue-200 rounded-lg px-3 py-2 hover:bg-blue-50 transition-colors"
                  >
                    {config.cityName}の対応エリアを見る
                  </Link>
                  <Link
                    href="/area"
                    className="text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-blue-50 transition-colors"
                  >
                    対応エリア一覧
                  </Link>
                </div>
              </div>
              <div>
                <p className="text-sm font-black text-gray-500 mb-3">給湯器の基礎知識</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { href: '/guide/capacity', label: '号数の選び方' },
                    { href: '/guide/eco-jaws', label: 'エコジョーズとは' },
                    { href: '/guide/lifespan', label: '給湯器の寿命' },
                    { href: '/guide/full-auto-auto', label: 'オートとフルオート' },
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

        {/* 関連商品 */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">{config.cityName}で人気の給湯器</h2>
            <p className="text-gray-500 text-sm mb-6">24号オートタイプ（工事費込み税込価格）</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-brand-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-black mb-2">{config.cityName}の{config.typeTitle}交換はお任せください</h2>
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
