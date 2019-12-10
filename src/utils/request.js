/* eslint-disable indent */
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

axios.defaults.withCredentials = false

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    // timeout: 15000 // 请求超时时间
    timeout: 100000
})

// https://blog.csdn.net/weixin_38641550/article/details/84940663
// axios 封装带请求频繁取消上一次请求

const pending = []
const CancelToken = axios.CancelToken

const cancelPending = (config) => {
        pending.forEach((item, index) => {
            if (config) {
                if (item.UrlPath === config.url) {
                    item.Cancel() // 取消请求
                    pending.splice(index, 1) // 移除当前请求记录
                }
            } else {
                item.Cancel() // 取消请求
                pending.splice(index, 1) // 移除当前请求记录
            }
        })
    }
    // request拦截器
service.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    cancelPending(config)
    config.cancelToken = new CancelToken(res => {
        pending.push({ 'UrlPath': config.url, 'Cancel': res })
    })

    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        cancelPending(response.config)
            /**
             * code为非20000是抛错 可结合自己业务进行修改
             */
            // console.log(response.data)
        const res = response.data
        if (res.code !== 200) {
            alert(res.data)
            Message({
                message: res.data, // typeof res.data === 'undefined' ? '超时 ' : res.data,
                type: 'error',
                duration: 5 * 1000
            })

            // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                })
            }
            console.log(Promise.reject('error'))
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: '出错', // error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
