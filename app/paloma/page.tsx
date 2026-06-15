import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import ProductCard from '@/components/ProductCard'
import { getProductsByMaker, constructionFeeItems, additionalFeeItems } from '@/data/products'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: 'パロマ給湯器の交換・販売｜横浜・川崎・厚木・海老名｜宝宮設備',
  description:
    'パロマ給湯器の交換・販売なら株式会社宝宮設備。FH-Eシリーズを最大79%OFFの工事費込み価格でご提供。横浜市・川崎市・厚木市・海老名市対応。無料見積もり受付中。',
}

const products = getProductsByMaker('paloma')
const autoProducts = products.filter((p) => p.type === 'auto')
const fullAutoProducts = products.filter((p) => p.type === 'full-auto')

export default function PalomaPage() {
  return (
    <>
      <Header />
      <main className="pt-[100px]">

        <section className="bg-gradient-to-r from-indigo-800 to-indigo-600 text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Link href="/" className="text-indigo-200 text-sm hover:text-white">トップ</Link>
              <span className="text-indigo-300">›</span>
              <span className="text-sm">パロマ給湯器</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-3">パロマ ガスふろ給湯器</h1>
            <p className="text-indigo-100 text-base mb-4">
              コストパフォーマンスに優れたパロマ給湯器を最大79%OFFの工事費込み価格でご提供。<br />
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
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
              <h2 className="font-black text-lg text-gray-900 mb-3">パロマ FH-Eシリーズとは</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                パロマは名古屋に本社を置くガス機器メーカーです。FH-Eシリーズは壁掛屋外型のスタンダードモデルで、
                シンプルな設計で扱いやすく、コスト面でも選びやすい価格帯が魅力です。
                16号・20号・24号の3サイズ展開。オートタイプとフルオートタイプがあります。
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-6">
              <span className="bg-indigo-700 text-white text-xs font-black px-3 py-1 rounded mb-2 inline-block">最大79%OFF</span>
              <h2 className="text-2xl font-black text-gray-900">パロマ FH-Eシリーズ【オートタイプ】</h2>
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
              <span className="bg-indigo-700 text-white text-xs font-black px-3 py-1 rounded mb-2 inline-block">最大79%OFF</span>
              <h2 className="text-2xl font-black text-gray-900">パロマ FH-Eシリーズ【フルオートタイプ】</h2>
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

        <section className="py-10 bg-indigo-800 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-black mb-3">パロマ給湯器の交換はお任せください</h2>
            <p className="text-indigo-100 mb-6">無料見積もり受付中。写真を送るだけで最短即日回答。</p>
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
