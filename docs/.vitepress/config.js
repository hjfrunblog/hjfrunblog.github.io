import { defineConfig } from 'vitepress'
import { sidebarTech } from './tech'
import { sidebarLife } from './life'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '渐风的个人博客',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' }]
  ],
  cleanUrls: true,
  // markdown: {
  //   lineNumbers: true
  // },
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

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'medium'
      }
    },

    footer: {
      message: '沪ICP备 <strong>2020025326</strong> 号',
      copyright: `版权所有 © 2024 hjfrun`
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebar: {
      '/tech/': { base: '/tech/', items: sidebarTech() },
      '/life/': { base: '/life/', items: sidebarLife() }
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/hjfrun' }]
  },
  sitemap: {
    hostname: 'https://hjfrun.com'
  }
})

function nav() {
  return [
    { text: '主页', link: '/' },
    {
      text: '技术',
      link: '/tech/javascript/map-filter-reduce',
      activeMatch: '/tech/'
    },
    {
      text: '生活',
      link: '/life/first-meet-su7',
      activeMatch: '/life/'
    },
    { text: '关于我', link: '/about-me' }
  ]
}
