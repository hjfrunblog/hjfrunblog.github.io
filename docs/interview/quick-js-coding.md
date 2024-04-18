---
footer: false
navbar: false
lastUpdated: false
---

# 常见手写代码题

收集一些常见的基础的代码片段。

## 01 字符串反转 - string reverse

::: tip 描述
Give a string reverse it. reverse('apple') === 'elppa'
:::

::: code-group

```js [Solution 1]
/**
 * given string, convert it to array
 * reverse the array
 * turn the array back to string
 */
const str = 'apple'
const reversedStr = str.split('').reverse().join('')
console.log({ reversedStr }) // { reversedStr: 'elppa' }
```

```js [Solution 2]
/**
 * given string, create an empty string
 * iterate through the string from the end
 * add each character to the empty string
 */

const str = 'Greetings'
let reversedStr = ''
for (let i = str.length - 1; i >= 0; i--) {
  reversedStr += str[i]
}
console.log({ reversedStr }) // { reversedStr: 'sgniteerG' }
```
