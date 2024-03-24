import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '渐风的个人博客',
  description: '天与弗取，反受其咎；时至不行，反受其殃',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' }]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',

    nav: [
      { text: '主页', link: '/' },
      { text: '所有文章', link: '/debounce-throttle' },
      { text: '关于我', link: '/about-me' }
    ],
    search: {
      provider: 'local'
    },
    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'medium'
      }
    },

    // footer: {
    //   message: '基于 MIT 许可发布',
    //   copyright: `版权所有 © 2019-${new Date().getFullYear()} hjfrun`
    // },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebar: [
      {
        text: '文章列表',
        items: [
          { text: '防抖和节流', link: '/debounce-throttle' },
          { text: '新博客第一篇的文章', link: '/first-article' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/hjfrun' }]
  },
  sitemap: {
    hostname: 'https://hjfrun.com'
  }
})
