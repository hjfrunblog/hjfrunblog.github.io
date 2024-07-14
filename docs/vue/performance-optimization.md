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
