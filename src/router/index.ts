import { createRouter, createWebHashHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';

const router = createRouter({
  history: createWebHashHistory(), // 按照文档要求使用 Hash 模式
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
});

export default router;