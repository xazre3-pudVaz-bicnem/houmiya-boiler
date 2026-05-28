'use client'

import { useState } from 'react'

type FormState = {
  installType: string
  size: string
  age: string
  symptoms: string[]
  desiredType: string
  eco: string
  heating: string
  maker: string
  name: string
  phone: string
  email: string
  address: string
  timing: string
  contactMethod: string
  notes: string
}

const defaultForm: FormState = {
  installType: '', size: '', age: '', symptoms: [],
  desiredType: '', eco: '', heating: '', maker: '',
  name: '', phone: '', email: '', address: '',
  timing: '', contactMethod: '電話', notes: '',
}

function RadioGroup({
  name, value, options, onChange,
}: {
  name: string
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <label key={opt} className={`flex items-center gap-2 cursor-pointer border rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
          value === opt
            ? 'bg-brand-900 border-brand-900 text-white'
            : 'bg-white border-slate-200 text-slate-600 hover:border-brand-300'
        }`}>
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
  options: string[]
  values: string[]
  onChange: (v: string[]) => void
}) {
  const toggle = (opt: string) => {
    onChange(values.includes(opt) ? values.filter((v) => v !== opt) : [...values, opt])
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <label key={opt} className={`flex items-center gap-2 cursor-pointer border rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
          values.includes(opt)
            ? 'bg-brand-900 border-brand-900 text-white'
            : 'bg-white border-slate-200 text-slate-600 hover:border-brand-300'
        }`}>
          <input
            type="checkbox" checked={values.includes(opt)}
            onChange={() => toggle(opt)} className="sr-only"
          />
          {values.includes(opt) && (
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
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

export default function EstimateForm() {
  const [form, setForm] = useState<FormState>(defaultForm)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

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
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h2 className="text-2xl font-black text-brand-900 mb-3">見積もり依頼を受け付けました</h2>
        <p className="text-slate-500 text-sm mb-2">内容を確認のうえ、担当者よりご連絡いたします。</p>
        <p className="text-slate-400 text-xs mb-8">通常1〜2時間以内にご連絡しております（営業時間 9:00〜18:00）</p>
        <div className="bg-brand-50 rounded-xl p-5 mb-8 text-left space-y-1.5 text-sm">
          <div className="flex gap-2"><span className="text-slate-400 w-24 flex-shrink-0">お名前</span><span className="font-medium text-slate-700">{form.name} 様</span></div>
          <div className="flex gap-2"><span className="text-slate-400 w-24 flex-shrink-0">電話番号</span><span className="font-medium text-slate-700">{form.phone}</span></div>
          <div className="flex gap-2"><span className="text-slate-400 w-24 flex-shrink-0">設置タイプ</span><span className="font-medium text-slate-700">{form.installType}</span></div>
          <div className="flex gap-2"><span className="text-slate-400 w-24 flex-shrink-0">号数</span><span className="font-medium text-slate-700">{form.size || '未選択'}</span></div>
        </div>
        <p className="text-slate-400 text-xs">お急ぎの場合は直接お電話ください</p>
        <a href="tel:046-205-4558" className="inline-flex items-center gap-2 mt-3 bg-coral-600 hover:bg-coral-700 text-white font-black px-6 py-3 rounded-lg transition-colors shadow-cta">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          046-205-4558
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-3xl mx-auto px-4 py-14 space-y-10">

      {/* Section 1 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 md:p-8">
        <SectionTitle num={1} title="現在の給湯器について教えてください" />
        <div className="space-y-6">

          <div data-error={errors.installType}>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              設置タイプ <span className="text-coral-600 text-xs font-normal">必須</span>
            </label>
            <RadioGroup
              name="installType"
              value={form.installType}
              options={['屋外壁掛型', '屋外据置型', '屋内設置型', 'PS（パイプシャフト）型', 'わからない']}
              onChange={set('installType')}
            />
            {errors.installType && <p className="text-coral-600 text-xs mt-1.5">{errors.installType}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">号数</label>
            <RadioGroup
              name="size"
              value={form.size}
              options={['16号', '20号', '24号', 'わからない']}
              onChange={set('size')}
            />
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
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 md:p-8">
        <SectionTitle num={2} title="ご希望の給湯器（わからない場合はおまかせでOK）" />
        <div className="space-y-6">

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
            <label className="block text-sm font-bold text-slate-700 mb-2">エコジョーズ（省エネタイプ）</label>
            <RadioGroup
              name="eco"
              value={form.eco}
              options={['希望する', '希望しない', 'おまかせ']}
              onChange={set('eco')}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">暖房機能付き</label>
            <RadioGroup
              name="heating"
              value={form.heating}
              options={['希望する', '希望しない', '今のまま', 'おまかせ']}
              onChange={set('heating')}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">メーカーのご希望</label>
            <RadioGroup
              name="maker"
              value={form.maker}
              options={['こだわらない', 'ノーリツ', 'リンナイ', 'パロマ']}
              onChange={set('maker')}
            />
          </div>

        </div>
      </div>

      {/* Section 3 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 md:p-8">
        <SectionTitle num={3} title="お客様情報" />
        <div className="space-y-5">

          <div className="grid sm:grid-cols-2 gap-5">
            <div data-error={errors.name}>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                お名前 <span className="text-coral-600 text-xs font-normal">必須</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => set('name')(e.target.value)}
                placeholder="山田 太郎"
                className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-300 transition ${
                  errors.name ? 'border-coral-500 bg-red-50' : 'border-slate-200 bg-white'
                }`}
              />
              {errors.name && <p className="text-coral-600 text-xs mt-1">{errors.name}</p>}
            </div>

            <div data-error={errors.phone}>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                電話番号 <span className="text-coral-600 text-xs font-normal">必須</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set('phone')(e.target.value)}
                placeholder="090-1234-5678"
                className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-300 transition ${
                  errors.phone ? 'border-coral-500 bg-red-50' : 'border-slate-200 bg-white'
                }`}
              />
              {errors.phone && <p className="text-coral-600 text-xs mt-1">{errors.phone}</p>}
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

      {/* Privacy note + submit */}
      <div className="text-center">
        <p className="text-slate-400 text-xs mb-6">
          入力いただいた個人情報は、見積もりのご連絡にのみ使用し、第三者に提供することはありません。
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 bg-coral-600 hover:bg-coral-700 text-white font-black text-lg px-12 py-4 rounded-xl shadow-cta transition-colors"
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
