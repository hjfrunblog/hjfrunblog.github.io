# Proxy-Reflect 和响应式原理

## Proxy/Reflect

### 监听对象的基本操作

```js
const obj = {
  name: 'why',
  age: 18
}

Object.keys(obj).forEach(key => {
  let value = obj[key]
  Object.defineProperty(obj, key, {
    set: function (newValue) {
      console.log(`监听到给${key}设置值`)
      value = newValue
    },
    get: function () {
      console.log(`监听到获取${key}的值`)
      return value
    }
  })
})

obj.name = 'kobe'
obj.age = 30

console.log(obj.name)
console.log(obj.age)
```

输出：

```sh
监听到给name设置值
监听到给age设置值
监听到获取name的值
kobe
监听到获取age的值
30
```

上面这段代码就利用了前面讲过的 `Object.defineProperty` 的存储属性描述符来对属性的操作进行监听。

但是这样做有什么缺点呢？

- 首先，`Object.defineProperty` 设计的初衷，不是为了去监听截止一个对象中所有的属性的。
  - 我们在定义某些属性的时候，初衷其实是定义普通的属性，但是后面我们强行将它变成了数据属性描述符。
- 其次，如果我们想监听更加丰富的操作，比如新增属性、删除属性，那么 `Object.defineProperty` 是无能为力的。

所以我们要知道，存储数据描述符设计的初衷并不是为了去监听一个完整的对象。

### Proxy 基本使用

在 ES6 中，新增了一个 Proxy 类，这个类从名字就可以看出来，是用于帮助我们创建一个代理的：

- 也就是说，如果我们希望监听一个对象的相关操作，那么我们可以先创建一个代理对象（Proxy 对象）；
- 之后对该对象的所有操作，都通过代理对象来完成，代理对象可以知道我们想要对原对象进行哪些操作；

我们可以将上面的案例用 Proxy 来实现一次：

- 首先，我们需要 new Proxy 对象，并且传入需要侦听的对象以及一个处理对象，可以称之为 handler；
  - `const p = new Proxy(target, handler)`
- 其次，我们之后的操作都是直接对 Proxy 的操作，而不是原有的对象，因为我们需要在 handler 里面进行侦听；

```js
const obj = {
  name: 'why',
  age: 18
}

const objProxy = new Proxy(obj, {})

objProxy.name = 'kobe'
objProxy.age = 30

console.log(objProxy.name) // kobe
console.log(objProxy.age) // 30
```

如果我们想要侦听某些具体的操作，那么就可以在 handler 中添加对应的捕捉器（Trap）：

- set 和 get 分别对应的是函数类型；
- set 函数有四个参数：
  - target：目标对象（侦听的对象）；
  - property：将被设置的属性 key；
  - value：新属性值；
  - receiver：调用的代理对象；
- get 函数有三个参数：
  - target：目标对象（侦听的对象）；
  - property：被获取的属性 key；
  - receiver：调用的代理对象；

```js
const obj = {
  name: 'hjf',
  age: 18
}

const objProxy = new Proxy(obj, {
  set: function (target, key, value) {
    console.log(`侦听到代理对象被set操作`, target, key, value)
  },
  get: function (target, key) {
    console.log(`侦听到代理对象被get操作`, target, key)
  }
})

objProxy.name = 'kobe'
objProxy.age = 30

console.log(objProxy.name)
console.log(objProxy.age)
```

```sh
侦听到代理对象被set操作 { name: 'hjf', age: 18 } name kobe
侦听到代理对象被set操作 { name: 'hjf', age: 18 } age 30
侦听到代理对象被get操作 { name: 'hjf', age: 18 } name
undefined
侦听到代理对象被get操作 { name: 'hjf', age: 18 } age
undefined
```

### Proxy 其他捕捉器

Proxy 一共有 13 个捕捉器：

- 所有的捕捉器都是可选的，如果没有定义某个捕捉器，那么就会保留对象的默认行为；
  13 个活捉器分别是做什么的呢？

- handler.getPrototypeOf()
  - Object.getPrototypeOf 方法的捕捉器。
- handler.setPrototypeOf()
  - Object.setPrototypeOf 方法的捕捉器。
- handler.isExtensible()
  - Object.isExtensible 方法的捕捉器。
- handler.preventExtensions()
  - Object.preventExtensions 方法的捕捉器。
- handler.getOwnPropertyDescriptor()
  - Object.getOwnPropertyDescriptor 方法的捕捉器。
