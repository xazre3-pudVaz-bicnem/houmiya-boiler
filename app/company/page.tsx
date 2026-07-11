import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import Breadcrumb from '@/components/Breadcrumb'
import FaqAccordion from '@/components/FaqAccordion'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: '会社紹介・会社概要｜株式会社宝宮設備｜横浜市・川崎市の給湯器専門業者',
  description:
    '株式会社宝宮設備の会社紹介。代表メッセージ、会社概要、対応エリア、給湯器交換の施工実績。神奈川県厚木市を拠点に横浜市・川崎市・海老名市全域対応。',
  alternates: { canonical: 'https://www.houmiya-boiler.com/company' },
  openGraph: {
    title: '会社紹介・会社概要｜株式会社宝宮設備',
    description:
      '給湯器交換専門の株式会社宝宮設備。横浜市・川崎市・厚木市・海老名市対応。代表メッセージ・会社概要・施工体制を掲載。',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.houmiya-boiler.com/#business',
  name: '株式会社宝宮設備',
  description: '横浜市・川崎市・厚木市・海老名市の給湯器交換・販売専門店',
  telephone: '046-205-4558',
  email: 'homiya@houmiyasetubi.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '温水西1-4-39',
    addressLocality: '厚木市',
    addressRegion: '神奈川県',
    postalCode: '243-0039',
    addressCountry: 'JP',
  },
  openingHours: 'Mo,Tu,We,Th,Fr,Sa,Su 09:00-18:00',
  areaServed: ['横浜市', '川崎市', '厚木市', '海老名市'],
  url: 'https://www.houmiya-boiler.com',
  sameAs: ['https://line.me/R/ti/p/@432ridrn'],
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: '小宮龍亮',
  jobTitle: '代表取締役',
  worksFor: { '@type': 'Organization', name: '株式会社宝宮設備' },
}

