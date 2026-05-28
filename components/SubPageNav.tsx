'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'

const subPages = [
  { href: '/cases', label: '施工事例', desc: '実際の工事事例を見る' },
  { href: '/area/yokohama', label: '横浜市', desc: '横浜市対応エリア詳細' },
  { href: '/area/kawasaki', label: '川崎市', desc: '川崎市対応エリア詳細' },
  { href: '/maker/rinnai', label: 'リンナイ', desc: 'リンナイ給湯器ラインナップ' },
  { href: '/maker/noritz', label: 'ノーリツ', desc: 'ノーリツ給湯器ラインナップ' },
  { href: '/ecojoys', label: 'エコジョーズ', desc: '省エネ給湯器について' },
]

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function SubPageNav() {
  return (
    <section className="bg-brand-900 py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16 text-center"
        >
          <p className="text-sky text-xs font-bold tracking-[0.3em] uppercase mb-4">
            詳しくはこちら
          </p>
          <h2 className="text-white font-black text-3xl md:text-4xl tracking-tight mb-4">
            宝宮設備をもっと知る
          </h2>
          <div className="w-8 h-0.5 bg-sky mx-auto" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-brand-800 mb-16"
        >
          {subPages.map((page) => (
            <motion.div key={page.href} variants={itemVariant}>
              <Link
                href={page.href}
                className="block bg-brand-900 hover:bg-brand-800 px-8 py-8 group transition-colors duration-200"
              >
                <div className="font-black text-white text-xl mb-2 group-hover:text-sky transition-colors">
                  {page.label}
                </div>
                <div className="text-slate-400 text-xs mb-5">{page.desc}</div>
                <div className="w-4 h-px bg-brand-700 group-hover:bg-sky group-hover:w-8 transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="text-center border-t border-brand-800 pt-16"
        >
          <p className="text-slate-400 text-sm mb-6">まずはお気軽にご相談ください</p>
          <a
            href="tel:046-205-4558"
            className="inline-flex items-center gap-3 text-white group"
          >
            <svg className="w-5 h-5 text-coral-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <span className="font-black text-3xl md:text-4xl tracking-wide group-hover:text-coral-400 transition-colors">
              046-205-4558
            </span>
          </a>
          <div className="text-slate-500 text-xs mt-2">受付 9:00〜18:00（年中無休）</div>
        </motion.div>

      </div>
    </section>
  )
}
