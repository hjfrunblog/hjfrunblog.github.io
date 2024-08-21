# MVC 和 MVVM 区别

## MVC

MVC 全名是 Model View Controller，是模型(model)－视图(view)－控制器(controller)的缩写，一种软件设计典范

- Model（模型）：是应用程序中用于处理应用程序数据逻辑的部分。通常模型对象负责在数据库中存取数据
- View（视图）：是应用程序中处理数据显示的部分。通常视图是依据模型数据创建的
- Controller（控制器）：是应用程序中处理用户交互的部分。通常控制器负责从视图读取数据，控制用户输入，并向模型发送数据
  ![mvc](/tech/mvc.png)

MVC 的思想：一句话描述就是 Controller 负责将 Model 的数据用 View 显示出来，换句话说就是在 Controller 里面把 Model 的数据赋值给 View。

## MVVM

MVVM 新增了 VM 类

- ViewModel 层：做了两件事达到了数据的双向绑定 一是将【模型】转化成【视图】，即将后端传递的数据转化成所看到的页面。实现的方式是：数据绑定。二是将【视图】转化成【模型】，即将所看到的页面转化成后端的数据。实现的方式是：DOM 事件监听。
  ![mvvm](/tech/mvvm.png)
- MVVM 与 MVC 最大的区别就是：它实现了 View 和 Model 的自动同步，也就是当 Model 的属性改变时，我们不用再自己手动操作 Dom 元素，来改变 View 的显示，而是改变属性后该属性对应 View 层显示会自动改变（对应 Vue 数据驱动的思想）
- 整体看来，MVVM 比 MVC 精简很多，不仅简化了业务与界面的依赖，还解决了数据频繁更新的问题，不用再用选择器操作 DOM 元素。因为在 MVVM 中，View 不知道 Model 的存在，Model 和 ViewModel 也观察不到 View，这种低耦合模式提高代码的可重用性
- View 接收用户交互请求
- View 将请求转交给 ViewModel
- ViewModel 操作 Model 数据更新
- Model 更新完数据，通知 ViewModel 数据发生变化
- ViewModel 更新 View 数据

::: warning
Vue 并没有完全遵循 MVVM 的思想 这一点官网自己也有说明

严格的 MVVM 要求 View 不能和 Model 直接通信，而 Vue 提供了$refs 这个属性，让 Model 可以直接操作 View，违反了这一规定，所以说 Vue 没有完全遵循 MVVM。
:::

MVVM模式和MVC有些类似，但有以下不同：

- ViewModel 替换了 Controller，在UI层之下
- ViewModel 向 View 暴露它所需要的数据和指令对象
- ViewModel 接收来自 Model 的数据

概括起来，MVVM 是由 MVC 发展而来，通过在 Model 之上而在 View 之下增加一个非视觉的组件将来自 Model 的数据映射到 View中。

![mvvm](/tech/mvvm2.png)

**MVVM 解决了什么问题 ？**

三个痛点问题：

- 开发者在代码中大量调用相同的 DOM API，处理繁琐 ，操作冗余，使得代码难以维护
- 大量的 DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。
- 当 Model 频繁发生变化，开发者需要主动更新到 View ；当用户的操作导致 Model 发生变化，开发者同样需要将变化的数据同步到 Model 中，这样的工作不仅繁琐，而且很难维护复杂多变的数据状态。

其实，早期 jQuery 的出现就是为了前端能更简洁的操作 DOM 而设计的，但它只解决了第一个问题，另外两个问题始终伴随着前端一直存在 ! MVVM 的出现，完美解决了以上三个问题 。
