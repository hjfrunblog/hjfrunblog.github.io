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
        }
      ]
    },
    {
      text: 'Vue',
      base: '/tech/vue/',
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
    }
  ]
}
