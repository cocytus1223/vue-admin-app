// vue.config.js
module.exports = {
  /** 区分打包环境与开发环境
   * process.env.NODE_ENV==='production'  (打包环境)
   * process.env.NODE_ENV==='development' (开发环境)
   * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
   */

  // 项目部署的基础路径

  // 我们默认假设你的应用将会部署在域名的根部,

  // 例如 https://www.my-app.com/

  // 如果你的应用部署在一个子路径下，那么你需要在这里

  // 指定子路径。比如将你的应用部署在

  // https://www.foobar.com/my-app/

  // 那么将这个值改为 '/my-app/'
  baseUrl: '/', // 构建好的文件输出到哪里

  // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
  outputDir: 'dist',

  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'assets',

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。

  // 设置为 true 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
  lintOnSave: true,

  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: false,

  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [
    /* string or regex */
  ],

  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,

  chainWebpack: () => {},
  configureWebpack: () => {},

  // CSS related options
  css: {
    // 提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。然而，你仍然可以将这个值显性地设置为 true 在所有情况下都强制提取。
    extract: true,

    // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
    sourceMap: false,

    // 向 CSS 相关的 loader 传递选项
    loaderOptions: {}
  },

  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    compress: true
  },

  // 传递任何第三方插件选项。
  pluginOptions: {
    // 安装vue-cli-plugin-style-resources-loader插件
    // 添加全局样式global.scss
    // "style-resources-loader": {
    //   preProcessor: "scss",
    //   patterns: [
    //     resolve(__dirname, "./src/scss/scss/variables.scss")
    //   ]
    // }
  }
}
