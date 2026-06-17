import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import FaqAccordion from '@/components/FaqAccordion'
import { siteConfig } from '@/data/site'
import { wardConfigs } from '@/data/ward-configs'

export const metadata: Metadata = {
  title: '対応エリア一覧｜横浜市・川崎市・厚木市・海老名市の給湯器交換｜株式会社宝宮設備',
  description: '株式会社宝宮設備の対応エリア一覧。横浜市（全18区）・川崎市（全7区）・厚木市・海老名市（神奈川県）に対応。工事費込み価格で無料見積もり受付中。',
  alternates: { canonical: 'https://www.houmiya-boiler.com/area' },
  openGraph: {
    title: '対応エリア一覧｜横浜市・川崎市・厚木市・海老名市の給湯器交換',
    description: '株式会社宝宮設備の対応エリア一覧。横浜市全18区・川崎市全7区・厚木市・海老名市に対応。',
    locale: 'ja_JP',
    type: 'website',
  },
}

const areaCards = [
  {
    slug: 'yokohama',
    name: '横浜市',
    sub: '全18区対応',
    desc: '鶴見区・港北区・青葉区・都筑区など横浜市全18区に対応。戸建て・マンション・PS設置型まで幅広く対応しています。',
    tags: ['全18区対応', 'PS設置型対応', 'エコジョーズ対応'],
    badge: '横浜市最多エリア',
  },
  {
    slug: 'kawasaki',
    name: '川崎市',
    sub: '全7区対応',
    desc: '川崎区・中原区・高津区・宮前区・麻生区など川崎市全7区に対応。マンションPS型から戸建て壁掛型まで対応。',
    tags: ['全7区対応', 'マンション対応', 'PS型実績多数'],
    badge: '',
  },
  {
    slug: 'atsugi',
    name: '厚木市',
    sub: '市内全域対応',
    desc: '本社が厚木市温水西にあり、地域密着で対応しています。最短当日対応が可能な場合もある地元密着エリアです。',
    tags: ['本社所在地', '最速対応', '地域密着'],
    badge: '地元密着エリア',
  },
  {
    slug: 'ebina',
    name: '海老名市',
    sub: '市内全域対応',
    desc: '厚木市から近く迅速に対応。新興住宅地での初回交換から賃貸物件まで幅広く対応しています。',
    tags: ['厚木から近い', '新興住宅対応', '初回交換実績'],
    badge: '',
  },
]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'トップ', item: 'https://www.houmiya-boiler.com' },
    { '@type': 'ListItem', position: 2, name: '対応エリア', item: 'https://www.houmiya-boiler.com/area' },
  ],
}

const areaFeatures = [
  {
    name: '横浜市',
    body: '神奈川県最大の都市で全18区に対応。港北区・神奈川区・西区・中区など駅近エリアはマンションのPS設置型が中心、青葉区・都筑区・戸塚区・旭区など郊外は戸建ての壁掛型・据置型が主流です。住宅タイプに合わせた機種をご提案します。',
  },
  {
    name: '川崎市',
    body: '全7区に対応。中原区の武蔵小杉はタワーマンション群、川崎区・幸区も大型マンションが多くPS設置型が中心です。宮前区・多摩区・麻生区は戸建てが多く、エコジョーズへの省エネ交換のご相談が増えています。',
  },
  {
    name: '厚木市',
    body: '本社（厚木市温水西）がある地元密着エリア。戸建て住宅が多く屋外壁掛型・据置型が中心です。在庫確認・スケジュール調整がスムーズで、市内であれば最短30〜60分程度でお伺いできる場合があり、緊急時も最優先で対応します。',
  },
  {
    name: '海老名市',
    body: '厚木市の拠点から15〜20分程度と近く迅速に対応できるエリア。新興住宅地が多く、購入から10〜15年を迎えた戸建ての初回交換が中心です。ファミリー向けの24号が多く選ばれています。',
  },
]

