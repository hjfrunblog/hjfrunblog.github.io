# Vue2 数据绑定的原理

## 一般理解

1. vue 会遍历此`data`中对象所有的属性;
2. 并使用`Object.defineProperty`把这些属性全部转位`getter/setter`
3. 而每个组件实例都有`watcher`对象
4. 它会在组件渲染的过程中把属性记录位依赖
5. 之后当依赖项的`setter`被调用时, 会通知`watcher`重新计算, 从而致使它关联的组件得以更新

## 深入解释

vue 的响应式原理中三个最重要的对象：`Observer`, `Watcher`, `Dep`
`Observer` 对象：vue 中的数据对象在初始化过程中转换为 `Observer` 对象;
`Watcher` 对象：将模板和 Observer 对象结合在一起生成 Watcher 实例, Watcher 是订阅者中的订阅者;
Dep 对象：`Watcher` 对象和 Observer 对象之间的纽带, 每一个 Observer 都有一个 Dep 实例, 用来存储订阅者 Watcher

当属性变化为执行主体对象的`Observer`的`dep.notify`方法, 这个方法会遍历订阅者`Watcher`列表向其发送消息; `Watcher`会执行`run`方法去更新视图

模板编译过程中的指令和数据绑定都会生成 Watcher 实例, 实例中的 watch 属性也会生成 Watcher 实例

## 完美回答

1. 在生命周期的`initState`方法中将`data`, `prop`, `method`, `computed`, `watch`中的数据劫持, 通过`observe`方法与`Object.defineProperty`方法将相关对象转换为 Observer 对象;
2. 然后在`initRender`方法中解析模板, 通过`Watcher`对象, Dep 对象与观察者模式将模板中的指令与对象的数据建立依赖关系, 使用全局对象`Dep.target`实现依赖收集;
3. 当数据变化时, `setter`被调用, 触发`Object.defineProperty`方法中的`dep.notify`方法, 遍历该数据的依赖列表, 执行器`udpate`方法通知`Watcher`进行视图更新;

vue 是无法检测到对象属性的添加和删除, 但是可以使用全局的`Vue.set`方法（或`vm.$set`实例方法）
vue 无法检测利用索引设置的数组, 但是可以使用全局的`Vue.set`方法（或`vm.$set`实例方法）
无法检测直接修改数组长度, 但是可以使用 splice
