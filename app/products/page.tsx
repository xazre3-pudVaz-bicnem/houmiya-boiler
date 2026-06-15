'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import ProductCard from '@/components/ProductCard'
import { productsData } from '@/data/products'

type MakerId = 'all' | 'rinnai' | 'noritz' | 'paloma'
type TypeId = 'all' | 'auto' | 'full-auto'

const makerTabs: { id: MakerId; label: string }[] = [
  { id: 'all', label: 'すべて' },
  { id: 'rinnai', label: 'Rinnai' },
  { id: 'noritz', label: 'NORITZ' },
  { id: 'paloma', label: 'Paloma' },
]

const typeTabs: { id: TypeId; label: string }[] = [
  { id: 'all', label: 'すべて' },
  { id: 'auto', label: 'オート' },
  { id: 'full-auto', label: 'フルオート' },
]

export default function ProductsPage() {
  const [activeMaker, setActiveMaker] = useState<MakerId>('all')
  const [activeType, setActiveType] = useState<TypeId>('all')

  const filtered = productsData.filter((p) => {
    const makerMatch = activeMaker === 'all' || p.maker === activeMaker
    const typeMatch = activeType === 'all' || p.type === activeType
    return makerMatch && typeMatch
  })

  return (
    <>
      <Header />
      <main className="pt-[100px]">

        <section className="bg-brand-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
              <Link href="/" className="hover:text-white transition-colors">トップ</Link>
              <span>/</span>
              <span className="text-slate-300">商品一覧</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-black mb-2">給湯器 商品一覧</h1>
            <p className="text-slate-300 text-sm max-w-xl">
              リンナイ・ノーリツ・パロマ全商品。工事費・リモコン・処分費込みの税込価格で掲載。
            </p>
          </div>
        </section>

        {/* フィルターバー */}
        <div className="bg-white border-b border-slate-200 sticky top-[64px] z-40 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
            <div className="flex gap-1 flex-wrap">
              {makerTabs.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveMaker(m.id)}
                  className={`px-4 py-1.5 text-sm font-bold border rounded-lg transition-all ${
                    activeMaker === m.id
                      ? 'bg-brand-900 text-white border-brand-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-brand-400'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <div className="w-px h-5 bg-gray-200 hidden sm:block" />
            <div className="flex gap-1 flex-wrap">
              {typeTabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveType(t.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all ${
                    activeType === t.id
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-red-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 商品グリッド */}
        <section className="bg-gray-50 py-12 min-h-[400px]">
          <div className="max-w-6xl mx-auto px-4">
            <p className="text-slate-500 text-sm mb-6">{filtered.length}件の商品</p>
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" /></svg>
                </div>
                <p className="text-lg font-bold mb-2">該当する商品がありません</p>
                <p className="text-sm">絞り込みを変えてお試しください</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-900 py-14 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <p className="text-slate-400 text-sm mb-2">掲載していない機種もお気軽にお問い合わせください</p>
            <h2 className="text-white font-black text-2xl mb-6">無料見積もり受付中</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/estimate"
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black text-lg px-8 py-4 rounded-lg transition-colors"
              >
                無料見積もりを依頼する
              </Link>
              <a
                href="tel:046-205-4558"
                className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-black text-lg px-8 py-4 rounded-lg transition-colors"
              >
                046-205-4558
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}
