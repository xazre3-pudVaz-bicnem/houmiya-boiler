import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import EstimateForm from '@/components/EstimateForm'
import { siteConfig } from '@/data/site'
import { getProductBySlug } from '@/data/products'

const BASE_URL = 'https://www.houmiya-boiler.com'

export const metadata: Metadata = {
  title: '給湯器の無料見積もり依頼｜横浜・川崎・厚木・海老名｜宝宮設備',
  description:
    '給湯器交換の無料見積もり依頼フォーム。写真を添付いただくと最短即日で工事費込みのお見積りをご案内します。横浜市・川崎市・厚木市・海老名市対応。',
  openGraph: {
    title: '給湯器の無料見積もり依頼｜横浜・川崎・厚木・海老名｜宝宮設備',
    description: '給湯器交換の無料見積もり依頼フォーム。写真を添付いただくと最短即日で工事費込みのお見積りをご案内します。横浜市・川崎市・厚木市・海老名市対応。',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: `${BASE_URL}/estimate` },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'トップ', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: '無料見積もり', item: `${BASE_URL}/estimate` },
  ],
}

export default async function EstimatePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>
}) {
  const { product: productSlug } = await searchParams
  const preselectedProduct = productSlug ? getProductBySlug(productSlug) : undefined
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main className="pt-[100px]">

        <section className="bg-brand-900 text-white py-10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-2xl md:text-3xl font-black mb-3">無料お見積りフォーム</h1>
            <p className="text-blue-100 text-sm mb-4">
              現在の給湯器の写真を添付いただくと、最短即日で工事費込みのお見積りをご案内します。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 text-sm">
                <svg className="w-4 h-4 text-green-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                見積もり完全無料
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 text-sm">
                <svg className="w-4 h-4 text-green-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                最短即日回答
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 text-sm">
                <svg className="w-4 h-4 text-green-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                工事費込み価格
              </div>
            </div>
          </div>
        </section>

        {/* 電話・LINE での相談案内 */}
        <section className="py-6 bg-yellow-50 border-b border-yellow-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="text-gray-700 font-bold text-sm">フォーム以外でのご相談も受付中：</div>
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-2 bg-brand-900 text-white font-black text-base px-5 py-2.5 rounded-lg"
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
                className="flex items-center gap-2 text-white font-bold text-sm px-5 py-2.5 rounded-lg"
                style={{ backgroundColor: '#00B900' }}
              >
                LINEで相談する
              </a>
            </div>
          </div>
        </section>

        {/* 写真見積もりガイド */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4">

            {/* LINE CTA */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 text-center">
              <p className="font-black text-gray-900 text-lg mb-1">写真を送るだけでOKです</p>
              <p className="text-gray-600 text-sm mb-4">給湯器の写真3〜5枚をLINEに送るだけで、概算見積もりをご案内できます。フォーム入力が面倒な方はLINEから気軽にご相談ください。</p>
              <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl text-base"
                 style={{ backgroundColor: '#00B900' }}>
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.07 9.437-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINEで写真を送って見積もりをもらう
              </a>
              <p className="text-xs text-gray-400 mt-3">無料・24時間受付</p>
            </div>

            {/* 写真5点の説明 */}
            <h2 className="text-lg font-black text-gray-900 mb-2 text-center">見積もりに必要な写真</h2>
            <p className="text-gray-500 text-sm text-center mb-6">以下の写真をご用意いただくと正確な見積もりが可能です。</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {[
                { num: 1, title: '給湯器の全体', desc: '正面から全体が写るように', icon: '正面' },
                { num: 2, title: '型番ラベル', desc: '型番シールが読み取れるように', icon: '型番' },
                { num: 3, title: '配管まわり', desc: 'ガス管・給排水管を含め', icon: '配管' },
                { num: 4, title: 'リモコン', desc: 'メーカー・型番が見えるように', icon: 'RC' },
                { num: 5, title: 'PS扉内全体', desc: 'マンションの場合のみ', icon: 'PS' },
              ].map(photo => (
                <div key={photo.num} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                  <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-brand-700 font-black text-sm">{photo.icon}</span>
                  </div>
                  <div className="text-xs font-black text-gray-800 mb-1">
                    <span className="text-brand-700">写真{photo.num}</span> {photo.title}
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{photo.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-gray-600">
              フォームでも写真を添付できます。下記のフォームからもお気軽にご依頼ください。
            </p>
          </div>
        </section>

        <EstimateForm preselectedProduct={preselectedProduct} />

      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}
