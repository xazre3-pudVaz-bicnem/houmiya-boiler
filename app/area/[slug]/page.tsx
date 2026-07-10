import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import FaqAccordion from '@/components/FaqAccordion'
import ProductCard from '@/components/ProductCard'
import { getProductsByMaker, getProductBySlug } from '@/data/products'
import { casesData } from '@/data/cases'
import { siteConfig } from '@/data/site'
import { areaConfigs } from '@/data/area-configs'

export async function generateStaticParams() {
  return Object.entries(areaConfigs)
    .filter(([, config]) => config.show !== false)
    .map(([slug]) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const config = areaConfigs[slug]
  if (!config) return {}
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: { canonical: config.canonical },
    openGraph: { title: config.metaTitle, description: config.metaDescription, locale: 'ja_JP', type: 'website' },
  }
}

const featuredProducts = [
  ...getProductsByMaker('rinnai').filter((p) => p.capacity === 24 && p.type === 'auto').slice(0, 1),
  ...getProductsByMaker('noritz').filter((p) => p.capacity === 24 && p.type === 'auto').slice(0, 1),
  ...getProductsByMaker('paloma').filter((p) => p.capacity === 24 && p.type === 'auto').slice(0, 1),
]

const includedItems = [
  '既存給湯器の撤去・廃棄処分',
  '新規給湯器の搬入・設置・取付',
  'リモコンの取付・配線',
  '給水管・給湯管の接続',
  'ガス管の接続・圧力確認',
  '配管の保温処理',
  '試運転・ガス漏れ確認',
  '使用方法の説明',
]

const estimateSteps = [
  { step: '01', title: 'お問い合わせ', body: '電話・LINE・フォームからご連絡ください。給湯器の写真があればよりスムーズです。' },
  { step: '02', title: 'お見積もり', body: '写真確認または現地確認後、最短即日でお見積もりをご提示。費用は無料です。' },
  { step: '03', title: '工事日時の確定', body: 'ご納得いただけたら工事日時を調整。最短翌日から対応可能な場合があります。' },
  { step: '04', title: '工事・アフター対応', body: '既存給湯器の撤去・取付・試運転まで一貫対応。工事後の保証も充実。' },
]

const commonSymptoms = [
  { title: 'お湯が出ない', desc: '点火不良やガス供給の問題が考えられます。エラーコードも確認してください。' },
  { title: 'エラーコードが表示されている', desc: '型番とエラーコードを確認のうえご連絡ください。対応機種ならすぐ原因を確認できます。' },
  { title: '追い炊きができない', desc: '追い炊き機能の不具合または熱交換器の劣化が考えられます。' },
  { title: 'お湯の温度が安定しない', desc: '温度センサーや水量センサーの不具合が原因であることが多いです。' },
  { title: '給湯器から異音・異臭がする', desc: '内部部品の劣化や燃焼不良が疑われます。使用を一時中断してご連絡ください。' },
  { title: 'お湯がほとんど出ない', desc: '水量不足や配管詰まりの可能性があります。号数が少ない場合も考えられます。' },
  { title: '給湯器周りから水漏れがある', desc: '配管や本体の劣化が考えられます。早めの確認をおすすめします。' },
  { title: 'リモコンが正常に動作しない', desc: 'リモコンの故障または本体との通信不良が考えられます。' },
]

const installTypes = [
  { type: '壁掛屋外型', feature: '屋外の壁に設置する標準タイプ', home: '戸建て住宅' },
  { type: '据置型', feature: '屋外に据え置くタイプ', home: '戸建て住宅' },
  { type: 'PS標準設置型', feature: 'マンションのPS（パイプシャフト）内設置', home: 'マンション' },
  { type: 'PS扉内設置型', feature: 'PSの扉の内側に設置するタイプ', home: 'マンション' },
  { type: '屋内設置型', feature: '室内（浴室・洗面所等）に設置', home: '一部マンション・アパート' },
  { type: '給湯専用型', feature: '追い炊きなしの給湯のみタイプ', home: 'アパート・賃貸' },
]

