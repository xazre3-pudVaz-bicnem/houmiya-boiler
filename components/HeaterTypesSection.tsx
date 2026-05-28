const heaterTypes = [
  { title: 'ガス給湯器', desc: '都市ガス・プロパンガス対応。最もポピュラーなタイプ。', tag: '最多対応' },
  { title: '追い焚き付き給湯器', desc: '浴槽のお湯を温め直せる機能付き。オート・フルオートの2種類。' },
  { title: 'エコジョーズ', desc: '排熱を再利用する高効率タイプ。省エネで光熱費削減効果が期待できる。', tag: '省エネ' },
  { title: '給湯専用タイプ', desc: '追い焚きなしのシンプルタイプ。一人暮らしや台所専用に最適。' },
  { title: 'オートタイプ', desc: '自動湯はり・追い焚き機能付き。設定した水位・温度まで自動でお湯はり。' },
  { title: 'フルオートタイプ', desc: '自動湯はり＋保温＋足し湯＋追い焚きまで全自動。最も快適なタイプ。', tag: '人気' },
  { title: '壁掛けタイプ', desc: '外壁に取り付けるタイプ。一般的な戸建て・マンションに広く普及。' },
  { title: '据置タイプ', desc: '地面に置くタイプ。主に屋外設置で、一部の戸建て住宅で使用。' },
  { title: 'マンションPS設置タイプ', desc: 'パイプスペース（PS）内に設置するマンション専用タイプ。' },
  { title: '業務用給湯器', desc: '飲食店・施設などの業務用も相談可能。まずはお問い合わせください。', tag: '要相談' },
]

export default function HeaterTypesSection() {
  return (
    <section className="bg-slate-50 py-14 md:py-20" id="heater-types">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="mb-10">
          <p className="section-label mb-2">対応機種</p>
          <h2 className="section-heading">対応できる給湯器の種類</h2>
          <span className="section-divider" />
          <p className="text-slate-500 text-sm mt-4 max-w-lg">
            さまざまな種類・設置状況の給湯器に対応しています。現在お使いの機種がわからない場合もお気軽にご相談ください。
          </p>
        </div>

        {/* Types grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {heaterTypes.map((t) => (
            <div
              key={t.title}
              className="bg-white rounded-lg p-3.5 md:p-4 border border-slate-200 hover:border-sky transition-all duration-200 relative"
            >
              {t.tag && (
                <span className="absolute -top-2 -right-2 bg-sky text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {t.tag}
                </span>
              )}
              <h3 className="font-bold text-brand-800 text-xs md:text-sm mb-1.5 leading-tight">{t.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed hidden md:block">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="bg-white border-l-4 border-sky rounded-r-lg p-4 flex items-start gap-3 shadow-card">
          <svg className="w-5 h-5 text-sky flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-bold text-brand-800 text-sm mb-1">「どの種類を選べばいいかわからない」という方へ</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              現在の設置状況・ご家族の人数・ご予算に合わせて最適な機種をご提案します。
              まずは写真や型番をお知らせいただくだけでも構いません。お気軽にご相談ください。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
