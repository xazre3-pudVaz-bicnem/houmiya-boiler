import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FixedCTA from '@/components/FixedCTA'
import Breadcrumb from '@/components/Breadcrumb'
import CTABanner from '@/components/CTABanner'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'お客様の声・口コミ｜給湯器交換｜株式会社宝宮設備',
  description: '横浜市・川崎市・厚木市・海老名市で給湯器交換を依頼されたお客様からいただいたご感想・口コミをご紹介します。',
  alternates: { canonical: 'https://www.houmiya-boiler.com/voice' },
  openGraph: {
    title: 'お客様の声・口コミ｜宝宮設備',
    description: '横浜市・川崎市・厚木市・海老名市で給湯器交換を依頼されたお客様からいただいたご感想・口コミをご紹介します。',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

const voices = [
  { area: '横浜市戸塚区', building: '戸建て', rating: 5, title: '急な故障でも当日対応していただけました', body: '冬の朝に突然お湯が出なくなり、慌てて電話しました。当日午後には来ていただき、翌日には新しい給湯器が設置完了。本当に助かりました。', name: 'T様（50代）' },
  { area: '川崎市中原区', building: 'マンション', rating: 5, title: '料金が明確で安心してお願いできました', body: '見積もりの際に追加費用が発生する可能性についても事前に説明してもらえたので、安心してお願いできました。実際の費用も見積もりとほぼ同額でした。', name: 'K様（40代）' },
  { area: '厚木市', building: '戸建て', rating: 5, title: 'エコジョーズに変えてガス代が下がりました', body: 'エコジョーズについて丁寧に説明してくれて、設置環境の確認も事前にしっかりやってくれました。交換後はガス代が月に1000円以上下がっています。', name: 'M様（60代）' },
  { area: '海老名市', building: 'アパート', rating: 5, title: 'オーナーとして複数台を依頼', body: '所有アパートの給湯器を一気に交換しました。複数台でも効率よく作業していただき、入居者への影響も最小限でした。今後もお願いしたいと思っています。', name: 'S様（不動産オーナー）' },
  { area: '横浜市港北区', building: 'マンション', rating: 5, title: '操作説明が丁寧でわかりやすかった', body: '新しい給湯器のリモコン操作を、年配の親のためにわかりやすく説明してくれました。工事後も何かあれば気軽に聞いていいと言ってくれたので安心です。', name: 'A様（30代）' },
  { area: '川崎市麻生区', building: '戸建て', rating: 5, title: '見積もりから工事まで対応が速い', body: '問い合わせ当日に写真確認で概算を教えてもらえ、翌日には工事完了。スピードが早く、かつ丁寧で満足しています。', name: 'N様（40代）' },
]

export default function VoicePage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumb items={[{ label: 'ホーム', href: '/' }, { label: 'お客様の声' }]} />

        <section className="bg-gradient-to-r from-brand-900 to-brand-800 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h1 className="text-white font-black text-3xl md:text-4xl mb-3">お客様の声</h1>
            <p className="text-slate-200 text-base md:text-lg max-w-xl mx-auto">
              宝宮設備に給湯器交換をご依頼いただいたお客様からいただいたご感想をご紹介します。
            </p>
          </div>
        </section>

        <section className="bg-slate-50 py-14 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-5 mb-10">
              {voices.map((v) => (
                <div key={v.name} className="bg-white rounded-lg p-5 md:p-6 border border-slate-200 shadow-card hover:shadow-card-md transition-all">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: v.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <h2 className="font-black text-brand-800 text-base mb-2 leading-tight">「{v.title}」</h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{v.body}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="bg-brand-800 text-sky-light text-xs font-bold px-2.5 py-1 rounded-lg">{v.area}</span>
                      <span className="bg-slate-100 text-brand-700 text-xs font-medium px-2.5 py-1 rounded-lg">{v.building}</span>
                    </div>
                    <span className="text-gray-400 text-xs">{v.name}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center text-gray-500 text-sm p-5 bg-white rounded-xl border border-slate-200">
              ※ お客様の感想は個人の体験に基づくものです。
            </div>
          </div>
        </section>

        <CTABanner variant="full" title="お客様に選ばれ続ける給湯器交換業者です" />
        <ContactForm />
      </main>
      <Footer />
      <FixedCTA />
    </>
  )
}

