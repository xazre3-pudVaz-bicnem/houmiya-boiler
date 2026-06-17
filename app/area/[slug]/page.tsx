import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import ProductCard from '@/components/ProductCard'
import CapacityGuide from '@/components/CapacityGuide'
import { getProductsByMaker } from '@/data/products'
import { siteConfig } from '@/data/site'

type AreaConfig = {
  name: string
  wards?: string[]
  text1: string
  text2: string
  housingNote: string
  installNote: string
  popularCapacity: string
  ecoNote: string
  priceNote: string
  metaTitle: string
  metaDescription: string
  canonical: string
  faqs: { q: string; a: string }[]
}

const areaConfigs: Record<string, AreaConfig> = {
  yokohama: {
    name: '横浜市',
    wards: ['鶴見区', '神奈川区', '西区', '中区', '南区', '港南区', '保土ケ谷区', '旭区', '磯子区', '金沢区', '港北区', '緑区', '青葉区', '都筑区', '戸塚区', '栄区', '泉区', '瀬谷区'],
    text1: '横浜市は18区にわたる神奈川県最大の都市で、戸建て・マンション・アパートなど多様な住宅が密集しています。株式会社宝宮設備は横浜市全域に対応しており、青葉区・都筑区・港北区のニュータウンエリアから、港南区・戸塚区・金沢区の住宅密集地まで迅速に対応しています。横浜市は大規模マンションが多いため、PS（パイプシャフト）設置型への交換依頼が多いエリアです。',
    text2: '横浜市内での給湯器交換は年間を通じて施工実績があります。現地確認または給湯器の写真をLINEで送っていただければ、即日お見積もりをご提示します。リンナイ・ノーリツ・パロマすべてのメーカーに対応しており、最大80%OFFの工事費込み価格でご提供しています。横浜市全18区で無料見積もりを受け付けています。',
    housingNote: '横浜市は戸建て・マンション・集合住宅が混在する多様な住環境のエリアです。青葉区・都筑区などのニュータウンエリアは戸建て住宅が多く、壁掛屋外型の交換が中心です。一方、港北区・神奈川区・西区などでは大型マンションが多く、PS標準設置型・PS扉内設置型への対応が多くなっています。いずれの設置タイプにも対応しています。',
    installNote: '横浜市内では、戸建て向けの壁掛屋外型に加え、マンション向けのPS標準設置型・PS扉内設置型の交換が多いです。PS設置型はメーカーや機種の選定に注意が必要なため、写真を送っていただければ適切な機種を選定します。ベランダ設置型や据置型にも対応しています。',
    popularCapacity: '横浜市内では24号給湯器が最もよく選ばれています。ファミリー世帯が多く、お風呂とキッチンを同時に使うシーンが多いためです。マンションの少人数世帯や単身世帯では20号も多く採用されています。号数が分からない場合は、現在の給湯器の写真を送っていただければご案内できます。',
    ecoNote: '横浜市内でも戸建て住宅ではエコジョーズへの交換が増えています。エコジョーズはガス代を約10〜15%削減しやすい省エネ型給湯器です。ただしドレン排水工事が必要な場合があるため、設置可否は現地確認が必要です。マンションでは管理規約の確認が必要な場合があります。',
    priceNote: '横浜市での標準的な給湯器交換（壁掛型・ワンタッチ交換）は、本体・リモコン・標準工事費込みで税込15万円前後が目安です。PS設置型は設置環境により変動します。見積もりは無料です。追加工事が発生する場合は事前にご説明します。',
    metaTitle: '横浜市の給湯器交換・販売なら株式会社宝宮設備｜リンナイ・ノーリツ・パロマ対応',
    metaDescription: '横浜市（全18区）で給湯器交換・販売なら株式会社宝宮設備。リンナイ・ノーリツ・パロマ対応。戸建て・マンション・PS設置型・エコジョーズまで、工事費込み価格で無料見積もり。横浜市全18区対応。',
    canonical: 'https://www.houmiya-boiler.com/area/yokohama',
    faqs: [
      { q: '横浜市のどのエリアに対応していますか？', a: '横浜市内の全18区に対応しています。鶴見区・神奈川区・西区・中区・南区・港南区・保土ケ谷区・旭区・磯子区・金沢区・港北区・緑区・青葉区・都筑区・戸塚区・栄区・泉区・瀬谷区に迅速にお伺いします。' },
      { q: 'マンションのPS設置型の交換もできますか？', a: 'はい。横浜市内のマンションのPS標準設置型・PS扉内設置型にも対応しています。機種選定のサポートから工事まで一括対応します。現在の給湯器の写真を送っていただければ、対応可否を確認します。' },
      { q: '横浜市での工事時間はどのくらいですか？', a: '標準的な給湯器交換（壁掛型のワンタッチ交換）は2〜4時間程度が目安です。PS設置型や配管状況によって変動しますが、工事前に目安時間をご案内します。' },
      { q: 'どの号数を選べばいいですか？', a: '16号は一人暮らし向け、20号は2〜3人家族向け、24号は4人以上の家族向けが目安です。横浜市内では24号が最も多く選ばれています。分からない場合は給湯器の写真をお送りいただければご提案します。' },
      { q: 'エコジョーズに交換できますか？', a: '設置条件が合えば交換可能です。戸建てでは選ばれることが多く、マンションではドレン排水の確認が必要です。設置可否は現地確認または写真確認で判断します。' },
      { q: '見積もりから工事まで何日かかりますか？', a: '写真をお送りいただくか現地確認後、最短即日でお見積もりをご提示します。工事日程はご都合に合わせて調整可能で、最短翌日工事にも対応しています。' },
      { q: '横浜市以外も相談できますか？', a: '川崎市・厚木市・海老名市にも対応しています。近隣エリアも対応できる場合がありますので、まずはお気軽にご相談ください。' },
    ],
  },
  kawasaki: {
    name: '川崎市',
    wards: ['川崎区', '幸区', '中原区', '高津区', '多摩区', '宮前区', '麻生区'],
    text1: '川崎市は7区で構成される神奈川県内有数の都市です。中原区・幸区のタワーマンション・大型集合住宅エリアから、宮前区・麻生区・多摩区の戸建て住宅エリアまで幅広く対応しています。株式会社宝宮設備は川崎市全域に対応しており、マンションのPS設置型から戸建ての壁掛型まで、多様な設置タイプへの施工実績があります。',
    text2: '川崎市内はマンションへの施工依頼が多く、PS設置タイプへの対応実績も豊富です。給湯器の型番や写真があれば、現地確認不要でお見積もりが可能な場合もあります。リンナイ・ノーリツ・パロマすべてに対応し、最大80%OFFの工事費込み価格でご提供します。',
    housingNote: '川崎市は中原区・幸区を中心に高層マンション・大型集合住宅が多いエリアです。PS標準設置型・PS扉内設置型の交換依頼が特に多く、対応実績が豊富です。一方、宮前区・麻生区・多摩区では戸建て住宅が中心で、壁掛屋外型の交換が主流です。戸建て・マンション・アパート・賃貸物件いずれにも対応しています。',
    installNote: '川崎市内ではPS標準設置型・PS扉内設置型への対応が多いです。マンションのPS設置型は機種選定に制約がある場合があり、管理組合の規定に沿った機種選定のサポートも行っています。設置できるか分からない場合は、給湯器の写真をお送りください。',
    popularCapacity: '川崎市内では20号・24号が多く選ばれています。ファミリー世帯の多い宮前区・麻生区では24号が主流で、単身・少人数のマンション向けでは20号も多く採用されています。賃貸物件では16号も多くあります。',
    ecoNote: '川崎市内でも省エネ型のエコジョーズへの交換ニーズが高まっています。戸建てでは設置しやすい環境が多いですが、マンションでは設置可否の確認が必要です。ガス代を約10〜15%削減しやすいため、長期的なコスト削減を検討されている方にもおすすめです。',
    priceNote: '川崎市での標準的な給湯器交換は、本体・リモコン・標準工事費込みで税込15万円前後が多いです。PS設置型や配管状況によって変動しますが、事前に見積もりでご確認いただけます。見積もりは無料で、追加費用が発生する場合は必ず事前説明します。',
    metaTitle: '川崎市の給湯器交換・販売なら株式会社宝宮設備｜工事費込み価格で無料見積もり',
    metaDescription: '川崎市（全7区）で給湯器交換・販売なら株式会社宝宮設備。リンナイ・ノーリツ・パロマ対応。マンションPS設置型・戸建て壁掛型対応。工事費込み価格で無料見積もり受付中。',
    canonical: 'https://www.houmiya-boiler.com/area/kawasaki',
    faqs: [
      { q: '川崎市のどの区に対応していますか？', a: '川崎区・幸区・中原区・高津区・多摩区・宮前区・麻生区の全7区に対応しています。マンションの多い中原区・幸区から、戸建ての多い宮前区・麻生区まで対応しています。' },
      { q: 'マンションのPS設置型にも対応できますか？', a: 'はい。川崎市内のマンションのPS標準設置型・PS扉内設置型への対応実績が豊富です。機種の選定から工事まで一括でサポートします。現在の給湯器の写真を送っていただければ対応可否を確認します。' },
      { q: 'どの号数を選べばいいですか？', a: '16号は一人暮らし向け、20号は2〜3人家族向け、24号は4人以上の家族向けが目安です。川崎市内では24号・20号が多く選ばれています。給湯器の写真や型番があればご提案できます。' },
      { q: '川崎市で緊急対応はできますか？', a: '在庫・スケジュール状況によりますが、できる限り迅速に対応します。お急ぎの場合はお電話またはLINEでご連絡ください。' },
      { q: '賃貸物件の給湯器交換もできますか？', a: 'はい。アパートオーナー様や管理会社様からのご依頼も承っています。川崎市内の賃貸物件の交換実績も豊富です。複数台の交換にも対応します。' },
      { q: 'エコジョーズへの交換はできますか？', a: '設置条件が合えば交換可能です。戸建てでは対応しやすいですが、マンションではドレン排水の確認が必要です。写真確認・現地確認で判断します。' },
      { q: '見積もりにかかる費用はありますか？', a: '見積もりは完全無料です。写真送付またはLINEでのご相談もすべて無料で対応しています。' },
    ],
  },
  atsugi: {
    name: '厚木市',
    text1: '厚木市は株式会社宝宮設備の拠点がある地元エリアです。弊社所在地は厚木市温水西1-4-39で、市内のどこへも迅速に対応できます。緊急時も最短当日対応が可能な場合があります。戸建て・マンション・アパートを問わず、厚木市内全域に対応しています。',
    text2: '厚木市内での施工実績は特に豊富で、地域の住宅環境を熟知しています。ガス会社との連携もスムーズで、工事後の試運転・確認まで丁寧に対応します。給湯器の写真をLINEで送っていただければ即日お見積もりが可能です。地元密着の安心感と適正価格でご提供しています。',
    housingNote: '厚木市は戸建て住宅が多いエリアで、壁掛屋外型の給湯器交換が中心です。新興住宅地もあり、初回交換のご依頼も増えています。また団地・集合住宅・アパートも点在しており、設置タイプに応じた多様な対応が必要です。いずれのタイプにも対応しています。賃貸物件のオーナー様からのご依頼も多くあります。',
    installNote: '厚木市内では壁掛屋外型（RUF-Aシリーズ等）の交換が最も多いです。据置型や屋内設置型にも対応しています。自社拠点が厚木市にあるため、他エリアより迅速な対応が可能です。緊急の場合も優先的に対応しています。',
    popularCapacity: '厚木市内ではファミリー層が多いため、24号給湯器が最もよく選ばれています。戸建てでは4人以上のご家庭が多く、お風呂とキッチンを同時に使えるよう余裕のある24号が人気です。賃貸アパートでは16号・20号も多く採用されています。',
    ecoNote: '厚木市では戸建て住宅でのエコジョーズ交換実績が豊富です。排気熱を再利用する省エネ型給湯器で、ガス代を約10〜15%削減しやすくなります。ドレン排水工事が必要な場合がありますが、厚木市の戸建ては設置しやすい環境が多いです。',
    priceNote: '厚木市での標準的な給湯器交換は、本体・リモコン・標準工事費（38,000円税抜）込みで税込15万円前後が多いです。地元厚木市のため出張費も抑えられます。見積もりは無料で、追加費用が発生する場合は必ず事前説明します。',
    metaTitle: '厚木市の給湯器交換・販売なら株式会社宝宮設備｜地域密着の自社施工',
    metaDescription: '厚木市で給湯器交換なら株式会社宝宮設備（本社：厚木市温水西）。地域密着・最短当日対応。リンナイ・ノーリツ・パロマ対応。戸建て・マンション・アパート対応。工事費込み無料見積もり。',
    canonical: 'https://www.houmiya-boiler.com/area/atsugi',
    faqs: [
      { q: '厚木市内に何分くらいでお伺いできますか？', a: '弊社の拠点が厚木市温水西にあるため、市内であれば最短30〜60分程度でお伺い可能な場合があります。交通状況やスケジュールにより変動しますので、まずはお電話でご確認ください。' },
      { q: '厚木市で緊急対応はできますか？', a: 'はい。在庫・スケジュール状況にもよりますが、地元厚木市は最優先で対応しています。お急ぎの場合はまずお電話ください。' },
      { q: 'どの号数を選べばいいですか？', a: '16号は一人暮らし向け、20号は2〜3人家族向け、24号は4人以上の家族向けが目安です。厚木市ではファミリー世帯が多いため24号が人気です。迷った場合は写真を送っていただければご提案します。' },
      { q: '戸建てのほかにアパートや賃貸の交換もできますか？', a: 'はい。厚木市内のアパートオーナー様や管理会社様からのご依頼も承っています。複数台の交換や、入居者様への対応の流れについてもご相談ください。' },
      { q: 'エコジョーズに交換できますか？', a: '設置条件が合えば交換可能です。厚木市の戸建てでは設置しやすい環境が多いです。ドレン排水工事が必要な場合がありますが、現地確認または写真確認で判断します。' },
      { q: '工事費に含まれる作業を教えてください。', a: '既存給湯器の撤去・処分、新規給湯器の取付、リモコン取付、給水・給湯・ガス管の接続、配管保温、試運転・使用説明がすべて標準工事費（税抜38,000円）に含まれます。' },
      { q: '厚木市内の施工事例はありますか？', a: 'はい。地元厚木市では多数の施工実績があります。施工事例ページをご覧ください。' },
    ],
  },
  ebina: {
    name: '海老名市',
    text1: '海老名市は近年の宅地開発により新興住宅地が増え、給湯器の初回交換や新規設置のご依頼も多いエリアです。厚木市に拠点を持つ株式会社宝宮設備は、海老名市内全域に迅速に対応しています。ファミリー向けの大型戸建てから、単身・少人数向けのマンション・アパートまで幅広く対応します。',
    text2: '海老名市での施工実績も豊富です。オーナー様からの賃貸物件の給湯器交換依頼も多く、スピーディーかつ適正価格での対応が評価されています。リンナイ・ノーリツ・パロマすべてのメーカーに対応。給湯器の写真やLINEでの問い合わせにも当日中に回答します。',
    housingNote: '海老名市は近年の宅地開発により新築戸建てと新築マンションの両方が増えています。ファミリー層向けの戸建て住宅が多く、壁掛屋外型の交換が中心です。駅周辺のマンション・集合住宅ではPS設置型への対応も行っています。賃貸アパートの給湯器交換依頼も多く、オーナー様からのまとめ交換にも対応しています。',
    installNote: '海老名市内では戸建ての壁掛屋外型が中心です。新築住宅での設置や、既存給湯器の入れ替えなど幅広く対応しています。PS設置型を含むマンション向け機種にも対応しており、設置環境に応じた適切な機種をご提案します。',
    popularCapacity: '海老名市内ではファミリー向けの24号が最もよく選ばれています。ニュータウンエリアのファミリー世帯では4人以上のご家庭が多く、24号が定番です。単身世帯や少人数世帯の増加により、16号・20号の需要も高まっています。',
    ecoNote: '海老名市の新築・築浅住宅ではエコジョーズへの関心が高まっています。排熱を再利用する省エネ型で、ガス代を約10〜15%削減しやすくなります。新築住宅では設置環境が整っていることが多く、エコジョーズへの交換もスムーズです。',
    priceNote: '海老名市での給湯器交換は、本体・リモコン・標準工事費込みで税込15万円前後が目安です。厚木市から近いため移動時間も少なく、迅速な対応が可能です。見積もりは無料で、追加費用が発生する場合は必ず事前にご説明します。',
    metaTitle: '海老名市の給湯器交換・販売なら株式会社宝宮設備｜リンナイ・ノーリツ・パロマ対応',
    metaDescription: '海老名市で給湯器交換・販売なら株式会社宝宮設備。リンナイ・ノーリツ・パロマ対応。戸建て・マンション・アパート対応。工事費込み価格で無料見積もり受付中。',
    canonical: 'https://www.houmiya-boiler.com/area/ebina',
    faqs: [
      { q: '海老名市全域に対応していますか？', a: 'はい。海老名市内全域に対応しています。新興住宅地から賃貸物件まで幅広く対応します。厚木市の拠点から近いため、迅速な対応が可能です。' },
      { q: '賃貸物件の給湯器交換もできますか？', a: 'はい。アパートオーナー様や管理会社様からのご依頼も承っています。複数台の交換や入居者への案内などもサポートします。' },
      { q: 'どの号数を選べばいいですか？', a: '16号は一人暮らし向け、20号は2〜3人家族向け、24号は4人以上の家族向けが目安です。海老名市のファミリー世帯では24号が人気です。迷った場合は写真を送っていただければご提案します。' },
      { q: 'エコジョーズに交換できますか？', a: '設置条件が合えば交換可能です。海老名市の新築・築浅戸建てでは設置しやすい環境が多いです。ドレン排水の確認が必要な場合があります。' },
      { q: '標準工事費に処分費は含まれますか？', a: 'はい。標準工事費（税抜38,000円）に既存給湯器の撤去・処分が含まれています。別途処分費はかかりません。' },
      { q: '工事当日に追加費用は発生しますか？', a: '標準的な交換工事では追加費用は発生しません。ただし配管状況が特殊な場合は事前のお見積もりでご説明します。事前確認なしに追加費用を請求することはありません。' },
      { q: '見積もりから工事までどのくらいかかりますか？', a: '写真送付または現地確認後、最短即日でお見積もりをご提示します。工事は最短翌日から対応可能です。' },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(areaConfigs).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const config = areaConfigs[slug]
  if (!config) return {}
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: { canonical: config.canonical },
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      locale: 'ja_JP',
      type: 'website',
    },
  }
}

