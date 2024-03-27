import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import GameView from '../views/GameView.vue'
  import Rankings from '../components/game/Rankings.vue'
  import Characters from '../components/game/Characters.vue'
  import Dungeonforge from '../components/game/Dungeonforge.vue'
  import Adventure from '../components/game/Adventure.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/game',
      name: 'game',
      component: GameView,
      children: [
        {
          path: 'rankings',
          name: 'rankings',
          component: () => import('../components/game/Rankings.vue')
        },
        {
          path: 'characters',
          name: 'characters',
          component: () => import('../components/game/Characters.vue')
        },
        {
          path: 'dungeonforge',
          name: 'dungeonforge',
          component: () => import('../components/game/Dungeonforge.vue')
        },
        {
          path: 'adventure',
          name: 'adventure',
          component: () => import('../components/game/Adventure.vue')
        }
      ]
    },
  ]
})

export default router
