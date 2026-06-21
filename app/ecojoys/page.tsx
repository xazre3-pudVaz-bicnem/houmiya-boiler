import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import Breadcrumb from '@/components/Breadcrumb'
import EcojozSection from '@/components/EcojozSection'
import CTABanner from '@/components/CTABanner'
import PricingSection from '@/components/PricingSection'
import FAQSection from '@/components/FAQSection'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'エコジョーズ交換・販売｜横浜市・川崎市・厚木市｜株式会社宝宮設備',
  description: 'エコジョーズ（省エネ給湯器）への交換・販売なら株式会社宝宮設備へ。横浜市・川崎市・厚木市・海老名市対応。設置環境の確認から施工まで丁寧に対応。',
  alternates: { canonical: 'https://www.houmiya-boiler.com/ecojoys' },
  openGraph: {
    title: 'エコジョーズ交換・販売｜宝宮設備',
    description: 'エコジョーズへの交換・販売なら宝宮設備。横浜市・川崎市・厚木市・海老名市対応。設置環境確認から施工まで丁寧対応。',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

export default function EcojoysPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: 'エコジョーズ交換' },
          ]}
        />

        {/* Hero */}
        <section className="bg-gradient-to-r from-brand-900 to-brand-800 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <div className="inline-block bg-green-500/20 text-green-400 text-sm font-bold px-4 py-1.5 rounded-full border border-green-500/30 mb-4">
              省エネ給湯器
            </div>
            <h1 className="text-white font-black text-3xl md:text-4xl mb-4">
              エコジョーズ交換・販売
            </h1>
            <p className="text-slate-200 text-base md:text-lg max-w-xl mx-auto mb-6">
              高効率省エネ給湯器「エコジョーズ」への交換で光熱費を節約。
              横浜市・川崎市・厚木市・海老名市対応。設置環境の確認から施工まで一貫対応。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:046-205-4558" className="flex items-center justify-center gap-2 bg-[#e85d2a] text-white font-bold py-4 px-8 rounded-xl hover:bg-[#d44e20] transition-all shadow-lg">
                046-205-4558
              </a>
              <a href="#contact" className="flex items-center justify-center gap-2 bg-sky text-brand-900 font-bold py-4 px-8 rounded-xl hover:bg-sky-dark hover:text-white transition-all shadow-lg">
                無料見積もりを依頼する
              </a>
            </div>
          </div>
        </section>

        <EcojozSection />
        <CTABanner variant="full" />
        <PricingSection />
        <FAQSection />
        <ContactForm />
      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}

