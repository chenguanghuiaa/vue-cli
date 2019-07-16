import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Home from './components/HelloWorld.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})
