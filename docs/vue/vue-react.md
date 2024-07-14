# Vue 和 React 的异同

## 相似之处

- 都将注意力集中保持在核心库, 而将其他功能如路由和全局状态管理交给相关的库
- 都有自己的构建工具, 能得到一个根据最佳实践设置的项目模板
- 都使用了 Virtual DOM 提高重绘性能
- 都有 props 概念, 允许组件间的数据传递
- 鼓励组件化应用, 将应用拆分成一个个功能明确的模块, 提高复用性

## 不同之处

### 数据流

vue 默认支持数据双向绑定, 而 React 一直提倡单向数据流

### 组件化

React 与 Vue 最大的不同是模板的编写
Vue 鼓励写近似常规 HTML 模板, 写起来接近标准的 HTML 元素, 只是多了一些属性
React 使用 JSX 书写

## VueJS 与 ReactJS 相比有什么优势 ？

与 React 相比，Vue 具有以下优势

- Vue 更小且更快
- 方便的模板简化了开发过程
- 相比学习 JSX 它有更简单的 JavaScript 语法
- 深受国内企业和开发者喜爱

## ReactJS 与 VueJS 相比有什么优势 ？

与 Vue 相比，React 具有以下优势

- ReactJS 在大型应用程序开发中提供了更大的灵活性
- 易于测试
- 非常适合创建移动应用程序
- 生态系统规模大，成熟度高

## redux与vuex的区别？

vuex 的流向：

- view——>commit——>mutations——>state变化——>view变化（同步操作）
- view——>dispatch——>actions——>mutations——>state变化——>view变化（异步操作）

redux 的流向：

- view——>dispatch——>actions——>reducer——>state变化——>view变化（同步异步一样）

不同点：

1. vuex 以 mutations 函数取代 redux 中的 reducer，只需在对应的 mutation 函数里改变 state 即可。
2. vuex 支中的 state 直接关联到组件实例上，当 state 变化时自动重新渲染，无需订阅重新渲染函数。redux 使用 store 对象存储整个应用的状态，状态变化时，从最顶层向下传递，每一级都会进行状态比较，从而达到更新。
3. vuex 支持 action 异步处理，redux 中只支持同步处理，对于异步处理需要借助于 redux-thunk 和 redux-saga 实现。

#
