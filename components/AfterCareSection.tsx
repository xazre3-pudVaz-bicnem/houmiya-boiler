const afterCareItems = [
  {
    num: '01',
    title: '施工後の動作確認',
    body: '工事完了後、実際にお湯を出して正常に動作するかを確認します。追い焚き・保温・温度調節など全機能を試運転します。',
  },
  {
    num: '02',
    title: '使用方法の丁寧な説明',
    body: 'リモコンの操作方法、温度設定の方法、運転モードの切り替えなどをわかりやすくご説明します。疑問点はなんでもお聞きください。',
  },
  {
    num: '03',
    title: '不具合時の相談対応',
    body: '工事後に気になることが発生した場合は、お電話またはLINEにてご連絡ください。施工内容に起因する不具合には迅速に対応します。',
  },
  {
    num: '04',
    title: 'メーカー保証の確認',
    body: '給湯器本体には各メーカーの保証が付帯されます。保証内容・期間・連絡先を工事完了時にご案内します。',
  },
  {
    num: '05',
    title: '施工内容に応じたフォロー',
    body: '配管工事や追加工事を行った部分についても、工事後の状態を確認し、必要に応じて対応いたします。',
  },
]

export default function AfterCareSection() {
  return (
    <section className="bg-slate-50 py-14 md:py-20" id="aftercare">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="mb-10">
          <p className="section-label mb-2">保証・アフターフォロー</p>
          <h2 className="section-heading">工事後も安心のアフターフォロー</h2>
          <span className="section-divider" />
          <p className="text-slate-500 text-sm mt-4 max-w-xl">
            給湯器の交換は工事完了で終わりではありません。
            宝宮設備では工事後も安心してご使用いただけるよう、丁寧なフォローを行っています。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {afterCareItems.map((item) => (
            <div key={item.num} className="bg-white border border-slate-200 rounded-lg p-5 hover:border-sky hover:shadow-card transition-all duration-200">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 bg-brand-800 text-sky font-black text-xs rounded flex items-center justify-center flex-shrink-0">
                  {item.num}
                </span>
                <h3 className="font-bold text-brand-800 text-sm leading-snug">{item.title}</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        {/* Warranty notice */}
        <div className="bg-white border-l-4 border-l-brand-800 border border-slate-200 rounded-lg p-5 md:p-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-brand-800 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div>
              <p className="font-bold text-brand-800 text-sm mb-1">保証についてのご案内</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                給湯器本体にはメーカー保証（通常1〜2年）が付帯されます。
                施工部分についても保証を設けておりますが、保証内容は機種・メーカー・施工内容により異なります。
                詳細は工事前または工事完了時にご確認ください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
