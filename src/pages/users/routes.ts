// routes.ts — маршруты уровня pages для Users
import type { RouteRecordRaw } from 'vue-router';

export const usersRoutes: RouteRecordRaw[] = [
  {
    path: '/users',
    component: () => import('./UsersPage.vue'),
  },
];

