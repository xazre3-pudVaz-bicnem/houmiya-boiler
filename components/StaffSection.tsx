import Image from 'next/image'
import { staffImages } from '@/data/images'

const staffMembers = [
  {
    name: '小宮 龍亮',
    role: '代表 / 施工責任者',
    specialty: '給湯器交換・設備工事全般',
    message: '丁寧な説明と確実な施工を心がけています。不安なことは何でも聞いてください。',
    tags: ['資格保有', '豊富な実績'],
    image: staffImages.representative,
  },
  {
    name: '施工スタッフ A',
    role: '設備技術士',
    specialty: 'マンション・集合住宅専門',
    message: 'マンションのPS設置など複雑な環境でも対応。迅速・丁寧に施工します。',
    tags: ['マンション対応', '即日対応'],
    image: staffImages.technician1,
  },
  {
    name: '施工スタッフ B',
    role: '設備技術士',
    specialty: '戸建て・エコジョーズ専門',
    message: 'エコジョーズへの交換やドレン配管など、複雑な工事にも対応します。',
    tags: ['エコジョーズ', '戸建て対応'],
    image: staffImages.technician2,
  },
]

export default function StaffSection() {
  return (
    <section className="bg-slate-50 py-14 md:py-20" id="staff">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="mb-10">
          <p className="section-label mb-2">施工スタッフ</p>
          <h2 className="section-heading">すべて自社スタッフによる施工</h2>
          <span className="section-divider" />
          <p className="text-slate-500 text-sm mt-4 max-w-lg">
            宝宮設備は外注・下請けを使いません。
            資格を持つ自社スタッフが責任を持って施工・アフターフォローまで一貫対応します。
          </p>
        </div>

        {/* Emphasis block */}
        <div className="bg-brand-800 rounded-lg p-6 md:p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: '外注なし・自社完結', body: '下請けへの丸投げはしません。見積もり・施工・アフターフォローまですべて自社スタッフが対応します。' },
              { title: '資格保有スタッフが施工', body: 'ガス機器設置スペシャリスト等の資格を持つスタッフが工事にあたります。安全・確実な施工を保証します。' },
              { title: '担当者が最後まで対応', body: '相談から工事完了・アフターフォローまで同じスタッフが担当するため、情報の行き違いがありません。' },
            ].map((item) => (
              <div key={item.title}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 bg-sky rounded-full" />
                  <h3 className="font-bold text-white text-sm">{item.title}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Staff cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {staffMembers.map((s) => (
            <div
              key={s.name}
              className="bg-white rounded-lg overflow-hidden border border-slate-200 shadow-card hover:shadow-card-md transition-all duration-200"
            >
              {/* Photo */}
              <div className="relative h-44">
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute bottom-2 right-2 bg-brand-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  自社スタッフ
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-sky text-xs font-bold mb-0.5">{s.role}</p>
                <h3 className="font-black text-brand-800 text-base mb-0.5">{s.name}</h3>
                <p className="text-slate-400 text-xs mb-3">得意分野：{s.specialty}</p>
                <p className="text-slate-600 text-xs leading-relaxed mb-3 border-l-2 border-slate-200 pl-2.5 italic">{s.message}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span key={tag} className="bg-sky/10 text-sky-dark text-[11px] font-semibold px-2 py-0.5 rounded border border-sky/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
