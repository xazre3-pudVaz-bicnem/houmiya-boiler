# 横浜市 SEOページマップ（フェーズ8）

最終更新: 2026-06-21

## 概要

横浜市を中心とした超ローカルSEO対策ページ群。
全ページ generateStaticParams による静的生成。

---

## ページ階層

```
/area/yokohama/                     ← 横浜市親ページ（hub）
├── station/[station]/               ← 46駅ページ
├── district/[district]/             ← 25地域ページ
├── trouble/[symptom]/               ← 12症状ページ（/area/yokohama/trouble/プレフィックス付き）
├── type/[installtype]/              ← 12設置タイプページ
├── maker/[maker]/                   ← 3メーカーページ
├── capacity/[capacity]/             ← 3号数ページ
└── building/[building]/             ← 5建物タイプページ
```

（別途 /area/yokohama/[ward]/ で18区ページが存在）

---

## 駅ページ（46件）

| URL | 駅名 | 区 | 路線 | 優先度 |
|-----|------|----|------|--------|
| /area/yokohama/station/yokohama | 横浜 | 西区 | JR・相鉄・地下鉄 | ★★★ |
| /area/yokohama/station/shin-yokohama | 新横浜 | 港北区 | JR・地下鉄・東急 | ★★★ |
| /area/yokohama/station/hiyoshi | 日吉 | 港北区 | 東急東横線・目黒線 | ★★★ |
| /area/yokohama/station/tsunashima | 綱島 | 港北区 | 東急東横線・新横浜線 | ★★★ |
| /area/yokohama/station/aobadai | 青葉台 | 青葉区 | 東急田園都市線 | ★★★ |
| /area/yokohama/station/tama-plaza | たまプラーザ | 青葉区 | 東急田園都市線 | ★★★ |
| /area/yokohama/station/center-kita | センター北 | 都筑区 | 市営地下鉄 | ★★★ |
| /area/yokohama/station/center-minami | センター南 | 都筑区 | 市営地下鉄 | ★★★ |
| /area/yokohama/station/totsuka | 戸塚 | 戸塚区 | JR・相鉄・地下鉄 | ★★★ |
| /area/yokohama/station/kamiooka | 上大岡 | 港南区 | 京急・地下鉄 | ★★★ |
| /area/yokohama/station/sakuragicho | 桜木町 | 西区 | JR・地下鉄 | ★★ |
| /area/yokohama/station/kannai | 関内 | 中区 | JR・地下鉄 | ★★ |
| /area/yokohama/station/minatomirai | みなとみらい | 西区 | みなとみらい線 | ★★ |
| /area/yokohama/station/kikuna | 菊名 | 港北区 | JR・東急 | ★★ |
| /area/yokohama/station/okurayama | 大倉山 | 港北区 | 東急東横線 | ★★ |
| /area/yokohama/station/azamino | あざみ野 | 青葉区 | 東急・地下鉄 | ★★ |
| /area/yokohama/station/nakamachidai | 仲町台 | 都筑区 | 市営地下鉄 | ★★ |
| /area/yokohama/station/ryokuentoshi | 緑園都市 | 都筑区 | 相鉄いずみ野線 | ★★ |
| /area/yokohama/station/higashi-totsuka | 東戸塚 | 戸塚区 | JR横須賀線 | ★★ |
| /area/yokohama/station/maioka | 舞岡 | 戸塚区 | 市営地下鉄 | ★ |
| /area/yokohama/station/konandai | 港南台 | 港南区 | JR根岸線 | ★ |
| /area/yokohama/station/yokodai | 洋光台 | 磯子区 | JR根岸線 | ★ |
| /area/yokohama/station/kanazawa-bunko | 金沢文庫 | 金沢区 | 京急本線 | ★ |
| /area/yokohama/station/kanazawa-hakkei | 金沢八景 | 金沢区 | 京急・シーサイドライン | ★ |
| /area/yokohama/station/tsurumi | 鶴見 | 鶴見区 | JR・京急 | ★★ |
| /area/yokohama/station/namamugi | 生麦 | 鶴見区 | 京急本線 | ★ |
| /area/yokohama/station/higashi-kanagawa | 東神奈川 | 神奈川区 | JR・京急 | ★★ |
| /area/yokohama/station/hakuraku | 白楽 | 神奈川区 | 東急東横線 | ★★ |
| /area/yokohama/station/futamatagawa | 二俣川 | 旭区 | 相鉄本線・いずみ野線 | ★★ |
| /area/yokohama/station/tsurugamine | 鶴ヶ峰 | 旭区 | 相鉄本線 | ★ |
| /area/yokohama/station/nishiya | 西谷 | 旭区 | 相鉄本線 | ★ |
| /area/yokohama/station/shimonagaya | 下永谷 | 保土ケ谷区 | 市営地下鉄 | ★ |
| /area/yokohama/station/kamoi | 鴨居 | 緑区 | JR横浜線 | ★ |
| /area/yokohama/station/nakayama | 中山 | 緑区 | JR・地下鉄 | ★★ |
| /area/yokohama/station/nagatsuta | 長津田 | 緑区 | JR・東急 | ★★ |
| /area/yokohama/station/seya | 瀬谷 | 瀬谷区 | 相鉄本線 | ★★ |
| /area/yokohama/station/mitsukyo | 三ツ境 | 泉区 | 相鉄本線 | ★ |
| /area/yokohama/station/izumino | いずみ野 | 泉区 | 相鉄いずみ野線 | ★ |
| /area/yokohama/station/tateba | 立場 | 泉区 | 市営地下鉄 | ★ |
| /area/yokohama/station/yayoi-dai | 弥生台 | 泉区 | 相鉄いずみ野線 | ★ |
| /area/yokohama/station/hongodai | 本郷台 | 栄区 | JR根岸線 | ★ |
| /area/yokohama/station/ofuna | 大船 | 栄区 | JR東海道・根岸・横須賀線 | ★★ |
| /area/yokohama/station/ishikawacho | 石川町 | 中区 | JR根岸線 | ★ |
| /area/yokohama/station/motomachi-chukagai | 元町・中華街 | 中区 | みなとみらい線 | ★ |
| /area/yokohama/station/bashamichi | 馬車道 | 中区 | みなとみらい線 | ★ |
| /area/yokohama/station/yamate | 山手 | 中区 | JR根岸線 | ★ |

