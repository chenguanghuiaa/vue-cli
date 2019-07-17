import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// axios 请求拦截器  每次携带 Authorization 字段
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.common['Authorization'] = sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})

Vue.prototype.$http = axios
