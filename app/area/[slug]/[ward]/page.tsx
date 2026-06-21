import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import FaqAccordion from '@/components/FaqAccordion'
import ProductCard from '@/components/ProductCard'
import { getProductsByMaker, productsData, formatPrice } from '@/data/products'
import { casesData } from '@/data/cases'
import { siteConfig } from '@/data/site'
import { wardConfigs, allWards, type WardConfig } from '@/data/ward-configs'
import { yokohamaStations } from '@/data/yokohama-stations'
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

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    telephone: siteConfig.phone,
    url: 'https://www.houmiya-boiler.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '温水西1-4-39',
      addressLocality: '厚木市',
      addressRegion: '神奈川県',
      postalCode: '243-0032',
      addressCountry: 'JP',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: fullName,
    },
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
      {
        '@type': 'ListItem',
        position: 3,
        name: `${config.cityName}の給湯器交換`,
        item: `https://www.houmiya-boiler.com/area/${config.citySlug}`,
      },
      { '@type': 'ListItem', position: 4, name: `${fullName}の給湯器交換`, item: config.canonical },
    ],
  }

  // 推奨商品（products.tsから取得 / ハードコード禁止）
  const wardProducts = config.recommendedProductSlugs
    .map((s) => productsData.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  // 施工事例（wardSlug一致を優先、なければ市内事例）
  const wardCases = casesData.filter((c) => c.wardSlug === config.wardSlug)
  const displayCases =
    wardCases.length > 0
      ? wardCases
      : casesData.filter((c) => c.areaSlug === config.citySlug).slice(0, 4)

  // 近隣区（同一市のwardConfigsから名称解決）
  const nearbyWards = config.nearbyWardSlugs
    .map((ws) => {
      const c = wardConfigs[config.citySlug]?.[ws]
      return c ? { slug: ws, name: `${c.cityName}${c.wardName}` } : null
    })
    .filter((x): x is { slug: string; name: string } => Boolean(x))

  const troubleHref = (s: string) =>
    config.citySlug === 'yokohama' ? `/area/yokohama/${s}` : `/trouble/${s}`

  const toc = [
    { id: 'intro', label: `${config.wardName}で給湯器交換を検討の方へ` },
    { id: 'housing', label: '住宅タイプ別ガイド' },
    { id: 'install-type', label: '多い設置タイプ' },
    { id: 'capacity', label: '号数の選び方' },
    { id: 'makers', label: '対応メーカー・商品' },
    { id: 'trouble', label: 'よくある症状' },
    { id: 'repair', label: '修理と交換の判断' },
    { id: 'estimate', label: '写真見積もり' },
    { id: 'workflow', label: '工事の流れ' },
    { id: 'cases', label: '施工事例' },
    { id: 'faq', label: 'よくある質問' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
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
        <nav className="bg-gray-50 border-b border-gray-200" aria-label="パンくずリスト">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2 text-xs text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-brand-700">トップ</Link>
            <span>›</span>
            <Link href="/area" className="hover:text-brand-700">対応エリア</Link>
            <span>›</span>
            <Link href={`/area/${config.citySlug}`} className="hover:text-brand-700">{config.cityName}</Link>
            <span>›</span>
            <span className="text-gray-700 font-semibold">{config.wardName}</span>
          </div>
        </nav>

        {/* 2. ファーストビュー */}
        <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-black mb-4">{fullName}の給湯器交換・販売</h1>
            <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">{config.wardCharacter}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/estimate" className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-3 rounded-lg text-center transition-colors">
                無料見積もりを依頼する
              </Link>
              <a href={siteConfig.phoneHref} className="bg-white text-gray-900 font-bold px-6 py-3 rounded-lg text-center hover:bg-gray-100 transition-colors">
                {siteConfig.phone}
              </a>
              <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className="text-white font-bold px-6 py-3 rounded-lg text-center transition-colors" style={{ backgroundColor: '#00B900' }}>
                LINEで写真相談
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-4">写真を送るだけで無料見積もり可能 / 工事費込み価格でご提案</p>
          </div>
        </section>

        {/* 3. 目次 */}
        <nav className="bg-brand-50 border-b border-brand-100 py-3">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-brand-700 font-semibold">
              {toc.map((t) => (
                <a key={t.id} href={`#${t.id}`} className="hover:underline">{t.label}</a>
              ))}
            </div>
          </div>
        </nav>

        {/* 4. この区で給湯器交換を検討している方へ（uniqueBody + intro） */}
        <section id="intro" className="py-12 bg-white scroll-mt-28">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-6">
              {config.wardName}で給湯器交換を検討している方へ
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">{config.intro1}</p>
              <p className="text-gray-700 leading-relaxed">{config.intro2}</p>
              {config.uniqueBody.split('\n').map((para, i) => (
                <p key={i} className="text-gray-700 leading-relaxed">{para}</p>
              ))}
              <p className="text-gray-700 leading-relaxed">{config.introBody}</p>
            </div>
          </div>
        </section>

        {/* 5. 住宅タイプ別ガイド */}
        <section id="housing" className="py-12 bg-gray-50 scroll-mt-28">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-6">{config.wardName}で多い住宅タイプと給湯器交換</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(config.housingType === 'detached' || config.housingType === 'mixed') && (
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="font-black text-gray-900 mb-3">戸建て住宅</h3>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">{config.detachedNote || `${fullName}の戸建てでは屋外壁掛け型・据置型が中心です。号数アップやエコジョーズへの交換にも対応します。`}</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>・屋外壁掛け型が主流</li>
                    <li>・号数アップ（24号）の対応可</li>
                    <li>・エコジョーズへの切り替え可</li>
                    <li>・据置型→壁掛型への変更も相談可</li>
                  </ul>
                </div>
              )}
              {(config.housingType === 'mansion' || config.housingType === 'mixed') && (
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="font-black text-gray-900 mb-3">マンション・集合住宅</h3>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">{config.mansionNote || `${fullName}のマンションではPS設置型が中心です。管理規約・設置寸法の確認のうえ機種を選定します。`}</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>・PS設置型・PS扉内設置型に対応</li>
                    <li>・管理組合への届出サポート</li>
                    <li>・マンション規約の確認サポート</li>
                    <li>・20号・フルオートが主流</li>
                  </ul>
                </div>
              )}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-black text-gray-900 mb-3">アパート・賃貸物件</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">{config.rentalNote || `${fullName}の賃貸物件の給湯器交換では、大家様・管理会社様からのご依頼にも対応しています。`}</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>・大家・管理会社様からのご依頼対応</li>
                  <li>・賃借人がいる状態での工事も可</li>
                  <li>・複数物件の一括管理も相談可</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 6. この区で多い設置タイプ */}
        <section id="install-type" className="py-12 bg-white scroll-mt-28">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-4">{config.wardName}で多い給湯器の設置タイプ</h2>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">{config.installTypeNote}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {config.installTypeSection.map((it) => (
                <div key={it.title} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <h3 className="font-black text-gray-900 mb-2 text-sm">{it.title}</h3>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">{it.desc}</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {it.items.map((item) => (
                      <li key={item}>・{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-brand-700 text-white">
                  <tr>
                    <th scope="col" className="p-3 text-left border border-brand-600">設置タイプ</th>
                    <th scope="col" className="p-3 text-left border border-brand-600">多い住宅</th>
                    <th scope="col" className="p-3 text-left border border-brand-600">交換時の注意点</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['屋外壁掛け型', '戸建て住宅', '給排気口・配管の状態確認が必要'],
                    ['マンションPS設置型', 'マンション・大型集合住宅', '管理規約・設置寸法の確認が必要'],
                    ['PS扉内設置型', '中〜大型マンション', '扉内スペースの寸法確認が重要'],
                    ['屋外据置型', '戸建て・ベランダスペースがある住宅', '給水・給湯配管の位置確認'],
                    ['エコジョーズ', '全住宅タイプ（ドレン排水可能な場合）', 'ドレン排水先の確保が必要'],
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {row.map((cell, j) => (
                        <td key={j} className="p-3 border border-gray-200 text-sm">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 7. 号数の選び方 */}
        <section id="capacity" className="py-12 bg-gray-50 scroll-mt-28">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-4">{config.wardName}での号数の選び方</h2>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">{config.capacitySection}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th scope="col" className="p-3 text-left border border-gray-600">項目</th>
                    <th scope="col" className="p-3 text-center border border-gray-600">16号</th>
                    <th scope="col" className="p-3 text-center border border-gray-600">20号</th>
                    <th scope="col" className="p-3 text-center border border-gray-600">24号</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['目安の家族構成', '1〜2人', '2〜3人', '4人以上'],
                    ['シャワーとキッチン同時使用', '不向き', '△ 場合による', '○ 対応可'],
                    ['追い焚き', '可能', '可能', '可能'],
                    ['向いている住宅', '単身・1LDK', 'ファミリー向けマンション', '戸建て・大型住宅'],
                    ['号数アップ時の注意', '—', 'ガス供給量の確認', 'ガス供給量・配管径の確認'],
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 border border-gray-200 font-semibold text-gray-700">{row[0]}</td>
                      <td className="p-3 border border-gray-200 text-center">{row[1]}</td>
                      <td className="p-3 border border-gray-200 text-center">{row[2]}</td>
                      <td className="p-3 border border-gray-200 text-center">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link href="/guide/capacity" className="text-sm font-bold text-brand-700 hover:underline mt-4 inline-block">
              号数の選び方を詳しく見る →
            </Link>
          </div>
        </section>

        {/* 8. 対応メーカー + 商品カード */}
        <section id="makers" className="py-12 bg-white scroll-mt-28">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-6">対応メーカーとおすすめ商品</h2>
            {wardProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {wardProducts.map((product) => (
                  <Link href={`/products/${product.slug}`} key={product.slug}>
                    <div className="border border-gray-200 rounded-xl p-4 hover:border-brand-400 transition-colors h-full">
                      <p className="text-xs text-gray-500 mb-1">{product.makerLabel} / {product.capacity}号 / {product.typeLabel}</p>
                      <p className="font-bold text-sm text-gray-900 mb-2">{product.model}</p>
                      <p className="text-brand-700 font-black text-lg">{formatPrice(product.totalInTax)}円</p>
                      <p className="text-xs text-gray-400">税込・工事費込み</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="text-sm text-brand-700 font-bold hover:underline">全商品一覧を見る →</Link>
              <Link href="/rinnai" className="text-sm text-brand-700 font-bold hover:underline">リンナイ製品一覧 →</Link>
              <Link href="/noritz" className="text-sm text-brand-700 font-bold hover:underline">ノーリツ製品一覧 →</Link>
              <Link href="/paloma" className="text-sm text-brand-700 font-bold hover:underline">パロマ製品一覧 →</Link>
            </div>
          </div>
        </section>

        {/* 9. よくある症状 */}
        <section id="trouble" className="py-12 bg-gray-50 scroll-mt-28">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-4">{config.wardName}でよくある給湯器のトラブル症状</h2>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">{config.troubleNote}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { symptom: 'お湯が出ない', href: troubleHref('no-hot-water'), desc: 'ガスの供給・点火・水圧など複数の原因が考えられます。まずエラーコードを確認してください。' },
                { symptom: 'エラー111が出ている', href: troubleHref('error-111'), desc: '点火不良を示すコードです。ガス栓の確認・リセット操作をお試しください。' },
                { symptom: '水漏れがある', href: troubleHref('water-leak'), desc: '本体からの水漏れは感電の危険があります。すぐに電源を切り専門業者にご連絡ください。' },
                { symptom: '追い焚きができない', href: '/trouble/no-reheating', desc: '循環ポンプや熱交換器の不具合が考えられます。10年以上使用の場合は交換を検討してください。' },
                { symptom: '温度が安定しない', href: '/trouble', desc: '水量・ガス圧・センサーの不具合が原因の場合が多いです。' },
                { symptom: '10年以上使用している', href: '/guide/lifespan', desc: '給湯器の一般的な耐用年数は10〜15年。故障前の予防交換をおすすめします。' },
              ].map((t) => (
                <Link href={t.href} key={t.symptom}>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-red-200 transition-colors h-full">
                    <p className="font-black text-red-700 mb-1">{t.symptom}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{t.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/trouble" className="text-sm text-brand-700 font-bold hover:underline mt-4 inline-block">トラブル症状一覧を見る →</Link>
          </div>
        </section>

        {/* 10. 修理 vs 交換の判断 */}
        <section id="repair" className="py-12 bg-white scroll-mt-28">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-6">修理と交換の判断基準</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    <th scope="col" className="p-3 bg-blue-50 text-blue-800 border border-blue-200 text-left">修理で対応できるケース</th>
                    <th scope="col" className="p-3 bg-red-50 text-red-800 border border-red-200 text-left">交換を検討したほうがよいケース</th>
                  </tr>
                </thead>
                <tbody>
                  {config.repairReplaceSection.repairOk.map((repairItem, i) => (
                    <tr key={i} className={i % 2 === 0 ? '' : 'bg-gray-50'}>
                      <td className="p-3 border border-gray-200">{repairItem}</td>
                      <td className="p-3 border border-gray-200">{config.repairReplaceSection.replaceRecommended[i]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 中間CTA */}
        <section className="py-10 bg-brand-900 text-white text-center">
          <p className="text-xl font-black mb-2">{fullName}の給湯器交換・無料見積もり</p>
          <p className="text-brand-300 text-sm mb-6">LINEで写真を送るだけで見積もりできます</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 px-4">
            <Link href="/estimate" className="bg-red-600 hover:bg-red-700 text-white font-black px-8 py-3 rounded-lg transition-colors">無料見積もりを依頼する</Link>
            <a href={siteConfig.phoneHref} className="bg-white text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">{siteConfig.phone}</a>
            <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className="text-white font-bold px-8 py-3 rounded-lg transition-colors" style={{ backgroundColor: '#00B900' }}>LINEで写真相談</a>
          </div>
        </section>

        {/* 11. 写真見積もりの流れ */}
        <section id="estimate" className="py-12 bg-gray-50 scroll-mt-28">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-4">写真見積もりで送る写真</h2>
            <p className="text-gray-600 text-sm mb-6">以下の写真をLINEまたはフォームでお送りいただければ、{config.wardName}内であれば概算見積もりをご案内します。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {config.photoEstimateSection[0].photos.map((photo) => (
                <div key={photo} className="flex gap-3 bg-white border border-gray-200 rounded-xl p-4">
                  <span className="text-brand-700 font-black text-lg">◆</span>
                  <p className="font-bold text-gray-900 text-sm leading-relaxed">{photo}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <p className="font-black text-green-800 mb-2">LINEで写真を送るだけで無料見積もり</p>
              <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-bold px-6 py-3 rounded-lg transition-colors" style={{ backgroundColor: '#00B900' }}>
                LINEで写真を送る
              </a>
            </div>
          </div>
        </section>

        {/* 12. 工事の流れ */}
        <section id="workflow" className="py-12 bg-white scroll-mt-28">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-6">工事当日の流れ</h2>
            <div className="relative">
              {config.workflowSection.map((s) => (
                <div key={s.step} className="flex gap-4 mb-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-brand-700 text-white rounded-full flex items-center justify-center font-black text-sm">
                    {s.step}
                  </div>
                  <div>
                    <p className="font-black text-gray-900">{s.title}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 13. 施工事例 */}
        <section id="cases" className="py-12 bg-gray-50 scroll-mt-28">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-6">{fullName}周辺の施工事例</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {displayCases.slice(0, 4).map((c) => (
                <Link href={`/cases/${c.slug}`} key={c.id}>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-brand-400 transition-colors h-full">
                    <p className="text-xs text-gray-500 mb-1">{c.date} / {c.area}</p>
                    <p className="font-bold text-sm">{c.buildingType} / {c.installationType}</p>
                    <p className="text-xs text-gray-600 mt-1">{c.beforeModel} → {c.afterModel}</p>
                    <p className="text-xs text-gray-400 mt-1">{c.maker} / {c.capacity}号 / {c.duration}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/cases" className="text-sm text-brand-700 font-bold hover:underline mt-4 inline-block">施工事例一覧を見る →</Link>
          </div>
        </section>

        {/* 14. 既存セクション（sectionsデータ） */}
        {config.sections && config.sections.length > 0 && (
          <section className="py-12 bg-white">
            <div className="max-w-5xl mx-auto px-4 space-y-6">
              <h2 className="text-2xl font-black text-gray-900 mb-2">{config.wardName}の給湯器交換 詳しく解説</h2>
              {config.sections.map((section, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-black text-gray-900 mb-3">{section.heading}</h3>
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
                              <th key={j} scope="col" className="text-left px-4 py-2.5 font-bold text-xs">{h}</th>
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
              ))}
            </div>
          </section>
        )}

        {/* 15. 関連内部リンク */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">関連ページ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">近隣の区ページ</p>
                <ul className="space-y-1.5">
                  {nearbyWards.slice(0, 4).map((nw) => (
                    <li key={nw.slug}>
                      <Link href={`/area/${config.citySlug}/${nw.slug}`} className="text-xs text-brand-700 hover:underline font-semibold">
                        {nw.name}の給湯器交換 →
                      </Link>
                    </li>
                  ))}
                  <li><Link href={`/area/${config.citySlug}`} className="text-xs text-brand-700 hover:underline font-semibold">{config.cityName}の全区を見る →</Link></li>
                </ul>
              </div>
              {config.citySlug === 'yokohama' && config.stationPageSlugs.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-gray-500 mb-2">{config.wardName}の駅周辺</p>
                  <ul className="space-y-1.5">
                    {config.stationPageSlugs.filter(ss => yokohamaStations[ss]).slice(0, 4).map((ss) => (
                      <li key={ss}>
                        <Link href={`/area/yokohama/station/${ss}`} className="text-xs text-brand-700 hover:underline font-semibold">
                          {yokohamaStations[ss].name}駅周辺の給湯器交換 →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">トラブル症状</p>
                <ul className="space-y-1.5">
                  <li><Link href={troubleHref('no-hot-water')} className="text-xs text-brand-700 hover:underline font-semibold">お湯が出ない →</Link></li>
                  <li><Link href={troubleHref('error-111')} className="text-xs text-brand-700 hover:underline font-semibold">エラー111 →</Link></li>
                  <li><Link href={troubleHref('water-leak')} className="text-xs text-brand-700 hover:underline font-semibold">水漏れ →</Link></li>
                  <li><Link href="/trouble" className="text-xs text-brand-700 hover:underline font-semibold">トラブル一覧 →</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">給湯器の基礎知識</p>
                <ul className="space-y-1.5">
                  <li><Link href="/guide/capacity" className="text-xs text-brand-700 hover:underline font-semibold">号数の選び方 →</Link></li>
                  <li><Link href="/guide/eco-jaws" className="text-xs text-brand-700 hover:underline font-semibold">エコジョーズとは →</Link></li>
                  <li><Link href="/guide/lifespan" className="text-xs text-brand-700 hover:underline font-semibold">給湯器の寿命 →</Link></li>
                  <li><Link href="/guide/full-auto-auto" className="text-xs text-brand-700 hover:underline font-semibold">フルオートとオートの違い →</Link></li>
                  <li><Link href="/estimate" className="text-xs text-brand-700 hover:underline font-semibold">無料見積もりを依頼する →</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 16. FAQ（拡張版） */}
        <section id="faq" className="py-12 bg-white scroll-mt-28">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-6">{config.wardName}の給湯器交換 よくある質問</h2>
            <FaqAccordion faqs={config.faqs} />
          </div>
        </section>

        {/* 17. 最終CTA */}
        <section className="py-16 bg-brand-900 text-white text-center">
          <h2 className="text-2xl font-black mb-2 px-4">{fullName}の給湯器交換は{siteConfig.name}へ</h2>
          <p className="text-brand-300 mb-6 px-4">LINEで写真を送るだけで無料見積もり / 工事費込み価格でご提案</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 px-4">
            <Link href="/estimate" className="bg-red-600 hover:bg-red-700 text-white font-black px-8 py-3 rounded-lg transition-colors">無料見積もりを依頼する</Link>
            <a href={siteConfig.phoneHref} className="bg-white text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">{siteConfig.phone}</a>
            <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className="text-white font-bold px-8 py-3 rounded-lg transition-colors" style={{ backgroundColor: '#00B900' }}>LINEで写真相談</a>
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
