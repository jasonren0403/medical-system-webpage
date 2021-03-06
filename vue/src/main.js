/**
 * @file vue 主入口
 */

import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import '@/utils/filters'
import 'element-ui/lib/theme-chalk/index.css';
import '../static/css/common.css';

Vue.config.productionTip = false

// import FabricInstance from "../../utils/FabricGateway";
// Vue.prototype.$fabric = new FabricInstance()

Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
