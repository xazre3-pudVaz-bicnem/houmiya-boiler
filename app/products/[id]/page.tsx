import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import ProductCard from '@/components/ProductCard'
import FaqAccordion from '@/components/FaqAccordion'
import {
  productsData,
  getProductBySlug,
  getProductsByMaker,
  constructionFeeItems,
  additionalFeeItems,
  formatPrice,
} from '@/data/products'
import { getCapacityLabel, getCapacityDescription } from '@/lib/productUtils'
import { siteConfig } from '@/data/site'

function getProductFeatureText(capacity: number, type: string, maker: string): string {
  const capText =
    capacity === 24
      ? '4人以上のファミリー世帯向けの24号'
      : capacity === 20
      ? '2〜3人家族向けの20号'
      : '一人暮らし・少人数世帯向けの16号'
  const typeText =
    type === 'full-auto'
      ? 'フルオートタイプ。自動湯はり・追い焚き・自動保温に加え、自動たし湯・配管自動洗浄機能を搭載。'
      : 'オートタイプ。自動湯はり・追い焚き・自動保温機能を搭載。'
  const makerText = maker ? `${maker}の` : ''
  return `${makerText}${capText}の${typeText}`
}

// 設置タイプ別の説明文
function getInstallationDescription(installationType: string): {
  summary: string
  points: string[]
  note?: string
} {
  switch (installationType) {
    case 'floor-mounted':
      return {
        summary:
          '据置型は地面やコンクリートブロックの上に据置台を使って設置するタイプです。浴槽の横や屋外の地面に設置されることが多く、配管が下方から接続される構造です。',
        points: [
          '据置台（脚部）の上に本体を固定して設置します',
          '主に戸建ての浴室横・屋外の地面に設置されます',
          '既存が据置型の場合は同じ据置型での交換がスムーズです',
          '壁掛型へ変更する場合は据置台の撤去・壁面金具の新設が必要です',
        ],
        note: '据置台が劣化している場合は据置台の交換費用が別途発生することがあります。',
      }
    case 'ps-standard':
      return {
        summary:
          'PS標準設置型は、マンションの玄関脇などにあるパイプスペース（PS）に設置する規格化されたタイプです。扉の前面に給湯器の操作面が露出する形で設置されます。',
        points: [
          'マンションのパイプスペース（PS）内に設置します',
          'PS扉の内寸（幅・奥行き・高さ）に収まる機種を選ぶ必要があります',
          '排気方向（前方排気・上方排気）の確認が必要です',
          '号数を上げる場合はPS内寸に収まるかの確認が必須です',
        ],
        note: 'マンションでは管理規約で機種・メーカーが指定されている場合があります。事前に管理組合へご確認ください。',
      }
    case 'ps-door':
    case 'ps-door-top':
      return {
        summary:
          'PS扉内設置型は、マンションのパイプスペースの扉の内側に給湯器を収めるタイプです。扉を閉めると本体が隠れるため見た目がすっきりしますが、設置スペースの制約が大きい設置方式です。',
        points: [
          'パイプスペースの扉の内側に本体を収納して設置します',
          'PS扉の内寸に厳密に適合する機種を選ぶ必要があります',
          '排気の方向（前方・上方）に対応した機種を選定します',
          '狭い作業スペースでの施工となるため経験が重要です',
        ],
        note: 'PS扉内設置は管理規約の確認が特に重要です。扉を開けた全体写真と寸法のわかる写真をいただくと適合機種をご提案できます。',
      }
    case 'balcony':
      return {
        summary:
          'ベランダ壁掛型は、マンションのベランダ（バルコニー）の壁面に取り付けるタイプです。屋外の壁面に固定し、給排気を直接外気に行います。',
        points: [
          'ベランダの壁面に金具で固定して設置します',
          '給排気のクリアランス（周囲の空間）の確保が必要です',
          'マンションの管理規約の確認が必要な場合があります',
          '避難経路を妨げない設置位置の確認が必要です',
        ],
        note: 'ベランダは共用部扱いの場合があります。管理規約をご確認ください。',
      }
    case 'balanced-flue':
      return {
        summary:
          'BF式（バランス型）は、屋内に設置し、給排気を一体の筒で屋外と行う方式です。古い住宅で見られる設置方式で、現在は後継機種が限られます。',
        points: [
          '屋内設置で給排気筒を屋外へ通す方式です',
          '給排気筒の状態確認が必要です',
          '後継機種が限られるため設置可否の確認が重要です',
          '安全のため給排気経路の点検が欠かせません',
        ],
        note: '現在の設置状況を写真でご確認のうえ、適合する後継機種をご提案します。',
      }
    case 'wall-mounted':
    default:
      return {
        summary:
          '壁掛型（壁掛屋外型）は、住宅の外壁に金具で固定して設置する最も一般的なタイプです。戸建て・マンションを問わず広く採用されており、設置の自由度が高いのが特徴です。',
        points: [
          '住宅の外壁に取付金具で固定して設置します',
          '戸建て・マンションのいずれにも広く採用されています',
          '同じ壁掛型からの交換であれば既存金具を流用できる場合が多いです',
          '給排気のクリアランスを確保できる位置に設置します',
        ],
        note: '据置型やPS設置型からの変更を伴う場合は、追加工事が発生することがあります。',
      }
  }
}

