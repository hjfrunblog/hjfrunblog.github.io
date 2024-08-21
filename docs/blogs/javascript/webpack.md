# webpack 使用

## 加快构建速度(打包速度)

1. 使用 `speed-measure-webpack-plugin` 插件可以测量各个插件和 `loader` 所花费的时间，量化打包速度，判断优化效果
2. 通过 exclude、include 配置来确保转译尽可能少的文件
3. 在一些性能开销较大的 loader 之前添加 `cache-loader`，将结果缓存中磁盘中
4. 使用 `happypack` 开启多进程打包
5. 除了使用 `Happypack` 外，我们也可以使用 `thread-loader` 开启多进程打包 loader
6. 使用 `webpack-parallel-uglify-plugin` 开启 JS 多进程压缩，webpack 内置默认使用 TerserWebpackPlugin
7. 使用 `HardSourceWebpackPlugin` 为模块提供中间缓存，第二次构建可大量节约时间
8. 使用 `noParse` 来标识第三方模块没有 AMD/CommonJS 规范的模块，这样 Webpack 会引入这些模块，但是不进行转化和解析，从而提升 Webpack 的构建性能
9. 使用 resolve 配置 webpack 在哪寻找模块所对应的文件
10. 使用 `IgnorePlugin` 忽略第三方包指定目录，例如 moment 的本地语言包

## 减少打包文件体积

1. 引入 `webpack-bundle-analyzer` 分析打包后的文件
2. 使用 `externals` 将 JS 文件、CSS 文件和存储在 CDN
3. 使用 DllPlugin（动态链接库）将 bundles 拆分，使用 DllReferencePlugin(索引链接) 对 manifest.json 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间
4. 使用 `optimization.splitChunks` 配置抽离公共代码
5. 使用 `IgnorePlugin` 忽略第三方包指定目录，例如 moment 的本地语言包（重复）
6. 使用 `url-loader` 或 `image-webpack-loader` 对图片进行转化或者压缩处理
7. 优化 SourceMap，开发环境推荐： `cheap-module-eval-source-map`，生产环境推荐： `cheap-module-source-map`
8. webpack 自身的优化：
   - `tree-shaking`，在生产环境下，会自动移除没有使用到的代码
   - `scope hosting` 作用域提升，变量提升，可以减少一些变量声明
   - `babel` 配置的优化，配置 `@babel/plugin-transform-runtime`，重复使用 Babel 注入的帮助程序，以节省代码大小的插件。

## Webpack 构建流程简单说一下

简单说：

- 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler
- 编译：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容，再找到该 Module 依赖的 Module，递归地进行编译处理
- 输出：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中

## webpack 中如何处理图片的？

在 webpack 中有两种处理图片的 loader：

- `file-loader`：解决 CSS 等中引入图片的路径问题；(解决通过 url,import/require()等引入图片的问题)
- `url-loader`：当图片小于设置的 limit 参数值时，url-loader 将图片进行 base64 编码(当项目中有很多图片，通过 url-loader 进行 base64 编码后会减少 http 请求数量，提高性能)，大于 limit 参数值，则使用 file-loader 拷贝图片并输出到编译目录中

## 使用 webpack 开发时，你用过哪些可以提高效率的插件？

- `webpack-dashboard`：可以更友好的展示相关打包信息
- `webpack-merge`：提取公共配置，减少重复配置代码
- `speed-measure-webpack-plugin`：简称 SMP，分析出 Webpack 打包过程中 Loader 和 Plugin 的耗时，有助于找到构建过程中的性能瓶颈
- `webpack-bundle-analyzer` 分析打包后的文件
- `HotModuleReplacementPlugin`：模块热替换

## source map 是什么？生产环境怎么用

source map 是将编译、打包、压缩后的代码映射回源代码的过程。打包压缩后的代码不具备良好的可读性，想要调试源码就需要 soucre map。

map文件只要不打开开发者工具，浏览器是不会加载的。

线上环境一般有三种处理方案：

- `hidden-source-map`：借助第三方错误监控平台 Sentry 使用
- `nosources-source-map`：只会显示具体行数以及查看源代码的错误栈。安全性比 source map 高
- `sourcemap`：通过 nginx 设置将 .map 文件只对白名单开放(公司内网)

注意：避免在生产中使用 inline- 和 eval-，因为它们会增加 bundle 体积大小，并降低整体性能。

开发环境推荐： cheap-module-eval-source-map

生产环境推荐： cheap-module-source-map

## 如何对bundle体积进行监控和分析？

VSCode 中有一个插件 Import Cost 可以帮助我们对引入模块的大小进行实时监测，还可以使用 webpack-bundle-analyzer 生成 bundle 的模块组成图，显示所占体积。

bundlesize 工具包可以进行自动化资源体积监控。

## webpack中的 loader 和 plugin 有什么区别？

loader 它是一个转换器，只专注于转换文件这一个领域，完成压缩、打包、语言编译，它仅仅是为了打包。并且运行在打包之前。Loader 本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果。 因为 Webpack 只认识 JavaScript，所以 Loader 就成了翻译官，对其他类型的资源进行转译的预处理工作。

而 plugin 是一个扩展器，它丰富了 webpack 本身，为其进行一些其它功能的扩展。它不局限于打包，资源的加载，还有其它的功能。所以它是在整个编译周期都起作用。
