// Centralized image management for easy real-photo replacement.
// Current URLs: Unsplash (commercial use OK, free license).
// To replace with local files, update path to /images/filename.jpg

export type SiteImage = {
  src: string
  alt: string
  width: number
  height: number
}

// Hero section
export const heroImages = {
  boilerUnit: {
    src: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=900&q=80',
    alt: '給湯器交換工事 専門スタッフによる施工',
    width: 900,
    height: 600,
  } as SiteImage,
}

// Staff / technician photos
export const staffImages = {
  technician1: {
    src: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&q=80',
    alt: '給湯器交換専門スタッフ 自社施工対応',
    width: 400,
    height: 500,
  } as SiteImage,
  technician2: {
    src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80',
    alt: '給湯器工事スタッフ 横浜市対応',
    width: 400,
    height: 500,
  } as SiteImage,
  representative: {
    src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    alt: '株式会社宝宮設備 代表 小宮龍亮',
    width: 400,
    height: 500,
  } as SiteImage,
}

// Work / installation photos
export const workImages = {
  installation: {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
    alt: '給湯器交換工事 設置作業中',
    width: 700,
    height: 500,
  } as SiteImage,
  tools: {
    src: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=700&q=80',
    alt: '給湯器工事 専門工具 自社施工',
    width: 700,
    height: 500,
  } as SiteImage,
  outdoorBoiler: {
    src: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=700&q=80',
    alt: '戸建て外壁設置給湯器 交換工事',
    width: 700,
    height: 500,
  } as SiteImage,
  boilerClose: {
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80',
    alt: '給湯器本体 リンナイ ノーリツ パロマ対応',
    width: 700,
    height: 500,
  } as SiteImage,
}

// Room / home photos
export const roomImages = {
  bathroom: {
    src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
    alt: '浴室 給湯器交換後 快適なお湯',
    width: 600,
    height: 400,
  } as SiteImage,
  kitchen: {
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    alt: 'キッチン 給湯器交換 お湯 快適',
    width: 600,
    height: 400,
  } as SiteImage,
  remote: {
    src: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80',
    alt: '給湯器リモコン 操作パネル',
    width: 400,
    height: 300,
  } as SiteImage,
}

// Case /施工事例 photos
export const caseImages: SiteImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
    alt: '横浜市戸塚区 戸建て給湯器交換施工事例',
    width: 600,
    height: 400,
  },
  {
    src: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&q=80',
    alt: '川崎市中原区 マンション給湯器交換施工事例',
    width: 600,
    height: 400,
  },
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    alt: '厚木市 戸建て エコジョーズ給湯器交換施工事例',
    width: 600,
    height: 400,
  },
  {
    src: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&q=80',
    alt: '海老名市 アパート給湯器交換施工事例',
    width: 600,
    height: 400,
  },
  {
    src: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80',
    alt: '横浜市港北区 戸建て給湯器交換施工事例',
    width: 600,
    height: 400,
  },
  {
    src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
    alt: '川崎市高津区 マンション エコジョーズ交換施工事例',
    width: 600,
    height: 400,
  },
]

// Reasons section photos (選ばれる理由)
export const reasonImages: SiteImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&q=80',
    alt: '自社施工 専門スタッフ 給湯器交換',
    width: 500,
    height: 350,
  },
  {
    src: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500&q=80',
    alt: '給湯器工事 専門工具 丁寧な施工',
    width: 500,
    height: 350,
  },
  {
    src: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80',
    alt: '給湯器交換 最短即日対応 横浜市',
    width: 500,
    height: 350,
  },
]
