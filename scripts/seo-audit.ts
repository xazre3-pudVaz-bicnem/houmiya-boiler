/**
 * SEO静的監査スクリプト
 * app/ ディレクトリ内のTSX/TSファイルを解析し、SEO上の問題を検出する。
 * 実行: npx ts-node scripts/seo-audit.ts
 */

import * as fs from 'fs'
import * as path from 'path'

interface AuditSummary {
  missingMetadata: string[]
  missingCanonical: string[]
  missingFAQSchema: string[]
  missingBreadcrumb: string[]
  missingCTA: string[]
  missingOpenGraph: string[]
  missingTwitter: string[]
  passing: string[]
}

function walkDir(dir: string, results: string[] = []): string[] {
  if (!fs.existsSync(dir)) return results
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walkDir(fullPath, results)
    } else if (/\.(tsx|ts)$/.test(entry.name) && !entry.name.startsWith('_')) {
      results.push(fullPath)
    }
  }
  return results
}

function readFile(filePath: string): string {
  try {
    return fs.readFileSync(filePath, 'utf-8')
  } catch {
    return ''
  }
}

function relativePath(filePath: string, rootDir: string): string {
  return filePath.replace(rootDir + path.sep, '').split(path.sep).join('/')
}

function hasMetadata(content: string): boolean {
  return (
    /export\s+const\s+metadata\s*[:=]/.test(content) ||
    /export\s+async\s+function\s+generateMetadata/.test(content)
  )
}

function hasCanonical(content: string): boolean {
  return /alternates[\s\S]{0,200}canonical/.test(content)
}

function hasFAQSchema(content: string): boolean {
  return content.includes('"@type": "FAQPage"') ||
    content.includes("'@type': 'FAQPage'") ||
    content.includes('"@type":"FAQPage"')
}

function hasFAQContent(content: string): boolean {
  return (
    (/FAQ|よくある質問|faq/i.test(content)) &&
    /export\s+default/.test(content)
  )
}

function hasBreadcrumb(content: string): boolean {
  return content.includes('"@type": "BreadcrumbList"') ||
    content.includes("'@type': 'BreadcrumbList'") ||
    content.includes('"@type":"BreadcrumbList"')
}

function hasCTA(content: string): boolean {
  return /lineUrl|line\.me|\/estimate|tel:|phoneHref/.test(content)
}

