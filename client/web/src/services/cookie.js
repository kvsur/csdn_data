import request from '@/utils/request'

export function udpateCookie() {
  return request({
    url: '/updateGlobalCookie',
    method: 'post'
  })
}
