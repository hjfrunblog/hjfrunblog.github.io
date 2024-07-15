# JavaScript 原型 & 原型链

## 相等关系

1. `JavaScript` 分为函数对象和普通对象，每个对象都有`__proto__` 属性，但是只有函数对象才有 `prototype` 属性
2. `Object`、`Function` 都是 `JavaScript` 内置的函数，类似的还有 Array，RegExp，Date，Boolean，Number，String
3. 属性`__proto__`是一个对象，它有两个属性，`constructor` 和`__proto__`
4. 原型对象 `prototype` 有一个默认的 `constructor` 属性，用于记录实例是由哪个构造函数创建

示例：

```js
function Person(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.motherland = 'China'
let p1 = new Person('jf', 18)
```

有以下判断：

```js
Person.prototype.constructor == Person  // 原型对象的constructor指向构造函数本身
p1.__proto__ == Person.prototype        // 实例的__proto__和原型对象指向同一个
```

```js
Object.prototype.__proto__ = null
Array.prototype.__proto__ = Object.prototype
```

```js
Person.prototype.hairColor = 'black'
Person.prototype.eat = function () {
    console.log('We usually eat three meals every day.')
}
```

```js
p1.hairColor = 'yellow'   // 属性遮蔽
console.log(p1)
console.log(p2)
```

## 对象原型

访问对象原型的标准方法是 `Object.getPrototypeOf()`

当你试图访问一个对象的属性时：如果在对象本身中找不到该属性，就会在原型中搜索该属性。如果仍然找不到该属性，那么就搜索原型的原型，以此类推，直到找到该属性，或者到达链的末端，在这种情况下，返回 undefined。

## 自有属性

直接在对象中定义的属性，如这里的name，被称为自有属性，你可以使用静态方法 Object.hasOwn() 检查一个属性是否是自有属性：

```js
const irma = new Person("Irma");

console.log(Object.hasOwn(irma, "name")); // true
console.log(Object.hasOwn(irma, "greet")); // false
```
