export function sidebar() {
  return [
    {
      text: 'JavaScript',
      base: '/javascript/',
      collapsed: false,
      items: [
        {
          text: 'map、filter、reduce',
          link: 'map-filter-reduce'
        },
        {
          text: '防抖和节流',
          link: 'debounce-throttle'
        },
        {
          text: 'call、apply、bind',
          link: 'call-apply-bind'
        },
        {
          text: 'JavaScript 反直觉',
          link: 'js-trick'
        }
      ]
    },
    {
      text: 'Vue',
      base: '/vue/',
      collapsed: false,
      items: [
        {
          text: 'Vue2 数据绑定的原理',
          link: 'vue-data-binding'
        },
        {
          text: 'Vue 响应式',
          link: 'vue-reactive'
        },
        {
          text: 'Tree Shaking',
          link: 'tree-shaking'
        },
        {
          text: 'Vue 和 React 的异同',
          link: 'vue-react'
        },
        {
          text: 'Vue 和 React 中的 diff 算法',
          link: 'vue-diff'
        },
        {
          text: 'MVVM 和 MVC',
          link: 'mvvm'
        }
      ]
    },
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
    },
    {
      text: '杂七杂八',
      base: '/note/',
      collapsed: false,
      items: [
        {
          text: 'Grafana 学习笔记',
          link: 'grafana'
        },
        {
          text: 'Prometheus',
          link: 'prometheus'
        },
        {
          text: 'Loki',
          link: 'loki'
        },
        {
          text: 'Kafka 概览',
          link: 'kafka-overview'
        },
        {
          text: '一些Shell脚本',
          link: 'shell'
        },
        {
          text: '一些正则表达式',
          link: 'regex'
        },
        {
          text: '一些Git命令',
          link: 'git-command'
        },
        {
          text: 'JWT (JSON Web Token)',
          link: 'jwt'
        },
        {
          text: '浏览器直接爬取数据',
          link: 'browser-crawler'
        },
        {
          text: 'Redis 学习笔记',
          link: 'learn-redis'
        }
      ]
    }
  ]
}
