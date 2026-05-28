const services = [
  {
    title: '給湯器本体の販売',
    desc: 'リンナイ・ノーリツ・パロマなど主要メーカーの最新機種を取り扱っています。ご要望に合わせた機種選定もアドバイスします。',
  },
  {
    title: '既存給湯器の交換工事',
    desc: '現在お使いの給湯器を最新機種に交換します。既存の配管を活かした標準交換から、配管変更が必要なケースまで対応します。',
  },
  {
    title: '古い給湯器の撤去・処分',
    desc: '古くなった給湯器の撤去・廃棄処分を承ります。通常は標準工事費に含まれています。',
  },
  {
    title: '戸建て・マンション・アパート対応',
    desc: '建物の種別を問わず対応しています。マンションのPS設置タイプやアパートの集合住宅タイプなど幅広く対応。',
  },
  {
    title: '故障時の緊急相談',
    desc: '「急にお湯が出なくなった」「エラーが出た」など緊急の場合はまずお電話ください。状況を確認し迅速に対応します。',
  },
  {
    title: '号数変更・機能アップ相談',
    desc: '16号→20号への変更、給湯専用からオート・フルオートへの機能アップなど、ライフスタイルに合わせた提案をします。',
  },
  {
    title: '追い焚き付き給湯器の交換',
    desc: 'オートタイプ・フルオートタイプへの交換に対応。自動湯はり・自動追い焚き機能付きへのアップグレードも可能です。',
  },
  {
    title: 'エコジョーズ対応',
    desc: '高効率の省エネ給湯器「エコジョーズ」への交換も対応しています。光熱費の節約が期待できます。',
  },
]

export default function ServicesSection() {
  return (
    <section className="bg-white py-14 md:py-20" id="services">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="mb-10">
          <p className="section-label mb-2">サービス内容</p>
          <h2 className="section-heading">
            給湯器販売・交換・撤去まで<br className="hidden md:block" />まとめて対応
          </h2>
          <span className="section-divider" />
          <p className="text-slate-500 text-sm mt-4">
            宝宮設備では、給湯器に関するあらゆるご相談に対応しています。
          </p>
        </div>

        {/* Service grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:border-sky hover:bg-sky/5 transition-all duration-200"
            >
              <div className="text-sky font-black text-sm mb-2 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-bold text-brand-800 text-sm mb-2 leading-tight">{s.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="bg-brand-50 border border-brand-100 rounded p-4 mb-6">
          <p className="text-brand-700 text-sm">
            上記以外のご相談も承っています。まずはお気軽にお問い合わせください。
          </p>
        </div>

        {/* CTA */}
        <div>
          <p className="text-slate-500 text-sm mb-4">写真を送るだけで概算見積もりも可能です</p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-brand-800 hover:bg-brand-700 text-white font-bold py-3.5 px-8 rounded transition-all duration-150 active:scale-95"
          >
            無料で見積もりを依頼する
          </a>
        </div>
      </div>
    </section>
  )
}
