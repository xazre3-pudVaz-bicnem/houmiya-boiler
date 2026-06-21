# Search Console 運用マニュアル — 宝宮設備給湯器サイト

最終更新: 2026-06-21
対象: https://www.houmiya-boiler.com

---

## 1. 初期設定（1回のみ）

### サイトマップ送信
1. Search Console（https://search.google.com/search-console/）にログイン
2. 対象プロパティを選択
3. 左メニュー「サイトマップ」→ 新しいサイトマップを追加
4. `https://www.houmiya-boiler.com/sitemap.xml` を入力して送信

### プロパティが登録されていない場合
- 「プロパティの追加」→ URLプレフィックスで `https://www.houmiya-boiler.com` を入力
- HTMLファイル確認またはDNS確認でオーナー確認

---

## 2. URL検査で優先的に登録リクエストするページ

以下のページを上から順に「URL検査 → インデックス登録をリクエスト」する。

### 最優先（まず最初に登録リクエスト）
1. https://www.houmiya-boiler.com/
2. https://www.houmiya-boiler.com/area/yokohama
3. https://www.houmiya-boiler.com/area/kawasaki
4. https://www.houmiya-boiler.com/area/atsugi
5. https://www.houmiya-boiler.com/area/ebina
6. https://www.houmiya-boiler.com/products
7. https://www.houmiya-boiler.com/estimate

### 第2優先（1週間以内に登録リクエスト）
8. https://www.houmiya-boiler.com/area/yokohama/kohoku
9. https://www.houmiya-boiler.com/area/yokohama/aoba
10. https://www.houmiya-boiler.com/area/yokohama/tsuzuki
11. https://www.houmiya-boiler.com/area/yokohama/totsuka
12. https://www.houmiya-boiler.com/area/kawasaki/nakahara
13. https://www.houmiya-boiler.com/trouble/no-hot-water
14. https://www.houmiya-boiler.com/trouble/error-111
15. https://www.houmiya-boiler.com/trouble/water-leak
16. https://www.houmiya-boiler.com/guide/capacity
17. https://www.houmiya-boiler.com/guide/eco-jaws
18. https://www.houmiya-boiler.com/cases
19. https://www.houmiya-boiler.com/rinnai
20. https://www.houmiya-boiler.com/noritz
21. https://www.houmiya-boiler.com/paloma

### 第3優先（2週間以内に登録リクエスト）
- 横浜市残り区ページ（naka, nishi, isogo, asahi, tsurumi, kanazawa, midori, izumi, sakae, kanagawa, hodogaya, seya, minami）
- 主要駅ページ（yokohama, shin-yokohama, minatomirai, hiyoshi, kikuna, totsuka, tsunashima, aobadai, tama-plaza, kamiooka）
- 横浜市症状ページ（全19件）

---

## 3. 2週間後に見る指標

### 確認する指標と場所

| 指標 | 場所 | 確認内容 |
|------|------|---------|
| 表示回数 | 検索パフォーマンス → ページ | 新規ページが表示されているか |
| 平均順位 | 検索パフォーマンス → クエリ | 狙いキーワードの順位 |
| クリック率 | 検索パフォーマンス → ページ | 表示に対しクリックされているか |
| インデックス状況 | ページ インデクス登録 → インデックス済み | 何ページがインデックスされているか |
| エラー | ページ インデクス登録 → エラー | クロールエラーがないか |

---

## 4. 表示回数はあるが順位が低いページの改善方法

### 判断基準
- 表示回数: 週100回以上
- 平均順位: 20〜50位

### 改善ステップ

**Step 1: 検索クエリを確認**
- 検索パフォーマンス → 対象ページをクリック → 「クエリ」タブで確認
- どのキーワードで表示されているかを把握

**Step 2: タイトルとdescriptionを最適化**
- 表示回数が多いクエリをtitleの先頭に含める
- descriptionに緊急度・地域名・具体的なベネフィットを入れる
- 例: 「横浜市の給湯器交換 | 工事費込み価格・当日対応｜宝宮設備」

**Step 3: コンテンツを充実させる**
- そのキーワードで検索するユーザーの意図に合った情報を追加
- FAQを増やす（特に長尾キーワード）
- 内部リンクを増やす（上位ページからのリンク）
- 文字量を増やす（競合ページよりも詳しく）

**Step 4: 被リンク・シグナルを増やす**
- GoogleビジネスプロフィールのウェブサイトにURL登録
- SNS（Instagram・LINE）でページURLをシェア
- 施工後のブログ記事で該当エリアページにリンク

---

## 5. クリック率が低いページのtitle改善方法

### クリック率が低い（1%以下）場合の対応

**タイトル改善の原則:**
1. 地域名・型番・症状名をtitleの先頭に入れる
2. 数字・具体的な言葉を使う（「安い」「すぐ」ではなく「工事費込み価格」「当日対応」）
3. 競合が使っていないフレーズを入れる

**改善例:**
- Before: 「横浜市の給湯器交換 | 宝宮設備」
- After: 「横浜市 給湯器交換なら宝宮設備｜工事費込み・最短即日対応・18区全域」

**description改善の原則:**
1. 最初の30文字にキーワードを含める
2. 「〜ができます」「〜を解決します」の行動誘起
3. 差別化ポイント（写真見積もり・工事費込み・即日対応）を入れる

---

## 6. 平均掲載順位が20〜50位のページのリライト方針

