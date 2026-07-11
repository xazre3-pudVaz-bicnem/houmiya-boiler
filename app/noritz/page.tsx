import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import ProductCard from '@/components/ProductCard'
import CapacityGuide from '@/components/CapacityGuide'
import FaqAccordion from '@/components/FaqAccordion'
import { getProductsByMaker, constructionFeeItems, additionalFeeItems } from '@/data/products'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: 'ノーリツ給湯器の交換・販売｜横浜市・川崎市・厚木市・海老名市｜宝宮設備',
  description:
    'ノーリツ給湯器（ユコアGT-70シリーズ）の交換・販売なら宝宮設備。横浜市・川崎市・厚木市・海老名市対応。工事費込み価格。無料見積もり受付中。',
  alternates: { canonical: 'https://www.houmiya-boiler.com/noritz' },
  openGraph: {
    title: 'ノーリツ給湯器の交換・販売｜宝宮設備',
    description: 'ノーリツ給湯器（ユコアGT-70シリーズ）の交換・販売。横浜市・川崎市・厚木市・海老名市対応。工事費込み価格。',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

const products = getProductsByMaker('noritz')
const autoProducts = products.filter((p) => p.type === 'auto')
const fullAutoProducts = products.filter((p) => p.type === 'full-auto')

const noritzFaqs = [
  { q: 'ノーリツのユコアGT-70シリーズとはどんなシリーズですか？', a: 'ユコアGT-70は壁掛屋外型のスタンダードなガスふろ給湯器シリーズです。16号・20号・24号があり、オート・フルオートから選べます。' },
  { q: 'ノーリツのユコアシリーズはどんな特徴がありますか？', a: 'ユコアはノーリツの給湯器ブランドで、エコジョーズを含む幅広いラインナップが特徴です。省エネ性と機能性のバランスに定評があります。' },
  { q: 'ノーリツの給湯器の号数はどう選べばいいですか？', a: '一人暮らし・少人数世帯は16号、2〜3人家族は20号、4人以上のご家庭は24号が目安です。同時使用が多い場合は大きめが安心です。' },
  { q: 'ノーリツのオートとフルオートはどう違いますか？', a: 'オートは自動湯はり・追い焚き・保温に対応します。フルオートはこれに自動たし湯・配管自動洗浄が加わります。' },
  { q: 'ノーリツの給湯器にエラーコードが出ました。交換が必要ですか？', a: '一時的な不具合のこともありますが、頻発する場合や使用年数が10年を超えている場合は交換をご検討ください。コードをお知らせいただければ確認します。' },
  { q: 'ノーリツからリンナイやパロマへ変更できますか？', a: 'はい。設置条件に合えば別メーカーへの変更も可能です。設置タイプや号数の適合を確認のうえご提案します。' },
  { q: '今使っている給湯器の型番が分かりません。', a: '本体の正面や側面に型番シールが貼られています。写真をお送りいただければ型番を確認します。' },
  { q: 'ノーリツの給湯器の寿命はどのくらいですか？', a: '一般的に10〜15年が交換の目安です。10年を超えると部品供給が終了する場合があります。' },
  { q: 'ノーリツのエコジョーズはありますか？', a: 'はい。ノーリツには省エネ性の高いエコジョーズ対応機種があります。ドレン排水の経路が確保できる設置環境で導入できます。' },
  { q: 'リモコンも一緒に交換できますか？', a: 'はい。台所リモコン・浴室リモコンのセットで交換します。掲載価格にはリモコンセットが含まれています。' },
  { q: 'マンションのノーリツ給湯器も交換できますか？', a: 'はい。PS標準設置型・PS扉内設置型のマンション向け機種にも対応しています。PS扉まわりの写真をご用意ください。' },
  { q: 'ノーリツの給湯器交換の工事時間はどのくらいですか？', a: '壁掛屋外型の標準的な交換で2〜4時間程度が目安です。設置環境により前後します。' },
  { q: '工事費込みの価格には何が含まれますか？', a: '本体・リモコンセット・標準取付費（既存機の撤去・処分含む）が含まれます。特殊な設置環境では追加費用が発生する場合があります。' },
  { q: 'ノーリツの給湯器は都市ガス・プロパンガスどちらでも使えますか？', a: 'はい。それぞれのガス種に対応した機種があります。ガスの種類を確認のうえ適合機種をご用意します。' },
  { q: '見積もりは無料ですか？', a: 'はい。写真でのお見積もり・現地でのお見積もりとも無料です。お気軽にご依頼ください。' },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: noritzFaqs.map((f) => ({
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
    { '@type': 'ListItem', position: 2, name: 'ノーリツ給湯器', item: 'https://www.houmiya-boiler.com/noritz' },
  ],
}

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  numberOfItems: products.length,
  itemListElement: products.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `${p.makerLabel} ${p.model}`,
    url: `https://www.houmiya-boiler.com${p.detailUrl}`,
  })),
}

