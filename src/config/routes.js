const Dev = () => import( /* webpackChunkName: "pages" */ '../pages/Dev.vue')
const DevSettings = () => import( /* webpackChunkName: "pages" */ '../pages/DevSettings.vue')
const DevStatus = () => import( /* webpackChunkName: "pages" */ '../pages/DevStatus.vue')
const AlarmConfig = () => import( /* webpackChunkName: "pages" */ '../pages/AlarmConfig.vue')
const HistoryEvents = () => import( /* webpackChunkName: "pages" */ '../pages/HistoryEvents.vue')
const Login = () => import( /* webpackChunkName: "pages" */ '../pages/Login.vue')

export default [{
        path: '/',
        redirect: '/dev/settings'
    },
    {
        path: '/dev',
        name: 'dev',
        component: Dev,
        // props: (route) => ({
        //     a: route.query.a,
        //     b: route.query.b
        // }),
        children: [{
            path: 'settings',
            name: 'settings',
            component: DevSettings
        }, {
            path: 'status',
            name: 'status',
            component: DevStatus
        }, {
            path: 'alarmConfig',
            name: 'alarmConfig',
            component: AlarmConfig
        }, {
            path: 'historyEvents',
            name: 'historyEvents',
            component: HistoryEvents
        }]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        hidden: true
    }
]