export type ProductItem = {
  id: number
  maker: string
  makerColor: string
  modelSeries: string
  modelType: string
  installType: string
  gosu: number
  features: string[]
  imageSrc: string
  imageAlt: string
  listPrice: string
  ourPrice: string
  warranty: string
  popular?: boolean
  recommended?: boolean
  priceNote?: string
}

export const productsData: ProductItem[] = [
  {
    id: 1,
    maker: 'リンナイ',
    makerColor: '#E60012',
    modelSeries: 'RUF-A2405SAW',
    modelType: 'フルオート',
    installType: '壁掛屋外型',
    gosu: 24,
    features: ['フルオート', '自動湯はり', '自動保温', '自動追い焚き'],
    imageSrc: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&q=80',
    imageAlt: 'リンナイ フルオートタイプ 24号 給湯器',
    listPrice: '¥248,000',
    ourPrice: '¥158,000〜',
    warranty: 'メーカー保証1年（延長保証別途）',
    popular: true,
    priceNote: '本体＋標準工事費込み',
  },
  {
    id: 2,
    maker: 'リンナイ',
    makerColor: '#E60012',
    modelSeries: 'RUF-A2405AW',
    modelType: 'オート',
    installType: '壁掛屋外型',
    gosu: 24,
    features: ['オートタイプ', '自動湯はり', '自動追い焚き'],
    imageSrc: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&q=80',
    imageAlt: 'リンナイ オートタイプ 24号 給湯器',
    listPrice: '¥218,000',
    ourPrice: '¥138,000〜',
    warranty: 'メーカー保証1年（延長保証別途）',
    priceNote: '本体＋標準工事費込み',
  },
  {
    id: 3,
    maker: 'リンナイ',
    makerColor: '#E60012',
    modelSeries: 'RUX-A2416W',
    modelType: '給湯専用',
    installType: '壁掛屋外型',
    gosu: 24,
    features: ['給湯専用', 'シンプル操作', 'リーズナブル'],
    imageSrc: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&q=80',
    imageAlt: 'リンナイ 給湯専用タイプ 24号 給湯器',
    listPrice: '¥132,000',
    ourPrice: '¥88,000〜',
    warranty: 'メーカー保証1年（延長保証別途）',
    priceNote: '本体＋標準工事費込み',
  },
  {
    id: 4,
    maker: 'ノーリツ',
    makerColor: '#003087',
    modelSeries: 'GT-C2462SAWX',
    modelType: 'フルオート',
    installType: '壁掛屋外型',
    gosu: 24,
    features: ['フルオート', '自動湯はり', '自動保温', '節湯機能'],
    imageSrc: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80',
    imageAlt: 'ノーリツ フルオートタイプ 24号 給湯器',
    listPrice: '¥242,000',
    ourPrice: '¥155,000〜',
    warranty: 'メーカー保証1年（延長保証別途）',
    priceNote: '本体＋標準工事費込み',
  },
  {
    id: 5,
    maker: 'ノーリツ',
    makerColor: '#003087',
    modelSeries: 'GT-C2462SAWX-2 BL',
    modelType: 'エコジョーズ フルオート',
    installType: '壁掛屋外型',
    gosu: 24,
    features: ['エコジョーズ', '熱効率95%', '省エネ', 'フルオート'],
    imageSrc: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80',
    imageAlt: 'ノーリツ エコジョーズ フルオートタイプ 24号',
    listPrice: '¥278,000',
    ourPrice: '¥175,000〜',
    warranty: 'メーカー保証1年（延長保証別途）',
    recommended: true,
    priceNote: '本体＋標準工事費込み',
  },
  {
    id: 6,
    maker: 'パロマ',
    makerColor: '#1A5276',
    modelSeries: 'FH-2022SAWL',
    modelType: '給湯専用',
    installType: '壁掛屋外型',
    gosu: 20,
    features: ['給湯専用', 'シンプル設計', '1〜2人世帯向け'],
    imageSrc: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=300&q=80',
    imageAlt: 'パロマ 給湯専用タイプ 20号 給湯器',
    listPrice: '¥118,000',
    ourPrice: '¥82,000〜',
    warranty: 'メーカー保証1年（延長保証別途）',
    priceNote: '本体＋標準工事費込み',
  },
]

export const productsPriceNote =
  '記載価格はすべて税込み・標準工事費込みの目安価格です。設置状況・配管状況・在庫状況・号数・リモコン交換の有無により金額は変動します。正式な金額は写真確認または現地確認後にご案内いたします。'
