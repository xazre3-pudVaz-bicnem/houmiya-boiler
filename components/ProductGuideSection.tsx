'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'

const guides = [
  {
    id: 'heating',
    title: '暖房付き給湯器とは',
    subtitle: '床暖房・浴室乾燥対応モデル',
    description: '給湯機能に加え、床暖房や浴室暖房乾燥機などへ温水を供給できる機種。1台で給湯と暖房をまとめて管理できます。',
    imageSrc: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/e6e8c315d0ba46469e80c9918259111e/GTH-C2460AW3H-1.jpg',
    href: '/guide/heating',
  },
  {
    id: 'gou',
    title: '号数の選び方',
    subtitle: '家族人数と号数の目安を解説',
    description: '号数が大きいほど一度に多くのお湯を使えます。家族の人数・お湯の使い方から適した号数を選びましょう。',
    imageSrc: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
    href: '/guide/gou',
  },
  {
    id: 'auto',
    title: 'オート・フルオートの違い',
    subtitle: '機能の差と価格差を比較',
    description: '「オート」と「フルオート」ではお風呂の自動機能に差があります。ライフスタイルに合わせて最適なタイプを選んでください。',
    imageSrc: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=600&q=80',
    href: '/guide/auto',
  },
  {
    id: 'ecojoys',
    title: 'エコジョーズとは',
    subtitle: '排熱回収で光熱費を最大16%削減',
    description: '排気熱を再利用する二次熱交換器搭載で熱効率95%以上を実現。年間約1.5〜2万円のガス代節約が見込まれます。',
    imageSrc: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/b0793a9eb8d3465d875924edc8fb1043/item-ruf-e2406saw.jpg',
    href: '/guide/ecojoys',
  },
  {
    id: 'model',
    title: '型番の読み方',
    subtitle: '型番でわかる給湯器のスペック',
    description: '給湯器の型番にはメーカー・号数・機能・設置タイプが凝縮されています。読み方を知れば自宅の機器の仕様がすぐわかります。',
    imageSrc: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/3d0303492ec04dfa9b52be726706cc6c/RUF-A2405AWC.jpg',
    href: '/guide/model',
  },
  {
    id: 'hybrid',
    title: 'ハイブリッド給湯器とは',
    subtitle: 'ガス×電気の次世代省エネシステム',
    description: 'ガス（エコジョーズ）と電気（ヒートポンプ）を最適に使い分ける次世代型給湯器。エコキュートに迫る省エネ性能を実現します。',
    imageSrc: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    href: '/guide/hybrid',
  },
]

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function ProductGuideSection() {
  return (
    <section className="bg-orange-50 py-24 md:py-32" id="guide">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">給湯器ガイド</p>
          <h2 className="text-3xl md:text-4xl font-black text-brand-900 mt-2 mb-3">
            給湯器選びのポイント！
          </h2>
          <span className="block w-8 h-0.5 bg-sky mx-auto mt-3" />
          <p className="text-slate-500 text-sm mt-5 max-w-xl mx-auto">
            給湯器交換を検討中の方のために、知っておきたいポイントをまとめました。
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {guides.map((guide) => (
            <motion.div key={guide.id} variants={cardVariant}>
              <Link
                href={guide.href}
                className="block group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={guide.imageSrc}
                    alt={guide.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-brand-900 text-lg mb-1 leading-snug">{guide.title}</h3>
                  <p className="text-orange-500 text-xs font-bold mb-3">{guide.subtitle}</p>
                  <p className="text-slate-500 text-[13px] leading-relaxed mb-4 line-clamp-3">
                    {guide.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[13px] text-brand-900 font-bold group-hover:text-orange-500 transition-colors">
                    詳しく見る
                    <svg
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
