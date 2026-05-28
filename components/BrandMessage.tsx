'use client'

import { motion, type Variants } from 'framer-motion'

const strengths = [
  { number: '10+', label: '年の実績', desc: '地域に根ざした施工経験' },
  { number: '1,000+', label: '件の施工', desc: '横浜・川崎を中心に' },
  { number: '24h', label: 'LINE受付', desc: '写真でかんたん相談' },
  { number: '0円', label: '見積もり', desc: '現地確認・お見積もり無料' },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

export default function BrandMessage() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: brand statement */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p variants={fadeUp} className="section-label mb-4">
              宝宮設備について
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-black text-brand-900 leading-[1.2] tracking-tight mb-6"
            >
              安心できる工事を、<br />誠実に届ける。
            </motion.h2>
            <motion.div variants={fadeUp} className="w-8 h-0.5 bg-sky mb-8" />
            <motion.p variants={fadeUp} className="text-slate-500 text-[15px] leading-[1.9]">
              給湯器の交換は、日常の快適さを左右する大切な工事です。
              宝宮設備は自社スタッフによる一貫施工と、地域密着のきめ細かいサービスで、
              横浜市・川崎市・厚木市・海老名市のお客様に安心をお届けしています。
            </motion.p>
          </motion.div>

          {/* Right: stats grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 gap-px bg-slate-100"
          >
            {strengths.map((s) => (
              <motion.div
                key={s.number}
                variants={fadeUp}
                className="bg-white p-8"
              >
                <div className="text-brand-900 font-black text-3xl tracking-tight mb-1">
                  {s.number}
                </div>
                <div className="text-brand-900 font-bold text-sm mb-2">{s.label}</div>
                <div className="text-slate-400 text-xs">{s.desc}</div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
