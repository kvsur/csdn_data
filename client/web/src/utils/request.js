import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'

const service = axios.create({
  baseURL: process.env.BASE_API, // url = base url + request url
  timeout: 20 * 1000, // request timeout
  transformRequest: [function(data) {
    if(data instanceof FormData) {
      return data
    } else {
      return qs.stringify(data)
    }
  }]
})

service.interceptors.request.use(
  config => {
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers.CSDN_COOKIE = (document.cookie.split('csdn_cookie=')[1] || '').split('_#_').join(';')
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 3 * 1000
      })
      window.dispatchEvent(new Event('update-cookie'))
    }
    return res
  },
  error => {
    window.dispatchEvent(new Event('update-cookie'))
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
