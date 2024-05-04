export function sidebarTech() {
  return [
    {
      text: 'JavaScript',
      base: '/tech/javascript/',
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
      base: '/tech/vue/',
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
        }
      ]
    },
    {
      text: '烂笔头',
      base: '/tech/note/',
      collapsed: false,
      items: [
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
        }
      ]
    },
    {
      text: 'JWT (JSON Web Token)',
      base: '/tech/',
      link: 'jwt'
    },
    {
      text: '浏览器直接爬取数据',
      base: '/tech/',
      link: 'browser-crawler'
    },
    {
      text: 'Redis 学习笔记',
      base: '/tech/',
      link: 'learn-redis'
    },
    {
      text: 'Kafka 概览',
      base: '/tech/',
      link: 'kafka-overview'
    }
  ]
}
