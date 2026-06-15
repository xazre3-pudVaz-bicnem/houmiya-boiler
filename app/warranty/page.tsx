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
              <div className="bg-white border border-blue-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h2 className="font-black text-gray-900 text-lg mb-2">メーカー保証</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  各メーカーの標準保証が付属します。部品の製造不良や初期不良に対してメーカーが対応します。
                </p>
              </div>
              <div className="bg-white border border-green-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                  </svg>
                </div>
                <h2 className="font-black text-gray-900 text-lg mb-2">工事保証</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  弊社施工部分（配管接続・リモコン取付など）の不具合については、弊社が責任をもって対応いたします。
                </p>
              </div>
              <div className="bg-white border border-yellow-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
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
              <h3 className="font-black text-gray-900 mb-4">保証対象外となるケース</h3>
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
