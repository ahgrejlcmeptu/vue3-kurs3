import {createRouter, createWebHistory} from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/Tasks')
    },
    {
      path: '/:task_id',
      component: () => import('../views/Task')
    },
    {
      path: '/new',
      component: () => import('../views/New')
    },
    {
      path: '/:notFound(.*)',
      component: () => import('../views/NotFound')
    }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})
