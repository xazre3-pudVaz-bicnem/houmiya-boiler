import { pricingData, pricingNote } from '@/data/pricing'

export default function PricingSection() {
  return (
    <section className="bg-slate-50 py-14 md:py-20" id="pricing">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="mb-10">
          <p className="section-label mb-2">料金表</p>
          <h2 className="section-heading">給湯器交換 料金表</h2>
          <span className="section-divider" />
          <p className="text-slate-500 mt-4 text-sm max-w-lg">
            本体価格＋標準工事費込みの価格です。設置状況や機種によって変動します。
          </p>
        </div>

        {/* Price table */}
        <div className="bg-white rounded-lg overflow-hidden shadow-card-lg mb-6">
          {/* Table header */}
          <div className="grid grid-cols-3 bg-brand-900 text-slate-300 text-xs font-bold uppercase tracking-wider">
            <div className="px-4 md:px-6 py-3.5">機種タイプ</div>
            <div className="px-4 md:px-6 py-3.5 hidden md:block">特徴</div>
            <div className="px-4 md:px-6 py-3.5 text-right md:text-left">参考価格（税込）</div>
          </div>

          {/* Table rows */}
          {pricingData.map((item, idx) => (
            <div
              key={item.type}
              className={`grid grid-cols-3 border-b border-slate-100 last:border-0 ${
                item.highlight
                  ? 'bg-sky/5 border-l-4 border-l-sky'
                  : idx % 2 === 0
                  ? 'bg-white'
                  : 'bg-slate-50'
              }`}
            >
              <div className="px-4 md:px-6 py-4">
                <div className="font-bold text-brand-800 text-sm leading-tight">
                  {item.type}
                  {item.highlight && (
                    <span className="ml-2 inline-block bg-sky text-white text-[10px] font-bold px-2 py-0.5 rounded align-middle">
                      人気
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 mt-1 md:hidden">{item.description}</div>
                {item.note && (
                  <div className="text-xs text-slate-400 mt-1 leading-tight">{item.note}</div>
                )}
              </div>
              <div className="hidden md:flex px-4 md:px-6 py-4 items-center">
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </div>
              <div className="px-4 md:px-6 py-4 flex items-center justify-end md:justify-start">
                <span
                  className={`font-black text-base ${
                    item.price.includes('現地') ? 'text-slate-500 text-sm' : 'text-coral-600'
                  }`}
                >
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="bg-brand-50 border border-brand-200 rounded-lg p-4 md:p-5 mb-8">
          <p className="text-brand-700 font-bold text-sm mb-1.5">料金に関するご注意</p>
          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
            {pricingNote}
          </p>
        </div>

        {/* CTA */}
        <div>
          <p className="text-slate-600 text-sm mb-4">
            まずは写真または現地確認のうえ、正確なお見積もりをご提案いたします。
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:046-205-4558"
              className="inline-flex items-center justify-center gap-2 bg-coral-600 hover:bg-coral-700 text-white font-bold py-3.5 px-8 rounded transition-all duration-150 active:scale-95 shadow-cta"
            >
              <PhoneIcon />
              お急ぎの方はお電話を
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-sky hover:bg-sky-dark text-white font-bold py-3.5 px-8 rounded transition-all duration-150 active:scale-95"
            >
              無料見積もりを依頼する
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  )
}
