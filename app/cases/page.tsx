import type { Metadata } from 'next'
import Image from 'next/image'
import { casesData } from '@/data/cases'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import Breadcrumb from '@/components/Breadcrumb'
import CTABanner from '@/components/CTABanner'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: '施工事例一覧｜横浜市・川崎市・厚木市の給湯器交換｜株式会社宝宮設備',
  description: '横浜市・川崎市・厚木市・海老名市での給湯器交換施工事例を多数掲載。戸建て・マンション・アパートの実際の施工例をご覧ください。',
  alternates: { canonical: 'https://houmiya-boiler.com/cases' },
}

export default function CasesPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: '施工事例一覧' },
          ]}
        />

        {/* Hero */}
        <section className="bg-gradient-to-r from-brand-900 to-brand-800 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h1 className="text-white font-black text-3xl md:text-4xl mb-4">施工事例一覧</h1>
            <p className="text-slate-200 text-base md:text-lg max-w-xl mx-auto">
              横浜市・川崎市・厚木市・海老名市での実際の給湯器交換施工事例をご紹介します。
            </p>
          </div>
        </section>

        {/* Cases */}
        <section className="bg-slate-50 py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {casesData.map((c) => (
                <article key={c.id} className="bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-md transition-all border border-slate-200">
                  <div className="relative bg-slate-50 h-44 overflow-hidden border-b border-slate-200">
                    <Image
                      src={c.afterImageSrc}
                      alt={c.afterImageAlt}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-brand-50 text-brand-700 border border-brand-200 text-xs font-bold px-2.5 py-1 rounded">{c.area}</span>
                      <span className="bg-slate-100 text-slate-600 border border-slate-200 text-xs font-medium px-2.5 py-1 rounded">{c.buildingType}</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-3 leading-snug border-l-2 border-coral-400 pl-2">{c.symptom}</p>
                    <p className="text-brand-800 font-bold text-sm mb-3">交換後: {c.afterModel}</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-50 rounded-lg p-2 text-center">
                        <div className="text-[10px] text-gray-400">施工時間</div>
                        <div className="text-brand-800 font-bold text-sm">{c.duration}</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-2 text-center">
                        <div className="text-[10px] text-gray-400">費用目安</div>
                        <div className="text-[#e85d2a] font-bold text-sm">{c.costRange}</div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="text-center text-gray-500 text-sm">
              ※ 費用は施工内容によるものです。実際の費用は現地確認後にご案内します。
            </p>
          </div>
        </section>

        <CTABanner variant="full" />
        <ContactForm />
      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}