const installTypeSummary = [
  { type: '屋外壁掛型', feature: '屋外の壁に設置する標準タイプ', home: '戸建て住宅' },
  { type: '据置型', feature: '屋外に据え置くタイプ', home: '戸建て住宅' },
  { type: 'PS標準設置型', feature: 'マンションのPS（パイプシャフト）内に設置', home: 'マンション' },
  { type: 'PS扉内設置型', feature: 'PS扉の内側に収めて設置', home: 'マンション' },
  { type: '屋内設置型', feature: '室内（浴室・洗面所等）に設置', home: '一部マンション・アパート' },
  { type: '給湯専用型', feature: '追い焚きなしの給湯のみタイプ', home: 'アパート・賃貸' },
]

const indexFaqs = [
  { q: '対応エリアはどこですか？', a: '横浜市（全18区）・川崎市（全7区）・厚木市・海老名市（いずれも神奈川県）に対応しています。近隣の神奈川県内エリアも対応できる場合がありますので、まずはお問い合わせください。' },
  { q: '対応エリア外でも相談できますか？', a: '記載のエリア以外でも、神奈川県内の近隣エリアであれば対応できる場合があります。お電話またはLINEでお気軽にお問い合わせください。' },
  { q: '戸建てでもマンションでも対応していますか？', a: 'はい。戸建ての屋外壁掛型・据置型から、マンションのPS設置型、アパートの給湯専用型まで、設置タイプを問わず対応しています。' },
  { q: 'マンションのPS設置型に対応していますか？', a: 'はい。PS標準設置型・PS扉内設置型・PS扉内上方排気型に対応しています。PS扉と本体の写真をお送りいただければ対応可否を確認します。管理規約で機種が指定されている場合は事前にご確認ください。' },
  { q: 'どのメーカーの給湯器に対応していますか？', a: 'リンナイ・ノーリツ・パロマの主要3メーカーに対応しています。現在お使いのメーカーへの同型交換も、別メーカーへの変更も可能です。' },
  { q: '写真だけで見積もりできますか？', a: 'はい。給湯器本体の正面・型番シール・設置状況の写真をLINEまたはフォームでお送りいただければ、概算のお見積もりをご案内できます。' },
  { q: '見積もりは無料ですか？', a: '見積もりは完全無料です。写真確認または現地確認後にお見積もりをご提示し、ご依頼いただかなくても費用はかかりません。' },
  { q: '工事費込みの価格ですか？', a: 'はい。給湯器本体・リモコン・標準工事費を含めた工事費込み価格でご提示しています。設置状況によって追加費用が発生する場合は、工事前に必ずご説明します。' },
  { q: '急な故障にも対応してもらえますか？', a: '在庫・スケジュールの状況によりますが、できる限り迅速に対応します。お湯が出ないなどお急ぎの場合は、まずお電話またはLINEでご連絡ください。' },
  { q: 'エコジョーズへの交換もできますか？', a: 'はい。設置条件が合えば省エネ型のエコジョーズへの交換に対応しています。戸建てはドレン排水の経路を確保しやすく適しています。マンションでは管理規約の確認が必要です。' },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: indexFaqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const yokohamaWardLinks = Object.entries(wardConfigs.yokohama || {}).map(([slug, cfg]) => ({
  slug,
  name: cfg.wardName,
}))
const kawasakiWardLinks = Object.entries(wardConfigs.kawasaki || {}).map(([slug, cfg]) => ({
  slug,
  name: cfg.wardName,
}))

export default function AreaIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main className="pt-[100px]">

        {/* Hero */}
        <section className="bg-brand-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <nav className="flex items-center gap-3 mb-4 text-sm">
              <Link href="/" className="text-blue-200 hover:text-white">トップ</Link>
              <span className="text-blue-400">›</span>
              <span>対応エリア</span>
            </nav>
            <h1 className="text-3xl font-black mb-3">給湯器交換 対応エリア一覧</h1>
            <p className="text-blue-100 text-sm max-w-2xl leading-relaxed">
              株式会社宝宮設備は横浜市・川崎市・厚木市・海老名市（神奈川県）の給湯器交換・販売に対応しています。
              戸建て・マンション・アパートを問わず、リンナイ・ノーリツ・パロマ各メーカーの工事費込み価格で対応します。
            </p>
          </div>
        </section>

        {/* Area Cards */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid sm:grid-cols-2 gap-6">
              {areaCards.map((area) => (
                <Link
                  key={area.slug}
                  href={`/area/${area.slug}`}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-blue-200 transition-all group"
                >
                  {area.badge && (
                    <span className="inline-block text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 mb-3">
                      {area.badge}
                    </span>
                  )}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-2xl font-black text-gray-900">{area.name}</div>
                      <div className="text-sm text-brand-600 font-bold mt-0.5">{area.sub}</div>
                    </div>
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-brand-600 transition-colors mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{area.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {area.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">{tag}</span>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-brand-700 group-hover:text-brand-900">
                    {area.name}の詳細を見る →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 対応エリアの特徴 */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">対応エリアの特徴</h2>
            <p className="text-sm text-gray-500 mb-6">各エリアの住宅傾向に合わせて、最適な給湯器・設置タイプをご提案します。</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {areaFeatures.map((area) => (
                <div key={area.name} className="border border-gray-200 rounded-xl p-6">
                  <h3 className="font-black text-gray-900 text-base mb-2">{area.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{area.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 区別リンク */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">区から対応エリアを探す</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-black text-gray-900 text-base">横浜市</h3>
                  <Link href="/area/yokohama" className="text-xs font-bold text-brand-700 hover:underline">横浜市全体を見る →</Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {yokohamaWardLinks.map((w) => (
                    <Link
                      key={w.slug}
                      href={`/area/yokohama/${w.slug}`}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-brand-700 transition-colors text-center"
                    >
                      {w.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-black text-gray-900 text-base">川崎市</h3>
                  <Link href="/area/kawasaki" className="text-xs font-bold text-brand-700 hover:underline">川崎市全体を見る →</Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {kawasakiWardLinks.map((w) => (
                    <Link
                      key={w.slug}
                      href={`/area/kawasaki/${w.slug}`}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-brand-700 transition-colors text-center"
                    >
                      {w.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 対応できる設置タイプ */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">対応できる給湯器の設置タイプ</h2>
            <p className="text-sm text-gray-500 mb-6">戸建て・マンション・アパートのいずれの設置タイプにも対応しています。</p>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-900 text-white">
                    <th className="px-4 py-3 text-left font-bold">設置タイプ</th>
                    <th className="px-4 py-3 text-left font-bold">特徴</th>
                    <th className="px-4 py-3 text-left font-bold">多い住宅</th>
                  </tr>
                </thead>
                <tbody>
                  {installTypeSummary.map((row, i) => (
                    <tr key={row.type} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-bold text-gray-800">{row.type}</td>
                      <td className="px-4 py-3 text-gray-600">{row.feature}</td>
                      <td className="px-4 py-3 text-gray-500">{row.home}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* よくある質問 */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">対応エリアについて よくあるご質問</h2>
            <FaqAccordion faqs={indexFaqs} />
          </div>
        </section>

        {/* 近隣エリア */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
              <h2 className="text-lg font-black text-gray-900 mb-2">上記以外のエリアもご相談ください</h2>
              <p className="text-sm text-gray-600 mb-5">神奈川県内の近隣エリアも対応できる場合があります。お気軽にお電話またはLINEでお問い合わせください。</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a href={siteConfig.phoneHref} className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black px-6 py-3 rounded-lg transition-colors">
                  {siteConfig.phone}
                </a>
                <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-white font-bold px-6 py-3 rounded-lg transition-colors" style={{ backgroundColor: '#00B900' }}>
                  LINEで相談する
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-brand-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-black mb-2">給湯器交換のご相談はお気軽に</h2>
            <p className="text-blue-200 text-sm mb-6">横浜市・川崎市・厚木市・海老名市の給湯器交換は宝宮設備にお任せください。無料見積もり受付中。</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/estimate" className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-lg px-8 py-4 rounded-lg transition-colors w-full sm:w-auto justify-center">
                無料見積もりを依頼する
              </Link>
              <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-bold text-base px-6 py-4 rounded-lg transition-colors w-full sm:w-auto justify-center" style={{ backgroundColor: '#00B900' }}>
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
