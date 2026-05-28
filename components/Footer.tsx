import Link from 'next/link'

const footerColumns = [
  {
    title: '給湯器を探す',
    links: [
      { href: '/products', label: '給湯器 商品一覧' },
      { href: '/maker/rinnai', label: 'リンナイ給湯器' },
      { href: '/maker/noritz', label: 'ノーリツ給湯器' },
      { href: '/maker/paloma', label: 'パロマ給湯器' },
      { href: '/ecojoys', label: 'エコジョーズ' },
    ],
  },
  {
    title: '対応エリア',
    links: [
      { href: '/area/yokohama', label: '横浜市の給湯器交換' },
      { href: '/area/kawasaki', label: '川崎市の給湯器交換' },
      { href: '/area/atsugi', label: '厚木市の給湯器交換' },
      { href: '/area/ebina', label: '海老名市の給湯器交換' },
    ],
  },
  {
    title: '施工・実績',
    links: [
      { href: '/cases', label: '施工事例一覧' },
      { href: '/voice', label: 'お客様の声' },
      { href: '/blog', label: 'コラム' },
    ],
  },
  {
    title: 'サービス',
    links: [
      { href: '/#guide', label: '給湯器選びのポイント' },
      { href: '/#reasons', label: '選ばれる理由' },
      { href: '/#faq', label: 'よくある質問' },
      { href: '/#area', label: '対応エリア確認' },
    ],
  },
]

const companyInfo = [
  ['会社名', '株式会社宝宮設備'],
  ['代表者', '小宮 龍亮'],
  ['所在地', '神奈川県厚木市温水西1-4-39'],
  ['営業時間', '9:00〜18:00（年中無休）'],
  ['対応エリア', '横浜市・川崎市・厚木市・海老名市'],
]

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-slate-400">

      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-[300px_1fr] gap-12 mb-12">

          {/* Brand column */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <div className="text-white font-black text-2xl tracking-tight">宝宮設備</div>
              <div className="text-slate-500 text-[11px] tracking-wider mt-1">株式会社宝宮設備</div>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              横浜市・川崎市・厚木市・海老名市の<br />
              給湯器交換・販売なら宝宮設備へ。<br />
              自社施工・地域密着で安心をお届けします。
            </p>
            <a href="tel:046-205-4558" className="flex items-center gap-2.5 text-white group mb-1 w-fit">
              <svg className="w-3.5 h-3.5 text-coral-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <span className="font-black text-xl tracking-wide group-hover:text-coral-400 transition-colors">
                046-205-4558
              </span>
            </a>
            <div className="text-slate-600 text-xs">受付 9:00〜18:00（年中無休）</div>

            {/* LINE CTA */}
            <a
              href="https://line.me/ti/p/XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#00B900] hover:bg-[#009a00] text-white text-sm font-bold px-5 py-2.5 mt-5 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.07 9.437-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              LINEで無料相談
            </a>
          </div>

          {/* Nav columns grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-5 pb-2 border-b border-brand-800">
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-slate-500 hover:text-slate-200 text-sm transition-colors leading-tight block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Company info row */}
        <div className="border-t border-brand-800 pt-10">
          <dl className="flex flex-wrap gap-x-8 gap-y-2 text-xs mb-8">
            {companyInfo.map(([label, value]) => (
              <div key={label} className="flex gap-2">
                <dt className="text-slate-600 flex-shrink-0">{label}：</dt>
                <dd className="text-slate-500">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-brand-900">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-slate-600 text-xs">
            &copy; 2024 株式会社宝宮設備 All Rights Reserved.
          </p>
          <p className="text-slate-700 text-xs">神奈川県の給湯器交換専門</p>
        </div>
      </div>

    </footer>
  )
}
