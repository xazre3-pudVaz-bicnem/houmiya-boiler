import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import FaqAccordion from '@/components/FaqAccordion'
import { siteConfig } from '@/data/site'
import { yokohamaStations, allYokohamaStations } from '@/data/yokohama-stations'
import { productsData } from '@/data/products'
import { casesData } from '@/data/cases'

export async function generateStaticParams() {
  return allYokohamaStations.map((s) => ({ slug: 'yokohama', station: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; station: string }>
}): Promise<Metadata> {
  const { station } = await params
  const config = yokohamaStations[station]
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

const capacityRows: string[][] = [
  ['目安の家族構成', '1〜2人', '2〜3人', '4人以上'],
  ['同時使用', '不向き', '△', '○'],
  ['主な用途', '単身・コンパクト住宅', 'スタンダード', '戸建て・大家族'],
]

export default async function StationPage({
  params,
}: {
  params: Promise<{ slug: string; station: string }>
}) {
  const { slug, station } = await params
  const config = yokohamaStations[station]
  if (!config || slug !== 'yokohama') notFound()

  const stationTitle = `${config.name}駅周辺`

  const stationProducts = config.recommendedProductSlugs
    .map((s) => productsData.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  const wardCases = casesData.filter((c) => c.wardSlug === config.wardSlug).slice(0, 3)
  const displayCases =
    wardCases.length > 0
      ? wardCases
      : casesData.filter((c) => c.areaSlug === 'yokohama').slice(0, 3)

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${stationTitle} 給湯器交換・販売`,
    description: config.metaDescription,
    provider: { '@id': 'https://www.houmiya-boiler.com/#business' },
    areaServed: { '@type': 'Place', name: `横浜市${config.wardName} ${config.name}駅周辺` },
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
      {
        '@type': 'ListItem',
        position: 4,
        name: `横浜市${config.wardName}`,
        item: `https://www.houmiya-boiler.com/area/yokohama/${config.wardSlug}`,
      },
      { '@type': 'ListItem', position: 5, name: `${config.name}駅周辺`, item: config.canonical },
    ],
  }

  const toc = [
    { id: 'intro', label: `${config.name}駅周辺で給湯器交換を検討している方へ` },
    { id: 'housing', label: '戸建て・マンション・アパート対応' },
    { id: 'install-type', label: '多い給湯器の設置タイプ' },
    { id: 'capacity', label: '号数（16号・20号・24号）の選び方' },
    { id: 'products', label: '対応メーカーとおすすめ商品' },
    { id: 'trouble', label: 'よくある給湯器トラブル' },
    { id: 'estimate', label: '写真見積もりの流れ' },
    { id: 'cases', label: '施工事例' },
    { id: 'faq', label: 'よくある質問' },
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

        {/* 1. パンくず */}
        <nav className="bg-gray-100 border-b border-gray-200" aria-label="パンくずリスト">
          <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center gap-2 text-xs flex-wrap text-gray-500">
            <Link href="/" className="hover:text-brand-700">トップ</Link>
            <span>›</span>
            <Link href="/area" className="hover:text-brand-700">対応エリア</Link>
            <span>›</span>
            <Link href="/area/yokohama" className="hover:text-brand-700">横浜市</Link>
            <span>›</span>
            <Link href={`/area/yokohama/${config.wardSlug}`} className="hover:text-brand-700">
              {config.wardName}
            </Link>
            <span>›</span>
            <span className="text-gray-700 font-semibold">{config.name}駅周辺</span>
          </div>
        </nav>

        {/* 2. ファーストビュー */}
        <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-brand-300 text-sm mb-2">{config.wardName} / 横浜市</p>
            <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
              {config.name}駅周辺の給湯器交換・販売
            </h1>
            <p className="text-gray-300 text-base mb-2">{config.lines.join(' / ')}</p>
            <p className="text-gray-300 mb-6 leading-relaxed">{config.stationCharacter}</p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link
                href="/estimate"
                className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-3 rounded-lg text-center transition-colors"
              >
                無料見積もりを依頼する
              </Link>
              <a
                href={siteConfig.phoneHref}
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black px-6 py-3 rounded-lg text-center transition-colors"
              >
                電話で相談 {siteConfig.phone}
              </a>
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg text-center transition-colors"
              >
                LINEで写真相談
              </a>
            </div>
          </div>
        </section>

        {/* 3. 目次 */}
        <section className="py-6 bg-gray-50 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <p className="text-xs font-black text-gray-700 mb-3 uppercase tracking-wider">目次</p>
              <ol className="space-y-1.5 list-decimal list-inside sm:columns-2">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="text-xs text-brand-700 hover:underline">{t.label}</a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 4. 導入文 */}
        <section id="intro" className="py-10 bg-white scroll-mt-24">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">
              {config.name}駅周辺で給湯器交換を検討している方へ
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4 text-sm">{config.intro}</p>
            <p className="text-gray-700 leading-relaxed text-sm">{config.areaDesc}</p>
          </div>
        </section>

        {/* 5. 住宅タイプ別ガイド */}
        <section id="housing" className="py-10 bg-gray-50 scroll-mt-24">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">
              {config.name}駅周辺の戸建て・マンション・アパート対応
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {config.mansionDesc && (
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="font-black text-gray-900 mb-2">マンション・集合住宅</h3>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">{config.mansionDesc}</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>・PS設置型・PS扉内設置型に対応</li>
                    <li>・管理組合への届出サポート</li>
                    <li>・マンション規約確認も対応</li>
                  </ul>
                </div>
              )}
              {config.detachedDesc && (
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="font-black text-gray-900 mb-2">戸建て住宅</h3>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">{config.detachedDesc}</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>・屋外壁掛け型・据置型に対応</li>
                    <li>・エコジョーズへの切り替え可</li>
                    <li>・号数アップ・ダウン対応</li>
                  </ul>
                </div>
              )}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-black text-gray-900 mb-2">アパート・賃貸物件</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  {config.name}駅周辺の賃貸物件の給湯器交換も承っています。大家様・管理会社様からのご依頼はもちろん、借主様からの急ぎのご相談にも対応します。
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>・大家・管理会社様対応可</li>
                  <li>・空室・入居中どちらも対応</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 6. 設置タイプ */}
        <section id="install-type" className="py-10 bg-white scroll-mt-24">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-3">
              {config.name}駅周辺で多い給湯器の設置タイプ
            </h2>
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">{config.installTypeNote}</p>
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">{config.installTypeGuide}</p>
            <div className="flex flex-wrap gap-2">
              {config.primaryInstallTypes.map((t) => (
                <span
                  key={t}
                  className="bg-brand-50 border border-brand-200 text-brand-800 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 7. 号数の選び方 */}
        <section id="capacity" className="py-10 bg-gray-50 scroll-mt-24">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-3">
              {config.name}駅周辺での号数の選び方
            </h2>
            <p className="text-gray-700 mb-6 text-sm leading-relaxed">{config.capacityGuideText}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="p-2.5 text-left border border-gray-600">号数</th>
                    <th className="p-2.5 text-center border border-gray-600">16号</th>
                    <th className="p-2.5 text-center border border-gray-600">20号</th>
                    <th className="p-2.5 text-center border border-gray-600">24号</th>
                  </tr>
                </thead>
                <tbody>
                  {capacityRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-2.5 border border-gray-200 font-semibold text-gray-700">{row[0]}</td>
                      <td className="p-2.5 border border-gray-200 text-center text-gray-700">{row[1]}</td>
                      <td className="p-2.5 border border-gray-200 text-center text-gray-700">{row[2]}</td>
                      <td className="p-2.5 border border-gray-200 text-center text-gray-700">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link href="/guide/capacity" className="text-sm font-bold text-brand-700 hover:underline mt-4 inline-block">
              号数の選び方 詳しく見る →
            </Link>
          </div>
        </section>

        {/* 8. 対応メーカー + 商品カード */}
        <section id="products" className="py-10 bg-white scroll-mt-24">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">対応メーカーとおすすめ商品</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {stationProducts.map((product) => (
                <Link href={`/products/${product.slug}`} key={product.slug}>
                  <div className="border border-gray-200 rounded-xl p-4 hover:border-brand-400 transition-colors h-full">
                    <p className="text-xs text-gray-500 mb-1">
                      {product.makerLabel} / {product.capacity}号 / {product.typeLabel}
                    </p>
                    <p className="font-bold text-sm text-gray-900 mb-2">{product.model}</p>
                    <p className="text-brand-700 font-black">
                      {product.totalInTax.toLocaleString()}円（税込）
                    </p>
                    <p className="text-xs text-gray-400 mt-1">工事費込み</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex gap-4 flex-wrap">
              <Link href="/products" className="text-sm text-brand-700 font-bold hover:underline">全商品を見る →</Link>
              <Link href="/guide/capacity" className="text-sm text-brand-700 font-bold hover:underline">号数の選び方 →</Link>
            </div>
          </div>
        </section>

        {/* 中間CTA */}
        <section className="py-10 bg-brand-900 text-white text-center">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-xl font-black mb-2">{config.name}駅周辺の給湯器交換・無料見積もり</p>
            <p className="text-brand-300 text-sm mb-4">LINEで写真を送るだけで見積もりできます</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/estimate" className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-3 rounded-lg transition-colors">
                無料見積もりを依頼する
              </Link>
              <a href={siteConfig.phoneHref} className="bg-white text-gray-900 font-bold px-6 py-3 rounded-lg">
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                LINEで写真相談
              </a>
            </div>
          </div>
        </section>

        {/* 9. よくあるトラブル症状 */}
        <section id="trouble" className="py-10 bg-gray-50 scroll-mt-24">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">
              {config.name}駅周辺でよくある給湯器トラブル
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  t: 'お湯が出ない',
                  href: '/area/yokohama/trouble/no-hot-water',
                  d: 'ガス・水圧・点火の問題が多い。エラーコードを確認してください。',
                },
                {
                  t: 'エラー111',
                  href: '/area/yokohama/trouble/error-111',
                  d: '点火不良コード。ガス栓確認→リセットを試してから連絡を。',
                },
                {
                  t: '水漏れ',
                  href: '/area/yokohama/trouble/water-leak',
                  d: '本体からの水漏れは感電の危険。すぐに電源を切ってください。',
                },
                {
                  t: '10年以上使用中',
                  href: '/guide/lifespan',
                  d: '耐用年数10〜15年。故障前の予防交換をご検討ください。',
                },
              ].map((t) => (
                <Link href={t.href} key={t.t}>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-red-200 transition-colors h-full">
                    <p className="font-black text-red-700 text-sm mb-1">{t.t}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{t.d}</p>
                  </div>
                </Link>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              {config.name}駅周辺でよくあるご相談：{config.commonTroubles.join(' / ')}
            </p>
          </div>
        </section>

        {/* 10. 写真見積もり */}
        <section id="estimate" className="py-10 bg-white scroll-mt-24">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-3">写真見積もりの流れ</h2>
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">{config.photoEstimateNote}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {[
                '給湯器本体全体',
                '型番シール（本体側面）',
                '配管まわり全体',
                'リモコン（エラー表示も）',
                '設置場所全体',
                'マンションはPS内部',
              ].map((p) => (
                <div
                  key={p}
                  className="bg-brand-50 border border-brand-100 rounded-lg p-3 text-xs font-semibold text-brand-800"
                >
                  ◆ {p}
                </div>
              ))}
            </div>
            <a
              href={siteConfig.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
            >
              LINEで写真を送る（無料見積もり）
            </a>
          </div>
        </section>

        {/* 11. 施工事例 */}
        <section id="cases" className="py-10 bg-gray-50 scroll-mt-24">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">
              {config.wardName}・{config.name}駅周辺の施工事例
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {displayCases.map((c) => (
                <Link href={`/cases/${c.slug}`} key={c.id}>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-brand-300 transition-colors h-full">
                    <p className="text-xs text-gray-500 mb-1">{c.area}</p>
                    <p className="font-bold text-sm text-gray-900">{c.buildingType}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {c.beforeModel} → {c.afterModel}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {c.maker} / {c.capacity}号 / {c.duration}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/cases" className="text-sm text-brand-700 font-bold hover:underline mt-4 inline-block">
              施工事例一覧を見る →
            </Link>
          </div>
        </section>

        {/* 12. 関連内部リンク */}
        <section className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-lg font-black text-gray-900 mb-4">関連ページ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">エリア・区ページ</p>
                <ul className="space-y-1.5">
                  <li>
                    <Link href={`/area/yokohama/${config.wardSlug}`} className="text-xs text-brand-700 hover:underline font-semibold">
                      横浜市{config.wardName}の給湯器交換 →
                    </Link>
                  </li>
                  <li>
                    <Link href="/area/yokohama" className="text-xs text-brand-700 hover:underline font-semibold">
                      横浜市の給湯器交換（全18区対応）→
                    </Link>
                  </li>
                  {config.nearbyStationSlugs.map((ns, i) => (
                    <li key={ns}>
                      <Link href={`/area/yokohama/station/${ns}`} className="text-xs text-brand-700 hover:underline font-semibold">
                        {config.nearbyStationNames[i]}駅周辺 →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">トラブル症状</p>
                <ul className="space-y-1.5">
                  <li>
                    <Link href="/area/yokohama/trouble/no-hot-water" className="text-xs text-brand-700 hover:underline font-semibold">
                      横浜市でお湯が出ない →
                    </Link>
                  </li>
                  <li>
                    <Link href="/area/yokohama/trouble/error-111" className="text-xs text-brand-700 hover:underline font-semibold">
                      横浜市でエラー111 →
                    </Link>
                  </li>
                  <li>
                    <Link href="/area/yokohama/trouble/water-leak" className="text-xs text-brand-700 hover:underline font-semibold">
                      横浜市で水漏れ →
                    </Link>
                  </li>
                  <li>
                    <Link href="/trouble" className="text-xs text-brand-700 hover:underline font-semibold">
                      トラブル症状一覧 →
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">給湯器の基礎知識</p>
                <ul className="space-y-1.5">
                  <li>
                    <Link href="/guide/capacity" className="text-xs text-brand-700 hover:underline font-semibold">
                      号数の選び方 →
                    </Link>
                  </li>
                  <li>
                    <Link href="/guide/eco-jaws" className="text-xs text-brand-700 hover:underline font-semibold">
                      エコジョーズとは →
                    </Link>
                  </li>
                  <li>
                    <Link href="/guide/lifespan" className="text-xs text-brand-700 hover:underline font-semibold">
                      給湯器の寿命 →
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

        {/* 13. FAQ */}
        <section id="faq" className="py-10 bg-gray-50 scroll-mt-24">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">
              {config.name}駅周辺の給湯器交換 よくある質問
            </h2>
            <FaqAccordion faqs={config.faqs} />
          </div>
        </section>

        {/* 14. 最終CTA */}
        <section className="py-14 bg-brand-900 text-white text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-xl font-black mb-2">{config.name}駅周辺の給湯器交換は宝宮設備へ</h2>
            <p className="text-brand-300 text-sm mb-5">
              LINEで写真を送るだけで無料見積もり / 工事費込み価格でご提案
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/estimate" className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-3 rounded-lg transition-colors">
                無料見積もりを依頼する
              </Link>
              <a href={siteConfig.phoneHref} className="bg-white text-gray-900 font-bold px-6 py-3 rounded-lg">
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                LINEで写真相談
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
