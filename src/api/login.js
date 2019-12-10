import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: 'admin/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: 'admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function getUserInfo(token) {
  return request({
    url: 'admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'admin/user/logout',
    method: 'post'
  })
}
