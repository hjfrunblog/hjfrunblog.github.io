# JavaScript 中的 this 问题

## 理解 this

如果没有 this

```js
var obj = {
  name: 'hjf',
  running: function () {
    console.log(obj.name + ' running')
  },
  eating: function () {
    console.log(obj.name + ' eating')
  },
  studying: function () {
    console.log(obj.name + ' studying')
  }
}
```

事实上，上面的代码，在实际开发中，我们都会使用 this 来进行优化：

当我们通过 obj 去调用 running、eating、studying 这些方法时，this 就是指向的 obj 对象

```js
var obj = {
  name: 'hjf',
  running: function () {
    console.log(this.name + ' running')
  },
  eating: function () {
    console.log(this.name + ' eating')
  },
  studying: function () {
    console.log(this.name + ' studying')
  }
}
```

所以我们会发现，在某些函数或者方法的编写中，this 可以让我们更加便捷的方式来引用对象，在进行一些 API 设计时，代码更加的简洁和易于复用。

## this 指向

如果用一句话说明 this 的指向，那么即是: **谁调用它，this 就指向谁**。

但是仅通过这句话，我们很多时候并不能准确判断 this 的指向。因此我们需要借助一些规则去帮助自己：

this 的指向可以按照以下顺序判断:

全局环境中的 this

`浏览器环境`：无论是否在严格模式下，在全局执行环境中（在任何函数体外部）this 都指向全局对象 window;

`node 环境`：无论是否在严格模式下，在全局执行环境中（在任何函数体外部），this 都是空对象 {};

```js
console.log(this) // window

var name = 'hjf'
console.log(this.name) // hjf
console.log(window.name) // hjf
```

但是，开发中很少直接在全局作用域下去使用 this，通常都是在函数中使用。

所有的函数在被调用时，都会创建一个执行上下文：

- 这个上下文中记录着函数的调用栈、函数的调用方式、传入的参数信息等；
- this 也是其中的一个属性；

我们先来看一个让人困惑的问题：

- 定义一个函数，我们采用三种不同的方式对它进行调用，它产生了三种不同的结果

```js
// 定义一个函数
function foo() {
  console.log(this)
}

// 1.调用方式一: 直接调用
foo() // window

// 2.调用方式二: 将foo放到一个对象中,再调用
var obj = {
  name: 'hjf',
  foo: foo
}
obj.foo() // obj对象

// 3.调用方式三: 通过call/apply调用
foo.call('abc') // String {"abc"}对象
```

1. 函数在调用时，JavaScript 会默认给 this 绑定一个值；
2. this 的绑定和定义的位置（编写的位置）没有关系；
3. this 的绑定和调用方式以及调用的位置有关系；
4. this 是在运行时被绑定的；

## this 绑定规则

::: danger 重要
我们现在已经知道 this 无非就是在函数调用时被绑定的一个对象，我们就需要知道它在不同的场景下的绑定规则即可。
:::

### 默认绑定

什么情况下使用默认绑定呢？独立函数调用。

- 独立的函数调用我们可以理解成函数没有被绑定到某个对象上进行调用

**案例一：普通函数调用**

- 该函数直接被调用，并没有进行任何的对象关联；
- 这种独立的函数调用会使用默认绑定，通常默认绑定时，函数中的 this 指向全局对象（window）；

```js
function foo() {
  console.log(this) // window
}

foo()
```

**案例二：函数调用链（一个函数又调用另外一个函数）**

- 所有的函数调用都没有被绑定到某个对象上；

```js
// 2.案例二:
function test1() {
  console.log(this) // window
  test2()
}

function test2() {
  console.log(this) // window
  test3()
}

function test3() {
  console.log(this) // window
}
test1()
```

**案例三：将函数作为参数，传入到另一个函数中**

```js
function foo(func) {
  func()
}

function bar() {
  console.log(this) // window
}

foo(bar)
```

### 隐式绑定

另外一种比较常见的调用方式是通过某个对象进行调用的：

- 也就是它的调用位置中，是通过某个对象发起的函数调用。

**案例一：通过对象调用函数**

- foo 的调用位置是 obj.foo()方式进行调用的
- 那么 foo 调用时 this 会隐式的被绑定到 obj 对象上

```js
function foo() {
  console.log(this) // obj对象
}

var obj = {
  name: 'hjf',
  foo: foo
}

obj.foo()
```

