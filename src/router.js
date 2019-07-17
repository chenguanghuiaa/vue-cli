import Vue from 'vue'
// 1引入安装好的 Vue-router
import Router from 'vue-router'
// 2引入定义好的 .vue后缀类型的文件
import Login from './views/Login'
import Home from './views/Home'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
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
