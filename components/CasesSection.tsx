'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { casesData } from '@/data/cases'

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function CasesSection() {
  const displayCases = casesData.slice(0, 3)

  return (
    <section className="bg-slate-50 py-24 md:py-32" id="cases">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <p className="section-label mb-3">施工事例</p>
            <h2 className="text-3xl md:text-4xl font-black text-brand-900 mt-2 mb-3">施工事例</h2>
            <span className="section-divider" />
          </div>
          <Link
            href="/cases"
            className="flex items-center gap-1.5 text-[13px] text-slate-500 hover:text-brand-900 transition-colors"
          >
            一覧を見る
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="grid md:grid-cols-3 gap-6"
        >
          {displayCases.map((c) => (
            <motion.div
              key={c.id}
              variants={itemVariant}
              className="bg-white border border-slate-200 group hover:shadow-md transition-all duration-300"
            >
              {/* Product image */}
              <div className="relative h-44 bg-slate-50 overflow-hidden">
                <Image
                  src={c.afterImageSrc}
                  alt={c.afterImageAlt}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="p-5">
                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-xs font-bold text-brand-900 border border-slate-200 px-2 py-0.5">
                    {c.area}
                  </span>
                  <span className="text-xs text-slate-400 border border-slate-200 px-2 py-0.5">
                    {c.buildingType}
                  </span>
                </div>

                {/* Symptom */}
                <p className="text-brand-900 font-bold text-[13px] mb-2 leading-snug line-clamp-2">{c.symptom}</p>

                {/* After model */}
                <p className="text-slate-500 text-xs mb-3">交換後：{c.afterModel}</p>

                {/* Cost + duration */}
                <div className="flex gap-3 text-xs pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400">施工時間 </span>
                    <span className="font-bold text-brand-900">{c.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">費用 </span>
                    <span className="font-bold text-coral-600">{c.costRange}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-[13px] font-bold text-brand-900 hover:text-slate-600 transition-colors border-b border-brand-900 pb-0.5"
          >
            施工事例一覧を見る
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
