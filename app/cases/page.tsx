import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import { casesData } from '@/data/cases'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: '給湯器交換の施工事例｜横浜・川崎・厚木・海老名｜宝宮設備',
  description:
    '株式会社宝宮設備の給湯器交換施工事例一覧。横浜市・川崎市・厚木市・海老名市での施工実績を紹介。リンナイ・ノーリツ・パロマ対応。',
}

export default function CasesPage() {
  return (
    <>
      <Header />
      <main className="pt-[100px]">

        <section className="bg-brand-900 text-white py-10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-4 text-sm">
              <Link href="/" className="text-blue-200 hover:text-white">トップ</Link>
              <span className="text-blue-400">›</span>
              <span>施工事例</span>
            </div>
            <h1 className="text-3xl font-black mb-2">施工事例一覧</h1>
            <p className="text-blue-100 text-sm">横浜市・川崎市・厚木市・海老名市での給湯器交換施工実績</p>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {casesData.map((c) => (
                <div key={c.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 relative overflow-hidden">
                    <Image
                      src={c.imageSrc}
                      alt={c.imageAlt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      <span className="bg-brand-700 text-white text-[10px] font-bold px-2 py-0.5 rounded">{c.date}</span>
                      <span className="bg-white text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded">{c.maker}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{c.area}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{c.buildingType}</span>
                      <span className="text-xs bg-blue-50 text-brand-700 px-2 py-0.5 rounded">{c.type}</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      <span className="font-bold text-gray-700">交換後：</span>{c.afterModel}
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      <span className="font-bold text-gray-700">設置タイプ：</span>{c.installationType}
                      <span className="mx-2">|</span>
                      <span className="font-bold text-gray-700">施工時間：</span>{c.duration}
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{c.comment}</p>
                  </div>
                </div>
              ))}
            </div>
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
