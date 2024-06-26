// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Vant from 'vant';
import 'vant/lib/index.css';
import * as api from './api/index';
import './assets/css/global.css'


Vue.use(Vant);
Vue.prototype.$http = api
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
