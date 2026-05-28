const additionalCosts = [
  { title: '配管延長が必要な場合', desc: '既存の配管と新しい給湯器の接続口の位置が異なる場合、配管の延長・変更が必要になることがあります。' },
  { title: '高所作業が必要な場合', desc: '給湯器の設置場所が高い位置にある場合、足場や安全器具の準備が必要となり追加費用が発生することがあります。' },
  { title: 'PS扉内設置（マンション）', desc: 'マンションのパイプスペース内への設置の場合、作業スペースが限られるため追加費用が発生する場合があります。' },
  { title: '排気筒・排気トップの交換', desc: '既存の排気筒が古い・損傷している場合や、機種変更に伴い排気筒の規格が変わる場合に交換が必要になることがあります。' },
  { title: '号数変更（大きくする場合）', desc: '号数を大きくする場合、ガス管の口径変更や配管工事が必要になる場合があります。' },
  { title: 'リモコンの交換・増設', desc: '既存のリモコンが新しい機種と互換性がない場合や、リモコンを2台に増設する場合に費用が発生します。' },
  { title: '電気配線工事が必要な場合', desc: 'コンセント位置の変更や電源線の新設が必要な場合は、電気工事費が別途発生することがあります。' },
  { title: '特殊な設置環境', desc: '地中埋設、狭小スペース、屋根上設置など特殊な設置環境の場合は、状況に応じた対応費用が発生することがあります。' },
]

export default function AdditionalCostsSection() {
  return (
    <section className="bg-slate-50 py-14 md:py-20" id="additional-costs">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="mb-10">
          <p className="section-label mb-2">追加費用について</p>
          <h2 className="section-heading">
            追加費用が発生する<br className="hidden md:block" />可能性があるケース
          </h2>
          <span className="section-divider" />
          <p className="text-slate-500 text-sm mt-4 max-w-lg">
            以下のようなケースでは追加費用が発生する場合があります。
            <strong className="text-brand-800">すべて事前にご説明・ご確認のうえ作業を行います</strong>のでご安心ください。
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {additionalCosts.map((item, i) => (
            <div
              key={item.title}
              className="bg-white rounded-lg p-4 border border-slate-200 shadow-card"
            >
              <div className="text-sky font-black text-xs mb-2 tabular-nums">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="font-bold text-brand-800 text-sm mb-1.5 leading-tight">{item.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Assurance */}
        <div className="bg-white border border-sky/30 rounded-lg p-5 md:p-6 shadow-card">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-sky/10 rounded flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-brand-800 text-sm mb-1">追加費用は必ず事前にご説明します</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                宝宮設備では、追加費用が発生する可能性がある場合は必ず工事前にお客様にご説明し、ご了承をいただいてから作業を進めます。
                当初の見積もりと大きく異なることがないよう、現地確認・写真確認を徹底した正確なお見積もりを心がけています。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
