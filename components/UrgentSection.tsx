'use client'

import { trackPhoneClick, trackLineClick } from '@/lib/tracking'
import { siteConfig } from '@/data/site'

export default function UrgentSection() {
  return (
    <section className="bg-coral-700 py-10 md:py-12">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-7">
          <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">
            緊急・お急ぎの方へ
          </p>
          <h2 className="text-white font-black text-2xl md:text-3xl">
            給湯器の故障・お湯が出ない方は<br className="hidden md:block" />
            今すぐご連絡ください
          </h2>
          <p className="text-white/80 text-sm mt-2">
            最短即日対応 ・ 年中無休 ・ LINEは24時間受付
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {/* Phone */}
          <a
            href="tel:046-205-4558"
            onClick={() => trackPhoneClick('urgent_section')}
            className="flex flex-col items-center bg-white hover:bg-slate-50 rounded-lg py-6 px-5 shadow-lg transition-all duration-200 active:scale-95"
          >
            <div className="relative mb-3">
              <div className="absolute inset-0 bg-coral-600/20 rounded-full animate-ping" />
              <div className="relative w-14 h-14 bg-coral-600 rounded-full flex items-center justify-center shadow">
                <PhoneIcon />
              </div>
            </div>
            <span className="text-coral-600 text-xs font-bold mb-1">タップで即発信</span>
            <span className="text-brand-900 font-black text-2xl md:text-3xl tracking-tight">046-205-4558</span>
            <span className="text-slate-500 text-sm mt-1">受付時間 9:00〜18:00</span>
          </a>

          {/* LINE */}
          <a
            href={siteConfig.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackLineClick('urgent_section')}
            className="flex flex-col items-center bg-[#00B900] hover:bg-[#009a00] rounded-lg py-6 px-5 shadow-lg transition-all duration-200 active:scale-95"
          >
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-3">
              <LineIcon />
            </div>
            <span className="text-white/80 text-xs font-bold mb-1">写真を送るだけでOK</span>
            <span className="text-white font-black text-2xl">LINE で相談</span>
            <span className="text-white/70 text-sm mt-1">24時間受付・返信は営業時間内</span>
          </a>
        </div>

        {/* Trust items */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {['最短即日対応', '自社施工', '見積もり無料', 'アフターフォロー付き'].map((item) => (
            <div key={item} className="flex items-center gap-1.5 text-white/80 text-sm">
              <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  )
}

function LineIcon() {
  return (
    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.437-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  )
}
