import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import Inicio from '../pages/Inicio.vue'
import Destinos from '../pages/Destinos.vue'
import DestinoDetalle from '../pages/DestinoDetalle.vue'
import Carrito from '../pages/Carrito.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Inicio', component: Inicio },
  { path: '/destinos', name: 'Destinos', component: Destinos },
  { path: '/destinos/:id', name: 'DestinoDetalle', component: DestinoDetalle },
  { path: '/carrito', name: 'Carrito', component: Carrito },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
