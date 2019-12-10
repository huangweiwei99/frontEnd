import request from '@/utils/request'

export function fetchSettings() {
  return request({
    url: 'system/settings',
    method: 'get'
  })
}

export function updateSettings(data) {
  return request({
    url: 'system/settings',
    method: 'put',
    data
  })
}
