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

import TreeTable from 'vue-table-with-tree-grid'

// 引入 moment
import moment from 'moment'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 转换日期
Vue.filter('dateFormat', function(value) {
  return moment(value).format('YYYY-MM-DD hh-mm-ss')
})

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
