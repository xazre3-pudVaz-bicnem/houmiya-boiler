const warningSigns = [
  { title: 'お湯の温度が不安定', desc: '設定温度通りにならない、急に冷たくなるなど。熱交換器や給湯バルブの劣化サインです。' },
  { title: '点火に時間がかかる', desc: 'お湯が出るまで時間がかかるようになった場合、点火装置の劣化が考えられます。' },
  { title: '異音・振動がある', desc: '「バン」「ガタガタ」などの異常音は内部部品の損傷・劣化のサインです。早めに確認を。' },
  { title: 'エラーコードが頻発', desc: '同じエラーコードが繰り返し表示される場合、本格的な故障が近い可能性があります。' },
  { title: '本体・配管からの水漏れ', desc: '水漏れは放置すると漏電・ガス漏れにもつながる危険な状態です。すぐにご連絡を。' },
  { title: '製造から10年以上経過', desc: '10年を超えると部品供給が終了する場合があります。故障前の早めの交換を検討してください。' },
]

const replacementTimings = [
  { phase: '10〜12年目', label: '交換推奨時期', color: 'text-yellow-500', bg: 'bg-yellow-50 border-yellow-200', desc: 'メーカーが定める標準的な寿命。まだ動いていても修理部品がなくなるケースも。' },
  { phase: '故障・エラー多発', label: '要注意サイン', color: 'text-coral-600', bg: 'bg-orange-50 border-orange-200', desc: '修理を繰り返すよりも交換した方が長期的にコスト・安心の面で優れることが多い。' },
  { phase: '家族構成変化時', label: '機能アップのチャンス', color: 'text-sky-dark', bg: 'bg-sky/5 border-sky/30', desc: '家族が増えた・減ったタイミングで号数・機能を見直すのも賢い交換タイミング。' },
  { phase: '冬季前の9〜11月', label: '計画的交換に最適', color: 'text-brand-700', bg: 'bg-brand-50 border-brand-200', desc: '給湯器の繁忙期（冬）前に交換すると、スムーズに工事できます。緊急時より余裕がある分、機種選びも丁寧に。' },
]

export default function BoilerKnowledgeSection() {
  return (
    <section className="bg-slate-50 py-14 md:py-20" id="knowledge">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-sky/10 text-sky-dark text-sm font-bold px-4 py-1.5 rounded-full mb-4 border border-sky/20">
            給湯器の豆知識
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-brand-800">
            給湯器を長く安全に使うために<br className="hidden md:block" />
            知っておきたいこと
          </h2>
          <span className="block w-12 h-1 bg-sky rounded-full mx-auto mt-4" />
        </div>

        {/* Article 1: 寿命 */}
        <div className="bg-white rounded-lg overflow-hidden shadow-card mb-8 border border-slate-200">
          <div className="bg-brand-800 px-6 py-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-sky/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-white font-black text-lg md:text-xl">給湯器の寿命は何年？</h3>
          </div>
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-5">
              <div>
                <p className="text-gray-700 text-base leading-relaxed mb-4">
                  一般的なガス給湯器の<strong className="text-brand-800">標準的な寿命は10〜15年程度</strong>とされています。
                  メーカーの標準的な設計寿命は10年で、この期間を超えると修理用の部品供給が終了することがあります。
                </p>
                <p className="text-gray-700 text-base leading-relaxed">
                  ただし、使用頻度・水質・設置環境によって大きく差があります。
                  「まだ動いているから大丈夫」と思っていても、10年を超えた給湯器は
                  予告なく故障するリスクが高まります。
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { year: '〜7年', status: '良好期', color: 'bg-green-100 text-green-700', note: '通常の使用に問題なし' },
                  { year: '7〜10年', status: '注意期', color: 'bg-yellow-100 text-yellow-700', note: '軽微な不具合が出始めることも' },
                  { year: '10〜13年', status: '検討期', color: 'bg-orange-100 text-orange-700', note: '交換を検討すべき時期' },
                  { year: '13年以上', status: '要交換', color: 'bg-red-100 text-red-700', note: '部品供給終了のリスクあり' },
                ].map((s) => (
                  <div key={s.year} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <span className="font-bold text-brand-800 w-20 flex-shrink-0 text-sm">{s.year}</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${s.color}`}>{s.status}</span>
                    <span className="text-gray-600 text-sm">{s.note}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-sky/5 border border-sky/30 rounded-xl p-4">
              <p className="text-brand-700 text-sm font-semibold">
                10年経過していたら、壊れる前に交換を検討することをおすすめします。
                計画的な交換で、急な故障によるお湯が使えない状況を避けることができます。
              </p>
            </div>
          </div>
        </div>

        {/* Article 2: 前兆 */}
        <div className="bg-white rounded-lg overflow-hidden shadow-card mb-8 border border-slate-200">
          <div className="bg-[#b03a2e] px-6 py-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-white font-black text-lg md:text-xl">給湯器が壊れる前兆・危険なサイン</h3>
          </div>
          <div className="p-6 md:p-8">
            <p className="text-gray-700 text-base mb-5 leading-relaxed">
              給湯器には壊れる前にサインが出ることがあります。以下の症状が出たら早めにご相談ください。
              放置すると本格的な故障につながり、急にお湯が使えなくなる可能性があります。
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {warningSigns.map((sign, idx) => (
                <div key={sign.title} className="bg-red-50 border border-red-100 rounded-xl p-4 hover:border-red-200 transition-colors">
                  <div className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center mb-2">
                    <span className="text-coral-600 font-black text-xs">{idx + 1}</span>
                  </div>
                  <h4 className="font-bold text-brand-800 text-sm mb-1 leading-tight">{sign.title}</h4>
                  <p className="text-gray-600 text-xs leading-relaxed hidden md:block">{sign.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Article 3: タイミング */}
        <div className="bg-white rounded-lg overflow-hidden shadow-card mb-8 border border-slate-200">
          <div className="bg-brand-700 px-6 py-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-sky/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-white font-black text-lg md:text-xl">給湯器交換のタイミング</h3>
          </div>
          <div className="p-6 md:p-8">
            <p className="text-gray-700 text-base mb-5 leading-relaxed">
              給湯器交換を検討すべきタイミングはいくつかあります。
              「故障してから」ではなく、できれば事前に計画的に交換することをおすすめします。
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {replacementTimings.map((t) => (
                <div key={t.phase} className={`rounded-xl border-2 p-5 ${t.bg}`}>
                  <div className={`font-black text-sm mb-1 ${t.color}`}>{t.phase}</div>
                  <h4 className="font-bold text-brand-800 text-base mb-2">{t.label}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-brand-800 font-semibold text-sm">
                給湯器交換のタイミングや機種選びに迷ったら、お気軽にご相談ください。
                現在の状況を伺ったうえで最適な時期・機種をご提案します。
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-700 font-semibold text-base mb-4">
            給湯器の状態が気になる方、まずは無料で診断・相談を
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:046-205-4558" className="inline-flex items-center justify-center gap-2 bg-coral-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-coral-700 transition-colors shadow-md">
              <PhoneIcon />
              電話で相談する
            </a>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-brand-800 text-white font-bold py-4 px-8 rounded-xl hover:bg-brand-700 transition-colors shadow-md">
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
