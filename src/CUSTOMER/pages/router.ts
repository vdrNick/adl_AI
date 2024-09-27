import type { RouteRecordRaw } from 'vue-router';
const isDev = import.meta.env.DEV;

const dev = {
  path: '/dev',
  component: () => import('@/CUSTOMER/pages/dev.vue')
};
const arr = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登入'
    },
    component: () => import('@/CUSTOMER/pages/login/index.vue')
  },
  {
    path: '/',
    component: () => import('@/CUSTOMER/layout/index.vue'),
    children: [
      {
        path: '/user',
        name: 'user',
        props: true,
        component: () => import('@/CUSTOMER/pages/user/lists.vue'),
        meta: {
          title: '帳號',
          url: 'user',
          breadcrumb: [{ label: '帳號', href: '/user' }]
        }
      },
      {
        path: '/user/create',
        name: 'user-create',
        props: true,
        component: () => import('@/CUSTOMER/pages/user/create.vue'),
        meta: {
          title: '帳號',
          url: 'user',
          breadcrumb: [{ label: '帳號', href: '/user' }]
        }
      },
      {
        path: '/user/:id',
        name: 'user-info',
        props: true,
        component: () => import('@/CUSTOMER/pages/user/info.vue'),
        meta: {
          title: '帳號',
          url: 'user',
          breadcrumb: [{ label: '帳號', href: '/account' }]
        }
      }
    ]
  }
] as RouteRecordRaw[];

if (isDev) arr.push(dev);

export default arr;
