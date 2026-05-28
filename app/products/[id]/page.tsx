import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import { productDetails } from '@/data/productDetails'
import { productListings } from '@/data/productListing'

type Props = { params: { id: string } }

export function generateStaticParams() {
  return Object.keys(productDetails).map((id) => ({ id }))
}

export function generateMetadata({ params }: Props) {
  const product = productDetails[params.id]
  if (!product) return {}
  return {
    title: `${product.name} | 宝宮設備`,
    description: product.description,
  }
}

export default function ProductDetailPage({ params }: Props) {
  const product = productDetails[params.id]
  if (!product) notFound()

  const related = productListings
    .filter((p) => p.maker === product.maker && p.id !== product.id)
    .slice(0, 3)

  return (
    <>
      <Header />
      <main className="pt-20">

        {/* Breadcrumb */}
        <div className="border-b border-slate-200 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-1.5 text-xs text-slate-400">
              <Link href="/" className="hover:text-brand-900 transition-colors">トップ</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-brand-900 transition-colors">商品一覧</Link>
              <span>/</span>
              <span className="text-slate-600 truncate max-w-[200px]">{product.modelNumber}</span>
            </nav>
          </div>
        </div>

        {/* Main product section */}
        <section className="bg-white py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

              {/* Left: Product image */}
              <div>
                <div className="relative bg-slate-50 rounded-sm overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={product.imageSrc}
                    alt={product.name}
                    fill
                    className="object-contain p-8"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  {/* Warranty badge */}
                  <div className="absolute top-4 left-4 w-20 h-20 bg-orange-500 text-white rounded-full flex flex-col items-center justify-center text-center shadow-lg z-10">
                    <span className="text-[9px] font-bold">安心</span>
                    <span className="text-sm font-black leading-none">{product.warranty.replace('保証', '')}</span>
                    <span className="text-[9px] font-bold">保証</span>
                  </div>
                </div>

                {/* Image notice */}
                <p className="text-slate-400 text-[11px] mt-2 text-center">
                  ※画像は代表例です。実際の商品と若干異なる場合があります。
                </p>
              </div>

              {/* Right: Product info */}
              <div>
                {/* Maker */}
                <div className="text-brand-800 font-black text-2xl tracking-widest mb-2">{product.makerEn}</div>
                {/* Name */}
                <h1 className="text-xl md:text-2xl font-black text-brand-900 mb-2 leading-snug">{product.name}</h1>
                {/* Model number */}
                <div className="font-mono text-slate-400 text-sm mb-4">{product.modelNumber}</div>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {product.eco && (
                    <span className="bg-sky text-white text-xs font-black px-3 py-1">エコジョーズ</span>
                  )}
                  {product.heating && (
                    <span className="bg-orange-100 text-orange-600 text-xs font-black px-3 py-1">暖房付き</span>
                  )}
                  <span className="bg-brand-50 text-brand-800 text-xs font-bold px-3 py-1">{product.type}</span>
                  <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1">{product.installType}</span>
                </div>

                {/* Campaign notice */}
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold px-4 py-3 mb-5 flex items-start gap-2">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  工事代金込みのコミコミ価格です。工事当日現金払いで3,000円お値引きいたします。
                </div>

                {/* Variants table */}
                <div className="border border-slate-200 mb-3 overflow-x-auto">
                  <table className="w-full text-sm min-w-[460px]">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="px-3 py-2.5 text-left font-bold text-slate-600 text-xs border-r border-slate-200">機種</th>
                        <th className="px-3 py-2.5 text-left font-bold text-slate-600 text-xs border-r border-slate-200">号数</th>
                        <th className="px-3 py-2.5 text-left font-bold text-slate-600 text-xs border-r border-slate-200">型番</th>
                        <th className="px-3 py-2.5 text-left font-bold text-slate-600 text-xs border-r border-slate-200">リモコン</th>
                        <th className="px-3 py-2.5 text-right font-bold text-slate-500 text-xs border-r border-slate-200">定価</th>
                        <th className="px-3 py-2.5 text-right font-bold text-coral-600 text-xs">当社価格</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.variants.map((v, i) => (
                        <tr key={i} className={`border-t border-slate-100 ${i === 0 ? 'bg-orange-50' : 'bg-white hover:bg-slate-50'}`}>
                          <td className="px-3 py-3 text-slate-700 text-xs border-r border-slate-100">{v.type}</td>
                          <td className="px-3 py-3 font-black text-brand-900 border-r border-slate-100">{v.size}</td>
                          <td className="px-3 py-3 font-mono text-slate-600 text-xs border-r border-slate-100">{v.modelNumber}</td>
                          <td className="px-3 py-3 text-slate-500 text-xs border-r border-slate-100">{v.remote}</td>
                          <td className="px-3 py-3 text-right text-slate-400 text-xs line-through border-r border-slate-100">¥{v.listPrice.toLocaleString()}</td>
                          <td className="px-3 py-3 text-right font-black text-coral-600">¥{v.salePrice.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-slate-400 text-[11px] mb-6">※ 上記価格はすべて税込・標準工事費込みのコミコミ価格です</p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:046-205-4558"
                    className="flex items-center justify-center gap-2 bg-coral-600 hover:bg-coral-700 text-white font-black text-base px-6 py-4 transition-colors flex-1 active:scale-[0.98]"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    お見積もり依頼
                  </a>
                  <a
                    href="https://line.me/ti/p/XXXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#00B900] hover:bg-[#009a00] text-white font-black text-base px-6 py-4 transition-colors flex-1 active:scale-[0.98]"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.07 9.437-6.975C23.176 14.393 24 12.458 24 10.314" />
                    </svg>
                    LINEで無料相談
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        {product.features.length > 0 && (
          <section className="bg-orange-50 py-12">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <h2 className="text-xl font-black text-brand-900 mb-6 pb-3 border-b border-orange-200">主な特徴</h2>
              <ul className="space-y-4">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-slate-700 text-sm leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Specs */}
        <section className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <h2 className="text-xl font-black text-brand-900 mb-6 pb-3 border-b border-slate-200">仕様</h2>
            <div className="border border-slate-200 overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr key={i} className={`border-t border-slate-100 ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                      <th className="px-5 py-3.5 text-left font-bold text-slate-600 w-1/3 border-r border-slate-200">{spec.label}</th>
                      <td className="px-5 py-3.5 text-slate-700">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Related products */}
        {related.length > 0 && (
          <section className="bg-slate-50 py-12">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <h2 className="text-xl font-black text-brand-900 mb-8 pb-3 border-b border-slate-200">
                {product.makerEn} の他の商品
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    href={p.href}
                    className="bg-white border border-slate-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group"
                  >
                    <div className="relative h-32 bg-slate-50 mb-4 overflow-hidden">
                      <Image
                        src={p.imageSrc}
                        alt={p.name}
                        fill
                        className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                    <div className="text-[11px] font-black text-brand-700 tracking-wider mb-1">{p.makerEn}</div>
                    <div className="text-xs font-mono text-slate-400 mb-1">{p.modelNumber}</div>
                    <div className="text-sm font-bold text-brand-900 leading-snug mb-3">{p.name}</div>
                    <div className="text-coral-600 font-black">¥{p.salePrice.toLocaleString()}</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="bg-brand-900 py-12 text-center">
          <div className="max-w-xl mx-auto px-6">
            <p className="text-slate-400 text-sm mb-2">現地確認後に正確なお見積もりをご提示します</p>
            <h2 className="text-white font-black text-xl mb-6">無料でお見積もり依頼</h2>
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
