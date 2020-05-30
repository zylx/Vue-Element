const Admin = () => import(/* webpackChunkName: "pages" */ '../pages/Admin.vue')
const DevMgt = () => import(/* webpackChunkName: "pages" */ '../pages/DevMgt.vue')
const DevStatus = () => import(/* webpackChunkName: "pages" */ '../pages/DevStatus.vue')
const Login = () => import(/* webpackChunkName: "pages" */ '../pages/Login.vue')

export default [{
        path: '/',
        redirect: '/admin/devMgt'
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        // props: (route) => ({
        //     a: route.query.a,
        //     b: route.query.b
        // }),
        children: [{
            path: 'devMgt',
            name: 'devMgt',
            component: DevMgt
        }, {
            path: 'devStatus',
            name: 'devStatus',
            component: DevStatus
        }]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        hidden: true
    }
]