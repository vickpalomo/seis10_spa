import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as VueGoogleMaps from 'vue2-google-maps'
// Configuracion de Axios
// axios.defaults.headers.common.Authorization = store.state.authorization
axios.defaults.baseURL = process.env.VUE_APP_API_URI
axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_API_KEY
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
