import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/index'
import Dashboard from '@/pages/Dashboard'
import ToSearch from '@/pages/mainBody/search/toSearch/index'
import Home from '@/pages/mainBody/home/index'
import Search from '@/pages/mainBody/search/index'
import Warn from '@/pages/mainBody/warn/index'
import WarnList from '@/pages/mainBody/warn/warnList/index'
import Device from '@/pages/mainBody/search/device/index'
import DeviceList from '@/pages/mainBody/home/deviceList/index'
import DeviceDetail from '@/pages/mainBody/home/deviceDetail/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/search',
          name: 'Search',
          component: Search
        },
        {
          path: '/toSearch',
          name: 'ToSearch',
          component: ToSearch
        },
        {
          path: '/deviceList',
          name: 'DeviceList',
          component: DeviceList
        },
        {
          path: '/deviceDetail',
          name: 'DeviceDetail',
          component: DeviceDetail
        },
        {
          path: '/device',
          name: 'Device',
          component: Device
        },
        {
          path: '/warn',
          name: 'Warn',
          component: Warn
        },
        {
          path: '/warnList',
          name: 'WarnList',
          component: WarnList
        }
      ]
    }
  ]
})
