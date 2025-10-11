export function sidebarFire() {
  return [
    {
      text: 'FIRE🔥',
      link: '/fire/'
    },
    {
      text: '股票',
      base: '/fire/stock/',
      items: [
        { text: '2025复盘', link: 'review-2025' },
        { text: '基础', link: 'basic' },
        { text: '开窍', link: 'enlighten' }
      ]
    }
  ]
}
