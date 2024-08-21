# 寻找最近公共父节点

```js
// [6,2,8,0,4,7,9,null,null,3,5], p = 7, q = 9
```

```js
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// [6,2,8,0,4,7,9,null,null,3,5], p = 7, q = 9
function buildBinaryTree(arr) {
  if (arr.length === 0) {
    return null;
  }
  let root = new TreeNode(arr[0])

  let i = 1
  let queue = [root]
  while(i < arr.length) {
    let cur = queue.shift()
    if (arr[i] !== null) {
      cur.left = new TreeNode(arr[i])
      queue.push(cur.left)
    }
    i++
    if (i < arr.length) {
      cur.right = new TreeNode(arr[i])
      queue.push(cur.right)
    }
    i++
  }
  return root
}

function findParentNode(root, p, q) {
  if (!root || root.val === p || root.val === q) return root
  let left = findParentNode(root.left, p, q)
  let right = findParentNode(root.right, p, q)
  if (left && right) return root

  return left ? left : right
}

let arr = [6,2,8,0,4,7,9,null,null,3,5]
let root = buildBinaryTree(arr)
console.log(findParentNode(root, 7, 9))
console.log(findParentNode(root, 4, 7))
```
