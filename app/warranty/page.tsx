import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: '給湯器交換の保証・アフターサポート｜横浜・川崎・厚木・海老名｜宝宮設備',
  description:
    '株式会社宝宮設備の給湯器交換保証について。メーカー保証・工事保証・アフターサポートの詳細をご案内。横浜市・川崎市・厚木市・海老名市対応。',
}

export default function WarrantyPage() {
  return (
    <>
      <Header />
      <main className="pt-[100px]">

        <section className="bg-brand-900 text-white py-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-4 text-sm">
              <Link href="/" className="text-blue-200 hover:text-white">トップ</Link>
              <span className="text-blue-400">›</span>
              <span>保証について</span>
            </div>
            <h1 className="text-3xl font-black mb-2">保証・アフターサポートについて</h1>
            <p className="text-blue-100 text-sm">{siteConfig.warrantyNote}</p>
          </div>
        </section>

        {/* 保証概要 */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white border border-blue-200 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🛡️</div>
                <h2 className="font-black text-gray-900 text-lg mb-2">メーカー保証</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  各メーカーの標準保証（1年）が付属します。部品の製造不良や初期不良に対してメーカーが対応します。
                </p>
              </div>
              <div className="bg-white border border-green-200 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🔧</div>
                <h2 className="font-black text-gray-900 text-lg mb-2">工事保証</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  弊社施工部分（配管接続・リモコン取付など）の不具合については、弊社が責任をもって対応いたします。
                </p>
              </div>
              <div className="bg-white border border-yellow-200 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">📞</div>
                <h2 className="font-black text-gray-900 text-lg mb-2">アフターサポート</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  施工後のご相談も電話・LINEで承ります。給湯器の使い方・エラーコードのご相談も対応します。
                </p>
              </div>
            </div>

            {/* 保証の詳細 */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
              <div className="bg-brand-50 border-b border-brand-100 p-5">
                <h2 className="font-black text-gray-900 text-lg">保証内容の詳細</h2>
              </div>
              <div className="p-6 space-y-6">

                <div>
                  <h3 className="font-black text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-600 text-white text-xs font-black flex items-center justify-center rounded-full">1</span>
                    メーカー保証について
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    給湯器本体にはメーカー標準保証（通常1年）が付属します。保証期間内に製品の製造不良・初期不良が発生した場合は、
                    各メーカーのサービスセンターを通じて対応いたします。保証書は施工完了時にお渡しします。
                  </p>
                </div>

                <div>
                  <h3 className="font-black text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-green-600 text-white text-xs font-black flex items-center justify-center rounded-full">2</span>
                    工事保証について
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    弊社が行った施工（配管接続・リモコン取付・給水管接続など）に起因する不具合については、
                    弊社が責任をもって対応いたします。施工後に気になる点がございましたら、お気軽にご連絡ください。
                  </p>
                </div>

                <div>
                  <h3 className="font-black text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-yellow-500 text-white text-xs font-black flex items-center justify-center rounded-full">3</span>
                    {siteConfig.warrantyLabel}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {siteConfig.warrantyNote}
                    詳しくはお見積もり時にご確認ください。
                  </p>
                </div>

              </div>
            </div>

            {/* 保証対象外ケース */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
              <h3 className="font-black text-gray-900 mb-4">⚠️ 保証対象外となるケース</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'お客様による誤った操作・取り扱いによる故障',
                  '自然災害（地震・洪水・落雷など）による損傷',
                  'お客様による改造・修理による故障',
                  '経年劣化によるものと認められる場合',
                  '消耗品（フィルター・パッキン等）の交換',
                  '弊社以外の業者が施工・修理した場合',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-red-700">
                    <span className="text-red-500 mt-0.5">×</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* アフター窓口 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-black text-gray-900 mb-4">施工後のご相談窓口</h3>
              <p className="text-sm text-gray-600 mb-4">
                施工後に何かお困りのことがございましたら、以下よりお気軽にご連絡ください。
                担当スタッフが迅速に対応いたします。
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center gap-2 bg-brand-900 text-white font-black text-base px-6 py-3 rounded-lg w-full sm:w-auto justify-center"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  {siteConfig.phone}
                </a>
                <a
                  href={siteConfig.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white font-bold text-sm px-6 py-3 rounded-lg w-full sm:w-auto justify-center"
                  style={{ backgroundColor: '#00B900' }}
                >
                  LINEで問い合わせる
                </a>
              </div>
              <div className="text-xs text-gray-400 mt-3">受付時間：{siteConfig.hours}</div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}
