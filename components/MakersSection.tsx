const makers = [
  {
    name: 'リンナイ',
    nameEn: 'RINNAI',
    color: '#e60012',
    desc: '業界トップシェア。品質・性能・アフターサービスに優れた国内最大手。',
    logo: 'R',
  },
  {
    name: 'ノーリツ',
    nameEn: 'NORITZ',
    color: '#0067c0',
    desc: '高い省エネ性能とデザイン性が特徴。エコジョーズが充実。',
    logo: 'N',
  },
  {
    name: 'パロマ',
    nameEn: 'PALOMA',
    color: '#ff6600',
    desc: '独自技術と使いやすさに定評。給湯専用機が豊富なラインナップ。',
    logo: 'P',
  },
]

export default function MakersSection() {
  return (
    <section className="bg-white py-14 md:py-20" id="makers">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="mb-10">
          <p className="section-label mb-2">対応メーカー</p>
          <h2 className="section-heading">主要メーカーに対応</h2>
          <span className="section-divider" />
          <p className="text-slate-500 text-sm mt-4 max-w-lg">
            国内主要給湯器メーカーに幅広く対応しています。現在お使いのメーカーへの交換も、
            異なるメーカーへの変更も可能です。
          </p>
        </div>

        {/* Makers */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {makers.map((maker) => (
            <div
              key={maker.name}
              className="bg-white rounded-lg border border-slate-200 hover:border-slate-300 p-6 md:p-8 shadow-card hover:shadow-card-md transition-all duration-200"
            >
              {/* Logo */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded flex items-center justify-center text-white font-black text-lg flex-shrink-0"
                  style={{ backgroundColor: maker.color }}
                >
                  {maker.logo}
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">{maker.nameEn}</p>
                  <h3 className="text-brand-800 font-black text-lg leading-none">{maker.name}</h3>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{maker.desc}</p>
            </div>
          ))}
        </div>

        {/* Other makers */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 md:p-5">
          <p className="text-brand-800 font-semibold text-sm mb-1.5">その他メーカーもお気軽にご相談ください</p>
          <p className="text-slate-600 text-sm leading-relaxed">
            上記以外のメーカーについても、対応可能な場合があります。型番や設置状況をお知らせいただければ確認いたします。
          </p>
        </div>
      </div>
    </section>
  )
}
