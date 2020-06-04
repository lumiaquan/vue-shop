import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import { Loading } from 'element-ui'
import Welcome from '../components/Welcome'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('../components/Home'),
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      {
        name: 'users',
        path: '/users',
        component: () => import('../components/user/Users')
      }
    ]
  }
]
const router = new VueRouter({
  routes
})

const whiteList = ['/login', '/register', '/404']
const options = {
  text: '加载中',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.6)'
}

router.beforeEach((to, from, next) => {
  let hasToken = window.sessionStorage.getItem('token')
  Loading.service(options)
  if (hasToken) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
      Loading.service().close()
    } else {
      next({ name: 'login' })
      Loading.service().close()
    }
  }
})

router.afterEach(() => {
  Loading.service().close()
})

export default router
