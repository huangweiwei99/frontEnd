import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/purchase/list',
    method: 'get',
    params: query
  })
}

export function createPurchase(data) {
  return request({
    url: '/purchase/create',
    method: 'post',
    data
  })
}

export function updatePurchase(data) {
  return request({
    url: '/purchase/update',
    method: 'post',
    data
  })
}
