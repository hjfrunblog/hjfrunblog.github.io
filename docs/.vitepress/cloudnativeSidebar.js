export function cloudnativeSidebar() {
  return [
    {
      text: '云原生',
      base: '/cloudnative/',
      items: [
        { text: 'Docker 基础', link: 'docker-start' },
        { text: 'Kubernetes 基础', link: 'kubernetes' },
        { text: 'Pod', link: 'pod' },
        { text: 'Replica', link: 'replica' }
      ]
    }
  ]
}
