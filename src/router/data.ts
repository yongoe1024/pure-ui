import type { RouteRecordRaw } from 'vue-router'

/**
 * 基础路由
 */
export const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: '登录',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    redirect: '/home',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: '首页',
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue')
  }
]
