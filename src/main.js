import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入初始化的css
import './assets/css/base.css'
// 引入 element
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 引入axios
import './api'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
