// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: ()=> import('@/views/Register.vue')
  },
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/add-transaction',
    name: 'Add Transaksi',
    component: () => import('@/views/AddTransaction.vue')
  },
  {
    path: '/account',
    name: 'Rekening',
    component: () => import('@/views/Account.vue')
  },
  {
    path: '/add-account',
    name: 'Add Rekening',
    component: () => import('@/views/AddAccount.vue')
  },
  {
    path: '/rekap',
    name: 'Rekap',
    component: () => import('@/views/Rekap.vue')
  },
  {
    path: '/category',
    name: 'Kategori',
    component: () => import('@/views/Category.vue')
  },
  {
    path: '/add-category',
    name: 'Add Form Kategori',
    component: () => import('@/views/AddCategory.vue')
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('@/views/Menu.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path === '/' && !sessionStorage.access_token) next({ name: 'login' })
  else next()
})

export default router
