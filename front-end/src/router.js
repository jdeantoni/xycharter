import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        {
          name: 'ViewGraph',
          path: '/graph',
          component: () => import('@/views/dashboard/ViewGraph'),
        },
        {
          name: 'CreateLineGraph',
          path: '/line',
          component: () => import('@/views/dashboard/CreateLine'),
        }
      ],
    },
  ],
})
