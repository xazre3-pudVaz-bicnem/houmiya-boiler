'use client'

import { useState, FormEvent } from 'react'
import { siteConfig } from '@/data/site'

const buildingTypes = ['戸建て', 'マンション', 'アパート', '店舗・事業所', 'その他']
const contactMethods = ['電話', 'メール', 'LINE', 'どちらでも可']
const purposeOptions = [
  '給湯器の交換を検討している',
  '給湯器が故障・エラーが出ている',
  '見積もりだけ聞きたい',
  '号数・機種の相談をしたい',
  'エコジョーズへの交換を検討',
  'その他',
]

const inputClass =
  'w-full border border-slate-300 focus:border-sky focus:ring-1 focus:ring-sky rounded px-3.5 py-3 text-brand-900 outline-none transition-colors text-sm bg-white'

type FormData = {
  name: string
  phone: string
  email: string
  area: string
  buildingType: string
  symptom: string
  purpose: string
  contactMethod: string
  message: string
}

const defaultForm: FormData = {
  name: '',
  phone: '',
  email: '',
  area: '',
  buildingType: '',
  symptom: '',
  purpose: '',
  contactMethod: '',
  message: '',
}

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'config-error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [formData, setFormData] = useState<FormData>(defaultForm)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const validate = (): Partial<Record<keyof FormData, string>> => {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!formData.name.trim()) e.name = 'お名前を入力してください'
    if (!formData.phone.trim()) {
      e.phone = '電話番号を入力してください'
    } else if (!/^[0-9\-\+\(\)\s]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      e.phone = '正しい電話番号を入力してください'
    }
    if (!formData.purpose && !formData.symptom) e.purpose = 'ご相談内容を選択してください'
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      e.email = '正しいメールアドレスを入力してください'
    }
    return e
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs)
      return
    }
    setFieldErrors({})
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          area: formData.area,
          buildingType: formData.buildingType,
          symptom: formData.symptom,
          purpose: formData.purpose,
          contactMethod: formData.contactMethod,
          message: formData.message,
          sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      })
      const json = await res.json()
      if (res.status === 503) {
        setStatus('config-error')
      } else if (!res.ok) {
        setErrorMsg(json.error || '送信に失敗しました。')
        setStatus('error')
      } else {
        setStatus('success')
        setFormData(defaultForm)
      }
    } catch {
      setErrorMsg('ネットワークエラーが発生しました。')
      setStatus('error')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section className="bg-white py-14 md:py-20" id="contact">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="mb-8">
          <p className="section-label mb-2">お問い合わせ</p>
          <h2 className="section-heading">無料見積もり・お問い合わせ</h2>
          <span className="section-divider" />
          <p className="text-slate-500 text-sm mt-4">
            給湯器の交換・故障に関するご相談はこちらから。
            写真があればより正確なお見積もりが可能です。
          </p>
        </div>

        {/* Quick contact */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <a
            href={siteConfig.phoneHref}
            data-cta="phone-contact-form"
            className="flex flex-col items-center bg-coral-600 hover:bg-coral-700 text-white font-bold py-4 px-3 rounded transition-all duration-150 active:scale-95 text-center"
          >
            <PhoneIcon />
            <span className="text-xs mt-1">電話する</span>
            <span className="text-sm font-black">{siteConfig.phone}</span>
          </a>
          <a
            href={siteConfig.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="line-contact-form"
            className="flex flex-col items-center bg-[#00B900] hover:bg-[#009a00] text-white font-bold py-4 px-3 rounded transition-all duration-150 active:scale-95 text-center"
          >
            <ChatIcon />
            <span className="text-xs mt-1">LINE相談</span>
            <span className="text-sm font-black">友だち追加</span>
          </a>
          <div className="flex flex-col items-center bg-slate-100 border border-slate-200 text-brand-800 py-4 px-3 rounded text-center">
            <ClockIcon />
            <span className="text-xs mt-1">受付時間</span>
            <span className="text-sm font-bold">9:00〜18:00</span>
          </div>
        </div>

        {/* 送信成功 */}
        {status === 'success' && (
          <div className="bg-white rounded-lg p-8 md:p-10 text-center shadow-card-lg">
            <svg className="w-14 h-14 text-sky mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-brand-800 font-black text-xl mb-3">送信が完了しました</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              お問い合わせいただきありがとうございます。<br />
              内容を確認のうえ、担当者よりご連絡いたします。<br />
              お急ぎの場合はお電話（{siteConfig.phone}）にてご連絡ください。
            </p>
          </div>
        )}

        {/* SMTP未設定エラー */}
        {status === 'config-error' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
            <h3 className="text-brand-800 font-black text-xl mb-3">送信設定が未完了です</h3>
            <p className="text-slate-600 text-sm mb-4">
              お手数ですが、お電話またはLINEにてお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a href={siteConfig.phoneHref} className="inline-flex items-center gap-2 bg-red-600 text-white font-bold px-6 py-3 rounded-lg">
                <PhoneIcon /> {siteConfig.phone}
              </a>
              <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-bold px-6 py-3 rounded-lg" style={{ backgroundColor: '#00B900' }}>
                LINEで相談
              </a>
            </div>
          </div>
        )}

        {/* フォーム */}
        {(status === 'idle' || status === 'loading' || status === 'error') && (
          <form onSubmit={handleSubmit} noValidate className="bg-white rounded-lg p-6 md:p-8 shadow-card-lg">
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-brand-800 mb-1.5 uppercase tracking-wide">
                  お名前 <span className="text-coral-600 ml-1">必須</span>
                </label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="例：田中 太郎" className={inputClass} />
                {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-brand-800 mb-1.5 uppercase tracking-wide">
                  電話番号 <span className="text-coral-600 ml-1">必須</span>
                </label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="例：090-1234-5678" className={inputClass} />
                {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-brand-800 mb-1.5 uppercase tracking-wide">
                  メールアドレス <span className="text-slate-400 ml-1 font-normal normal-case">任意</span>
                </label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="例：example@email.com" className={inputClass} />
                {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
                <p className="text-slate-400 text-xs mt-1">入力いただいた場合、自動返信メールをお送りします。</p>
              </div>

              {/* Area */}
              <div>
                <label className="block text-xs font-bold text-brand-800 mb-1.5 uppercase tracking-wide">
                  住所・対応エリア <span className="text-slate-400 ml-1 font-normal normal-case">任意</span>
                </label>
                <input type="text" name="area" value={formData.area} onChange={handleChange} placeholder="例：横浜市戸塚区〇〇町" className={inputClass} />
              </div>

              {/* Building type + Contact method */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-800 mb-1.5 uppercase tracking-wide">
                    建物種別 <span className="text-slate-400 ml-1 font-normal normal-case">任意</span>
                  </label>
                  <select name="buildingType" value={formData.buildingType} onChange={handleChange} className={inputClass}>
                    <option value="">選択してください</option>
                    {buildingTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-800 mb-1.5 uppercase tracking-wide">
                    希望連絡方法 <span className="text-slate-400 ml-1 font-normal normal-case">任意</span>
                  </label>
                  <select name="contactMethod" value={formData.contactMethod} onChange={handleChange} className={inputClass}>
                    <option value="">選択してください</option>
                    {contactMethods.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-xs font-bold text-brand-800 mb-1.5 uppercase tracking-wide">
                  ご相談内容 <span className="text-coral-600 ml-1">必須</span>
                </label>
                <select name="purpose" value={formData.purpose} onChange={handleChange} className={inputClass}>
                  <option value="">選択してください</option>
                  {purposeOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                {fieldErrors.purpose && <p className="text-red-500 text-xs mt-1">{fieldErrors.purpose}</p>}
              </div>

              {/* Symptom */}
              <div>
                <label className="block text-xs font-bold text-brand-800 mb-1.5 uppercase tracking-wide">
                  現在の症状・詳細 <span className="text-slate-400 ml-1 font-normal normal-case">任意</span>
                </label>
                <textarea
                  name="symptom"
                  value={formData.symptom}
                  onChange={handleChange}
                  rows={4}
                  placeholder="例：10年以上使用している給湯器からエラーコードが表示されるようになった。お湯が出たり出なかったりする。"
                  className={inputClass}
                />
              </div>

              {/* Photo note */}
              <div className="bg-sky/5 border border-sky/20 rounded p-3.5">
                <p className="text-brand-700 text-sm font-semibold mb-1">写真でより正確なお見積もりができます</p>
                <p className="text-slate-500 text-xs leading-relaxed">
                  給湯器の全体写真・型番ラベル・設置場所の写真があると、より正確な概算お見積もりが可能です。
                  写真はLINEからお送りいただくとスムーズです。
                </p>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-brand-800 mb-1.5 uppercase tracking-wide">
                  その他メッセージ <span className="text-slate-400 ml-1 font-normal normal-case">任意</span>
                </label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="ご希望の日時、その他ご要望などをご記入ください" className={inputClass} />
              </div>

              {/* Privacy */}
              <p className="text-slate-400 text-xs leading-relaxed">
                ご入力いただいた個人情報は、お問い合わせへの対応および当社サービスのご案内にのみ使用いたします。
                第三者への提供はいたしません。
              </p>

              {/* Error message */}
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded px-4 py-3 text-sm text-red-700 font-medium">
                  {errorMsg || '送信に失敗しました。お手数ですが、お電話またはLINEでお問い合わせください。'}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                data-cta="submit-contact-form"
                className="w-full bg-brand-800 hover:bg-brand-700 disabled:bg-brand-400 disabled:cursor-not-allowed text-white font-bold text-base py-4 rounded transition-all duration-150 active:scale-95 shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-sky flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    送信中...
                  </>
                ) : '無料見積もりを送信する'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
    </svg>
  )
}
