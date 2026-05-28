import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { makerPages } from '@/data/subpage-makers'
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
  return makerPages.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const maker = makerPages.find((m) => m.slug === params.slug)
  if (!maker) return {}
  return {
    title: maker.title,
    description: maker.metaDescription,
    alternates: { canonical: `https://houmiya-boiler.com/maker/${maker.slug}` },
    openGraph: {
      title: maker.title,
      description: maker.metaDescription,
      url: `https://houmiya-boiler.com/maker/${maker.slug}`,
    },
  }
}

export default function MakerPage({ params }: Props) {
  const maker = makerPages.find((m) => m.slug === params.slug)
  if (!maker) notFound()

  return (
    <>
      <Header />
      <main className="pt-22">
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: '対応メーカー', href: '/#makers' },
            { label: `${maker.name}給湯器交換` },
          ]}
        />

        {/* Hero */}
        <section className="bg-brand-800 py-14 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded flex items-center justify-center text-white font-black text-lg flex-shrink-0"
                style={{ backgroundColor: maker.color }}
              >
                {maker.name[0]}
              </div>
              <span className="text-slate-400 text-sm font-bold tracking-widest">{maker.nameEn}</span>
            </div>
            <h1 className="text-white font-black text-3xl md:text-4xl leading-tight mb-4">
              {maker.h1}
            </h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
              {maker.intro}
            </p>
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

        {/* Content */}
        <section className="bg-white py-14 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            {/* Features */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-brand-800 mb-5">
                宝宮設備が選ばれる理由 ─ {maker.name}対応
              </h2>
              <div className="grid md:grid-cols-3 gap-3">
                {maker.features.map((f) => (
                  <div key={f.title} className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:border-sky transition-colors">
                    <h3 className="font-bold text-brand-800 text-sm mb-1.5 leading-tight">{f.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{f.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular models */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-brand-800 mb-4">
                {maker.name}の人気機種・シリーズ
              </h2>
              <div className="space-y-2.5">
                {maker.popularTypes.map((t) => (
                  <div key={t.type} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200 shadow-card hover:shadow-card-md hover:border-slate-300 transition-all">
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center text-white font-black text-sm flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: maker.color }}
                    >
                      {maker.name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-800 text-sm mb-1">{t.type}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO content */}
            <div className="bg-slate-50 rounded-lg p-5 md:p-6 border border-slate-200">
              <h2 className="text-lg font-bold text-brand-800 mb-3">
                {maker.name}給湯器の交換について
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed">{maker.seoContent}</p>
            </div>
          </div>
        </section>

        <CTABanner variant="full" title={`${maker.name}給湯器の交換はお気軽にご相談ください`} />
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
