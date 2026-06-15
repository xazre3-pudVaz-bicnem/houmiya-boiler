# houmiya-boiler — プロジェクト設定

## プロジェクト概要

ほうみや（蓬宮）のボイラー・設備系Webサイト。

## 技術スタック

- Next.js 14 (App Router) + React 18
- TypeScript
- Tailwind CSS v3
- Framer Motion（アニメーション）
- Lenis（スムーススクロール）

## ディレクトリ構成

```
app/          # App Router ページ
components/   # コンポーネント
data/         # コンテンツデータ
lib/          # ユーティリティ
public/       # 静的ファイル
```

## 業種特性

設備・ボイラー工事業のため以下を重視する。

- 信頼性・実績・専門性の訴求
- 施工事例・ビフォーアフターギャラリー
- 資格・認定情報の明示
- 緊急対応・問い合わせ電話番号の視認性
- MEO対策（対応エリア・LocalBusiness Schema）
- BtoBおよびBtoCの両方を意識した設計

## 開発コマンド

```bash
npm run dev    # 開発サーバー起動
npm run build  # 本番ビルド
npm run lint   # Lint実行
```
