import request from '@/utils/request';//引入utils中的request

/* 登陆 */
export function login(params) {
    return request.post('/login/checklogin', params)
}