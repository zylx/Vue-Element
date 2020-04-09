import Vue from 'vue';
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import './css/reset.css';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue';
import createRouter from './config/router'

// 全局引入
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts

// 按需引入
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
Vue.component('chart', ECharts)

Vue.use(VueRouter)
Vue.use(ElementUI)

const router = createRouter()

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')