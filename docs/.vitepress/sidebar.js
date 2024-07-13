export function sidebar() {
  return [
    {
      text: 'JavaScript',
      base: '/javascript/',
      collapsed: false,
      items: [
        {
          text: 'JavaScript 高阶函数',
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
          text: '深拷贝',
          link: 'deep-clone'
        },
        {
          text: 'Proxy-Reflect 和响应式原理',
          link: 'proxy-reflect-reactive'
        },
        {
          text: 'JavaScript 面向对象',
          link: 'oop'
        },
        {
          text: 'JavaScript 中的 this',
          link: 'this'
        },
        {
          text: 'JavaScript 事件循环',
          link: 'event-loop'
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