---

## 地域ページ（25件）

| URL | 地域名 | 区 | 優先度 |
|-----|--------|----|--------|
| /area/yokohama/district/minato-mirai | みなとみらい | 西区 | ★★★ |
| /area/yokohama/district/kohoku-new-town | 港北ニュータウン | 都筑区 | ★★★ |
| /area/yokohama/district/tama-plaza | たまプラーザ | 青葉区 | ★★★ |
| /area/yokohama/district/aobadai | 青葉台 | 青葉区 | ★★★ |
| /area/yokohama/district/shin-yokohama | 新横浜 | 港北区 | ★★★ |
| /area/yokohama/district/totsuka | 戸塚 | 戸塚区 | ★★ |
| /area/yokohama/district/kamiooka | 上大岡 | 港南区 | ★★ |
| /area/yokohama/district/hiyoshi | 日吉 | 港北区 | ★★★ |
| /area/yokohama/district/tsunashima | 綱島 | 港北区 | ★★★ |
| /area/yokohama/district/motomachi | 元町 | 中区 | ★★ |
| /area/yokohama/district/chinatown | 中華街 | 中区 | ★★ |
| /area/yokohama/district/yamate | 山手 | 中区 | ★★ |
| /area/yokohama/district/yamashita-koen | 山下公園 | 中区 | ★ |
| /area/yokohama/district/isezakicho | 伊勢佐木町 | 中区 | ★ |
| /area/yokohama/district/bashamichi | 馬車道 | 中区 | ★ |
| /area/yokohama/district/noge | 野毛 | 西区 | ★ |
| /area/yokohama/district/futamatagawa | 二俣川 | 旭区 | ★★ |
| /area/yokohama/district/kanazawa-bunko | 金沢文庫 | 金沢区 | ★ |
| /area/yokohama/district/higashi-totsuka | 東戸塚 | 戸塚区 | ★ |
| /area/yokohama/district/hakuraku | 白楽 | 神奈川区 | ★ |
| /area/yokohama/district/nagatsuta | 長津田 | 緑区 | ★ |
| /area/yokohama/district/kamoi | 鴨居 | 緑区 | ★ |
| /area/yokohama/district/hongodai | 本郷台 | 栄区 | ★ |
| /area/yokohama/district/sakuragicho | 桜木町 | 西区 | ★ |
| /area/yokohama/district/kannai | 関内 | 中区 | ★★ |

---

## 症状別ページ（12件）

