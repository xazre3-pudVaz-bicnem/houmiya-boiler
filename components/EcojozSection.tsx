const benefits = [
  { title: 'ガス代を節約', desc: '従来型より熱効率が13%以上高く、年間のガス代節約が期待できます。' },
  { title: 'CO2排出削減', desc: '省エネ設計でCO2排出量を削減。環境に優しい選択です。' },
  { title: '省エネ基準適合', desc: 'トップランナー基準の省エネ機器として認定されています。' },
  { title: '既存設備を活用', desc: '既存のガス配管・水道配管をそのまま活用でき、リフォームが最小限に。' },
]

const considerations = [
  { title: 'ドレン排水配管が必要', desc: '高効率燃焼で発生する結露水（ドレン排水）を排出する配管が必要になります。新規設置が必要な場合は追加費用が発生することがあります。' },
  { title: '設置場所の確認が必要', desc: 'ドレン排水の処理場所が確保できるかどうか、事前の現地確認が必要です。' },
  { title: '本体価格が従来型より高め', desc: 'エコジョーズの本体価格は従来型よりやや高めですが、ランニングコストの節約で長期的にはお得になるケースが多いです。' },
]

export default function EcojozSection() {
  return (
    <section className="bg-white py-14 md:py-20" id="ecojoys">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <div className="inline-block bg-green-50 text-green-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4 border border-green-200">
            省エネ給湯器
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-brand-800">
            エコジョーズとは？
          </h2>
          <span className="block w-12 h-1 bg-sky rounded-full mx-auto mt-4" />
          <p className="text-gray-600 mt-5 max-w-xl mx-auto">
            エコジョーズは高効率ガス給湯器の総称です。従来型では捨てていた排熱を再利用することで、
            熱効率を大幅に高めた省エネタイプの給湯器です。
          </p>
        </div>

        {/* How it works */}
        <div className="bg-gradient-to-r from-brand-800 to-brand-700 rounded-lg p-6 md:p-8 mb-8 text-white">
          <h3 className="font-black text-xl mb-5 text-sky-light">エコジョーズの仕組み</h3>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">旧</div>
                  <div>
                    <div className="font-bold text-slate-200 text-sm">従来型給湯器</div>
                    <div className="text-slate-400 text-sm">燃焼排ガスの熱（約200℃）をそのまま大気に放出。熱効率は約80%。</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-sky rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5 text-brand-900">新</div>
                  <div>
                    <div className="font-bold text-sky-light text-sm">エコジョーズ</div>
                    <div className="text-slate-400 text-sm">排ガスの潜熱も回収して再利用。熱効率は<strong className="text-white">約95%</strong>に向上。</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-brand-700/50 rounded-xl p-5 border border-brand-600 text-center">
              <div className="text-sky font-black text-4xl mb-2">約13%</div>
              <div className="text-white font-bold text-base mb-1">エネルギー効率アップ</div>
              <div className="text-slate-400 text-sm">従来型と比べて約13%以上の熱効率向上。ガス代の節約につながります。</div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-8">
          <h3 className="font-black text-brand-800 text-xl mb-5">エコジョーズのメリット</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((b, idx) => (
              <div key={b.title} className="bg-green-50 rounded-xl p-5 border border-green-100 hover:border-green-300 transition-colors text-center">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-black text-xs mx-auto mb-3">
                  {idx + 1}
                </div>
                <h4 className="font-bold text-brand-800 text-sm mb-1.5 leading-tight">{b.title}</h4>
                <p className="text-gray-600 text-xs leading-relaxed hidden md:block">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Considerations */}
        <div className="mb-8">
          <h3 className="font-black text-brand-800 text-xl mb-4">設置前に確認が必要なこと</h3>
          <div className="space-y-3">
            {considerations.map((c) => (
              <div key={c.title} className="flex items-start gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-brand-800 text-sm mb-1">{c.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-50 rounded-lg border border-slate-200 p-6 text-center shadow-card">
          <p className="font-black text-brand-800 text-lg mb-2">エコジョーズへの交換はご相談ください</p>
          <p className="text-gray-600 text-sm mb-5 max-w-xl mx-auto">
            設置環境の確認・ドレン配管の要否・費用対効果など、現地または写真確認のうえ丁寧にご説明します。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:046-205-4558" className="inline-flex items-center justify-center gap-2 bg-coral-600 text-white font-bold py-3.5 px-8 rounded-xl hover:bg-coral-700 transition-colors shadow-md">
              <PhoneIcon />
              電話で相談
            </a>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-brand-800 text-white font-bold py-3.5 px-8 rounded-xl hover:bg-brand-700 transition-colors shadow-md">
              無料見積もりを依頼
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
