const steps = [
  {
    step: '01',
    title: 'お問い合わせ',
    desc: '電話・LINE・フォームでご連絡ください。症状・設置状況など、わかる範囲でお知らせください。',
    note: '24時間受付（LINE・メール）',
  },
  {
    step: '02',
    title: '写真確認',
    desc: '給湯器全体・型番ラベル・設置場所の写真をお送りいただくと、訪問前に概算費用をお伝えできます。',
    note: '写真で概算見積もり可',
  },
  {
    step: '03',
    title: '設置状況の確認',
    desc: '必要に応じて現地にお伺いし、ガス配管・水道配管・設置スペースなどを確認します。',
    note: '現地確認も無料',
  },
  {
    step: '04',
    title: 'お見積もり',
    desc: '機種・工事内容・費用を明確にご提示します。追加費用が見込まれる場合は必ず事前にご説明します。',
    note: '見積もり無料',
  },
  {
    step: '05',
    title: '工事日の調整',
    desc: 'ご納得いただけましたら工事日程を調整します。最短即日対応が可能な場合もあります。',
    note: '最短即日対応可',
  },
  {
    step: '06',
    title: '既存給湯器の撤去',
    desc: '既存の給湯器を安全に撤去・廃棄処分します。ガス管・水道管・電気を適切に処理します。',
    note: '廃棄処分も対応',
  },
  {
    step: '07',
    title: '新しい給湯器の設置',
    desc: '新しい給湯器を正確に設置・配管接続します。ガス・水道・電気の接続を確認しながら作業します。',
    note: '自社施工で対応',
  },
  {
    step: '08',
    title: '試運転・動作確認',
    desc: '試運転を行い、お湯が正常に出ること・追い焚き・保温機能などをすべて確認します。',
    note: '全機能を確認',
  },
  {
    step: '09',
    title: '使用方法の説明',
    desc: 'リモコンの操作方法・日常的なメンテナンス・緊急時の対応方法をわかりやすくご説明します。',
    note: '操作説明付き',
  },
  {
    step: '10',
    title: 'アフターフォロー',
    desc: '工事完了後も気になることがあればいつでもご連絡ください。施工保証もご用意しています。',
    note: '保証・フォロー対応',
  },
]

export default function ProcessSection() {
  return (
    <section className="bg-slate-50 py-20 md:py-28" id="process">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <p className="section-label mb-3">施工の流れ</p>
          <h2 className="section-heading">お問い合わせから完了まで</h2>
          <span className="section-divider mx-auto" />
          <p className="text-slate-500 text-sm mt-4">
            初めての給湯器交換でも安心していただけるよう、流れをわかりやすくご説明します。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
          {steps.map((s, idx) => (
            <div
              key={s.step}
              className="bg-white rounded-xl p-5 border border-slate-100 hover:border-slate-200 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 bg-brand-900 text-sky font-black text-xs rounded-lg flex items-center justify-center flex-shrink-0">
                  {s.step}
                </span>
                {idx < steps.length - 1 && (
                  <svg className="w-3 h-3 text-slate-200 ml-auto hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
              <h3 className="font-bold text-brand-900 text-xs mb-1.5 leading-snug">{s.title}</h3>
              <p className="text-slate-500 text-[11px] leading-relaxed mb-2.5">{s.desc}</p>
              <span className="inline-block text-sky text-[10px] font-semibold border border-sky/20 bg-sky/5 px-2 py-0.5 rounded">
                {s.note}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="tel:046-205-4558"
            className="inline-flex items-center gap-3 bg-coral-600 hover:bg-coral-700 text-white font-bold py-4 px-10 rounded-lg transition-all duration-150 active:scale-95 shadow-[0_4px_16px_rgba(220,38,38,0.25)] text-sm"
          >
            <PhoneIcon />
            まずはお気軽にご相談ください
          </a>
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
