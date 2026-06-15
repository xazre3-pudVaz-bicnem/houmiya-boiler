import { NextResponse } from 'next/server'

const WP_BASE = 'https://wp.houmiya-boiler.com/wp-json/wp/v2'

export const dynamic = 'force-dynamic'

export async function GET() {
  const url = `${WP_BASE}/posts?per_page=3&_fields=id,slug,title,status`

  const results: Record<string, unknown> = {}

  // テスト1: User-Agent なし
  try {
    const res = await fetch(url, { cache: 'no-store' })
    const text = await res.text()
    results['no_ua'] = {
      status: res.status,
      contentType: res.headers.get('content-type'),
      body: text.slice(0, 300),
    }
  } catch (e) {
    results['no_ua'] = { error: String(e) }
  }

  // テスト2: User-Agent あり
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; HoumiyaBoilerBot/1.0)',
      },
    })
    const text = await res.text()
    results['with_ua'] = {
      status: res.status,
      contentType: res.headers.get('content-type'),
      body: text.slice(0, 300),
    }
  } catch (e) {
    results['with_ua'] = { error: String(e) }
  }

  // テスト3: non-pretty URL（パーマリンク未設定対策）
  const altUrl = 'https://wp.houmiya-boiler.com/?rest_route=/wp/v2/posts&per_page=3&_fields=id,slug,title,status'
  try {
    const res = await fetch(altUrl, {
      cache: 'no-store',
      headers: { Accept: 'application/json', 'User-Agent': 'Mozilla/5.0' },
    })
    const text = await res.text()
    results['alt_url'] = {
      status: res.status,
      contentType: res.headers.get('content-type'),
      body: text.slice(0, 300),
    }
  } catch (e) {
    results['alt_url'] = { error: String(e) }
  }

  // テスト4: WordPress サイトのルートに疎通確認
  try {
    const res = await fetch('https://wp.houmiya-boiler.com/', {
      cache: 'no-store',
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })
    results['root'] = {
      status: res.status,
      contentType: res.headers.get('content-type'),
    }
  } catch (e) {
    results['root'] = { error: String(e) }
  }

  return NextResponse.json({ timestamp: new Date().toISOString(), results })
}
