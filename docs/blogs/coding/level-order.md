# 二叉树层序遍历

```js
function TreeNode(x) {
  this.val = x
  this.left = null
  this.right = null
}
/**
 *
 * @param root TreeNode类
 * @return int整型二维数组
 */
function levelOrder(root) {
  if (!root) return []
  let result = []
  traverse(root, 1, result)
  return result
}

function traverse(root, level, result) {
  if (!root) return null
  if (level > result.length) result.push([])
  result[level - 1].push(root.val)
  traverse(root.left, level + 1, result)
  traverse(root.right, level + 1, result)
}
```
