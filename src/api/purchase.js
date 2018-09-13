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

export function fetchSupplierList(query) {
  return request({
    url: '/supplier/list2',
    method: 'get',
    params: query
  })
}

export function fetchProductList(id) {
  return request({
    url: '/supplier/' + id + '/product/list',
    method: 'get'
  })
}

export function fetchPurchase(id) {
  return request({
    url: '/purchase/list/' + id,
    method: 'get'
  })
}
