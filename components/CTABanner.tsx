type CTABannerProps = {
  variant?: 'phone' | 'line' | 'quote' | 'full'
  title?: string
  subtitle?: string
}

export default function CTABanner({ variant = 'full', title, subtitle }: CTABannerProps) {
  const defaultTitles = {
    phone: '給湯器の故障・交換はお急ぎですか？',
    line: '写真を送るだけで概算見積もりも可能です',
    quote: 'まずは無料でお見積もりをご依頼ください',
    full: '給湯器の交換・故障はお気軽にご相談ください',
  }

  const defaultSubtitles = {
    phone: '最短即日対応可能。まずはお電話ください。',
    line: 'LINEから写真を送っていただくだけで、概算の金額をお伝えできます。',
    quote: '現地確認または写真確認後に正確なお見積もりをご提案します。',
    full: '電話・LINE・フォームからいつでもご相談いただけます。',
  }

  return (
    <div className="bg-brand-800 border-y border-brand-700 py-10 md:py-12">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        <p className="text-sky-light font-bold text-base md:text-lg mb-1.5">
          {title || defaultTitles[variant]}
        </p>
        <p className="text-slate-400 text-sm mb-6">
          {subtitle || defaultSubtitles[variant]}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {(variant === 'phone' || variant === 'full') && (
            <a
              href="tel:046-205-4558"
              className="inline-flex items-center justify-center gap-2 bg-coral-600 hover:bg-coral-700 text-white font-bold py-3.5 px-7 rounded transition-all duration-150 active:scale-95 shadow-cta"
            >
              <PhoneIcon />
              046-205-4558 に電話する
            </a>
          )}
          {(variant === 'line' || variant === 'full') && (
            <a
              href="https://line.me/ti/p/XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#00B900] hover:bg-[#009a00] text-white font-bold py-3.5 px-7 rounded transition-all duration-150 active:scale-95"
            >
              LINE で相談する
            </a>
          )}
          {(variant === 'quote' || variant === 'full') && (
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-sky hover:bg-sky-dark text-white font-bold py-3.5 px-7 rounded transition-all duration-150 active:scale-95"
            >
              無料見積もりを依頼する
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  )
}
