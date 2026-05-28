import Image from 'next/image'
import { staffImages } from '@/data/images'

export default function RepresentativeSection() {
  return (
    <section className="bg-white py-14 md:py-20" id="representative">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="mb-10">
          <p className="section-label mb-2">代表からのメッセージ</p>
          <h2 className="section-heading">
            自社施工にこだわり、<br className="hidden md:block" />
            地域の皆様の「困った」に向き合います
          </h2>
          <span className="section-divider" />
        </div>

        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
          {/* Photo */}
          <div className="md:col-span-2 flex justify-center">
            <div className="relative">
              <div className="w-48 h-60 md:w-64 md:h-80 rounded-lg overflow-hidden shadow-card-md border border-slate-200">
                <Image
                  src={staffImages.representative.src}
                  alt={staffImages.representative.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 192px, 256px"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-brand-800 text-white text-xs font-bold px-4 py-1.5 rounded shadow">
                代表 小宮 龍亮
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="md:col-span-3">
            <div className="text-brand-100 text-6xl font-black leading-none mb-2 select-none">&ldquo;</div>
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed -mt-4">
              <p>
                はじめまして。株式会社宝宮設備、代表の小宮龍亮です。
                神奈川県厚木市を拠点に、横浜市・川崎市・厚木市・海老名市の皆様の
                給湯器交換・販売に携わっています。
              </p>
              <p>
                給湯器は毎日使うものです。急に壊れると、特に冬場は本当に困りますよね。
                「早く直してほしい」「費用が不安」「どこに頼めばいいかわからない」
                そういったお悩みをお持ちの方に、迅速かつ誠実に対応することが私たちの使命です。
              </p>
              <p>
                宝宮設備は<strong className="text-brand-800">すべて自社スタッフによる施工</strong>を徹底しています。
                下請けに丸投げするのではなく、相談から工事・アフターフォローまで
                責任を持って一貫して対応します。
                「また何かあったときに頼める会社」を目指して、日々取り組んでいます。
              </p>
              <p>
                ご不安なことは何でもお気軽にお聞かせください。
                最善の方法をご提案いたします。
              </p>
            </div>

            {/* Signature */}
            <div className="mt-6 pt-5 border-t border-slate-200 flex items-center gap-4">
              <div>
                <div className="text-slate-400 text-xs mb-0.5">株式会社宝宮設備 代表取締役</div>
                <div className="text-brand-900 font-black text-xl">小宮 龍亮</div>
              </div>
              <div className="ml-auto flex gap-2">
                <div className="text-center bg-brand-800 rounded p-3 min-w-[64px]">
                  <div className="text-sky font-black text-base leading-none">自社</div>
                  <div className="text-slate-400 text-xs mt-0.5">施工</div>
                </div>
                <div className="text-center bg-brand-800 rounded p-3 min-w-[64px]">
                  <div className="text-sky font-black text-base leading-none">即日</div>
                  <div className="text-slate-400 text-xs mt-0.5">対応可</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: '対応エリア', value: '4市・神奈川県内' },
            { label: '対応メーカー', value: 'リンナイ・ノーリツ・パロマ' },
            { label: '施工体制', value: '自社スタッフによる一貫施工' },
            { label: '対応時間', value: '9:00〜18:00（相談24時間）' },
          ].map((item) => (
            <div key={item.label} className="bg-slate-50 border border-slate-200 rounded p-4 text-center">
              <div className="text-slate-400 text-[10px] mb-1">{item.label}</div>
              <div className="text-brand-800 font-bold text-xs leading-tight">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
