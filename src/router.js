import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/WeekEnd.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {path: '/',name: 'Home',component: () => import('./views/soul.vue')},
      {path: '/Monday',name: 'Monday',component: () => import('./views/soul.vue')},
      {path: '/Tuesday',name: 'Tuesday',component: () => import('./views/people.vue')},
      {path: '/Wednesday',name: 'Wednesday',component: () => import('./views/concant.vue')},
  ]
})
