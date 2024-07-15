# Call, Bind and Apply in JavaScript (Explicit Binding)

**call** 是一个方法, 是函数的方法, 函数后面可以跟 .**call()** 来执行这个函数
**call** 可以改变函数中 this 指向

```js
// Q1 - What is Call?
const obj = { name: 'Jason' }

function sayHello() {
  console.log(`Hello ${this.name}`)
}

sayHello() // Hello undefined
sayHello.call(obj) // Hello Jason;
```

```js
const obj = { name: 'Jason' }

function sayHello(age) {
  console.log(`Hello ${this.name} is ${age} years old`)
}

sayHello(5) // Hello undefined is 5 years old
sayHello.call(obj, 5) // Hello Jason is 5 years old
```

**call** 可以接受多个参数, **apply** 只能接受一个参数
**call** 和 **apply** 会调用函数, 而 **bind** 是返回一个新的函数, 没有立即调用

```js
const obj = { name: 'Jason He' }

function sayHello(age, profession) {
  console.log(
    `Hello, my name is ${this.name}, I am ${age} years old and I am a ${profession}`
  )
}

sayHello.call(obj, 25, 'Software Engineer') // Hello, my name is Jason He, I am 25 years old and I am a Software Engineer
sayHello.apply(obj, [25, 'Software Engineer']) // Hello, my name is Jason He, I am 25 years old and I am a Software Engineer

const bindFunc = sayHello.bind(obj)
bindFunc(25, 'Software Engineer') // Hello, my name is Jason He, I am 25 years old and I am a Software Engineer
bindFunc(24, 'Youtuber') // Hello, my name is Jason He, I am 24 years old and I am a Youtuber
```

## apply

apply 接受两个参数，第一个参数是 this 的指向，第二个参数是函数接受的参数，以数组的形式传入

改变 this 指向后原函数会立即执行，且此方法只是临时改变 this 指向一次

```js
function fn(...args) {
  console.log(this, args)
}
let obj = {
  myname: '张三'
}

fn.apply(obj, [1, 2]) // this会变成传入的obj，传入的参数必须是一个数组；
fn(1, 2) // this指向window
```

当第一个参数为 null、undefined 的时候，默认指向 window(在浏览器中)

```js
fn.apply(null, [1, 2]) // this指向window
fn.apply(undefined, [1, 2]) // this指向window
```

## call

call 方法的第一个参数也是 this 的指向，后面传入的是一个参数列表

跟 apply 一样，改变 this 指向后原函数会立即执行，且此方法只是临时改变 this 指向一次

```js
function fn(...args) {
  console.log(this, args)
}
let obj = {
  myname: '张三'
}

fn.call(obj, 1, 2) // this会变成传入的obj，传入的参数必须是一个数组；
fn(1, 2) // this指向window
```

同样的，当第一个参数为 null、undefined 的时候，默认指向 window(在浏览器中)

```js
fn.call(null, [1, 2]) // this指向window
fn.call(undefined, [1, 2]) // this指向window
```

## bind

bind 方法和 call 很相似，第一参数也是 this 的指向，后面传入的也是一个参数列表(但是这个参数列表可以分多次传入)

改变 this 指向后不会立即执行，而是返回一个永久改变 this 指向的函数

```js
function fn(...args) {
  console.log(this, args)
}
let obj = {
  myname: '张三'
}

const bindFn = fn.bind(obj) // this 也会变成传入的obj ，bind不是立即执行需要执行一次
bindFn(1, 2) // this指向obj
fn(1, 2) // this指向window
```

## 小结

从上面可以看到，`apply`、`call`、`bind` 三者的区别在于：

- 三者都可以改变函数的 this 对象指向
- 三者第一个参数都是 this 要指向的对象，如果如果没有这个参数或参数为 `undefined` 或 `null`，则默认指向全局 `window`
- 三者都可以传参，但是 `apply` 是数组，而 `call` 是参数列表，且 `apply` 和 `call` 是一次性传入参数，而 `bind` 可以分为多次传入
- `bind` 是返回绑定 `this` 之后的函数，`apply` 、`call` 则是立即执行
