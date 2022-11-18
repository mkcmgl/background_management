import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/assets/css/global.css'
import './assets/fonts/iconfont.css'
import TreeTable from 'vue-table-with-tree-grid';

Vue.config.productionTip = false
Vue.component('tree-table',TreeTable)
import axios from 'axios';
axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
// axios.defaults.baseURL='http://121.4.255.161:8888/api/private/v1/'
axios.interceptors.request.use(config=>{
  config.headers.Authorization=window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http=axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
