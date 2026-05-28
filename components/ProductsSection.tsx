'use client'

import { useState } from 'react'
import Link from 'next/link'
import { productsData } from '@/data/products'

const makers = [
  { id: 'リンナイ', label: 'リンナイ', slug: 'rinnai' },
  { id: 'ノーリツ', label: 'ノーリツ', slug: 'noritz' },
  { id: 'パロマ', label: 'パロマ', slug: 'paloma' },
]

export default function ProductsSection() {
  const [activeMaker, setActiveMaker] = useState('リンナイ')

  const filtered = productsData.filter((p) => p.maker === activeMaker).slice(0, 2)
  const currentMaker = makers.find((m) => m.id === activeMaker)!

  return (
    <section className="bg-white py-20 md:py-28" id="products">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="section-label mb-3">おすすめ給湯器</p>
          <h2 className="section-heading">主な取り扱い給湯器</h2>
          <span className="section-divider mx-auto" />
          <p className="text-slate-500 text-sm mt-4 max-w-md mx-auto">
            リンナイ・ノーリツ・パロマの主要メーカーに対応。設置状況に合わせた機種をご提案します。
          </p>
        </div>

        {/* Maker tabs */}
        <div className="flex border-b border-slate-200 mb-8">
          {makers.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMaker(m.id)}
              className={`relative px-7 py-3.5 text-sm font-bold transition-colors ${
                activeMaker === m.id
                  ? 'text-brand-900'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {m.label}
              {activeMaker === m.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-900 rounded-t" />
              )}
            </button>
          ))}
        </div>

        {/* Product cards */}
        <div className="grid sm:grid-cols-2 gap-5 mb-8">
          {filtered.map((p) => (
            <div key={p.id} className="border border-slate-200 rounded-xl p-7 hover:border-slate-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] transition-all duration-200">
              <div className="flex items-start justify-between gap-3 mb-1">
                {p.popular && (
                  <span className="text-xs font-bold text-sky border border-sky/30 bg-sky/5 px-2.5 py-0.5 rounded-full">
                    人気No.1
                  </span>
                )}
                {p.recommended && (
                  <span className="text-xs font-bold text-emerald-600 border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    省エネ推奨
                  </span>
                )}
                {!p.popular && !p.recommended && <span />}
                <span className="text-xs text-slate-400 flex-shrink-0">{p.gosu}号 / {p.installType}</span>
              </div>

              <h3 className="font-black text-brand-900 text-xl mb-5">{p.modelType}</h3>

              <div className="mb-5">
                <div className="text-xs text-slate-400 line-through mb-1">
                  希望小売価格 {p.listPrice}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-slate-500">コミコミ価格</span>
                  <span className="text-coral-600 font-black text-2xl">{p.ourPrice}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">本体＋標準工事費込み・税込</p>
              </div>

              <Link
                href="#contact"
                className="block text-center bg-brand-900 hover:bg-brand-800 text-white font-bold text-sm py-3 rounded-lg transition-colors"
              >
                無料見積もりを依頼する
              </Link>
            </div>
          ))}
        </div>

        {/* More link */}
        <div className="text-center">
          <Link
            href={`/maker/${currentMaker.slug}`}
            className="inline-flex items-center gap-2 text-brand-900 hover:text-brand-700 font-bold text-sm border border-slate-200 hover:border-slate-300 hover:shadow-sm px-7 py-3.5 rounded-lg transition-all duration-150"
          >
            {currentMaker.label}の全商品・詳しい料金を見る
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}
