export function codingSidebar() {
  return [
    {
      text: 'Coding',
      base: '/coding/',
      collapsed: false,
      items: [
        {
          text: 'JavaScript 基础算法题',
          link: 'js-basic-algorithm'
        },
        {
          text: '查找父节点',
          link: 'find-parent-node'
        },
        {
          text: '二叉搜索树排序',
          link: 'bst-sort'
        },
        {
          text: '实现call、apply、bind',
          link: 'call-apply-bind'
        },
        {
          text: '实现new, Object.create, instanceof',
          link: 'new-create-instanceof'
        },
        {
          text: '实现Promise',
          link: 'promise'
        },
        {
          text: '防抖和节流',
          link: 'debounce-throttle'
        }
      ]
    }
  ]
}
