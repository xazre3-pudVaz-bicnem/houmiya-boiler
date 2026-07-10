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
  metadataBase: new URL('https://www.houmiya-boiler.com'),
  openGraph: {
    title: '横浜市の給湯器交換・販売なら株式会社宝宮設備｜川崎・厚木・海老名対応',
    description:
      '横浜市・川崎市・厚木市・海老名市で給湯器交換・販売なら株式会社宝宮設備へ。給湯器の故障、交換、撤去まで自社施工で迅速対応。最短即日対応、適正価格。',
    url: 'https://www.houmiya-boiler.com',
    siteName: '宝宮設備 給湯器交換専門サイト',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
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
    canonical: 'https://www.houmiya-boiler.com',
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
  '@id': 'https://www.houmiya-boiler.com/#business',
  name: '株式会社宝宮設備',
  alternateName: '宝宮設備 給湯器交換専門',
  description:
    '横浜市・川崎市・厚木市・海老名市で給湯器交換・販売・撤去を行う専門業者。自社施工で最短即日対応。リンナイ・ノーリツ・パロマ対応。',
  url: 'https://www.houmiya-boiler.com',
  logo: 'https://www.houmiya-boiler.com/logo.png',
  image: 'https://www.houmiya-boiler.com/logo.png',
  telephone: '+81-46-205-4558',
  email: 'homiya@houmiyasetubi.com',
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
  sameAs: [
    'https://line.me/R/ti/p/@432ridrn',
    'https://www.instagram.com/houmiya.co.jp',
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.houmiya-boiler.com/#service',
  name: '給湯器交換・販売サービス',
  provider: {
    '@id': 'https://www.houmiya-boiler.com/#business',
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
        {/* 構造化データ（会社情報・サービス）。FAQ構造化データは各ページの可視FAQと一致させるため
            全ページ共通ではなく、FAQを表示する各ページ側で個別に出力する。 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
