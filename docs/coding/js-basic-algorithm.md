# 基础手写题

收集一些常见的基础的代码片段。

## 字符串反转 - string reverse

::: tip 描述
Give a string reverse it. `reverse('apple') === 'elppa'`
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

:::

## 回文 - palindrome

::: tip 描述
判断是否回文
palindrome is a word that is spelled the same forwards and backwards
`palindrome('abba') === true`
`palindrome('abcdefg') === false`
:::
::: code-group

```js [Solution 1]
function isPalindrome(str) {
  return str === str.split('').reverse().join('')
}
```

```js [Solution 2]
function isPalindrome(str) {
  let start = 0
  let end = str.length - 1
  while (start < end) {
    if (str[start] !== str[end]) {
      return false
    }
    start++
    end--
  }
  return true
}
```

```js [Solution 3]
function isPalindrome(str) {
  return str.split('').every((char, i) => {
    return char === str[str.length - i - 1]
  })
}
```

:::

## maxChar

::: tip 描述
出现次数最多的字符
:::

```js
/**
 * 32eddseew3
 */

const maxChar = str => {
  let obj = {}
  for (let char of str) {
    obj[char] = obj[char] + 1 || 1
  }
  // console.log({ obj })

  let maxNum = 0
  let maxNumChar = ''
  for (let char in obj) {
    if (obj[char] >= maxNum) {
      maxNum = obj[char]
      maxNumChar = char
    }
  }

  return maxNumChar
}

// maxChar('32eddseew3') // { '3': 2, '2': 1, e: 3, d: 2, s: 2, w: 1 }
console.log(maxChar('heLLLoo$$3p')) // L
```

## 数字反转 - reverse int

```js
/**
 * Steps:
 * 1. Convert the number to a string
 * 2. Turn into array
 * 3. reverse method
 * 4. back to string
 * 5. back to int
 */

const reverseInt = n => {
  return n > 0
    ? parseInt(n.toString().split('').reverse().join(''))
    : parseInt(n.toString().split('').reverse().join('')) * -1
}

console.log(reverseInt(500))
console.log(reverseInt(-123)) // -321;
console.log(reverseInt(-900)) // -9
```

## chunk

```js
const chunks = (arr, n) => {
  const chunked = []
  for (let i = 0; i < arr.length; i += n) {
    chunked.push(arr.slice(i, i + n))
  }
  return chunked
}

console.log(chunks([1, 2, 3, 4], 2)) // [[1, 2], [3, 4]]
console.log(chunks([1, 2, 3, 4, 5], 2)) // [[1, 2], [3, 4], [5]];
```

## isUnique

::: tip 描述
To determine if the string has all unique characters
:::

```js
//
const isUnique = str => {
  const strArr = str.split('')
  const strSet = new Set(strArr)
  return strArr.length === strSet.size
}

console.log(isUnique('hello')) // false
console.log(isUnique('world')) // true;
```

## urlify

```js
const urlify = str => {
  return str.split(' ').join('%20')
}

console.log(urlify(' John Smith')) // 'Mr%20John%20Smith'
```

## 字符压缩 - string compression

```js
// For example
// Input: "aabcccccaaa" => Output: "a2b1c5a3"
// Input: "abcd" => Output: "abcd"

function strCompression(str) {
  let compressedStr = ''
  let count = 1,
    uniqueCount = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      count++
    } else {
      compressedStr += str[i] + count
      count = 1
      uniqueCount++
    }
  }
  if (uniqueCount === str.length) return str // [!code warning]
  return compressedStr
}

console.log(strCompression('aabcccccaaa')) // 'a2b1c5a3'
console.log(strCompression('abcd')) // 'abcd'
```

## zero matrix

::: tip 描述
Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0.
:::

```js
/**
 * given a matrix
 * create a new matrix
 * iterate through the matrix
 * if an element is 0, set the corresponding row and column in the new matrix to 0
 * return the new matrix
 */

const zeroMatrix = matrix => {
  const newMatrix = JSON.parse(JSON.stringify(matrix))
  const rows = newMatrix.length
  const cols = newMatrix[0].length
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === 0) {
        for (let k = 0; k < rows; k++) {
          newMatrix[k][j] = 0
        }
        for (let k = 0; k < cols; k++) {
          newMatrix[i][k] = 0
        }
      }
    }
  }
  return newMatrix
}

console.log(
  zeroMatrix([
    [4, 1, 3],
    [2, 0, 5],
    [7, 8, 9]
  ])
) // [ [ 4, 0, 3 ], [ 0, 0, 0 ], [ 7, 0, 9 ] ]
```

## 找存在重复的元素 - find duplicate elements

::: code-group

```js [Solution 1]
const arrNumbers = [1, 2, 8, 2, 9, 8]
const duplicateElements = arrNumbers.filter((element, index) => {
  return arrNumbers.indexOf(element) !== index
})
```

```js [Solution 2]
const arrNumbers = [1, 2, 8, 2, 9, 8]
const duplicates = arrNumbers.filter(
  (element, index, array) => array.indexOf(element) !== index
)
```

:::

## 找最大 find max

```js
const arrNumbers = [1, 9, 88, 65, 65, 76]

const maxFunction = arr => {
  return arr.reduce((max, current) => {
    return max > current ? max : current
  })
}

console.log(maxFunction(arrNumbers)) // 88
```

## flatten

```js
// flatten an array of arrays

let arr = [
  [1, 2],
  [3, 4],
  [5, 6],
  [7, 8]
]
const flatten = arr => {
  return arr.reduce((acc, val) => {
    return Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val)
  }, [])
}

console.log(flatten(arr)) // [ 1, 2, 3, 4, 5, 6, 7, 8 ];
console.log(arr.flat(Infinity))
```

## find unique

```js
// find array items that exists only once

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3]

const findUnique = arr =>
  arr.filter(item => arr.indexOf(item) === arr.lastIndexOf(item))

console.log(findUnique(arr)) // [ 4, 5, 6, 7, 8, 9 ];
```

## split to words

::: tip Description
**Split array items into individual words**

`const arr = ['I want to become', 'a professional front end', 'developer']`

expected output: ['I', 'want', 'to', 'become', 'a', 'professional', 'front', 'end', 'developer']
:::

::: code-group

```js [Solution 1]
const splitToWords = arr => {
  return arr.join(' ').split(' ')
}
```

```js [Solution 2]
const splitToWords = arr => {
  let result = []
  for (let str of arr) {
    result = result.concat(str.split(' '))
  }
  return result
}
```

```js [Solution 3]
const splitToWords = arr => {
  return arr.reduce((acc, cur) => {
    return acc.concat(cur.split(' '))
  }, [])
}
```

```js [Solution 4]
const splitToWords = arr => {
  return arr.map(str => str.split(' ')).flat()
}
```

```js [Solution 5]
const splitToWords = arr => {
  return arr.flatMap(str => str.split(' '))
}
```

:::

## 千位分隔符 - thousand separator

```js
const num = 12345678.1234567

// not a good solution
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

console.log(numberWithCommas(num))
console.log(num.toLocaleString('en-US')) // 12,345,678.1234567
console.log(num.toLocaleString('en-US', { maximumFractionDigits: 5 })) // 12,345,678.12346
```

## switch letter case

```js
const switchLetterCase = str => {
  return str
    .split('')
    .map(char => {
      if (char === char.toUpperCase()) {
        return char.toLowerCase()
      } else {
        return char.toUpperCase()
      }
    })
    .join('')
}

// Test cases
console.log(switchLetterCase('Hello World')) // hELLO wORLD
console.log(switchLetterCase('hfda42AbADBDE54'))
```
