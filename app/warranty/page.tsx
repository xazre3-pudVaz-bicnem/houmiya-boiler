import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: '給湯器交換の保証・アフターサポート｜横浜・川崎・厚木・海老名｜宝宮設備',
  description:
    '株式会社宝宮設備の給湯器交換保証について。メーカー保証（1〜2年）・工事保証（1年）・アフターサポートの詳細をご案内。保証を受ける流れ・よくある質問も掲載。横浜市・川崎市・厚木市・海老名市対応。',
  openGraph: {
    title: '給湯器交換の保証・アフターサポート｜宝宮設備',
    description: '株式会社宝宮設備の給湯器交換保証について。メーカー保証・工事保証・アフターサポートの詳細をご案内。',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: 'https://www.houmiya-boiler.com/warranty' },
}

const faqs = [
  {
    q: 'メーカー保証と工事保証の違いは何ですか？',
    a: 'メーカー保証は給湯器本体の製造不良や初期不良に対してメーカーが対応するものです（通常1〜2年）。工事保証は弊社が行った配管接続・リモコン取付などの施工に起因する不具合に対して弊社が対応するものです（1年）。それぞれ保証の対象と窓口が異なります。',
  },
  {
    q: '保証期間内に給湯器が故障した場合はどうすればいいですか？',
    a: 'まず弊社までお電話またはLINEにてご連絡ください。症状の内容・エラーコードをお知らせいただくと、メーカー保証・工事保証のどちらが適用されるかを確認のうえ、迅速に対応いたします。',
  },
  {
    q: '保証書が手元にない場合でも対応してもらえますか？',
    a: '弊社での施工記録をもとに対応可能な場合がございます。施工日・設置場所・機種名などをお伝えいただければ確認いたしますので、まずはお気軽にご連絡ください。',
  },
  {
    q: '給湯器をメーカーに登録する必要がありますか？',
    a: 'メーカーによっては製品登録を行うことで保証期間の延長や手続きがスムーズになる場合があります。施工完了時にお渡しする保証書・取扱説明書に登録方法が記載されていますので、ご確認ください。',
  },
  {
    q: '保証が切れた後でも修理は対応してもらえますか？',
    a: 'はい、保証期間終了後も有償にて修理・メンテナンスに対応いたします。部品の在庫状況やお見積もり内容によっては、修理よりも交換をご提案する場合もございますのでご相談ください。',
  },
  {
    q: '10年以上使用している給湯器でも保証は受けられますか？',
    a: '10年以上経過した機器は、メーカーの部品供給が終了している場合があり、修理対応が難しいケースがございます。また工事保証は施工から1年間が対象です。状況を確認のうえご案内しますので、まずはご連絡ください。',
  },
  {
    q: '賃貸マンションでも工事保証は受けられますか？',
    a: '賃貸物件でも弊社が施工を行った場合は工事保証の対象となります。ただし、給湯器の所有者（管理会社・オーナー）によって対応が異なる場合がありますので、事前にご確認ください。',
  },
  {
    q: 'マンションの管理会社が対応すべき場合とはどのような時ですか？',
    a: '賃貸マンションの場合、給湯器の所有者が管理会社・オーナーであることが多く、故障時の修理・交換対応は管理会社が窓口となるケースがほとんどです。契約内容をご確認のうえ、管理会社へご連絡されることをおすすめします。',
  },
  {
    q: '同じ症状が何度も繰り返す場合はどうすればいいですか？',
    a: '繰り返し発生するトラブルは、機器本体の劣化や部品不良が原因の場合があります。弊社では現地確認のうえ原因を特定し、修理・交換のご提案をいたします。保証期間内であれば無償で対応いたします。',
  },
  {
    q: '保証対象外となった場合の修理費用の目安を教えてください。',
    a: '修理費用は故障箇所・部品代・作業時間によって異なります。出張診断後にお見積もりをご提示しますので、ご納得いただいてから作業を開始いたします。お見積もりは無料ですのでお気軽にご相談ください。',
  },
]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://houmiya-boiler.com' },
    { '@type': 'ListItem', position: 2, name: '保証・アフター対応', item: 'https://houmiya-boiler.com/warranty' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function WarrantyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
            <div className="flex items-center gap-3 mb-4 text-sm">
              <Link href="/" className="text-blue-200 hover:text-white">トップ</Link>
              <span className="text-blue-400">›</span>
              <span>保証・アフター対応</span>
            </div>
            <h1 className="text-3xl font-black mb-2">保証・アフターサポートについて</h1>
            <p className="text-blue-100 text-sm">{siteConfig.warrantyNote}</p>
          </div>
        </section>

        {/* 保証概要カード */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white border border-blue-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <p className="text-xs text-blue-600 font-bold mb-1">メーカー保証</p>
                <p className="font-black text-gray-900 text-2xl mb-2">1〜2年</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  各メーカーの標準保証が付属。部品の製造不良・初期不良にメーカーが対応します。
                </p>
              </div>
              <div className="bg-white border border-green-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                  </svg>
                </div>
                <p className="text-xs text-green-600 font-bold mb-1">工事保証</p>
                <p className="font-black text-gray-900 text-2xl mb-2">1年</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  弊社施工部分（配管接続・リモコン取付など）の不具合は弊社が責任をもって対応します。
                </p>
              </div>
              <div className="bg-white border border-yellow-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <p className="text-xs text-yellow-600 font-bold mb-1">アフターサポート</p>
                <p className="font-black text-gray-900 text-2xl mb-2">年中無休</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  施工後のご相談も電話・LINEで承ります。エラーコードや使い方のご相談も対応します。
                </p>
              </div>
            </div>

            {/* メーカー保証の詳細 */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
              <div className="bg-blue-50 border-b border-blue-100 p-5">
                <h2 className="font-black text-gray-900 text-lg">メーカー保証（1〜2年）</h2>
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs font-black text-gray-500 mb-2">リンナイ</p>
                    <p className="text-sm text-gray-700">本体保証 <span className="font-black text-gray-900">1年</span></p>
                    <p className="text-xs text-gray-500 mt-1">製造不良・初期不良に対応</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs font-black text-gray-500 mb-2">ノーリツ</p>
                    <p className="text-sm text-gray-700">本体保証 <span className="font-black text-gray-900">1〜2年</span></p>
                    <p className="text-xs text-gray-500 mt-1">機種により保証期間が異なります</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs font-black text-gray-500 mb-2">パロマ</p>
                    <p className="text-sm text-gray-700">本体保証 <span className="font-black text-gray-900">1年</span></p>
                    <p className="text-xs text-gray-500 mt-1">製造不良・初期不良に対応</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-2">保証対象</p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>給湯器本体の製造不良・初期不良</li>
                    <li>通常使用における部品の不具合</li>
                    <li>リモコン・付属品の初期不良</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                  <p className="text-sm font-bold text-red-700 mb-2">メーカー保証の対象外</p>
                  <ul className="text-sm text-red-600 space-y-1 list-disc list-inside">
                    <li>凍結・水漏れによる損傷</li>
                    <li>消耗品（フィルター・パッキン等）の交換</li>
                    <li>誤った操作・取り扱いによる故障</li>
                    <li>自然災害（地震・落雷等）による損傷</li>
                    <li>お客様または弊社以外の業者による改造・修理</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 工事保証の詳細 */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
              <div className="bg-green-50 border-b border-green-100 p-5">
                <h2 className="font-black text-gray-900 text-lg">当社の工事保証（1年）</h2>
              </div>
              <div className="p-6 space-y-5">
                <p className="text-sm text-gray-600 leading-relaxed">
                  弊社が行った施工（配管接続・リモコン取付・給水管接続など）に起因する不具合については、
                  施工から1年間、弊社が責任をもって無償対応いたします。
                </p>
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-2">工事保証の対象</p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>弊社施工による配管接続部分からの水漏れ</li>
                    <li>リモコン取付・配線に起因する動作不良</li>
                    <li>給水・給湯管接続部分の不具合</li>
                    <li>ガス接続部分の施工起因による不具合</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                  <p className="text-sm font-bold text-red-700 mb-2">工事保証の対象外</p>
                  <ul className="text-sm text-red-600 space-y-1 list-disc list-inside">
                    <li>給湯器本体の自然故障（メーカー対応）</li>
                    <li>お客様の使い方による不具合</li>
                    <li>経年劣化によるもの</li>
                    <li>弊社以外の業者が施工・修理を行った箇所</li>
                    <li>自然災害による損傷</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                  <p className="text-sm font-bold text-green-700 mb-2">保証を受けるための条件</p>
                  <ul className="text-sm text-green-700 space-y-1 list-disc list-inside">
                    <li>取扱説明書に従った適切な使用</li>
                    <li>定期的なフィルター清掃などのメンテナンス</li>
                    <li>弊社以外の業者による改造・修理を行っていないこと</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 保証を受ける流れ */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
              <div className="bg-brand-50 border-b border-brand-100 p-5">
                <h2 className="font-black text-gray-900 text-lg">保証を受けるための流れ</h2>
              </div>
              <div className="p-6">
                <ol className="space-y-4">
                  {[
                    {
                      step: '1',
                      title: '症状の確認',
                      desc: 'エラーコード・症状の詳細（いつから・どのような症状か）をご確認ください。',
                    },
                    {
                      step: '2',
                      title: 'お電話またはLINEでご連絡',
                      desc: '弊社までお電話またはLINEにてご連絡ください。症状をお伝えいただくとスムーズです。',
                    },
                    {
                      step: '3',
                      title: '訪問日の調整',
                      desc: 'ご都合に合わせて訪問日時を調整いたします。',
                    },
                    {
                      step: '4',
                      title: '現地確認・修理対応',
                      desc: '担当スタッフが現地を確認し、保証対象かどうかを判断のうえ対応いたします。',
                    },
                    {
                      step: '5',
                      title: '保証対象の場合は無償対応',
                      desc: '工事保証・メーカー保証の対象と確認できた場合は無償にて修理対応いたします。',
                    },
                  ].map((item) => (
                    <li key={item.step} className="flex gap-4">
                      <span className="w-8 h-8 bg-brand-900 text-white text-sm font-black flex items-center justify-center rounded-full flex-shrink-0">
                        {item.step}
                      </span>
                      <div>
                        <p className="font-black text-gray-900 text-sm">{item.title}</p>
                        <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* 保証対象外ケース */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
              <h3 className="font-black text-gray-900 mb-4">保証対象外となる主なケース</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'お客様による誤った操作・取り扱いによる故障',
                  '自然災害（地震・洪水・落雷など）による損傷',
                  'お客様による改造・修理による故障',
                  '経年劣化によるものと認められる場合',
                  '消耗品（フィルター・パッキン等）の交換',
                  '弊社以外の業者が施工・修理した場合',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-red-700">
                    <span className="text-red-500 mt-0.5">×</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-8">
              <h2 className="font-black text-gray-900 text-xl mb-6">保証に関するよくある質問</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="p-5">
                      <p className="font-black text-gray-900 text-sm flex items-start gap-3">
                        <span className="text-brand-600 font-black text-base flex-shrink-0">Q</span>
                        {faq.q}
                      </p>
                    </div>
                    <div className="bg-gray-50 border-t border-gray-100 p-5">
                      <p className="text-sm text-gray-600 leading-relaxed flex items-start gap-3">
                        <span className="text-green-600 font-black text-base flex-shrink-0">A</span>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 下部CTA */}
            <div className="bg-brand-900 rounded-2xl p-8 text-center text-white">
              <h2 className="font-black text-xl mb-2">保証に関するご不明点はお気軽にご相談ください</h2>
              <p className="text-blue-200 text-sm mb-6">
                お電話・LINE・フォームにてご連絡ください。担当スタッフが丁寧にご対応いたします。
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
                  LINEで相談する
                </a>
                <Link
                  href="/estimate"
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-8 py-3 rounded-lg transition-colors"
                >
                  無料見積もりフォームへ
                </Link>
              </div>
              <div className="text-blue-300 text-xs mt-4">受付時間: {siteConfig.hours}</div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}
