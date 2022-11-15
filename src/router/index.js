import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component:Home
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  /* must call `next` */
    if(to.path==='/login') return next()
    const tokenStr=window.sessionStorage.getItem('token')
    if(!tokenStr){
      return next('/login')
    }
    next()
  });
export default router
