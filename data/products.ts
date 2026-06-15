export type InstallationType =
  | 'wall-mounted'      // 壁掛型
  | 'floor-mounted'     // 据置型
  | 'ps-standard'       // PS標準設置型
  | 'ps-door'           // PS扉内設置型
  | 'ps-door-top'       // PS扉内上方排気型
  | 'balcony'           // ベランダ壁掛型
  | 'balanced-flue'     // BF式

export type ProductCategory =
  | 'gas-furo'          // ガスふろ給湯器
  | 'gas-kyuto'         // 給湯専用
  | 'eco-jaws'          // エコジョーズ
  | 'warm-water-heating' // ガス温水暖房付ふろ給湯器

export type ProductType = 'auto' | 'full-auto' | 'kyuto-only'

export type ProductItem = {
  id: string
  slug: string             // URLスラッグ（例: rinnai-ruf-a2405saw-c）
  maker: 'rinnai' | 'noritz' | 'paloma'
  makerLabel: string
  makerEn: string          // 表示用英語名（Rinnai / NORITZ / Paloma）
  series: string
  model: string
  remoteModel: string
  category: ProductCategory
  type: ProductType
  typeLabel: string
  capacity: 16 | 20 | 24 | number
  installationType: InstallationType
  installationLabel: string
  listPrice: number           // メーカー希望小売価格（税抜）
  discountRate: number        // 割引率（例: 80 = 80%OFF）
  salePrice: number           // 本体特価（税抜）
  remoteListPrice: number     // リモコン定価（税抜）
  remoteDiscountRate: number  // リモコン割引率
  remoteSalePrice: number     // リモコン特価（税抜）
  constructionFee: number     // 標準取付費（税抜）
  disposalFeeIncluded: boolean // 処分費込み
  totalExTax: number          // 税抜合計
  totalInTax: number          // 税込合計
  warranty: string
  image: string
  description: string
  detailUrl: string
  priceSource: string         // 価格確認元
  popular?: boolean
  recommended?: boolean
  priceStatus?: 'confirmed' | 'needs_confirmation'
}

// ─── 定数 ─────────────────────────────────────────────────────────────
const CONSTRUCTION_FEE = 38000
const PRICE_SOURCE = 'gas-kyuutouki.com'

// リンナイ
const RINNAI_REMOTE_MODEL = 'MBC-240V(A)'
const RINNAI_REMOTE_LIST = 40000
const RINNAI_REMOTE_SALE = 20000

// ノーリツ
const NORITZ_REMOTE_MODEL = 'RC-J101E'
const NORITZ_REMOTE_LIST = 40000
const NORITZ_REMOTE_SALE = 19400

// パロマ
const PALOMA_REMOTE_MODEL = 'MFC-E226V'
const PALOMA_REMOTE_LIST = 42000
const PALOMA_REMOTE_SALE = 20700

// ─── 商品データ ───────────────────────────────────────────────────────