const checkItems = [
  '現在の給湯器の型番の確認（本体のシールに記載）',
  '号数の確認（16号・20号・24号）',
  'オートかフルオートかの確認',
  '設置タイプの確認（壁掛・据置・PS設置型）',
  'エコジョーズかどうかの確認（ドレン排水の有無）',
  '都市ガス／プロパンガスの種類の確認',
  'マンションの場合は管理規約・申請要否の確認',
]

const relatedLinks = [
  { href: '/rinnai', label: 'リンナイ給湯器' },
  { href: '/paloma', label: 'パロマ給湯器' },
  { href: '/category/gas-furo', label: 'ガスふろ給湯器' },
  { href: '/category/eco-jaws', label: 'エコジョーズ' },
  { href: '/category/ps-standard', label: 'PS標準設置型（マンション）' },
  { href: '/guide/capacity', label: '号数の選び方' },
  { href: '/guide/full-auto-auto', label: 'フルオートとオートの違い' },
  { href: '/guide/cost', label: '交換費用の相場' },
  { href: '/guide/photo-estimate', label: '写真見積もりの手順' },
  { href: '/guide/warranty', label: '保証・アフターサービス' },
  { href: '/guide/lifespan', label: '給湯器の寿命' },
  { href: '/guide/eco-jaws', label: 'エコジョーズとは' },
]

const areaLinks = [
  { href: '/area/yokohama', label: '横浜市' },
  { href: '/area/kawasaki', label: '川崎市' },
  { href: '/area/atsugi', label: '厚木市' },
  { href: '/area/ebina', label: '海老名市' },
]

