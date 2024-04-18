# Vue2 、 Vue3 和 React 三者的 diff 算法

- diff 算法很早就有
- diff 算法应用广泛，例如 GitHub 的 pull request 中的代码 diff
- 如果要严格 diff 两棵树，时间复杂度 O(n3)，不可用

## Tree diff 的优化

- 只比较同一层级，不跨级比较
- tag 不同则删掉重建（不再去比较内部的细节）
- 子节点通过 key 区分（key 的重要性）

## 三者最大区别

- Vue2 - 双端比较
- Vue3 - 最长递增子序列
- React - 仅右移

## 连环问：Vue 和 React 为何循环时必须使用 key

- vdom diff 算法会根据 key 判断元素是否要删除
- 匹配了 key，则只移动元素 - 性能较好
- 未匹配 key，则删除重建 - 性能较差
