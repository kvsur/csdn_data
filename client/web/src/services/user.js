import request from '@/utils/request'

export function fetchFollows(data) {
  return request({
    url: '/fetchFollows',
    method: 'post',
    data
  })
}
export function fetchFans(data) {
  return request({
    url: '/fetchFans',
    method: 'post',
    data
  })
}
export function doFollow(data) {
  return request({
    url: '/doFollow',
    method: 'post',
    data
  })
}
export function unFollow(data) {
  return request({
    url: '/unFollow',
    method: 'post',
    data
  })
}
export function batchFollow(data) {
  return request({
    url: '/batchFollow',
    method: 'post',
    data
  })
}
export function batchUnFollow(data) {
  return request({
    url: '/batchUnFollow',
    method: 'post',
    data
  })
}
export function fetchUserInfo(data) {
  return request({
    url: '/fetchUserInfo',
    method: 'post',
    data
  })
}