// マンション適合性の説明
function getMansionFit(installationType: string): string {
  switch (installationType) {
    case 'ps-standard':
    case 'ps-door':
    case 'ps-door-top':
      return 'こちらはマンションのパイプスペース（PS）設置に対応したタイプです。PS扉の内寸に収まり、排気方向が適合すれば設置できます。管理規約で機種が指定されている場合があるため、PS扉を開けた全体写真と寸法のわかる写真をお送りいただければ適合機種をご提案します。'
    case 'balcony':
      return 'こちらはベランダ（バルコニー）壁掛けでの設置に対応したタイプです。マンションのベランダに設置スペースと給排気のクリアランスが確保でき、管理規約で認められていれば設置できます。設置位置の写真をお送りいただければ可否をご案内します。'
    case 'wall-mounted':
      return 'こちらは壁掛屋外型です。マンションでも外壁に設置スペースがある住戸では設置できますが、多くのマンションはパイプスペース（PS）設置型が標準です。PS設置のマンションの場合は、PS扉まわりの写真をお送りいただければ適合するPS用の機種をご提案します。'
    default:
      return 'マンションへの設置可否は設置方式によって異なります。パイプスペース（PS）設置型のマンションの場合は、PS扉まわりの写真をお送りいただければ適合機種をご提案します。'
  }
}

// 戸建て適合性の説明
function getKodateFit(installationType: string): string {
  switch (installationType) {
    case 'wall-mounted':
      return 'こちらは壁掛屋外型で、戸建て住宅に最も多く採用されている設置タイプです。外壁に取付金具で固定でき、同じ壁掛型からの交換であれば既存金具を流用できる場合が多く、標準工事でスムーズに交換できます。'
    case 'floor-mounted':
      return 'こちらは据置型で、浴室横や屋外の地面に据置台を使って設置する戸建て向きのタイプです。既存が据置型であれば同じ据置型での交換がスムーズです。壁掛型へ変更する場合は据置台の撤去・壁面金具の新設が必要になります。'
    case 'ps-standard':
    case 'ps-door':
    case 'ps-door-top':
      return 'こちらはマンションのパイプスペース（PS）向けの設置タイプです。戸建てで使用する場合は、設置場所に応じて壁掛型・据置型などの方が適しているケースが多いため、設置状況の写真をお送りいただければ最適な機種をご提案します。'
    default:
      return '戸建てへの設置は、外壁への壁掛けや地面への据置など設置場所に応じて選定します。設置状況の写真をお送りいただければ最適な機種をご提案します。'
  }
}

