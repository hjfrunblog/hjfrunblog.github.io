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
