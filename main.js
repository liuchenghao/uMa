import Vue from 'vue'
import App from './App'
// import store from './store'
import {
  http
} from '@/common/utils/http.js';
import QQMapWX from '@/common/lib/qqmap-wx-jssdk.js';
const qqMapSdk = new QQMapWX({
  key: __uniConfig.qqMapKey
});
Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.prototype.$map = qqMapSdk;
// Vue.prototype.$store = store
import store from '@/vuex/store';
Vue.prototype.$store = store;
store.$http = http;
App.mpType = 'app';
const app = new Vue({
  store,
  ...App
});
app.$mount();
