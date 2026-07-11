'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'

const areas = [
  { city: '横浜市', slug: 'yokohama', note: '全18区対応' },
  { city: '川崎市', slug: 'kawasaki', note: '全7区対応' },
  { city: '厚木市', slug: 'atsugi',   note: '本社所在地' },
  { city: '海老名市', slug: 'ebina',  note: '全域対応' },
]

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function AreaSection() {
  return (
    <section className="bg-white py-24 md:py-32" id="area">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16"
        >
          <p className="section-label mb-3">対応エリア</p>
          <h2 className="text-3xl md:text-4xl font-black text-brand-900 mt-2 mb-3">対応エリア</h2>
          <span className="section-divider" />
          <p className="text-slate-400 text-sm mt-5">
            神奈川県内を中心に、下記エリアで給湯器交換に対応しています。
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid sm:grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 mb-12"
        >
          {areas.map((area) => (
            <motion.div key={area.city} variants={itemVariant} className="bg-white">
              <Link
                href={`/area/${area.slug}`}
                className="block bg-white px-8 py-9 hover:bg-brand-900 transition-colors duration-200 group"
              >
                <div className="text-[11px] text-slate-400 group-hover:text-sky font-semibold tracking-wider mb-2 transition-colors">
                  {area.note}
                </div>
                <div className="text-brand-900 group-hover:text-white font-black text-2xl mb-1 transition-colors">
                  {area.city}
                </div>
                <div className="mt-5 w-5 h-px bg-slate-200 group-hover:bg-sky group-hover:w-8 transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-sm"
        >
          上記以外のエリアもご相談ください。
          <a href="tel:046-205-4558" className="text-brand-900 font-bold ml-2 hover:text-coral-600 transition-colors">
            046-205-4558
          </a>
        </motion.p>

      </div>
    </section>
  )
}
