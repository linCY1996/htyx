import Vue from 'vue'
import App from './App'
import store from './store' 
import header from './components/header.vue';
import api from '@/common/request.js'
import fr_loading from './components/loading/loading.vue'
import util from '@/common/util.js'

Vue.component('fr-loading',fr_loading) 
Vue.prototype.$http = api
Vue.prototype.util = util

Vue.component('my-header',header);

Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
