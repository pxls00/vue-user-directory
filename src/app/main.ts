import { createApp } from 'vue';
import App from '../App.vue';
import { createPiniaApp } from './pinia';
import { createRouterApp } from './router';
import '@/shared/styles/main.css';

export function mountApp(selector = '#app') {
  const app = createApp(App);
  const pinia = createPiniaApp();
  const router = createRouterApp();
  app.use(pinia).use(router).mount(selector);
}

