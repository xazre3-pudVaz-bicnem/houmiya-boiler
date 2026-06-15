'use client'

import { useState } from 'react'
import Link from 'next/link'
import { type ProductItem, formatPrice } from '@/data/products'

type FormState = {
  buildingType: string
  installType: string
  size: string
  currentMaker: string
  currentModel: string
  age: string
  symptoms: string[]
  desiredType: string
  desiredMaker: string
  desiredProduct: string
  name: string
  phone: string
  email: string
  address: string
  timing: string
  contactMethod: string
  notes: string
}

const defaultForm = (preProduct: string): FormState => ({
  buildingType: '',
  installType: '',
  size: '',
  currentMaker: '',
  currentModel: '',
  age: '',
  symptoms: [],
  desiredType: '',
  desiredMaker: '',
  desiredProduct: preProduct,
  name: '',
  phone: '',
  email: '',
  address: '',
  timing: '',
  contactMethod: '電話',
  notes: '',
})

function RadioGroup({
  name, value, options, onChange,
}: {
  name: string; value: string; options: string[]; onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <label
          key={opt}
          className={`flex items-center gap-2 cursor-pointer border rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            value === opt
              ? 'bg-brand-900 border-brand-900 text-white'
              : 'bg-white border-slate-200 text-slate-600 hover:border-brand-300'
          }`}
        >
          <input
            type="radio" name={name} value={opt} checked={value === opt}
            onChange={() => onChange(opt)} className="sr-only"
          />
          {opt}
        </label>
      ))}
    </div>
  )
}

function CheckGroup({
  options, values, onChange,
}: {
  options: string[]; values: string[]; onChange: (v: string[]) => void
}) {
  const toggle = (opt: string) =>
    onChange(values.includes(opt) ? values.filter((v) => v !== opt) : [...values, opt])
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <label
          key={opt}
          className={`flex items-center gap-2 cursor-pointer border rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            values.includes(opt)
              ? 'bg-brand-900 border-brand-900 text-white'
              : 'bg-white border-slate-200 text-slate-600 hover:border-brand-300'
          }`}
        >
          <input
            type="checkbox" checked={values.includes(opt)}
            onChange={() => toggle(opt)} className="sr-only"
          />
          {values.includes(opt) && (
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
          {opt}
        </label>
      ))}
    </div>
  )
}

function SectionTitle({ num, title }: { num: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-8 h-8 rounded-full bg-brand-900 text-white font-black text-sm flex items-center justify-center flex-shrink-0">
        {num}
      </div>
      <h2 className="text-lg font-black text-brand-900">{title}</h2>
    </div>
  )
}

type Props = {
  preselectedProduct?: ProductItem
}

