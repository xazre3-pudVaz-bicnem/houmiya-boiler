import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-noto',
})

export const metadata: Metadata = {
  title: '横浜市の給湯器交換・販売なら株式会社宝宮設備｜川崎・厚木・海老名対応',
  description:
    '横浜市・川崎市・厚木市・海老名市で給湯器交換・販売なら株式会社宝宮設備。リンナイ・ノーリツ・パロマなど主要メーカー対応。給湯器の故障、交換、撤去まで自社施工で迅速対応。見積もり相談無料。',
  keywords: [
    '横浜 給湯器交換',
    '横浜市 給湯器交換',
    '川崎 給湯器交換',
    '厚木 給湯器交換',
    '海老名 給湯器交換',
    '給湯器交換 即日',
    '給湯器販売 神奈川',
    '給湯器 故障 交換',
    'リンナイ 給湯器交換',
    'ノーリツ 給湯器交換',
    'パロマ 給湯器交換',
    '神奈川 給湯器交換',
    '給湯器交換 横浜市',
    '宝宮設備',
  ],
  metadataBase: new URL('https://houmiya-boiler.com'),
  openGraph: {
    title: '横浜市の給湯器交換・販売なら株式会社宝宮設備｜川崎・厚木・海老名対応',
    description:
      '横浜市・川崎市・厚木市・海老名市で給湯器交換・販売なら株式会社宝宮設備へ。給湯器の故障、交換、撤去まで自社施工で迅速対応。最短即日対応、適正価格。',
    url: 'https://houmiya-boiler.com',
    siteName: '宝宮設備 給湯器交換専門サイト',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: '横浜市の給湯器交換なら宝宮設備',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '横浜市の給湯器交換・販売なら株式会社宝宮設備',
    description:
      '横浜市・川崎市・厚木市・海老名市で給湯器交換・販売なら株式会社宝宮設備へ。最短即日対応。自社施工。',
  },
  alternates: {
    canonical: 'https://houmiya-boiler.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://houmiya-boiler.com/#business',
  name: '株式会社宝宮設備',
  alternateName: '宝宮設備 給湯器交換専門',
  description:
    '横浜市・川崎市・厚木市・海老名市で給湯器交換・販売・撤去を行う専門業者。自社施工で最短即日対応。リンナイ・ノーリツ・パロマ対応。',
  url: 'https://houmiya-boiler.com',
  telephone: '+81-46-205-4558',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '温水西1-4-39',
    addressLocality: '厚木市',
    addressRegion: '神奈川県',
    postalCode: '243-0032',
    addressCountry: 'JP',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  areaServed: [
    { '@type': 'City', name: '横浜市', addressRegion: '神奈川県' },
    { '@type': 'City', name: '川崎市', addressRegion: '神奈川県' },
    { '@type': 'City', name: '厚木市', addressRegion: '神奈川県' },
    { '@type': 'City', name: '海老名市', addressRegion: '神奈川県' },
  ],
  priceRange: '¥¥',
  currenciesAccepted: 'JPY',
  paymentAccepted: '現金,銀行振込',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '給湯器交換・販売サービス',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '給湯器交換工事',
          description: '既存給湯器の撤去と新しい給湯器の設置工事',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '給湯器販売',
          description: 'リンナイ・ノーリツ・パロマなど主要メーカーの給湯器販売',
        },
      },
    ],
  },
  sameAs: [],
}