const capacityRows = [
  { go: '16号', family: '一人暮らし向け', use: 'シャワー中心・同時使用が少ない', badge: 'bg-gray-100 text-gray-700' },
  { go: '20号', family: '2〜3人家族向け', use: 'キッチンとシャワーを順番に使う', badge: 'bg-blue-50 text-blue-700' },
  { go: '24号', family: '4人以上の家族向け', use: 'お風呂とキッチンの同時使用が多い', badge: 'bg-blue-100 text-brand-700' },
]

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const config = areaConfigs[slug]
  if (!config) notFound()

  const allFaqs = [...config.faqs, ...(config.additionalFaqs || [])]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((f) => ({
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
      { '@type': 'ListItem', position: 2, name: '対応エリア', item: 'https://www.houmiya-boiler.com/area' },
      { '@type': 'ListItem', position: 3, name: `${config.name}の給湯器交換`, item: config.canonical },
    ],
  }

  // 対応エリア（市＋全区）を areaServed として列挙し、地域SEOシグナルを強化
  const areaServed =
    config.wards && config.wards.length > 0
      ? [
          { '@type': 'City', name: config.name },
          ...config.wards.map((w) => ({ '@type': 'AdministrativeArea', name: `${config.name}${w}` })),
        ]
      : { '@type': 'City', name: config.name }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${config.name}の給湯器交換・販売`,
    serviceType: '給湯器交換工事',
    description: config.metaDescription,
    // 事業者はサイト共通のLocalBusiness（#business）を@id参照し、エンティティを統合
    provider: { '@id': 'https://www.houmiya-boiler.com/#business' },
    areaServed,
  }

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.houmiya-boiler.com/#business',
    name: siteConfig.name,
    telephone: siteConfig.phone,
    url: 'https://www.houmiya-boiler.com',
    image: 'https://www.houmiya-boiler.com/og-image.png',
    hasMap: 'https://maps.google.com/?q=神奈川県厚木市温水西1-4-39',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '温水西1-4-39',
      addressLocality: '厚木市',
      addressRegion: '神奈川県',
      postalCode: '243-0039',
      addressCountry: 'JP',
    },
    openingHours: 'Mo,Tu,We,Th,Fr,Sa,Su 09:00-18:00',
    areaServed,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <Header />
      <main className="pt-[100px]">

        {/* ① ファーストビュー */}
        <section className="bg-brand-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <nav className="flex items-center gap-3 mb-4 text-sm flex-wrap" aria-label="パンくずリスト">
              <Link href="/" className="text-blue-200 hover:text-white">トップ</Link>
              <span className="text-blue-400">›</span>
              <Link href="/area" className="text-blue-200 hover:text-white">対応エリア</Link>
              <span className="text-blue-400">›</span>
              <span>{config.name}</span>
            </nav>
            <h1 className="text-3xl font-black mb-3">{config.name}の給湯器交換・販売</h1>
            <p className="text-blue-100 text-sm mb-5 max-w-3xl leading-relaxed">
              {config.lpLeadText || `${config.name}で給湯器交換・販売なら株式会社宝宮設備。リンナイ・ノーリツ・パロマ対応。戸建て・マンション・アパート対応。工事費込み価格で無料見積もり受付中。`}
            </p>
            {config.wards && (
              <p className="text-blue-200 text-xs mb-4">対応エリア：{config.name}全{config.wards.length}区</p>
            )}
            <div className="flex flex-wrap gap-3">
              <a href={siteConfig.phoneHref} className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-base px-5 py-2.5 rounded-lg transition-colors">
                {siteConfig.phone}
              </a>
              <Link href="/estimate" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black text-base px-5 py-2.5 rounded-lg transition-colors">
                無料見積もりを依頼する
              </Link>
              <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white font-bold text-base px-5 py-2.5 rounded-lg transition-colors" style={{ backgroundColor: '#00B900' }}>
                LINEで写真を送って相談
              </a>
            </div>
          </div>
        </section>

        {/* 目次 */}
        {config.sections && config.sections.length > 0 && (
          <section className="py-5 bg-gray-50 border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4">
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <p className="text-xs font-black text-gray-700 mb-3 uppercase tracking-wider">目次</p>
                <ol className="space-y-1.5 list-decimal list-inside columns-2">
                  {config.targetPersonas && <li><a href="#target" className="text-xs text-brand-700 hover:underline">{config.name}で交換を検討している方へ</a></li>}
                  {config.housingTypeGuide && <li><a href="#housing" className="text-xs text-brand-700 hover:underline">住宅タイプ別ガイド</a></li>}
                  {config.installTypeDetails && <li><a href="#install-type" className="text-xs text-brand-700 hover:underline">設置タイプ別ガイド</a></li>}
                  {config.capacityComparisonRows && <li><a href="#capacity" className="text-xs text-brand-700 hover:underline">号数の選び方</a></li>}
                  {config.makerGuide && <li><a href="#makers" className="text-xs text-brand-700 hover:underline">対応メーカー・人気の機種</a></li>}
                  {config.repairVsReplace && <li><a href="#repair-replace" className="text-xs text-brand-700 hover:underline">修理と交換の判断</a></li>}
                  {config.troubleLinks && <li><a href="#trouble-links" className="text-xs text-brand-700 hover:underline">よくあるトラブル症状</a></li>}
                  {config.photoEstimatePhotos && <li><a href="#estimate-photo" className="text-xs text-brand-700 hover:underline">写真見積もりの流れ</a></li>}
                  {config.workflowSteps && <li><a href="#workflow-steps" className="text-xs text-brand-700 hover:underline">工事当日の流れ</a></li>}
                  <li><a href="#city-cases" className="text-xs text-brand-700 hover:underline">施工事例</a></li>
                  {config.wardsGuide && <li><a href="#wards-guide" className="text-xs text-brand-700 hover:underline">区・エリア別対応案内</a></li>}
                  {config.sections.map((s, i) => (
                    <li key={i}>
                      <a href={`#section-area-${i}`} className="text-xs text-brand-700 hover:underline">{s.heading}</a>
                    </li>
                  ))}
                  <li><a href="#area-faq" className="text-xs text-brand-700 hover:underline">よくある質問</a></li>
                </ol>
              </div>
            </div>
          </section>
        )}

        {/* 対応区バッジ */}
        {config.wards && (
          <section className="py-6 bg-white border-b">
            <div className="max-w-6xl mx-auto px-4">
              <p className="text-sm font-bold text-gray-700 mb-3">{config.name}の対応エリア（全{config.wards.length}区）</p>
              <div className="flex flex-wrap gap-2">
                {config.wards.map((w) => (
                  <span key={w} className="text-xs bg-blue-50 border border-blue-200 text-brand-700 px-3 py-1.5 rounded-lg font-medium">{w}</span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ② エリア専用の導入文 */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.name}での給湯器交換について</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">{config.intro1}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{config.intro2}</p>
            </div>
            {config.allWardText && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 mt-4">
                <h3 className="font-black text-gray-900 mb-3 text-base">{config.name}の地域・住宅傾向</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{config.allWardText}</p>
              </div>
            )}
          </div>
        </section>

        {/* ③ このエリアで給湯器交換を検討している方へ */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.name}で給湯器交換を検討している方へ</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <p className="text-gray-700 text-sm leading-relaxed">{config.targetText}</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { title: '電話で相談', body: '直接ご質問・症状のご相談ができます。', cta: siteConfig.phone, href: siteConfig.phoneHref, ext: false },
                { title: 'LINEで写真を送る', body: '給湯器の写真を送るだけで概算見積もりが可能。', cta: 'LINEで相談する', href: siteConfig.lineUrl, ext: true },
                { title: 'フォームで見積もり依頼', body: '24時間受付中。写真の添付も可能です。', cta: '無料見積もりを依頼する', href: '/estimate', ext: false },
              ].map((item) => (
                <a key={item.title} href={item.href} {...(item.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm hover:border-blue-200 transition-all group block">
                  <div className="font-black text-gray-900 text-sm mb-1">{item.title}</div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-2">{item.body}</p>
                  <span className="text-xs font-bold text-brand-700 group-hover:text-brand-900">{item.cta} →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* LP: ターゲットペルソナ */}
        {config.targetPersonas && config.targetPersonas.length > 0 && (
          <section id="target" className="py-12 bg-white scroll-mt-28">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-2xl font-black text-gray-900 mb-2">{config.name}で給湯器交換を検討している方へ</h2>
              <p className="text-sm text-gray-500 mb-8">以下のようなお悩み・ご状況の方からのご相談を多くいただいています。</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {config.targetPersonas.map((p) => (
                  <div key={p.title} className="border border-blue-200 rounded-xl p-5 bg-blue-50">
                    <p className="font-black text-brand-900 mb-2 flex items-start gap-2">
                      <span className="text-brand-600 flex-shrink-0">{p.icon}</span>
                      <span>{p.title}</span>
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* LP: 住宅タイプ別ガイド */}
        {config.housingTypeGuide && config.housingTypeGuide.length > 0 && (
          <section id="housing" className="py-12 bg-gray-50 scroll-mt-28">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-2xl font-black text-gray-900 mb-2">{config.name}の住宅タイプ別 給湯器交換ガイド</h2>
              <p className="text-sm text-gray-500 mb-8">戸建て・マンション・賃貸物件それぞれの特徴と注意点をご案内します。</p>
              <div className="space-y-4">
                {config.housingTypeGuide.map((h) => (
                  <div key={h.type} className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="font-black text-gray-900 text-lg mb-3">{config.name}の{h.type}での給湯器交換</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{h.desc}</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-black text-gray-500 mb-2 uppercase tracking-wider">多い設置タイプ</p>
                        <div className="flex flex-wrap gap-2">
                          {h.commonInstallTypes.map((t) => (
                            <span key={t} className="text-xs bg-blue-50 border border-blue-200 text-brand-700 px-2.5 py-1 rounded-lg font-medium">{t}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-500 mb-2 uppercase tracking-wider">確認ポイント</p>
                        <ul className="space-y-1">
                          {h.notes.map((n) => (
                            <li key={n} className="flex items-start gap-2 text-xs text-gray-600">
                              <svg className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              {n}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* LP: 設置タイプ別ガイド */}
        {config.installTypeDetails && config.installTypeDetails.length > 0 && (
          <section id="install-type" className="py-12 bg-white scroll-mt-28">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-2xl font-black text-gray-900 mb-2">{config.name}の設置タイプ別ガイド</h2>
              <p className="text-sm text-gray-500 mb-8">設置タイプによって適合する機種や工事内容が変わります。それぞれの特徴をご案内します。</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {config.installTypeDetails.map((it) => (
                  <div key={it.type} className="border border-gray-200 rounded-xl p-5">
                    <h3 className="font-black text-gray-900 text-base mb-2">{it.type}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{it.desc}</p>
                    <p className="text-xs text-gray-500 mb-2"><span className="font-bold">多い住宅：</span>{it.commonIn}</p>
                    <ul className="space-y-1">
                      {it.notes.map((n) => (
                        <li key={n} className="flex items-start gap-2 text-xs text-gray-600">
                          <span className="text-brand-400 flex-shrink-0">・</span>{n}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* LP: 号数の選び方（比較表） */}
        {config.capacityComparisonRows && config.capacityComparisonRows.length > 0 && (
          <section id="capacity" className="py-12 bg-gray-50 scroll-mt-28">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-2xl font-black text-gray-900 mb-2">{config.name}での号数の選び方</h2>
              <p className="text-sm text-gray-500 mb-6">号数は1分間に沸かせるお湯の量の目安です。{config.name}の住宅傾向に合わせて比較しました。</p>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-brand-700 text-white">
                    <tr>
                      <th scope="col" className="p-3 text-left border border-brand-600 font-bold">項目</th>
                      <th scope="col" className="p-3 text-center border border-brand-600 font-bold">16号</th>
                      <th scope="col" className="p-3 text-center border border-brand-600 font-bold">20号</th>
                      <th scope="col" className="p-3 text-center border border-brand-600 font-bold">24号</th>
                    </tr>
                  </thead>
                  <tbody>
                    {config.capacityComparisonRows.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        {row.map((cell, j) => (
                          <td key={j} className={`p-3 border border-gray-200 text-sm ${j === 0 ? 'font-bold text-gray-800' : 'text-gray-600 text-center'}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link href="/guide/capacity" className="text-sm font-bold text-brand-700 hover:underline mt-4 inline-block">号数の選び方 詳しく見る →</Link>
            </div>
          </section>
        )}

        {/* LP: 対応メーカー + 商品カード */}
        {config.makerGuide && config.makerGuide.length > 0 && (
          <section id="makers" className="py-12 bg-white scroll-mt-28">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-2xl font-black text-gray-900 mb-2">{config.name}で対応している給湯器メーカー</h2>
              <p className="text-sm text-gray-500 mb-8">リンナイ・ノーリツ・パロマの主要3メーカーを工事費込み価格で取り扱っています。</p>
              <div className="space-y-10">
                {config.makerGuide.map((maker) => {
                  const makerProducts = maker.productSlugs
                    .map((s) => getProductBySlug(s))
                    .filter((p): p is NonNullable<typeof p> => Boolean(p))
                  return (
                    <div key={maker.maker}>
                      <h3 className="font-black text-gray-900 text-lg mb-1">{maker.maker}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4 max-w-3xl">{maker.desc}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                        {makerProducts.map((product) => (
                          <Link href={`/products/${product.slug}`} key={product.slug} className="block border border-gray-200 rounded-xl p-4 hover:border-brand-400 transition-colors">
                            <p className="font-bold text-sm text-gray-900 mb-1">{product.model}</p>
                            <p className="text-brand-700 font-black text-lg">{product.totalInTax.toLocaleString()}円<span className="text-xs font-bold">（税込）</span></p>
                            <p className="text-xs text-gray-500 mt-1">{product.capacity}号 / {product.typeLabel} / {product.installationLabel}</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">本体＋リモコン＋標準工事費込み</p>
                          </Link>
                        ))}
                      </div>
                      <Link href={maker.makerHref} className="text-sm text-brand-700 font-bold hover:underline">
                        {maker.maker}製品をすべて見る →
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* ④ 対応できる給湯器の種類 */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.name}で対応できる給湯器の設置タイプ</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-900 text-white">
                    <th scope="col" className="px-4 py-3 text-left font-bold">設置タイプ</th>
                    <th scope="col" className="px-4 py-3 text-left font-bold">特徴</th>
                    <th scope="col" className="px-4 py-3 text-left font-bold">多い住宅</th>
                  </tr>
                </thead>
                <tbody>
                  {installTypes.map((row, i) => (
                    <tr key={row.type} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-bold text-gray-800">{row.type}</td>
                      <td className="px-4 py-3 text-gray-600">{row.feature}</td>
                      <td className="px-4 py-3 text-gray-500">{row.home}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ⑤⑥⑦ 戸建て・マンション・アパート */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">{config.name}の住宅タイプ別 給湯器交換</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-black text-gray-900 mb-3 text-base">
                  {config.name}の戸建て給湯器交換
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{config.detachedNote}</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-black text-gray-900 mb-3 text-base">
                  {config.name}のマンション給湯器交換
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{config.mansionNote}</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-black text-gray-900 mb-3 text-base">
                  {config.name}のアパート・賃貸物件の給湯器交換
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{config.rentalNote}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ⑧ 対応メーカー */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.name}で対応できる給湯器メーカー</h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-3">
              {[
                { name: 'リンナイ', href: '/rinnai', desc: '国内シェアNo.1。RUF-Aシリーズのオート・フルオート・エコジョーズを取り扱い。', color: 'border-red-200 bg-red-50', text: 'text-red-700' },
                { name: 'ノーリツ', href: '/noritz', desc: 'GT-C70シリーズ。エコジョーズシリーズも豊富で省エネ志向の方に人気。', color: 'border-blue-200 bg-blue-50', text: 'text-blue-700' },
                { name: 'パロマ', href: '/paloma', desc: 'FH-Eシリーズ。シンプルな操作性とコストパフォーマンスで選ばれやすい。', color: 'border-indigo-200 bg-indigo-50', text: 'text-indigo-700' },
              ].map((m) => (
                <Link key={m.name} href={m.href} className={`block border rounded-xl p-5 hover:shadow-sm transition-shadow ${m.color}`}>
                  <div className={`font-black text-base mb-2 ${m.text}`}>{m.name}</div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-2">{m.desc}</p>
                  <span className={`text-xs font-bold ${m.text}`}>{m.name}の一覧を見る →</span>
                </Link>
              ))}
            </div>
            <p className="text-xs text-gray-500">現在お使いのメーカーへの同型交換も、別メーカーへの変更も対応できます。</p>
          </div>
        </section>

        {/* ⑨ 号数の選び方 */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">{config.name}での給湯器 号数の選び方</h2>
            <p className="text-gray-500 text-sm mb-4">号数は1分間に作れるお湯の量を表す目安です。お風呂とキッチンを同時に使うことが多いご家庭では、少し余裕のある号数がおすすめです。</p>
            <div className="overflow-x-auto rounded-xl border border-gray-200 mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-900 text-white">
                    <th scope="col" className="px-4 py-3 text-left font-bold">号数</th>
                    <th scope="col" className="px-4 py-3 text-left font-bold">家族構成の目安</th>
                    <th scope="col" className="px-4 py-3 text-left font-bold">向いている使い方</th>
                  </tr>
                </thead>
                <tbody>
                  {capacityRows.map((row, i) => (
                    <tr key={row.go} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3">
                        <span className={`inline-block text-xs font-black px-2.5 py-1 rounded ${row.badge}`}>{row.go}</span>
                      </td>
                      <td className="px-4 py-3 font-bold text-gray-800">{row.family}</td>
                      <td className="px-4 py-3 text-gray-600">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link href="/guide/capacity" className="text-sm font-bold text-brand-700 hover:underline">号数の選び方 詳しく見る →</Link>
          </div>
        </section>

        {/* ⑩ エコジョーズ */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.name}でのエコジョーズ給湯器対応</h2>
            <div className="bg-white border border-green-200 rounded-xl p-6 mb-4">
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{config.ecoNote}</p>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                {[
                  { label: '省エネ効果', value: 'ガス代を約10〜15%削減しやすい' },
                  { label: '本体価格', value: '従来型より高め（長期的にコスト回収）' },
                  { label: '追加工事', value: 'ドレン排水工事が必要な場合あり' },
                  { label: 'マンション', value: '設置条件・管理規約の確認が必要' },
                ].map((item) => (
                  <div key={item.label} className="flex gap-2">
                    <span className="font-bold text-gray-700 flex-shrink-0 w-20">{item.label}：</span>
                    <span className="text-gray-600">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <Link href="/guide/eco-jaws" className="text-sm font-bold text-green-700 hover:underline">エコジョーズについて詳しく見る →</Link>
          </div>
        </section>

        {/* ⑪⑫ 工事費込み価格・標準工事費に含まれる内容 */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.name}での給湯器交換 工事費込み価格について</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                宝宮設備では、給湯器本体・リモコン・標準取付費を含めた工事費込み価格をご提示しています。実際の金額は、設置状況・配管状態・排気方式・追加部材の有無により変わる場合があります。正式なお見積もりは、写真確認または現地確認後にご案内します。
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-xs font-bold text-gray-500 mb-1">標準工事費（税抜）</div>
                  <div className="text-2xl font-black text-brand-900">{siteConfig.constructionFeeDisplay}</div>
                  <div className="text-xs text-gray-400 mt-0.5">撤去・取付・試運転・説明含む</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-xs font-bold text-gray-500 mb-1">工事費込み税込の目安</div>
                  <div className="text-sm font-black text-red-600 leading-tight">給湯器本体 + 工事費 + リモコン</div>
                  <div className="text-xs text-gray-400 mt-1">正式金額は写真確認後にご案内します</div>
                </div>
              </div>
            </div>
            <h3 className="font-black text-gray-900 mb-3 text-base">標準工事費に含まれる内容</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {includedItems.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LP: 修理 vs 交換 */}
        {config.repairVsReplace && (
          <section id="repair-replace" className="py-12 bg-gray-50 scroll-mt-28">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-2xl font-black text-gray-900 mb-2">{config.name}で給湯器が故障｜修理と交換の判断</h2>
              <p className="text-sm text-gray-500 mb-6">使用年数や症状の出方によって、修理で済むケースと交換を検討すべきケースが分かれます。</p>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th scope="col" className="p-3 text-left border border-gray-600 font-bold w-1/2">修理で対応できる可能性があるケース</th>
                      <th scope="col" className="p-3 text-left border border-gray-600 font-bold w-1/2">交換を検討すべきケース</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: Math.max(config.repairVsReplace.repairOk.length, config.repairVsReplace.replaceRecommended.length) }).map((_, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3 border border-gray-200 text-gray-700 align-top">{config.repairVsReplace?.repairOk[i] || ''}</td>
                        <td className="p-3 border border-gray-200 text-gray-700 align-top">{config.repairVsReplace?.replaceRecommended[i] || ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link href="/guide/lifespan" className="text-sm font-bold text-brand-700 hover:underline mt-4 inline-block">給湯器の寿命について詳しく見る →</Link>
            </div>
          </section>
        )}

        {/* LP: 中間CTA */}
        <section className="py-10 bg-brand-900 text-white text-center">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-lg font-black mb-4">{config.name}の給湯器交換、まずは無料見積もりから</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/estimate" className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black px-6 py-3 rounded-lg transition-colors w-full sm:w-auto">無料見積もりを依頼する</Link>
              <a href={siteConfig.phoneHref} className="bg-white/20 hover:bg-white/30 text-white font-black px-6 py-3 rounded-lg transition-colors w-full sm:w-auto">{siteConfig.phone}</a>
              <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className="text-white font-bold px-6 py-3 rounded-lg transition-colors w-full sm:w-auto" style={{ backgroundColor: '#00B900' }}>LINEで写真を送る</a>
            </div>
          </div>
        </section>

        {/* LP: よくあるトラブル症状 */}
        {config.troubleLinks && config.troubleLinks.length > 0 && (
          <section id="trouble-links" className="py-12 bg-white scroll-mt-28">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-2xl font-black text-gray-900 mb-2">{config.name}でよくある給湯器のトラブル症状</h2>
              <p className="text-sm text-gray-500 mb-6">以下の症状がある場合はご相談ください。症状別の詳しい解説ページもご用意しています。</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {config.troubleLinks.map((t) => (
                  <Link key={t.href} href={t.href} className={`block rounded-xl p-4 border transition-colors ${t.priority === 'high' ? 'border-red-200 bg-red-50 hover:bg-red-100' : 'border-gray-200 bg-gray-50 hover:bg-blue-50'}`}>
                    <p className="font-bold text-sm text-gray-900">{t.symptom}</p>
                    <span className={`text-xs font-bold ${t.priority === 'high' ? 'text-red-600' : 'text-brand-700'}`}>{t.priority === 'high' ? '至急ご相談ください →' : '詳しく見る →'}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* LP: 写真見積もりで送る写真 */}
        {config.photoEstimatePhotos && config.photoEstimatePhotos.length > 0 && (
          <section id="estimate-photo" className="py-12 bg-gray-50 scroll-mt-28">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-2xl font-black text-gray-900 mb-2">写真見積もりで送る写真</h2>
              <p className="text-sm text-gray-500 mb-6">{config.name}内であれば、現地確認なしでも以下の写真をお送りいただくだけで概算のお見積もりが可能です。</p>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <ul className="grid sm:grid-cols-2 gap-3">
                  {config.photoEstimatePhotos.map((photo, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="flex-shrink-0 w-6 h-6 bg-brand-700 text-white text-xs font-black flex items-center justify-center rounded-full mt-0.5">{i + 1}</span>
                      <span className="leading-relaxed">{photo}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-3 mt-5">
                <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors" style={{ backgroundColor: '#00B900' }}>LINEで写真を送る</a>
                <Link href="/estimate" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black text-sm px-5 py-2.5 rounded-lg transition-colors">フォームで見積もり依頼</Link>
              </div>
            </div>
          </section>
        )}

        {/* LP: 工事当日の流れ */}
        {config.workflowSteps && config.workflowSteps.length > 0 && (
          <section id="workflow-steps" className="py-12 bg-white scroll-mt-28">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-2xl font-black text-gray-900 mb-2">工事当日の流れ</h2>
              <p className="text-sm text-gray-500 mb-8">到着から使用説明まで、当日の工事は以下の流れで進めます。標準工事で2〜4時間程度が目安です。</p>
              <ol className="relative border-l-2 border-brand-200 ml-3 space-y-6">
                {config.workflowSteps.map((s) => (
                  <li key={s.step} className="ml-6">
                    <span className="absolute -left-[15px] flex items-center justify-center w-7 h-7 bg-brand-700 text-white text-xs font-black rounded-full">{s.step}</span>
                    <h3 className="font-black text-gray-900 text-base mb-1">{s.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* LP: この市の施工事例 */}
        {(() => {
          const cityCases = casesData.filter((c) => c.areaSlug === slug).slice(0, 6)
          if (cityCases.length === 0) return null
          return (
            <section id="city-cases" className="py-12 bg-gray-50 scroll-mt-28">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl font-black text-gray-900 mb-2">{config.name}の施工事例</h2>
                <p className="text-sm text-gray-500 mb-6">{config.name}内での給湯器交換の施工事例をご紹介します。</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {cityCases.map((c) => (
                    <Link href={`/cases/${c.slug}`} key={c.id} className="block border border-gray-200 rounded-xl p-4 bg-white hover:border-brand-400 transition-colors">
                      <p className="text-xs text-gray-500">{c.area}</p>
                      <p className="font-bold text-sm text-gray-900 mt-1">{c.buildingType} / {c.installationType}</p>
                      <p className="text-xs text-gray-600 mt-1">{c.beforeModel} → {c.afterModel}</p>
                      <p className="text-xs text-gray-400 mt-1">{c.maker} / {c.capacity}号 / {c.duration}</p>
                    </Link>
                  ))}
                </div>
                <Link href="/cases" className="text-sm text-brand-700 font-bold hover:underline mt-5 inline-block">施工事例一覧を見る →</Link>
              </div>
            </section>
          )
        })()}

        {/* LP: 区・エリア別対応案内 */}
        {config.wardsGuide && config.wardsGuide.length > 0 && (() => {
          // 区ページが存在するのは横浜市・川崎市のみ。それ以外は地区紹介カード（リンクなし）として表示
          const hasWardPages = slug === 'yokohama' || slug === 'kawasaki'
          return (
            <section id="wards-guide" className="py-12 bg-white scroll-mt-28">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl font-black text-gray-900 mb-2">{config.name}の区・エリア別対応案内</h2>
                <p className="text-sm text-gray-500 mb-6">{config.name}内の各エリアの住宅傾向に合わせて対応しています。</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {config.wardsGuide!.map((ward) => {
                    const inner = (
                      <>
                        <p className="font-black text-brand-900">{config.name}{ward.name}</p>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">{ward.summary}</p>
                        {ward.stations && <p className="text-xs text-gray-400 mt-2">主要駅：{ward.stations}</p>}
                      </>
                    )
                    return hasWardPages ? (
                      <Link href={`/area/${slug}/${ward.slug}`} key={ward.slug} className="block border border-gray-200 rounded-xl p-4 hover:border-brand-400 transition-colors">
                        {inner}
                      </Link>
                    ) : (
                      <div key={ward.slug} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                        {inner}
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          )
        })()}

        {/* LP: 主要駅別案内（横浜のみ） */}
        {config.stationsGuide && config.stationsGuide.length > 0 && (
          <section id="stations-guide" className="py-12 bg-gray-50 scroll-mt-28">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-2xl font-black text-gray-900 mb-2">{config.name}の主要駅周辺の給湯器交換</h2>
              <p className="text-sm text-gray-500 mb-6">主要駅周辺エリアの給湯器交換に対応しています。</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {config.stationsGuide.map((s) => (
                  <Link href={`/area/${slug}/station/${s.slug}`} key={s.slug} className="text-xs text-brand-700 border border-brand-200 rounded px-3 py-2 hover:bg-brand-50 font-semibold transition-colors">
                    {s.name}駅周辺（{s.wardName}）
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ⑬ 交換までの流れ */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">見積もり・工事の流れ</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {estimateSteps.map((s) => (
                <div key={s.step} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="text-3xl font-black text-brand-200 mb-2">{s.step}</div>
                  <div className="font-black text-gray-900 text-sm mb-1.5">{s.title}</div>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ⑭ よくある症状 */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">{config.name}で給湯器が故障したときのよくある症状</h2>
            <p className="text-sm text-gray-500 mb-5">以下のような症状がある場合はご連絡ください。使用年数が10年を超えている場合は、修理より交換が適切なケースもあります。</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
              {commonSymptoms.map((s) => (
                <div key={s.title} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="font-bold text-gray-900 text-sm mb-1.5">{s.title}</div>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={siteConfig.phoneHref} className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-sm px-5 py-2.5 rounded-lg transition-colors">
                電話で症状を相談する
              </a>
              <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors" style={{ backgroundColor: '#00B900' }}>
                LINEで写真を送る
              </a>
            </div>
          </div>
        </section>

        {/* エリア詳細情報（拡張フィールド） */}
        {(config.installTypeNote || config.capacityGuide || config.workflowNote || config.estimateNote || config.additionalCostNote || config.troubleNote) && (
          <section className="py-10 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-xl font-black text-gray-900 mb-6">{config.name}の給湯器交換 詳細ガイド</h2>
              <div className="space-y-4">
                {config.installTypeNote && (
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="font-black text-gray-900 mb-3 text-base">{config.name}で多い給湯器の設置タイプ</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{config.installTypeNote}</p>
                  </div>
                )}
                {config.capacityGuide && (
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="font-black text-gray-900 mb-3 text-base">{config.name}での号数の選び方</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{config.capacityGuide}</p>
                  </div>
                )}
                {config.workflowNote && (
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="font-black text-gray-900 mb-3 text-base">{config.name}での見積もり・工事の流れ</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{config.workflowNote}</p>
                  </div>
                )}
                {config.estimateNote && (
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="font-black text-gray-900 mb-3 text-base">見積もりに必要な情報・写真</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{config.estimateNote}</p>
                  </div>
                )}
                {config.additionalCostNote && (
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="font-black text-gray-900 mb-3 text-base">追加費用が発生するケース</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{config.additionalCostNote}</p>
                  </div>
                )}
                {config.troubleNote && (
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="font-black text-gray-900 mb-3 text-base">{config.name}でよくある故障症状</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{config.troubleNote}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 追加H2セクション */}
        {config.sections && config.sections.length > 0 && (
          <section className="py-10 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 space-y-6">
              {config.sections.map((section, i) => (
                <div key={i} id={`section-area-${i}`} className="scroll-mt-28">
                  <h2 className="text-xl font-black text-gray-900 mb-3">{section.heading}</h2>
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <p className="text-sm text-gray-600 leading-relaxed">{section.body}</p>
                    {section.list && (
                      <ul className="mt-3 space-y-1.5">
                        {section.list.map((item, k) => (
                          <li key={k} className="flex items-start gap-2 text-sm text-gray-700">
                            <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.table && (
                      <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="bg-brand-900 text-white">
                              {section.table.headers.map((h, j) => (
                                <th key={j} className="text-left px-4 py-2.5 font-bold text-xs">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.rows.map((row, j) => (
                              <tr key={j} className={j % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                {row.map((cell, k) => (
                                  <td key={k} className="px-4 py-2.5 border-b border-gray-100 text-xs">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 関連トラブル・基礎知識への内部リンク */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-base font-black text-gray-700 mb-4">{config.name}で多い給湯器トラブル・関連ページ</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                { href: '/trouble/no-hot-water', label: 'お湯が出ない' },
                { href: '/trouble/error-111', label: 'エラーコード111' },
                { href: '/trouble/no-reheating', label: '追い焚きできない' },
                { href: '/trouble/temperature-unstable', label: '温度が安定しない' },
                { href: '/trouble/water-leak', label: '水漏れ' },
                { href: '/guide/lifespan', label: '給湯器の寿命' },
                { href: '/guide/capacity', label: '号数の選び方' },
                { href: '/trouble', label: 'トラブル症状一覧' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-brand-700 transition-colors text-center">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ⑮ よくある質問（アコーディオン） */}
        <section id="area-faq" className="py-10 bg-gray-50 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">{config.name}の給湯器交換 よくある質問</h2>
            <FaqAccordion faqs={allFaqs} />
          </div>
        </section>

        {/* 横浜市専用：駅・地域・症状・タイプ別 サブページナビゲーション */}
        {slug === 'yokohama' && (
          <section className="py-12 bg-gray-50" id="yokohama-sub-pages">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-xl font-black text-gray-900 mb-2">横浜市の給湯器交換 — 駅・地域・症状・タイプ別に探す</h2>
              <p className="text-sm text-gray-600 mb-8">横浜市18区・主要46駅・25地域の給湯器交換情報をまとめています。</p>

              {/* 主要駅別ページ */}
              <div className="mb-8">
                <h3 className="text-base font-black text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-1 h-5 bg-brand-700 rounded-full inline-block"></span>
                  主要駅周辺の給湯器交換
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {[
                    { href: '/area/yokohama/station/yokohama', label: '横浜駅周辺' },
                    { href: '/area/yokohama/station/shin-yokohama', label: '新横浜駅周辺' },
                    { href: '/area/yokohama/station/hiyoshi', label: '日吉駅周辺' },
                    { href: '/area/yokohama/station/tsunashima', label: '綱島駅周辺' },
                    { href: '/area/yokohama/station/aobadai', label: '青葉台駅周辺' },
                    { href: '/area/yokohama/station/tama-plaza', label: 'たまプラーザ駅周辺' },
                    { href: '/area/yokohama/station/center-kita', label: 'センター北駅周辺' },
                    { href: '/area/yokohama/station/center-minami', label: 'センター南駅周辺' },
                    { href: '/area/yokohama/station/totsuka', label: '戸塚駅周辺' },
                    { href: '/area/yokohama/station/kamiooka', label: '上大岡駅周辺' },
                    { href: '/area/yokohama/station/sakuragicho', label: '桜木町駅周辺' },
                    { href: '/area/yokohama/station/kannai', label: '関内駅周辺' },
                    { href: '/area/yokohama/station/minatomirai', label: 'みなとみらい駅周辺' },
                    { href: '/area/yokohama/station/futamatagawa', label: '二俣川駅周辺' },
                    { href: '/area/yokohama/station/tsurumi', label: '鶴見駅周辺' },
                    { href: '/area/yokohama/station/ofuna', label: '大船駅周辺' },
                  ].map((l) => (
                    <Link key={l.href} href={l.href} className="text-xs text-brand-700 hover:bg-brand-50 border border-brand-200 rounded px-3 py-2 font-semibold transition-colors hover:underline">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* 地域別ページ */}
              <div className="mb-8">
                <h3 className="text-base font-black text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-1 h-5 bg-brand-700 rounded-full inline-block"></span>
                  地域・エリア別の給湯器交換
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {[
                    { href: '/area/yokohama/district/minato-mirai', label: 'みなとみらい' },
                    { href: '/area/yokohama/district/kohoku-new-town', label: '港北ニュータウン' },
                    { href: '/area/yokohama/district/tama-plaza', label: 'たまプラーザ周辺' },
                    { href: '/area/yokohama/district/aobadai', label: '青葉台周辺' },
                    { href: '/area/yokohama/district/shin-yokohama', label: '新横浜周辺' },
                    { href: '/area/yokohama/district/totsuka', label: '戸塚周辺' },
                    { href: '/area/yokohama/district/kamiooka', label: '上大岡周辺' },
                    { href: '/area/yokohama/district/hiyoshi', label: '日吉周辺' },
                    { href: '/area/yokohama/district/tsunashima', label: '綱島周辺' },
                    { href: '/area/yokohama/district/motomachi', label: '元町周辺' },
                    { href: '/area/yokohama/district/yamate', label: '山手周辺' },
                    { href: '/area/yokohama/district/futamatagawa', label: '二俣川周辺' },
                  ].map((l) => (
                    <Link key={l.href} href={l.href} className="text-xs text-brand-700 hover:bg-brand-50 border border-brand-200 rounded px-3 py-2 font-semibold transition-colors hover:underline">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* トラブル症状別 */}
              <div className="mb-8">
                <h3 className="text-base font-black text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-1 h-5 bg-red-500 rounded-full inline-block"></span>
                  横浜市のトラブル症状別ページ
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { href: '/area/yokohama/trouble/no-hot-water', label: 'お湯が出ない' },
                    { href: '/area/yokohama/trouble/error-111', label: 'エラー111が出る' },
                    { href: '/area/yokohama/trouble/water-leak', label: '水漏れがある' },
                    { href: '/area/yokohama/trouble/no-ignition', label: '点火しない' },
                    { href: '/area/yokohama/trouble/temperature-unstable', label: 'お湯の温度が不安定' },
                    { href: '/area/yokohama/trouble/remote-control-error', label: 'リモコンエラー' },
                    { href: '/area/yokohama/trouble/exhaust-smell', label: '排気臭・異臭がする' },
                    { href: '/area/yokohama/trouble/noise', label: '異音がする' },
                    { href: '/area/yokohama/trouble/freeze', label: '凍結・凍結防止' },
                    { href: '/area/yokohama/trouble/bath-autofill', label: '自動湯張りが動かない' },
                    { href: '/area/yokohama/trouble/hot-water-flow', label: 'お湯の出が悪い' },
                    { href: '/area/yokohama/trouble/pilot-off', label: '種火が消える' },
                  ].map((l) => (
                    <Link key={l.href} href={l.href} className="text-xs text-brand-700 hover:bg-red-50 border border-red-200 rounded px-3 py-2 font-semibold transition-colors hover:underline">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* 設置タイプ別 */}
              <div className="mb-8">
                <h3 className="text-base font-black text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-1 h-5 bg-green-500 rounded-full inline-block"></span>
                  設置タイプ・機能別ページ
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { href: '/area/yokohama/type/mansion-ps', label: 'マンションPS設置型' },
                    { href: '/area/yokohama/type/wall-mounted', label: '壁掛け型' },
                    { href: '/area/yokohama/type/floor-standing', label: '据置型' },
                    { href: '/area/yokohama/type/eco-jaws', label: 'エコジョーズ交換' },
                    { href: '/area/yokohama/type/full-auto', label: 'フルオートタイプ' },
                    { href: '/area/yokohama/type/outdoor', label: '屋外設置型' },
                    { href: '/area/yokohama/type/propane', label: 'プロパンガス対応' },
                    { href: '/area/yokohama/type/city-gas', label: '都市ガス対応' },
                    { href: '/area/yokohama/type/heat-pump', label: 'エコキュート交換' },
                  ].map((l) => (
                    <Link key={l.href} href={l.href} className="text-xs text-brand-700 hover:bg-green-50 border border-green-200 rounded px-3 py-2 font-semibold transition-colors hover:underline">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* メーカー・号数・建物別 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-black text-gray-800 mb-2">メーカー別</h3>
                  <ul className="space-y-1.5">
                    <li><Link href="/area/yokohama/maker/rinnai" className="text-xs text-brand-700 font-semibold hover:underline">リンナイ製給湯器交換 →</Link></li>
                    <li><Link href="/area/yokohama/maker/noritz" className="text-xs text-brand-700 font-semibold hover:underline">ノーリツ製給湯器交換 →</Link></li>
                    <li><Link href="/area/yokohama/maker/paloma" className="text-xs text-brand-700 font-semibold hover:underline">パロマ製給湯器交換 →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-800 mb-2">号数別</h3>
                  <ul className="space-y-1.5">
                    <li><Link href="/area/yokohama/capacity/16" className="text-xs text-brand-700 font-semibold hover:underline">16号給湯器交換 →</Link></li>
                    <li><Link href="/area/yokohama/capacity/20" className="text-xs text-brand-700 font-semibold hover:underline">20号給湯器交換 →</Link></li>
                    <li><Link href="/area/yokohama/capacity/24" className="text-xs text-brand-700 font-semibold hover:underline">24号給湯器交換 →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-800 mb-2">建物タイプ別</h3>
                  <ul className="space-y-1.5">
                    <li><Link href="/area/yokohama/building/condominium" className="text-xs text-brand-700 font-semibold hover:underline">分譲マンション →</Link></li>
                    <li><Link href="/area/yokohama/building/rental-apartment" className="text-xs text-brand-700 font-semibold hover:underline">賃貸マンション・アパート →</Link></li>
                    <li><Link href="/area/yokohama/building/detached-house" className="text-xs text-brand-700 font-semibold hover:underline">戸建て住宅 →</Link></li>
                    <li><Link href="/area/yokohama/building/old-building" className="text-xs text-brand-700 font-semibold hover:underline">築古物件・昭和の給湯器 →</Link></li>
                    <li><Link href="/area/yokohama/building/new-construction" className="text-xs text-brand-700 font-semibold hover:underline">新築マンション・新築戸建て →</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 地域×症状・設置タイプページへの内部リンク */}
        <section className="py-10 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-base font-black text-gray-900 mb-5">{config.name}の給湯器に関するお悩み別ページ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">症状・トラブル別</p>
                <ul className="space-y-2">
                  {(slug === 'yokohama' ? [
                    { href: `/area/yokohama/trouble/no-hot-water`, label: `横浜市で給湯器のお湯が出ない場合` },
                    { href: `/area/yokohama/trouble/error-111`, label: `横浜市で給湯器エラー111が出た場合` },
                    { href: `/area/yokohama/trouble/water-leak`, label: `横浜市で給湯器の水漏れがある場合` },
                  ] : [
                    { href: `/area/${slug}/no-hot-water`, label: `${config.name}で給湯器のお湯が出ない場合` },
                    { href: `/area/${slug}/error-111`, label: `${config.name}で給湯器エラー111が出た場合` },
                    { href: `/area/${slug}/water-leak`, label: `${config.name}で給湯器の水漏れがある場合` },
                  ]).map(l => (
                    <li key={l.href}>
                      <Link href={l.href} className="flex items-center gap-2 text-sm text-brand-700 hover:text-brand-900 font-semibold hover:underline">
                        <svg className="w-3.5 h-3.5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">設置タイプ・住宅タイプ別</p>
                <ul className="space-y-2">
                  {((): { href: string; label: string }[] => {
                    if (slug === 'yokohama') {
                      return [
                        { href: `/area/yokohama/type/mansion-ps`, label: `横浜市のマンションPS設置型交換` },
                        { href: `/area/yokohama/type/wall-mounted`, label: `横浜市の屋外壁掛型交換` },
                        { href: `/area/yokohama/type/eco-jaws`, label: `横浜市でエコジョーズへの交換` },
                      ]
                    }
                    if (slug === 'kawasaki') {
                      return [
                        { href: `/area/kawasaki/mansion-ps`, label: `川崎市のマンションPS設置型交換` },
                        { href: `/area/kawasaki/wall-mounted`, label: `川崎市の屋外壁掛型交換` },
                        { href: `/area/kawasaki/eco-jaws`, label: `川崎市でエコジョーズへの交換` },
                      ]
                    }
                    return [
                      { href: `/area/${slug}/wall-mounted`, label: `${config.name}の屋外壁掛型交換` },
                      { href: `/area/${slug}/floor-standing`, label: `${config.name}の据置型交換` },
                      { href: `/area/${slug}/eco-jaws`, label: `${config.name}でエコジョーズへの交換` },
                    ]
                  })().map(l => (
                    <li key={l.href}>
                      <Link href={l.href} className="flex items-center gap-2 text-sm text-brand-700 hover:text-brand-900 font-semibold hover:underline">
                        <svg className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ⑯ 関連商品 */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">{config.name}で人気の給湯器</h2>
            <p className="text-gray-500 text-sm mb-6">工事費込み税込価格 / 24号オートタイプ</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link href="/rinnai" className="text-brand-700 font-bold text-sm hover:underline">リンナイ 一覧 →</Link>
              <Link href="/noritz" className="text-brand-700 font-bold text-sm hover:underline">ノーリツ 一覧 →</Link>
              <Link href="/paloma" className="text-brand-700 font-bold text-sm hover:underline">パロマ 一覧 →</Link>
              <Link href="/products" className="text-brand-700 font-bold text-sm hover:underline">全商品 一覧 →</Link>
            </div>
          </div>
        </section>

        {/* ⑰ 施工事例への導線 */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <Link href="/cases" className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-sm hover:border-blue-200 transition-all group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-black text-gray-900 mb-1">{config.name}の施工事例を見る</div>
                  <p className="text-sm text-gray-500">実際の給湯器交換の施工内容・工事の流れをご確認いただけます。</p>
                </div>
                <svg className="w-5 h-5 text-gray-300 group-hover:text-brand-600 transition-colors flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </section>

        {/* ⑱ 給湯器の基礎知識 内部リンク */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-base font-black text-gray-700 mb-4">給湯器の基礎知識・関連ページ</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                { href: '/guide/capacity', label: '号数の選び方' },
                { href: '/guide/eco-jaws', label: 'エコジョーズとは' },
                { href: '/guide/full-auto-auto', label: 'オートとフルオートの違い' },
                { href: '/guide/lifespan', label: '給湯器の寿命' },
                { href: '/guide/error-code', label: 'エラーコード一覧' },
                { href: '/guide/installation-type', label: '設置タイプの種類' },
                { href: '/guide/cost', label: '交換費用の相場' },
                { href: '/guide/photo-estimate', label: '写真見積もりの手順' },
                { href: '/guide/warranty', label: '保証・アフターサービス' },
                { href: '/guide/mansion-ps', label: 'マンションPS型の選び方' },
                { href: '/cases', label: '施工事例一覧' },
                { href: '/blog', label: '給湯器コラム' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-brand-700 transition-colors text-center">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 他エリアへのリンク */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <p className="text-sm font-black text-gray-500 mb-3">他の対応エリアを見る</p>
            <div className="flex flex-wrap gap-3">
              {config.otherAreas.map((area) => (
                <Link key={area.href} href={area.href} className="text-sm font-bold text-brand-700 bg-white border border-blue-200 rounded-lg px-4 py-2 hover:bg-blue-50 transition-colors">
                  {area.name}の給湯器交換 →
                </Link>
              ))}
              <Link href="/area" className="text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors">
                対応エリア一覧 →
              </Link>
            </div>
          </div>
        </section>

        {/* ⑲⑳ 無料見積もりCTA + LINE相談CTA */}
        <section className="py-12 bg-brand-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-black mb-2">{config.name}の給湯器交換はお任せください</h2>
            <p className="text-blue-200 text-sm mb-6">無料見積もり受付中。{config.name}全域対応。電話・LINE・フォームからご相談ください。</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/estimate" className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-lg px-8 py-4 rounded-lg transition-colors w-full sm:w-auto justify-center">
                無料見積もりを依頼する
              </Link>
              <a href={siteConfig.phoneHref} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-black text-lg px-8 py-4 rounded-lg transition-colors w-full sm:w-auto justify-center">
                {siteConfig.phone}
              </a>
              <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white font-bold text-base px-6 py-3 rounded-lg transition-colors w-full sm:w-auto justify-center" style={{ backgroundColor: '#00B900' }}>
                LINEで写真を送る
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