function hasOpenGraph(content: string): boolean {
  return /openGraph\s*[:{]/.test(content)
}

function hasTwitter(content: string): boolean {
  return /twitter\s*[:{]/.test(content)
}

function main() {
  const projectRoot = path.resolve(__dirname, '..')
  const appDir = path.join(projectRoot, 'app')
  const docsDir = path.join(projectRoot, 'docs')
  const outputPath = path.join(docsDir, 'seo-audit-result.md')

  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true })
  }

  const allFiles = walkDir(appDir)
  const pageFiles = allFiles.filter((f) => {
    const base = path.basename(f)
    return base === 'page.tsx' || base === 'page.ts'
  })

  const summary: AuditSummary = {
    missingMetadata: [],
    missingCanonical: [],
    missingFAQSchema: [],
    missingBreadcrumb: [],
    missingCTA: [],
    missingOpenGraph: [],
    missingTwitter: [],
    passing: [],
  }

  const issueMap: Map<string, string[]> = new Map()

  for (const filePath of pageFiles) {
    const content = readFile(filePath)
    const rel = relativePath(filePath, appDir)
    const issues: string[] = []

    if (!hasMetadata(content)) {
      summary.missingMetadata.push(rel)
      issues.push('metadata未定義')
    }

    if (hasMetadata(content) && !hasCanonical(content)) {
      summary.missingCanonical.push(rel)
      issues.push('alternates.canonical未設定')
    }

    if (hasMetadata(content) && !hasOpenGraph(content)) {
      summary.missingOpenGraph.push(rel)
      issues.push('openGraph未設定')
    }

    if (hasMetadata(content) && !hasTwitter(content)) {
      summary.missingTwitter.push(rel)
      issues.push('twitter未設定')
    }

    if (hasFAQContent(content) && !hasFAQSchema(content)) {
      summary.missingFAQSchema.push(rel)
      issues.push('FAQコンテンツあり・FAQPage schema未実装')
    }

    if (!hasBreadcrumb(content)) {
      summary.missingBreadcrumb.push(rel)
      issues.push('BreadcrumbList未実装')
    }

    if (!hasCTA(content)) {
      summary.missingCTA.push(rel)
      issues.push('CTA（LINE/見積/電話）未設定')
    }

    if (issues.length === 0) {
      summary.passing.push(rel)
    } else {
      issueMap.set(rel, issues)
    }
  }

  const today = new Date().toISOString().slice(0, 10)

  const lines: string[] = []
  lines.push('# SEO監査結果')
  lines.push('')
  lines.push('生成日: ' + today)
  lines.push('')
  lines.push('## サマリー')
  lines.push('')
  lines.push('| チェック項目 | 該当ファイル数 |')
  lines.push('|---|---|')
  lines.push('| metadata未定義 | ' + summary.missingMetadata.length + ' |')
  lines.push('| alternates.canonical未設定 | ' + summary.missingCanonical.length + ' |')
  lines.push('| openGraph未設定 | ' + summary.missingOpenGraph.length + ' |')
  lines.push('| twitter未設定 | ' + summary.missingTwitter.length + ' |')
  lines.push('| FAQコンテンツあり・FAQPage schema未実装 | ' + summary.missingFAQSchema.length + ' |')
  lines.push('| BreadcrumbList未実装 | ' + summary.missingBreadcrumb.length + ' |')
  lines.push('| CTA（LINE/見積/電話）未設定 | ' + summary.missingCTA.length + ' |')
  lines.push('| **全チェック通過** | **' + summary.passing.length + '** |')
  lines.push('')
  lines.push('> 対象ファイル数: ' + pageFiles.length + 'ページ')
  lines.push('')

  lines.push('## 全チェック通過ページ')
  lines.push('')
  if (summary.passing.length === 0) {
    lines.push('（なし）')
  } else {
    for (const f of summary.passing) {
      lines.push('- ' + f)
    }
  }
  lines.push('')

  lines.push('## 詳細（ファイル別）')
  lines.push('')
  if (issueMap.size === 0) {
    lines.push('問題は検出されませんでした。')
  } else {
    for (const [file, issues] of issueMap) {
      lines.push('### ' + file)
      lines.push('')
      for (const issue of issues) {
        lines.push('- ' + issue)
      }
      lines.push('')
    }
  }

  lines.push('## チェック項目別 詳細')
  lines.push('')

  const sections: [string, string[]][] = [
    ['metadata未定義', summary.missingMetadata],
    ['alternates.canonical未設定', summary.missingCanonical],
    ['openGraph未設定', summary.missingOpenGraph],
    ['twitter未設定', summary.missingTwitter],
    ['FAQコンテンツあり・FAQPage schema未実装', summary.missingFAQSchema],
    ['BreadcrumbList未実装', summary.missingBreadcrumb],
    ['CTA（LINE/見積/電話）未設定', summary.missingCTA],
  ]

  for (const [label, files] of sections) {
    lines.push('### ' + label)
    lines.push('')
    if (files.length === 0) {
      lines.push('問題なし')
    } else {
      for (const f of files) {
        lines.push('- ' + f)
      }
    }
    lines.push('')
  }

  const report = lines.join('\n')
  fs.writeFileSync(outputPath, report, 'utf-8')

  console.log('SEO監査完了: ' + pageFiles.length + 'ページ対象')
  console.log('レポート出力先: ' + outputPath)
  console.log('')
  console.log('サマリー:')
  console.log('  metadata未定義:               ' + summary.missingMetadata.length + '件')
  console.log('  canonical未設定:               ' + summary.missingCanonical.length + '件')
  console.log('  openGraph未設定:               ' + summary.missingOpenGraph.length + '件')
  console.log('  twitter未設定:                 ' + summary.missingTwitter.length + '件')
  console.log('  FAQPage schema未実装:          ' + summary.missingFAQSchema.length + '件')
  console.log('  BreadcrumbList未実装:          ' + summary.missingBreadcrumb.length + '件')
  console.log('  CTA未設定:                     ' + summary.missingCTA.length + '件')
  console.log('  全チェック通過:                ' + summary.passing.length + '件')
}

main()