import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../view/Home.vue'
import RegisterView from '../view/Register.vue'
import LoginView from '../view/Login.vue'
import ShoutsView from '../view/Shouts.vue'
import ProfileView from '../view/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user',
      name: 'user',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../view/About.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/shouts',
      name: 'shouts',
      component: ShoutsView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
  ]
})

export default router
