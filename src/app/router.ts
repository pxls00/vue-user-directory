import { createRouter, createWebHistory, type Router } from 'vue-router';
import { usersRoutes } from '@/pages/users/routes';

export function createRouterApp(): Router {
  return createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', redirect: '/users' },
      ...usersRoutes,
    ],
  });
}

