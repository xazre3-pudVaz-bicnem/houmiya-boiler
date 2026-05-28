'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { productListings } from '@/data/productListing'

type MakerId = 'noritz' | 'rinnai' | 'paloma'

const makers: { id: MakerId; label: string; en: string; headerText: string }[] = [
  { id: 'noritz', label: 'ノーリツ', en: 'NORITZ', headerText: '安心のメーカー10年保証付き商品' },
  { id: 'rinnai', label: 'リンナイ', en: 'Rinnai', headerText: '2年・10年選べる保証付き商品' },
  { id: 'paloma', label: 'パロマ', en: 'Paloma', headerText: 'コストパフォーマンス重視の商品' },
]

export default function ProductListingSection() {
  const [activeMaker, setActiveMaker] = useState<MakerId>('noritz')
  const displayProducts = productListings.filter((p) => p.maker === activeMaker).slice(0, 3)
  const activeHeader = makers.find((m) => m.id === activeMaker)?.headerText ?? ''

  return (
    <section className="bg-white py-24 md:py-32" id="products">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="section-label mb-3">取り扱い商品</p>
          <h2 className="text-3xl md:text-4xl font-black text-brand-900 mt-2 mb-3">
            おすすめ給湯器
          </h2>
          <span className="block w-8 h-0.5 bg-sky mx-auto mt-3" />
          <p className="text-slate-500 text-sm mt-5">
            リンナイ・ノーリツ・パロマなど主要メーカーに対応。設置状況に合わせてご提案します。
          </p>
        </motion.div>

        {/* Maker tabs */}
        <div className="flex justify-center gap-0 mb-8 border border-slate-200 w-fit mx-auto">
          {makers.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMaker(m.id)}
              className={`px-8 py-3 text-sm font-bold transition-all duration-200 ${
                activeMaker === m.id
                  ? 'bg-brand-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {m.en}
            </button>
          ))}
        </div>

        {/* Warranty header bar */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMaker + '-header'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-6"
          >
            <div className="bg-orange-500 text-white text-sm font-bold px-5 py-3 flex items-center gap-2 w-fit">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {activeHeader}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Product grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMaker}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {displayProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-slate-200 group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
              >
                {product.popular && (
                  <div className="absolute top-0 right-0 bg-coral-600 text-white text-[10px] font-bold px-3 py-1 z-10">
                    人気
                  </div>
                )}

                {/* Image */}
                <div className="relative bg-slate-50 h-48 overflow-hidden">
                  <Image
                    src={product.imageSrc}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Warranty badge */}
                  <div className="absolute top-3 left-3 w-16 h-16 bg-orange-500 text-white rounded-full flex flex-col items-center justify-center text-center z-10 shadow-md leading-none">
                    <span className="text-[8px] font-bold mt-1">安心</span>
                    <span className="text-xs font-black">{product.warranty.replace('保証', '')}</span>
                    <span className="text-[8px] font-bold mb-1">保証</span>
                  </div>
                  {product.eco && (
                    <div className="absolute bottom-3 right-3 bg-sky text-white text-[9px] font-black px-2 py-1 z-10">
                      ECO
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="text-[11px] font-black text-brand-700 tracking-wider mb-1">{product.makerEn}</div>
                  <div className="text-xs text-slate-400 mb-1.5 font-mono">{product.modelNumber}</div>
                  <h3 className="font-bold text-brand-900 text-sm leading-snug mb-3">{product.name}</h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    <span className="bg-brand-50 text-brand-800 text-[10px] font-bold px-2 py-0.5 rounded-sm">{product.size}</span>
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-sm">{product.type}</span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="text-slate-400 text-xs line-through">
                      標準価格 ¥{product.listPrice.toLocaleString()}
                    </div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-coral-600 font-black text-2xl">
                        ¥{product.salePrice.toLocaleString()}
                      </span>
                      <span className="text-slate-400 text-xs">（税込）</span>
                    </div>
                  </div>

                  <Link
                    href={product.href}
                    className="block text-center bg-brand-900 hover:bg-orange-500 text-white text-sm font-bold py-2.5 transition-colors duration-200"
                  >
                    詳細を見る
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom note */}
        <div className="mt-12 text-center border-t border-slate-100 pt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-brand-900 hover:bg-orange-500 text-white font-bold text-sm px-8 py-3 mb-8 transition-colors"
          >
            すべての商品を見る
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <p className="text-slate-400 text-sm mb-5">
            上記以外にも多数取り揃えております。機種選びにお困りの際はお気軽にご相談ください。
          </p>
          <a
            href="tel:046-205-4558"
            className="inline-flex items-center gap-2 text-brand-900 font-black text-2xl tracking-wide hover:text-coral-600 transition-colors"
          >
            <svg className="w-5 h-5 text-coral-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            046-205-4558
          </a>
          <div className="text-slate-400 text-xs mt-1">受付 9:00〜18:00（年中無休）</div>
        </div>

      </div>
    </section>
  )
}
