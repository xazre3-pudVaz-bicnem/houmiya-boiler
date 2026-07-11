/**
 * 既存ブログ記事の一括修正（1回限りの実行用）
 * 1. 本文冒頭の「# 見出し」を除去（ページ側h1との二重H1解消）
 * 2. description がタイトルと同一の場合、本文リード文から約110字の要約を生成して置換
 */
const fs = require('fs')
const path = require('path')

const dir = path.join(process.cwd(), 'content/blog')
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))

function buildDescription(body, fallback) {
  const firstParagraph = body
    .split('\n')
    .map((l) => l.trim())
    .find((l) => l.length > 0 && !l.startsWith('#') && !l.startsWith('-') && !l.startsWith('|') && l !== '---')
  if (!firstParagraph) return fallback
  const plain = firstParagraph
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/[#*`>]/g, '')
    .replace(/: /g, '：')
    .trim()
  if (plain.length <= 118) return plain
  return plain.slice(0, 116) + '…'
}

let fixedH1 = 0
let fixedDesc = 0

for (const file of files) {
  const fp = path.join(dir, file)
  const raw = fs.readFileSync(fp, 'utf8').replace(/\r\n/g, '\n')

  // frontmatter と本文を分離
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!m) {
    console.log(`SKIP (no frontmatter): ${file}`)
    continue
  }
  let [, fm, body] = m
  let changed = false

  // 1. 本文冒頭のH1除去
  const bodyTrimmed = body.replace(/^\n+/, '')
  if (bodyTrimmed.startsWith('# ')) {
    body = '\n' + bodyTrimmed.replace(/^#\s+.+\n+/, '')
    fixedH1++
    changed = true
  }

  // 2. description === title の場合に置換
  const titleMatch = fm.match(/^title: (.+)$/m)
  const descMatch = fm.match(/^description: (.+)$/m)
  if (titleMatch && descMatch && titleMatch[1].trim() === descMatch[1].trim()) {
    const newDesc = buildDescription(body, titleMatch[1].trim())
    if (newDesc !== descMatch[1].trim()) {
      fm = fm.replace(/^description: .+$/m, `description: ${newDesc}`)
      fixedDesc++
      changed = true
    }
  }

  if (changed) {
    fs.writeFileSync(fp, `---\n${fm}\n---\n${body}`, 'utf8')
    console.log(`FIXED: ${file}`)
  }
}

console.log(`\nDone. H1 removed: ${fixedH1}, description rewritten: ${fixedDesc}`)
