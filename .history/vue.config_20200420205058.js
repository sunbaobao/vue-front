module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8080,
    // open: true, //配置自动启动浏览器
    proxy: {
      '/bdApiP': {
        target: 'https://aip.baidubce.com/rest/2.0',
        changeOrigin: true,
        pathRewrite: {
          '^/bdApiP': ''
        }
      },
      '/bdApi': {
        target: 'http://localhost:3000/bdApi',
        changeOrigin: true,
        pathRewrite: {
          '^/bdApi': ''
        }
      },
      '/user': {
        target: 'http://localhost:3000/user',
        changeOrigin: true,
        pathRewrite: {
          '^/user': ''
        }
      },
      '/server': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        pathRewrite: {
          '^/server': ''
        }
      }
    }
  }
}