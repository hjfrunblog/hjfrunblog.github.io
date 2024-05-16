export function web3Sidebar() {
  return [
    {
      text: 'Web3',
      base: '/web3/',
      collapsed: false,
      items: [
        {
          text: 'web3概览',
          link: 'overview'
        },
        {
          text: '密码学基础',
          link: 'crypto'
        },
        {
          text: '以太坊',
          link: 'ethereum'
        },
        {
          text: 'DeFi 去中心化金融',
          link: 'defi'
        },
        {
          text: 'Web3 应用',
          link: 'web3-app'
        },
        {
          text: 'Solidity',
          link: 'solidity'
        }
      ]
    }
  ]
}
