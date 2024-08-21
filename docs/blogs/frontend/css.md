# CSS 相关

## BFC

BFC 全称为块级格式化上下文 (Block Formatting Context) ,可以说 BFC 就是一个作用范围，把它理解成是一个独立的容器，并且这个容器里 box 的布局与这个容器外的 box 毫不相干。

- 内部的盒会在垂直方向- 一个接一个排列（可以看作 BFC 中有一个的常规流）
- 处于同一个 BFC 中的元素相互影响，可能会发生外边距重叠
- 每个元素的 margin box 的左边，与容器块 border box 的左边相接触(对于从左往右的格式化，否则相反)，即使存在浮动也是如此
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
- 计算 BFC 的高度时，考虑 BFC 所包含的所有元素，连浮动元素也参与计算
- 浮动盒区域不叠加到 BFC 上

## Flex 布局

### 容器属性 （使用在 flex 布局容器上的属性）

- justify-content 定义了子元素在主轴(横轴)上的对齐方式

```css
.container {
  justify-content: center | flex-start | flex-end | space-between | space-around;
  /* 主轴对齐方式：居中 | 左对齐(默认值) | 右对齐 | 两端对齐(子元素间边距相等) | 周围对齐(每个子元素两侧margin相等） */
}
```

- align-items 定义了定义项目在交叉轴(竖轴)上对齐方式

```css
.container {
  align-items: center | flex-start | flex-end | baseline | stretch;
  /* 侧轴对齐方式：居中 | 上对齐 | 下对齐 | 项目的第一行文字的基线对齐 | 如果子元素未设置高度，将占满整个容器的高度（默认值） */
}
```

- align-content 定义多根轴线的对齐方式

```css
.container {
  align-content: center | flex-start | flex-end | space-between | space-around |
    stretch;
  /* 默认值：与交叉轴的中点对齐 | 与交叉轴的起点对齐 | 与交叉轴的终点对齐 | 与交叉轴两端对齐 | 每根轴线两侧的间隔都相等 | （默认值）：轴线占满整个交叉轴 */
}
```

- flex-direction 主轴(横轴)方向

```css
.container {
  flex-direction: row | row-reverse | column | column-reverse;
  /* 主轴方向：水平由左至右排列（默认值） | 水平由右向左 | 垂直由上至下 | 垂直由下至上 */
}
```

- flex-wrap 换行方式

```css
.container {
  flex-wrap: nowrap | wrap | wrap-reverse;
  /*换行方式：不换行（默认值） | 换行 | 反向换行*/
}
```

- flex-flow flex-flow 属性是 flex-direction 属性和 flex-wrap 的简写

```css
.container {
  flex-flow: <flex-direction> || <flex-wrap>;
  /* 默认值：row nowrap */
}
```

### 项目属性（使用在容器内子元素上的属性）

- flex-grow 定义项目的放大比例，默认为0，即使有剩余空间也不放大

如果所有子元素flex-grow为1，那么将等分剩余空间，如果某个子元素flex-grow为2，那么这个子元素将占据2倍的剩余空间

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

- flex-shrink 定义项目的缩小比例，默认为1，即如果空间不足，子元素将缩小。

如果所有子元素flex-shrink都为1，某个子元素flex-shrink为0，那么该子元素将不缩小

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

- flex-basis 定义在分配多余空间之前，项目占据的主轴空间
默认auto，即子元素本来的大小，如果设定为一个固定的值，那么子元素将占据固定空间

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

- flex flex属性是flex-grow, flex-shrink 和 flex-basis的简写
默认值为0 1 auto，即有剩余空间不放大，剩余空间不够将缩小，子元素占据自身大小

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

flex有两个快捷值：auto和none，分别代表1 1 auto（有剩余空间则平均分配，空间不够将等比缩小，子元素占据空间等于自身大小）和0 0 auto（有剩余空间也不分配，空间不够也不缩小，子元素占据空间等于自身大小）

- order 定义项目的排列顺序。数值越小，排列越靠前，默认为0

```css
.item {
  order: <integer>;
}
```

- align-self 定义单个子元素的排列方式
例如align-items设置了center，使得所有子元素居中对齐，那么可以通过给某个子元素设置align-self来单独设置子元素的排序方式

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```
