import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: 'お問い合わせありがとうございます | 宝宮設備',
  description: 'お問い合わせを受け付けました。担当者より折り返しご連絡いたします。',
  robots: { index: false, follow: false },
}

export default function ThanksPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-[100px]">
        <div className="max-w-xl mx-auto px-4 py-20">

          {/* アイコン */}
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-black text-gray-900 mb-3 text-center">
            お問い合わせありがとうございます
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed mb-10 text-center">
            内容を確認次第、担当者より折り返しご連絡いたします。
            <br />
            通常1〜2時間以内にご連絡します（{siteConfig.hours}）。
          </p>

          {/* 次のステップ */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
            <p className="text-sm font-black text-gray-800 mb-5">次のステップ</p>
            <ol className="space-y-5">
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-7 h-7 bg-brand-700 text-white text-xs font-black flex items-center justify-center rounded-full mt-0.5">1</span>
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-0.5">折り返し連絡をお待ちください</p>
                  <p className="text-xs text-gray-500 leading-relaxed">通常1〜2時間以内にお電話またはLINEにてご連絡いたします（{siteConfig.hours}）。</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-7 h-7 bg-brand-700 text-white text-xs font-black flex items-center justify-center rounded-full mt-0.5">2</span>
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-0.5">写真の送付（未送付の場合）</p>
                  <p className="text-xs text-gray-500 leading-relaxed">まだ写真を送っていない場合は、今からLINEで送ると見積もりがスムーズです。給湯器の全体・型番・配管まわりの写真をお送りください。</p>
                  <a
                    href={siteConfig.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-white font-bold text-xs px-4 py-2 rounded-lg mt-2 transition-colors"
                    style={{ backgroundColor: '#00B900' }}
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.07 9.437-6.975C23.176 14.393 24 12.458 24 10.314" />
                    </svg>
                    LINEで写真を送る
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-7 h-7 bg-brand-700 text-white text-xs font-black flex items-center justify-center rounded-full mt-0.5">3</span>
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-0.5">現地確認・工事日程調整</p>
                  <p className="text-xs text-gray-500 leading-relaxed">見積もり内容にご了承いただけましたら、現地確認（必要な場合）と工事日程を調整します。最短翌日から対応可能な場合があります。</p>
                </div>
              </li>
            </ol>
          </div>

          {/* お急ぎの場合 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
            <p className="text-sm font-black text-gray-800 mb-4">お急ぎの場合はこちら</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-lg px-6 py-3 rounded-xl transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors"
                style={{ backgroundColor: '#00B900' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.07 9.437-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINEでも相談できます
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-3">受付時間 {siteConfig.hours}</p>
          </div>

          {/* 関連ページ */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
            <p className="text-sm font-black text-gray-800 mb-4">お待ちの間にご覧ください</p>
            <div className="space-y-2">
              <Link
                href="/cases"
                className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-brand-50 border border-gray-200 hover:border-brand-200 rounded-xl transition-colors group"
              >
                <span className="text-sm font-bold text-gray-700 group-hover:text-brand-700">施工事例一覧</span>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/guide/capacity"
                className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-brand-50 border border-gray-200 hover:border-brand-200 rounded-xl transition-colors group"
              >
                <span className="text-sm font-bold text-gray-700 group-hover:text-brand-700">給湯器の号数の選び方</span>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/area/yokohama"
                className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-brand-50 border border-gray-200 hover:border-brand-200 rounded-xl transition-colors group"
              >
                <span className="text-sm font-bold text-gray-700 group-hover:text-brand-700">横浜市の給湯器交換情報</span>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
            >
              トップページに戻る
            </Link>
          </div>

        </div>
      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}
