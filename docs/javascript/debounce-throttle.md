---
lastUpdated: 2024-04-02T00:47:46+0800
---

# 防抖 和 节流

**防抖**（**Debounce**）和**节流**（**Throttle**）的共同点都是为来降低频率; 防抖不在意过程, 在一段时间内, 只有最后一次产生效果. 节流在意过程

## 防抖

**防抖**：debounce 方法会将多次高频操作优化为只在最后一次执行, 常用于用户进行搜索输入节约请求资源, window 触发 resize 的时候只做最后一次处理等

**防抖**：发送请求太多. 延时一会儿再发送请求, 发送了很多次, 一般来说只需要执行最后停下来的时候的那一次. 如搜索联想建议. 停止的时候去触发一下

### 防抖使用场景

**经典场景：**

在某个搜索框中输入自己想要搜索的内容，比如想要搜索一个 MacBook：

- 当我输入 m 时，为了更好的用户体验，通常会出现对应的联想内容，这些联想内容通常是保存在服务器的，所以需要一次网络请求；
- 当继续输入 ma 时，再次发送网络请求；
- 那么 macbook 一共需要发送 7 次网络请求；
- 这大大损耗我们整个系统的性能，无论是前端的事件处理，还是对于服务器的压力；

但是我们需要这么多次的网络请求吗？

- 不需要，正确的做法应该是在合适的情况下再发送网络请求；
- 比如如果用户快速的输入一个 macbook，那么只是发送一次网络请求；
- 比如如果用户是输入一个 m 想了一会儿，这个时候 m 确实应该发送一次网络请求；
- 也就是我们应该监听用户在某个时间，比如 500ms 内，没有再次触发时间时，再发送网络请求；

这就是防抖的操作，它只有在某个时间内，没有再次触发某个函数时，才真正的调用这个函数。

- 当事件触发时，相应的函数并不会立即触发，而是会等待一定的时间；
- 当事件密集触发时，函数的触发会被频繁的推迟；
- 只有等待了一段时间也没有事件触发，才会真正的执行响应函数；

防抖的应用场景很多：

- 输入框中频繁的输入内容，搜索或者提交信息；
- 频繁的点击按钮，触发某个事件；
- 监听浏览器滚动事件，完成某些特定操作；
- 用户缩放浏览器的 resize 事件；

总之，密集的事件触发，我们只希望触发比较靠后发生的事件，就可以使用防抖函数；

## 节流

**Throttle**：throttle 方法会将多次高频操作优化为在固定时间内只执行一次, 常用于滚动加载、用户滚动、窗口对象 (window 对象) 的 resize 和 scroll 事件等
**节流**：每个一段时间, 要执行一次; 有中采样的感觉. 核心的节制流量, 而不是停止流量. 如天使随着鼠标去滑动, 适合用节流. 不需要那么高的频率. 还有屏幕窗口 resize. 列表频繁滑动. 这种情况依然需要频繁触发. 只是不要那么频繁. 产生事件的时候, 判断节流阀; 如果节流阀成立, 设为不成立, 做正常操作, 开启定时器, 定时器结束时重置节流阀。

### 节流使用场景

- 监听页面的滚动事件
- 鼠标移动事件
- 用户频繁点击按钮操作
- 游戏中的一些设计

总之，依然是密集的事件触发，但是这次密集事件触发的过程，不会等待最后一次才进行函数调用，而是按照一定的频率进行调用。

## 防抖实现方式

防抖函数的核心思路：

- 当触发一个函数时，并不会立即执行这个函数，而是会延迟（通过定时器来延迟函数的执行）

  - 如果在延迟时间内，有重新触发函数，那么取消上一次的函数执行（取消定时器）；
  - 如果在延迟时间内，没有重新触发函数，那么这个函数就正常执行（执行传入的函数）；

- 定义 debounce 函数要求传入两个参数
  - 需要处理的函数 fn；
  - 延迟时间；
- 通过定时器来延迟传入函数 fn 的执行
  - 如果在此期间有再次触发这个函数，那么 clearTimeout 取消这个定时器；
  - 如果没有触发，那么在定时器的回调函数中执行即可；

代码示例：
::: code-group

```js [基础版本]
function debounce(fn, delay) {
  var timer = null
  return function () {
    if (timer) clearTimeout(timer)
    timer = setTimeout(function () {
      fn()
    }, delay)
  }
}
```

```js [增加参数]:line-numbers
function debounce(cb, delay = 1000) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      cb(...args)
    }, delay)
    // or
    // timer = setTimeout(() => cb.apply(this, args), delay)
  }
}
```

```js [增加this]
function debounce(fn, delay) {
  var timer = null
  return function () {
    if (timer) clearTimeout(timer)
    // 获取this和argument
    var _this = this
    var _arguments = arguments
    timer = setTimeout(function () {
      // 在执行时，通过apply来使用_this和_arguments
      fn.apply(_this, _arguments)
    }, delay)
  }
}
```

:::

## 节流实现方式

::: code-group

```js [Solution 1]:line-numbers
function throttle(cb, delay = 1000) {
  let timer
  return (...args) => {
    if (timer) return
    cb(...args)
    timer = setTimeout(() => {
      timer = null
    }, delay)
  }
}
```

```js [Solution 2]:line-numbers
function throttle(func, timeout = 500) {
  let shouldWait = false
  return (...args) => {
    if (shouldWait) return
    func(...args) // func.apply(this, args)
    shouldWait = true
    setTimeout(() => {
      shouldWait = false
    }, timeout)
  }
}
```

:::
