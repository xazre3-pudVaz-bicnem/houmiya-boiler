const credentials = [
  {
    title: '地域密着の設備会社',
    body: '神奈川県厚木市を拠点に横浜・川崎・厚木・海老名で対応。地域をよく知るスタッフが対応します。',
  },
  {
    title: '自社施工で一貫対応',
    body: '外注・下請けを使わず、見積もりから工事・アフターフォローまですべて自社スタッフが担当します。',
  },
  {
    title: '戸建・マンション・アパート対応',
    body: 'あらゆる建物形態に対応。マンションPS設置タイプや屋内設置型など複雑な環境にも対応可能です。',
  },
  {
    title: 'リンナイ・ノーリツ・パロマ対応',
    body: '国内主要メーカーの給湯器を取り扱い。機種選びから交換まで、メーカーをまたいだ相談にも対応します。',
  },
  {
    title: '工事後のアフターフォロー',
    body: '工事完了後も気になることはいつでもご連絡ください。メーカー保証に加え、施工部分の保証も対応しています。',
  },
  {
    title: '見積もり・相談は無料',
    body: '現地見積もり・写真見積もりともに無料です。お見積もりのみのご依頼も歓迎します。',
  },
]

export default function TrustStats() {
  return (
    <section className="bg-slate-50 border-y border-slate-200 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <p className="section-label mb-2">宝宮設備について</p>
          <h2 className="section-heading">株式会社宝宮設備が選ばれる理由</h2>
          <span className="section-divider" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {credentials.map((c) => (
            <div key={c.title} className="bg-white border border-slate-200 rounded-lg p-5 flex gap-4">
              <div className="w-1 bg-brand-800 rounded-full flex-shrink-0" />
              <div>
                <h3 className="font-bold text-brand-800 text-sm mb-1.5">{c.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
