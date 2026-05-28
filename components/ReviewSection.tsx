const reviews = [
  {
    rating: 5,
    title: '急な故障でも当日対応していただきました',
    body: '冬の朝に突然お湯が出なくなり、慌てて電話しました。当日午後には来ていただき、翌日には新しい給湯器が設置完了。本当に助かりました。',
    name: 'T様（50代）',
    area: '横浜市戸塚区',
    type: '戸建て',
  },
  {
    rating: 5,
    title: '料金が明確で安心してお願いできました',
    body: '見積もりの際に追加費用が発生する可能性についても事前に説明してもらえたので、安心してお願いできました。実際の費用も見積もりとほぼ同額でした。',
    name: 'K様（40代）',
    area: '川崎市中原区',
    type: 'マンション',
  },
  {
    rating: 5,
    title: 'エコジョーズに変えてガス代が下がりました',
    body: 'エコジョーズについて丁寧に説明してくれて、設置環境の確認も事前にしっかりやってくれました。交換後はガス代が月に1,000円以上下がっています。',
    name: 'M様（60代）',
    area: '厚木市',
    type: '戸建て',
  },
  {
    rating: 5,
    title: 'オーナーとして複数台を依頼',
    body: '所有アパートの給湯器を一気に交換しました。複数台でも効率よく作業していただき、入居者への影響も最小限でした。今後もお願いしたいと思っています。',
    name: 'S様（不動産オーナー）',
    area: '海老名市',
    type: 'アパート',
  },
  {
    rating: 5,
    title: '操作説明が丁寧でわかりやすかった',
    body: '新しい給湯器のリモコン操作を、年配の親のためにわかりやすく説明してくれました。工事後も何かあれば気軽に聞いていいと言ってくれたので安心です。',
    name: 'A様（30代）',
    area: '横浜市港北区',
    type: 'マンション',
  },
  {
    rating: 5,
    title: '見積もりから工事まで対応が速い',
    body: '問い合わせ当日に写真確認で概算を教えてもらえ、翌日には工事完了。スピードが早く、かつ丁寧で満足しています。',
    name: 'N様（40代）',
    area: '川崎市麻生区',
    type: '戸建て',
  },
]

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-slate-300'}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

export default function ReviewSection() {
  return (
    <section className="bg-slate-50 py-14 md:py-20" id="reviews">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="mb-10">
          <p className="section-label mb-2">お客様の声</p>
          <h2 className="section-heading">施工されたお客様のご感想</h2>
          <span className="section-divider" />
          <p className="text-slate-500 text-sm mt-4 max-w-lg">
            横浜市・川崎市・厚木市・海老名市での実際のご利用者様からいただいたご感想をご紹介します。
          </p>
        </div>

        {/* Review cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {reviews.map((r) => (
            <div key={r.name} className="bg-white rounded-lg border border-slate-200 p-5 shadow-card hover:shadow-card-md transition-all duration-200">
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} filled={i < r.rating} />
                ))}
              </div>

              <h3 className="font-bold text-brand-900 text-sm mb-2 leading-snug">
                &ldquo;{r.title}&rdquo;
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">{r.body}</p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="bg-brand-800 text-sky-light text-[11px] font-bold px-2 py-0.5 rounded">{r.area}</span>
                  <span className="bg-slate-100 text-slate-600 text-[11px] px-2 py-0.5 rounded">{r.type}</span>
                </div>
                <span className="text-slate-400 text-xs">{r.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-slate-400 text-xs text-center">
          ※ お客様の感想は個人の体験に基づくものです。
        </p>
      </div>
    </section>
  )
}
