module.exports = {
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    disableHostCheck: true, // 忽略hosts校验
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/nginx': {
        target: 'http://grcmobilev5.smartdot.com:28089', // 要跨域的域名
        changeOrigin: true, // 是否开启跨域
        pathRewrite: {
          '^/nginx': ''
        }
      }
    }
  }
}
