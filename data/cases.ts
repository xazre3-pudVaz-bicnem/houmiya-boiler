export type CaseItem = {
  id: number
  area: string
  buildingType: string
  symptom: string
  beforeModel: string
  afterModel: string
  additionalWork?: string
  duration: string
  costRange: string
  comment: string
  beforeImageSrc: string
  afterImageSrc: string
  beforeImageAlt: string
  afterImageAlt: string
}

export const casesData: CaseItem[] = [
  {
    id: 1,
    area: '横浜市戸塚区',
    buildingType: '戸建て',
    symptom: 'エラーコードが頻発し、お湯が安定して出なくなった（使用10年）',
    beforeModel: '従来型ガスふろ給湯器 20号',
    afterModel: 'リンナイ RUF-A2405AW(C) フルオート 20号',
    duration: '約3時間',
    costRange: '¥158,000（税込）',
    comment: '配管もきれいな状態だったので、スムーズに交換できました。フルオートになって使い勝手が向上したと喜んでいただけました。',
    beforeImageSrc: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/3d0303492ec04dfa9b52be726706cc6c/RUF-A2405AWC.jpg',
    afterImageSrc: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/3d0303492ec04dfa9b52be726706cc6c/RUF-A2405AWC.jpg',
    beforeImageAlt: '横浜市戸塚区 戸建て 交換前 リンナイ旧型',
    afterImageAlt: '横浜市戸塚区 戸建て 交換後 リンナイ RUF-A2405AW フルオート',
  },
  {
    id: 2,
    area: '川崎市中原区',
    buildingType: 'マンション',
    symptom: '追い焚きができなくなり、リモコンにエラー表示。築15年、初めての交換',
    beforeModel: '従来型ガスふろ給湯器 16号',
    afterModel: 'ノーリツ GT-C1672AW-1 BL フルオート 16号 エコジョーズ',
    duration: '約2.5時間',
    costRange: '¥148,000（税込）',
    comment: 'マンションのPS設置タイプで狭い作業スペースでしたが、問題なく施工完了。エコジョーズへの切り替えでガス代も節約できます。',
    beforeImageSrc: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/08d1fdd39bb641e18a8102b0b0c074e6/GT-C2472AW-1.jpg',
    afterImageSrc: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/08d1fdd39bb641e18a8102b0b0c074e6/GT-C2472AW-1.jpg',
    beforeImageAlt: '川崎市中原区 マンション 交換前 ノーリツ旧型',
    afterImageAlt: '川崎市中原区 マンション 交換後 ノーリツ GT-C フルオート エコジョーズ',
  },
  {
    id: 3,
    area: '厚木市',
    buildingType: '戸建て',
    symptom: '冬場にお湯が出なくなり緊急連絡。給湯器使用12年、エコジョーズへ交換',
    beforeModel: '従来型ガスふろ給湯器 24号',
    afterModel: 'リンナイ RUF-E240EAW(A) エコジョーズ フルオート 24号',
    additionalWork: 'ドレン排水配管新設',
    duration: '約4時間',
    costRange: '¥185,000（税込）',
    comment: '大家族でお湯の使用量が多いため、エコジョーズの24号をご提案。ドレン配管の新設も合わせて対応しました。',
    beforeImageSrc: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/b0793a9eb8d3465d875924edc8fb1043/item-ruf-e2406saw.jpg',
    afterImageSrc: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/b0793a9eb8d3465d875924edc8fb1043/item-ruf-e2406saw.jpg',
    beforeImageAlt: '厚木市 戸建て 交換前 リンナイ旧型',
    afterImageAlt: '厚木市 戸建て 交換後 リンナイ RUF-E エコジョーズ フルオート 24号',
  },
  {
    id: 4,
    area: '海老名市',
    buildingType: 'アパート',
    symptom: '給湯器から異音と水漏れが発生。オーナー様よりご依頼',
    beforeModel: '従来型給湯専用タイプ 20号',
    afterModel: 'ノーリツ GQ-2039WS-1 BL 給湯専用 20号',
    duration: '約2時間',
    costRange: '¥88,000（税込）',
    comment: 'アパートの入居者様に影響が出ないよう迅速に対応。シンプルな給湯専用タイプで費用を抑えられました。',
    beforeImageSrc: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/143dfb94623e4d7c95556438ab7e5965/GQ-1639WS-1.jpg',
    afterImageSrc: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/143dfb94623e4d7c95556438ab7e5965/GQ-1639WS-1.jpg',
    beforeImageAlt: '海老名市 アパート 交換前 旧型給湯専用',
    afterImageAlt: '海老名市 アパート 交換後 ノーリツ GQ-2039WS 給湯専用',
  },
  {
    id: 5,
    area: '横浜市港北区',
    buildingType: '戸建て',
    symptom: '「お湯になるまで時間がかかる」「水温が安定しない」という症状でご相談',
    beforeModel: '従来型ガスふろ給湯器 20号',
    afterModel: 'リンナイ RUF-SA2005AW(A) スリム フルオート 20号',
    duration: '約3時間',
    costRange: '¥145,000（税込）',
    comment: 'スリムタイプで設置スペースも問題なし。フルオートで湯はりも自動になり、日常の使い勝手が大幅に向上しました。',
    beforeImageSrc: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/a0a4791f520d4f48a0ccc4781473ed5c/RUF-SA2005AWA.jpg',
    afterImageSrc: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/a0a4791f520d4f48a0ccc4781473ed5c/RUF-SA2005AWA.jpg',
    beforeImageAlt: '横浜市港北区 戸建て 交換前',
    afterImageAlt: '横浜市港北区 戸建て 交換後 リンナイ RUF-SA スリム フルオート',
  },
  {
    id: 6,
    area: '川崎市高津区',
    buildingType: 'マンション',
    symptom: '引越しに伴い給湯器を最新機種に交換したいとのご希望',
    beforeModel: '従来型ガスふろ給湯器 16号',
    afterModel: 'ノーリツ GT-2470AW-1 BL フルオート 24号',
    duration: '約3時間',
    costRange: '¥175,000（税込）',
    comment: 'マンション規約の確認も事前に行い、適合機種を選定。24号にグレードアップし、お風呂のお湯切れが一切なくなったと好評です。',
    beforeImageSrc: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/3cc9c46cea454b4a98b8c74ea1a37c08/GT-2470AW.jpg',
    afterImageSrc: 'https://images.microcms-assets.io/assets/01eaf4720aab4f63bb0b1e534c4a9f45/3cc9c46cea454b4a98b8c74ea1a37c08/GT-2470AW.jpg',
    beforeImageAlt: '川崎市高津区 マンション 交換前',
    afterImageAlt: '川崎市高津区 マンション 交換後 ノーリツ GT-2470 フルオート 24号',
  },
]
