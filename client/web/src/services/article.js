import request from '@/utils/request'

export function fetchFirstPage(data) {
  return request({
    url: '/fetchFirstArticle',
    method: 'post',
    data
  })
}

export function fetchNavData(data) {
  return request({
    url: '/fetchNavArticle',
    method: 'post',
    data
  })
}

export function fetchColumnData(data) {
  return request({
    url: '/fetchColumnArticle',
    method: 'post',
    data
  })
}

export function doSearch(data) {
  return request({
    url: '/doSo',
    method: 'post',
    data
  })
}
