export function getCapacityLabel(capacity: number): string {
  if (capacity === 16) return '一人暮らし向け'
  if (capacity === 20) return '2〜3人家族向け'
  if (capacity === 24) return '4人以上の家族向け'
  return 'ご相談ください'
}

export function getCapacityDescription(capacity: number): string {
  if (capacity === 16) {
    return '16号は一人暮らし向けの目安です。使用人数が少なく、お湯の同時使用が多くないご家庭に向いています。'
  }
  if (capacity === 20) {
    return '20号は2〜3人家族向けの目安です。単身世帯から少人数のご家庭まで使いやすく、設置環境によってはマンションでも多く選ばれています。'
  }
  if (capacity === 24) {
    return '24号は4人以上のご家庭に向いた給湯能力です。お風呂とキッチンを同時に使うことが多いご家庭でも、比較的余裕を持って使いやすい号数です。'
  }
  return ''
}
