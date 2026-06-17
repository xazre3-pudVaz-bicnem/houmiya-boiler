import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import { siteConfig } from '@/data/site'

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

export default function AreaIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
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
