import { siteConfig } from '@/data/site'

const companyInfo = [
  { label: '会社名', value: '株式会社宝宮設備' },
  { label: '代表者', value: '小宮 龍亮' },
  { label: '所在地', value: '〒243-0032 神奈川県厚木市温水西1-4-39' },
  { label: '電話番号', value: '046-205-4558', isPhone: true },
  { label: '営業時間', value: '9:00〜18:00（年中無休）' },
  { label: '対応エリア', value: '横浜市・川崎市・厚木市・海老名市（神奈川県内）' },
  { label: '事業内容', value: '給湯器販売、給湯器交換工事、給湯器撤去、空調設備工事' },
]

const snsList = [
  { name: '公式Instagram', href: siteConfig.instagramUrl, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
  { name: 'LINE公式', href: siteConfig.lineUrl, color: 'bg-[#00B900]' },
]

export default function CompanySection() {
  return (
    <section className="bg-white py-14 md:py-20" id="company">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="mb-10">
          <p className="section-label mb-2">会社概要</p>
          <h2 className="section-heading">会社概要</h2>
          <span className="section-divider" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Company info table */}
          <div className="md:col-span-2">
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-card">
              {companyInfo.map((item, idx) => (
                <div
                  key={item.label}
                  className={`grid grid-cols-3 border-b border-slate-100 last:border-0 ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                  }`}
                >
                  <div className="bg-brand-800 text-slate-300 text-xs font-bold px-4 py-3.5 flex items-center">
                    {item.label}
                  </div>
                  <div className="col-span-2 px-4 py-3.5 text-brand-800 text-sm leading-relaxed flex items-center">
                    {item.isPhone ? (
                      <a href="tel:046-205-4558" className="text-sky font-bold hover:underline">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side card */}
          <div className="space-y-4">
            {/* Rep card */}
            <div className="bg-brand-800 rounded-lg p-4 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-brand-700 rounded flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
                <div>
                  <div className="font-black text-sm">代表 小宮 龍亮</div>
                  <div className="text-slate-400 text-xs">株式会社宝宮設備</div>
                </div>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                地域の皆様に安心して使っていただける給湯器をご提供することを大切にしています。
                ご不明な点はなんでもお気軽にご相談ください。
              </p>
            </div>

            {/* SNS */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="font-bold text-brand-800 text-xs uppercase tracking-wide mb-3">SNS・公式アカウント</p>
              <div className="space-y-2">
                {snsList.map((sns) => (
                  <a
                    key={sns.name}
                    href={sns.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 ${sns.color} text-white rounded px-3 py-2.5 text-xs font-bold hover:opacity-90 transition-opacity`}
                  >
                    {sns.name}で見る
                  </a>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="block text-center bg-sky hover:bg-sky-dark text-white font-bold py-3.5 rounded transition-all duration-150 active:scale-95 text-sm"
            >
              無料見積もりはこちら
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
