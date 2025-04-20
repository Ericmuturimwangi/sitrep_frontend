const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require('autoprefixer')()
          ]
        }
      }
    }
  },
  devServer: {
    historyApiFallback: true // 👈 this is the key
  }
})