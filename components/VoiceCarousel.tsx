'use client'

import { useRef } from 'react'
import Link from 'next/link'

const voices = [
  {
    id: 1,
    name: '田中 洋介',
    area: '横浜市',
    buildingType: '戸建て',
    product: 'ノーリツ GTH-C2460AW3H-1',
    rating: 5,
    text: '給湯器が突然故障してしまい本当に困っていたところ、当日に来ていただきました。作業も丁寧で、料金も事前にしっかりご説明いただき安心して任せられました。また機会があればぜひお願いします。',
    date: '2024年12月',
    initial: '田',
    color: 'bg-brand-700',
  },
  {
    id: 2,
    name: '鈴木 美咲',
    area: '川崎市',
    buildingType: 'マンション',
    product: 'リンナイ RUF-E240EAW',
    rating: 5,
    text: 'マンションの給湯器交換をお願いしました。管理組合への対応アドバイスもいただき、スムーズに交換できました。新しいエコジョーズに替えてからガス代がかなり下がっています。',
    date: '2024年11月',
    initial: '鈴',
    color: 'bg-coral-600',
  },
  {
    id: 3,
    name: '佐藤 健一',
    area: '厚木市',
    buildingType: '戸建て',
    product: 'リンナイ RUFH-E2407AW2',
    rating: 5,
    text: '暖房付き給湯器への交換をお願いしました。床暖房の効きが格段によくなり快適です。LINEでの相談から当日の工事まで、スタッフの方がとても親切で安心できました。',
    date: '2024年11月',
    initial: '佐',
    color: 'bg-sky-dark',
  },
  {
    id: 4,
    name: '山田 由美子',
    area: '海老名市',
    buildingType: '戸建て',
    product: 'ノーリツ GT-C2472AW-1',
    rating: 5,
    text: '10年以上使っていた給湯器をエコジョーズに交換。光熱費が毎月かなり下がっています。LINEからの相談に迅速に応えていただき、翌日には工事が完了しました。',
    date: '2024年10月',
    initial: '山',
    color: 'bg-orange-500',
  },
  {
    id: 5,
    name: '中村 拓也',
    area: '横浜市',
    buildingType: '戸建て',
    product: 'リンナイ RUX-A2406W',
    rating: 5,
    text: '急に給湯器が壊れてLINEで相談したところ、翌朝には来ていただけました。料金も明確で追加費用なし。地域密着の業者さんならではの迅速な対応に大変感謝しています。',
    date: '2024年9月',
    initial: '中',
    color: 'bg-brand-600',
  },
  {
    id: 6,
    name: '小林 智子',
    area: '川崎市',
    buildingType: 'マンション',
    product: 'ノーリツ GQ-2439WS-1',
    rating: 5,
    text: '電話で問い合わせた際、とても丁寧に説明していただきました。工事も予定通りに完了し、後片付けも綺麗にしていただきました。近所の業者さんでお願いして良かったです。',
    date: '2024年9月',
    initial: '小',
    color: 'bg-slate-600',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? 'text-yellow-400' : 'text-slate-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function VoiceCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }

  return (
    <section className="bg-slate-50 py-24 md:py-32" id="voice">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-label mb-3">お客様の声</p>
            <h2 className="text-3xl md:text-4xl font-black text-brand-900 mt-2 mb-3">
              喜びの声をいただいています
            </h2>
            <span className="section-divider" />
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scrollBy(-1)}
              className="w-10 h-10 border border-slate-200 bg-white hover:bg-brand-900 hover:border-brand-900 hover:text-white text-slate-500 flex items-center justify-center transition-all rounded-full"
              aria-label="前へ"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollBy(1)}
              className="w-10 h-10 border border-slate-200 bg-white hover:bg-brand-900 hover:border-brand-900 hover:text-white text-slate-500 flex items-center justify-center transition-all rounded-full"
              aria-label="次へ"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {voices.map((voice) => (
            <div
              key={voice.id}
              className="flex-none w-[300px] md:w-[340px] snap-start bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <StarRating count={voice.rating} />

              <p className="text-slate-600 text-sm leading-relaxed mt-4 mb-6 line-clamp-4">
                「{voice.text}」
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className={`w-10 h-10 rounded-full ${voice.color} text-white flex items-center justify-center font-black text-sm flex-shrink-0`}>
                  {voice.initial}
                </div>
                <div>
                  <div className="font-bold text-brand-900 text-sm">{voice.name} 様</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    {voice.area} ・ {voice.buildingType}
                  </div>
                  <div className="text-slate-400 text-[11px]">{voice.product}</div>
                </div>
                <div className="ml-auto text-slate-300 text-[10px] flex-shrink-0">{voice.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile arrows */}
        <div className="md:hidden flex justify-center gap-3 mt-4">
          <button
            onClick={() => scrollBy(-1)}
            className="w-10 h-10 border border-slate-200 bg-white text-slate-500 flex items-center justify-center rounded-full"
            aria-label="前へ"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="w-10 h-10 border border-slate-200 bg-white text-slate-500 flex items-center justify-center rounded-full"
            aria-label="次へ"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/voice"
            className="inline-flex items-center gap-2 text-[13px] font-bold text-brand-900 hover:text-slate-600 transition-colors border-b border-brand-900 pb-0.5"
          >
            お客様の声をもっと見る
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  )
}
