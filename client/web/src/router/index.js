import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/routes/layout'),
      redirect: '/column',
      children: [
        {
          path: 'column',
          name: 'column',
          component: () => import('@/routes/column')
        },
        {
          path: 'so',
          name: 'so',
          component: () => import('@/routes/so')
        },
        {
          path: 'follows',
          name: 'follows',
          component: () => import('@/routes/follow')
        },
        {
          path: 'fans',
          name: 'fans',
          component: () => import('@/routes/fan')
        },
        {
          path: 'cookie',
          name: 'cookie',
          component: () => import('@/routes/cookie.vue')
        },
      ]
    }
  ]
})
