import request from '@/utils/request'

export function fetchStatistic() {
  return request({
    url: 'wms/dashboard',
    method: 'get'
  })
}
