import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar'
import { web3Sidebar } from './web3Sidebar'
import { noteSidebar } from './noteSidebar'
import { codingSidebar } from './codingSidebar'
import { sidebarLife } from './life'
import { csharpSidebar } from './csharpSidebar'
import { cloudnativeSidebar } from './cloudnativeSidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '渐风的个人博客',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' }]
  ],
  cleanUrls: true,
  rewrites: {
    'blogs/:rest*': ':rest*'
  },
  markdown: {
    math: true
    // lineNumbers: true
  },
  // lastUpdated: false, // disable all lastUpdated currently
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',

    nav: nav(),
    search: {
      provider: 'local'
    },
    outline: {
      level: 'deep',
      label: '页面导航'
    },

    // lastUpdated: {
    //   text: '最后更新于',
    //   formatOptions: {
    //     dateStyle: 'medium',
    //     timeStyle: 'medium'
    //   }
    // },

    // footer: {
    //   message: '沪ICP备 <strong>2020025326</strong> 号',
    //   copyright: `版权所有 © 2024 hjfrun`
    // },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebar: {
      '/frontend': { items: sidebar() },
      '/javascript': { items: sidebar() },
      '/vue': { items: sidebar() },
      '/web3': { items: web3Sidebar() },
      '/coding': { items: codingSidebar() },
      '/note': { items: noteSidebar() },
      '/life/': { items: sidebarLife() },
      '/cloudnative': { items: cloudnativeSidebar() },
      '/csharp': { items: csharpSidebar() }
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/hjfrun' }]
  },
  sitemap: {
    hostname: 'https://hjfrun.com'
  }
})

function nav() {
  return [
    {
      text: '前端',
      link: '/javascript/basic',
      activeMatch: '/(javascript|frontend|vue)/'
    },
    {
      text: 'Coding',
      link: '/coding/js-basic-algorithm',
      activeMatch: '/coding/'
    },
    {
      text: '云原生',
      link: '/cloudnative/kubernetes',
      activeMatch: '/cloudnative/'
    },
    {
      text: '折腾',
      link: '/note/rax3000m-nand',
      activeMatch: '/note/'
    },
    {
      text: '生活',
      link: '/life/first-meet-su7',
      activeMatch: '/life/'
    },
    {
      text: '更多',
      items: [
        {
          text: 'C#',
          link: '/csharp/basic',
          activeMatch: '/csharp/'
        },
        {
          text: 'Web3',
          link: '/web3/overview',
          activeMatch: '/web3/'
        },
        { text: '关于我', link: '/about-me' },
      ]
    }
  ]
}
