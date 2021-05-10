import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/location',
        name: 'location',
        component: () => import(/* webpackChunkName: "about" */ '../views/location')
    },
    {
        path: '/navigation',
        name: 'navigation',
        component: () => import(/* webpackChunkName: "about" */ '../views/navigation')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
        next();
});

export default router
