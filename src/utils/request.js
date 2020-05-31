import axios from 'axios'
import { getToken } from '@/utils/user'
import { Notify } from 'vant'
// create an axios instance
const service = axios.create({
  baseURL: 'https://api.qiaolian.co/api/v1.dev', // 后端url，自行修改
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Authorization'] = getToken()
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (response.status !== 200) {
      console.log(res)
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log(error.response.status)
    switch (error.response.status) {
      case 400:
        Notify({type: 'warning', message: '请求错误'})
        break

      case 401:
        Notify({type: 'warning', message: '账号或密码错误'})
        this.$router.replace('/')
        break

      case 429:
        Notify({type: 'warning', message: '请求过于频繁，请稍候再试！'})
        break

      case 403:
        Notify({type: 'warning', message: '拒绝访问'})
        break

      case 404:
        Notify({type: 'warning', message: '404 not found'})
        break

      case 408:
        Notify({type: 'warning', message: '请求超时'})
        break

      case 500:
        Notify({type: 'warning', message: '服务器内部错误'})
        break

      case 501:
        Notify({type: 'warning', message: '服务未实现'})
        break

      case 502:
        Notify({type: 'warning', message: '网关错误'})
        break

      case 503:
        Notify({type: 'warning', message: '服务不可用'})
        break

      case 504:
        Notify({type: 'warning', message: '网关超时'})
        break

      case 505:
        Notify({type: 'warning', message: 'HTTP版本不受支持'})
        break

      default:
    }
    return Promise.reject(error)
  }
)

export default service
