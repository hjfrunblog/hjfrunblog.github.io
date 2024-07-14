# webpack 性能优化

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
