# 防抖和节流

## 防抖

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

## 节流

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
