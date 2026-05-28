'use client'

import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { faqData } from '@/data/faq'

const faqItemVariant: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const faqListVariant: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const displayItems = faqData.slice(0, 5)

  return (
    <section className="bg-slate-50 py-24 md:py-32" id="faq">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">よくある質問</p>
          <h2 className="text-3xl md:text-4xl font-black text-brand-900 mt-2 mb-3">
            よくあるご質問
          </h2>
          <span className="section-divider" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={faqListVariant}
          className="border-t border-slate-200"
        >
          {displayItems.map((item, idx) => (
            <motion.div
              key={idx}
              variants={faqItemVariant}
              className="border-b border-slate-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-start gap-5 py-6 text-left group"
                aria-expanded={openIndex === idx}
              >
                <span className="flex-shrink-0 text-sky font-black text-sm mt-0.5 w-4">Q</span>
                <span className="flex-1 font-bold text-brand-900 text-[15px] leading-snug group-hover:text-slate-600 transition-colors">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 text-slate-300 mt-0.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === idx && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="flex gap-5 pb-6 -mt-2">
                      <span className="flex-shrink-0 text-slate-300 font-black text-sm w-4">A</span>
                      <p className="text-slate-500 text-[14px] leading-relaxed">{item.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-slate-500"
        >
          <span>解決しない場合はお気軽にご相談ください</span>
          <a
            href="tel:046-205-4558"
            className="text-brand-900 font-black tracking-wide hover:text-coral-600 transition-colors whitespace-nowrap"
          >
            046-205-4558
          </a>
        </motion.div>

      </div>
    </section>
  )
}
