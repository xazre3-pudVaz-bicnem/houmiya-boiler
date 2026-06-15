import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import ProductCard from '@/components/ProductCard'
import { getProductsByMaker } from '@/data/products'
import { siteConfig } from '@/data/site'

type AreaConfig = {
  name: string
  wards?: string[]
  text1: string
  text2: string
  metaTitle: string
  metaDescription: string
  faqs: { q: string; a: string }[]
}

const areaConfigs: Record<string, AreaConfig> = {
  yokohama: {
    name: '横浜市',
    wards: ['鶴見区', '神奈川区', '西区', '中区', '南区', '港南区', '保土ケ谷区', '旭区', '磯子区', '金沢区', '港北区', '緑区', '青葉区', '都筑区', '戸塚区', '栄区', '泉区', '瀬谷区'],
    text1: '横浜市は18区にわたる広大な都市で、戸建て・マンション・アパートなど多様な住宅が密集しています。株式会社宝宮設備は横浜市全域に対応しており、青葉区・都筑区・港北区のニュータウンエリアから、港南区・戸塚区・金沢区の住宅密集地まで迅速に対応しています。',
    text2: '横浜市内では給湯器の交換依頼が特に多く、年間を通じて施工実績があります。マンションのPS設置型、戸建ての壁掛型など、多様な設置タイプに対応。現地確認または写真確認後に即日お見積もりをご提示します。',
    metaTitle: '横浜市の給湯器交換・販売なら株式会社宝宮設備｜最大80%OFF工事費込み',
    metaDescription: '横浜市（全18区）の給湯器交換・販売なら株式会社宝宮設備。リンナイ・ノーリツ・パロマ対応。最大80%OFFの工事費込み価格。無料見積もり受付中。',
    faqs: [
      { q: '横浜市のどのエリアに対応していますか？', a: '横浜市内の全18区に対応しています。青葉区・都筑区・港北区・戸塚区・金沢区など、市内全域に迅速にお伺いします。' },
      { q: 'マンションのPS設置型の交換もできますか？', a: 'はい。横浜市内のマンションのPS標準設置型・PS扉内設置型にも対応しています。' },
      { q: '横浜市での工事時間はどのくらいですか？', a: '標準的な給湯器交換は2〜4時間程度です。設置状況により変動しますが、事前に目安時間をお伝えします。' },
    ],
  },
  kawasaki: {
    name: '川崎市',
    wards: ['川崎区', '幸区', '中原区', '高津区', '多摩区', '宮前区', '麻生区'],
    text1: '川崎市は7区で構成される神奈川県内有数の都市です。中原区・幸区の高層マンションエリアから、宮前区・麻生区・多摩区の戸建て住宅エリアまで幅広く対応しています。株式会社宝宮設備は川崎市全域に対応しており、迅速かつ丁寧な施工を提供します。',
    text2: '川崎市内はマンションへの施工依頼が多く、PS設置タイプへの対応実績も豊富です。給湯器の型番が分かれば、現地確認不要でお見積りが可能な場合もあります。お気軽にご相談ください。',
    metaTitle: '川崎市の給湯器交換・販売なら株式会社宝宮設備｜最大80%OFF工事費込み',
    metaDescription: '川崎市（全7区）の給湯器交換・販売なら株式会社宝宮設備。リンナイ・ノーリツ・パロマ対応。最大80%OFFの工事費込み価格。無料見積もり受付中。',
    faqs: [
      { q: '川崎市のどの区に対応していますか？', a: '川崎区・幸区・中原区・高津区・多摩区・宮前区・麻生区の全7区に対応しています。' },
      { q: 'マンションが多い川崎市でも対応できますか？', a: 'はい。マンションのPS設置型を含む各種設置タイプに対応しています。' },
      { q: '緊急時にも対応できますか？', a: '在庫・スケジュール状況によりますが、できる限り迅速に対応します。まずはお電話またはLINEでご相談ください。' },
    ],
  },
  atsugi: {
    name: '厚木市',
    text1: '厚木市は株式会社宝宮設備の拠点がある地元エリアです。他のどのエリアよりも迅速に対応できます。緊急時も最短当日対応が可能な場合があります。戸建て・マンション・アパートを問わず、厚木市内全域に対応しています。',
    text2: '厚木市内での施工実績は特に豊富で、地域の住宅環境を熟知しています。ガス会社との連携もスムーズで、工事後の試運転・確認まで丁寧に対応します。地元密着の安心感をぜひご体験ください。',
    metaTitle: '厚木市の給湯器交換・販売なら株式会社宝宮設備｜最大80%OFF工事費込み',
    metaDescription: '厚木市の給湯器交換・販売なら株式会社宝宮設備（本社：厚木市）。地元密着・迅速対応。リンナイ・ノーリツ・パロマ対応。最大80%OFFの工事費込み価格。',
    faqs: [
      { q: '厚木市内に何分くらいでお伺いできますか？', a: '弊社の拠点が厚木市にあるため、市内であれば最短30〜60分程度でお伺い可能な場合があります。' },
      { q: '厚木市で緊急対応はできますか？', a: 'はい。在庫・スケジュール状況にもよりますが、地元厚木市は最優先で対応しています。まずはお電話ください。' },
      { q: '厚木市内の施工事例はありますか？', a: 'はい。厚木市内では多数の施工実績があります。施工事例ページをご確認ください。' },
    ],
  },
  ebina: {
    name: '海老名市',
    text1: '海老名市は近年の宅地開発により新興住宅地が増え、給湯器の初回交換や設置のご依頼も多いエリアです。株式会社宝宮設備は海老名市内全域に対応しています。戸建て・マンション・アパートどちらも承ります。',
    text2: '海老名市での施工実績も豊富です。オーナー様からの賃貸物件の給湯器交換依頼も多く、スピーディーかつ適正価格での対応が評価されています。',
    metaTitle: '海老名市の給湯器交換・販売なら株式会社宝宮設備｜最大80%OFF工事費込み',
    metaDescription: '海老名市の給湯器交換・販売なら株式会社宝宮設備。リンナイ・ノーリツ・パロマ対応。最大80%OFFの工事費込み価格。無料見積もり受付中。',
    faqs: [
      { q: '海老名市全域に対応していますか？', a: 'はい。海老名市内全域に対応しています。新興住宅地から賃貸物件まで幅広く対応します。' },
      { q: '賃貸物件の給湯器交換もできますか？', a: 'はい。アパートオーナー様や管理会社様からのご依頼も承っています。複数台の交換にも対応します。' },
      { q: '標準工事費に処分費は含まれますか？', a: 'はい。標準工事費に既存給湯器の撤去・処分が含まれています。別途処分費はかかりません。' },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(areaConfigs).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const config = areaConfigs[slug]
  if (!config) return {}
  return {
    title: config.metaTitle,
    description: config.metaDescription,
  }
}

const featuredProducts = [
  ...getProductsByMaker('rinnai').slice(0, 1),
  ...getProductsByMaker('noritz').slice(0, 1),
  ...getProductsByMaker('paloma').slice(0, 1),
]

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const config = areaConfigs[slug]
  if (!config) notFound()

  return (
    <>
      <Header />
      <main className="pt-[100px]">

        <section className="bg-brand-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-4 text-sm">
              <Link href="/" className="text-blue-200 hover:text-white">トップ</Link>
              <span className="text-blue-400">›</span>
              <span>対応エリア</span>
              <span className="text-blue-400">›</span>
              <span>{config.name}</span>
            </div>
            <h1 className="text-3xl font-black mb-3">{config.name}の給湯器交換・販売</h1>
            <p className="text-blue-100 text-sm">
              {config.name}の給湯器交換なら株式会社宝宮設備。リンナイ・ノーリツ・パロマ対応。最大80%OFFの工事費込み価格。
            </p>
          </div>
        </section>

        {config.wards && (
          <section className="py-8 bg-white border-b">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="font-black text-gray-900 mb-4">{config.name}の対応エリア（全{config.wards.length}区）</h2>
              <div className="flex flex-wrap gap-2">
                {config.wards.map((w) => (
                  <span key={w} className="text-sm bg-blue-50 border border-blue-200 text-brand-700 px-3 py-1.5 rounded-lg font-medium">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.name}での給湯器交換について</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">{config.text1}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{config.text2}</p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">{config.name}で人気の給湯器</h2>
            <p className="text-gray-500 text-sm mb-6">工事費込み価格 / 最大80%OFF</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/rinnai" className="text-brand-700 font-bold text-sm hover:underline">
                全商品を見る →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">{config.name}の給湯器交換 よくある質問</h2>
            <div className="space-y-4">
              {config.faqs.map((f, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                  <div className="p-4 flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-brand-700 text-white text-sm font-black flex items-center justify-center rounded-full">Q</span>
                    <div className="font-bold text-gray-900 text-sm">{f.q}</div>
                  </div>
                  <div className="px-4 pb-4 flex items-start gap-3 border-t border-gray-200 pt-4">
                    <span className="flex-shrink-0 w-6 h-6 bg-yellow-400 text-gray-900 text-sm font-black flex items-center justify-center rounded-full">A</span>
                    <div className="text-gray-600 text-sm">{f.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-brand-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-black mb-2">{config.name}の給湯器交換はお任せください</h2>
            <p className="text-blue-200 text-sm mb-6">無料見積もり受付中。{config.name}内全域対応。</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/estimate"
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-lg px-8 py-4 rounded-lg transition-colors w-full sm:w-auto justify-center"
              >
                無料見積もりを依頼する
              </Link>
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-black text-lg px-8 py-4 rounded-lg transition-colors w-full sm:w-auto justify-center"
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
