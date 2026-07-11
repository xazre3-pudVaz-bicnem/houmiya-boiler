import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '給湯器の工事費込み価格一覧｜リンナイ・ノーリツ・パロマ｜宝宮設備',
  description:
    '宝宮設備の給湯器工事費込み価格一覧。リンナイ・ノーリツ・パロマの主要機種を掲載。16号・20号・24号、オート・フルオート、号数別に比較できます。横浜市・川崎市・厚木市・海老名市対応。',
  alternates: { canonical: 'https://www.houmiya-boiler.com/products' },
  openGraph: {
    title: '給湯器の工事費込み価格一覧｜宝宮設備',
    description: '給湯器工事費込み価格一覧。リンナイ・ノーリツ・パロマ対応。',
    url: 'https://www.houmiya-boiler.com/products',
    siteName: '宝宮設備 給湯器交換専門サイト',
    locale: 'ja_JP',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '給湯器の工事費込み価格一覧' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.png'] },
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children
}