const featuredProducts = [
  ...getProductsByMaker('rinnai').filter((p) => p.capacity === 24 && p.type === 'auto').slice(0, 1),
  ...getProductsByMaker('noritz').filter((p) => p.capacity === 24 && p.type === 'auto').slice(0, 1),
  ...getProductsByMaker('paloma').filter((p) => p.capacity === 24 && p.type === 'auto').slice(0, 1),
]

const estimateSteps = [
  { step: '01', title: 'お問い合わせ', body: '電話・LINE・フォームからご連絡ください。給湯器の写真があればよりスムーズです。' },
  { step: '02', title: 'お見積もり', body: '写真確認または現地確認後、最短即日でお見積もりをご提示します。費用は無料です。' },
  { step: '03', title: '工事日時の確定', body: 'お見積もり内容にご納得いただけたら、工事日時を調整します。最短翌日から対応可能です。' },
  { step: '04', title: '工事・アフター対応', body: '既存給湯器の撤去・取付・試運転まで一貫対応。工事後の保証・アフターサービスも充実。' },
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
        addressLocality: '厚木市',
        addressRegion: '神奈川県',
        addressCountry: 'JP',
      },
    },
    areaServed: { '@type': 'City', name: config.name },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Header />
      <main className="pt-[100px]">

        {/* ヒーロー */}
        <section className="bg-brand-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <nav className="flex items-center gap-3 mb-4 text-sm" aria-label="パンくずリスト">
              <Link href="/" className="text-blue-200 hover:text-white">トップ</Link>
              <span className="text-blue-400">›</span>
              <span className="text-blue-300">対応エリア</span>
              <span className="text-blue-400">›</span>
              <span>{config.name}</span>
            </nav>
            <h1 className="text-3xl font-black mb-3">{config.name}の給湯器交換・販売</h1>
            <p className="text-blue-100 text-sm mb-5 max-w-2xl">
              {config.name}の給湯器交換なら株式会社宝宮設備。リンナイ・ノーリツ・パロマ対応。
              戸建て・マンション・アパート対応。最大80%OFFの工事費込み価格。無料見積もり受付中。
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-base px-5 py-2.5 rounded-lg transition-colors"
              >
                {siteConfig.phone}
              </a>
              <Link
                href="/estimate"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black text-base px-5 py-2.5 rounded-lg transition-colors"
              >
                無料見積もりを依頼する
              </Link>
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white font-bold text-base px-5 py-2.5 rounded-lg transition-colors"
                style={{ backgroundColor: '#00B900' }}
              >
                LINEで写真を送って相談
              </a>
            </div>
          </div>
        </section>

        {/* 対応区 */}
        {config.wards && (
          <section className="py-8 bg-white border-b">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="font-black text-gray-900 mb-4">{config.name}の対応エリア（全{config.wards.length}区）</h2>
              <div className="flex flex-wrap gap-2">
                {config.wards.map((w) => (
                  <span key={w} className="text-sm bg-blue-50 border border-blue-200 text-brand-700 px-3 py-1.5 rounded-lg font-medium">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* エリア概要 */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.name}での給湯器交換について</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">{config.text1}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{config.text2}</p>
            </div>
          </div>
        </section>

        {/* 住宅タイプ別対応 */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-3">{config.name}の住宅タイプ別対応</h2>
            <p className="text-gray-500 text-sm mb-6">{config.housingNote}</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { type: '戸建て住宅', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', desc: '壁掛屋外型・据置型・屋内設置型に対応。号数の変更・エコジョーズへの交換も対応可能です。' },
                { type: 'マンション・集合住宅', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', desc: 'PS標準設置型・PS扉内設置型・PS扉内上方排気型に対応。マンション規定に沿った機種選定もサポートします。' },
                { type: 'アパート・賃貸', icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z', desc: 'オーナー様・管理会社様からのご依頼も対応。複数台の交換・入居者への対応フローもサポートします。' },
              ].map((item) => (
                <div key={item.type} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-brand-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                    <span className="font-black text-gray-900 text-sm">{item.type}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 設置タイプと号数 */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-base font-black text-gray-900 mb-3">{config.name}で多い給湯器の設置タイプ</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{config.installNote}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-base font-black text-gray-900 mb-3">{config.name}で多い号数</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{config.popularCapacity}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 号数の目安ガイド */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">号数の選び方</h2>
            <CapacityGuide />
          </div>
        </section>

        {/* エコジョーズ */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-3">{config.name}でのエコジョーズ対応</h2>
            <div className="bg-white border border-green-200 rounded-xl p-6">
              <p className="text-sm text-gray-600 leading-relaxed mb-3">{config.ecoNote}</p>
              <Link href="/guide/eco-jaws" className="text-sm font-bold text-green-700 hover:text-green-900 underline">
                エコジョーズについて詳しく見る →
              </Link>
            </div>
          </div>
        </section>

        {/* 対応メーカー */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.name}で対応できる給湯器メーカー</h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              {[
                { name: 'リンナイ', href: '/rinnai', desc: '国内シェアNo.1。RUF-Aシリーズ（オート・フルオート）を取り扱い。', color: 'border-red-200 bg-red-50', textColor: 'text-red-700' },
                { name: 'ノーリツ', href: '/noritz', desc: 'ユコアGT-70シリーズ。エコジョーズシリーズも豊富にラインナップ。', color: 'border-blue-200 bg-blue-50', textColor: 'text-blue-700' },
                { name: 'パロマ', href: '/paloma', desc: 'FH-Eシリーズ。シンプルで扱いやすく、コスト面でも選びやすい。', color: 'border-indigo-200 bg-indigo-50', textColor: 'text-indigo-700' },
              ].map((m) => (
                <Link key={m.name} href={m.href} className={`block border rounded-xl p-5 hover:shadow-sm transition-shadow ${m.color}`}>
                  <div className={`font-black text-base mb-2 ${m.textColor}`}>{m.name}</div>
                  <p className="text-xs text-gray-600 leading-relaxed">{m.desc}</p>
                  <span className="text-xs font-bold text-gray-500 mt-2 inline-block">一覧を見る →</span>
                </Link>
              ))}
            </div>
            <p className="text-xs text-gray-500">どのメーカーでも対応できます。現在お使いの給湯器と同じメーカーでの交換も、別メーカーへの変更も可能です。</p>
          </div>
        </section>

        {/* 費用目安 */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4">{config.name}での給湯器交換費用の目安</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{config.priceNote}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-xs font-bold text-gray-500 mb-1">標準工事費（税抜）</div>
                  <div className="text-2xl font-black text-brand-900">38,000円</div>
                  <div className="text-xs text-gray-400 mt-0.5">処分費・試運転・説明含む</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-xs font-bold text-gray-500 mb-1">工事費込み税込の目安</div>
                  <div className="text-2xl font-black text-red-600">150,000円前後〜</div>
                  <div className="text-xs text-gray-400 mt-0.5">本体・リモコン・標準工事費含む</div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">※設置タイプ・号数・機種によって変動します。正確な金額はお見積もりにてご確認ください。</p>
            </div>
          </div>
        </section>

        {/* 見積もりの流れ */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">見積もり・工事の流れ</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {estimateSteps.map((s) => (
                <div key={s.step} className="relative bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <div className="text-3xl font-black text-brand-200 mb-2">{s.step}</div>
                  <div className="font-black text-gray-900 text-sm mb-1.5">{s.title}</div>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* おすすめ商品 */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">{config.name}で人気の給湯器</h2>
            <p className="text-gray-500 text-sm mb-6">工事費込み税込価格 / 24号オートタイプ</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link href="/rinnai" className="text-brand-700 font-bold text-sm hover:underline">リンナイ一覧 →</Link>
              <Link href="/noritz" className="text-brand-700 font-bold text-sm hover:underline">ノーリツ一覧 →</Link>
              <Link href="/paloma" className="text-brand-700 font-bold text-sm hover:underline">パロマ一覧 →</Link>
            </div>
          </div>
        </section>

        {/* 内部リンク */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-base font-black text-gray-700 mb-4">関連する情報・ページ</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                { href: '/guide/capacity', label: '号数の選び方' },
                { href: '/guide/eco-jaws', label: 'エコジョーズとは' },
                { href: '/guide/full-auto-auto', label: 'オートとフルオートの違い' },
                { href: '/guide/lifespan', label: '給湯器の寿命' },
                { href: '/guide/error-code', label: 'エラーコード一覧' },
                { href: '/cases', label: '施工事例' },
                { href: '/estimate', label: '無料見積もり依頼' },
                { href: '/warranty', label: '保証・アフター' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-brand-700 transition-colors text-center"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-gray-900 mb-6">{config.name}の給湯器交換 よくある質問</h2>
            <div className="space-y-4">
              {config.faqs.map((f, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="p-4 flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-brand-700 text-white text-sm font-black flex items-center justify-center rounded-full">Q</span>
                    <div className="font-bold text-gray-900 text-sm">{f.q}</div>
                  </div>
                  <div className="px-4 pb-4 flex items-start gap-3 border-t border-gray-100 pt-4">
                    <span className="flex-shrink-0 w-6 h-6 bg-yellow-400 text-gray-900 text-sm font-black flex items-center justify-center rounded-full">A</span>
                    <div className="text-gray-600 text-sm leading-relaxed">{f.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-brand-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-black mb-2">{config.name}の給湯器交換はお任せください</h2>
            <p className="text-blue-200 text-sm mb-6">無料見積もり受付中。{config.name}全域対応。電話・LINE・フォームからご相談ください。</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/estimate"
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-lg px-8 py-4 rounded-lg transition-colors w-full sm:w-auto justify-center"
              >
                無料見積もりを依頼する
              </Link>
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-black text-lg px-8 py-4 rounded-lg transition-colors w-full sm:w-auto justify-center"
              >
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white font-bold text-base px-6 py-3 rounded-lg transition-colors w-full sm:w-auto justify-center"
                style={{ backgroundColor: '#00B900' }}
              >
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
