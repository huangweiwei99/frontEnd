import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'wms/suppliers',
    method: 'get',
    params: query
  })
}

export function createSupplier(data) {
  return request({
    url: 'wms/suppliers',
    method: 'post',
    data
  })
}

export function updateSupplier(data) {
  return request({
    url: 'wms/suppliers/' + data.id,
    method: 'put',
    data
  })
}

export function deleteSupplier(data) {
  return request({
    url: 'wms/suppliers/' + data.id,
    method: 'delete'
  })
}

export function getSupplier(data) {
  return request({
    url: 'wms/suppliers/' + data.id,
    method: 'get',
    data
  })
}
