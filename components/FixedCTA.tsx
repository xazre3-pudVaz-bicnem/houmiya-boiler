'use client'

import { useState, useEffect } from 'react'

export default function FixedCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* ── Mobile: 3-button grid ── */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-amber-300 px-2 pt-2 pb-2 safe-area-pb">
          <div className="grid grid-cols-3 gap-1.5">
            {/* Phone */}
            <a
              href="tel:046-205-4558"
              className="flex flex-col items-center justify-center bg-coral-600 hover:bg-coral-700 text-white py-3 rounded-sm transition-colors active:scale-95"
            >
              <svg className="w-4 h-4 mb-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <span className="text-[11px] font-black leading-tight">電話する</span>
            </a>
            {/* Quote */}
            <a
              href="tel:046-205-4558"
              className="flex flex-col items-center justify-center bg-coral-600 hover:bg-coral-700 text-white py-3 rounded-sm transition-colors active:scale-95"
            >
              <svg className="w-4 h-4 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
              </svg>
              <span className="text-[11px] font-black leading-tight">見積もり</span>
            </a>
            {/* LINE */}
            <a
              href="https://line.me/ti/p/XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center bg-[#00B900] hover:bg-[#009a00] text-white py-3 rounded-sm transition-colors active:scale-95"
            >
              <svg className="w-4 h-4 mb-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.437-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              <span className="text-[11px] font-black leading-tight">LINE相談</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Desktop: full-width bottom bar ── */}
      <div
        className={`hidden md:block fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-amber-300 border-t-2 border-amber-400">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-3 flex items-center gap-6">

            {/* Hours */}
            <div className="flex-shrink-0">
              <div className="text-brand-900 text-[11px] font-bold leading-none mb-1">受付時間</div>
              <div className="text-brand-900 text-[11px]">9:00〜18:00（年中無休）</div>
            </div>

            {/* Phone */}
            <a
              href="tel:046-205-4558"
              className="flex items-center gap-2 group flex-shrink-0"
            >
              <svg className="w-5 h-5 text-brand-900 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <span className="text-brand-900 font-black text-2xl tracking-wide group-hover:text-coral-700 transition-colors">
                046-205-4558
              </span>
            </a>

            {/* Divider */}
            <div className="flex-1" />

            {/* CTA buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href="tel:046-205-4558"
                className="flex items-center gap-2 bg-coral-600 hover:bg-coral-700 text-white font-bold text-sm px-6 py-3 transition-colors active:scale-95 shadow"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                </svg>
                スピード見積もり依頼
              </a>
              <a
                href="https://line.me/ti/p/XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#00B900] hover:bg-[#009a00] text-white font-bold text-sm px-6 py-3 transition-colors active:scale-95 shadow"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.07 9.437-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINE から無料相談
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop scroll-to-top button */}
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
