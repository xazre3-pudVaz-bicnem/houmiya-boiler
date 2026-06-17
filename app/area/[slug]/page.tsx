import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import FaqAccordion from '@/components/FaqAccordion'
import ProductCard from '@/components/ProductCard'
import { getProductsByMaker } from '@/data/products'
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

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faqs.map((f) => ({
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

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${config.name}の給湯器交換・販売`,
    description: config.metaDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: '株式会社宝宮設備',
      telephone: siteConfig.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '温水西1-4-39',
        addressLocality: '厚木市',
        addressRegion: '神奈川県',
        postalCode: '243-0032',
        addressCountry: 'JP',
      },
    },
    areaServed: { '@type': 'City', name: config.name },
  }

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: '株式会社宝宮設備',
    telephone: siteConfig.phone,
    url: 'https://www.houmiya-boiler.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '温水西1-4-39',
      addressLocality: '厚木市',
      addressRegion: '神奈川県',
      postalCode: '243-0032',
      addressCountry: 'JP',
    },
    openingHours: 'Mo,Tu,We,Th,Fr,Sa,Su 09:00-18:00',
    areaServed: config.name,
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
            <p className="text-blue-100 text-sm mb-5 max-w-2xl leading-relaxed">
              {config.name}で給湯器交換・販売なら株式会社宝宮設備。リンナイ・ノーリツ・パロマ対応。
              戸建て・マンション・アパート対応。工事費込み価格で無料見積もり受付中。
            </p>
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

        {/* ④ 対応できる給湯器の種類 */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.name}で対応できる給湯器の設置タイプ</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-900 text-white">
                    <th className="px-4 py-3 text-left font-bold">設置タイプ</th>
                    <th className="px-4 py-3 text-left font-bold">特徴</th>
                    <th className="px-4 py-3 text-left font-bold">多い住宅</th>
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
                    <th className="px-4 py-3 text-left font-bold">号数</th>
                    <th className="px-4 py-3 text-left font-bold">家族構成の目安</th>
                    <th className="px-4 py-3 text-left font-bold">向いている使い方</th>
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
              {config.sections.map((s, i) => (
                <div key={i}>
                  <h2 className="text-xl font-black text-gray-900 mb-3">{s.heading}</h2>
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
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
        <section className="py-10 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">{config.name}の給湯器交換 よくある質問</h2>
            <FaqAccordion faqs={config.faqs} />
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
