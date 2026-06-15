import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import EstimateForm from '@/components/EstimateForm'
import { siteConfig } from '@/data/site'
import { getProductBySlug } from '@/data/products'

export const metadata: Metadata = {
  title: '給湯器の無料見積もり依頼｜横浜・川崎・厚木・海老名｜宝宮設備',
  description:
    '給湯器交換の無料見積もり依頼フォーム。写真を添付いただくと最短即日で工事費込みのお見積りをご案内します。横浜市・川崎市・厚木市・海老名市対応。',
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

        <EstimateForm preselectedProduct={preselectedProduct} />

      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}
