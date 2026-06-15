'use client'

import { useState, useEffect } from 'react'

const PHONE = '046-205-4558'
const LINE_URL = 'https://line.me/ti/p/XXXXXXXXXX'
const HEADER_H = 80 // px — fixed header height

function scrollToEstimate(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault()
  const target = document.getElementById('speed-estimate')
  if (!target) return
  const top = target.getBoundingClientRect().top + window.scrollY - HEADER_H
  window.scrollTo({ top, behavior: 'smooth' })
}

// ─── Icons ───────────────────────────────────────────
const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
)

const EstimateIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const LineIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
  </svg>
)

export default function FixedCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ═══════════════════════════════════════════════
          MOBILE — 3-button fixed bar
      ═══════════════════════════════════════════════ */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)' }}
      >
        {/* Inner: safe-area aware padding */}
        <div
          className="grid grid-cols-3 gap-px bg-slate-200"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          {/* 電話する */}
          <a
            href={`tel:${PHONE}`}
            data-cta="phone-mobile"
            className="flex flex-col items-center justify-center bg-coral-600 active:bg-coral-700 text-white gap-1.5 py-4 select-none"
            style={{ minHeight: '64px', WebkitTapHighlightColor: 'transparent' }}
          >
            <PhoneIcon />
            <span className="text-[11px] font-black leading-none tracking-wide">電話する</span>
          </a>

          {/* 見積もり → #speed-estimate smooth scroll */}
          <a
            href="#speed-estimate"
            onClick={scrollToEstimate}
            data-cta="estimate-mobile"
            className="flex flex-col items-center justify-center bg-brand-900 active:bg-brand-800 text-white gap-1.5 py-4 select-none"
            style={{ minHeight: '64px', WebkitTapHighlightColor: 'transparent' }}
          >
            <EstimateIcon />
            <span className="text-[11px] font-black leading-none tracking-wide">見積もり</span>
          </a>

          {/* LINE相談 */}
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="line-mobile"
            className="flex flex-col items-center justify-center text-white gap-1.5 py-4 select-none"
            style={{
              minHeight: '64px',
              backgroundColor: '#00B900',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <LineIcon />
            <span className="text-[11px] font-black leading-none tracking-wide">LINE相談</span>
          </a>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          DESKTOP — bottom bar
      ═══════════════════════════════════════════════ */}
      <div
        className={`hidden md:block fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-amber-300 border-t-2 border-amber-400">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-3 flex items-center gap-6">
            <div className="flex-shrink-0">
              <div className="text-brand-900 text-[11px] font-bold leading-none mb-1">受付時間</div>
              <div className="text-brand-900 text-[11px]">9:00〜18:00（年中無休）</div>
            </div>
            <a href={`tel:${PHONE}`} data-cta="phone-desktop" className="flex items-center gap-2 group flex-shrink-0">
              <svg className="w-5 h-5 text-brand-900 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <span className="text-brand-900 font-black text-2xl tracking-wide group-hover:text-coral-700 transition-colors">
                {PHONE}
              </span>
            </a>
            <div className="flex-1" />
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Estimate → smooth scroll */}
              <a
                href="#speed-estimate"
                onClick={scrollToEstimate}
                data-cta="estimate-desktop"
                className="flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white font-bold text-sm px-6 py-3 transition-colors shadow"
              >
                <EstimateIcon />
                スピード見積もり依頼
              </a>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="line-desktop"
                className="flex items-center gap-2 text-white font-bold text-sm px-6 py-3 transition-colors shadow"
                style={{ backgroundColor: '#00B900' }}
              >
                <LineIcon />
                LINE から無料相談
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop scroll-to-top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`hidden md:flex fixed bottom-20 right-6 z-50 w-10 h-10 bg-white border border-slate-200 text-slate-400 hover:text-brand-900 hover:border-slate-300 rounded-full shadow-sm items-center justify-center transition-all duration-200 ${
          visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="ページ上部へ"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </>
  )
}
