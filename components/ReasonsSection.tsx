'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { staffImages, workImages } from '@/data/images'

const reasons = [
  {
    number: '01',
    title: '自社施工',
    highlight: '一貫体制で安心',
    body: '外注を使わず自社スタッフが一貫対応。相談から見積もり・工事・アフターフォローまで同じ担当者が責任を持って対応します。',
    imageSrc: staffImages.technician1.src,
    imageAlt: '自社施工 宝宮設備 専門スタッフ',
  },
  {
    number: '02',
    title: '施工技術力',
    highlight: '豊富な施工経験',
    body: 'あらゆるタイプの住宅・マンションで施工経験があります。設置状況に合わせた最適な工法で、確実・丁寧に工事を行います。',
    imageSrc: workImages.installation.src,
    imageAlt: '給湯器交換工事 専門技術',
  },
  {
    number: '03',
    title: '地域密着',
    highlight: '厚木発・神奈川全域対応',
    body: '厚木市を拠点に横浜市・川崎市・海老名市に対応。地域をよく知るスタッフが素早くお伺いし、緊急時も最短即日を目指します。',
    imageSrc: workImages.outdoorBoiler.src,
    imageAlt: '地域密着 神奈川県 給湯器交換',
  },
  {
    number: '04',
    title: 'アフターフォロー',
    highlight: '工事後も安心サポート',
    body: 'メーカー保証に加え、施工部分についても保証を設けています。工事後も気になることがあればいつでもご連絡ください。',
    imageSrc: staffImages.representative.src,
    imageAlt: 'アフターフォロー 宝宮設備 代表',
  },
]

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function ReasonsSection() {
  return (
    <section className="bg-slate-50 py-24 md:py-32" id="reasons">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">選ばれる理由</p>
          <h2 className="text-3xl md:text-4xl font-black text-brand-900 mt-2 mb-3">
            宝宮設備が選ばれる理由
          </h2>
          <span className="block w-8 h-0.5 bg-sky mx-auto mt-3" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
        >
          {reasons.map((r) => (
            <motion.div
              key={r.number}
              variants={cardVariant}
              className="group text-center cursor-default hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Circular image */}
              <div className="relative w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                <Image
                  src={r.imageSrc}
                  alt={r.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="144px"
                />
                {/* Subtle orange ring on hover */}
                <div className="absolute inset-0 rounded-full ring-4 ring-transparent group-hover:ring-orange-400 transition-all duration-300" />
              </div>

              {/* Number */}
              <div className="text-sky font-black text-xs tracking-[0.2em] mb-2">{r.number}</div>

              {/* Title */}
              <h3 className="font-black text-brand-900 text-xl mb-1">{r.title}</h3>
              <div className="text-orange-500 text-xs font-bold mb-3 tracking-wide">{r.highlight}</div>

              {/* Body */}
              <p className="text-slate-500 text-[13px] leading-relaxed">{r.body}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
