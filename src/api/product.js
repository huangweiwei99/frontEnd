import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'wms/products',
    method: 'get',
    params: query
  })
}

export function createProduct(data) {
  return request({
    url: 'wms/products',
    method: 'post',
    data
    // data: data.images
  })
}

export function updateProduct(data) {
  return request({
    url: 'wms/products/' + data.id,
    method: 'put',
    data
  })
}

export function getProduct(data) {
  return request({
    url: 'wms/products/' + data.id,
    method: 'get',
    data
  })
}
export function saveImageByProductId(data) {
  return request({
    url: 'wms/products/' + data.get('id') + '/images',
    method: 'post',
    data
  })
}

export function deleteProduct(data) {
  return request({
    url: 'wms/products/' + data.id,
    method: 'delete'
  })
}

export function deleteProductImagebyImageId(data) {
  return request({
    url: 'wms/products/' + data.id + '/images/' + data.imageid,
    method: 'delete'
  })
}
export function fetchSupplierList() {
  return request({
    url: 'wms/suppliers',
    method: 'get'
  })
}
export function fetchArticle() {
  return request({
    url: '/product/detail',
    method: 'get'
  })
}

// export function fetchPv(pv) {
//   return request({
//     url: '/product/pv',
//     method: 'get',
//     params: { pv }
//   })
// }