| URL | 症状 | リスクレベル | 優先度 |
|-----|------|------------|--------|
| /area/yokohama/trouble/no-hot-water | お湯が出ない | 低 | ★★★ |
| /area/yokohama/trouble/error-111 | エラー111 | 高（ガス） | ★★★ |
| /area/yokohama/trouble/water-leak | 水漏れ | 高 | ★★★ |
| /area/yokohama/trouble/no-ignition | 点火しない | 高（ガス） | ★★★ |
| /area/yokohama/trouble/temperature-unstable | 温度不安定 | 低 | ★★ |
| /area/yokohama/trouble/remote-control-error | リモコンエラー | 低 | ★★ |
| /area/yokohama/trouble/exhaust-smell | 排気臭・異臭 | 高（CO） | ★★★ |
| /area/yokohama/trouble/noise | 異音 | 低 | ★★ |
| /area/yokohama/trouble/pilot-off | 種火が消える | 高 | ★★ |
| /area/yokohama/trouble/freeze | 凍結 | 低 | ★★ |
| /area/yokohama/trouble/bath-autofill | 自動湯張り不良 | 低 | ★★ |
| /area/yokohama/trouble/hot-water-flow | お湯の出が悪い | 低 | ★ |

---

## 設置タイプ・機能別ページ（12件）

| URL | タイプ | 優先度 |
|-----|--------|--------|
| /area/yokohama/type/mansion-ps | マンションPS設置型 | ★★★ |
| /area/yokohama/type/eco-jaws | エコジョーズ | ★★★ |
| /area/yokohama/type/wall-mounted | 壁掛け型 | ★★★ |
| /area/yokohama/type/full-auto | フルオート | ★★ |
| /area/yokohama/type/floor-standing | 据置型 | ★★ |
| /area/yokohama/type/outdoor | 屋外設置型 | ★★ |
| /area/yokohama/type/city-gas | 都市ガス | ★★ |
| /area/yokohama/type/propane | プロパンガス | ★★ |
| /area/yokohama/type/auto | オート（セミオート） | ★ |
| /area/yokohama/type/indoor | 屋内設置型 | ★ |
| /area/yokohama/type/heat-pump | エコキュート | ★★ |
| /area/yokohama/type/replacement-only | 本体のみ交換 | ★ |

---

## メーカー別ページ（3件）

| URL | メーカー | 優先度 |
|-----|----------|--------|
| /area/yokohama/maker/rinnai | リンナイ | ★★★ |
| /area/yokohama/maker/noritz | ノーリツ | ★★★ |
| /area/yokohama/maker/paloma | パロマ | ★★ |

---

## 号数別ページ（3件）

| URL | 号数 | 優先度 |
|-----|------|--------|
| /area/yokohama/capacity/16 | 16号 | ★★ |
| /area/yokohama/capacity/20 | 20号 | ★★★ |
| /area/yokohama/capacity/24 | 24号 | ★★★ |

---

## 建物タイプ別ページ（5件）

| URL | 建物タイプ | 優先度 |
|-----|-----------|--------|
| /area/yokohama/building/condominium | 分譲マンション | ★★★ |
| /area/yokohama/building/rental-apartment | 賃貸マンション・アパート | ★★★ |
| /area/yokohama/building/detached-house | 戸建て住宅 | ★★★ |
| /area/yokohama/building/old-building | 築古物件 | ★★ |
| /area/yokohama/building/new-construction | 新築 | ★★ |

---

## ページ総数サマリー（フェーズ8完了後）

| カテゴリ | フェーズ7まで | フェーズ8追加 | 合計 |
|---------|------------|------------|------|
| 横浜市区ページ | 18 | 0 | 18 |
| 川崎市区ページ | 7 | 0 | 7 |
| その他エリア | 2 | 0 | 2 |
| 地域×症状 | 12 | 0 | 12 |
| 地域×設置タイプ | 12 | 0 | 12 |
| 横浜市 駅ページ | 0 | 46 | 46 |
| 横浜市 地域ページ | 0 | 25 | 25 |
| 横浜市 症状ページ（/trouble/） | 0 | 12 | 12 |
| 横浜市 設置タイプページ（/type/） | 0 | 12 | 12 |
| 横浜市 メーカーページ | 0 | 3 | 3 |
| 横浜市 号数ページ | 0 | 3 | 3 |
| 横浜市 建物タイプページ | 0 | 5 | 5 |
| その他（商品・ガイド・トラブル等） | ~76 | 0 | ~76 |
| **合計** | **~148** | **106** | **~254** |

---

## 内部リンク戦略

### Hub-and-Spoke モデル
- `/area/yokohama/` が Hub（中心ページ）
- すべての下位ページが Hub にリンクし、Hub から各ページにリンクする

### クロスリンク
- 駅ページ → 区ページ → 横浜市親ページ
- 症状ページ → 関連区ページ + 設置タイプページ
- 設置タイプページ → 関連区ページ + 症状ページ

---

## 管理メモ

- フェーズ8実装日: 2026-06-21
- 担当エージェント: Claude Sonnet 4.6
- 次回レビュー: コンテンツ品質確認後、Googleサーチコンソールでインデックス状況を確認すること
