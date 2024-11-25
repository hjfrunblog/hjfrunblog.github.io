export function noteSidebar() {
  return [
    {
      text: '路由器相关',
      base: '/note/',
      collapsed: false,
      items: [
        {
          text: 'CMCC RAX3000M NAND 刷机',
          link: 'rax3000m-nand'
        },
        {
          text: '二级路由配置',
          link: 'sub-router-config'
        },
        {
          text: '主网络访问二级路由的硬盘',
          link: 'samba-sharing'
        },
        {
          text: 'OpenWrt 中 TTYD 相关',
          link: 'ttyd'
        }
      ]
    },
    {
      text: '杂七杂八',
      base: '/note/',
      collapsed: false,
      items: [
        {
          text: 'Git 故障排除',
          link: 'git-trouble-shooting'
        },
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
          text: '一些 Shell 命令',
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
