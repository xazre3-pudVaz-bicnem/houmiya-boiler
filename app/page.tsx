import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  Flame, Building2, DoorOpen, Leaf, ThermometerSun, Droplet,
  RefreshCw, ShieldCheck, Wrench, PhoneCall,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import ProductCard from '@/components/ProductCard'
import EstimateForm from '@/components/EstimateForm'
import BlogSection from '@/components/BlogSection'
import { getProductsByMaker, constructionFeeItems, additionalFeeItems, formatPrice } from '@/data/products'
import { casesData } from '@/data/cases'
import { guidesData } from '@/data/guides'
import { areasData } from '@/data/areas'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: '横浜市の給湯器交換・販売なら株式会社宝宮設備｜リンナイ・ノーリツ・パロマ対応',
  description:
    '横浜市・川崎市・厚木市・海老名市で給湯器交換・販売なら株式会社宝宮設備。リンナイ・ノーリツ・パロマなど主要メーカー対応。給湯器の交換・撤去・販売まで自社施工で迅速対応。無料見積もり・LINE相談対応。',
  alternates: { canonical: siteConfig.baseUrl },
}

const makerInfo = [
  {
    slug: 'rinnai',
    name: 'リンナイ',
    nameEn: 'Rinnai',
    tagline: '国内No.1シェアの信頼ブランド',
    accentColor: 'border-red-200',
    discountLabel: '最大80%OFF',
    discountColor: 'bg-red-600',
    productCount: 6,
  },
  {
    slug: 'noritz',
    name: 'ノーリツ',
    nameEn: 'NORITZ',
    tagline: 'エコジョーズで省エネ給湯',
    accentColor: 'border-blue-200',
    discountLabel: '最大79%OFF',
    discountColor: 'bg-blue-700',
    productCount: 6,
  },
  {
    slug: 'paloma',
    name: 'パロマ',
    nameEn: 'Paloma',
    tagline: 'コスパ抜群のスタンダードモデル',
    accentColor: 'border-indigo-200',
    discountLabel: '最大84%OFF',
    discountColor: 'bg-indigo-700',
    productCount: 6,
  },
]

const categoryLinks = [
  { href: '/category/gas-furo', label: 'ガスふろ給湯器', desc: '追い焚き機能付き', Icon: Flame },
  { href: '/category/ps-standard', label: 'PS標準設置型', desc: 'マンション向け', Icon: Building2 },
  { href: '/category/ps-door', label: 'PS扉内設置型', desc: 'パイプスペース扉内', Icon: DoorOpen },
  { href: '/category/eco-jaws', label: 'エコジョーズ', desc: '省エネ・省コスト', Icon: Leaf },
  { href: '/category/warm-water-heating', label: '暖房付き給湯器', desc: '床暖房・浴室暖房対応', Icon: ThermometerSun },
  { href: '/category/gas-kyuto', label: '給湯専用', desc: '給湯のみシンプルタイプ', Icon: Droplet },
]

const specialExchangeLinks = [
  { href: '/category/gas-furo', label: 'TES熱源機からの交換', desc: 'ガス温水暖房への切り替え' },
  { href: '/category/gas-furo', label: 'エコウィルからの交換', desc: '給湯器への切り替え' },
  { href: '/category/eco-jaws', label: 'エネファームからの交換', desc: '省エネ給湯器への切り替え' },
]

const orderSteps = [
  { step: 'STEP 1', title: 'お問い合わせ', desc: '電話・LINE・フォームからご連絡ください' },
  { step: 'STEP 2', title: '写真確認・お見積り', desc: '給湯器の写真をお送りいただき、最短即日でお見積りをご提示' },
  { step: 'STEP 3', title: '機種・日程決定', desc: 'ご希望の機種と施工日程を確定します' },
  { step: 'STEP 4', title: '施工・試運転', desc: '自社スタッフが安全・丁寧に施工。当日から使用可能' },
  { step: 'STEP 5', title: 'お支払い', desc: '工事完了後のお支払い。現金・振込対応' },
]

