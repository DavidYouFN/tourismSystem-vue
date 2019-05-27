import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'element-ui'
import less from 'less'
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-default/index.css';
import '@/assets/css/gobal.css';
import '@/assets/css/fontawesome.min.css';
import '@/assets/css/regular.min.css';
import '@/assets/css/solid.min.css';
import '@/assets/less/main.less';
import  VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import axios from 'axios';

Vue.use(element);
Vue.use(less);
Vue.use(VueQuillEditor)

//修改原型链，引入axios
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

