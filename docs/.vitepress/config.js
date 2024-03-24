import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '渐风的个人博客',
  description: '天与弗取，反受其咎；时至不行，反受其殃',
  themeConfig: {
    // logo: 'https://github.githubassets.com/favicons/favicon-dark.png',
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    nav: [
      { text: '主页', link: '/' },
      { text: '文章', link: '/markdown-examples' },
      { text: '关于我', link: '/about-me' }
    ],

    sidebar: [
      {
        text: '文章列表',
        items: [
          { text: '防抖和节流', link: '/debounce-throttle' },
          { text: '个人随便写的文章', link: '/personal-article' },
          { text: 'Markdown 示例', link: '/markdown-examples' },
          { text: 'API 示例', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/hjfrun' }]
  },
  sitemap: {
    hostname: 'https://hjfrun.com'
  }
})
