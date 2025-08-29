import type { RouteRecordRaw } from 'vue-router'

export const usersRoutes: RouteRecordRaw[] = [
  {
    path: '/users',
    name: 'users',
    component: () => import('./UsersPage.vue'),
    meta: { layout: 'default' as const },
  },
]

