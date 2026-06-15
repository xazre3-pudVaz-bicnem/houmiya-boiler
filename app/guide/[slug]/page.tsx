import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import { guidesData, getGuideBySlug } from '@/data/guides'
import { siteConfig } from '@/data/site'

export async function generateStaticParams() {
  return guidesData.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) return {}
  return {
    title: `${guide.title}｜宝宮設備`,
    description: guide.description,
  }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) notFound()

  const otherGuides = guidesData.filter((g) => g.slug !== slug)

  return (
    <>
      <Header />
      <main className="pt-[100px]">

        <section className="bg-brand-900 text-white py-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-4 text-sm">
              <Link href="/" className="text-blue-200 hover:text-white">トップ</Link>
              <span className="text-blue-400">›</span>
              <Link href="/guide/full-auto-auto" className="text-blue-200 hover:text-white">給湯器の基礎知識</Link>
              <span className="text-blue-400">›</span>
              <span className="truncate">{guide.title.split('｜')[0]}</span>
            </div>
            <span className="text-blue-300 text-xs bg-white/10 px-2 py-0.5 rounded mb-3 inline-block">{guide.category}</span>
            <h1 className="text-2xl md:text-3xl font-black">{guide.title.split('｜')[0]}</h1>
          </div>
        </section>

        <section className="py-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid lg:grid-cols-[1fr_280px] gap-8">

              {/* メインコンテンツ */}
              <article className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                <p className="text-gray-500 text-sm mb-8 leading-relaxed border-b border-gray-100 pb-6">
                  {guide.description}
                </p>
                <div className="space-y-8">
                  {guide.content.map((section, i) => (
                    <div key={i}>
                      <h2 className="text-lg font-black text-gray-900 mb-3 pb-2 border-b-2 border-brand-200">
                        {section.heading}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed">{section.body}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-10 bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                  <h3 className="font-black text-gray-900 text-lg mb-2">給湯器交換のご相談は宝宮設備へ</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {siteConfig.areas.join('・')}対応。無料見積もり受付中。
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                      href="/estimate"
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-colors w-full sm:w-auto justify-center"
                    >
                      無料見積もりを依頼する
                    </Link>
                    <a
                      href={siteConfig.phoneHref}
                      className="flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white font-bold px-6 py-3 rounded-lg transition-colors w-full sm:w-auto justify-center"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>
              </article>

              {/* サイドバー */}
              <aside>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
                  <h3 className="font-black text-gray-900 text-sm mb-4 border-b border-gray-200 pb-2">
                    給湯器の基礎知識
                  </h3>
                  <ul className="space-y-2">
                    {guidesData.map((g) => (
                      <li key={g.slug}>
                        <Link
                          href={`/guide/${g.slug}`}
                          className={`text-sm block py-1.5 hover:text-brand-700 transition-colors ${
                            g.slug === slug ? 'text-brand-700 font-black' : 'text-gray-600'
                          }`}
                        >
                          {g.title.split('｜')[0]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-brand-900 text-white rounded-xl p-5">
                  <div className="font-black text-base mb-2">お気軽にご相談ください</div>
                  <div className="text-blue-200 text-xs mb-4">受付 {siteConfig.hours}</div>
                  <a
                    href={siteConfig.phoneHref}
                    className="block text-center bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-lg px-4 py-3 rounded-lg mb-3 transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                  <Link
                    href="/estimate"
                    className="block text-center bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-4 py-2.5 rounded-lg transition-colors"
                  >
                    無料見積もりフォーム
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}
