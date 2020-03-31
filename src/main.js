import Vue from 'vue';
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import './css/reset.css';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import createRouter from './config/router'

Vue.use(VueRouter)
Vue.use(ElementUI)

const router = createRouter()

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')