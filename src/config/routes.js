import DevMgt from '../views/DevMgt.vue'
import DevStatus from '../views/DevStatus.vue'

export default[
    {
        path: '/',
        redirect: '/devMgt'
    },
    {
        path: '/devMgt',
        name: 'devmgt',
        component: DevMgt,
        // props: (route) => ({
        //     a: route.query.a,
        //     b: route.query.b
        // }),
        children: [{
            path: 'test',
            component: DevStatus
        }]
    },
    {
        path: '/devStatus',
        name: 'devstatus',
        component: DevStatus,
        hidden: true
    }
]