# JS 基础知识点

## 数据类型

JavaScript 共有八种数据类型，分别是 Undefined、Null、Boolean、Number、String、Object、Symbol、BigInt。

其中 Symbol 和 BigInt 是 ES6 中新增的数据类型：

- Symbol 代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题。
- BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。

## 判断类型

JS 检测数据类型的 4 种方式：

- typeof
- instanceof
- constructor
- Object.prototype.toString.call()

### typeof

- 用途：typeof 是一元操作符，用于检测给定值的数据类型。
- 优点：简单、快速，并且对于大多数基本数据类型（如字符串、数字、布尔值、函数）有效。
- 缺点：对于复杂数据类型（如数组、对象、null），返回的结果并不具体，都会返回"object"。此外，对于函数来说，返回的是"function"，而不是"object"。

### instanceof

- 用途：instanceof 用于检测对象是否属于某个特定的构造函数。
- 优点：可以判断对象是否是特定构造函数的实例，适用于自定义类型的检测。
- 缺点：不能准确判断基本数据类型，也不能判断两个不同的全局执行环境中创建的对象。

### constructor

- 用途：constructor 是对象的属性，指向创建该对象的构造函数。
- 优点：可以判断对象的构造函数，适用于自定义类型的检测。
- 缺点：当对象的原型被修改时，constructor 属性可能会失效。此外，对于基本数据类型和 null，无法使用该方法进行检测。

### Object.prototype.toString.call()

- 用途：通过调用 Object.prototype.toString 方法，可以返回一个表示对象类型的字符串。
- 优点：可以准确判断各种数据类型，包括基本数据类型、内置对象、自定义对象以及特殊的对象（如数组、日期等）。
- 缺点：使用起来相对繁琐，需要调用特定的方法。

其中最通用的办法是运用 Object.prototype.toString.call()

## Map 和 WeakMap

### Map

map 本质上就是键值对的集合，但是普通的 Object 中的键值对中的键只能是字符串。而 ES6 提供的 Map 数据结构类似于对象，但是它的键不限制范围，可以是任意类型，是一种更加完善的 Hash 结构。如果 Map 的键是一个原始数据类型，只要两个键严格相同，就视为是同一个键。
实际上 Map 是一个数组，它的每一个数据也都是一个数组，其形式如下：

```js
const map = [
  ['name', '张三'],
  ['age', 18]
]
```

Map 结构原生提供是三个遍历器生成函数和一个遍历方法

- keys()：返回键名的遍历器。
- values()：返回键值的遍历器。
- entries()：返回所有成员的遍历器。
- forEach()：遍历 Map 的所有成员。

```js
const map = new Map([
  ['foo', 1],
  ['bar', 2]
])
for (let key of map.keys()) {
  console.log(key) // foo bar
}
for (let value of map.values()) {
  console.log(value) // 1 2
}
for (let items of map.entries()) {
  console.log(items) // ["foo",1]  ["bar",2]
}
map.forEach((value, key, map) => {
  console.log(key, value) // foo 1    bar 2
})
```

### WeakMap

WeakMap 对象也是一组键值对的集合，其中的键是弱引用的。其键必须是对象，原始数据类型不能作为 key 值，而值可以是任意的。
该对象也有以下几种方法：

- set(key,value)：设置键名 key 对应的键值 value，然后返回整个 Map 结构，如果 key 已经有值，则键值会被更新，否则就新生成该键。（因为返回的是当前 Map 对象，所以可以链式调用）
- get(key)：该方法读取 key 对应的键值，如果找不到 key，返回 undefined。
- has(key)：该方法返回一个布尔值，表示某个键是否在当前 Map 对象中。
- delete(key)：该方法删除某个键，返回 true，如果删除失败，返回 false。
  其 clear()方法已经被弃用，所以可以通过创建一个空的 WeakMap 并替换原对象来实现清除。

WeakMap 的设计目的在于，有时想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。一旦不再需要这两个对象，就必须手动删除这个引用，否则垃圾回收机制就不会释放对象占用的内存。

而 WeakMap 的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

总结：

- Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
- WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。但是 WeakMap 只接受对象作为键名（ null 除外），不接受其他类型的值作为键名。而且 WeakMap 的键名所指向的对象，不计入垃圾回收机制。

## 为什么函数的 arguments 参数是类数组而不是数组？如何遍历类数组?

`arguments` 是一个对象，它的属性是从 0 开始依次递增的数字，还有 `callee` 和 `length` 等属性，与数组相似；但是它却没有数组常见的方法属性，如 `forEach`, `reduce` 等，所以叫它们类数组。
要遍历类数组，有三个方法：

### 将数组的方法应用到类数组上，这时候就可以使用 call 和 apply 方法，如

```js
function foo() {
  Array.prototype.forEach.call(arguments, a => console.log(a))
}
```

### 使用 Array.from 方法将类数组转化成数组：‌

```js
function foo() {
  const arrArgs = Array.from(arguments)
  arrArgs.forEach(a => console.log(a))
}
```

### 使用展开运算符将类数组转化成数组

```js
function foo() {
  const arrArgs = [...arguments]
  arrArgs.forEach(a => console.log(a))
}
```

## 事件冒泡与捕获

浏览器里面的事件都会按照一定的规则去传递，不管 body 上绑定事件、或者 div 甚至 div 的 text 节点上绑定事件，这个事件必须先从根节点开始遍历（即 Window 对象开始），从上往下，传递的过程中，发现有的元素绑定了事件，也先放着，等全部事件捕获完毕（遍历完毕）， 开始处理事件，处理的顺序为，从最小的根节点上的事件开始，依次向上冒泡。

一句话概括这种机制：

- 捕获：自外而内，从根到叶，从大到小
- 冒泡：自内而外，从叶到根，从小到大

还需要注意的是，并不是所有的事件都会冒泡,以下事件就没有：

- onblur
- onfocus
- onmouseenter
- onmouseleave

## null 和 undefined 的区别

null 表示一个"无"的对象，也就是该处不应该有值；而 undefined 表示未定义。 在转换为数字时结果不同，Number(null) 为 0，而 undefined 为 NaN。

使用场景上：

- null：
  - 作为函数的参数，表示该函数的参数不是对象
  - 作为对象原型链的终点
- undefined:
  - 变量被声明了，但没有赋值时，就等于 undefined
  - 调用函数时，应该提供的参数没有提供，该参数等于 undefined
  - 对象没有赋值属性，该属性的值为 undefined
  - 函数没有返回值时，默认返回 undefined

## 平常工作中 ES6+ 主要用到了哪些

ES6:

- Class
- 模块 import 和 export
- 箭头函数
- 函数默认参数
- ...扩展运输符允许展开数组
- 解构
- 字符串模版
- Promise
- let const
- Proxy、Map、Set
- 对象属性同名能简写

ES7:

- includes
- \*\*求幂运算符

ES8:

- async/await
- Object.values()和 Object.entries()
- padStart()和 padEnd()
- Object.getOwnPropertyDescriptors()
- 函数参数允许尾部

ES9:

- for...await...of
- ...展开符合允许展开对象收集剩余参数
- Promise.finally()
- 正则中的四个新功能

ES10:

- flat()
- flatMap()
- fromEntries()
- trimStart 和 trimEnd
- matchAll
- BigInt
- try/catch 中报错允许没有 err 异常参数
- Symbol.prototype.description
- Function.toString() 调用时呈现原本源码的样子
