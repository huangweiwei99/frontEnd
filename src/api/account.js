import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'account/users',
    method: 'get',
    params: query
  })
}

export function createAccount(data) {
  return request({
    url: 'account/users',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: 'account/users/' + data.id,
    method: 'put',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: 'account/users/' + data.id,
    method: 'delete'
  })
}
