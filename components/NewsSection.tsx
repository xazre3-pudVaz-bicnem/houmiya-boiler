import { newsData } from '@/data/news'

export default function NewsSection() {
  return (
    <section className="bg-white py-14 md:py-20" id="news">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="mb-8">
          <p className="section-label mb-2">お知らせ・コラム</p>
          <h2 className="section-heading">給湯器に関するお役立ち情報</h2>
          <span className="section-divider" />
          <p className="text-slate-500 text-sm mt-4">
            給湯器の選び方・トラブル対処・お得な交換時期など、役立つ情報を発信しています。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {newsData.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="group bg-white border border-slate-200 rounded-lg p-5 hover:border-sky hover:shadow-card-md transition-all duration-200 flex gap-4"
            >
              {/* Date + category */}
              <div className="flex-shrink-0 w-16 text-center">
                <div className="text-slate-400 text-[10px] font-semibold leading-none">{item.date}</div>
                <div className={`mt-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded border ${item.categoryColor}`}>
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-brand-800 text-sm leading-snug mb-1.5 group-hover:text-sky-dark transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{item.excerpt}</p>
              </div>

              <div className="flex-shrink-0 flex items-center">
                <svg className="w-4 h-4 text-slate-300 group-hover:text-sky transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-sky text-brand-800 font-bold py-3 px-6 rounded transition-all text-sm shadow-card"
          >
            コラム一覧を見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
