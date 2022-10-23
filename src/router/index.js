import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pokemon/:name',
    name: 'pokemon',
    component: () => import(/* webpackChunkName: "about" */ '../views/PokemonView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
