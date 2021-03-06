import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ "../views/Home.vue")
  },
  {
    path: "/detalles",
    name: "DetallesOrden",
    component: () => import(/* webpackChunkName: "VistaOrden" */ "../views/VistaOrden.vue")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