const faqs = [
  {
    q: '対応エリアを教えてください',
    a: '横浜市・川崎市・厚木市・海老名市を中心に対応しています。上記エリア外でも対応できる場合がありますので、まずはお電話またはLINEにてご相談ください。',
  },
  {
    q: '見積もりは無料ですか',
    a: 'はい、お見積もりは無料です。写真をLINEで送っていただくだけで概算金額をご提示できます。現地調査が必要な場合も、診断費用はかかりません。',
  },
  {
    q: '工事当日に追加費用が発生することはありますか',
    a: '基本的に事前のお見積もり金額内で工事を完了します。ただし、配管の状態や設置環境によって追加作業が必要になる場合は、作業開始前に必ずご説明し、ご同意いただいてから対応します。',
  },
  {
    q: '工事後の保証はありますか',
    a: 'はい、弊社が行った施工部分については工事保証をご提供しています。また、給湯器本体にはメーカー保証が付帯します。保証内容の詳細は保証・アフターページをご覧ください。',
  },
  {
    q: '施工実績はどのくらいありますか',
    a: '横浜市・川崎市・厚木市・海老名市を中心に、多数の給湯器交換工事を手がけてきました。具体的な件数は施工事例ページでご確認いただけます。マンション・一戸建て・集合住宅など幅広い設置環境に対応しています。',
  },
  {
    q: 'LINE・電話・フォームどれで問い合わせるのがいいですか',
    a: '写真を添付したい場合はLINEが便利です。お急ぎの場合はお電話が最も早く対応できます。時間帯を問わず問い合わせしたい場合は無料見積もりフォームをご利用ください。いずれの方法でも丁寧に対応いたします。',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const reasons = [
  {
    title: '写真・LINEで簡単見積もり',
    body: '現地に伺わなくても、給湯器の写真をLINEで送っていただくだけで概算金額をご提示します。まずは気軽にご相談ください。',
    icon: (
      <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
    ),
  },
  {
    title: '工事費込みの明確な価格',
    body: '給湯器本体代・標準工事費・処分費を含めた価格を事前にご提示します。追加費用が発生する場合は必ず事前にご説明し、ご了承いただいてから作業を開始します。',
    icon: (
      <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z" />
      </svg>
    ),
  },
  {
    title: '施工後の保証・アフター対応',
    body: '弊社が行った工事には工事保証をご提供します。施工後にご不明な点や不具合があれば、電話・LINEでお気軽にご連絡ください。工事品質に責任を持って対応します。',
    icon: (
      <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
]

const areaLinks = [
  { href: '/area/yokohama', label: '横浜市の給湯器交換' },
  { href: '/area/kawasaki', label: '川崎市の給湯器交換' },
  { href: '/area/atsugi', label: '厚木市の給湯器交換' },
  { href: '/area/ebina', label: '海老名市の給湯器交換' },
]

const companyProfile = [
  { label: '会社名', value: '株式会社宝宮設備' },
  { label: '代表者', value: '小宮龍亮' },
  { label: '所在地', value: '神奈川県厚木市温水西1-4-39' },
  { label: '電話番号', value: '046-205-4558' },
  { label: 'メールアドレス', value: 'homiya@houmiyasetubi.com' },
  { label: '営業時間', value: '9:00〜18:00（年中無休）' },
  { label: '事業内容', value: '給湯器の販売・取付・交換工事' },
  { label: '対応エリア', value: '横浜市・川崎市・厚木市・海老名市' },
]

export default function CompanyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main className="pt-[100px]">

        {/* ヒーロー */}
        <section className="bg-brand-900 text-white py-10">
          <div className="max-w-4xl mx-auto px-4">
            <Breadcrumb
              items={[
                { label: 'ホーム', href: '/' },
                { label: '会社紹介' },
              ]}
              className="bg-transparent border-none py-0 mb-4 [&_a]:text-blue-200 [&_a:hover]:text-white [&_span]:text-blue-100 [&_svg]:text-blue-400"
            />
            <h1 className="text-3xl font-black mb-2">株式会社宝宮設備について</h1>
            <p className="text-blue-100 text-sm leading-relaxed">
              横浜市・川崎市・厚木市・海老名市で給湯器交換を専門に行う設備工事会社です。
            </p>
          </div>
        </section>

        {/* 代表メッセージ */}
        <section className="py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-8">代表メッセージ</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 text-center md:text-left">
                <div className="w-20 h-20 bg-brand-900 text-white rounded-full flex items-center justify-center mx-auto md:mx-0 mb-3">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
                <p className="font-black text-gray-900 text-sm">小宮 龍亮</p>
                <p className="text-xs text-gray-500 mt-0.5">代表取締役</p>
              </div>
              <div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  弊社は神奈川県厚木市を拠点に、横浜市・川崎市・海老名市を含むエリアで給湯器の交換工事を行っています。
                  お客様にとって給湯器の故障は突然起こる困りごとです。だからこそ、迅速な対応と明確な価格提示を大切にしています。
                  写真一枚から概算をお伝えし、現地での丁寧な施工と工事後のアフター対応まで、一貫して責任をもって取り組んでいます。
                  地域の皆様の日常を守る仕事として、誠実に向き合い続けることが私たちの使命です。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 会社概要 */}
        <section className="py-14 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-8">会社概要</h2>
            <address className="not-italic">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {companyProfile.map((row, i) => (
                      <tr
                        key={row.label}
                        className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <th
                          scope="row"
                          className="w-32 sm:w-40 px-5 py-4 text-left font-bold text-gray-600 border-r border-gray-200 align-top whitespace-nowrap"
                        >
                          {row.label}
                        </th>
                        <td className="px-5 py-4 text-gray-800 leading-relaxed">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </address>
          </div>
        </section>

        {/* 選ばれる3つの理由 */}
        <section className="py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-2">私たちが選ばれる3つの理由</h2>
            <p className="text-gray-500 text-sm mb-8">お客様から寄せられるご評価をもとに整理しました。</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reasons.map((reason, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                    {reason.icon}
                  </div>
                  <p className="font-black text-gray-900 text-base mb-2">{reason.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{reason.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 対応エリア */}
        <section className="py-14 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-2">対応エリア</h2>
            <p className="text-gray-500 text-sm mb-8">
              神奈川県を中心に以下のエリアで給湯器交換工事を承っています。エリア外のご相談もお気軽にどうぞ。
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {areaLinks.map((area) => (
                <Link
                  key={area.href}
                  href={area.href}
                  className="bg-white border border-gray-200 hover:border-brand-700 hover:bg-brand-50 rounded-xl p-5 text-center transition-colors group"
                >
                  <svg
                    className="w-6 h-6 text-brand-700 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span className="text-sm font-bold text-gray-800 group-hover:text-brand-900 leading-tight block">
                    {area.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-2">よくある質問</h2>
            <p className="text-gray-500 text-sm mb-8">弊社についてよくいただくご質問をまとめました。</p>
            <FaqAccordion faqs={faqs} />
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-brand-900">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-black text-white mb-2">給湯器のご相談はお気軽に</h2>
            <p className="text-blue-200 text-sm mb-8">
              写真を送るだけで概算をお伝えします。電話・LINE・フォームからご連絡ください。受付時間: {siteConfig.hours}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-lg px-8 py-3 rounded-lg transition-colors"
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
                className="flex items-center justify-center gap-2 text-white font-bold text-sm px-8 py-3 rounded-lg transition-colors"
                style={{ backgroundColor: '#00B900' }}
              >
                LINEで無料相談
              </a>
              <Link
                href="/estimate"
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-8 py-3 rounded-lg transition-colors"
              >
                無料見積もりフォームへ
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}
