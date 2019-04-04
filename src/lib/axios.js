import axios from 'axios'
import {
  httpErrorMessage
} from '../config'

const CancelToken = axios.CancelToken
const requests = {}
// 通过判断请求参数中有无cancelToken字段，去取消重复的请求
const cancelTokenHandler = ({ data, url, method }) => {
  if (data && data.cancelToken) {
    let k = `${method}_${url}`
    requests[k] && requests[k]()
    return new CancelToken(c => {
      requests[k] = c
    })
  }
}
axios.install = (Vue, { store, router }) => {
  axios.interceptors.request.use(config => {
    config.cancelToken = cancelTokenHandler(config)
    // 请求统一添加token参数
    config.headers['X-CSRF-TOKEN'] = store.getters.token
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    return config
  })

  axios.interceptors.response.use(response => {
    // 所有接口返回数据的success字段为false时，直接reject
    if (response.data.success === false) {
      return Promise.reject(response.data)
    }
    // alert('服务器链接异常，请稍后重试!')
    return response
  }, error => {
    if (error && error.response) {
      const { status, config } = error.response
      const message = httpErrorMessage[status]
      error.message = status === 404 ? `${message}:${config.url}` : message
      /**
                 * 419状态表示登录已失效，需要返回登录页面重新登录
                 * 同时清除掉storage中已过期的token
                 */
      const redirect = router.currentRoute.path
      if (/^4\d{2}/.test(status) && status !== 404 && !redirect.includes('login')) {
        localStorage.removeItem('token')
        localStorage.removeItem('token-admin')
        router.push({ path: '/login', query: { redirect } })
      }
    }
    return Promise.reject(error)
  })

  if (process.env.NODE_ENV !== 'production') {
    axios.defaults.baseURL = process.env.VUE_APP_MOCK === 'mock' ? process.env.VUE_APP_MOCK_URL || '/mock' : process.env.VUE_APP_BASE_URL || ''
  }

  axios.defaults.withCredentials = true

  const axiosGet = axios.get

  // 包装get方法，使其参数传递方式与post请求一致
  axios.get = (url, params, options = {}) =>
    axiosGet(url, { params, ...options })

  Vue.prototype.$http = Vue.prototype.axios = axios
}

export default axios
