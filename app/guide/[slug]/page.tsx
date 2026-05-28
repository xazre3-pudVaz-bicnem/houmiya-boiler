import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import { guideContent, guideList } from '@/data/guideContent'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return Object.keys(guideContent).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props) {
  const guide = guideContent[params.slug]
  if (!guide) return {}
  return {
    title: `${guide.title}｜給湯器選びガイド｜宝宮設備`,
    description: guide.description,
  }
}

export default function GuidePage({ params }: Props) {
  const guide = guideContent[params.slug]
  if (!guide) notFound()

  const related = guideList.filter((g) => guide.relatedSlugs.includes(g.slug))

  return (
    <>
      <Header />
      <main className="pt-20">

        {/* Breadcrumb */}
        <div className="border-b border-slate-200 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-1.5 text-xs text-slate-400">
              <Link href="/" className="hover:text-brand-900 transition-colors">トップ</Link>
              <span>/</span>
              <Link href="/#guide" className="hover:text-brand-900 transition-colors">給湯器選びガイド</Link>
              <span>/</span>
              <span className="text-slate-600">{guide.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-brand-900 text-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 md:py-16">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-sky text-xs font-black tracking-widest uppercase mb-3">給湯器選びガイド</p>
                <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">{guide.title}</h1>
                <p className="text-slate-300 text-base leading-relaxed">{guide.subtitle}</p>
              </div>
              <div className="relative h-52 lg:h-64 rounded-sm overflow-hidden shadow-xl">
                <Image
                  src={guide.imageSrc}
                  alt={guide.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-brand-900/30" />
              </div>
            </div>
          </div>
        </section>

        {/* Intro + Key points */}
        <section className="bg-white py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">

            {/* Intro paragraph */}
            <p className="text-slate-600 text-base leading-relaxed mb-12 text-justify">{guide.intro}</p>

            {/* Key points */}
            <div className="grid md:grid-cols-3 gap-5 mb-2">
              {guide.keyPoints.map((kp, i) => (
                <div key={i} className="bg-orange-50 border border-orange-100 p-5">
                  <div className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-black mb-3">
                    {i + 1}
                  </div>
                  <h3 className="font-black text-brand-900 text-sm mb-2 leading-snug">{kp.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{kp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Article sections */}
        <section className="bg-slate-50 py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-12">
            {guide.sections.map((section, si) => (
              <div key={si}>
                <h2 className="text-xl font-black text-brand-900 mb-4 pb-3 border-b-2 border-orange-400 flex items-center gap-2">
                  <span className="w-6 h-6 bg-orange-400 text-white text-xs font-black rounded flex items-center justify-center flex-shrink-0">
                    {si + 1}
                  </span>
                  {section.title}
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed mb-4">{section.content}</p>

                {section.items && (
                  <ul className="space-y-2 mb-4">
                    {section.items.map((item, ii) => (
                      <li key={ii} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <svg className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.table && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-slate-200 min-w-[400px]">
                      <thead>
                        <tr className="bg-brand-900 text-white">
                          {section.table.headers.map((h, hi) => (
                            <th key={hi} className="px-4 py-2.5 text-left font-bold text-xs">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, ri) => (
                          <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                            {row.map((cell, ci) => (
                              <td key={ci} className={`px-4 py-3 border-t border-slate-100 ${ci === 0 ? 'font-bold text-brand-900' : 'text-slate-600'}`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-900 py-12 text-center">
          <div className="max-w-xl mx-auto px-6">
            <p className="text-slate-400 text-sm mb-2">ご不明な点はお気軽にご相談ください</p>
            <h2 className="text-white font-black text-xl mb-6">{guide.ctaText}</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={guide.ctaLink}
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-8 py-3.5 transition-colors"
              >
                {guide.ctaText}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="tel:046-205-4558"
                className="inline-flex items-center justify-center gap-2 bg-coral-600 hover:bg-coral-700 text-white font-bold text-sm px-8 py-3.5 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                電話で相談する
              </a>
            </div>
          </div>
        </section>

        {/* Related guides */}
        {related.length > 0 && (
          <section className="bg-white py-12">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
              <h2 className="text-lg font-black text-brand-900 mb-6">関連ガイド</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/guide/${g.slug}`}
                    className="group bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 p-4 transition-all"
                  >
                    <div className="relative h-28 mb-3 overflow-hidden">
                      <Image
                        src={g.imageSrc}
                        alt={g.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="33vw"
                      />
                    </div>
                    <h3 className="font-bold text-brand-900 text-sm leading-snug group-hover:text-orange-600 transition-colors">{g.title}</h3>
                    <p className="text-slate-400 text-xs mt-1 line-clamp-2">{g.subtitle}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}