export function generateStaticParams() {
  return productsData.map((p) => ({ id: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = getProductBySlug(id)
  if (!product) return {}
  const title = `${product.model}の給湯器交換価格｜${product.makerLabel}${product.capacity}号${product.typeLabel}｜株式会社宝宮設備`
  const description = `${product.makerLabel} ${product.model}の給湯器交換なら株式会社宝宮設備。横浜市・川崎市・厚木市・海老名市対応。本体・リモコン・標準工事費込みの税込価格${formatPrice(product.totalInTax)}円を掲載。無料見積もり受付中。`
  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.baseUrl}${product.detailUrl}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.baseUrl}${product.detailUrl}`,
      siteName: '宝宮設備 給湯器交換専門サイト',
      locale: 'ja_JP',
      type: 'website',
      images: [{ url: product.image, width: 1200, height: 900, alt: `${product.makerLabel} ${product.model}` }],
    },
    twitter: { card: 'summary_large_image', images: [product.image] },
  }
}

// 価格有効期限（構造化データ用）: ビルド時点の当年末を設定
const priceValidUntil = `${new Date().getFullYear()}-12-31`

const makerPageMap = {
  rinnai: '/rinnai',
  noritz: '/noritz',
  paloma: '/paloma',
} as const

const makerColorMap = {
  rinnai: { bg: 'bg-red-600', text: 'text-red-700', light: 'bg-red-50 border-red-200' },
  noritz: { bg: 'bg-blue-700', text: 'text-blue-700', light: 'bg-blue-50 border-blue-200' },
  paloma: { bg: 'bg-indigo-700', text: 'text-indigo-700', light: 'bg-indigo-50 border-indigo-200' },
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProductBySlug(id)
  if (!product) notFound()

  const color = makerColorMap[product.maker]
  const makerPage = makerPageMap[product.maker]

  // 同シリーズの全商品
  const seriesProducts = getProductsByMaker(product.maker)
  const seriesAuto = seriesProducts.filter((p) => p.type === 'auto')
  const seriesFullAuto = seriesProducts.filter((p) => p.type === 'full-auto')

  // 関連商品（同メーカー・別機種、最大3件）
  const related = seriesProducts.filter((p) => p.slug !== product.slug).slice(0, 3)

  // 設置タイプ別の説明
  const installInfo = getInstallationDescription(product.installationType)

  // 工事費の税込（標準工事費 税抜38,000円 → 税込）
  const constructionFeeInTax = Math.round(product.constructionFee * 1.1)

  // 関連エリアリンク
  const areaLinks = [
    { href: '/area/yokohama', label: `横浜市での${product.model}交換`, city: '横浜市' },
    { href: '/area/kawasaki', label: `川崎市での${product.model}交換`, city: '川崎市' },
    { href: '/area/atsugi', label: `厚木市での${product.model}交換`, city: '厚木市' },
    { href: '/area/ebina', label: `海老名市での${product.model}交換`, city: '海老名市' },
  ]

  const faqs = [
    {
      q: `${product.model}はどの号数を選べばいいですか？`,
      a: `${product.capacity}号は${product.capacity === 16 ? '1〜2人の少人数世帯' : product.capacity === 20 ? '2〜4人の標準世帯' : '4人以上の大家族や同時使用が多い世帯'}に適しています。迷う場合は無料見積もりで現地確認後にアドバイスいたします。`,
    },
    {
      q: 'オートとフルオートの違いは？',
      a: 'オートは自動湯はり・自動追い焚きに対応。フルオートはこれらに加え、設定温度の自動保温・自動足し湯まで全自動で行います。フルオートのほうが利便性は高いですが、価格も少し上がります。',
    },
    {
      q: '標準取付費に含まれる作業は何ですか？',
      a: '既存給湯器の撤去・処分、新規給湯器の取付、リモコン取付、給水・給湯・ガス管の接続、配管保温、試運転、使用説明がすべて含まれます。別途費用が発生するのは、配管延長・高所作業・特殊設置環境などの場合です。',
    },
    {
      q: '工事当日に追加費用が発生することはありますか？',
      a: '標準的な交換工事では追加費用は発生しません。ただし、配管が著しく劣化していたり、設置環境が特殊な場合は事前にお見積もりで説明します。事前確認なしに追加費用を請求することはありません。',
    },
    {
      q: '見積もりから工事まで何日かかりますか？',
      a: '写真をお送りいただくか、現地確認後に最短即日でお見積もりをご提示します。工事日程はご都合に合わせて調整可能です。最短で翌日工事にも対応しています。',
    },
    {
      q: 'この商品を見積もりしてもらうには？',
      a: `この商品ページの「この商品で無料見積もり」ボタンから、または ${siteConfig.phone} へのお電話・LINEからご依頼いただけます。設置場所の写真をお送りいただくとスムーズです。`,
    },
    {
      q: 'リモコンは付属しますか？',
      a: `掲載価格は本体と台所リモコン・浴室リモコン（${product.remoteModel}）のセット価格です。リモコンの取付工事も標準取付費に含まれています。`,
    },
    {
      q: 'エコジョーズ対応機種ですか？',
      a:
        product.category === 'eco-jaws'
          ? 'はい。こちらは省エネ型のエコジョーズ対応機種です。設置にはドレン排水の経路が確保できる環境が必要です。'
          : 'こちらは従来型の機種です。エコジョーズをご希望の場合は、同等の号数・タイプのエコジョーズ対応機種をご案内しますのでお気軽にご相談ください。',
    },
    {
      q: 'マンションに設置できますか？',
      a: `こちらは${product.installationLabel}です。マンションのパイプスペース（PS）設置型をお探しの場合は、PS扉まわりの写真をお送りいただければ適合機種をご提案します。`,
    },
    {
      q: '保証はどうなっていますか？',
      a: `${product.warranty}に対応し、メーカー保証に加えて自社施工による工事保証もお付けしています。工事後の不具合もお気軽にご連絡ください。`,
    },
    {
      q: '既存の給湯器と入れ替えできますか？',
      a: '同等の設置タイプ・号数であればスムーズに入れ替えできます。号数やタイプを変更する場合は配管やガス供給量の確認が必要なため、事前にご相談ください。',
    },
  ]

  const checkBeforeItems = [
    '現在お使いの給湯器の型番の確認（本体のシールに記載）',
    `号数の確認（この商品は${product.capacity}号）`,
    `タイプの確認（この商品は${product.typeLabel}）`,
    `設置タイプの確認（この商品は${product.installationLabel}）`,
    '都市ガス／プロパンガスの種類の確認',
  ]

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.makerLabel} ${product.model} ${product.capacity}号 ${product.typeLabel}`,
    description: `${product.makerLabel} ${product.model}。${product.capacity}号${product.typeLabel}。${product.installationLabel}。`,
    image: [product.image],
    brand: { '@type': 'Brand', name: product.makerLabel },
    model: product.model,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'JPY',
      price: product.totalInTax,
      priceValidUntil,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: '株式会社宝宮設備' },
      url: `${siteConfig.baseUrl}${product.detailUrl}`,
    },
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

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'トップ', item: 'https://www.houmiya-boiler.com' },
      { '@type': 'ListItem', position: 2, name: `${product.makerLabel}給湯器`, item: `https://www.houmiya-boiler.com${makerPage}` },
      { '@type': 'ListItem', position: 3, name: product.model, item: `https://www.houmiya-boiler.com${product.detailUrl}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main className="pt-[100px]">

        {/* パンくずリスト */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
              <Link href="/" className="hover:text-gray-700 transition-colors">トップ</Link>
              <span>›</span>
              <Link href={makerPage} className="hover:text-gray-700 transition-colors">{product.makerLabel}給湯器</Link>
              <span>›</span>
              <span className="text-gray-600 truncate">{product.model}</span>
            </nav>
          </div>
        </div>

        {/* メイン商品セクション */}
        <section className="bg-white py-10 md:py-14">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">

              {/* 左：商品画像 */}
              <div>
                <div className="relative bg-gray-50 rounded-xl overflow-hidden aspect-[4/3]">
                  <Image
                    src={product.image}
                    alt={`${product.makerLabel} ${product.model} ${product.typeLabel} ${product.capacity}号`}
                    fill
                    className="object-contain p-8"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute top-3 left-3 bg-red-600 text-white rounded-full w-16 h-16 flex flex-col items-center justify-center text-center shadow-lg">
                    <span className="text-[9px] font-bold">最大</span>
                    <span className="text-lg font-black leading-none">{product.discountRate}%</span>
                    <span className="text-[9px] font-bold">OFF</span>
                  </div>
                  {(product.popular || product.recommended) && (
                    <div className="absolute top-3 right-3">
                      {product.recommended
                        ? <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded shadow">おすすめ</span>
                        : <span className="bg-yellow-400 text-gray-900 text-xs font-black px-3 py-1 rounded shadow">人気</span>}
                    </div>
                  )}
                </div>
                <p className="text-gray-400 text-[10px] mt-2 text-center">※画像は代表例です。実際の商品と若干異なる場合があります。</p>
              </div>

              {/* 右：商品情報・料金内訳 */}
              <div>
                <div className={`inline-block text-xs font-black px-3 py-1 rounded mb-3 ${color.bg} text-white`}>
                  {product.makerEn}
                </div>
                <div className="text-xs text-gray-500 mb-1">{product.series}シリーズ / {product.installationLabel}</div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-1 leading-tight">
                  {product.model}（{product.makerLabel} {product.capacity}号{product.typeLabel}）
                </h1>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${color.light}`}>{product.capacity}号</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${color.light}`}>{product.typeLabel}</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full border border-gray-200 bg-gray-50">{product.installationLabel}</span>
                </div>

                {/* 号数の目安 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-blue-900">{product.capacity}号</span>
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 rounded px-2 py-0.5">{getCapacityLabel(product.capacity)}</span>
                  </div>
                  <p className="text-xs text-blue-800 leading-relaxed">{getCapacityDescription(product.capacity)}</p>
                  <p className="text-[11px] text-blue-500 mt-1.5">号数は使用人数の目安です。設置状況によって適した号数は変わります。迷った場合はお気軽にご相談ください。</p>
                </div>

                {/* 料金内訳ボックス */}
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden mb-4">
                  <div className="bg-gray-900 text-white p-4">
                    <div className="text-sm font-bold text-gray-300 mb-0.5">工事費込み税込価格</div>
                    <div className="text-4xl font-black text-white">
                      {formatPrice(product.totalInTax)}<span className="text-2xl">円</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">税抜合計 {formatPrice(product.totalExTax)}円</div>
                  </div>
                  <div className="p-5 space-y-3">
                    {/* 定価 */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">メーカー希望小売価格</span>
                      <span className="text-sm text-gray-400 line-through">{formatPrice(product.listPrice)}円</span>
                    </div>
                    {/* 割引 */}
                    <div className="flex items-center justify-between bg-red-50 -mx-5 px-5 py-2">
                      <span className="text-sm font-black text-red-600">{product.discountRate}%OFF</span>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">本体特価</div>
                        <div className="text-xl font-black text-red-600">{formatPrice(product.salePrice)}円</div>
                      </div>
                    </div>
                    <div className="border-t border-gray-100" />
                    {/* リモコン */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-700">リモコンセット</div>
                        <div className="text-xs text-gray-400">{product.remoteModel}</div>
                      </div>
                      <span className="text-sm font-bold text-gray-800">{formatPrice(product.remoteSalePrice)}円</span>
                    </div>
                    {/* 工事費 */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-700">標準取付費</div>
                        <div className="text-xs text-gray-400">処分費込み</div>
                      </div>
                      <span className="text-sm font-bold text-gray-800">{formatPrice(product.constructionFee)}円</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>税抜合計</span>
                        <span>{formatPrice(product.totalExTax)}円</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-gray-900">工事費込み税込価格</span>
                        <span className="text-2xl font-black text-red-600">{formatPrice(product.totalInTax)}円</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 px-5 py-3 text-xs text-blue-700">
                    ※本体・リモコン・標準取付費はすべて税抜表示。税込合計に消費税10%を加算済み。
                  </div>
                </div>

                {/* 保証 */}
                <div className="flex items-center gap-2 mb-5 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                  {product.warranty}対応 / メーカー保証付き
                </div>

                {/* CTAボタン */}
                <div className="space-y-3">
                  <Link
                    href={`/estimate?product=${product.slug}`}
                    className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-black text-base py-4 rounded-lg transition-colors shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>
                    この商品で無料見積もり
                  </Link>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={siteConfig.lineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 bg-[#00B900] hover:bg-[#009a00] text-white font-bold text-sm py-3 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.07 9.437-6.975C23.176 14.393 24 12.458 24 10.314" /></svg>
                      LINEで写真相談
                    </a>
                    <a
                      href={siteConfig.phoneHref}
                      className="flex items-center justify-center gap-1.5 border-2 border-gray-300 text-gray-700 font-bold text-sm py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                      電話で相談
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* この商品の特徴 */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">この商品の特徴</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {product.makerLabel} {product.model} は、{getProductFeatureText(product.capacity, product.type, product.makerLabel)}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                設置タイプは{product.installationLabel}で、{product.series}シリーズのモデルです。
                本体・リモコンセット・標準取付費をすべて含んだ工事費込み税込価格{formatPrice(product.totalInTax)}円でご提供しています。
              </p>
            </div>
          </div>
        </section>

        {/* 型番SEO：型番の特徴と詳細 */}
        <section className="py-10 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{product.model}の特徴と詳細</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">

              {/* 型番の意味 */}
              <div>
                <h3 className="font-black text-gray-900 text-base mb-2">型番「{product.model}」の意味</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {product.makerLabel}の{product.model}は、{product.series}シリーズの給湯器です。
                  型番の中の数字「{product.capacity}」が給湯能力を表す<strong className="font-bold">{product.capacity}号</strong>を示しています。
                  {product.capacity}号は、水温を25℃上昇させたお湯を1分間に約{product.capacity}リットル作れる能力です。
                  あわせて、この機種は自動湯はり・追い焚きに対応した<strong className="font-bold">{product.typeLabel}タイプ</strong>で、
                  設置方式は<strong className="font-bold">{product.installationLabel}</strong>です。
                  {product.category === 'eco-jaws'
                    ? 'さらに省エネ性能の高いエコジョーズ対応機種です。'
                    : '従来型のガスふろ給湯器です。'}
                  型番ラベルには号数のほか、ガスの種類（都市ガス／LPガス）も記載されているため、交換時はガス種の確認も大切です。
                </p>
              </div>

              {/* この機種の特徴 */}
              <div>
                <h3 className="font-black text-gray-900 text-base mb-2">この機種の特徴（{product.capacity}号・{product.typeLabel}・{product.installationLabel}）</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-2">
                  {getProductFeatureText(product.capacity, product.type, product.makerLabel)}
                </p>
                <ul className="space-y-1.5">
                  {[
                    `給湯能力は${product.capacity}号。${product.capacity === 16 ? '単独使用に向いた少人数向けの号数です。' : product.capacity === 20 ? 'シャワーと洗面の同時使用に対応する標準的な号数です。' : 'シャワーとキッチンの同時使用にも余裕のある大容量です。'}`,
                    product.type === 'full-auto'
                      ? '自動湯はり・自動追い焚き・自動保温に加え、自動たし湯・配管自動洗浄まで全自動で行うフルオートタイプです。'
                      : '自動湯はり・自動追い焚き・自動保温に対応したオートタイプです。たし湯は手動操作になります。',
                    `${product.installationLabel}で、${product.installationType === 'wall-mounted' ? '戸建て・マンションを問わず広く採用されています。' : 'マンションのパイプスペースなど設置環境に合わせた方式です。'}`,
                    `リモコン（${product.remoteModel}）がセットになっています。`,
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* どんな家庭に向いているか */}
              <div>
                <h3 className="font-black text-gray-900 text-base mb-2">{product.model}はどんなご家庭に向いているか</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {product.capacity}号の{product.model}は、
                  {product.capacity === 16
                    ? '一人暮らしやご夫婦のみの1〜2人世帯に向いています。シャワー中心の使い方で、お湯の同時使用が少ないご家庭に最適です。'
                    : product.capacity === 20
                    ? '2〜3人のご家族に向いています。シャワーと洗面の同時使用に対応でき、マンション・戸建てのいずれにも採用しやすい標準的な号数です。'
                    : '4人以上のファミリー世帯に向いています。お風呂とキッチンを同時に使っても湯量・湯温が安定し、家族が続けて入浴してもお湯切れしにくいのが魅力です。'}
                  {product.type === 'full-auto'
                    ? ' フルオートタイプのため、入浴時間がバラバラなご家庭や、小さなお子さま・ご高齢の方がいるご家庭にも安心です。'
                    : ' オートタイプのため、本体価格を抑えたい方やシンプルな操作を好む方にも適しています。'}
                </p>
              </div>

              {/* 交換前に確認すること */}
              <div>
                <h3 className="font-black text-gray-900 text-base mb-2">{product.model}に交換する前に確認すること</h3>
                <ul className="space-y-1.5">
                  {[
                    '現在お使いの給湯器の型番（本体のシールに記載）',
                    `号数（この機種は${product.capacity}号）。号数を変更する場合は配管口径・ガス供給量の確認が必要です。`,
                    `タイプ（この機種は${product.typeLabel}）。給湯専用からの変更は追い焚き配管工事が必要なことがあります。`,
                    `設置タイプ（この機種は${product.installationLabel}）。設置方式を変える場合は追加工事が発生することがあります。`,
                    'ガスの種類（都市ガス／LPガス）。ガス種が異なる機種は使用できません。',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-400 mt-3">
                  型番の読み方や確認方法は <Link href="/guide/model-number" className="text-brand-600 hover:underline font-bold">給湯器の型番の見方</Link> のページもご覧ください。
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 同シリーズ・同メーカー比較表 */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">{product.makerLabel} 給湯器の比較</h2>
            <p className="text-gray-500 text-sm mb-6">
              {product.makerLabel}の号数別ラインナップを工事費込み税込価格で比較。家族構成に合わせてお選びいただけます。
            </p>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[640px]">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 border-r border-gray-100">型番</th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 border-r border-gray-100">号数</th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 border-r border-gray-100">タイプ</th>
                      <th className="px-4 py-3 text-right text-xs font-bold text-gray-900 border-r border-gray-100">工事費込み税込価格</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">向いている家族構成</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seriesProducts.map((p, i) => (
                      <tr
                        key={p.id}
                        className={`border-t border-gray-100 ${p.slug === product.slug ? 'bg-yellow-50' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      >
                        <td className="px-4 py-3 text-xs border-r border-gray-100">
                          <Link href={p.detailUrl} className={`font-bold hover:underline ${color.text}`}>{p.model}</Link>
                          {p.slug === product.slug && <span className="ml-1 text-[10px] bg-yellow-400 text-gray-900 px-1.5 py-0.5 rounded font-black">表示中</span>}
                        </td>
                        <td className="px-4 py-3 text-center font-black text-gray-900 border-r border-gray-100">{p.capacity}号</td>
                        <td className="px-4 py-3 text-center text-gray-600 text-xs border-r border-gray-100">{p.typeLabel}</td>
                        <td className="px-4 py-3 text-right font-black text-red-600 border-r border-gray-100">{formatPrice(p.totalInTax)}円</td>
                        <td className="px-4 py-3 text-gray-600 text-xs">
                          {p.capacity === 16 ? '1〜2人（一人暮らし・夫婦）' : p.capacity === 20 ? '2〜3人（標準的な家族）' : '4人以上（ファミリー）'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">※ 全て本体・リモコン・標準取付費（処分費込）を含む工事費込み税込価格です。</p>
          </div>
        </section>

        {/* 設置タイプの説明 */}
        <section className="py-10 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">設置タイプ：{product.installationLabel}</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed mb-4">{installInfo.summary}</p>
              <ul className="space-y-2 mb-4">
                {installInfo.points.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              {installInfo.note && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-xs text-yellow-700">
                  {installInfo.note}
                </div>
              )}
              <p className="text-xs text-gray-400 mt-3">
                設置タイプの詳しい解説は <Link href="/guide/installation-type" className="text-brand-600 hover:underline font-bold">給湯器の設置タイプの違い</Link> のページもご覧ください。
              </p>
            </div>
          </div>
        </section>

        {/* マンション・戸建て別の適合性 */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-black text-gray-900 mb-3">{product.model}はマンションに設置できますか？</h2>
                <div className="bg-white border border-gray-200 rounded-xl p-5 h-full">
                  <p className="text-sm text-gray-700 leading-relaxed">{getMansionFit(product.installationType)}</p>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-black text-gray-900 mb-3">{product.model}は戸建てに設置できますか？</h2>
                <div className="bg-white border border-gray-200 rounded-xl p-5 h-full">
                  <p className="text-sm text-gray-700 leading-relaxed">{getKodateFit(product.installationType)}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 工事費込み価格の内訳説明 */}
        <section className="py-10 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">工事費込み価格の内訳</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {product.model}の工事費込み税込価格は<strong className="font-bold text-red-600">{formatPrice(product.totalInTax)}円</strong>です。
                この価格には、給湯器本体・リモコン・標準工事費がすべて含まれており、追加の費用が発生しない明朗会計です。内訳は以下のとおりです。
              </p>
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-black text-sm flex-shrink-0 mt-0.5">①</span>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">本体代（{product.makerLabel} {product.model} / {product.capacity}号 {product.typeLabel}）</div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      メーカー希望小売価格{formatPrice(product.listPrice)}円のところ、{product.discountRate}%OFFの本体特価{formatPrice(product.salePrice)}円（税抜）でご提供。号数が大きいほど本体価格はやや上がる傾向があります。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-black text-sm flex-shrink-0 mt-0.5">②</span>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">リモコン代（{product.remoteModel}）</div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      台所リモコン・浴室リモコンのセットで{formatPrice(product.remoteSalePrice)}円（税抜）。取付工事費も含みます。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-black text-sm flex-shrink-0 mt-0.5">③</span>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">標準工事費（税抜{formatPrice(product.constructionFee)}円 → 税込{formatPrice(constructionFeeInTax)}円）</div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      既存給湯器の取付・配管接続・試運転などの標準作業をすべて含みます。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-black text-sm flex-shrink-0 mt-0.5">④</span>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">撤去・廃棄費用（標準工事費に含む）</div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      既存給湯器の撤去・処分費用は標準工事費に含まれており、別途請求はありません。
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="font-bold text-yellow-800 text-sm mb-2">追加費用が発生するケース</div>
                <p className="text-xs text-yellow-700 leading-relaxed">
                  配管延長・高所作業・PS扉内設置・据置台交換・号数変更に伴うガス管引き直し・特殊な設置環境などの場合は追加費用が発生することがあります。
                  いずれも事前にお見積もりでご説明し、ご確認なしに追加請求することはありません。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 関連エリアページへの内部リンク */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">横浜市・川崎市での{product.model}交換</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed mb-5">
                株式会社宝宮設備は、横浜市・川崎市・厚木市・海老名市を中心に{product.makerLabel} {product.model}（{product.capacity}号 {product.typeLabel}）の交換を自社施工で承っています。
                各エリアの給湯器交換の詳細は、以下のエリアページをご覧ください。
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {areaLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between gap-2 border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-sm font-bold text-gray-800 group-hover:text-brand-600">{link.label}</span>
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 写真見積もりCTA */}
        <section className="py-10 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">写真3点を送るだけで概算見積もり</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed mb-5">
                {product.model}への交換をご検討中の方は、現地調査の前に写真3点をお送りいただくだけで概算見積もりをご案内できます。
                LINEでの写真相談なら、最短即日で工事費込みの概算金額をお伝えします。
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { n: '1', title: '給湯器本体の正面写真', desc: '本体全体が分かるように正面から撮影してください。設置状況の把握に使います。' },
                  { n: '2', title: '型番ラベルの写真', desc: '本体前面・側面のシールに記載された型番を撮影。号数・ガス種・設置タイプを確認します。' },
                  { n: '3', title: '設置場所周辺の写真', desc: '配管・ガス管の取り回しや周囲のスペースが分かる写真。追加工事の有無を判断します。' },
                ].map((step) => (
                  <div key={step.n} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <div className="w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-black text-sm mb-3">{step.n}</div>
                    <h3 className="font-black text-gray-900 text-sm mb-2">{step.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={siteConfig.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#00B900] hover:bg-[#009a00] text-white font-bold text-sm py-3 px-6 rounded-lg transition-colors flex-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.07 9.437-6.975C23.176 14.393 24 12.458 24 10.314" /></svg>
                  LINEで写真を送って相談
                </a>
                <Link
                  href={`/estimate?product=${product.slug}`}
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm py-3 px-6 rounded-lg transition-colors flex-1"
                >
                  フォームから無料見積もり
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* この号数が向いているご家庭 */}
        <section className="py-10 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">この号数（{product.capacity}号）が向いているご家庭</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-black text-blue-900">{product.capacity}号</span>
                <span className="text-xs font-bold text-blue-700 bg-blue-100 rounded px-2 py-0.5">{getCapacityLabel(product.capacity)}</span>
              </div>
              <p className="text-sm text-blue-800 leading-relaxed mb-4">{getCapacityDescription(product.capacity)}</p>
              <ul className="space-y-2">
                {(product.capacity === 16
                  ? ['一人暮らし・ご夫婦のみの世帯', 'シャワー中心でお湯の同時使用が少ない方', '設置スペースを抑えたい方']
                  : product.capacity === 20
                  ? ['2〜3人のご家族', 'シャワーと台所を同時に使うことがある方', 'バランスの取れた号数を選びたい方']
                  : ['4人以上のご家族', 'お風呂とキッチンを同時に使うことが多い方', '続けて入浴してもお湯切れを避けたい方']
                ).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 交換前に確認すること */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">交換前に確認すること</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <ul className="space-y-2">
                {checkBeforeItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* シリーズ料金比較表 */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">
              {product.makerLabel} {product.series} シリーズ 料金一覧
            </h2>
            <p className="text-gray-500 text-sm mb-6">すべて工事費込み税込価格（リモコン・標準取付費含む）</p>

            {/* オートタイプ */}
            {seriesAuto.length > 0 && (
              <div className="mb-6">
                <div className={`text-xs font-black text-white px-3 py-1.5 inline-block rounded-t-lg ${color.bg}`}>
                  オートタイプ
                </div>
                <div className="bg-white border border-gray-200 rounded-b-xl rounded-tr-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[600px]">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 border-r border-gray-100">号数</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 border-r border-gray-100">型番</th>
                          <th className="px-4 py-3 text-right text-xs font-bold text-gray-400 border-r border-gray-100">メーカー希望小売価格</th>
                          <th className="px-4 py-3 text-center text-xs font-bold text-red-600 border-r border-gray-100">割引</th>
                          <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 border-r border-gray-100">本体特価</th>
                          <th className="px-4 py-3 text-right text-xs font-bold text-gray-900">工事費込み税込</th>
                        </tr>
                      </thead>
                      <tbody>
                        {seriesAuto.map((p, i) => (
                          <tr
                            key={p.id}
                            className={`border-t border-gray-100 ${p.slug === product.slug ? 'bg-yellow-50' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                          >
                            <td className="px-4 py-3 font-black text-gray-900 border-r border-gray-100">
                              {p.capacity}号
                              {p.slug === product.slug && <span className="ml-1 text-[10px] bg-yellow-400 text-gray-900 px-1.5 py-0.5 rounded font-black">選択中</span>}
                            </td>
                            <td className="px-4 py-3 text-gray-600 text-xs border-r border-gray-100">
                              <Link href={p.detailUrl} className={`hover:underline ${color.text}`}>{p.model}</Link>
                            </td>
                            <td className="px-4 py-3 text-right text-gray-400 text-xs line-through border-r border-gray-100">{formatPrice(p.listPrice)}円</td>
                            <td className="px-4 py-3 text-center border-r border-gray-100">
                              <span className="text-red-600 font-black text-xs">{p.discountRate}%OFF</span>
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-gray-800 border-r border-gray-100">{formatPrice(p.salePrice)}円</td>
                            <td className="px-4 py-3 text-right font-black text-red-600">{formatPrice(p.totalInTax)}円</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* フルオートタイプ */}
            {seriesFullAuto.length > 0 && (
              <div>
                <div className={`text-xs font-black text-white px-3 py-1.5 inline-block rounded-t-lg ${color.bg}`}>
                  フルオートタイプ
                </div>
                <div className="bg-white border border-gray-200 rounded-b-xl rounded-tr-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[600px]">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 border-r border-gray-100">号数</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 border-r border-gray-100">型番</th>
                          <th className="px-4 py-3 text-right text-xs font-bold text-gray-400 border-r border-gray-100">メーカー希望小売価格</th>
                          <th className="px-4 py-3 text-center text-xs font-bold text-red-600 border-r border-gray-100">割引</th>
                          <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 border-r border-gray-100">本体特価</th>
                          <th className="px-4 py-3 text-right text-xs font-bold text-gray-900">工事費込み税込</th>
                        </tr>
                      </thead>
                      <tbody>
                        {seriesFullAuto.map((p, i) => (
                          <tr
                            key={p.id}
                            className={`border-t border-gray-100 ${p.slug === product.slug ? 'bg-yellow-50' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                          >
                            <td className="px-4 py-3 font-black text-gray-900 border-r border-gray-100">
                              {p.capacity}号
                              {p.slug === product.slug && <span className="ml-1 text-[10px] bg-yellow-400 text-gray-900 px-1.5 py-0.5 rounded font-black">選択中</span>}
                            </td>
                            <td className="px-4 py-3 text-gray-600 text-xs border-r border-gray-100">
                              <Link href={p.detailUrl} className={`hover:underline ${color.text}`}>{p.model}</Link>
                            </td>
                            <td className="px-4 py-3 text-right text-gray-400 text-xs line-through border-r border-gray-100">{formatPrice(p.listPrice)}円</td>
                            <td className="px-4 py-3 text-center border-r border-gray-100">
                              <span className="text-red-600 font-black text-xs">{p.discountRate}%OFF</span>
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-gray-800 border-r border-gray-100">{formatPrice(p.salePrice)}円</td>
                            <td className="px-4 py-3 text-right font-black text-red-600">{formatPrice(p.totalInTax)}円</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            <p className="text-xs text-gray-400 mt-3">※ リモコン（{product.remoteModel}）および標準取付費（処分費込）を含む税込価格</p>
          </div>
        </section>

        {/* 標準工事費に含まれる内容 */}
        <section className="py-10 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">標準取付費（{formatPrice(product.constructionFee)}円・税抜）に含まれる作業</h2>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-brand-900 text-white p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <div className="font-black text-lg">標準取付費（処分費込）</div>
                  <div className="text-blue-200 text-sm">以下の作業がすべて含まれます</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-3xl font-black">{formatPrice(product.constructionFee)}円</div>
                  <div className="text-blue-200 text-sm">税抜 / 税込 {formatPrice(Math.round(product.constructionFee * 1.1))}円</div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
                  {constructionFeeItems.map((item) => (
                    <div key={item} className="flex items-center gap-1.5 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="font-bold text-yellow-800 text-sm mb-2">追加費用が発生するケース</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {additionalFeeItems.map((item) => (
                      <div key={item} className="text-xs text-yellow-700">・{item}</div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-yellow-600">※ 追加費用が発生する場合は、事前にご説明・お見積もりを行います。</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* オート・フルオートの説明 */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">オートとフルオートの違い</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className={`rounded-xl p-5 border-2 ${product.type === 'auto' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-600 text-white text-xs font-black px-2.5 py-1 rounded">オート</span>
                  {product.type === 'auto' && <span className="text-blue-600 text-xs font-bold">← この商品</span>}
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    自動湯はり（設定量まで自動で止まる）
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    自動追い焚き（ボタン操作で設定温度へ）
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    <span className="text-gray-400">自動保温（手動での追い焚きが必要）</span>
                  </li>
                </ul>
              </div>
              <div className={`rounded-xl p-5 border-2 ${product.type === 'full-auto' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-700 text-white text-xs font-black px-2.5 py-1 rounded">フルオート</span>
                  {product.type === 'full-auto' && <span className="text-blue-600 text-xs font-bold">← この商品</span>}
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    自動湯はり
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    自動追い焚き
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    自動保温・自動足し湯（温度が下がると自動加熱）
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* こんな方におすすめ */}
        <section className="py-10 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">こんな方におすすめ</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  icon: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                  title: `${product.capacity}号が適した世帯`,
                  desc: product.capacity === 16 ? '1〜2人の少人数世帯。シャワーや台所など同時使用が少ない方。' : product.capacity === 20 ? '2〜4人の標準的な家族世帯。シャワーと台所の同時使用が主な使い方。' : '4人以上の大家族。複数箇所での同時使用が多い方。',
                },
                {
                  icon: <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>,
                  title: product.type === 'auto' ? 'オートで十分な方' : 'フルオートの利便性を求める方',
                  desc: product.type === 'auto' ? '追い焚きはボタン操作でOK。手動での操作に慣れている方。費用を抑えたい方。' : '湯温管理を自動化したい方。忙しい共働き世帯・高齢者のいるご家庭に最適。',
                },
                {
                  icon: <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>,
                  title: '設置タイプ',
                  desc: `${product.installationLabel}。壁に直接取り付けるタイプで、戸建て・マンション問わず広く採用されています。`,
                },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-3 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="font-black text-gray-900 text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 保証について */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">保証について</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white border border-blue-200 rounded-xl p-5">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                </div>
                <h3 className="font-black text-gray-900 mb-1">メーカー保証</h3>
                <p className="text-sm text-gray-600">{product.warranty}対応。機器本体の製品保証。</p>
              </div>
              <div className="bg-white border border-green-200 rounded-xl p-5">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" /></svg>
                </div>
                <h3 className="font-black text-gray-900 mb-1">工事保証</h3>
                <p className="text-sm text-gray-600">施工部分の不具合は迅速に対応。宝宮設備の自社施工による保証。</p>
              </div>
              <div className="bg-white border border-yellow-200 rounded-xl p-5">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                </div>
                <h3 className="font-black text-gray-900 mb-1">アフターサポート</h3>
                <p className="text-sm text-gray-600">{siteConfig.hours}。工事後の不具合もお気軽にご連絡ください。</p>
              </div>
            </div>
          </div>
        </section>

        {/* 関連商品 */}
        {related.length > 0 && (
          <section className="py-12 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-xl font-black text-gray-900 mb-6">
                {product.makerLabel}の他の商品
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              <div className="text-center mt-6">
                <Link
                  href={makerPage}
                  className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  {product.makerLabel}の全商品を見る
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* 対応エリア */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">対応エリア</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-gray-600 text-sm mb-4">
                株式会社宝宮設備は以下のエリアを中心に自社施工で対応しています。
                エリア外の場合もお気軽にご相談ください。
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {siteConfig.areas.map((area) => (
                  <span key={area} className="bg-brand-50 border border-brand-200 text-brand-700 font-bold text-sm px-3 py-1.5 rounded-lg">
                    {area}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400">※ 記載エリア以外もご相談可能です。まずはお問い合わせください。</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">よくある質問</h2>
            <FaqAccordion faqs={faqs} />
          </div>
        </section>

        {/* 見積もりCTA */}
        <section className={`py-14 text-white ${color.bg}`}>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-black mb-3">{product.model} の交換はお任せください</h2>
            <p className="text-white/80 text-sm mb-2">工事費込み税込価格</p>
            <div className="text-4xl font-black mb-6">{formatPrice(product.totalInTax)}<span className="text-2xl">円</span></div>
            <p className="mb-8 text-white/80 text-sm">写真を送るだけで最短即日でお見積もり。{siteConfig.hours}受付。</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/estimate?product=${product.slug}`}
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-lg px-8 py-4 rounded-lg shadow-lg transition-colors w-full sm:w-auto justify-center"
              >
                無料見積もりを依頼する
              </Link>
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-black text-lg px-8 py-4 rounded-lg transition-colors w-full sm:w-auto justify-center"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}
