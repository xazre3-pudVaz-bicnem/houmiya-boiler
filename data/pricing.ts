export type PriceItem = {
  type: string
  description: string
  price: string
  note?: string
  highlight?: boolean
}

export const pricingData: PriceItem[] = [
  {
    type: '給湯専用タイプ（20号）',
    description: 'ガス給湯専用機。お風呂の追い焚きなし。',
    price: '90,000円〜',
    note: '本体＋標準工事費込み',
  },
  {
    type: '給湯専用タイプ（24号）',
    description: '大家族向け。大流量対応。',
    price: '100,000円〜',
    note: '本体＋標準工事費込み',
  },
  {
    type: 'オートタイプ（20号）',
    description: '自動湯はり機能付き。追い焚きあり。',
    price: '130,000円〜',
    note: '本体＋標準工事費込み',
    highlight: true,
  },
  {
    type: 'フルオートタイプ（20号）',
    description: '自動湯はり＋自動追い焚き＋足し湯機能。',
    price: '150,000円〜',
    note: '本体＋標準工事費込み',
    highlight: true,
  },
  {
    type: 'エコジョーズ（オート・20号）',
    description: '高効率省エネタイプ。光熱費節約。',
    price: '160,000円〜',
    note: '本体＋標準工事費込み（ドレン配管別途の場合あり）',
  },
  {
    type: 'エコジョーズ（フルオート・20号）',
    description: '最高効率。フルオート機能付きエコジョーズ。',
    price: '180,000円〜',
    note: '本体＋標準工事費込み（ドレン配管別途の場合あり）',
  },
  {
    type: 'マンションPS設置タイプ',
    description: 'パイプスペース内設置対応。機種・状況により異なります。',
    price: '現地確認後お見積もり',
    note: '設置状況により大きく変動します',
  },
  {
    type: '撤去・処分費',
    description: '既存給湯器の撤去および廃棄処分。',
    price: '標準工事費に含む',
    note: '特殊撤去は別途ご相談',
  },
]

export const pricingNote = `上記は概算金額です。設置状況・配管状況・号数・メーカー・在庫状況により実際の金額は変動します。
正式な金額は現地確認または設置状況の写真確認後にご案内いたします。
まずはお気軽にお問い合わせください。`
