import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import ProductCard from '@/components/ProductCard'
import CapacityGuide from '@/components/CapacityGuide'
import { productsData, getProductsByCategory, getProductsByInstallation } from '@/data/products'
import { siteConfig } from '@/data/site'

type CategoryConfig = {
  title: string
  description: string
  metaTitle: string
  metaDescription: string
  color: string
}

const categoryConfigs: Record<string, CategoryConfig> = {
  'gas-furo': {
    title: 'ガスふろ給湯器 一覧',
    description: 'ガスふろ給湯器（オート・フルオート）の商品一覧。リンナイ・ノーリツ・パロマ各メーカーの壁掛型を最大80%OFFの工事費込み価格でご提供。',
    metaTitle: 'ガスふろ給湯器の交換・販売｜横浜・川崎・厚木・海老名｜宝宮設備',
    metaDescription: 'ガスふろ給湯器の交換・販売なら宝宮設備。リンナイ・ノーリツ・パロマ対応。最大80%OFFの工事費込み価格。横浜市・川崎市・厚木市・海老名市。',
    color: 'blue',
  },
  'gas-kyuto': {
    title: '給湯専用 給湯器 一覧',
    description: '給湯専用タイプの給湯器。シンプルな機能でリーズナブルな価格帯。1〜2人世帯や賃貸物件のオーナー様に人気。',
    metaTitle: '給湯専用給湯器の交換・販売｜横浜・川崎・厚木・海老名｜宝宮設備',
    metaDescription: '給湯専用給湯器の交換・販売なら宝宮設備。リンナイ・ノーリツ・パロマ対応。工事費込み価格。横浜市・川崎市・厚木市・海老名市。',
    color: 'gray',
  },
  'eco-jaws': {
    title: 'エコジョーズ 給湯器 一覧',
    description: '省エネ型のエコジョーズ給湯器。従来型より熱効率が高く、ガス代の節約が期待できます。補助金対象機種もあります。',
    metaTitle: 'エコジョーズ給湯器の交換・販売｜横浜・川崎・厚木・海老名｜宝宮設備',
    metaDescription: 'エコジョーズ給湯器の交換・販売なら宝宮設備。省エネ・ガス代節約。リンナイ・ノーリツ・パロマ対応。横浜市・川崎市・厚木市・海老名市。',
    color: 'green',
  },
  'warm-water-heating': {
    title: 'ガス温水暖房付ふろ給湯器 一覧',
    description: '給湯と温水暖房が一体になったタイプ。TES熱源機からの交換にも対応。床暖房・パネルヒーターとの組み合わせに最適。',
    metaTitle: 'ガス温水暖房付ふろ給湯器の交換・販売｜横浜・川崎・厚木・海老名｜宝宮設備',
    metaDescription: 'ガス温水暖房付ふろ給湯器の交換・販売なら宝宮設備。TES熱源機からの交換対応。横浜市・川崎市・厚木市・海老名市。',
    color: 'orange',
  },
  'ps-standard': {
    title: 'マンション PS標準設置型 給湯器 一覧',
    description: 'マンションのパイプスペース（PS）に設置する標準設置型給湯器。マンション規格に適合した機種を取り扱っています。',
    metaTitle: 'PS標準設置型給湯器の交換・販売｜横浜・川崎・厚木・海老名｜宝宮設備',
    metaDescription: 'マンションPS標準設置型給湯器の交換・販売なら宝宮設備。マンション規格対応機種。横浜市・川崎市・厚木市・海老名市。',
    color: 'purple',
  },
  'ps-door': {
    title: 'マンション PS扉内設置型 給湯器 一覧',
    description: 'マンションのパイプスペース扉内に設置するコンパクト型給湯器。スペースが限られた環境に対応した機種をご提供。',
    metaTitle: 'PS扉内設置型給湯器の交換・販売｜横浜・川崎・厚木・海老名｜宝宮設備',
    metaDescription: 'マンションPS扉内設置型給湯器の交換・販売なら宝宮設備。コンパクト設置対応。横浜市・川崎市・厚木市・海老名市。',
    color: 'purple',
  },
  'balanced-flue': {
    title: 'BF式（バランス型）給湯器 一覧',
    description: '浴室内に設置するBF式（バランス型）給湯器。給排気が独立したバランス釜タイプからの交換対応。',
    metaTitle: 'BF式給湯器の交換・販売｜横浜・川崎・厚木・海老名｜宝宮設備',
    metaDescription: 'BF式（バランス型）給湯器の交換・販売なら宝宮設備。バランス釜からの交換対応。横浜市・川崎市・厚木市・海老名市。',
    color: 'teal',
  },
}

const categoryToProductCategory: Record<string, Parameters<typeof getProductsByCategory>[0]> = {
  'gas-furo': 'gas-furo',
  'gas-kyuto': 'gas-kyuto',
  'eco-jaws': 'eco-jaws',
  'warm-water-heating': 'warm-water-heating',
}

const categoryToInstallation: Record<string, Parameters<typeof getProductsByInstallation>[0]> = {
  'ps-standard': 'ps-standard',
  'ps-door': 'ps-door',
  'balanced-flue': 'balanced-flue',
}

export async function generateStaticParams() {
  return Object.keys(categoryConfigs).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const config = categoryConfigs[slug]
  if (!config) return {}
  return {
    title: config.metaTitle,
    description: config.metaDescription,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const config = categoryConfigs[slug]
  if (!config) notFound()

  let products = categoryToProductCategory[slug]
    ? getProductsByCategory(categoryToProductCategory[slug])
    : categoryToInstallation[slug]
    ? getProductsByInstallation(categoryToInstallation[slug])
    : productsData.slice(0, 6)

  return (
    <>
      <Header />
      <main className="pt-[100px]">

        <section className="bg-brand-900 text-white py-10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-4 text-sm">
              <Link href="/" className="text-blue-200 hover:text-white">トップ</Link>
              <span className="text-blue-400">›</span>
              <span>{config.title}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black mb-3">{config.title}</h1>
            <p className="text-blue-100 text-sm">{config.description}</p>
          </div>
        </section>

        <section className="py-6 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <CapacityGuide />
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" /></svg>
                </div>
                <div className="text-gray-500 text-lg font-bold mb-2">この設置タイプは要見積もりです</div>
                <p className="text-gray-400 text-sm mb-6">
                  設置タイプ・メーカー・号数に合わせた最適な機種をご提案します。
                </p>
                <Link
                  href="/estimate"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg transition-colors"
                >
                  無料見積もりを依頼する
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="py-10 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 text-center">
              <h2 className="font-black text-xl text-gray-900 mb-2">お探しの機種が見つからない場合</h2>
              <p className="text-gray-600 text-sm mb-4">
                掲載していない機種・設置タイプも対応可能な場合があります。お気軽にご相談ください。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/estimate"
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-colors w-full sm:w-auto justify-center"
                >
                  無料見積もりを依頼する
                </Link>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center gap-2 border-2 border-brand-700 text-brand-700 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors w-full sm:w-auto justify-center"
                >
                  {siteConfig.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}
