import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import Breadcrumb from '@/components/Breadcrumb'
import EstimateForm from '@/components/EstimateForm'

export const metadata: Metadata = {
  title: 'スピード見積（無料）｜給湯器交換の費用をすぐに確認｜株式会社宝宮設備',
  description: '給湯器の交換・修理費用をスピード見積もり。設置タイプや号数を入力するだけでOK。横浜市・川崎市・厚木市・海老名市対応。',
  alternates: { canonical: 'https://houmiya-boiler.com/estimate' },
}

export default function EstimatePage() {
  return (
    <>
      <Header />
      <main className="pt-16 bg-slate-50 min-h-screen">
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: 'スピード見積' },
          ]}
        />

        {/* Hero */}
        <section className="bg-gradient-to-r from-brand-900 to-brand-800 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <p className="text-sky text-[11px] font-bold tracking-[0.3em] uppercase mb-4">FREE ESTIMATE</p>
            <h1 className="text-white font-black text-3xl md:text-4xl mb-4">
              スピード見積（無料）
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-lg mx-auto mb-6">
              現在の給湯器の状況とご希望をご入力ください。<br />
              通常<strong className="text-white">1〜2時間以内</strong>に担当者からご連絡します。
            </p>
            {/* Trust chips */}
            <div className="flex flex-wrap justify-center gap-3 text-xs">
              {['見積費・出張費 無料', '当日対応可', '明朗会計・追加費用なし', '有資格者施工'].map((t) => (
                <span key={t} className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/80 px-3 py-1.5 rounded-full">
                  <svg className="w-3.5 h-3.5 text-sky flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <EstimateForm />

        {/* Urgent CTA */}
        <section className="bg-brand-900 py-10">
          <div className="max-w-lg mx-auto px-4 text-center">
            <p className="text-white/70 text-sm mb-3">お急ぎの場合はお電話でも受け付けています</p>
            <a
              href="tel:046-205-4558"
              className="inline-flex items-center gap-3 bg-coral-600 hover:bg-coral-700 text-white font-black text-xl px-8 py-4 rounded-xl shadow-cta transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              046-205-4558
            </a>
            <p className="text-white/40 text-xs mt-3">受付時間 9:00〜18:00（年中無休）</p>
          </div>
        </section>

      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}
