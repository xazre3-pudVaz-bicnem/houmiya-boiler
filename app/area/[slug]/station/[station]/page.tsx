import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import FaqAccordion from '@/components/FaqAccordion'
import { siteConfig } from '@/data/site'
import { yokohamaStations, allYokohamaStations } from '@/data/yokohama-stations'

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

const capacityRows = [
  { go: '16号', family: '一人暮らし向け', use: 'シャワー中心・同時使用が少ない' },
  { go: '20号', family: '2〜3人家族向け', use: 'キッチンとシャワーを順番に使う' },
  { go: '24号', family: '4人以上の家族向け', use: 'お風呂とキッチンの同時使用が多い' },
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

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${stationTitle}の給湯器交換・販売`,
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
    areaServed: { '@type': 'Place', name: `${config.name}駅周辺（横浜市${config.wardName}）` },
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
      { '@type': 'ListItem', position: 4, name: `${config.name}駅周辺`, item: config.canonical },
    ],
  }

  const toc = [
    { id: 'st-area', label: `${config.name}駅周辺の住宅事情` },
    { id: 'st-installtype', label: `${config.name}駅周辺で多い設置タイプ` },
    { id: 'st-capacity', label: '号数（16号・20号・24号）の選び方' },
    { id: 'st-eco', label: 'エコジョーズへの交換' },
    { id: 'st-photo', label: '写真見積もりの進め方' },
    { id: 'st-cost', label: '工事費込み価格について' },
    { id: 'st-faq', label: 'よくある質問' },
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
              <Link href={`/area/yokohama/${config.wardSlug}`} className="text-blue-200 hover:text-white">
                {config.wardName}
              </Link>
              <span className="text-blue-400">›</span>
              <span>{config.name}駅周辺</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-black mb-3 leading-snug">
              {config.name}駅周辺の給湯器交換・販売
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {config.lines.map((line) => (
                <span key={line} className="text-xs bg-white/15 rounded-full px-3 py-1 text-blue-100">
                  {line}
                </span>
              ))}
            </div>
            <p className="text-blue-100 text-sm mb-5 max-w-2xl leading-relaxed">
              {config.name}駅周辺の給湯器交換なら株式会社宝宮設備。横浜市{config.wardName}全域対応。
              マンション・戸建て・PS設置型・エコジョーズ対応。工事費込み価格で無料見積もり受付中。
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
              {config.name}駅周辺での給湯器交換について
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-gray-700 text-sm leading-relaxed">{config.intro}</p>
            </div>
          </div>
        </section>

        {/* 住宅事情（areaDesc） */}
        <section id="st-area" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.name}駅周辺の住宅事情</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">{config.areaDesc}</p>
            </div>
          </div>
        </section>

        {/* 設置タイプ */}
        <section id="st-installtype" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">
              {config.name}駅周辺で多い設置タイプ
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">{config.installTypeNote}</p>
            </div>
          </div>
        </section>

        {/* 号数の選び方 */}
        <section id="st-capacity" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
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

        {/* エコジョーズ */}
        <section id="st-eco" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">
              {config.name}駅周辺でエコジョーズに交換する
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">
                エコジョーズは排気熱を再利用する熱効率95%以上の省エネ型給湯器で、従来型と比べてガス代を約10〜15%削減できる場合があります。
                {config.housingType === 'detached'
                  ? `${config.name}駅周辺の戸建ては、運転時に発生する凝縮水（ドレン排水）の経路を確保しやすいため、エコジョーズへの交換に適したケースが多くなっています。お湯の使用量が多いご家庭ほど省エネ効果が大きくなります。`
                  : config.housingType === 'mansion'
                    ? `${config.name}駅周辺のマンションでエコジョーズへ交換する場合は、運転時に発生する凝縮水（ドレン排水）の処理について管理規約で取り扱いが定められていることがあるため、事前の確認が必要です。現在の機種がエコジョーズかどうか、ドレン排水口の有無もあわせて確認します。`
                    : `${config.name}駅周辺は戸建てとマンションが混在するため、住宅タイプによって設置条件が変わります。戸建てではドレン排水の経路を確保しやすく交換しやすい一方、マンションでは排水処理について管理規約の確認が必要な場合があります。`}
                設置可否はドレン排水の確認後にご案内します。
              </p>
              <div className="mt-4">
                <Link href="/guide/eco-jaws" className="text-sm font-bold text-brand-700 hover:underline">
                  エコジョーズとは 詳しく見る →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 写真見積もり */}
        <section id="st-photo" className="py-10 bg-white scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">
              {config.name}駅周辺での写真見積もりの進め方
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              以下の写真をLINEまたはフォームでお送りいただければ、概算見積もりをご案内します。
            </p>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <ul className="space-y-2">
                {[
                  '給湯器本体の正面全体',
                  '側面・背面の型番シール',
                  '設置場所周辺の状況（配管など）',
                  config.housingType === 'mansion' || config.housingType === 'mixed'
                    ? 'マンションの場合はPS扉を開けた状態'
                    : '屋外設置の場合は本体の周辺スペース',
                  'エラー表示がある場合はリモコンの画面',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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

        {/* 工事費込み */}
        <section id="st-cost" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">
              {config.name}駅周辺での給湯器交換費用について
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
          </div>
        </section>

        {/* 中間CTA */}
        <section className="py-10 bg-brand-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-xl font-black mb-2">{config.name}駅周辺の給湯器交換はお任せください</h2>
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

        {/* FAQ */}
        <section id="st-faq" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">
              {config.name}駅周辺の給湯器交換 よくある質問
            </h2>
            <FaqAccordion faqs={config.faqs} />
          </div>
        </section>

        {/* 関連ページ */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-base font-black text-gray-900 mb-5">関連ページ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">横浜市{config.wardName}</p>
                <ul className="space-y-1.5">
                  <li>
                    <Link href={`/area/yokohama/${config.wardSlug}`} className="text-xs text-brand-700 hover:underline font-semibold">
                      横浜市{config.wardName}の給湯器交換を見る →
                    </Link>
                  </li>
                  <li>
                    <Link href="/area/yokohama" className="text-xs text-brand-700 hover:underline font-semibold">
                      横浜市の給湯器交換（全18区対応）→
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">トラブル症状</p>
                <ul className="space-y-1.5">
                  <li>
                    <Link href="/area/yokohama/no-hot-water" className="text-xs text-brand-700 hover:underline font-semibold">
                      横浜市でお湯が出ない →
                    </Link>
                  </li>
                  <li>
                    <Link href="/area/yokohama/error-111" className="text-xs text-brand-700 hover:underline font-semibold">
                      横浜市でエラー111 →
                    </Link>
                  </li>
                  <li>
                    <Link href="/area/yokohama/water-leak" className="text-xs text-brand-700 hover:underline font-semibold">
                      横浜市で水漏れ →
                    </Link>
                  </li>
                  <li>
                    <Link href="/trouble" className="text-xs text-brand-700 hover:underline font-semibold">
                      給湯器トラブル一覧 →
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">設置タイプ・給湯器情報</p>
                <ul className="space-y-1.5">
                  <li>
                    <Link href="/area/yokohama/mansion-ps" className="text-xs text-brand-700 hover:underline font-semibold">
                      横浜市マンションPS設置型 →
                    </Link>
                  </li>
                  <li>
                    <Link href="/area/yokohama/eco-jaws" className="text-xs text-brand-700 hover:underline font-semibold">
                      横浜市エコジョーズ交換 →
                    </Link>
                  </li>
                  <li>
                    <Link href="/guide/capacity" className="text-xs text-brand-700 hover:underline font-semibold">
                      号数の選び方 →
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

        {/* 末尾CTA */}
        <section className="py-12 bg-brand-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-black mb-2">{config.name}駅周辺の給湯器交換はお任せください</h2>
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
