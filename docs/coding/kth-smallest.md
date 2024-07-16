# 二叉搜索树中第K小的元素

```js
var kthSmallest = function(root, k) {
    let result = []

    function inOrder(node) {
        if (!node) return;
        inOrder(node.left)
        result.push(node.val)
        inOrder(node.right)
    }
    inOrder(root)
    return result[k-1]
};
```
