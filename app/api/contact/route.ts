import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const dynamic = 'force-dynamic'

// ─── 型定義 ───────────────────────────────────────────────────────────────

type ContactBody = {
  // 共通
  name: string
  phone: string
  email?: string
  address?: string
  contactMethod?: string
  message?: string
  sourceUrl?: string
  // 見積もりフォーム
  buildingType?: string
  installType?: string
  size?: string
  currentMaker?: string
  currentModel?: string
  age?: string
  symptoms?: string[]
  desiredType?: string
  desiredMaker?: string
  desiredProduct?: string
  timing?: string
  notes?: string
  // お問い合わせフォーム
  area?: string
  symptom?: string
  purpose?: string
  // 商品ページから遷移した場合
  productSlug?: string
}

// ─── メール本文構築 ──────────────────────────────────────────────────────

function buildAdminText(b: ContactBody): string {
  const now = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
  const lines: string[] = [
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '【給湯器サイト】無料見積もり・お問い合わせがありました',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    `送信日時　　：${now}`,
    `お名前　　　：${b.name}`,
    `電話番号　　：${b.phone}`,
    `メールアドレス：${b.email || '（未入力）'}`,
    `住所　　　　：${b.address || b.area || '（未入力）'}`,
    '',
    '── 給湯器情報 ──',
    `建物種別　　：${b.buildingType || '（未選択）'}`,
    `設置タイプ　：${b.installType || '（未選択）'}`,
    `現在の号数　：${b.size || '（未選択）'}`,
    `現在のメーカー：${b.currentMaker || '（未選択）'}`,
    `現在の型番　：${b.currentModel || '（未入力）'}`,
    `使用年数　　：${b.age || '（未選択）'}`,
    `症状・きっかけ：${
      b.symptoms && b.symptoms.length > 0
        ? b.symptoms.join('、')
        : b.symptom || '（未選択）'
    }`,
    '',
    '── ご希望 ──',
    `ご相談内容　：${b.purpose || '（未入力）'}`,
    `希望タイプ　：${b.desiredType || '（未選択）'}`,
    `希望メーカー：${b.desiredMaker || '（未選択）'}`,
    `希望商品　　：${b.desiredProduct || '（未選択）'}`,
    `商品スラグ　：${b.productSlug || '（なし）'}`,
    `対応希望時期：${b.timing || '（未選択）'}`,
    `連絡希望方法：${b.contactMethod || '（未選択）'}`,
    '',
    '── メッセージ ──',
    b.notes || b.message || '（なし）',
    '',
    `送信元URL　：${b.sourceUrl || '（不明）'}`,
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  ]
  return lines.join('\n')
}

function buildAutoReplyText(name: string): string {
  return [
    `${name} 様`,
    '',
    'お問い合わせいただきありがとうございます。',
    '株式会社宝宮設備です。',
    '',
    '内容を確認のうえ、担当者よりご連絡いたします。',
    'しばらくお待ちください。',
    '',
    'お急ぎの場合は下記にてご連絡ください。',
    '電話：046-205-4558',
    '受付：9:00〜18:00（年中無休）',
    '',
    '※このメールは自動送信です。このメールへの返信はお受けできません。',
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '株式会社宝宮設備',
    '神奈川県厚木市温水西1-4-39',
    'TEL：046-205-4558',
    'https://www.houmiya-boiler.com',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  ].join('\n')
}

// ─── API ハンドラ ────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: ContactBody
  try {
    body = (await req.json()) as ContactBody
  } catch {
    return NextResponse.json({ error: 'リクエストが不正です。' }, { status: 400 })
  }

  // 必須チェック（サーバー側）
  if (!body.name?.trim() || !body.phone?.trim()) {
    return NextResponse.json(
      { error: 'お名前と電話番号は必須です。' },
      { status: 422 }
    )
  }

  // SMTP 環境変数チェック
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    console.error('[contact] SMTP env not configured')
    return NextResponse.json(
      {
        error:
          '送信設定が未完了です。お手数ですが、お電話またはLINEでお問い合わせください。',
      },
      { status: 503 }
    )
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  try {
    // 管理者宛メール
    await transporter.sendMail({
      from: `"宝宮設備 サイト" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: body.email || undefined,
      subject: '【給湯器サイト】無料見積もり・お問い合わせがありました',
      text: buildAdminText(body),
    })

    // 自動返信（メールアドレスが入力されている場合のみ）
    if (body.email?.trim()) {
      await transporter.sendMail({
        from: `"株式会社宝宮設備" <${SMTP_USER}>`,
        to: body.email.trim(),
        subject: '【株式会社宝宮設備】お問い合わせを受け付けました',
        text: buildAutoReplyText(body.name),
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] sendMail error:', err)
    return NextResponse.json(
      {
        error:
          '送信に失敗しました。お手数ですが、お電話またはLINEでお問い合わせください。',
      },
      { status: 500 }
    )
  }
}
