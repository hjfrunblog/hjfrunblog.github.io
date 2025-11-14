export function sidebarFire() {
  return [
    {
      text: 'FIRE🔥',
      link: '/fire/'
    },
    {
      text: '感悟',
      link: '/fire/insights/'
    },
    {
      text: '复盘',
      base: '/fire/review/',
      items: [{ text: '2025年11月', link: 'r-2025-11' }]
    },
    {
      text: '交易计划',
      base: '/fire/plan/',
      items: [{ text: '2025年11月', link: 'p-2025-11' }]
    },
    {
      text: '股票',
      base: '/fire/stock/',
      items: [
        { text: '大A个股研究', link: 'a-heroes' },
        { text: '2025复盘', link: 'review-2025' },
        { text: '基础', link: 'basic' },
        { text: '开窍', link: 'enlighten' },
        { text: 'MACD', link: 'macd' }
      ]
    }
  ]
}
