import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import ProductCard from '@/components/ProductCard'
import { getProductsByMaker, constructionFeeItems, additionalFeeItems } from '@/data/products'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: 'リンナイ給湯器の交換・販売｜横浜・川崎・厚木・海老名｜宝宮設備',
  description:
    'リンナイ給湯器の交換・販売なら株式会社宝宮設備。RUF-Aシリーズを最大80%OFFの工事費込み価格でご提供。横浜市・川崎市・厚木市・海老名市対応。無料見積もり受付中。',
}

const products = getProductsByMaker('rinnai')
const autoProducts = products.filter((p) => p.type === 'auto')
const fullAutoProducts = products.filter((p) => p.type === 'full-auto')

export default function RinnaiPage() {
  return (
    <>
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
            <div className="space-y-4">
              {[
                { q: 'オートとフルオートの違いは何ですか？', a: 'フルオートは湯はり・追い焚き・保温がすべて自動です。オートは湯はりと追い焚きは自動ですが保温は手動です。' },
                { q: '号数はどれを選べばいいですか？', a: '1〜2人世帯は16号、2〜4人世帯は20号、4人以上の世帯は24号が目安です。' },
                { q: 'リンナイからリンナイへの交換も対応できますか？', a: 'はい、同メーカー・同機種への交換はもちろん、他メーカーからの切り替えにも対応しています。' },
              ].map((f, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="p-4 flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white text-sm font-black flex items-center justify-center rounded-full">Q</span>
                    <div className="font-bold text-gray-900 text-sm">{f.q}</div>
                  </div>
                  <div className="px-4 pb-4 flex items-start gap-3 border-t border-gray-100 pt-4">
                    <span className="flex-shrink-0 w-6 h-6 bg-yellow-400 text-gray-900 text-sm font-black flex items-center justify-center rounded-full">A</span>
                    <div className="text-gray-600 text-sm">{f.a}</div>
                  </div>
                </div>
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
