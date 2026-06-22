import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const TOPICS = [
  { title: '給湯器のエラーコード111の原因と対処法', slug: 'error-code-111-causes', category: 'トラブル' },
  { title: '給湯器のお湯が出ない原因7選と確認手順', slug: 'no-hot-water-reasons', category: 'トラブル' },
  { title: '給湯器から異音がする原因と修理・交換の判断基準', slug: 'strange-noise-causes', category: 'トラブル' },
  { title: '給湯器の水漏れを発見したら最初にやること', slug: 'water-leak-first-steps', category: 'トラブル' },
  { title: '冬場に給湯器が凍結したときの対処法と予防策', slug: 'freeze-prevention', category: 'トラブル' },
  { title: 'お風呂の自動お湯はり機能が使えない原因と解決策', slug: 'auto-fill-trouble', category: 'トラブル' },
  { title: '給湯器のリモコンにエラーが表示された場合の対処法', slug: 'remote-control-error-guide', category: 'トラブル' },
  { title: '給湯器の臭いの原因と対処法｜異臭・ガス臭・焦げ臭い', slug: 'odor-causes', category: 'トラブル' },
  { title: '給湯器のエラーコード完全ガイド｜リンナイ・ノーリツ・パロマ対応', slug: 'error-code-complete-guide', category: '基礎知識' },
  { title: '給湯器の型番の読み方と確認方法', slug: 'model-number-reading', category: '基礎知識' },
  { title: '給湯器の寿命を延ばすメンテナンス方法', slug: 'maintenance-tips', category: '基礎知識' },
  { title: '給湯器の設置場所の種類と選び方（屋外・屋内・PS）', slug: 'installation-type-guide', category: '基礎知識' },
  { title: '給湯器の排気口・排気管の掃除と安全確認方法', slug: 'exhaust-maintenance', category: '基礎知識' },
  { title: '給湯器の号数（16号・20号・24号）の選び方', slug: 'capacity-selection-guide', category: '選び方' },
  { title: 'フルオートとオートの違いを徹底解説', slug: 'full-auto-vs-auto-detail', category: '選び方' },
  { title: 'マンションPS給湯器の選び方と工事のポイント', slug: 'mansion-ps-guide', category: '選び方' },
  { title: 'リンナイ・ノーリツ・パロマの給湯器を徹底比較', slug: 'maker-comparison-detail', category: '選び方' },
  { title: 'ガス給湯器からエコキュートへの乗り換えを検討する前に知っておくこと', slug: 'switch-to-eco-cute', category: '選び方' },
  { title: 'エコジョーズの仕組みとメリット・デメリット', slug: 'eco-jaws-pros-cons', category: '種類' },
  { title: '給湯器の交換費用の相場と安くする方法', slug: 'replacement-cost-guide', category: 'コスト' },
  { title: '給湯器の写真見積もりの手順と注意点', slug: 'photo-estimate-guide', category: 'コスト' },
  { title: '給湯器の保証と延長保証を比較｜選ぶべき保証とは', slug: 'warranty-comparison', category: 'コスト' },
  { title: '給湯器交換の補助金・助成金を活用する方法', slug: 'subsidy-guide', category: 'コスト' },
  { title: '横浜市で給湯器を交換する費用と選び方のポイント', slug: 'yokohama-replacement-guide', category: '地域情報' },
  { title: '川崎市で給湯器を即日交換するための準備と手順', slug: 'kawasaki-same-day-guide', category: '地域情報' },
] as const

type Topic = { title: string; slug: string; category: string }

const postsDirectory = path.join(process.cwd(), 'content/blog')

function getExistingSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return []
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, ''))
}

function selectTopic(existingSlugs: string[]): Topic {
  const remaining = (TOPICS as readonly Topic[]).filter((t) => !existingSlugs.includes(t.slug))
  if (remaining.length === 0) {
    const idx = Math.floor(Math.random() * TOPICS.length)
    return TOPICS[idx]
  }
  return remaining[0]
}

async function generateArticle(topic: Topic): Promise<string> {
  const systemPrompt = `あなたは給湯器専門の設備会社「株式会社宝宮設備」のWebライターです。
横浜市・川崎市・厚木市・海老名市で給湯器交換を行う地域密着型の専門会社として、読者に有益なSEOコラム記事を執筆してください。

ルール：
- 2000〜3500字程度で書く（長すぎず短すぎず）
- H2・H3見出しを使って読みやすく構成する
- 専門用語は分かりやすく解説する
- 具体的で実用的な内容にする（抽象的・曖昧な表現を避ける）
- 架空の統計・根拠のない数字は使わない
- 絵文字は使わない
- 自然な日本語で読者目線で書く
- 最後に「給湯器の交換やトラブルは宝宮設備にご相談ください」という趣旨のCTAを1〜2文で添える
- Markdownフォーマットで書く（フロントマターは不要、本文のみ）`

  const userPrompt = `以下のテーマでSEOコラム記事を執筆してください。

テーマ：「${topic.title}」
カテゴリ：${topic.category}

本文のみをMarkdownで出力してください。フロントマター（---）は不要です。`

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    messages: [{ role: 'user', content: userPrompt }],
    system: systemPrompt,
  })

  const block = response.content[0]
  if (block.type !== 'text') throw new Error('Unexpected response type from Claude API')
  return block.text
}

async function main() {
  const existingSlugs = getExistingSlugs()
  const topic = selectTopic(existingSlugs)
  console.log(`Generating: ${topic.title}`)

  const articleContent = await generateArticle(topic)
  const today = new Date().toISOString().split('T')[0]

  const frontmatter = `---
title: ${topic.title}
slug: ${topic.slug}
description: ${topic.title}
date: ${today}
category: ${topic.category}
tags: [給湯器, 給湯器交換, 宝宮設備]
---

`

  const fileContent = frontmatter + articleContent

  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
  }

  const filename = `${today}-${topic.slug}.md`
  const filePath = path.join(postsDirectory, filename)
  fs.writeFileSync(filePath, fileContent, 'utf8')
  console.log(`Written: ${filePath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
