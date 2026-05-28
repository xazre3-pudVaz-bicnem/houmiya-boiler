export type NewsItem = {
  id: number
  category: string
  categoryColor: string
  date: string
  title: string
  excerpt: string
  href: string
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    category: 'コラム',
    categoryColor: 'bg-sky/10 text-sky-dark border-sky/20',
    date: '2025年5月',
    title: '給湯器の寿命は何年？交換時期の目安と早めに交換すべきサイン',
    excerpt: '給湯器の一般的な寿命は10〜15年程度です。10年を超えたら修理部品が終了するケースもあり、早めの交換検討がおすすめです。本記事では交換のサインを詳しく解説します。',
    href: '/blog',
  },
  {
    id: 2,
    category: 'コラム',
    categoryColor: 'bg-sky/10 text-sky-dark border-sky/20',
    date: '2025年4月',
    title: 'お湯が出ない時に最初に確認すべき5つのポイント',
    excerpt: 'お湯が急に出なくなると慌ててしまいますが、まず確認すべきことがあります。ガスの元栓、エラーコード、水栓の確認など、プロが教える初期チェックリストをご紹介します。',
    href: '/blog',
  },
  {
    id: 3,
    category: 'コラム',
    categoryColor: 'bg-sky/10 text-sky-dark border-sky/20',
    date: '2025年3月',
    title: 'エコジョーズに交換するメリット・デメリットを正直に解説',
    excerpt: '省エネ性能が高いエコジョーズ。ランニングコストの節約や環境負荷の低減がメリットですが、設置条件やコストも正直にご説明します。ご自宅に合うかどうかの判断材料にしてください。',
    href: '/blog',
  },
  {
    id: 4,
    category: 'コラム',
    categoryColor: 'bg-sky/10 text-sky-dark border-sky/20',
    date: '2025年2月',
    title: '横浜市・川崎市で給湯器交換業者を選ぶ際の5つのポイント',
    excerpt: '給湯器交換業者を選ぶ際は「自社施工かどうか」「価格の透明性」「アフターフォロー」など確認すべき点があります。悪質な業者を避けるためのチェックリストをまとめました。',
    href: '/blog',
  },
]
