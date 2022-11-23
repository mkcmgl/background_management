const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,



  devServer: {
    host: '0.0.0.0',
    port: 8080,


  },

  lintOnSave: false,


  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')

      //   config.set('externals',{
      //     vue:'Vue',
      //     'vue-router':'VueRouter',
      //     axios:'axios',
      //     lodash:'_',
      //     echarts:'echarts',
      //     nprogress:'NProgress',
      //     'vue-quill-editor':'VueQuillEditor'
      // })
      config.plugin('html').tap(args => {
        //添加参数isProd
        args[0].isProd = true
        return args
      })
    })
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')

      //使用插件
      config.plugin('html').tap(args => {
        //添加参数isProd
        args[0].isProd = false
        return args
      })
    })
  }
})
