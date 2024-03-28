# Debounce 和 Throttle

**防抖**（**Debounce**）和**节流**（**Throttle**）的共同点都是为来降低频率; 防抖不在意过程, 在一段时间内, 只有最后一次产生效果. 节流在意过程

**Debounce**：debounce 方法会将多次高频操作优化为只在最后一次执行, 常用于用户进行搜索输入节约请求资源, window 触发 resize 的时候只做最后一次处理等

**Throttle**：throttle 方法会将多次高频操作优化为在固定时间内只执行一次, 常用于滚动加载、用户滚动、窗口对象 (window 对象) 的 resize 和 scroll 事件等

**防抖**：发送请求太多. 延时一会儿再发送请求, 发送了很多次, 一般来说只需要执行最后停下来的时候的那一次. 如搜索联想建议. 停止的时候去触发一下

**节流**：每个一段时间, 要执行一次; 有中采样的感觉. 核心的节制流量, 而不是停止流量. 如天使随着鼠标去滑动, 适合用节流. 不需要那么高的频率. 还有屏幕窗口 resize. 列表频繁滑动. 这种情况依然需要频繁触发. 只是不要那么频繁. 产生事件的时候, 判断节流阀; 如果节流阀成立, 设为不成立, 做正常操作, 开启定时器, 定时器结束时重置节流阀

## 防抖实现方式

```js
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

## 节流实现方式

```js
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

// or
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
