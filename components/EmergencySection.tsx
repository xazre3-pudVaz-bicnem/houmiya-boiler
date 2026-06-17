import { siteConfig } from '@/data/site'

const symptoms = [
  { label: 'お湯が出ない' },
  { label: 'エラーコードが出る' },
  { label: '追い焚きができない' },
  { label: 'リモコンが反応しない' },
  { label: '異音がする' },
  { label: '水漏れしている' },
  { label: '10年以上使用している' },
  { label: '冬場に急に故障した' },
]

export default function EmergencySection() {
  return (
    <section className="bg-white py-12 md:py-16" id="emergency">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-brand-900 leading-snug">
            お湯が出ない・エラーが出る・給湯器が古い…<br className="hidden md:block" />
            <span className="text-coral-600">まずはご相談ください</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-lg mx-auto">
            以下のような症状が出ていたら、お気軽にお問い合わせください。
            写真を送るだけで概算のお見積もりも可能です。
          </p>
        </div>

        {/* Symptom cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {symptoms.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-slate-200 rounded-lg px-4 py-3.5 text-center hover:border-coral-400 hover:bg-red-50 transition-all duration-200 cursor-default"
            >
              <div className="w-2 h-2 bg-coral-600 rounded-full mx-auto mb-2" />
              <p className="text-brand-800 font-bold text-sm leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        {/* CTA bar */}
        <div className="bg-brand-800 rounded-lg p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <p className="text-white font-bold text-base mb-1">まずはお気軽にご相談ください</p>
            <p className="text-slate-300 text-sm">
              給湯器の写真（全体・型番ラベル・設置場所）を送るだけで概算見積もりができます。
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
            <a
              href="tel:046-205-4558"
              className="inline-flex items-center justify-center gap-2 bg-coral-600 hover:bg-coral-700 text-white font-bold py-3 px-5 rounded transition-colors shadow-cta text-sm active:scale-95"
            >
              <PhoneIcon />
              046-205-4558
            </a>
            <a
              href={siteConfig.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#00B900] hover:bg-[#009a00] text-white font-bold py-3 px-5 rounded transition-colors text-sm active:scale-95"
            >
              LINE相談（無料）
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
