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
  title: 'リンナイ給湯器の交換・販売｜横浜市・川崎市・厚木市・海老名市｜宝宮設備',
  description:
    'リンナイ給湯器（RUF-Aシリーズ）の交換・販売なら宝宮設備。横浜市・川崎市・厚木市・海老名市対応。工事費込み価格。無料見積もり受付中。',
  alternates: { canonical: 'https://www.houmiya-boiler.com/rinnai' },
}

const products = getProductsByMaker('rinnai')
const autoProducts = products.filter((p) => p.type === 'auto')
const fullAutoProducts = products.filter((p) => p.type === 'full-auto')

const rinnaiFaqs = [
  { q: 'リンナイ給湯器のRUF-Aシリーズとはどんなシリーズですか？', a: 'RUF-Aは壁掛屋外型のスタンダードなガスふろ給湯器シリーズです。16号・20号・24号があり、オートタイプとフルオートタイプから選べます。' },
  { q: 'リンナイの給湯器の号数はどう選べばいいですか？', a: '一人暮らし・少人数世帯は16号、2〜3人家族は20号、4人以上のご家庭は24号が目安です。お湯の同時使用が多い場合は大きめの号数が安心です。' },
  { q: 'リンナイのオートとフルオートはどう違いますか？', a: 'オートは自動湯はり・追い焚き・保温に対応します。フルオートはこれに自動たし湯・配管自動洗浄が加わります。' },
  { q: 'リンナイの給湯器にエラーコードが表示されました。交換が必要ですか？', a: 'エラーコードは一時的な不具合のこともありますが、頻発する場合や使用年数が10年を超えている場合は交換をご検討ください。表示されたコードをお知らせいただければ状況を確認します。' },
  { q: 'リンナイからノーリツやパロマへ変更できますか？', a: 'はい。設置条件に合えば別メーカーへの変更も可能です。設置タイプや号数の適合を確認のうえご提案します。' },
  { q: '今使っている給湯器の型番が分かりません。どうすればいいですか？', a: '給湯器本体の正面や側面に型番シールが貼られています。写真をお送りいただければ型番を確認します。' },
  { q: 'リンナイの給湯器の寿命はどのくらいですか？', a: '一般的に10〜15年が交換の目安です。10年を超えると部品の供給が終了する場合があります。' },
  { q: 'リンナイのエコジョーズはありますか？', a: 'はい。リンナイには省エネ性の高いエコジョーズ対応機種があります。ドレン排水の経路が確保できる設置環境で導入できます。' },
  { q: 'リモコンも一緒に交換できますか？', a: 'はい。台所リモコン・浴室リモコンのセットで交換します。掲載価格にはリモコンセットが含まれています。' },
  { q: 'マンションのリンナイ給湯器も交換できますか？', a: 'はい。PS標準設置型・PS扉内設置型のマンション向け機種にも対応しています。PS扉まわりの写真をご用意ください。' },
  { q: 'リンナイの給湯器交換の工事時間はどのくらいですか？', a: '壁掛屋外型の標準的な交換で2〜4時間程度が目安です。設置環境により前後します。' },
  { q: '工事費込みの価格に何が含まれますか？', a: '本体・リモコンセット・標準取付費（既存機の撤去・処分含む）が含まれます。特殊な設置環境では追加費用が発生する場合があります。' },
  { q: '号数を今より上げることはできますか？', a: 'ガス供給量と配管の状況によって変更できる場合があります。事前確認のうえご提案します。' },
  { q: 'リンナイの給湯器は都市ガス・プロパンガスどちらでも使えますか？', a: 'はい。それぞれのガス種に対応した機種があります。ガスの種類を確認のうえ適合機種をご用意します。' },
  { q: '見積もりは無料ですか？', a: 'はい。写真でのお見積もり・現地でのお見積もりとも無料です。お気軽にご依頼ください。' },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: rinnaiFaqs.map((f) => ({
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
    { '@type': 'ListItem', position: 2, name: 'リンナイ給湯器', item: 'https://www.houmiya-boiler.com/rinnai' },
  ],
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
  { href: '/noritz', label: 'ノーリツ給湯器' },
  { href: '/paloma', label: 'パロマ給湯器' },
  { href: '/category/gas-furo', label: 'ガスふろ給湯器' },
  { href: '/category/eco-jaws', label: 'エコジョーズ' },
  { href: '/category/ps-standard', label: 'PS標準設置型（マンション）' },
  { href: '/guide/capacity', label: '号数の選び方' },
  { href: '/guide/full-auto-auto', label: 'フルオートとオートの違い' },
]

const areaLinks = [
  { href: '/area/yokohama', label: '横浜市' },
  { href: '/area/kawasaki', label: '川崎市' },
  { href: '/area/atsugi', label: '厚木市' },
  { href: '/area/ebina', label: '海老名市' },
]

export default function RinnaiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main className="pt-[100px]">

        {/* ヘッダーセクション */}
        <section className="bg-gradient-to-r from-red-700 to-red-500 text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Link href="/" className="text-red-200 text-sm hover:text-white">トップ</Link>
              <span className="text-red-300">›</span>
              <span className="text-sm">リンナイ給湯器</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-3">リンナイ ガスふろ給湯器</h1>
            <p className="text-red-100 text-base mb-4">
              国内シェアNo.1のリンナイ給湯器を最大80%OFFの工事費込み価格でご提供。<br />
              横浜市・川崎市・厚木市・海老名市に自社施工で対応。
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/20 rounded-lg px-4 py-2 text-sm font-bold">最大80%OFF</div>
              <div className="bg-white/20 rounded-lg px-4 py-2 text-sm font-bold">工事費込み価格</div>
              <div className="bg-white/20 rounded-lg px-4 py-2 text-sm font-bold">自社施工</div>
            </div>
          </div>
        </section>

        {/* リンナイについて */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h2 className="font-black text-lg text-gray-900 mb-3">リンナイ RUF-Aシリーズとは</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                リンナイは国内最大手のガス機器メーカーです。RUF-Aシリーズは壁掛屋外型のスタンダードな給湯器で、
                16号・20号・24号の3サイズ展開。オートタイプとフルオートタイプがあり、戸建て・マンションを問わず
                幅広い住宅に対応しています。省エネ性能・耐久性ともに高く評価されており、全国で多くの実績を持ちます。
              </p>
            </div>
          </div>
        </section>

        {/* 特徴 */}
        <section className="py-10 bg-white">
          <div className="max-w-5xl mx-auto px-4 space-y-8">
            <div>
              <h2 className="text-lg font-black text-gray-900 mb-3">リンナイ給湯器の特徴</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                リンナイは国内大手の総合熱機器メーカーで、給湯器の分野でも高いシェアを誇ります。
                RUF-Aシリーズを中心に戸建て・マンション向けの機種を幅広く展開しており、16号・20号・24号の
                オート／フルオートをそろえています。耐久性・省エネ性に定評があり、エラー表示などの操作性にも配慮された設計です。
                交換時は現在と同じシリーズへの入れ替えがスムーズですが、設置条件に合えば他メーカーからの切り替えにも対応できます。
              </p>
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900 mb-3">リンナイ給湯器の戸建て向けラインナップ</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                戸建て住宅では、屋外の壁に取り付ける屋外壁掛型と、地面やブロック上に据え付ける据置型が一般的です。
                屋外壁掛型はもっとも多く採用されている設置タイプで、RUF-Aシリーズが対応します。設置スペースに余裕がある戸建てでは、
                号数アップやエコジョーズへの変更も比較的行いやすい傾向があります。現在の設置状況の写真があると、適した機種をご提案しやすくなります。
              </p>
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900 mb-3">リンナイ給湯器のマンション向けラインナップ</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                マンションでは、パイプスペース（PS）に設置するPS標準設置型・PS扉内設置型が中心です。
                PS標準設置型は給湯器が正面に向き前面から給排気するタイプ、PS扉内設置型は扉の内側に収まるコンパクトなタイプです。
                マンションごとにPSの寸法や排気方式が異なるため、適合機種の確認が重要になります。管理規約で機種が指定されている場合もあります。
              </p>
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900 mb-3">リンナイのエコジョーズ</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                リンナイには排気熱を再利用する省エネ型のエコジョーズ対応機種があります。従来型より熱効率が高く、
                使用状況によってはガス代の節約が期待できます。導入にはドレン排水の経路を確保できる設置環境が必要です。
                戸建ては比較的スムーズに設置でき、マンションでは管理規約やドレン排水先の確認が必要になる場合があります。
              </p>
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900 mb-3">リンナイ給湯器の交換前に確認すること</h2>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <ul className="space-y-2">
                  {checkItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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

        {/* オートタイプ */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-6">
              <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded mb-2 inline-block">最大80%OFF</span>
              <h2 className="text-2xl font-black text-gray-900">リンナイ RUF-Aシリーズ【オートタイプ】</h2>
              <p className="text-gray-500 text-sm mt-1">自動湯はり・自動追い焚き対応 / 壁掛屋外型</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {autoProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* フルオートタイプ */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-6">
              <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded mb-2 inline-block">最大80%OFF</span>
              <h2 className="text-2xl font-black text-gray-900">リンナイ RUF-Aシリーズ【フルオートタイプ】</h2>
              <p className="text-gray-500 text-sm mt-1">自動湯はり・自動追い焚き・自動保温まで全自動 / 壁掛屋外型</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fullAutoProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* 標準工事費 */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">標準工事費について</h2>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-brand-900 text-white p-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                <div>
                  <div className="font-black text-lg">標準取付費（処分費込）</div>
                  <div className="text-blue-200 text-sm">以下の作業がすべて含まれます</div>
                </div>
                <div className="text-right flex-shrink-0">
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

        {/* 保証 */}
        <section className="py-10 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">保証について</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                </div>
                <h3 className="font-black text-gray-900 mb-2">メーカー保証</h3>
                <p className="text-sm text-gray-600">10年保証対応</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" /></svg>
                </div>
                <h3 className="font-black text-gray-900 mb-2">工事保証</h3>
                <p className="text-sm text-gray-600">施工部分の不具合は迅速対応</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                <div className="w-9 h-9 bg-yellow-100 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                </div>
                <h3 className="font-black text-gray-900 mb-2">アフターサポート</h3>
                <p className="text-sm text-gray-600">{siteConfig.warrantyLabel}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">リンナイ給湯器についてよくある質問</h2>
            <FaqAccordion faqs={rinnaiFaqs} />
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

        {/* CTA */}
        <section className="py-12 bg-red-600 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-black mb-3">リンナイ給湯器の交換はお任せください</h2>
            <p className="text-red-100 mb-6">無料見積もり受付中。写真を送るだけで最短即日回答。</p>
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
