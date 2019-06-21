import axios from 'axios';//引入axios
import qs from 'qs';//引入qs
import { resolve, reject } from 'any-promise';
import local from '@/utils/local'// 引入本地存储封装

axios.defaults.baseURL = 'http://127.0.0.1:5920'//设置后端端口号
/* 
请求拦截器
*/
axios.interceptors.request.use(config => {
    //获取token
    let token = local.get('gd_token');
    //给头部携带token 
    config.headers.authorization = `Bearer ${token}`
    return config
})

//封装get/post请求
export default {
    //get方式
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, { params })
                .then(response => {
                    resolve(response.data);//成功
                })
                .catch(err => {
                    reject(err);//失败
                })
        })
    },
    //post方式
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params))
                .then(response => {
                    resolve(response.data);//成功
                })
                .catch(err => {
                    reject(err);//失败
                })
        })
    }
}