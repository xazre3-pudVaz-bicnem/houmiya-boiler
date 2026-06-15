import type { ReactNode } from 'react'

type Point = {
  number: string
  icon: ReactNode
  title: string
  body: string
  check: string
}

const WrenchIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
  </svg>
)

const ClipboardIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
)

const MapPinIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const BoltIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const points: Point[] = [
  {
    number: '01',
    icon: <WrenchIcon />,
    title: '自社施工かどうか確認する',
    body: '給湯器交換業者の中には、下請けに工事を丸投げするケースがあります。自社施工であれば、相談から工事・アフターフォローまで責任の所在が明確です。宝宮設備はすべて自社スタッフによる施工です。',
    check: '宝宮設備：自社施工100%',
  },
  {
    number: '02',
    icon: <ClipboardIcon />,
    title: '見積もりが明確かどうか',
    body: '「本体価格＋工事費」が明確に提示されているか確認しましょう。追加費用が発生する可能性がある場合も、事前に説明してくれる業者が信頼できます。',
    check: '宝宮設備：本体＋工事費込みで明確にご提示',
  },
  {
    number: '03',
    icon: <MapPinIcon />,
    title: '地域密着・実績がある',
    body: '横浜市内の実績が多い業者は、地域の住宅事情（マンションPS設置・戸建て設置環境など）に詳しいため、スムーズな対応が期待できます。遠方の業者より地元業者の方が迅速対応しやすいメリットもあります。',
    check: '宝宮設備：神奈川県内施工実績多数',
  },
  {
    number: '04',
    icon: <BoltIcon />,
    title: '即日対応・緊急対応が可能か',
    body: '冬場の給湯器故障は生活に直結します。「最短即日対応」「緊急対応可能」を明示している業者を選ぶと、いざという時に安心です。',
    check: '宝宮設備：最短即日対応を目指す',
  },
  {
    number: '05',
    icon: <ShieldIcon />,
    title: 'アフターフォローがある',
    body: '工事後の保証・問い合わせ対応が明確な業者を選びましょう。「工事したら終わり」ではなく、継続的にサポートしてくれる業者との長期的な付き合いが安心です。',
    check: '宝宮設備：施工保証＋長期サポート',
  },
]

export default function SelectionGuideSection() {
  return (
    <section className="bg-slate-50 py-14 md:py-20" id="selection-guide">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-block bg-sky/10 text-sky-dark text-sm font-bold px-4 py-1.5 rounded-full mb-4 border border-sky/20">
            業者選びのポイント
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-brand-800">
            横浜市・神奈川県で
            <br className="hidden md:block" />
            給湯器交換業者を選ぶ5つのポイント
          </h2>
          <span className="block w-12 h-1 bg-sky rounded-full mx-auto mt-4" />
          <p className="text-gray-600 mt-5 max-w-xl mx-auto">
            給湯器交換は大切な設備工事です。
            後悔しない業者選びのために確認すべきポイントをご紹介します。
          </p>
        </div>

        <div className="space-y-4 mb-10">
          {points.map((p) => (
            <div
              key={p.number}
              className="bg-white rounded-lg overflow-hidden border border-slate-200 shadow-card hover:shadow-card-md transition-all duration-200"
            >
              <div className="flex items-start gap-0">
                {/* Left: Number */}
                <div className="bg-brand-800 flex-shrink-0 w-16 md:w-20 flex flex-col items-center justify-center py-5 px-2">
                  <div className="text-sky font-black text-xs mb-1">CHECK</div>
                  <div className="text-white font-black text-2xl md:text-3xl leading-none">{p.number}</div>
                </div>

                {/* Content */}
                <div className="flex-1 p-5 md:p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-sky flex-shrink-0 mt-0.5">{p.icon}</span>
                    <h3 className="font-black text-brand-800 text-lg leading-tight">{p.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3">{p.body}</p>
                  <div className="inline-flex items-center gap-2 bg-sky/10 text-sky-dark border border-sky/20 text-xs md:text-sm font-bold px-3 py-1.5 rounded-full">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    {p.check}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-brand-800 rounded-lg p-6 md:p-8 text-white text-center">
          <h3 className="font-black text-xl md:text-2xl mb-3">宝宮設備はすべてのポイントを満たしています</h3>
          <p className="text-slate-200 text-base max-w-xl mx-auto mb-6">
            自社施工・明確な料金・地域密着・最短即日対応・アフターフォローを兼ね備えた
            横浜市・川崎市・厚木市・海老名市の地元設備会社です。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:046-205-4558" className="inline-flex items-center justify-center gap-2 bg-[#e85d2a] text-white font-bold py-4 px-8 rounded-xl hover:bg-[#d44e20] transition-all active:scale-95 shadow-md">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              046-205-4558
            </a>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-sky text-brand-900 font-bold py-4 px-8 rounded-xl hover:bg-sky-dark hover:text-white transition-all active:scale-95 shadow-md">
              無料見積もりを依頼する
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
