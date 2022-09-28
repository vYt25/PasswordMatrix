import Vue from 'vue'
import App from './template/App';
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import io from 'socket.io-client';
import VueIziToast from 'vue-izitoast';
import 'izitoast/dist/css/iziToast.css';
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

const pad = (val) => (val ? val.toString().padStart(5, '0') : null);

const socket = io(`${window.location.protocol}//${window.location.hostname}:9000`);

let timestamp = new Date().toISOString().split('T')
timestamp[1] = timestamp[1].split('.')[0]
timestamp = timestamp.join(' ')

Vue.use(Vuetify)
Vue.use(VueIziToast);

Vue.config.productionTip = false
Vue.prototype.$axios = require('axios')
Vue.prototype.$api = `${window.location.protocol}//${window.location.hostname}:5000/api`
Vue.prototype.$themeColor = '#208895';
Vue.prototype.$pad = pad
Vue.prototype.$socket = socket
Vue.prototype.$md5 = require('md5')
Vue.prototype.$bus = new Vue;
Vue.prototype.$iziToast = VueIziToast;


Vue.prototype.$now = timestamp

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount('#app')
