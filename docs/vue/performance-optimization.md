# Vue 中的性能优化

Vue 层面的优化手段，例如：代码分割、服务端渲染、组件缓存、长列表优化等

## 最常见的路由懒加载

有效拆分 app 尺寸，访问时才异步加载

```js
// replace
// import UserDetails from './views/UserDetails'
// with
const UserDetails = () => import('./views/UserDetails.vue')

const router = createRouter({
  // ...
  routes: [
    { path: '/users/:id', component: UserDetails }
    // or use it directly in the route definition
    { path: '/users/:id', component: () => import('./views/UserDetails.vue') },
  ],
})
```

## 把组件分块

有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用命名 chunk，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)：

1. webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。
2. 在 Vite 中，可以在 rollupOptions 下定义分块：

::: code-group

```js [webpack]
const UserDetails = () =>
  import(/* webpackChunkName: "group-user" */ "./UserDetails.vue");
const UserDashboard = () =>
  import(/* webpackChunkName: "group-user" */ "./UserDashboard.vue");
const UserProfileEdit = () =>
  import(/* webpackChunkName: "group-user" */ "./UserProfileEdit.vue");
```

```js [vite]
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#outputmanualchunks
      output: {
        manualChunks: {
          "group-user": [
            "./src/UserDetails",
            "./src/UserDashboard",
            "./src/UserProfileEdit",
          ],
        },
      },
    },
  },
});
```

:::

## `keep-alive`缓存页面

避免重复创建组件实例，且能保留缓存组件状态

```html
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component"></component>
  </keep-alive>
</router-view>
```

## 使用 `v-show` 复用 DOM

避免重复创建组件

```html
<template>
  <div class="cell">
    <!-- 这种情况用v-show复用DOM，比v-if效果好 -->
    <div v-show="value" class="on">
      <Heavy :n="10000" />
    </div>
    <section v-show="!value" class="off">
      <Heavy :n="10000" />
    </section>
  </div>
</template>
```

## `v-for` 遍历避免同时使用`v-if`

实际上在`vue3` 中已经是一个错误写法

```html
<template>
  <ul>
    <!-- 避免同时使用，vue3中会报错 -->
    <li v-for="user in activeUsers" :key="user.id">
      {{ user.name }}
      <!-- v-if="user.isActive" -->
    </li>
  </ul>
</template>
<script>
  export default {
    computed: {
      activeUsers: function () {
        return this.users.filter((user) => user.isActive);
      },
    },
  };
</script>
```

## 图片懒加载

对于图片过多的页面，为了加速页面加载速度，所以很多时候我们需要将页面内未出现在可视区域内的图片先不做加载， 等到滚动到可视区域后再去加载。

```html
<img v-lazy="/static/img/1.png" />
<!-- 参考项目：vue-lazyload -->
```

## 第三方插件按需引入

像 `element-plus` 这样的第三方组件库可以按需引入避免体积太大

```js
import { createApp } from "vue";
import { Button, Select } from "element-plus";

const app = createApp();
app.use(Button);
app.use(Select);
```

## 事件的销毁

Vue 组件销毁时，会自动解绑它的全部指令及事件监听器，但是仅限于组件本身的事件。

```js
export default {
  created() {
    this.timer = setInterval(this.refresh, 2000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
```

## 服务端渲染/静态网站生成：SSR/SSG

如果 SPA 应用有首屏渲染慢的问题，可以考虑 SSR、SSG 方案优化。参考 SSR Guide

## 长列表性能优化

如果是大数据长列表，可采用虚拟滚动，只渲染少部分区域的内容。更理想的方式是后端实现分页。

```html
<recycle-scroller class="items" :items="items" :item-size="24">
  <template v-slot="{ item }">
    <FetchItemView :item="item" @vote="voteItem(item)" />
  </template>
</recycle-scroller>
```

::: info 一些开源库
vue-virtual-scroller

vue-virtual-scroll-grid
:::

## v-once 和 v-memo

不再变化的数据使用 `v-once`

```html
<!-- single element -->
<span v-once>This will never change: {{msg}}</span>
<!-- the element have children -->
<div v-once>
  <h1>comment</h1>
  <p>{{msg}}</p>
</div>
<!-- component -->
<my-component v-once :comment="msg"></my-component>
<!-- `v-for` directive -->
<ul>
  <li v-for="i in list" v-once>{{i}}</li>
</ul>
```

按条件跳过更新时使用v-momo：下面这个列表只会更新选中状态变化项

```html
<div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
  <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
  <p>...more child nodes</p>
</div>
```

## 页面性能优化

1. 资源压缩合并，减少HTTP请求
2. 非核心代码异步加载->异步加载的方式->异步加载的区别
   - 异步加载的方式：1、动态脚本加载；2、defer；3、async
   - 异步加载的区别：1、defer是在HTML解析完以及同步js执行完之后才会执行，如果是多个，安装加载的顺序依次执行；2、async是在加载完成之后立即执行，如果是多个，执行顺序和加载顺序无关。
3. 利用浏览器缓存->缓存的分类->缓存的原理
   - 强缓存：Expires （Expires:Thu,21 Jan 2017 23：39：02） GMT；Cache-Control (Cache-Control:max-age=3600)
   - 协商缓存：Last-Modified If-Modified-Since Etag If-None-Match (Last-Modified:Web,26 Jan 2017 00:35:11 GMT)
   - Expires是绝对时间，取客户端电脑的时间来对比，可能不准确，而且可能被修改，Cache-Control是相对时间
   - Last-Modified 与 If-Modified-Since的值相同，Last-Modified是服务器下发的时间，If-Modified-Since是客户端触发协商缓存，请求询问服务器带入的请求头中。这个方式的协商缓存有一个缺点，有可能文件改动了，但是内容没变，所有才有了Etag
   - Etag是服务器下发的key值（Hash值），If-None-Match是客户端触发协商缓存，请求询问服务器key值(内容)有没有变化，是否可以使用缓存。
4. 使用CDN（3~4个域名cdn，并行加载）
5. 预解析DNS
   - <meta http-equiv="x-dns-prefetch-control" content="on"> //强制打开dns预解析，a标签默认开启，但是https情况下是一般是关闭的
   - <link ref="dns-prefetch" href="XXX">

## 其他优化

- 扁平化 Store 数据结构，合理使用持久化 Store 数据
- 引入生产环境的 Vue 文件
- 为 item 设置唯一 key 值
- 减少 watch 的数据，watch 对象的时候使用对象字符串
- 不要在模板里面写过多表达式
- 尽量减少 data 中的数据，data 中的数据都会增加getter 和 setter，会收集对应的watcher
- 不需要响应式的数据不要放到 data 中（可以用 Object.freeze() 冻结数据）
- 对象层级不要过深，否则性能就会差
- 如果需要使用 v-for 给每项元素绑定事件时使用事件代理
- 单独添加的监听事件是不会移除的，需要手动移除事件的监听，以免造成内存泄漏
