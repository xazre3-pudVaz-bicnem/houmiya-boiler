import Link from 'next/link'

const capacities = [
  {
    size: 16,
    label: '一人暮らし向け',
    desc: '1〜2人でご使用の場合に向いています。コンパクトで価格も抑えやすい号数です。',
  },
  {
    size: 20,
    label: '2〜3人家族向け',
    desc: 'シャワーとキッチンのお湯を同時に使えます。最もスタンダードな号数です。',
  },
  {
    size: 24,
    label: '4人以上の家族向け',
    desc: 'お湯の使用量が多いご家庭向け。複数箇所の同時使用も安定して対応できます。',
  },
]

type Props = {
  className?: string
}

export default function CapacityGuide({ className = '' }: Props) {
  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-xl p-5 md:p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-black text-blue-900">号数の目安</h3>
        <Link
          href="/guide/capacity"
          className="text-xs text-blue-600 hover:text-blue-800 underline"
        >
          詳しく見る
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {capacities.map((c) => (
          <div key={c.size} className="bg-white rounded-lg px-4 py-3 border border-blue-100">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-lg font-black text-blue-900">{c.size}号</span>
              <span className="text-xs font-bold text-blue-700">{c.label}</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-blue-700 leading-relaxed">
        号数は1分間に作れるお湯の量の目安です。キッチンとお風呂を同時に使うご家庭では、少し余裕のある号数がおすすめです。
        適した号数は使用人数・設置状況によって変わります。迷った場合はお気軽にご相談ください。
      </p>
    </div>
  )
}
