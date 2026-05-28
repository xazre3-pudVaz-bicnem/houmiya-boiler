'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'

const makers = [
  { label: 'リンナイ', en: 'Rinnai', desc: 'フルオート・オートタイプに強み', href: '/maker/rinnai' },
  { label: 'ノーリツ', en: 'Noritz', desc: 'エコジョーズラインが充実', href: '/maker/noritz' },
  { label: 'パロマ', en: 'Paloma', desc: 'コストを抑えたい方に', href: '/maker/paloma' },
]

const types = [
  { label: 'エコジョーズ', desc: '省エネタイプ', href: '/ecojoys' },
  { label: 'フルオート', desc: '全自動・保温機能付き', href: '/maker/rinnai' },
  { label: 'オート', desc: '自動湯はり・追い焚き', href: '/maker/rinnai' },
  { label: '給湯専用', desc: 'シンプル・リーズナブル', href: '/maker/paloma' },
]

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function ProductCategoriesSection() {
  return (
    <section className="bg-white py-24 md:py-32" id="products">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16"
        >
          <p className="section-label mb-3">取り扱い給湯器</p>
          <h2 className="text-3xl md:text-4xl font-black text-brand-900 mt-2 mb-3">
            給湯器を探す
          </h2>
          <span className="section-divider" />
        </motion.div>

        {/* Makers */}
        <div className="mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-5"
          >
            メーカーから選ぶ
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-slate-200"
          >
            {makers.map((m) => (
              <motion.div key={m.label} variants={itemVariant} className="bg-white">
                <Link
                  href={m.href}
                  className="block bg-white px-8 py-9 hover:bg-brand-900 transition-colors duration-200 group"
                >
                  <div className="text-[11px] text-slate-400 group-hover:text-sky font-medium uppercase tracking-widest mb-2 transition-colors">
                    {m.en}
                  </div>
                  <div className="text-brand-900 group-hover:text-white font-black text-2xl mb-2 transition-colors">
                    {m.label}
                  </div>
                  <div className="text-slate-400 group-hover:text-slate-300 text-xs transition-colors">
                    {m.desc}
                  </div>
                  <div className="mt-5 w-5 h-px bg-slate-200 group-hover:bg-sky group-hover:w-8 transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Types */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-5"
          >
            タイプから選ぶ
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200"
          >
            {types.map((t) => (
              <motion.div key={t.label} variants={itemVariant} className="bg-white">
                <Link
                  href={t.href}
                  className="block bg-white px-7 py-8 hover:bg-brand-900 transition-colors duration-200 group"
                >
                  <div className="text-brand-900 group-hover:text-white font-bold text-lg mb-1.5 transition-colors">
                    {t.label}
                  </div>
                  <div className="text-slate-400 group-hover:text-slate-300 text-xs transition-colors">
                    {t.desc}
                  </div>
                  <div className="mt-4 w-4 h-px bg-slate-200 group-hover:bg-sky group-hover:w-6 transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