const faqSchemaData = [
  {
    question: '給湯器交換は最短いつ対応できますか？',
    answer: '在庫状況や現場の状況によりますが、最短即日対応が可能な場合もあります。特に冬場は繁忙期となるため、お湯が出ない・故障が発生した際はまずお電話またはLINEでご相談ください。できる限り迅速に対応いたします。',
  },
  {
    question: '工事時間はどれくらいかかりますか？',
    answer: '標準的な給湯器交換工事であれば、2〜4時間程度が目安です。ただし、配管の延長が必要な場合や設置状況が複雑な場合はそれ以上かかることもあります。作業前にあらかじめご説明いたします。',
  },
  {
    question: 'マンションやアパートの給湯器交換もできますか？',
    answer: 'はい、マンション・アパート・戸建てすべてに対応しています。マンションのPS（パイプスペース）設置タイプや、天井埋め込みタイプなど、さまざまな設置状況に対応できますのでまずはご相談ください。',
  },
  {
    question: '古い給湯器の撤去・処分もお願いできますか？',
    answer: 'はい、既存給湯器の撤去・処分も対応しております。標準工事費に含まれる場合がほとんどですが、設置状況によっては別途費用が発生するケースもございます。事前にお伝えします。',
  },
  {
    question: '工事中はガス・お湯が使えなくなりますか？',
    answer: '給湯器交換の工事中は、ガスとお湯がご利用いただけない状態になります。工事時間は通常2〜4時間程度ですので、お時間を合わせてお伺いします。工事後は当日中にご使用いただけます。',
  },
  {
    question: '平日以外の土日・祝日にも対応できますか？',
    answer: '当社は年中無休・9:00〜18:00で対応しております。土曜・日曜・祝日もご相談いただけます。時間外のご相談はLINEまたはメールからお問い合わせください。',
  },
  {
    question: '見積もりだけでも依頼できますか？',
    answer: 'はい、見積もりのみのご相談も承っております。給湯器の全体写真・型番ラベル・設置場所の写真をお送りいただけると、よりスムーズにご案内できます。',
  },
  {
    question: '追加費用が発生することはありますか？',
    answer: '配管の延長が必要な場合、高所作業が伴う場合、特殊な設置環境の場合などは追加費用が発生することがあります。見積もり時に現地状況を確認し、追加費用が見込まれる場合は必ず事前にご説明します。',
  },
  {
    question: '支払い方法はどのようなものがありますか？',
    answer: '現金払いおよび銀行振込に対応しております。工事完了後のお支払いになりますので、工事前にお支払いを求めることはございません。詳細はお問い合わせ時にご確認ください。',
  },
  {
    question: '号数（サイズ）を変更することはできますか？',
    answer: '現場のガス容量や設置スペースによって変更が可能な場合があります。家族構成の変化などで号数の変更を検討されている場合もご相談ください。現地確認のうえ最適な機種をご提案します。',
  },
  {
    question: 'どのメーカーの給湯器に対応していますか？',
    answer: 'リンナイ、ノーリツ、パロマなど国内主要メーカーに対応しています。現在お使いのメーカーを継続することも、他のメーカーへ変更することもご相談いただけます。',
  },
  {
    question: 'エコジョーズへの交換はできますか？',
    answer: 'はい、エコジョーズへの交換も対応しています。エコジョーズは従来型よりも省エネで光熱費の節約が期待できます。ただし、ドレン排水配管の設置が必要になる場合があるため、設置環境を確認してからご提案いたします。',
  },
  {
    question: 'フルオートとオートタイプ、どちらがおすすめですか？',
    answer: 'フルオートタイプは湯はり・追い焚き・保温がすべて自動で行われ、利便性が高い分、価格もやや高めです。オートタイプは湯はりと追い焚きは自動ですが、保温機能がありません。ご家族の生活スタイルや予算に合わせてご提案します。',
  },
  {
    question: 'マンションPS設置タイプとはどのようなものですか？',
    answer: 'マンションのPS（パイプスペース）設置タイプとは、廊下や玄関脇のパイプスペース内に設置するタイプです。屋外壁掛けタイプとは仕様・設置方法が異なるため、現状の設置タイプに合った機種での交換が基本となります。',
  },
  {
    question: 'お湯が出なくなりました。すぐに交換が必要ですか？',
    answer: 'お湯が出ない原因はさまざまです。給湯器のエラーコードを確認のうえ、まずはお問い合わせください。修理で対応できる場合と交換が必要な場合があり、状況を確認してから最適な方法をご提案します。',
  },
  {
    question: '給湯器のエラーコードが表示されています。交換が必要ですか？',
    answer: 'エラーコードの種類によっては部品交換や修理で対応できる場合もあります。ただし、製造から10年以上経過している機器は、修理より交換の方がコスト面・安全面で優れることが多いです。エラーコードをお知らせいただければ適切な対応をご案内します。',
  },
  {
    question: '給湯器から異音がしているのですが、すぐに交換が必要ですか？',
    answer: '異音の種類によって原因はさまざまです。「バン」「ドン」などの爆発音や異常に大きな音がする場合はすぐにご連絡ください。安全のため、まずは使用を止めてお問い合わせいただくことをおすすめします。',
  },
  {
    question: '給湯器の寿命はどれくらいですか？',
    answer: '一般的に給湯器の寿命は10〜15年程度とされています。10年を超えた給湯器は、故障が増えたり修理部品が手に入らなくなるケースもあります。頻繁に故障するようになった場合は、交換をご検討いただくことをおすすめします。',
  },
  {
    question: '工事後の保証はありますか？',
    answer: '給湯器本体にはメーカー保証（通常1〜2年）が付きます。工事部分についても保証を設けており、施工後に万が一不具合が発生した場合はご連絡ください。保証内容は機種・メーカー・施工内容により異なりますのでご確認ください。',
  },
  {
    question: '工事後に何か不具合があった場合はどうすればよいですか？',
    answer: '工事後に気になることが発生した場合は、お電話またはLINEにてご連絡ください。施工内容に起因する不具合については、迅速に対応いたします。',
  },
  {
    question: '横浜市・川崎市以外でも対応できますか？',
    answer: 'はい。メインの対応エリアは横浜市・川崎市・厚木市・海老名市ですが、それ以外のエリアについても状況によって対応できる場合がございます。まずはお気軽にご相談ください。',
  },
  {
    question: 'LINEでの相談はどのように使えますか？',
    answer: 'LINEでは、給湯器の写真を送っていただいての概算見積もりや、現在の症状のご相談などを承っています。文字でのやり取りが難しい方でも、写真を撮って送るだけで簡単にご相談いただけます。24時間受け付けています。',
  },
]

const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqSchemaData.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://houmiya-boiler.com/#service',
  name: '給湯器交換・販売サービス',
  provider: {
    '@id': 'https://houmiya-boiler.com/#business',
  },
  description:
    '横浜市・川崎市・厚木市・海老名市での給湯器交換・販売・撤去工事。リンナイ・ノーリツ・パロマ対応。戸建・マンション・アパート対応。',
  areaServed: [
    { '@type': 'City', name: '横浜市' },
    { '@type': 'City', name: '川崎市' },
    { '@type': 'City', name: '厚木市' },
    { '@type': 'City', name: '海老名市' },
  ],
  serviceType: '給湯器交換工事',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </head>
      <body className={notoSansJP.variable}>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}
