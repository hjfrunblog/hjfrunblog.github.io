# JavaScript 小技巧

## 判断为数组的方式

```js
// 通过Object.prototype.toString.call()做判断
Object.prototype.toString.call(obj).slice(8,-1) === 'Array'

// 通过原型链做判断
obj.__proto__ === Array.prototype

// 通过ES6的Array.isArray()做判断
Array.isArrray(obj)

// 通过instanceof做判断
obj instanceof Array

// Array.prototype.isPrototypeOf
Array.prototype.isPrototypeOf(obj)
```

## for in & for of

`for...of` 是ES6新增的遍历方式，允许遍历一个含有iterator接口的数据结构（数组、对象等）并且返回各项的值，和ES3中的for...in的区别如下

`for...of` 遍历获取的是对象的键值，`for...in` 获取的是对象的键名；
`for...in` 会遍历对象的整个原型链，性能非常差不推荐使用，而 `for...of` 只遍历当前对象不会遍历原型链；
对于数组的遍历，`for...in` 会返回数组中所有可枚举的属性(包括原型链上可枚举的属性)，`for...of` 只返回数组的下标对应的属性值；

总结： `for...in` 循环主要是为了遍历对象而生，不适用于遍历数组；`for...of` 循环可以用来遍历数组、类数组对象，字符串、Set、Map 以及 Generator 对象

## 二叉查找树-判断一个数组，是否为某二叉查找树的前序遍历结果，二叉查找树特点是所有的左节点比父节点的值小，所有的右节点比父节点的值大。使用JavaScript

```js
function isValidBSTPreorder(preorder) {
    const stack = [];  // 创建一个栈来辅助判断
    let minValue = -Infinity;  // 初始化最小值为负无穷

    for (let num of preorder) {  // 遍历输入的前序遍历数组
        if (num < minValue) {  // 如果当前数字小于已确定的最小值，说明不符合二叉查找树的规则
            return false;  // 直接返回 false，表示不是有效的前序遍历
        }

        // 只要栈不为空并且栈顶元素小于当前数字
        while (stack.length && num > stack[stack.length - 1]) { 
            minValue = stack.pop();  // 弹出栈顶元素，并更新最小值
        }

        stack.push(num);  // 将当前数字入栈
    }

    return true;  // 如果遍历完数组都没有发现不符合规则的情况，返回 true
}
```

让我们通过一个具体的例子来理解这个过程。假设我们有前序遍历数组 `[5, 3, 2, 4, 7, 6, 8]` ：

- 首先，`5` 入栈，此时栈为 `[5]`，最小值为 `-Infinity` 。
- 接着，`3` 入栈，栈变为 `[5, 3]`，最小值仍为 `-Infinity` 。
- 然后，`2` 入栈，栈变为 `[5, 3, 2]`，最小值还是 `-Infinity` 。
- 遇到 `4` 时，由于 `4` 大于栈顶的 `2` ，开始弹出栈顶元素，更新最小值为 `2` ，然后 `4` 入栈，此时栈为 `[5, 3, 4]` ，最小值为 `2` 。
- 遇到 `7` 时，因为 `7` 大于栈顶的 `4` ，继续弹出栈顶元素，更新最小值为 `4` ，`7` 入栈，栈变为 `[5, 7]` ，最小值为 `4` 。
- 遇到 `6` 时，`6` 大于栈顶的 `5` ，弹出 `5` ，更新最小值为 `5` ，`6` 入栈，栈变为 `[7, 6]` ，最小值为 `5` 。
- 最后遇到 `8` ，`8` 大于栈顶的 `6` ，弹出 `6` ，更新最小值为 `6` ，`8` 入栈，栈变为 `[7, 8]` ，最小值为 `6` 。

整个遍历过程中，没有出现数字小于当前确定的最小值的情况，所以返回 `true` ，表示是有效的二叉查找树前序遍历。

再看一个不符合的例子，比如 `[5, 3, 4, 2, 7, 6, 8]` ：

- 前面的步骤和上面的例子一样，直到遇到 `2` 。
- 此时，`2` 小于当前确定的最小值 `3` ，所以直接返回 `false` ，表示不是有效的前序遍历。

通过这种方式，我们能够有效地判断一个数组是否为二叉查找树的前序遍历结果。
