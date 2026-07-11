import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import CasesGrid from '@/components/CasesGrid'
import { casesData } from '@/data/cases'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: '給湯器交換の施工事例一覧｜横浜・川崎・厚木・海老名｜宝宮設備',
  description:
    '株式会社宝宮設備の給湯器交換施工事例一覧。横浜市・川崎市・厚木市・海老名市での施工実績。エリア・メーカー・設置タイプで絞り込み可能。リンナイ・ノーリツ・パロマ対応。',
  alternates: { canonical: 'https://www.houmiya-boiler.com/cases' },
  openGraph: {
    title: '給湯器交換の施工事例一覧｜宝宮設備',
    description: '横浜市・川崎市・厚木市・海老名市での給湯器交換施工事例。エリア・メーカー・設置タイプで絞り込み可能。',
    url: 'https://www.houmiya-boiler.com/cases',
    siteName: '宝宮設備 給湯器交換専門サイト',
    locale: 'ja_JP',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '給湯器交換の施工事例一覧' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.png'] },
}

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  numberOfItems: casesData.length,
  itemListElement: casesData.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `${c.area} ${c.afterModel} 交換事例`,
    url: `https://www.houmiya-boiler.com/cases/${c.slug}`,
  })),
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'トップ', item: 'https://www.houmiya-boiler.com' },
    { '@type': 'ListItem', position: 2, name: '施工事例一覧', item: 'https://www.houmiya-boiler.com/cases' },
  ],
}

export default function CasesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <Header />
      <main className="pt-[100px]">

        <section className="bg-brand-900 text-white py-10">
          <div className="max-w-6xl mx-auto px-4">
            <nav className="flex items-center gap-3 mb-4 text-sm flex-wrap">
              <Link href="/" className="text-blue-200 hover:text-white">トップ</Link>
              <span className="text-blue-400">›</span>
              <span>施工事例一覧</span>
            </nav>
            <h1 className="text-3xl font-black mb-2">施工事例一覧</h1>
            <p className="text-blue-100 text-sm">
              横浜市・川崎市・厚木市・海老名市での給湯器交換 全{casesData.length}件
            </p>
          </div>
        </section>

        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <CasesGrid cases={casesData} />
            <p className="text-xs text-gray-400 mt-6">
              ※ 掲載内容には、代表的な施工内容をもとに構成した交換ケース例を含みます。
            </p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-black text-gray-900 mb-2">給湯器交換のご相談はこちら</h2>
            <p className="text-gray-500 text-sm mb-6">
              施工事例と同様の交換をご希望の方は、お気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/estimate"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black text-lg px-8 py-4 rounded-lg transition-colors w-full sm:w-auto justify-center"
              >
                無料見積もりを依頼する
              </Link>
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-2 border-2 border-brand-900 text-brand-900 font-black text-lg px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors w-full sm:w-auto justify-center"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}
