import { RouteRecordRaw } from 'vue-router'
import { authGuard, guestGuard } from 'src/router/guards/auth'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [{ path: '', component: () => import('pages/Home.vue') }],
        beforeEnter: authGuard
    },

    {
        path: '/list/:id',
        name: 'list',
        component: () => import('layouts/MainLayout.vue'),
        children: [{ path: '', component: () => import('pages/Products.vue') }],
        beforeEnter: authGuard
    },

    {
        path: '/login',
        component: () => import('pages/Login.vue'),
        beforeEnter: guestGuard
    },

    {
        path: '/:catchAll(.*)*',
        component: () => import('../pages/Error404.vue')
    }
]

export default routes