export default function NoritzPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <Header />
      <main className="pt-[100px]">

        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Link href="/" className="text-blue-200 text-sm hover:text-white">トップ</Link>
              <span className="text-blue-300">›</span>
              <span className="text-sm">ノーリツ給湯器</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-3">ノーリツ ガスふろ給湯器</h1>
            <p className="text-blue-100 text-base mb-4">
              エコジョーズでも定評のあるノーリツ給湯器を最大79%OFFの工事費込み価格でご提供。<br />
              横浜市・川崎市・厚木市・海老名市に自社施工で対応。
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/20 rounded-lg px-4 py-2 text-sm font-bold">最大79%OFF</div>
              <div className="bg-white/20 rounded-lg px-4 py-2 text-sm font-bold">工事費込み価格</div>
              <div className="bg-white/20 rounded-lg px-4 py-2 text-sm font-bold">自社施工</div>
            </div>
          </div>
        </section>

        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h2 className="font-black text-lg text-gray-900 mb-3">ノーリツ ユコアGT-70シリーズとは</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                ノーリツは日本を代表するガス機器メーカーの一つ。ユコアGT-70シリーズは壁掛屋外型のスタンダードモデルで、
                エコジョーズシリーズもラインナップしています。16号・20号・24号の3サイズ展開。
                オートタイプとフルオートタイプがあり、省エネ性・機能性ともに高い評価を受けています。
              </p>
            </div>
          </div>
        </section>

        {/* 特徴 */}
        <section className="py-10 bg-white">
          <div className="max-w-5xl mx-auto px-4 space-y-8">
            <div>
              <h2 className="text-lg font-black text-gray-900 mb-3">ノーリツ給湯器の特徴</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                ノーリツは日本を代表するガス機器メーカーの一つで、給湯器の分野で長年の実績があります。
                ユコアGT-70シリーズを中心に、戸建て・マンション向けの機種を幅広く展開しており、エコジョーズのラインナップも充実しています。
                16号・20号・24号のオート／フルオートをそろえ、省エネ性・機能性のバランスに優れています。
                交換時は現在と同じシリーズへの入れ替えがスムーズですが、設置条件に合えば他メーカーからの切り替えにも対応できます。
              </p>
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900 mb-3">ノーリツ ユコアGT-70シリーズについて</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                ユコアGT-70は壁掛屋外型のスタンダードモデルで、戸建て住宅で広く採用されています。
                自動湯はり・追い焚きに対応するオートタイプと、自動たし湯・配管自動洗浄まで備えたフルオートタイプがあり、
                ご家庭の使い方に合わせて選べます。安定した給湯性能と扱いやすい操作性が特徴です。
              </p>
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900 mb-3">ノーリツ ユコアシリーズのエコジョーズ</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                ノーリツは省エネ型のエコジョーズに定評があります。排気熱を再利用することで熱効率を高め、
                使用状況によってはガス代の節約が期待できます。導入にはドレン排水の経路を確保できる設置環境が必要で、
                戸建ては比較的スムーズに設置でき、マンションでは管理規約やドレン排水先の確認が必要になる場合があります。
              </p>
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900 mb-3">ノーリツ給湯器のマンション向けラインナップ</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                マンションでは、パイプスペース（PS）に設置するPS標準設置型・PS扉内設置型が中心です。
                PSの寸法や排気方式はマンションごとに異なるため、適合機種の確認が重要になります。
                管理規約で機種が指定されている場合もあるため、PS扉まわりの写真と型番をご用意いただくとスムーズです。
              </p>
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900 mb-3">ノーリツ給湯器の交換前に確認すること</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <ul className="space-y-2">
                  {checkItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-blue-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 号数ガイド */}
        <section className="py-6 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <CapacityGuide />
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-6">
              <span className="bg-blue-800 text-white text-xs font-black px-3 py-1 rounded mb-2 inline-block">最大79%OFF</span>
              <h2 className="text-2xl font-black text-gray-900">ノーリツ ユコアGT-70【オートタイプ】</h2>
              <p className="text-gray-500 text-sm mt-1">自動湯はり・自動追い焚き対応 / 壁掛屋外型</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {autoProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-6">
              <span className="bg-blue-800 text-white text-xs font-black px-3 py-1 rounded mb-2 inline-block">最大79%OFF</span>
              <h2 className="text-2xl font-black text-gray-900">ノーリツ ユコアGT-70【フルオートタイプ】</h2>
              <p className="text-gray-500 text-sm mt-1">自動湯はり・自動追い焚き・自動保温まで全自動 / 壁掛屋外型</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fullAutoProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">標準工事費について</h2>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-brand-900 text-white p-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                <div>
                  <div className="font-black text-lg">標準取付費（処分費込）</div>
                  <div className="text-blue-200 text-sm">以下の作業がすべて含まれます</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black">{siteConfig.constructionFeeDisplay}</div>
                  <div className="text-blue-200 text-sm">税込 {siteConfig.constructionFeeDisplayInTax}</div>
                </div>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
                  {constructionFeeItems.map((item) => (
                    <div key={item} className="flex items-center gap-1.5 text-xs text-gray-700">
                      <svg className="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="font-bold text-yellow-800 text-sm mb-2">追加費用が発生するケース</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {additionalFeeItems.map((item) => (
                      <div key={item} className="text-xs text-yellow-700">・{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">ノーリツ給湯器についてよくある質問</h2>
            <FaqAccordion faqs={noritzFaqs} />
          </div>
        </section>

        {/* 関連リンク */}
        <section className="py-10 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-lg font-black text-gray-900 mb-4">関連ページ</h2>
            <div className="flex flex-wrap gap-2 mb-8">
              {relatedLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm font-bold text-brand-700 border border-brand-200 bg-brand-50 hover:bg-brand-100 px-4 py-2 rounded-lg transition-colors"
                >
                  {l.label} →
                </Link>
              ))}
            </div>
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
        </section>

        <section className="py-10 bg-blue-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-black mb-3">ノーリツ給湯器の交換はお任せください</h2>
            <p className="text-blue-100 mb-6">無料見積もり受付中。写真を送るだけで最短即日回答。</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/estimate"
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-lg px-8 py-4 rounded-lg shadow-lg transition-colors w-full sm:w-auto justify-center"
              >
                無料見積もりを依頼する
              </Link>
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-black text-lg px-8 py-4 rounded-lg transition-colors w-full sm:w-auto justify-center"
              >
                {siteConfig.phone}
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
