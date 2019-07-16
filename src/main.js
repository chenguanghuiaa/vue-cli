import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/base.css'
import './plugins/element.js'
<<<<<<< HEAD
// 导入字体图标
import './assets/fonts/iconfont.css'
=======
>>>>>>> ee554a30f85392ffa90db8474520992147aa4ada

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
