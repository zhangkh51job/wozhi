const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

const path = require('path')
function resolve (dir) {
  return path.join(__dirname,dir)
}

module.exports = {
  outputDir: 'dist',
  baseUrl: process.env.NODE_ENV === 'production' ? './' : './',
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
