import { createApp } from 'vue';
import App from '../App.vue';
import { createPiniaApp } from './pinia';
import { createRouterApp } from './router';
import '@/styles/main.css';
import { useUsersStore } from '@/entities/user';

export function mountApp(selector = '#app') {
  const app = createApp(App);
  const pinia = createPiniaApp();
  const router = createRouterApp();
  app.use(pinia).use(router).mount(selector);
  // Инициализация данных приложения
  const usersStore = useUsersStore();
  usersStore.init();
}

