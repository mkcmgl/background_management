import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from '../components/Login.vue'
const Login = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Login.vue')
const Home = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Home.vue')
const Welcome = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Welcome')

// import Home from '../components/Home.vue'
// import Welcome from '../components/Welcome.vue'

const users = () => import(/* webpackChunkName:"users_rights_roles" */ '../components/users')
const rights = () => import(/* webpackChunkName:"users_rights_roles" */ '../components/rights')
const roles = () => import(/* webpackChunkName:"users_rights_roles" */ '../components/roles')

// import users from '../components/users'
// import rights from '../components/rights'
// import roles from '../components/roles'

const goods = () => import(/* webpackChunkName:"goods_params" */ '../components/goods')
const params = () => import(/* webpackChunkName:"goods_params" */ '../components/params')

// import goods from '../components/goods'
// import params from '../components/params'

const categories = () => import(/* webpackChunkName:"categories_add" */ '../components/categories')
const add = () => import(/* webpackChunkName:"categories_add" */ '../components/goods/add')

// import categories from '../components/categories'
// import add from '../components/goods/add'

const orders = () => import(/* webpackChunkName:"orders_reports" */ '../components/orders')
const reports = () => import(/* webpackChunkName:"orders_reports" */ '../components/reports')
// import orders from '../components/orders'
// import reports from '../components/reports'

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
    component:Home,
    redirect:'/welcome',
    children:[
      {
        path: '/welcome',
        name: 'welcome',
        component:Welcome
      },
      {
        path: '/users',
        name: 'users',
        component:users
      },
      {
        path: '/rights',
        name: 'rights',
        component:rights
      },
      {
        path: '/roles',
        name: 'roles',
        component:roles
      },
    
      {
        path: '/goods',
        name: 'goods',
        component:goods,
      }
      ,
      {
        path: '/goods/add',
        name: 'add',
        component: add,
      },
      {
        path: '/params',
        name: 'params',
        component:params
      }
      ,
    
      {
        path: '/categories',
        name: 'categories',
        component:categories
      }
      ,
    
      {
        path: '/orders',
        name: 'orders',
        component:orders
      },
      {
        path: '/reports',
        name: 'reports',
        component:reports
      }
    ]
  }
  ,

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
