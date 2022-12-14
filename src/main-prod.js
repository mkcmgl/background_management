import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './plugins/element.js'
import '@/assets/css/global.css'
import './assets/fonts/iconfont.css'
import TreeTable from 'vue-table-with-tree-grid';
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器对应的样式
// import 'quill/dist/quill.core.css' // import styles
// import 'quill/dist/quill.snow.css' // for snow theme
// import 'quill/dist/quill.bubble.css' // for bubble theme
import nprogress from 'nprogress';
// import 'nprogress/nprogress.css'
Vue.config.productionTip = false
Vue.component('tree-table',TreeTable)
import axios from 'axios';
axios.defaults.baseURL='http://49.233.37.179:8888/api/private/v1/'
// axios.defaults.baseURL='http://121.4.255.161:8888/api/private/v1/'
axios.interceptors.request.use(config=>{
  nprogress.start()
  config.headers.Authorization=window.sessionStorage.getItem('token')
  return config
})
axios.interceptors.response.use(config=>{
  nprogress.done()
  return config
})
Vue.prototype.$http=axios
Vue.use(VueQuillEditor)
Vue.filter('dateFormat',function(originVal){
  const dt=new Date(originVal)
  const y=dt.getFullYear()
  const m=(dt.getMonth()+1+'').padStart(2,'0')
  const d=(dt.getDate()+'').padStart(2,'0')
  const hh=(dt.getHours()+'').padStart(2,'0')
  const mm=(dt.getMinutes()+'').padStart(2,'0')
  const ss=(dt.getSeconds()+'').padStart(2,'0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
