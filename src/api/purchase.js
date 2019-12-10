import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'wms/purchase',
    method: 'get',
    params: query
  })
}

export function createPurchase(data) {
  // console.log(data)
  return request({
    url: 'wms/purchase',
    method: 'post',
    data
  })
}

export function updatePurchase(data) {
  return request({
    url: 'wms/purchase/' + data.id,
    method: 'put',
    data
  })
}

export function deletePurchase(data) {
  return request({
    url: 'wms/purchase/' + data.id,
    method: 'delete'
  })
}

export function fetchSupplierList() {
  return request({
    url: 'wms/suppliers?limit=1000',
    method: 'get'
  })
}

export function fetchProductList(data) {
  var url = ''
  if ((typeof data.purchase_id !== 'undefined') && (typeof data.supplier_id !== 'undefined') && (typeof data.product_id === 'undefined')) {
    url = 'wms/purchase/' + data.purchase_id + '/suppliers/' + data.supplier_id + '/products'
  } else if ((typeof data.purchase_id !== 'undefined') && (typeof data.supplier_id === 'undefined') && (typeof data.product_id === 'undefined')) {
    url = 'wms/purchase/' + data.purchase_id + '/suppliers/products'
  } else if ((typeof data.purchase_id !== 'undefined') && (typeof data.supplier_id !== 'undefined') && (typeof data.product_id !== 'undefined')) {
    url = 'wms/purchase/' + data.purchase_id + '/suppliers/' + data.supplier_id + '/products/' + data.product_id
  } else if ((typeof data.supplier_id !== 'undefined') && (typeof data.product_id === 'undefined')) {
    url = 'wms/purchase/suppliers/' + data.supplier_id + '/products'
  } else if ((typeof data.supplier_id !== 'undefined') && (typeof data.product_id !== 'undefined')) {
    url = 'wms/purchase/suppliers/' + data.supplier_id + '/products/' + data.product_id
  }
  return request({
    url: url,
    method: 'get'
  })
}

export function fetchPurchase(data) {
  return request({
    url: 'wms/purchase/' + data.id,
    method: 'get'
  })
}
