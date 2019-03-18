const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

const path = require('path')
function resolve (dir) {
  return path.join(__dirname,dir)
}
console.log( 'process.env', process.env.NODE_ENV )
module.exports = {
  outputDir: 'dist',
  baseUrl: process.env.NODE_ENV === 'production' ? './' : './',
  devServer: {
    port: 8080,
    //host: 'http://47.104.239.164',
    //open: false, //配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    /*proxy: {
      '/apis': {
        target: 'http://47.104.239.164:8080/',   // 需要请求的地址
        changeOrigin: true,  // 是否跨域
        ws: true,
        pathRewrite: {
          '^/apis': ''  // rewrite path
        }
      }
    }*/
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 75,
            selectorBlackList  : ['van','mu'], // 忽略转换正则匹配项
            propList: ['*']
          })
        ]
      }
    }
  },

  configureWebpack: config => {
    config.resolve = {
      extensions: ['.js', '.vue', '.json',".css"],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      }
    }
  },

  lintOnSave: false
};
