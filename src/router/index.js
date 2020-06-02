import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/views/login')
    },
    {
      path: '/linker',
      name: 'Linker',
      component: () => import('@/layout/index'),
      redirect: {name: 'Home'},
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/views/home')
        },
        {
          path: '/search',
          name: 'Search',
          component: () => import('@/views/search')
        },
        {
          path: '/toSearch',
          name: 'ToSearch',
          component: () => import('@/views/search/toSearch')
        },
        {
          path: '/deviceInfo',
          name: 'DeviceInfo',
          component: () => import('@/views/device/DeviceInfo')
        },
        {
          path: '/device',
          name: 'Device',
          component: () => import('@/views/device')
        },
        {
          path: '/chooseDevice',
          name: 'ChooseDevice',
          component: () => import('@/views/device/DeviceList')
        },
        {
          path: '/warn',
          name: 'Warn',
          component: () => import('@/views/warn')
        },
        {
          path: '/warnList',
          name: 'WarnList',
          component: () => import('@/views/warn/WarnList')
        }
      ]
    }
  ]
})
