import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import { siteConfig } from '@/data/site'
import { guidesData } from '@/data/guides'

const BASE_URL = 'https://www.houmiya-boiler.com'

export const metadata: Metadata = {
  title: '給湯器の基礎知識・選び方ガイド一覧｜号数・エコジョーズ・寿命・型番｜宝宮設備',
  description:
    '給湯器の基礎知識・選び方ガイド一覧。号数（16号・20号・24号）の選び方、エコジョーズとは、オートとフルオートの違い、型番の見方、エラーコード、寿命・交換時期まで。横浜市・川崎市・厚木市・海老名市の給湯器交換なら宝宮設備。',
  alternates: { canonical: `${BASE_URL}/guide` },
  openGraph: {
    title: '給湯器の基礎知識・選び方ガイド一覧｜宝宮設備',
    description:
      '給湯器の号数・エコジョーズ・オートとフルオート・型番・エラーコード・寿命など、給湯器交換の前に知っておきたい基礎知識をまとめました。',
    locale: 'ja_JP',
    type: 'website',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'トップ', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: '給湯器の基礎知識', item: `${BASE_URL}/guide` },
  ],
}

const categoryDescriptions: { name: string; desc: string }[] = [
  { name: '選び方', desc: '号数やオート・フルオートなど、ご家庭に合った給湯器を選ぶための基礎知識です。' },
  { name: '種類', desc: 'エコジョーズなど給湯器の種類ごとの特徴・メリット・デメリットを解説します。' },
  { name: '基礎知識', desc: '型番の見方や設置タイプ・カラーなど、交換前に知っておきたい基本情報です。' },
  { name: 'トラブル', desc: 'エラーコードや寿命のサインなど、故障・交換時期の判断に役立つ知識です。' },
]

export default function GuideIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main className="pt-[100px]">

        {/* Hero */}
        <section className="bg-brand-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <nav className="flex items-center gap-3 mb-4 text-sm" aria-label="パンくずリスト">
              <Link href="/" className="text-blue-200 hover:text-white">トップ</Link>
              <span className="text-blue-400">›</span>
              <span>給湯器の基礎知識</span>
            </nav>
            <h1 className="text-3xl font-black mb-3">給湯器の基礎知識・選び方ガイド</h1>
            <p className="text-blue-100 text-sm max-w-2xl leading-relaxed">
              給湯器の交換を検討する前に知っておきたい基礎知識をまとめました。号数の選び方、エコジョーズの仕組み、オートとフルオートの違い、型番の見方、エラーコード、寿命・交換時期など、
              はじめての方にもわかりやすく解説しています。横浜市・川崎市・厚木市・海老名市の給湯器交換は株式会社宝宮設備にお任せください。
            </p>
          </div>
        </section>

        {/* リード文 */}
        <section className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                給湯器は10年前後で交換の時期を迎える住宅設備です。いざ交換となったとき、号数や設置タイプ、オート・フルオートの違いといった基本を知っておくと、ご家庭に合った機種をスムーズに選べます。
                また、お湯が出ない・エラーコードが出るといったトラブルの際も、原因の目安や修理・交換の判断基準を知っておくことで落ち着いて対応できます。
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                このページでは、給湯器交換でよく質問される項目を「選び方」「種類」「基礎知識」「トラブル」のカテゴリ別にまとめています。
                それぞれの記事では比較表やチェックリスト、よくある質問も掲載していますので、気になる項目からご覧ください。型番が読めない・どれを選べばよいか分からない場合は、給湯器の写真をLINEでお送りいただくだけでもご相談いただけます。
              </p>
            </div>
          </div>
        </section>

        {/* カテゴリ説明 */}
        <section className="py-6 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categoryDescriptions.map((c) => (
                <div key={c.name} className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="font-black text-gray-900 text-sm mb-1">{c.name}</div>
                  <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ガイド一覧 */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">基礎知識ガイド一覧</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {guidesData.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guide/${g.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-200 transition-all group flex flex-col"
                >
                  <span className="inline-block text-xs font-bold text-brand-700 bg-blue-50 border border-blue-200 rounded-full px-2.5 py-0.5 mb-2 w-fit">
                    {g.category}
                  </span>
                  <div className="font-black text-gray-900 text-base mb-2 group-hover:text-brand-700 leading-snug">
                    {g.title.split('｜')[0]}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-3 flex-1">
                    {g.description}
                  </p>
                  <span className="text-xs font-bold text-brand-700">詳しく見る →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 関連ページ */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-base font-black text-gray-700 mb-4">関連ページ</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                { href: '/trouble', label: '給湯器のトラブル症状一覧' },
                { href: '/area', label: '対応エリア一覧' },
                { href: '/products', label: '給湯器の商品一覧' },
                { href: '/cases', label: '施工事例一覧' },
                { href: '/estimate', label: '無料見積もり' },
                { href: '/blog', label: '給湯器コラム' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-brand-700 transition-colors text-center">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-brand-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-black mb-2">給湯器選びで迷ったらご相談ください</h2>
            <p className="text-blue-200 text-sm mb-6">
              横浜市・川崎市・厚木市・海老名市対応。給湯器の写真を送るだけで概算見積もりが可能です。無料見積もり受付中。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/estimate" className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-lg px-8 py-4 rounded-lg transition-colors w-full sm:w-auto justify-center">
                無料見積もりを依頼する
              </Link>
              <a href={siteConfig.phoneHref} className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-black text-lg px-8 py-4 rounded-lg transition-colors w-full sm:w-auto justify-center">
                {siteConfig.phone}
              </a>
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
