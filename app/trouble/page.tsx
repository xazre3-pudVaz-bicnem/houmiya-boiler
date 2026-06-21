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
  openGraph: {
    title: '給湯器のトラブル・症状別ページ一覧｜宝宮設備',
    description: '給湯器のトラブル症状別ページ一覧。お湯が出ない・エラーコード・水漏れなど症状から原因と対処法を確認できます。',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
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

        {/* リード文 */}
        <section className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                給湯器の不具合は、「お湯が出ない」「エラーコードが出る」「追い焚きができない」「お湯の温度が安定しない」「水漏れ」「リモコンがつかない」「異音がする」「ガス臭い」など、症状によって原因も対処法も異なります。
                症状によっては、ガス栓やガスメーターの確認、リモコンのリセットなど、ご自身で対処できるものもあります。一方で、内部部品の劣化が原因の場合は修理・交換が必要です。
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                このページでは、給湯器でよくある症状を一覧にまとめています。それぞれのページでは、考えられる原因・まず確認すべきこと・修理で済むケースと交換を検討するケース・使用年数の目安・よくある質問を掲載しています。
                給湯器の寿命は一般的に10年前後とされており、使用年数が10年を超えて症状が複数出ている場合は、修理より交換が適切なケースが多くなります。
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                なお、ガスのにおいがする場合や、「ポン」「バン」といった爆発音に近い異音がする場合は、安全に関わる可能性があります。ただちに使用を中止し、換気のうえガス会社または専門業者へご連絡ください。
                症状が解決しない場合や交換をご検討の際は、横浜市・川崎市・厚木市・海老名市対応の株式会社宝宮設備までご相談ください。給湯器の写真をLINEでお送りいただくだけでも概算見積もりが可能です。
              </p>
            </div>
          </div>
        </section>

        {/* 症状カテゴリの説明 */}
        <section className="py-6 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: 'お湯・温度のトラブル', desc: 'お湯が出ない・温度が安定しない・追い焚きができないなど、お湯に関する症状です。' },
                { name: 'エラー・表示のトラブル', desc: 'エラーコード（111・110など）やリモコンがつかないといった表示・操作の症状です。' },
                { name: '安全に関わるトラブル', desc: '異音・ガス臭いなど、安全に関わる可能性のある症状です。安全確保を最優先してください。' },
              ].map((c) => (
                <div key={c.name} className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="font-black text-gray-900 text-sm mb-1">{c.name}</div>
                  <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">給湯器のトラブル症状一覧</h2>
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
