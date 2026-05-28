import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import Breadcrumb from '@/components/Breadcrumb'
import CTABanner from '@/components/CTABanner'

export const metadata: Metadata = {
  title: 'ブログ・お役立ち情報｜給湯器交換のこと｜株式会社宝宮設備',
  description: '給湯器の寿命・交換のタイミング・エコジョーズとは・メーカー比較など、給湯器に関するお役立ち情報を発信しています。',
  alternates: { canonical: 'https://houmiya-boiler.com/blog' },
}

const samplePosts = [
  { title: '給湯器の寿命は何年？交換のサインと正しいタイミング', category: '豆知識', date: '2024-01-15', excerpt: '一般的なガス給湯器の寿命は10〜15年とされています。交換を検討すべきサインとタイミングを詳しく解説します。' },
  { title: '冬場に給湯器が故障した！緊急時の対応と業者の選び方', category: '緊急対応', date: '2024-01-08', excerpt: '冬場の給湯器故障は生活に大きな支障をきたします。緊急時の対応方法と信頼できる業者の選び方を解説。' },
  { title: 'エコジョーズとは？メリット・デメリットと費用対効果', category: 'エコジョーズ', date: '2023-12-20', excerpt: '省エネ給湯器「エコジョーズ」の仕組み・メリット・設置条件・費用対効果について詳しく解説します。' },
  { title: 'リンナイ・ノーリツ・パロマの違いは？給湯器メーカー比較', category: 'メーカー比較', date: '2023-12-10', excerpt: '国内主要給湯器メーカーの特徴・価格帯・アフターサービスを比較。選び方のポイントも解説します。' },
  { title: '給湯器のエラーコード一覧と対処法', category: '故障・トラブル', date: '2023-11-25', excerpt: '給湯器に表示されるエラーコードの意味と対処方法を主要メーカー別に解説します。' },
  { title: 'マンションの給湯器交換で気をつけること', category: 'マンション', date: '2023-11-15', excerpt: 'マンションのPS設置型給湯器交換時の注意点・管理規約の確認・工事の流れを解説します。' },
]

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumb items={[{ label: 'ホーム', href: '/' }, { label: 'ブログ' }]} />

        <section className="bg-gradient-to-r from-brand-900 to-brand-800 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h1 className="text-white font-black text-3xl md:text-4xl mb-3">ブログ・お役立ち情報</h1>
            <p className="text-slate-200 text-base md:text-lg max-w-xl mx-auto">
              給湯器の豆知識・交換のタイミング・選び方など、役に立つ情報を発信しています。
            </p>
          </div>
        </section>

        <section className="bg-slate-50 py-14 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-5 mb-10">
              {samplePosts.map((post) => (
                <article key={post.title} className="bg-white rounded-lg p-5 md:p-6 border border-slate-200 shadow-card hover:shadow-card-md hover:border-sky transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-sky/10 text-sky-dark text-xs font-bold px-2.5 py-1 rounded-full border border-sky/20">{post.category}</span>
                    <span className="text-gray-400 text-xs">{post.date}</span>
                  </div>
                  <h2 className="font-black text-brand-800 text-base mb-2 leading-tight hover:text-sky-dark cursor-pointer">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <div className="mt-3 text-sky-dark text-xs font-bold">続きを読む →</div>
                </article>
              ))}
            </div>
            <div className="text-center bg-white rounded-lg border border-slate-200 p-6 shadow-card">
              <p className="text-gray-500 text-sm">
                ※ 本ブログは順次更新予定です。給湯器に関するご質問はお気軽にお問い合わせください。
              </p>
            </div>
          </div>
        </section>

        <CTABanner variant="full" />
      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}

