# Sort an array using a binary search tree

```js
class TreeNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null
  }

  insert(value) {
    const newNode = new TreeNode(value)
    if (!this.root) {
      this.root = newNode
      return
    }
    let current = this.root
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode
          return
        }
        current = current.left
      } else {
        if (!current.right) {
          current.right = newNode
          return
        }
        current = current.right
      }
    }
  }

  inOrderTraversal(node, array) {
    if (node !== null) {
      this.inOrderTraversal(node.left, array)
      array.push(node.value)
      this.inOrderTraversal(node.right, array)
    }
  }

  sortArray(array) {
    for (let value of array) {
      this.insert(value)
    }
    const sortedArray = []
    this.inOrderTraversal(this.root, sortedArray)
    return sortedArray
  }
}

// Example usage
const bst = new BinarySearchTree()
const array = [5, 1, 3, 2, 4]
const sortedArray = bst.sortArray(array)
console.log(sortedArray) // Output: [1, 2, 3, 4, 5]
```
