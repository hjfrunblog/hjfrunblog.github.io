# JS 进阶知识点

## 手写 call, apply 及 bind 函数

::: code-group

```js [call]
Function.prototype.myCall = function (context) {
  // 判断调用对象
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  // 判断 context 是否传入，如果未传入则设置为 window
  context = context || window
  // 将调用函数设为对象的方法
  context.fn = this
  // 获取参数
  const args = [...arguments].slice(1)
  // 调用函数
  const result = context.fn(...args)
  // 将属性删除
  delete context.fn
  return result
}
```

```js [apply]
Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window
  context.fn = this
  let result
  // 处理参数和 call 有区别
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}
```

```js [bind]
Function.prototype.bind2 = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  const _this = this
  const args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
```

:::

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

## 手写 promise

### 简单实现

```js
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn) {
  const that = this
  that.state = PENDING
  that.value = null
  that.resolvedCallbacks = []
  that.rejectedCallbacks = []

  function resolve(value) {
    if (that.state === PENDING) {
      that.state = RESOLVED
      that.value = value
      that.resolvedCallbacks.map(cb => cb(that.value))
    }
  }

  function reject(value) {
    if (that.state === PENDING) {
      that.state = REJECTED
      that.value = value
      that.rejectedCallbacks.map(cb => cb(that.value))
    }
  }

  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const that = this
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : r => {
          throw r
        }
  if (that.state === PENDING) {
    that.resolvedCallbacks.push(onFulfilled)
    that.rejectedCallbacks.push(onRejected)
  }
  if (that.state === RESOLVED) {
    onFulfilled(that.value)
  }
  if (that.state === REJECTED) {
    onRejected(that.value)
  }
}
```

### 复合 Promise + 规范

```js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise(excutor) {
  let that = this // 缓存当前promise实例对象
  that.status = PENDING // 初始状态
  that.value = undefined // fulfilled状态时 返回的信息
  that.reason = undefined // rejected状态时 拒绝的原因
  that.onFulfilledCallbacks = [] // 存储fulfilled状态对应的onFulfilled函数
  that.onRejectedCallbacks = [] // 存储rejected状态对应的onRejected函数

  function resolve(value) {
    // value成功态时接收的终值
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }
    // 实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。
    setTimeout(() => {
      // 调用resolve 回调对应onFulfilled函数
      if (that.status === PENDING) {
        // 只能由pending状态 => fulfilled状态 (避免调用多次resolve reject)
        that.status = FULFILLED
        that.value = value
        that.onFulfilledCallbacks.forEach(cb => cb(that.value))
      }
    })
  }
  function reject(reason) {
    // reason失败态时接收的拒因
    setTimeout(() => {
      // 调用reject 回调对应onRejected函数
      if (that.status === PENDING) {
        // 只能由pending状态 => rejected状态 (避免调用多次resolve reject)
        that.status = REJECTED
        that.reason = reason
        that.onRejectedCallbacks.forEach(cb => cb(that.reason))
      }
    })
  }

  // 捕获在excutor执行器中抛出的异常
  // new Promise((resolve, reject) => {
  //     throw new Error('error in excutor')
  // })
  try {
    excutor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  const that = this
  let newPromise
  // 处理参数默认值 保证参数后续能够继续执行
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : reason => {
          throw reason
        }
  if (that.status === FULFILLED) {
    // 成功态
    return (newPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onFulfilled(that.value)
          resolvePromise(newPromise, x, resolve, reject) // 新的promise resolve 上一个onFulfilled的返回值
        } catch (e) {
          reject(e) // 捕获前面onFulfilled中抛出的异常 then(onFulfilled, onRejected);
        }
      })
    }))
  }

  if (that.status === REJECTED) {
    // 失败态
    return (newPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(that.reason)
          resolvePromise(newPromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }))
  }

  if (that.status === PENDING) {
    // 等待态
    // 当异步调用resolve/rejected时 将onFulfilled/onRejected收集暂存到集合中
    return (newPromise = new Promise((resolve, reject) => {
      that.onFulfilledCallbacks.push(value => {
        try {
          let x = onFulfilled(value)
          resolvePromise(newPromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
      that.onRejectedCallbacks.push(reason => {
        try {
          let x = onRejected(reason)
          resolvePromise(newPromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }))
  }
}
```
