import Vue from 'vue'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import './css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'

import services from './api/index'
import md5 from 'js-md5'

import createRouter from './config/router'
import App from './App.vue'

// 将services挂载到vue的原型上
// 业务中引用的方法：this.$services.接口名（小驼峰）
Vue.prototype.$services = services
Vue.prototype.$md5 = md5

// 全局引入
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts

// 按需引入
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
Vue.component('chart', ECharts)

Vue.use(VueRouter)
Vue.use(ElementUI)
// Vue.use(VueAxios, axios)

const router = createRouter()

// router.beforeEach((to, from, next) => {
// console.log("to", to)
//     //NProgress.start();
//     if (to.path === '/login') {
//         sessionStorage.removeItem('user')
//         sessionStorage.removeItem('tk')
//     }
//     let user = sessionStorage.getItem('user');
//     if (!user && to.path !== '/login') {
//         next({
//             path: '/login'
//         })
//     } else {
//         next()
//     }
// })

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')