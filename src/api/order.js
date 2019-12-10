import request from '@/utils/request'
// import axios from 'axios'

export function fetchList(query) {
  //   var CancelToken = axios.CancelToken
  //   var source = CancelToken.source()
  //   var a = axios.get('wms/orders', {
  //     cancelToken: source.token
  //   }).catch(function(thrown) {
  //     if (axios.isCancel(thrown)) {
  //       console.log('Request canceled', thrown.message)
  //     } else {
  //       // handle error
  //     }
  //   })

  //   // cancel the request (the message parameter is optional)
  //   source.cancel('Operation canceled by the userz.')
  //   return a
  return request({
    url: 'wms/orders',
    method: 'get',
    params: query
  })
}

export function fetchPrecentage(data) {
  return request({
    // url: 'http://localhost:8888/testPush4/testPush3.php',
    url: 'wms/orders/sync?date_range=' + data.dateRange + '&account=' + data.account + '&platform=' + data.platform,
    timeout: 100000,
    method: 'get'
  })
}

export function updateOrder(data) {
  return request({
    url: 'wms/orders/' + data.id,
    method: 'put',
    data
  })
}

export function fetchExpress(data) {
  return request({
    url: 'wms/orders/express',
    method: 'get'
  })
}
