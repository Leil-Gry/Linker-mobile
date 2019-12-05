// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import axios from 'axios'
import * as filters from './filters'
Vue.prototype.$echarts = echarts
// Vue.use(axios)
Vue.prototype.$http = axios
Vue.config.productionTip = false

// axios.defaults.baseURL = '/api'
axios.defaults.baseURL = 'https://api.qiaolian.co/api/v1.dev'

/**
 * @interceptors.request
 * @ 添加公共的请求头文件 做授权使用  这里是将所有的请求信息拦截掉，之后将最新的授权信息加到请求头里面
 */
axios.interceptors.request.use((request) => {
  request.headers.common['Authorization'] = localStorage.getItem('Authorization')

  return request
})
/**
* @interceptors.response
* @ 统一处理请求返回数据，根据返回的数据判断用户是不是已授权，如果是已授权的话，那就直接可以拿到授权信息，将最新的授权信息给到本地存储里面。
*/
axios.interceptors.response.use((response) => {
  return response
}, (err) => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break

      case 401:
        err.message = '未授权，请登录'
        router.replace('/')
        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break

      case 408:
        err.message = '请求超时'
        break

      case 500:
        err.message = '服务器内部错误'
        break

      case 501:
        err.message = '服务未实现'
        break

      case 502:
        err.message = '网关错误'
        break

      case 503:
        err.message = '服务不可用'
        break

      case 504:
        err.message = '网关超时'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break

      default:
    }
  }
  return Promise.reject(err)
})

Object.keys(filters).forEach(filterName => {
  Vue.filter(filterName, filters[filterName])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
