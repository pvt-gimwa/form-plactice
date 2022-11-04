import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: HomeView,
    children: [
      {
        path: '/',
        name: 'form',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/FormView.vue'),
        props: true, // propsを追加
        meta: {
          isForm: true
        }
      },
      {
        path: '/confirm',
        name: 'confirm',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/ConfirmView.vue'),
        props: true, // propsを追加
        meta: {
          isConfirm: true
        }
      },
      {
        path: '/completed',
        name: 'completed',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/CompletedView.vue'),
        props: true, // propsを追加
        meta: {
          isCompleted: true
        }
      }    
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
