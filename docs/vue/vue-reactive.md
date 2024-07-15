# Vue 3 响应式系统

在 Vue2 中采用 defineProperty 来劫持整个对象, 然后进行深度遍历所有属性, 给每个属性添加 getter 和 setter, 实现响应式.

这里面存在以下问题：

- 检测不到对象属性的添加和删除
- 数组 API 方法无法监听到 (push, pop, shift, unshift, splice, sort, reverse)
- 需要对每个属性进行遍历监听, 如果嵌套对象, 需要深层监听, 造成性能问题

Vue3 采用 proxy 重写了响应式系统, 因为 proxy 可以对整个对象进行监听, 所以不需要深度遍历

- 可以监听动态属性的添加
- 可以监听到数组的索引和数组 length 属性
- 可以监听删除属性

正因为 defineProperty 自身的缺陷, 导致 Vue2 在实现响应式过程需要实现其他的方法辅助（如重写数组方法、增加额外 set、delete 方法）

## 回答范例

1. vue2 数据响应式实现根据对象类型做不同处理，如果是 object，则通过 Object.defineProperty(obj,key,descriptor)拦截对象属性访问

```js
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      return val
    },
    set(v) {
      val = v
      notify()
    }
  })
}
```

如果是数组，则覆盖数组的 7 个变更方法实现变更通知

```js
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)

;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(
  function (method) {
    const original = arrayProto[method]
    def(arrayMethods, method, function mutator(...args) {
      const result = original.apply(this, args)
      notify()
      return result
    })
  }
)
```

2. 可以看到 vue2 中有几个问题：

- 初始化时需要遍历对象所有 key，如果对象层级较深，性能不好
- 通知更新过程需要维护大量 dep 实例和 watcher 实例，额外占用内存较多
- 动态新增、删除对象属性无法拦截，只能用特定 set/delete api 代替
- 不支持新的 Map、Set 等数据结构

3. vue3 中为了解决以上问题，使用原生的 Proxy 代替：

```js
function defineReactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)
      return Reflect.get(target, key)
    },
    set(target, key, val) {
      Reflect.set(target, key, val)
      trigger(target, key)
    },
    deleteProperty(target, key) {
      Reflect.deleteProperty(target, key)
      trigger(target, key)
    }
  })
}
```

可以同时支持 object 和 array，动态属性增、删都可以拦截，新增数据结构均支持，对象嵌套属性运行时递归，用到才代理，也不需要维护特别多的依赖关系，性能取得很大进步。

## Proxy 与 Object.defineProperty 的优劣对比 ?

Proxy 的优势如下:

- Proxy 可以直接监听对象而非属性
- Proxy 可以直接监听数组的变化
- Proxy 有多达 13 种拦截方法，不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的
- Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的，而 Object.defineProperty 只能遍历对象属性直接修改
- Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利

Object.defineProperty 的优势如下:

- 兼容性好，支持到 IE9