- handler.defineProperty()
  - Object.defineProperty 方法的捕捉器。
- handler.ownKeys()
  - Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器。
- `handler.has()`
  - in 操作符的捕捉器。
- `handler.get()`
  - 属性读取操作的捕捉器。
- `handler.set()`
  - 属性设置操作的捕捉器。
- `handler.deleteProperty()`
  - delete 操作符的捕捉器。
- `handler.apply()`
  - 函数调用操作的捕捉器。
- handler.construct()
  - new 操作符的捕捉器。

```js
const obj = {
  name: 'hjf',
  age: 18
}

const objProxy = new Proxy(obj, {
  has: function (target, key) {
    console.log('has捕捉器', key)
    return key in target
  },
  set: function (target, key, value) {
    console.log('set捕捉器', key)
    target[key] = value
  },
  get: function (target, key) {
    console.log('get捕捉器', key)
    return target[key]
  },
  deleteProperty: function (target, key) {
    console.log('delete捕捉器')
    delete target[key]
  }
})

console.log('name' in objProxy)
objProxy.name = 'kobe'
console.log(objProxy.name)
delete objProxy.name
```

输出结果：

```sh
has捕捉器 name
true
set捕捉器 name
get捕捉器 name
kobe
delete捕捉器
```

当然，我们还会看到捕捉器中还有 construct 和 apply，它们是应用于函数对象的：

```js
function foo() {
  console.log('foo函数被调用了', this, arguments)
  return 'foo'
}

const fooProxy = new Proxy(foo, {
  apply: function (target, thisArg, otherArgs) {
    console.log('函数的apply侦听')
    return target.apply(thisArg, otherArgs)
  },
  construct(target, argArray, newTarget) {
    console.log(target, argArray, newTarget)
    return new target()
  }
})

const result = fooProxy.apply({ name: 'hjf' }, ['aaa', 'bbb'])
console.log(result)

const f = new fooProxy('abc', 'cba')
console.log(f)
```

输出结果：

```sh
函数的apply侦听
foo函数被调用了 { name: 'hjf' } [Arguments] { '0': 'aaa', '1': 'bbb' }
foo
[Function: foo] [ 'abc', 'cba' ] [Function: foo]
foo函数被调用了 foo {} [Arguments] {}
foo {}
```

## 响应式原理

### 监听对象的变化

- 方式一：通过 Object.defineProperty 的方式（vue2 采用的方式）；
- 方式二：通过 new Proxy 的方式（vue3 采用的方式）；

```js
const targetMap = new WeakMap()
function getDepends(obj, key) {
  // 根据对象获取对应的Map对象
  let objMap = targetMap.get(obj)
  if (!objMap) {
    objMap = new Map()
    targetMap.set(obj, objMap)
  }

  // 根据key获取Depend对象
  let depend = objMap.get(key)
  if (!depend) {
    depend = new Depend()
    objMap.set(key, depend)
  }
  return depend
}
```

#### 我们这里先以 Proxy 的方式来监听：

```js
function reactive(obj) {
  return new Proxy(obj, {
    get: function (target, key, receiver) {
      const dep = getDepends(target, key)
      dep.depend()
      return Reflect.get(target, key, receiver)
    },
    set: function (target, key, value, receiver) {
      Reflect.set(target, key, value, receiver)
      const dep = getDepends(target, key)
      dep.notify()
    }
  })
}
proxyObj.name = 'lilei'
```

#### Vue2 响应式原理

我们前面所实现的响应式的代码，其实就是 Vue3 中的响应式原理：

- Vue3 主要是通过 Proxy 来监听数据的变化以及收集相关的依赖的；
- Vue2 中通过我们前面学习过的 Object.defineProerty 的方式来实现对象属性的监听；

我们可以将 reactive 函数进行如下的重构：

- 首先，在传入对象时，我们可以遍历所有的 key，并且通过属性存储描述符来监听属性的获取和修改；
- 在 setter 和 getter 方法中的逻辑和前面的 Proxy 是一致的；

```js
function reactive2(obj) {
  Object.keys(obj).forEach(key => {
    let value = obj[key]
    Object.defineProperty(obj, key, {
      get: function () {
        const dep = getDepends(obj, key)
        dep.depend()
        return value
      },
      set: function (newValue) {
        const dep = getDepends(obj, key)
        value = newValue
        dep.notify()
      }
    })
  })
  return obj
}
```
