import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Stack Demo' },
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import('@/views/FormDemoView.vue'),
    meta: { title: 'Form Demo' },
  },
  {
    path: '/backend',
    name: 'Backend',
    component: () => import('@/views/BackendDemoView.vue'),
    meta: { title: 'Backend Demo' },
  },
  {
    path: '/firestore',
    name: 'Firestore',
    component: () => import('@/views/FirestoreDemoView.vue'),
    meta: { title: 'Firestore Demo' },
  },
]
