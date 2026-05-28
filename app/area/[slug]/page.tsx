import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { areaPages } from '@/data/subpage-areas'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import Breadcrumb from '@/components/Breadcrumb'
import CTABanner from '@/components/CTABanner'
import PricingSection from '@/components/PricingSection'
import FAQSection from '@/components/FAQSection'
import ContactForm from '@/components/ContactForm'

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return areaPages.map((area) => ({ slug: area.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = areaPages.find((a) => a.slug === params.slug)
  if (!area) return {}
  return {
    title: area.title,
    description: area.metaDescription,
    alternates: { canonical: `https://houmiya-boiler.com/area/${area.slug}` },
    openGraph: {
      title: area.title,
      description: area.metaDescription,
      url: `https://houmiya-boiler.com/area/${area.slug}`,
    },
  }
}

export default function AreaPage({ params }: Props) {
  const area = areaPages.find((a) => a.slug === params.slug)
  if (!area) notFound()

  return (
    <>
      <Header />
      <main className="pt-22">
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: '対応エリア', href: '/#area' },
            { label: `${area.city}の給湯器交換` },
          ]}
        />

        {/* Hero */}
        <section className="bg-brand-800 py-14 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <p className="text-sky text-xs font-bold uppercase tracking-widest mb-3">
              {area.city}対応エリア
            </p>
            <h1 className="text-white font-black text-3xl md:text-4xl lg:text-[2.5rem] leading-tight mb-4">
              {area.h1}
            </h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
              {area.intro}
            </p>
            <ul className="flex flex-wrap gap-2 mb-6">
              {['最短即日対応', '自社施工', '見積もり無料', 'リンナイ・ノーリツ・パロマ対応'].map((b) => (
                <li key={b} className="flex items-center gap-1.5 bg-brand-700/60 border border-brand-600 text-white text-xs font-medium px-3 py-1.5 rounded">
                  <svg className="w-3.5 h-3.5 text-sky" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="tel:046-205-4558" className="inline-flex items-center justify-center gap-2 bg-coral-600 hover:bg-coral-700 text-white font-bold py-3.5 px-8 rounded transition-all active:scale-95 shadow-cta">
                <PhoneIcon />
                046-205-4558
              </a>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-sky hover:bg-sky-dark text-white font-bold py-3.5 px-8 rounded transition-all active:scale-95">
                無料見積もりを依頼する
              </a>
            </div>
          </div>
        </section>

        {/* Area specific content */}
        <section className="bg-white py-14 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            {/* Wards */}
            {area.wards && (
              <div className="mb-10">
                <h2 className="text-xl font-bold text-brand-800 mb-4">
                  {area.city}の対応区・エリア
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {area.wards.map((ward) => (
                    <span key={ward} className="bg-slate-50 border border-slate-200 text-brand-700 text-xs font-medium px-2.5 py-1 rounded hover:border-sky transition-colors">
                      {ward}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-brand-800 mb-5">
                {area.city}での給湯器交換の特徴
              </h2>
              <div className="space-y-3">
                {area.features.map((f, idx) => (
                  <div key={f.title} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="w-7 h-7 bg-brand-800 rounded flex items-center justify-center text-sky font-black text-xs flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-800 text-sm mb-1">{f.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO content */}
            <div className="bg-slate-50 rounded-lg p-5 md:p-6 border border-slate-200 mb-8">
              <h2 className="text-lg font-bold text-brand-800 mb-3">
                {area.city}の給湯器交換について
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed">{area.seoContent}</p>
            </div>

            {/* Case note */}
            <div className="bg-brand-800 rounded-lg p-4 text-white">
              <div className="flex items-start gap-3">
                <div className="w-1 h-full min-h-[2rem] bg-sky rounded-full flex-shrink-0" />
                <div>
                  <p className="text-sky font-bold text-xs mb-1">施工事例より</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{area.caseNote}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTABanner variant="full" title={`${area.city}の給湯器交換はお気軽にご相談ください`} subtitle="写真を送るだけでも概算のお見積もりが可能です。お急ぎの場合はお電話ください。" />

        <PricingSection />
        <FAQSection />
        <ContactForm />
      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  )
}
