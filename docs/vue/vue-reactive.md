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

## Proxy 与 Object.defineProperty 的优劣对比 ?

Proxy 的优势如下:

- Proxy 可以直接监听对象而非属性
- Proxy 可以直接监听数组的变化
- Proxy 有多达 13 种拦截方法，不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的
- Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的，而 Object.defineProperty 只能遍历对象属性直接修改
- Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利

Object.defineProperty 的优势如下:

- 兼容性好，支持到 IE9

#
