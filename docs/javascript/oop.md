# JavaScript 面向对象

## JavaScript 中属性的特性

JavaScript 中关于属性有一个比较重要的概念: 属性描述符

- 虽然我们开发中, 大多数情况不去可以的使用这些属性描述符
- 但是某些情况下, 也确实会用到.
- 建议大家先了解一下这些属性描述符, 以及它们的作用, 在以后用到时会非常有帮助.

JavaScript 中开始拥有了一种描述属性特征的特性（即属性描述符）。

- 根据特性的不同，可以把属性分成两种类型：数据属性和访问器属性。
  常见的属性特性有哪些呢?

- [[`Configurable`]] // true or false
  - 表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为 true。
- [[`Writable`]] // true or false
  - 表示能否修改属性的值。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为 true。
- [[`Enumerable`]] // true or false
  - 表示能否通过 for-in 循环返回属性。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为 true。
- [[`Value`]] // everty thing
  - 包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。这个特性的默认值为 undefined。
- [[`set`]] // function or undefined
  - 在写入属性时调用的函数。默认值为 undefined。
- [[`get`]] // function or undefined
  - 在读取属性时调用的函数。默认值为 undefined。

这些属性特性是什么东西呢?

- 从上面, 我们对这些特定的解释, 你会发现, 每个特定都会有自己特定的用途.

- 比如 Configurable 当我们配置为 false 时, 就无法使用 delete 来删除该属性.

- 设置属性特定

  - obj: 将要被添加属性或修改属性的对象
  - prop: 对象的属性
  - descriptor: 对象属性的特性
  - 要想修改属性的特性，必须通过两个 Object 方法，即 Object.defineProperty 和 Object.defineProperties
  - 正如其字面意思，这两个方法都是用来定义（修改）属性的，前者一次只能定义一个属性，后者则可以多个。
  - defineProperty(obj, prop, descriptor)

```js
var person = {}
Object.defineProperty(person, 'birth', {
  writable: false,
  value: 2000
})

alert(person.birth) // 2000
person.birth = 1999
alert(person.birth) // 2000
```

注意：在使用 defineProperty 方法定义新属性时（非修改旧属性），如果不指定，configurable, enumerable 和 writable 特性的默认值都是 false。

也就是上面的代码等同于:

```js
var person = {}
Object.defineProperty(person, 'birth', {
  configurable: false,
  enumerable: false,
  writable: false,
  value: 2000
})
```

数据属性:

- 数据属性包含一个数值的位置，在这个位置可以读取和写入值。
- 数据属性拥有 4 个特性: [[Configurable]]/[[Enumerable]]/[[Writable]]/[[Value]]
- 按照上面的方式, 我们定义的属性就是数据属性

访问器属性:

- 访问器属性不包含数据值，它们包含一对 getter 和 setter 函数。
- 访问器属性不能直接定义，需要使用后面提到的 Object.defineProperty 函数定义。
- 访问器属性也拥有 4 个特性: [[Configurable]]/[[Enumerable]]/[[Get]]/[[Set]]
  定义一个访问器属性:

```js
var person = {
  birth: 2019,
  age: 5
}
Object.defineProperty(person, 'year', {
  get: function () {
    return this.birth + this.age
  },
  set: function (newValue) {
    this.age = newValue - this.birth
  }
})

person.year = 2028
console.log(person.age) // 9
person.age = 20
console.log(person.year) // 2039
```