**案例二：案例一的变化**

- 我们通过 obj2 又引用了 obj1 对象，再通过 obj1 对象调用 foo 函数；
- 那么 foo 调用的位置上其实还是 obj1 被绑定了 this；

```js
function foo() {
  console.log(this) // obj对象
}

var obj1 = {
  name: 'obj1',
  foo: foo
}

var obj2 = {
  name: 'obj2',
  obj1: obj1
}

obj2.obj1.foo()
```

案例三：隐式丢失

- 结果最终是 window，为什么是 window 呢？
- 因为 foo 最终被调用的位置是 bar，而 bar 在进行调用时没有绑定任何的对象，也就没有形成隐式绑定；
- 相当于是一种默认绑定；

```js
function foo() {
  console.log(this)
}

var obj1 = {
  name: 'obj1',
  foo: foo
}

// 将obj1的foo赋值给bar
var bar = obj1.foo
bar()
```

### 显示绑定

隐式绑定有一个前提条件：

- 必须在调用的`对象内部`有一个对函数的引用（比如一个属性）；
- 如果没有这样的引用，在进行调用时，会报找不到该函数的错误；
- 正是通过这个引用，间接的将 this 绑定到了这个对象上；
  如果我们不希望在`对象内部`包含这个函数的引用，同时又希望在这个对象上进行强制调用，该怎么做呢？

- JavaScript 所有的函数都可以使用 call 和 apply 方法（这个和 Prototype 有关）。
  - 其实非常简单，第一个参数是相同的，后面的参数，apply 为数组，call 为参数列表；
- 这两个函数的第一个参数都要求是一个对象，这个对象的作用是什么呢？就是给 this 准备的。
- 在调用这个函数时，会将 this 绑定到这个传入的对象上。

因为上面的过程，我们明确的绑定了 this 指向的对象，所以称之为 显示绑定。

#### 通过 call 或者 apply 绑定 this 对象

- 显示绑定后，this 就会明确的指向绑定的对象

```js
function foo() {
  console.log(this)
}

foo.call(window) // window
foo.call({ name: 'hjf' }) // {name: "hjf"}
foo.call(123) // Number对象,存放时123
```

#### bind 函数

如果我们希望一个函数总是显示的绑定到一个对象上，可以怎么做呢？

```js
function foo() {
  console.log(this)
}

var obj = {
  name: 'hjf'
}

var bar = foo.bind(obj)

bar() // obj对象
bar() // obj对象
bar() // obj对象
```

#### 内置函数

有些时候，我们会调用一些 JavaScript 的内置函数，或者一些第三方库中的内置函数。

- 这些内置函数会要求我们传入另外一个函数；
- 我们自己并不会显示的调用这些函数，而且 JavaScript 内部或者第三方库内部会帮助我们执行；

**案例一：setTimeout**

setTimeout 中会传入一个函数，这个函数中的 this 通常是 window

```js
setTimeout(function () {
  console.log(this) // window
}, 1000)
```

为什么这里是 window 呢？

- 这个和 setTimeout 源码的内部调用有关；
- setTimeout 内部是通过 apply 进行绑定的 this 对象，并且绑定的是全局对象；

**案例二：数组的 forEach**

数组有一个高阶函数 forEach，用于函数的遍历：

- 在 forEach 中传入的函数打印的也是 Window 对象；
- 这是因为默认情况下传入的函数是自动调用函数（默认绑定）；

```js
var names = ['abc', 'cba', 'nba']
names.forEach(function (item) {
  console.log(this) // 三次window
})
```

我们是否可以改变该函数的 this 指向呢？

```js
var names = ['abc', 'cba', 'nba']
var obj = { name: 'hjf' }
names.forEach(function (item) {
  console.log(this) // 三次obj对象
}, obj)
```

**案例三：div 的点击**

如果我们有一个 div 元素：

获取元素节点，并且监听点击：

- 在点击事件的回调中，this 指向谁呢？box 对象；
- 这是因为在发生点击时，执行传入的回调函数被调用时，会将 box 对象绑定到该函数中

```js
var box = document.querySelector('.box')
box.onclick = function () {
  console.log(this) // box对象
}
```

### new 绑定

JavaScript 中的函数可以当做一个类的构造函数来使用，也就是使用 new 关键字。

