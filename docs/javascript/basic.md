# JS 基础知识点

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
- 模块import 和 export
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
- **求幂运算符

ES8:

- async/await
- Object.values()和Object.entries()
- padStart()和padEnd()
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
- trimStart和trimEnd
- matchAll
- BigInt
- try/catch 中报错允许没有err异常参数
- Symbol.prototype.description
- Function.toString() 调用时呈现原本源码的样子
