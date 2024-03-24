# Call, Bind and Apply in JavaScript (Explicit Binding)

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
