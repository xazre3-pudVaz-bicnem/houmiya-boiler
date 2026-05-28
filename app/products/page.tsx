'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import { productListings, type ProductListing } from '@/data/productListing'

type MakerId = 'all' | 'noritz' | 'rinnai' | 'paloma'
type TypeId = 'all' | 'フルオート' | 'オート' | '給湯専用' | 'エコジョーズ' | '暖房付き'

const makerTabs: { id: MakerId; label: string }[] = [
  { id: 'all', label: 'すべて' },
  { id: 'noritz', label: 'NORITZ' },
  { id: 'rinnai', label: 'Rinnai' },
  { id: 'paloma', label: 'Paloma' },
]

const typeTabs: { id: TypeId; label: string }[] = [
  { id: 'all', label: 'すべて' },
  { id: 'フルオート', label: 'フルオート' },
  { id: 'オート', label: 'オート' },
  { id: '給湯専用', label: '給湯専用' },
  { id: 'エコジョーズ', label: 'エコジョーズ' },
  { id: '暖房付き', label: '暖房付き' },
]

function ProductCard({ product }: { product: ProductListing }) {
  return (
    <div className="bg-white border border-slate-200 group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
      {product.popular && (
        <div className="absolute top-0 right-0 bg-coral-600 text-white text-[10px] font-bold px-3 py-1 z-10">
          人気
        </div>
      )}

      {/* Product image */}
      <div className="relative bg-slate-50 h-48 overflow-hidden">
        <Image
          src={product.imageSrc}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Warranty badge */}
        <div className="absolute top-3 left-3 w-16 h-16 bg-orange-500 text-white rounded-full flex flex-col items-center justify-center text-center z-10 shadow-md leading-none">
          <span className="text-[8px] font-bold mt-1">安心</span>
          <span className="text-xs font-black">{product.warranty.replace('保証', '')}</span>
          <span className="text-[8px] font-bold mb-1">保証</span>
        </div>
        {/* Badges */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-1 z-10">
          {product.eco && (
            <span className="bg-sky text-white text-[9px] font-black px-2 py-0.5">ECO</span>
          )}
          {product.heating && (
            <span className="bg-orange-500 text-white text-[9px] font-black px-2 py-0.5">暖房</span>
          )}
        </div>
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
          <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-sm">{product.installType}</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="text-slate-400 text-xs line-through">
            標準価格 ¥{product.listPrice.toLocaleString()}
          </div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-coral-600 font-black text-2xl">¥{product.salePrice.toLocaleString()}</span>
            <span className="text-slate-400 text-xs">（税込・工事費込）</span>
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
  )
}

export default function ProductsPage() {
  const [activeMaker, setActiveMaker] = useState<MakerId>('all')
  const [activeType, setActiveType] = useState<TypeId>('all')

  const filtered = productListings.filter((p) => {
    const makerMatch = activeMaker === 'all' || p.maker === activeMaker
    const typeMatch =
      activeType === 'all' ||
      p.type === activeType ||
      (activeType === 'エコジョーズ' && p.eco) ||
      (activeType === '暖房付き' && p.heating)
    return makerMatch && typeMatch
  })

  return (
    <>
      <Header />
      <main className="pt-20">

        {/* Hero */}
        <section className="bg-brand-900 text-white py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
              <Link href="/" className="hover:text-slate-300 transition-colors">トップ</Link>
              <span>/</span>
              <span className="text-slate-400">商品一覧</span>
            </nav>
            <p className="text-sky text-xs font-black tracking-widest uppercase mb-2">Products</p>
            <h1 className="text-3xl md:text-4xl font-black">給湯器 商品一覧</h1>
            <p className="text-slate-400 text-sm mt-3 max-w-xl">
              リンナイ・ノーリツ・パロマなど主要メーカー全商品の価格は工事費込みの安心コミコミ価格です。
            </p>
          </div>
        </section>

        {/* Sticky filter bar */}
        <div className="bg-white border-b border-slate-200 sticky top-16 z-40 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-3">
            {/* Maker tabs */}
            <div className="flex gap-1 mb-2.5 flex-wrap">
              {makerTabs.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveMaker(m.id)}
                  className={`px-4 py-1.5 text-sm font-bold border transition-all ${
                    activeMaker === m.id
                      ? 'bg-brand-900 text-white border-brand-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-brand-400'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            {/* Type filters */}
            <div className="flex gap-1.5 flex-wrap">
              {typeTabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveType(t.id)}
                  className={`px-3 py-1 text-xs font-bold rounded-full border transition-all ${
                    activeType === t.id
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-orange-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product grid */}
        <section className="bg-slate-50 py-12 md:py-16 min-h-[500px]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <p className="text-slate-500 text-sm mb-6">{filtered.length}件の商品</p>

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <p className="text-lg font-bold mb-2">該当する商品がありません</p>
                <p className="text-sm">絞り込みを変えてお試しください</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-brand-900 py-16 text-center">
          <div className="max-w-2xl mx-auto px-6">
            <p className="text-slate-400 text-sm mb-2">掲載していない機種もお問い合わせください</p>
            <h2 className="text-white font-black text-2xl mb-6">お気軽にご相談ください</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:046-205-4558"
                className="inline-flex items-center justify-center gap-2 bg-coral-600 hover:bg-coral-700 text-white font-black text-lg px-8 py-4 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                046-205-4558
              </a>
              <a
                href="https://line.me/ti/p/XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#00B900] hover:bg-[#009a00] text-white font-bold text-base px-8 py-4 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.07 9.437-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINEで無料相談
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
