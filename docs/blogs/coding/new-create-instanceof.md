# new、Object.create、instanceof

## new

```js
function create() {
  // 1. 获取构造函数，并且删除 arguments 中的第一项
  var Con = [].shift.call(arguments)
  // 2. 创建一个空的对象并链接到构造函数的原型，使它能访问原型中的属性
  var obj = Object.create(Con.prototype)
  // 3. 使用apply改变构造函数中this的指向实现继承，使obj能访问到构造函数中的属性
  var ret = Con.apply(obj, arguments)
  // 4. 优先返回构造函数返回的对象
  return ret instanceof Object ? ret : obj
}
```

```js
function Dog(name) {
  this.name = name
}
Dog.prototype.sayName = function () {
  console.log(this.name)
}
// 上面是本身Dog
function _new(fn, ...args) {
  // ...args为ES6展开符,也可以使用arguments
  //先用Object创建一个空的对象,
  const obj = Object.create(fn.prototype) //fn.prototype代表 用当前对象的原型去创建
  //现在obj就代表Dog了,但是参数和this指向没有修改
  const rel = fn.apply(obj, args)
  //正常规定,如何fn返回的是null或undefined(也就是不返回内容),我们返回的是obj,否则返回rel
  return rel instanceof Object ? rel : obj
}
var _newDog = _new(Dog, '这是用_new出来的小狗')
_newDog.sayName()
```

## 模拟 Object.create

```js
// Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
function create(proto) {
  function F() {}
  F.prototype = proto
  return new F()
}
```

## instanceof 的原理

instanceof 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。

我们也可以试着实现一下 instanceof:

```js
function myInstanceof(left, right) {
  let prototype = right.prototype
  left = left.__proto__
  while (true) {
    if (left === null || left === undefined) return false
    if (prototype === left) return true
    left = left.__proto__
  }
}
```

以下是对实现的分析：

- 首先获取类型的原型
- 然后获得对象的原型
- 然后一直循环判断对象的原型是否等于类型的原型，直到对象原型为 null，因为原型链最终为 null