export default function EstimateForm({ preselectedProduct }: Props) {
  const [form, setForm] = useState<FormState>(
    defaultForm(preselectedProduct?.model ?? '')
  )
  const [contactOnly, setContactOnly] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [photoNames, setPhotoNames] = useState<string[]>([])

  const set = (key: keyof FormState) => (value: string | string[]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const validate = () => {
    const e: typeof errors = {}
    if (!form.name.trim()) e.name = 'お名前を入力してください'
    if (!form.phone.trim()) e.phone = '電話番号を入力してください'
    if (!form.installType) e.installType = '設置タイプを選択してください'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      const firstErr = document.querySelector('[data-error]')
      firstErr?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setContactOnly(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    setPhotoNames(files.map((f) => f.name))
  }

  if (contactOnly) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-brand-900 mb-3">お電話・LINEにてお承りしています</h2>
        <p className="text-slate-500 text-sm mb-2">
          現在、オンラインフォームからの送信機能は準備中です。
        </p>
        <p className="text-slate-500 text-sm mb-8">
          お見積もり・ご相談はお電話またはLINEにてお気軽にご連絡ください。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="tel:046-205-4558"
            data-cta="phone-estimate"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black px-8 py-3.5 rounded-lg transition-colors shadow"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            046-205-4558
          </a>
          <a
            href="https://line.me/ti/p/XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            data-cta="line-estimate"
            className="inline-flex items-center gap-2 text-white font-black px-8 py-3.5 rounded-lg transition-colors shadow"
            style={{ backgroundColor: '#00B900' }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            LINEで無料相談
          </a>
        </div>
        <p className="text-slate-400 text-xs mt-6">受付時間 9:00〜18:00（年中無休）</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-3xl mx-auto px-4 py-14 space-y-10">

      {/* 商品詳細ページからの遷移バナー */}
      {preselectedProduct && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-sm font-black text-blue-900 mb-0.5">ご希望商品が選択されています</div>
            <div className="text-sm text-blue-700">
              {preselectedProduct.makerLabel} {preselectedProduct.model}（{preselectedProduct.capacity}号 {preselectedProduct.typeLabel}）
            </div>
            <div className="text-xs text-blue-500 mt-1">
              工事費込み税込価格 {formatPrice(preselectedProduct.totalInTax)}円
            </div>
          </div>
          <Link href={preselectedProduct.detailUrl} className="text-xs text-blue-500 hover:text-blue-700 underline flex-shrink-0">
            商品詳細へ
          </Link>
        </div>
      )}

      {/* Section 1 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        <SectionTitle num={1} title="現在の給湯器について教えてください" />
        <div className="space-y-6">

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">建物の種類</label>
            <RadioGroup
              name="buildingType"
              value={form.buildingType}
              options={['戸建て', 'マンション', 'アパート', '集合住宅', 'その他']}
              onChange={set('buildingType')}
            />
          </div>

          <div data-error={errors.installType}>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              設置タイプ <span className="text-red-500 text-xs font-normal">必須</span>
            </label>
            <RadioGroup
              name="installType"
              value={form.installType}
              options={['屋外壁掛型', '屋外据置型', '屋内設置型', 'PS（パイプシャフト）型', 'わからない']}
              onChange={set('installType')}
            />
            {errors.installType && <p className="text-red-500 text-xs mt-1.5">{errors.installType}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">現在の号数</label>
            <RadioGroup
              name="size"
              value={form.size}
              options={['16号', '20号', '24号', 'わからない']}
              onChange={set('size')}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">現在のメーカー</label>
              <RadioGroup
                name="currentMaker"
                value={form.currentMaker}
                options={['リンナイ', 'ノーリツ', 'パロマ', 'その他', 'わからない']}
                onChange={set('currentMaker')}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">現在の型番（わかる場合）</label>
            <input
              type="text"
              value={form.currentModel}
              onChange={(e) => set('currentModel')(e.target.value)}
              placeholder="例：RUF-A2405SAW(C)"
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-300 transition bg-white"
            />
            <p className="text-xs text-gray-400 mt-1">給湯器本体のラベルや取扱説明書に記載されています</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">使用年数</label>
            <RadioGroup
              name="age"
              value={form.age}
              options={['5年未満', '5〜10年', '10〜15年', '15年以上', 'わからない']}
              onChange={set('age')}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">お困りの症状・きっかけ（複数選択可）</label>
            <CheckGroup
              options={[
                'エラーコードが出ている',
                'お湯が出なくなった',
                '水漏れしている',
                '異音・異臭がする',
                '年数が経ってきた（予防交換）',
                '交換を検討中（故障なし）',
                'その他',
              ]}
              values={form.symptoms}
              onChange={set('symptoms') as (v: string | string[]) => void}
            />
          </div>

        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        <SectionTitle num={2} title="ご希望の給湯器（わからない場合はおまかせでOK）" />
        <div className="space-y-6">

          {preselectedProduct ? (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">商品詳細ページで選択された商品</div>
              <div className="font-bold text-gray-900">{preselectedProduct.makerLabel} {preselectedProduct.model}</div>
              <div className="text-sm text-gray-600">{preselectedProduct.capacity}号 / {preselectedProduct.typeLabel} / {preselectedProduct.installationLabel}</div>
              <div className="text-sm font-black text-red-600 mt-1">工事費込み税込 {formatPrice(preselectedProduct.totalInTax)}円</div>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">タイプ</label>
                <RadioGroup
                  name="desiredType"
                  value={form.desiredType}
                  options={['フルオート', 'オート', '給湯専用', '今のままで良い', 'おまかせ']}
                  onChange={set('desiredType')}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">メーカーのご希望</label>
                <RadioGroup
                  name="desiredMaker"
                  value={form.desiredMaker}
                  options={['こだわらない', 'リンナイ', 'ノーリツ', 'パロマ']}
                  onChange={set('desiredMaker')}
                />
              </div>
            </>
          )}

          {/* 写真添付 */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              給湯器の写真（添付推奨）
            </label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-brand-300 transition-colors">
              <svg className="w-10 h-10 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="text-sm text-gray-500 mb-1">写真を選択（本体・型番ラベル・設置場所）</p>
              <p className="text-xs text-gray-400 mb-3">写真があるとより正確なお見積もりができます</p>
              <label className="inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-600 font-bold text-sm px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                写真を追加
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="sr-only"
                  onChange={handlePhotoChange}
                />
              </label>
              {photoNames.length > 0 && (
                <div className="mt-3 space-y-1">
                  {photoNames.map((name, i) => (
                    <div key={i} className="text-xs text-green-600 flex items-center gap-1 justify-center">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      {name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-2">LINEで写真を送る場合は、お見積り依頼後にLINEからご連絡ください。</p>
          </div>

        </div>
      </div>

      {/* Section 3 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        <SectionTitle num={3} title="お客様情報" />
        <div className="space-y-5">

          <div className="grid sm:grid-cols-2 gap-5">
            <div data-error={errors.name}>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                お名前 <span className="text-red-500 text-xs font-normal">必須</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => set('name')(e.target.value)}
                placeholder="山田 太郎"
                className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-300 transition ${
                  errors.name ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div data-error={errors.phone}>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                電話番号 <span className="text-red-500 text-xs font-normal">必須</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set('phone')(e.target.value)}
                placeholder="090-1234-5678"
                className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-300 transition ${
                  errors.phone ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'
                }`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">メールアドレス</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => set('email')(e.target.value)}
              placeholder="example@mail.com"
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-300 transition bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">住所</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => set('address')(e.target.value)}
              placeholder="神奈川県横浜市○○区○○"
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-300 transition bg-white"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">ご希望の対応時期</label>
              <RadioGroup
                name="timing"
                value={form.timing}
                options={['できるだけ早く', '今週中', '今月中', '時期は未定']}
                onChange={set('timing')}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">ご連絡希望方法</label>
              <RadioGroup
                name="contactMethod"
                value={form.contactMethod}
                options={['電話', 'メール', 'どちらでも']}
                onChange={set('contactMethod')}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">ご質問・備考</label>
            <textarea
              value={form.notes}
              onChange={(e) => set('notes')(e.target.value)}
              placeholder="現在のエラーコードや気になる症状などをご記入ください"
              rows={4}
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-300 transition bg-white resize-none"
            />
          </div>

        </div>
      </div>

      {/* プライバシー + 送信 */}
      <div className="text-center">
        <p className="text-slate-400 text-xs mb-6">
          入力いただいた個人情報は、見積もりのご連絡にのみ使用し、第三者に提供することはありません。
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black text-lg px-12 py-4 rounded-xl shadow transition-colors"
        >
          無料で見積もりを依頼する
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <p className="text-slate-400 text-xs mt-3">通常1〜2時間以内にご連絡します（9:00〜18:00）</p>
      </div>

    </form>
  )
}