export const productsData: ProductItem[] = [

  // ══════════════════════════════════════════════════════
  // リンナイ RUF-A 壁掛型 ガスふろ給湯器
  // 価格確認元: gas-kyuutouki.com/rinnai/qo/kabe_be.html
  // ══════════════════════════════════════════════════════

  // ── オートタイプ ──────────────────────────────────────
  {
    id: 'ruf-a2405saw',
    slug: 'rinnai-ruf-a2405saw-c',
    maker: 'rinnai',
    makerLabel: 'リンナイ',
    makerEn: 'Rinnai',
    series: 'RUF-A',
    model: 'RUF-A2405SAW(C)',
    remoteModel: RINNAI_REMOTE_MODEL,
    category: 'gas-furo',
    type: 'auto',
    typeLabel: 'オート',
    capacity: 24,
    installationType: 'wall-mounted',
    installationLabel: '壁掛屋外型',
    listPrice: 391000,
    discountRate: 80,
    salePrice: 78200,
    remoteListPrice: RINNAI_REMOTE_LIST,
    remoteDiscountRate: 50,
    remoteSalePrice: RINNAI_REMOTE_SALE,
    constructionFee: CONSTRUCTION_FEE,
    disposalFeeIncluded: true,
    totalExTax: 136200,
    totalInTax: 149820,
    warranty: '10年保証',
    image: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/3d0303492ec04dfa9b52be726706cc6c/RUF-A2405AWC.jpg',
    description: 'リンナイ RUF-Aシリーズ オートタイプ 24号。自動湯はり・自動追い焚き対応。壁掛屋外型で戸建て・マンション両対応。',
    detailUrl: '/products/rinnai-ruf-a2405saw-c',
    popular: true,
    priceStatus: 'confirmed',
    priceSource: PRICE_SOURCE,
  },
  {
    id: 'ruf-a2005saw',
    slug: 'rinnai-ruf-a2005saw-c',
    maker: 'rinnai',
    makerLabel: 'リンナイ',
    makerEn: 'Rinnai',
    series: 'RUF-A',
    model: 'RUF-A2005SAW(C)',
    remoteModel: RINNAI_REMOTE_MODEL,
    category: 'gas-furo',
    type: 'auto',
    typeLabel: 'オート',
    capacity: 20,
    installationType: 'wall-mounted',
    installationLabel: '壁掛屋外型',
    listPrice: 359000,
    discountRate: 80,
    salePrice: 71800,
    remoteListPrice: RINNAI_REMOTE_LIST,
    remoteDiscountRate: 50,
    remoteSalePrice: RINNAI_REMOTE_SALE,
    constructionFee: CONSTRUCTION_FEE,
    disposalFeeIncluded: true,
    totalExTax: 129800,
    totalInTax: 142780,
    warranty: '10年保証',
    image: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/3d0303492ec04dfa9b52be726706cc6c/RUF-A2405AWC.jpg',
    description: 'リンナイ RUF-Aシリーズ オートタイプ 20号。3〜4人世帯に最適。自動湯はり・自動追い焚き対応。',
    detailUrl: '/products/rinnai-ruf-a2005saw-c',
    priceStatus: 'confirmed',
    priceSource: PRICE_SOURCE,
  },
  {
    id: 'ruf-a1615saw',
    slug: 'rinnai-ruf-a1615saw-c',
    maker: 'rinnai',
    makerLabel: 'リンナイ',
    makerEn: 'Rinnai',
    series: 'RUF-A',
    model: 'RUF-A1615SAW(C)',
    remoteModel: RINNAI_REMOTE_MODEL,
    category: 'gas-furo',
    type: 'auto',
    typeLabel: 'オート',
    capacity: 16,
    installationType: 'wall-mounted',
    installationLabel: '壁掛屋外型',
    listPrice: 326000,
    discountRate: 80,
    salePrice: 65200,
    remoteListPrice: RINNAI_REMOTE_LIST,
    remoteDiscountRate: 50,
    remoteSalePrice: RINNAI_REMOTE_SALE,
    constructionFee: CONSTRUCTION_FEE,
    disposalFeeIncluded: true,
    totalExTax: 123200,
    totalInTax: 135520,
    warranty: '10年保証',
    image: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/3d0303492ec04dfa9b52be726706cc6c/RUF-A2405AWC.jpg',
    description: 'リンナイ RUF-Aシリーズ オートタイプ 16号。1〜2人世帯向けのコンパクトモデル。',
    detailUrl: '/products/rinnai-ruf-a1615saw-c',
    priceStatus: 'confirmed',
    priceSource: PRICE_SOURCE,
  },

  // ── フルオートタイプ ────────────────────────────────────
  {
    id: 'ruf-a2405aw',
    slug: 'rinnai-ruf-a2405aw-c',
    maker: 'rinnai',
    makerLabel: 'リンナイ',
    makerEn: 'Rinnai',
    series: 'RUF-A',
    model: 'RUF-A2405AW(C)',
    remoteModel: RINNAI_REMOTE_MODEL,
    category: 'gas-furo',
    type: 'full-auto',
    typeLabel: 'フルオート',
    capacity: 24,
    installationType: 'wall-mounted',
    installationLabel: '壁掛屋外型',
    listPrice: 442000,
    discountRate: 80,
    salePrice: 88400,
    remoteListPrice: RINNAI_REMOTE_LIST,
    remoteDiscountRate: 50,
    remoteSalePrice: RINNAI_REMOTE_SALE,
    constructionFee: CONSTRUCTION_FEE,
    disposalFeeIncluded: true,
    totalExTax: 146400,
    totalInTax: 161040,
    warranty: '10年保証',
    image: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/3d0303492ec04dfa9b52be726706cc6c/RUF-A2405AWC.jpg',
    description: 'リンナイ RUF-Aシリーズ フルオートタイプ 24号。湯はり・追い焚き・保温まですべて自動。最上位クラス。',
    detailUrl: '/products/rinnai-ruf-a2405aw-c',
    recommended: true,
    priceStatus: 'confirmed',
    priceSource: PRICE_SOURCE,
  },
  {
    id: 'ruf-a2005aw',
    slug: 'rinnai-ruf-a2005aw-c',
    maker: 'rinnai',
    makerLabel: 'リンナイ',
    makerEn: 'Rinnai',
    series: 'RUF-A',
    model: 'RUF-A2005AW(C)',
    remoteModel: RINNAI_REMOTE_MODEL,
    category: 'gas-furo',
    type: 'full-auto',
    typeLabel: 'フルオート',
    capacity: 20,
    installationType: 'wall-mounted',
    installationLabel: '壁掛屋外型',
    listPrice: 411000,
    discountRate: 80,
    salePrice: 82200,
    remoteListPrice: RINNAI_REMOTE_LIST,
    remoteDiscountRate: 50,
    remoteSalePrice: RINNAI_REMOTE_SALE,
    constructionFee: CONSTRUCTION_FEE,
    disposalFeeIncluded: true,
    totalExTax: 140200,
    totalInTax: 154220,
    warranty: '10年保証',
    image: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/3d0303492ec04dfa9b52be726706cc6c/RUF-A2405AWC.jpg',
    description: 'リンナイ RUF-Aシリーズ フルオートタイプ 20号。3〜4人世帯の快適生活を全自動でサポート。',
    detailUrl: '/products/rinnai-ruf-a2005aw-c',
    priceStatus: 'confirmed',
    priceSource: PRICE_SOURCE,
  },
  {
    id: 'ruf-a1615aw',
    slug: 'rinnai-ruf-a1615aw-c',
    maker: 'rinnai',
    makerLabel: 'リンナイ',
    makerEn: 'Rinnai',
    series: 'RUF-A',
    model: 'RUF-A1615AW(C)',
    remoteModel: RINNAI_REMOTE_MODEL,
    category: 'gas-furo',
    type: 'full-auto',
    typeLabel: 'フルオート',
    capacity: 16,
    installationType: 'wall-mounted',
    installationLabel: '壁掛屋外型',
    listPrice: 377000,
    discountRate: 80,
    salePrice: 75400,
    remoteListPrice: RINNAI_REMOTE_LIST,
    remoteDiscountRate: 50,
    remoteSalePrice: RINNAI_REMOTE_SALE,
    constructionFee: CONSTRUCTION_FEE,
    disposalFeeIncluded: true,
    totalExTax: 133400,
    totalInTax: 146740,
    warranty: '10年保証',
    image: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/3d0303492ec04dfa9b52be726706cc6c/RUF-A2405AWC.jpg',
    description: 'リンナイ RUF-Aシリーズ フルオートタイプ 16号。コンパクトながら全自動機能を搭載。',
    detailUrl: '/products/rinnai-ruf-a1615aw-c',
    priceStatus: 'confirmed',
    priceSource: PRICE_SOURCE,
  },

  // ══════════════════════════════════════════════════════
  // ノーリツ ユコアGT-70 壁掛型 ガスふろ給湯器
  // 価格確認元: gas-kyuutouki.com/noritz/qo/kabe_be.html
  // ══════════════════════════════════════════════════════

  // ── オートタイプ ──────────────────────────────────────
  {
    id: 'gt-2470saw-1',
    slug: 'noritz-gt-2470saw-1',
    maker: 'noritz',
    makerLabel: 'ノーリツ',
    makerEn: 'NORITZ',
    series: 'ユコアGT-70',
    model: 'GT-2470SAW-1 BL',
    remoteModel: NORITZ_REMOTE_MODEL,
    category: 'gas-furo',
    type: 'auto',
    typeLabel: 'オート',
    capacity: 24,
    installationType: 'wall-mounted',
    installationLabel: '壁掛屋外型',
    listPrice: 379900,
    discountRate: 79,
    salePrice: 79779,
    remoteListPrice: NORITZ_REMOTE_LIST,
    remoteDiscountRate: 52,
    remoteSalePrice: NORITZ_REMOTE_SALE,
    constructionFee: CONSTRUCTION_FEE,
    disposalFeeIncluded: true,
    totalExTax: 137179,
    totalInTax: 150897,
    warranty: '10年保証',
    image: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/08d1fdd39bb641e18a8102b0b0c074e6/GT-C2472AW-1.jpg',
    description: 'ノーリツ ユコアGT-70 オートタイプ 24号。自動湯はり・自動追い焚き対応。信頼のノーリツブランド。',
    detailUrl: '/products/noritz-gt-2470saw-1',
    popular: true,
    priceStatus: 'confirmed',
    priceSource: PRICE_SOURCE,
  },
  {
    id: 'gt-2070saw-1',
    slug: 'noritz-gt-2070saw-1',
    maker: 'noritz',
    makerLabel: 'ノーリツ',
    makerEn: 'NORITZ',
    series: 'ユコアGT-70',
    model: 'GT-2070SAW-1 BL',
    remoteModel: NORITZ_REMOTE_MODEL,
    category: 'gas-furo',
    type: 'auto',
    typeLabel: 'オート',
    capacity: 20,
    installationType: 'wall-mounted',
    installationLabel: '壁掛屋外型',
    listPrice: 353700,
    discountRate: 79,
    salePrice: 74277,
    remoteListPrice: NORITZ_REMOTE_LIST,
    remoteDiscountRate: 52,
    remoteSalePrice: NORITZ_REMOTE_SALE,
    constructionFee: CONSTRUCTION_FEE,
    disposalFeeIncluded: true,
    totalExTax: 131677,
    totalInTax: 144845,
    warranty: '10年保証',
    image: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/08d1fdd39bb641e18a8102b0b0c074e6/GT-C2472AW-1.jpg',
    description: 'ノーリツ ユコアGT-70 オートタイプ 20号。3〜4人世帯に最適なスタンダードモデル。',
    detailUrl: '/products/noritz-gt-2070saw-1',
    priceStatus: 'confirmed',
    priceSource: PRICE_SOURCE,
  },
  {
    id: 'gt-1670saw-1',
    slug: 'noritz-gt-1670saw-1',
    maker: 'noritz',
    makerLabel: 'ノーリツ',
    makerEn: 'NORITZ',
    series: 'ユコアGT-70',
    model: 'GT-1670SAW-1 BL',
    remoteModel: NORITZ_REMOTE_MODEL,
    category: 'gas-furo',
    type: 'auto',
    typeLabel: 'オート',
    capacity: 16,
    installationType: 'wall-mounted',
    installationLabel: '壁掛屋外型',
    listPrice: 320500,
    discountRate: 79,
    salePrice: 67305,
    remoteListPrice: NORITZ_REMOTE_LIST,
    remoteDiscountRate: 52,
    remoteSalePrice: NORITZ_REMOTE_SALE,
    constructionFee: CONSTRUCTION_FEE,
    disposalFeeIncluded: true,
    totalExTax: 124705,
    totalInTax: 137176,
    warranty: '10年保証',
    image: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/08d1fdd39bb641e18a8102b0b0c074e6/GT-C2472AW-1.jpg',
    description: 'ノーリツ ユコアGT-70 オートタイプ 16号。1〜2人世帯向けのコンパクトモデル。',
    detailUrl: '/products/noritz-gt-1670saw-1',
    priceStatus: 'confirmed',
    priceSource: PRICE_SOURCE,
  },

  // ── フルオートタイプ ────────────────────────────────────
  {
    id: 'gt-2470aw-1',
    slug: 'noritz-gt-2470aw-1',
    maker: 'noritz',
    makerLabel: 'ノーリツ',
    makerEn: 'NORITZ',
    series: 'ユコアGT-70',
    model: 'GT-2470AW-1 BL',
    remoteModel: NORITZ_REMOTE_MODEL,
    category: 'gas-furo',
    type: 'full-auto',
    typeLabel: 'フルオート',
    capacity: 24,
    installationType: 'wall-mounted',
    installationLabel: '壁掛屋外型',
    listPrice: 430900,
    discountRate: 79,
    salePrice: 90489,
    remoteListPrice: NORITZ_REMOTE_LIST,
    remoteDiscountRate: 52,
    remoteSalePrice: NORITZ_REMOTE_SALE,
    constructionFee: CONSTRUCTION_FEE,
    disposalFeeIncluded: true,
    totalExTax: 147889,
    totalInTax: 162678,
    warranty: '10年保証',
    image: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/08d1fdd39bb641e18a8102b0b0c074e6/GT-C2472AW-1.jpg',
    description: 'ノーリツ ユコアGT-70 フルオートタイプ 24号。全自動機能で快適なバスタイムを毎日実現。',
    detailUrl: '/products/noritz-gt-2470aw-1',
    recommended: true,
    priceStatus: 'confirmed',
    priceSource: PRICE_SOURCE,
  },
  {
    id: 'gt-2070aw-1',
    slug: 'noritz-gt-2070aw-1',
    maker: 'noritz',
    makerLabel: 'ノーリツ',
    makerEn: 'NORITZ',
    series: 'ユコアGT-70',
    model: 'GT-2070AW-1 BL',
    remoteModel: NORITZ_REMOTE_MODEL,
    category: 'gas-furo',
    type: 'full-auto',
    typeLabel: 'フルオート',
    capacity: 20,
    installationType: 'wall-mounted',
    installationLabel: '壁掛屋外型',
    listPrice: 404700,
    discountRate: 79,
    salePrice: 84987,
    remoteListPrice: NORITZ_REMOTE_LIST,
    remoteDiscountRate: 52,
    remoteSalePrice: NORITZ_REMOTE_SALE,
    constructionFee: CONSTRUCTION_FEE,
    disposalFeeIncluded: true,
    totalExTax: 142387,
    totalInTax: 156626,
    warranty: '10年保証',
    image: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/08d1fdd39bb641e18a8102b0b0c074e6/GT-C2472AW-1.jpg',
    description: 'ノーリツ ユコアGT-70 フルオートタイプ 20号。人気の3〜4人世帯向けフルオートモデル。',
    detailUrl: '/products/noritz-gt-2070aw-1',
    priceStatus: 'confirmed',
    priceSource: PRICE_SOURCE,
  },
  {
    id: 'gt-1670aw-1',
    slug: 'noritz-gt-1670aw-1',
    maker: 'noritz',
    makerLabel: 'ノーリツ',
    makerEn: 'NORITZ',
    series: 'ユコアGT-70',
    model: 'GT-1670AW-1 BL',
    remoteModel: NORITZ_REMOTE_MODEL,
    category: 'gas-furo',
    type: 'full-auto',
    typeLabel: 'フルオート',
    capacity: 16,
    installationType: 'wall-mounted',
    installationLabel: '壁掛屋外型',
    listPrice: 371500,
    discountRate: 79,
    salePrice: 78015,
    remoteListPrice: NORITZ_REMOTE_LIST,
    remoteDiscountRate: 52,
    remoteSalePrice: NORITZ_REMOTE_SALE,
    constructionFee: CONSTRUCTION_FEE,
    disposalFeeIncluded: true,
    totalExTax: 135415,
    totalInTax: 148957,
    warranty: '10年保証',
    image: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/08d1fdd39bb641e18a8102b0b0c074e6/GT-C2472AW-1.jpg',
    description: 'ノーリツ ユコアGT-70 フルオートタイプ 16号。コンパクトながら全自動機能を搭載。',
    detailUrl: '/products/noritz-gt-1670aw-1',
    priceStatus: 'confirmed',
    priceSource: PRICE_SOURCE,
  },

  // ══════════════════════════════════════════════════════
  // パロマ FH 壁掛型 ガスふろ給湯器
  // 価格確認元: gas-kyuutouki.com/paloma/qo/kabe_be.html
  // ══════════════════════════════════════════════════════

  // ── オートタイプ ──────────────────────────────────────
  {
    id: 'fh-2423saw-1',
    slug: 'paloma-fh-2423saw-1',
    maker: 'paloma',
    makerLabel: 'パロマ',
    makerEn: 'Paloma',
    series: 'FH',
    model: 'FH-2423SAW-1',
    remoteModel: PALOMA_REMOTE_MODEL,
    category: 'gas-furo',
    type: 'auto',
    typeLabel: 'オート',
    capacity: 24,
    installationType: 'wall-mounted',
    installationLabel: '壁掛屋外型',
    listPrice: 393400,
    discountRate: 81,
    salePrice: 74746,
    remoteListPrice: PALOMA_REMOTE_LIST,
    remoteDiscountRate: 51,
    remoteSalePrice: PALOMA_REMOTE_SALE,
    constructionFee: CONSTRUCTION_FEE,
    disposalFeeIncluded: true,
    totalExTax: 133446,
    totalInTax: 146791,
    warranty: '10年保証',
    image: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/a0a4791f520d4f48a0ccc4781473ed5c/RUF-SA2005AWA.jpg',
    description: 'パロマ FH オートタイプ 24号。安定した給湯性能と使いやすい操作性。81%OFFの特別価格。',
    detailUrl: '/products/paloma-fh-2423saw-1',
    popular: true,
    priceStatus: 'confirmed',
    priceSource: PRICE_SOURCE,
  },
  {
    id: 'fh-2023saw-1',
    slug: 'paloma-fh-2023saw-1',
    maker: 'paloma',
    makerLabel: 'パロマ',
    makerEn: 'Paloma',
    series: 'FH',
    model: 'FH-2023SAW-1',
    remoteModel: PALOMA_REMOTE_MODEL,
    category: 'gas-furo',
    type: 'auto',
    typeLabel: 'オート',
    capacity: 20,
    installationType: 'wall-mounted',
    installationLabel: '壁掛屋外型',
    listPrice: 364700,
    discountRate: 84,
    salePrice: 69293,
    remoteListPrice: PALOMA_REMOTE_LIST,
    remoteDiscountRate: 51,
    remoteSalePrice: PALOMA_REMOTE_SALE,
    constructionFee: CONSTRUCTION_FEE,
    disposalFeeIncluded: true,
    totalExTax: 127993,
    totalInTax: 140792,
    warranty: '10年保証',
    image: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/a0a4791f520d4f48a0ccc4781473ed5c/RUF-SA2005AWA.jpg',
    description: 'パロマ FH オートタイプ 20号。3〜4人世帯に最適。84%OFFの圧倒的コスパ。',
    detailUrl: '/products/paloma-fh-2023saw-1',
    priceStatus: 'confirmed',
    priceSource: PRICE_SOURCE,
  },
  {
    id: 'fh-1613saw-1',
    slug: 'paloma-fh-1613saw-1',
    maker: 'paloma',
    makerLabel: 'パロマ',
    makerEn: 'Paloma',
    series: 'FH',
    model: 'FH-1613SAW-1',
    remoteModel: PALOMA_REMOTE_MODEL,
    category: 'gas-furo',
    type: 'auto',
    typeLabel: 'オート',
    capacity: 16,
    installationType: 'wall-mounted',
    installationLabel: '壁掛屋外型',
    listPrice: 328800,
    discountRate: 81,
    salePrice: 62472,
    remoteListPrice: PALOMA_REMOTE_LIST,
    remoteDiscountRate: 51,
    remoteSalePrice: PALOMA_REMOTE_SALE,
    constructionFee: CONSTRUCTION_FEE,
    disposalFeeIncluded: true,
    totalExTax: 121172,
    totalInTax: 133289,
    warranty: '10年保証',
    image: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/a0a4791f520d4f48a0ccc4781473ed5c/RUF-SA2005AWA.jpg',
    description: 'パロマ FH オートタイプ 16号。1〜2人世帯向けのコンパクトモデル。',
    detailUrl: '/products/paloma-fh-1613saw-1',
    priceStatus: 'confirmed',
    priceSource: PRICE_SOURCE,
  },

  // ── フルオートタイプ ────────────────────────────────────
  {
    id: 'fh-2423fawl-1',
    slug: 'paloma-fh-2423fawl-1',
    maker: 'paloma',
    makerLabel: 'パロマ',
    makerEn: 'Paloma',
    series: 'FH',
    model: 'FH-2423FAWL-1',
    remoteModel: PALOMA_REMOTE_MODEL,
    category: 'gas-furo',
    type: 'full-auto',
    typeLabel: 'フルオート',
    capacity: 24,
    installationType: 'wall-mounted',
    installationLabel: '壁掛屋外型',
    listPrice: 447400,
    discountRate: 81,
    salePrice: 85006,
    remoteListPrice: PALOMA_REMOTE_LIST,
    remoteDiscountRate: 51,
    remoteSalePrice: PALOMA_REMOTE_SALE,
    constructionFee: CONSTRUCTION_FEE,
    disposalFeeIncluded: true,
    totalExTax: 143706,
    totalInTax: 158077,
    warranty: '10年保証',
    image: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/a0a4791f520d4f48a0ccc4781473ed5c/RUF-SA2005AWA.jpg',
    description: 'パロマ FH フルオートタイプ 24号。湯はり・追い焚き・保温まですべて自動。',
    detailUrl: '/products/paloma-fh-2423fawl-1',
    recommended: true,
    priceStatus: 'confirmed',
    priceSource: PRICE_SOURCE,
  },
  {
    id: 'fh-2023fawl-1',
    slug: 'paloma-fh-2023fawl-1',
    maker: 'paloma',
    makerLabel: 'パロマ',
    makerEn: 'Paloma',
    series: 'FH',
    model: 'FH-2023FAWL-1',
    remoteModel: PALOMA_REMOTE_MODEL,
    category: 'gas-furo',
    type: 'full-auto',
    typeLabel: 'フルオート',
    capacity: 20,
    installationType: 'wall-mounted',
    installationLabel: '壁掛屋外型',
    listPrice: 418600,
    discountRate: 81,
    salePrice: 79534,
    remoteListPrice: PALOMA_REMOTE_LIST,
    remoteDiscountRate: 51,
    remoteSalePrice: PALOMA_REMOTE_SALE,
    constructionFee: CONSTRUCTION_FEE,
    disposalFeeIncluded: true,
    totalExTax: 138234,
    totalInTax: 152057,
    warranty: '10年保証',
    image: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/a0a4791f520d4f48a0ccc4781473ed5c/RUF-SA2005AWA.jpg',
    description: 'パロマ FH フルオートタイプ 20号。人気の3〜4人世帯向けフルオートモデル。',
    detailUrl: '/products/paloma-fh-2023fawl-1',
    priceStatus: 'confirmed',
    priceSource: PRICE_SOURCE,
  },
  {
    id: 'fh-1613fawl-1',
    slug: 'paloma-fh-1613fawl-1',
    maker: 'paloma',
    makerLabel: 'パロマ',
    makerEn: 'Paloma',
    series: 'FH',
    model: 'FH-1613FAWL-1',
    remoteModel: PALOMA_REMOTE_MODEL,
    category: 'gas-furo',
    type: 'full-auto',
    typeLabel: 'フルオート',
    capacity: 16,
    installationType: 'wall-mounted',
    installationLabel: '壁掛屋外型',
    listPrice: 382800,
    discountRate: 81,
    salePrice: 72732,
    remoteListPrice: PALOMA_REMOTE_LIST,
    remoteDiscountRate: 51,
    remoteSalePrice: PALOMA_REMOTE_SALE,
    constructionFee: CONSTRUCTION_FEE,
    disposalFeeIncluded: true,
    totalExTax: 131432,
    totalInTax: 144575,
    warranty: '10年保証',
    image: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/a0a4791f520d4f48a0ccc4781473ed5c/RUF-SA2005AWA.jpg',
    description: 'パロマ FH フルオートタイプ 16号。コンパクトな全自動タイプ。',
    detailUrl: '/products/paloma-fh-1613fawl-1',
    priceStatus: 'confirmed',
    priceSource: PRICE_SOURCE,
  },
]

