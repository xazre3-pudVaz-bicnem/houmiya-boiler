import Link from 'next/link'
import { siteConfig } from '@/data/site'

const footerColumns = [
  {
    title: 'リンナイ',
    links: [
      { href: '/rinnai', label: 'リンナイ給湯器 一覧' },
      { href: '/rinnai', label: 'ガスふろ給湯器 壁掛型' },
      { href: '/category/gas-furo', label: 'ガスふろ給湯器' },
      { href: '/category/ps-standard', label: 'PS標準設置型' },
      { href: '/category/ps-door', label: 'PS扉内設置型' },
    ],
  },
  {
    title: 'ノーリツ',
    links: [
      { href: '/noritz', label: 'ノーリツ給湯器 一覧' },
      { href: '/noritz', label: 'ガスふろ給湯器 壁掛型' },
      { href: '/category/gas-furo', label: 'ガスふろ給湯器' },
      { href: '/category/eco-jaws', label: 'エコジョーズ' },
      { href: '/category/warm-water-heating', label: '暖房付き給湯器' },
    ],
  },
  {
    title: 'パロマ',
    links: [
      { href: '/paloma', label: 'パロマ給湯器 一覧' },
      { href: '/paloma', label: 'ガスふろ給湯器 壁掛型' },
      { href: '/category/gas-furo', label: 'ガスふろ給湯器' },
      { href: '/category/gas-kyuto', label: '給湯専用' },
    ],
  },
  {
    title: 'ご利用案内',
    links: [
      { href: '/estimate', label: '無料見積もり依頼' },
      { href: '/warranty', label: '保証について' },
      { href: '/cases', label: '施工事例一覧' },
      { href: '/#order-flow', label: 'ご注文の流れ' },
      { href: '/#construction-fee', label: '標準工事費について' },
    ],
  },
  {
    title: '施工事例',
    links: [
      { href: '/cases', label: '施工事例一覧' },
      { href: '/cases', label: '横浜市の施工事例' },
      { href: '/cases', label: '川崎市の施工事例' },
      { href: '/cases', label: '厚木市の施工事例' },
      { href: '/cases', label: '海老名市の施工事例' },
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
    title: '給湯器の基礎知識',
    links: [
      { href: '/guide/full-auto-auto', label: 'フルオートとオートの違い' },
      { href: '/guide/capacity', label: '号数の選び方' },
      { href: '/guide/eco-jaws', label: 'エコジョーズとは' },
      { href: '/guide/model-number', label: '型番の見方' },
      { href: '/guide/error-code', label: 'エラーコード一覧' },
      { href: '/guide/lifespan', label: '給湯器の寿命' },
      { href: '/blog', label: '給湯器コラム一覧' },
    ],
  },
  {
    title: '会社情報',
    links: [
      { href: '/estimate', label: 'お問い合わせ' },
      { href: '/#faq', label: 'よくある質問' },
      { href: '/warranty', label: '保証・アフター' },
    ],
  },
]

const LineIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.07 9.437-6.975C23.176 14.393 24 12.458 24 10.314" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">

      {/* CTA バー */}
      <div className="bg-brand-900 border-b border-brand-800">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-white font-black text-lg">給湯器のことでお困りですか？</div>
            <div className="text-blue-200 text-sm mt-0.5">お電話・LINE・フォームから今すぐご相談ください</div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href={siteConfig.phoneHref}
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-lg px-5 py-2.5 rounded transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white font-bold text-sm px-4 py-2.5 rounded transition-colors"
              style={{ backgroundColor: '#00B900' }}
            >
              <LineIcon />
              LINE相談
            </a>
            <Link
              href="/estimate"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-4 py-2.5 rounded transition-colors"
            >
              無料見積もり
            </Link>
          </div>
        </div>
      </div>

      {/* メインフッター */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-8 mb-10">
          {footerColumns.map((col) => (
            <div key={col.title} className="lg:col-span-1">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-gray-400 mb-4 pb-2 border-b border-gray-700">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-gray-500 hover:text-gray-200 text-xs transition-colors leading-tight block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 会社情報 */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="md:w-64 flex-shrink-0">
              <div className="text-white font-black text-xl mb-1">{siteConfig.shortName}</div>
              <div className="text-gray-500 text-xs mb-3">{siteConfig.name}</div>
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-2 text-yellow-400 font-black text-xl hover:text-yellow-300 transition-colors w-fit"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                {siteConfig.phone}
              </a>
              <div className="text-gray-600 text-xs mt-1">受付 {siteConfig.hours}</div>
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-white font-bold text-sm px-4 py-2 rounded"
                style={{ backgroundColor: '#00B900' }}
              >
                <LineIcon />
                LINEで無料相談
              </a>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs">
              {[
                ['会社名', siteConfig.name],
                ['代表者', siteConfig.representative],
                ['所在地', siteConfig.address],
                ['営業時間', siteConfig.hours],
                ['対応エリア', siteConfig.areas.join('・')],
                ['電話番号', siteConfig.phone],
                ['メール', siteConfig.contactEmail],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-2">
                  <dt className="text-gray-600 flex-shrink-0 w-16">{label}：</dt>
                  <dd className="text-gray-400">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-gray-600 text-xs">
            &copy; 2024 {siteConfig.name} All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-gray-700 text-xs">
            <Link href="/estimate" className="hover:text-gray-400 transition-colors">お問い合わせ</Link>
            <Link href="/warranty" className="hover:text-gray-400 transition-colors">保証について</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}
