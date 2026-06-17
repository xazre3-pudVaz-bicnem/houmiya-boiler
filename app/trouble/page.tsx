import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import { siteConfig } from '@/data/site'
import { troubleList } from '@/data/trouble-configs'

export const metadata: Metadata = {
  title: '給湯器のトラブル・症状別ページ一覧｜お湯が出ない・エラーコード・水漏れなど',
  description:
    '給湯器のトラブル症状別ページ一覧。お湯が出ない・エラーコード111・水漏れ・追い焚きできない・ガス臭いなど症状から原因と対処法を確認できます。横浜市・川崎市・厚木市・海老名市対応。',
  alternates: { canonical: 'https://www.houmiya-boiler.com/trouble' },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'トップ', item: 'https://www.houmiya-boiler.com' },
    {
      '@type': 'ListItem',
      position: 2,
      name: '給湯器のトラブル症状一覧',
      item: 'https://www.houmiya-boiler.com/trouble',
    },
  ],
}

export default function TroubleIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main className="pt-[100px]">

        <section className="bg-brand-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <nav className="flex items-center gap-3 mb-4 text-sm flex-wrap">
              <Link href="/" className="text-blue-200 hover:text-white">トップ</Link>
              <span className="text-blue-400">›</span>
              <span>給湯器のトラブル</span>
            </nav>
            <h1 className="text-3xl font-black mb-3">給湯器のトラブル症状一覧</h1>
            <p className="text-blue-100 text-sm max-w-2xl leading-relaxed">
              給湯器の症状から原因と対処法を確認できます。修理・交換のご相談は株式会社宝宮設備まで。
              横浜市・川崎市・厚木市・海老名市に対応しています。
            </p>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {troubleList.map((t) => (
                <Link
                  key={t.slug}
                  href={`/trouble/${t.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-200 transition-all group"
                >
                  {t.isSafety && (
                    <span className="inline-block text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-full px-2.5 py-0.5 mb-2">
                      安全重要
                    </span>
                  )}
                  <div className="font-black text-gray-900 text-base mb-1 group-hover:text-brand-700">
                    {t.title}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
                    {t.description}
                  </p>
                  <span className="text-xs font-bold text-brand-700">詳しく見る →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-lg font-black text-gray-900 mb-2">
              症状が解決しない場合はご相談ください
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              お電話・LINE・フォームからご相談いただけます。給湯器の写真があればよりスムーズに対応できます。
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black px-6 py-3 rounded-lg transition-colors"
              >
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                style={{ backgroundColor: '#00B900' }}
              >
                LINEで相談する
              </a>
              <Link
                href="/estimate"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                無料見積もりを依頼する
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}
