import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import AppLayout from '@/layouts/AppLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    redirect: { name: 'app.Orders' },
    children: [
      {
        path: 'orders',
        component: () => import('@/pages/app/Orders/OrdersIndex.vue'),
        name: 'app.Orders',
        meta: { title: 'Все заказы' },
      },
      {
        path: 'clients',
        component: () => import('@/pages/app/Clients/ClientsIndex.vue'),
        name: 'app.Clients',
        meta: { title: 'Все клиенты' },
      },
    ],
  },
  {
    path: '/forbidden',
    name: 'error403',
    component: () => import('@/pages/ForbiddenPage.vue'),
    meta: { title: 'Доступ запрещен', public: true, error: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error404',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: { title: 'Страница не найдена', public: true, error: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
