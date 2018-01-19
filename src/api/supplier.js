import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/supplier/list',
    method: 'get',
    params: query
  })
}

export function createSupplier(data) {
  return request({
    url: '/supplier/create',
    method: 'post',
    data
  })
}

export function updateSupplier(data) {
  return request({
    url: '/supplier/update',
    method: 'post',
    data
  })
}
