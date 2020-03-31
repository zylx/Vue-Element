import DevMgt from '../views/DevMgt.vue'
import DevStatus from '../views/DevStatus.vue'

export default[
    {
        path: '/',
        redirect: '/devMgt'
    },
    {
        path: '/devMgt',
        component: DevMgt
    },
    {
        path: '/devStatus',
        component: DevStatus
    }
]