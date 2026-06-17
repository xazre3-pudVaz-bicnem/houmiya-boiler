'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { CaseItem } from '@/data/cases'

const cities = ['すべて', '横浜市', '川崎市', '厚木市', '海老名市']
const makers = ['すべて', 'リンナイ', 'ノーリツ', 'パロマ']
const installationTypes = ['すべて', '壁掛屋外型', 'PS標準設置型', 'PS扉内設置型']

export default function CasesGrid({ cases }: { cases: CaseItem[] }) {
  const [city, setCity] = useState('すべて')
  const [maker, setMaker] = useState('すべて')
  const [installType, setInstallType] = useState('すべて')

  const filtered = cases.filter((c) => {
    if (city !== 'すべて' && c.city !== city) return false
    if (maker !== 'すべて' && c.maker !== maker) return false
    if (installType !== 'すべて' && c.installationType !== installType) return false
    return true
  })

  const FilterButton = ({
    label,
    active,
    onClick,
  }: {
    label: string
    active: boolean
    onClick: () => void
  }) => (
    <button
      onClick={onClick}
      className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
        active
          ? 'bg-brand-700 text-white border-brand-700'
          : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300 hover:text-brand-700'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div>
      {/* フィルター */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 space-y-3">
        <div>
          <p className="text-xs text-gray-500 font-bold mb-2">エリア</p>
          <div className="flex flex-wrap gap-2">
            {cities.map((c) => (
              <FilterButton key={c} label={c} active={city === c} onClick={() => setCity(c)} />
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-bold mb-2">メーカー</p>
          <div className="flex flex-wrap gap-2">
            {makers.map((m) => (
              <FilterButton key={m} label={m} active={maker === m} onClick={() => setMaker(m)} />
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-bold mb-2">設置タイプ</p>
          <div className="flex flex-wrap gap-2">
            {installationTypes.map((t) => (
              <FilterButton key={t} label={t} active={installType === t} onClick={() => setInstallType(t)} />
            ))}
          </div>
        </div>
      </div>

      {/* 件数 */}
      <p className="text-xs text-gray-500 mb-4">{filtered.length}件の施工事例</p>

      {/* グリッド */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <Link
              key={c.id}
              href={`/cases/${c.slug}`}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                <Image
                  src={c.imageSrc}
                  alt={c.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized={c.imageSrc.startsWith('https://images.microcms')}
                />
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                  <span className="bg-brand-700 text-white text-[10px] font-bold px-2 py-0.5 rounded">{c.date}</span>
                  <span className="bg-white text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded">{c.maker}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{c.area}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{c.buildingType}</span>
                  <span className="text-xs bg-blue-50 text-brand-700 px-2 py-0.5 rounded">{c.installationType}</span>
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  <span className="font-bold text-gray-700">交換後：</span>{c.afterModel}
                </div>
                <div className="text-xs text-gray-500 mb-3">
                  <span className="font-bold text-gray-700">施工時間：</span>{c.duration}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{c.comment}</p>
                <div className="mt-3">
                  <span className="text-xs font-bold text-brand-700 group-hover:underline">詳しく見る →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-sm">該当する施工事例が見つかりませんでした。</p>
          <button
            onClick={() => { setCity('すべて'); setMaker('すべて'); setInstallType('すべて') }}
            className="mt-3 text-xs font-bold text-brand-700 hover:underline"
          >
            フィルターをリセット
          </button>
        </div>
      )}
    </div>
  )
}
