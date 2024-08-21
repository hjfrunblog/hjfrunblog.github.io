# vuex 和 pinia 的使用和区别

`Vuex` 是 Vue2 官方提供的一个状态管理工具；而 pinia 是 Vue3 官方推荐的一个状态管理工具。

它们都是用于储存和读取公共属性和方法的一个工具；
它们中存取的数据都是响应式的，但是刷新页面会丢失数据，因此需要进行持久化处理；

## Vuex

`Vuex` 一共有五个属性 state、getter、mutation、action、module。

state：主要是用于管理 store 的一个容器，可以在这里面定义一些公用属性；
getter：类似于 Vue 组件实例的 computed，主要用于做一些计算，也可以用于访问 state 中的属性；
mutation：主要用于对 state 的内容进行同步修改，是修改 state 内容唯一被官方推荐使用的手段，可以使用 commit('mutation')来调用 mutation；
action：主要进行一些异步操作，然后通过 mutation 来该变 state 的内容，调用 action 的方法时使用 dispatch；
module：用于将 store 分模块，否则所有属性存在一个 store 中时会造成冗余，而且某些场景下，可能不同数据属于不同的业务，将其分为多模块的方式比较好。

## pinia

`pinia` 在 `Vuex` 的基础上去掉了 mutation，将 action 作为同步和异步共用的操作方法，并且去掉了 module 属性，因为每定义一个 store 就相当于一个模块。因此它一共有三个属性：state、getter、action。
`pinia` 的各个属性和 `Vuex` 类似。

## 区别

使用方式不同，`pinia` 和 `vuex` 是两个不同的库，因此在使用方式上有些细微差别；
`pinia` 支持 compositionApi 的格式，更加贴合 Vue3；
`pinia` 的语法和使用方式更加简洁，调用 action 的方法时无需使用 dispatch；
