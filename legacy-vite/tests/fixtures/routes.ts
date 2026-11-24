import type { RouteRecordRaw } from 'vue-router'

const stub = { template: '<div />' }

export const testRoutes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: stub, meta: { nav: true } },
  { path: '/projects', name: 'projects', component: stub, meta: { nav: true } },
  { path: '/projects/:slug', name: 'project', component: stub },
  { path: '/about', name: 'about', component: stub, meta: { nav: true } },
  { path: '/contact', name: 'contact', component: stub, meta: { nav: true } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: stub },
]