const faqs = [
  { q: '給湯器交換は最短いつ対応できますか？', a: '在庫状況・現場状況によりますが最短即日対応も可能です。まずはお電話またはLINEでご相談ください。' },
  { q: '工事時間はどれくらいかかりますか？', a: '標準的な給湯器交換は2〜4時間程度が目安です。設置状況により前後します。' },
  { q: 'マンションの給湯器交換もできますか？', a: 'はい。PS設置タイプを含む各種マンション対応機種に対応しています。' },
  { q: '古い給湯器の撤去・処分もお願いできますか？', a: '標準工事費に撤去・処分費を含んでいます。特殊な状況では別途ご相談ください。' },
  { q: '追加費用が発生することはありますか？', a: '配管延長・高所作業・特殊な設置環境の場合は追加費用が発生することがあります。事前にご説明します。' },
  { q: '見積もりだけでも依頼できますか？', a: 'はい。見積もり無料です。給湯器の全体写真・型番ラベルをLINEまたはフォームからお送りください。' },
]

// トップ表示用商品
const rinnaiProducts = getProductsByMaker('rinnai').slice(0, 3)
const noritzProducts = getProductsByMaker('noritz').slice(0, 3)
const palomaProducts = getProductsByMaker('paloma').slice(0, 3)
const recentCases = casesData.slice(0, 6)

const LineIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
  </svg>
)

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-[100px]">

        {/* ═══════════════════════════════════
            1. ヒーローバナー
        ═══════════════════════════════════ */}
        <section className="w-full bg-blue-50">
          <Image
            src="/hero-banner.png"
            alt="横浜市・川崎市・厚木市・海老名市対応 給湯器交換なら宝宮設備 最大80%OFF 工事費込み価格"
            width={1600}
            height={800}
            priority
            className="w-full h-auto block"
          />
        </section>

        {/* ═══════════════════════════════════
            2. メーカー別導線
        ═══════════════════════════════════ */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-center text-2xl font-black text-gray-900 mb-2">
              メーカーで給湯器を探す
            </h2>
            <p className="text-center text-gray-500 text-sm mb-8">
              リンナイ・ノーリツ・パロマ対応。最大80%OFFの工事費込み価格でご提供。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {makerInfo.map((m) => (
                <Link
                  key={m.slug}
                  href={`/${m.slug}`}
                  className={`group border-2 ${m.accentColor} hover:border-brand-400 rounded-xl p-6 flex flex-col bg-white transition-all hover:shadow-lg`}
                >
                  {/* テキストロゴ */}
                  <div className="mb-3">
                    <div className="text-2xl font-black tracking-tight text-gray-900 leading-none">{m.nameEn}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{m.name}</div>
                  </div>
                  <div className="text-sm text-gray-500 mb-3 leading-snug">{m.tagline}</div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`${m.discountColor} text-white font-black text-xs px-3 py-1 rounded`}>
                      {m.discountLabel}
                    </span>
                    <span className="text-xs text-gray-500">{m.productCount}機種掲載</span>
                  </div>
                  <div className="mt-auto text-brand-700 font-bold text-sm group-hover:underline flex items-center gap-1">
                    商品一覧を見る
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            3. 無料見積もり導線
        ═══════════════════════════════════ */}
        <section className="py-8 bg-yellow-50 border-y-2 border-yellow-300">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="text-yellow-700 font-black text-sm uppercase tracking-wider mb-2">完全無料</div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              給湯器の写真を送るだけで即日お見積り
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              現在お使いの給湯器と型番ラベルの写真をお送りください。最短即日で工事費込みの価格をご案内します。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/estimate"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black text-lg px-8 py-4 rounded-lg shadow-lg transition-colors w-full sm:w-auto justify-center"
              >
                無料お見積りフォームへ
              </Link>
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-2 bg-white border-2 border-yellow-400 text-gray-900 font-black text-lg px-8 py-4 rounded-lg transition-colors w-full sm:w-auto justify-center"
              >
                <svg className="w-5 h-5 text-brand-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            4. LINE相談導線
        ═══════════════════════════════════ */}
        <section className="py-6 bg-white border-b">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#00B900' }}>
                <LineIcon />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="font-black text-lg text-gray-900 mb-1">LINEで簡単！写真を送るだけで即日見積もり</div>
                <div className="text-gray-600 text-sm">文字入力が面倒な方も、写真を送るだけでOK。24時間受付中。</div>
              </div>
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-2 text-white font-black text-base px-6 py-3 rounded-lg shadow-md transition-colors"
                style={{ backgroundColor: '#00B900' }}
              >
                <LineIcon />
                LINEで無料相談
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            5. 施工事例 新着一覧
        ═══════════════════════════════════ */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black text-gray-900">施工事例</h2>
                <p className="text-gray-500 text-sm mt-1">横浜・川崎・厚木・海老名の最新施工事例</p>
              </div>
              <Link href="/cases" className="text-brand-700 text-sm font-bold hover:underline">
                すべて見る →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentCases.map((c) => (
                <div key={c.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                  <div className="aspect-video bg-gray-100 relative overflow-hidden">
                    <Image
                      src={c.imageSrc}
                      alt={c.imageAlt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="bg-brand-700 text-white text-[10px] font-bold px-2 py-0.5 rounded">{c.date}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{c.area}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{c.buildingType}</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-1">交換後：{c.afterModel}</div>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{c.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/cases"
                className="inline-flex items-center gap-2 border-2 border-brand-700 text-brand-700 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                施工事例をもっと見る
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            6. ガスふろ給湯器 商品カテゴリ（リンナイ人気商品）
        ═══════════════════════════════════ */}
        <section className="py-12 bg-white" id="products">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded mb-2 inline-block">最大80%OFF</span>
                <h2 className="text-2xl font-black text-gray-900">
                  リンナイ ガスふろ給湯器
                </h2>
                <p className="text-gray-500 text-sm mt-1">壁掛型 / RUF-Aシリーズ / 工事費込み価格</p>
              </div>
              <Link href="/rinnai" className="text-brand-700 text-sm font-bold hover:underline hidden sm:block">
                リンナイ全商品を見る →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {rinnaiProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="text-center">
              <Link href="/rinnai" className="inline-flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white font-bold px-8 py-3 rounded-lg transition-colors">
                リンナイ全商品を見る
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            7. 戸建用／マンション用 設置タイプ導線
        ═══════════════════════════════════ */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">設置タイプで選ぶ</h2>
            <p className="text-gray-500 text-sm mb-8 text-center">戸建て・マンションの設置環境に合わせた機種をご提案</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categoryLinks.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:border-brand-400 hover:shadow-md transition-all group"
                >
                  <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-blue-50 rounded-lg text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-colors">
                    <cat.Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-sm group-hover:text-brand-700 leading-tight">{cat.label}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{cat.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            8. TES熱源機・エコウィル・エネファームからの交換
        ═══════════════════════════════════ */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">特殊機種からの交換</h2>
            <p className="text-gray-500 text-sm mb-8 text-center">TES熱源機・エコウィル・エネファームからの交換もお任せください</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {specialExchangeLinks.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="border border-orange-200 bg-orange-50 rounded-xl p-6 hover:border-orange-400 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                    <RefreshCw className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="font-black text-gray-900 text-base mb-1">{s.label}</div>
                  <div className="text-gray-500 text-sm">{s.desc}</div>
                  <div className="mt-4 text-brand-700 font-bold text-sm group-hover:underline">詳しく見る →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            9. ノーリツ商品一覧
        ═══════════════════════════════════ */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="bg-blue-800 text-white text-xs font-black px-3 py-1 rounded mb-2 inline-block">最大79%OFF</span>
                <h2 className="text-2xl font-black text-gray-900">ノーリツ ガスふろ給湯器</h2>
                <p className="text-gray-500 text-sm mt-1">壁掛型 / ユコアGT-70シリーズ / 工事費込み価格</p>
              </div>
              <Link href="/noritz" className="text-brand-700 text-sm font-bold hover:underline hidden sm:block">
                ノーリツ全商品を見る →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {noritzProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="text-center">
              <Link href="/noritz" className="inline-flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white font-bold px-8 py-3 rounded-lg transition-colors">
                ノーリツ全商品を見る
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            パロマ商品一覧
        ═══════════════════════════════════ */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="bg-indigo-700 text-white text-xs font-black px-3 py-1 rounded mb-2 inline-block">最大84%OFF</span>
                <h2 className="text-2xl font-black text-gray-900">パロマ ガスふろ給湯器</h2>
                <p className="text-gray-500 text-sm mt-1">壁掛型 / FH シリーズ / 工事費込み価格</p>
              </div>
              <Link href="/paloma" className="text-brand-700 text-sm font-bold hover:underline hidden sm:block">
                パロマ全商品を見る →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {palomaProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="text-center">
              <Link href="/paloma" className="inline-flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white font-bold px-8 py-3 rounded-lg transition-colors">
                パロマ全商品を見る
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            10. キャンペーン・補助金情報
        ═══════════════════════════════════ */}
        <section className="py-12 bg-yellow-50 border-y-2 border-yellow-200">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">キャンペーン・補助金情報</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border-2 border-yellow-300 p-6">
                <div className="text-yellow-600 font-black text-sm mb-2">写真送付特典</div>
                <h3 className="font-black text-lg text-gray-900 mb-2">給湯器の写真を送って特別割引</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  お問い合わせ時に現在の給湯器の写真と型番ラベルの写真をお送りいただくと、
                  現地調査不要で即日お見積りが可能です。スムーズな施工のご協力に感謝して
                  特別価格でご案内します。
                </p>
                <Link href="/estimate" className="mt-4 inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-black text-sm px-5 py-2.5 rounded-lg transition-colors">
                  写真を送って見積もりする
                </Link>
              </div>
              <div className="bg-white rounded-xl border-2 border-green-300 p-6">
                <div className="text-green-600 font-black text-sm mb-2">省エネ補助金</div>
                <h3 className="font-black text-lg text-gray-900 mb-2">給湯器交換で補助金が受けられる場合があります</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  エコジョーズなどの省エネ給湯器への交換で、国や自治体の補助金制度が
                  利用できる場合があります。補助金の対象・申請方法についてもお気軽にご相談ください。
                </p>
                <Link href="/estimate" className="mt-4 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors">
                  補助金について相談する
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            11. ご注文の流れ
        ═══════════════════════════════════ */}
        <section className="py-12 bg-white" id="order-flow">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">給湯器ご注文の流れ</h2>
            <p className="text-gray-500 text-sm mb-10 text-center">お問い合わせから施工完了まで、最短1日で対応</p>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {orderSteps.map((s, i) => (
                <div key={s.step} className="relative flex flex-col items-center text-center">
                  {i < orderSteps.length - 1 && (
                    <div className="hidden sm:block absolute top-6 left-[calc(50%+24px)] w-full h-0.5 bg-brand-200" />
                  )}
                  <div className="w-12 h-12 rounded-full bg-brand-900 text-white font-black text-sm flex items-center justify-center mb-3 relative z-10">
                    {i + 1}
                  </div>
                  <div className="text-[10px] font-bold text-brand-600 mb-1">{s.step}</div>
                  <div className="font-black text-gray-900 text-sm mb-1">{s.title}</div>
                  <div className="text-gray-500 text-xs">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            12. 標準工事費
        ═══════════════════════════════════ */}
        <section className="py-12 bg-gray-50" id="construction-fee">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">標準工事費について</h2>
            <p className="text-gray-500 text-sm mb-8 text-center">
              すべての商品に標準取付費（処分費込）が含まれます
            </p>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-brand-900 text-white p-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                <div>
                  <div className="font-black text-xl">標準取付費（処分費込）</div>
                  <div className="text-blue-200 text-sm">以下の作業がすべて含まれます</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-3xl font-black">{siteConfig.constructionFeeDisplay}</div>
                  <div className="text-blue-200 text-sm">税込 {siteConfig.constructionFeeDisplayInTax}</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-black text-gray-900 text-sm mb-3">標準工事に含まれる内容</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
                  {constructionFeeItems.map((item) => (
                    <div key={item} className="flex items-center gap-1.5 text-xs text-gray-700">
                      <svg className="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="font-bold text-yellow-800 text-sm mb-2">追加費用が発生する可能性があるケース</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {additionalFeeItems.map((item) => (
                      <div key={item} className="text-xs text-yellow-700">・{item}</div>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-yellow-700">
                    正式金額は写真確認または現地確認後にご案内します。事前に必ずご説明します。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            13. 保証について
        ═══════════════════════════════════ */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">保証について</h2>
            <p className="text-gray-500 text-sm mb-8 text-center">
              {siteConfig.warrantyNote}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5 text-blue-700" />
                </div>
                <h3 className="font-black text-gray-900 mb-2">メーカー保証</h3>
                <p className="text-sm text-gray-600">各メーカーの標準保証が付属します。延長保証については機種によって異なります。</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <Wrench className="w-5 h-5 text-green-700" />
                </div>
                <h3 className="font-black text-gray-900 mb-2">工事保証</h3>
                <p className="text-sm text-gray-600">施工部分の不具合は弊社が責任をもって対応。工事後のトラブルはお気軽にご連絡ください。</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                  <PhoneCall className="w-5 h-5 text-yellow-700" />
                </div>
                <h3 className="font-black text-gray-900 mb-2">アフターサポート</h3>
                <p className="text-sm text-gray-600">施工後のご相談も電話・LINEで承ります。地元密着だからこそできる迅速なアフター対応。</p>
              </div>
            </div>
            <div className="text-center mt-6">
              <Link href="/warranty" className="text-brand-700 font-bold text-sm hover:underline">
                保証の詳細について →
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            14. 給湯器の基礎知識
        ═══════════════════════════════════ */}
        <section className="py-12 bg-gray-50" id="guide">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">給湯器の基礎知識</h2>
            <p className="text-gray-500 text-sm mb-8 text-center">給湯器選びに役立つ知識をご紹介</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {guidesData.slice(0, 8).map((g) => (
                <Link
                  key={g.slug}
                  href={`/guide/${g.slug}`}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:border-brand-400 hover:shadow-md transition-all group"
                >
                  <div className="text-[10px] font-bold text-brand-600 bg-blue-50 px-2 py-0.5 rounded inline-block mb-2">
                    {g.category}
                  </div>
                  <div className="font-bold text-gray-900 text-sm group-hover:text-brand-700 leading-tight">
                    {g.title.split('｜')[0]}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            15. 対応エリア
        ═══════════════════════════════════ */}
        <section className="py-12 bg-white" id="area">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">対応エリア</h2>
            <p className="text-gray-500 text-sm mb-8 text-center">
              横浜市・川崎市・厚木市・海老名市を中心に神奈川県内に迅速対応
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {areasData.map((area) => (
                <div key={area.city} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <Link
                    href={`/area/${area.city === '横浜市' ? 'yokohama' : area.city === '川崎市' ? 'kawasaki' : area.city === '厚木市' ? 'atsugi' : 'ebina'}`}
                    className="font-black text-lg text-brand-700 hover:underline mb-2 block"
                  >
                    {area.city} →
                  </Link>
                  {area.wards && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {area.wards.map((w) => (
                        <span key={w} className="text-xs bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded">
                          {w}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 leading-relaxed">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            16. FAQ
        ═══════════════════════════════════ */}
        <section className="py-12 bg-gray-50" id="faq">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">よくある質問</h2>
            <div className="space-y-4">
              {faqs.map((f, i) => (
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

        {/* ═══════════════════════════════════
            17. 給湯器コラム（WordPressブログ最新3件）
        ═══════════════════════════════════ */}
        <BlogSection />

        {/* ═══════════════════════════════════
            18. お問い合わせフォーム（speed-estimate）
        ═══════════════════════════════════ */}
        <section className="py-12 bg-white" id="speed-estimate">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">無料お見積りフォーム</h2>
            <p className="text-gray-500 text-sm mb-8 text-center">
              現在の給湯器の写真を添付いただくと最短即日でお見積りをご案内できます
            </p>
            <EstimateForm />
          </div>
        </section>

      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}
