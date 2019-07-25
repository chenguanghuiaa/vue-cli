import Vue from 'vue'
// 1引入安装好的 Vue-router
import Router from 'vue-router'
// 2引入定义好的 .vue后缀类型的文件
import Login from './views/login'
import Home from './views/Home'
import WelCome from './views/Home/welCome'
import Users from './views/Home/users'
import Rights from './views/Home/power/rights'
import Roles from './views/Home/power/roles'
import Categories from './views/Home/goods/categories'
import Params from './views/Home/goods/params'
import Goods from './views/Home/goods'
import Add from './views/Home/goods/add'
import Orders from './views/Home/orders'
import Reports from './views/Home/reports'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login', component: Login },
    { path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [{
        path: '/welcome',
        component: WelCome
      }, {
        path: '/users',
        component: Users
      }, {
        path: '/rights',
        component: Rights
      }, {
        path: '/roles',
        component: Roles
      }, {
        path: '/categories',
        component: Categories
      }, {
        path: '/params',
        component: Params
      }, {
        path: '/goods',
        component: Goods
      }, {
        path: '/goods/add',
        component: Add
      }, {
        path: '/orders',
        component: Orders
      }, {
        path: '/Reports',
        component: Reports
      }] }
  ]
})

// 路由导航守卫
// to 即将要进入的目标 路由对象
// from 当前导航正要离开的路由
// next 钩子
router.beforeEach((to, from, next) => {
  // 要进入的目标是login 不拦截
  if (to.path === '/login') return next()
  // 获取token
  const token = sessionStorage.getItem('token')
  // 要要进入的目标不是login 有token 强制跳转到 login
  if (!token) return next('/login')
  // // 要要进入的目标不是login 有token 不拦截
  next()
})

export default router