### 対象ページの見分け方
- 検索パフォーマンス → 「クエリ」タブで平均順位を確認
- 20〜50位 + 表示回数が週50回以上のページをリライト対象に

### リライト方針

**A. コンテンツの充実（最優先）**
- 競合サイト上位5件と比較して、不足している情報を追加
- よくある質問（FAQ）を競合より多く、詳しく
- 具体的な数字・事例・写真を追加
- 見出し構造（H1→H2→H3）を整理

**B. 内部リンク強化**
- 上位ページ（エリアトップ・商品トップ）からの内部リンクを追加
- アンカーテキストにターゲットキーワードを含める

**C. E-E-A-T強化**
- 施工実績・経験年数の記載
- 資格・許認可情報（事実のみ）
- 地域密着であることを具体的に記述

**D. ユーザー意図のズレを確認**
- 検索クエリが「情報収集型」なのに「購買誘導型」コンテンツになっていないか
- 「横浜市 給湯器 寿命」で検索している人には「寿命の目安と交換のサイン」を主役に

---

## 7. 表示されていないページの内部リンク改善方針

### 判断基準
- 2週間経過してもSearch Consoleに表示がないページ
- サイトマップに含まれているがクロールされていない

### 対応手順

**Step 1: URL検査でインデックス状況を確認**
- 「インデックス未登録」の場合は理由を確認
- 「クロール済み - インデックス未登録」の場合はコンテンツの品質改善

**Step 2: 内部リンクを増やす**
- 関連するエリアページ・ガイドページから該当ページへのリンクを追加
- フッター・サイドバーへの掲載を検討（ただし詰め込みすぎない）
- アンカーテキストはキーワードを含む自然な文章に

**Step 3: PageRankを強いページから流す**
- /area/yokohama から横浜市区ページへのリンク確認
- /area/yokohama/[ward] から駅ページ・地域ページへのリンク確認
- /products から商品詳細ページへのリンク確認

**Step 4: サイトマップを再送信**
- サイトマップを再送信してクロールを促す

---

## 8. 月次SEOレビューチェックリスト

毎月1回、以下を確認：

### Search Consoleで確認
- [ ] 先月比で表示回数が増加しているか
- [ ] 先月比でクリック数が増加しているか
- [ ] 平均掲載順位が改善しているか
- [ ] 新規インデックスされたページ数
- [ ] クロールエラー件数（増加していないか）
- [ ] ページエクスペリエンスのスコア

### 優先キーワードの順位確認

| キーワード | 目標順位 | 対応ページ | 先月の順位 | 今月の順位 |
|-----------|---------|-----------|-----------|-----------|
| 横浜市 給湯器交換 | 1〜3位 | /area/yokohama | | |
| 横浜市 給湯器交換 工事費込み | 1〜5位 | /area/yokohama | | |
| 川崎市 給湯器交換 | 1〜5位 | /area/kawasaki | | |
| 厚木市 給湯器交換 | 1〜3位 | /area/atsugi | | |
| 海老名市 給湯器交換 | 1〜3位 | /area/ebina | | |
| 給湯器交換 エラー111 横浜 | 1〜5位 | /area/yokohama/trouble/error-111 | | |
| 給湯器交換 お湯が出ない 横浜 | 1〜5位 | /area/yokohama/trouble/no-hot-water | | |
| RUF-A2405SAW 交換 | 1〜3位 | /products/rinnai-ruf-a2405saw-c | | |
| 号数の選び方 給湯器 | 1〜10位 | /guide/capacity | | |
| エコジョーズ 交換 横浜 | 1〜5位 | /area/yokohama/type/eco-jaws | | |

---

## 9. ブログ記事の追加による SEO強化計画

優先度高い記事テーマ（WordPress側で作成）：

1. 「横浜市で給湯器交換を依頼する前に確認すること」→ /area/yokohama にリンク
2. 「給湯器のエラー111が出たときの原因と対応手順」→ /trouble/error-111 にリンク
3. 「給湯器の寿命は何年？交換時期の目安と確認方法」→ /guide/lifespan にリンク
4. 「リンナイとノーリツの給湯器の違いと選び方」→ /rinnai / /noritz にリンク
5. 「16号・20号・24号の違い｜家族構成別の号数選び方」→ /guide/capacity にリンク
6. 「マンションPS設置型給湯器の交換で確認すること」→ /area/yokohama/type/mansion-ps にリンク
7. 「給湯器の水漏れを放置してはいけない理由」→ /trouble/water-leak にリンク
8. 「エコジョーズとは？メリットと設置条件」→ /guide/eco-jaws にリンク
9. 「給湯器交換の工事費込み価格とは何か」→ /products にリンク
10. 「横浜市港北区・青葉区・都筑区の給湯器交換事例」→ /area/yokohama/[ward] にリンク

各記事の内部リンク設計：
- 記事内に「対応エリアページ」「関連商品ページ」「関連ガイドページ」へのリンクを入れる
- 記事の冒頭・末尾にCTA（無料見積もり・LINE相談）を入れる

---

## 10. 競合分析の確認項目

毎月確認：

- 「横浜市 給湯器交換」上位10サイトのタイトル・構成を確認
- 競合に含まれて自社にない情報を特定
- 競合が弱い「細かいエリア・型番・症状」キーワードに注力
- 競合のリンク元ドメインを確認（参考情報として）