// ─── ユーティリティ ───────────────────────────────────────────────────────────

export function getProductBySlug(slug: string): ProductItem | undefined {
  return productsData.find((p) => p.slug === slug)
}

export function getProductsByMaker(maker: ProductItem['maker']) {
  return productsData.filter((p) => p.maker === maker)
}

export function getProductsByCategory(category: ProductCategory) {
  return productsData.filter((p) => p.category === category)
}

export function getProductsByInstallation(installationType: InstallationType) {
  return productsData.filter((p) => p.installationType === installationType)
}

export function getPopularProducts(limit = 9) {
  const popular = productsData.filter((p) => p.popular || p.recommended)
  if (popular.length >= limit) return popular.slice(0, limit)
  const rest = productsData.filter((p) => !p.popular && !p.recommended)
  return [...popular, ...rest].slice(0, limit)
}

export function formatPrice(price: number) {
  return price.toLocaleString('ja-JP')
}

export const constructionFeeItems = [
  '既存給湯器撤去',
  '既存給湯器処分',
  '新規給湯器取付',
  'リモコン取付',
  '給水管接続',
  '給湯管接続',
  'ガス管接続',
  '配管保温',
  '試運転',
  '使用説明',
]

export const additionalFeeItems = [
  '配管延長が必要な場合',
  'PS扉内設置の場合',
  '高所作業が伴う場合',
  '特殊排気・排気筒交換が必要な場合',
  '号数変更を伴う場合',
  '据置台交換が必要な場合',
  'リモコン配線不良がある場合',
  '特殊な設置環境の場合',
]

export const CONSTRUCTION_FEE_VALUE = CONSTRUCTION_FEE