使用 new 关键字来调用函数时，会执行如下的操作：

1. 创建一个全新的对象；
2. 这个新对象会被执行 Prototype 连接；
3. 这个新对象会绑定到函数调用的 this 上（this 的绑定在这个步骤完成）；
4. 如果函数没有返回其他对象，表达式会返回这个新对象；

```js
// 创建Person
function Person(name) {
  console.log(this) // Person {}
  this.name = name // Person {name: "hjf"}
}

var p = new Person('hjf')
console.log(p)
```

### 规则优先级

学习了四条规则，接下来开发中我们只需要去查找函数的调用应用了哪条规则即可，但是如果一个函数调用位置应用了多条规则，优先级谁更高呢？

**1. 默认规则的优先级最低**

毫无疑问，默认规则的优先级是最低的，因为存在其他规则时，就会通过其他规则的方式来绑定 this

**2. 显示绑定优先级高于隐式绑定**

显示绑定和隐式绑定哪一个优先级更高呢？这个我们可以测试一下：

- 结果是 obj2，说明是显示绑定生效了

```js
function foo() {
  console.log(this)
}

var obj1 = {
  name: 'obj1',
  foo: foo
}

var obj2 = {
  name: 'obj2',
  foo: foo
}

// 隐式绑定
obj1.foo() // obj1
obj2.foo() // obj2

// 隐式绑定和显示绑定同时存在
obj1.foo.call(obj2) // obj2, 说明显式绑定优先级更高
```

**3. new 绑定优先级高于隐式绑定**

结果是 foo，说明是 new 绑定生效了

```js
function foo() {
  console.log(this)
}

var obj = {
  name: 'hjf',
  foo: foo
}

new obj.foo() // foo对象, 说明new绑定优先级更高
```

**4. new 绑定优先级高于 bind**

new 绑定和 call、apply 是不允许同时使用的，所以不存在谁的优先级更高

```js
function foo() {
  console.log(this)
}

var obj = {
  name: 'obj'
}

var foo = new foo.call(obj)
```

但是 new 绑定是否可以和 bind 后的函数同时使用呢？可以

- 结果显示为 foo，那么说明是 new 绑定生效了

```js
function foo() {
  console.log(this)
}

var obj = {
  name: 'obj'
}

// var foo = new foo.call(obj);
var bar = foo.bind(obj)
var foo = new bar() // 打印foo, 说明使用的是new绑定
```

优先级总结：

new 绑定 > 显示绑定（bind）> 隐式绑定 > 默认绑定

## ES6 箭头函数

箭头函数不使用 this 的四种标准规则（也就是不绑定 this），而是根据外层作用域来决定 this。

我们来看一个模拟网络请求的案例：

- 这里我使用 setTimeout 来模拟网络请求，请求到数据后如何可以存放到 data 中呢？
- 我们需要拿到 obj 对象，设置 data；
- 但是直接拿到的 this 是 window，我们需要在外层定义：var \_this = this
- 在 setTimeout 的回调函数中使用 \_this 就代表了 obj 对象

```js
var obj = {
  data: [],
  getData: function () {
    var _this = this
    setTimeout(function () {
      // 模拟获取到的数据
      var res = ['abc', 'cba', 'nba']
      _this.data.push(...res)
    }, 1000)
  }
}

obj.getData()
```

上面的代码在 ES6 之前是我们最常用的方式，从 ES6 开始，我们会使用箭头函数：

- 为什么在 setTimeout 的回调函数中可以直接使用 this 呢？
- 因为箭头函数并不绑定 this 对象，那么 this 引用就会从上层作用域中找到对应的 this

```js
var obj = {
  data: [],
  getData: function () {
    setTimeout(() => {
      // 模拟获取到的数据
      var res = ['abc', 'cba', 'nba']
      this.data.push(...res)
    }, 1000)
  }
}

obj.getData()
```

思考：如果 getData 也是一个箭头函数，那么 setTimeout 中的回调函数中的 this 指向谁呢？

- 答案是 window；
- 依然是不断的从上层作用域找，那么找到了全局作用域；
- 在全局作用域内，this 代表的就是 window

```js
var obj = {
  data: [],
  getData: () => {
    setTimeout(() => {
      console.log(this) // window
    }, 1000)
  }
}

obj.getData()
```
