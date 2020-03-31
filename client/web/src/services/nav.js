import request from '@/utils/request'

export function fetchNavs() {
  return request({
    url: '/fetchNav',
    method: 'get'
  })
}
