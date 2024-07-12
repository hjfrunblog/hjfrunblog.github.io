# 深拷贝

JavaScript 深拷贝是指在复制对象时，不仅复制对象本身，还复制对象内部的所有值和引用。

- 这样，新对象和原始对象是完全独立的，修改一个对象不会影响另一个对象。
  深拷贝与浅拷贝相对应，浅拷贝仅复制对象的第一层属性，如果对象内部还有其他对象，那么浅拷贝后的新对象和原始对象仍然共享内部对象的引用。

深拷贝的作用：

1. 避免副作用：由于深拷贝创建的新对象与原对象是完全独立的，它们之间不会相互影响。这有助于避免在操作对象时产生意外的副作用，例如在处理复杂数据结构时。
2. 完整地复制数据结构：深拷贝能够完整地复制嵌套对象和数组，从而使新对象包含原始对象的所有数据。
   与浅拷贝的区别：

3. 复制层级：浅拷贝只复制对象的第一层属性，而深拷贝会递归复制所有层级。
4. 引用关系：浅拷贝后的新对象与原对象共享内部对象的引用，这意味着修改其中一个对象可能会影响另一个对象。而深拷贝创建的新对象与原对象完全独立，它们之间的修改不会相互影响。

## 实现

### 简单实现

`JSON.parse()` 和 `JSON.stringify()`：

- 这是实现深拷贝的简单方法，但存在局限性；
- 例如无法复制函数、循环引用等；

```js
const s1 = Symbol()
const s2 = Symbol()

const obj = {
  name: 'hjf',
  friend: {
    name: 'kobe'
  },
  foo: function () {
    console.log('foo function')
  },
  [s1]: 'abc',
  s2: s2
}

obj.inner = obj

const info = JSON.parse(JSON.stringify(obj))
console.log(info === obj)
obj.friend.name = 'james'
console.log(info)
```

### 完整实现

递归：通过递归遍历对象的所有属性并复制，可以实现深拷贝。这种方法可以处理函数和特殊对象，但需要注意处理循环引用。

```js
function isObject(value) {
  const valueType = typeof value
  return value !== null && (valueType === 'object' || valueType === 'function')
}

function deepClone(originValue, map = new WeakMap()) {
  // 判断是否是一个Set类型
  if (originValue instanceof Set) {
    return new Set([...originValue])
  }

  // 判断是否是一个Map类型
  if (originValue instanceof Map) {
    return new Map([...originValue])
  }

  // 判断如果是Symbol的value, 那么创建一个新的Symbol
  if (typeof originValue === 'symbol') {
    return Symbol(originValue.description)
  }

  // 判断如果是函数类型, 那么直接使用同一个函数
  if (typeof originValue === 'function') {
    return originValue
  }

  // 判断传入的originValue是否是一个对象类型
  if (!isObject(originValue)) {
    return originValue
  }
  if (map.has(originValue)) {
    return map.get(originValue)
  }

  // 判断传入的对象是数组, 还是对象
  const newObject = Array.isArray(originValue) ? [] : {}
  map.set(originValue, newObject)
  for (const key in originValue) {
    newObject[key] = deepClone(originValue[key], map)
  }

  // 对Symbol的key进行特殊的处理
  const symbolKeys = Object.getOwnPropertySymbols(originValue)
  for (const sKey of symbolKeys) {
    // const newSKey = Symbol(sKey.description)
    newObject[sKey] = deepClone(originValue[sKey], map)
  }

  return newObject
}
```

这个 `deepClone` 函数是一个更加全面的深拷贝实现，它可以处理多种数据类型，包括对象、数组、函数、Map、Set 和 Symbol。下面是对函数的详细说明：

1. `isObject(value)` 函数：用于判断给定值是否是对象或函数类型。如果值不为 null 且类型为 "object" 或 "function"，则返回 true。
2. `deepClone(originValue, map = new WeakMap())` 函数：这是主要的深拷贝实现函数，参数 `originValue` 是要进行深拷贝的原始对象，map 参数是一个 WeakMap 用于存储已经复制过的对象，以防止循环引用。

   - 首先，函数检查 `originValue` 是否为 Set 类型。如果是，将创建一个新 Set 并将原始 Set 中的元素复制到新 Set 中。
   - 接着，函数检查 `originValue` 是否为 Map 类型。如果是，将创建一个新 Map 并将原始 Map 中的键值对复制到新 Map 中。
   - 然后，函数检查 `originValue` 是否为 `Symbol` 类型。如果是，将创建一个新 `Symbol`，并保留原始 `Symbol` 的描述。
   - 接下来，函数检查 `originValue` 是否为函数类型。如果是，直接返回原始函数，因为函数通常不需要进行深拷贝。
   - 函数接着检查 `originValue` 是否为对象类型。如果不是，直接返回 `originValue`，因为这意味着它是一个基本类型值，不需要进行深拷贝。
   - 如果 map 中已经存在 `originValue`，则返回 map 中保存的对应副本，以防止循环引用。
   - 根据 `originValue` 是否为数组，创建一个新的数组或对象，然后将其添加到 map 中。
   - 遍历 `originValue` 的所有属性，并对每个属性进行递归深拷贝，将结果赋值给新对象的对应属性。
   - 对 `originValue` 的 `Symbol` 类型的键进行特殊处理。遍历所有 `Symbol` 键，对每个键进行递归深拷贝，并将结果赋值给新对象的对应 `Symbol` 键。
   - 最后，返回新对象。
