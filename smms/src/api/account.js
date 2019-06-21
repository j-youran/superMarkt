import request from '@/utils/request';

/* 账号添加 */
export function accountadd(params) {
    return request.post('/account/accountadd',params)
}
/* 批量删除 */
export function accountbatchdelete(params) {
    return request.get('/account/batchdelete',params)
}
/* 编辑 */
export function accountedit(params) {
    return request.get('/account/accountedit',params)
}
/* 删除 */
export function accountdel(params) {
    return request.get('/account/accountdel',params)
}
/* 保存修改 */
export function saveedit(params) {
    return request.post('/account/saveedit',params)
}
/* 分页请求数据 */
export function accountlistbypage(params) {
    return request.get('/account/accountlistbypage',params)
}
/* 验证旧密码是否正确 */
export function checkOldPass(params) {
    return request.post('/account/checkOldPass', params)
 }
 
 /* 修改密码 */ 
 export function changePassword(params) {
     return request.post('/account/changePassword', params)
 }
 
 /* 获取当前登录的用户信息 */
 export function getInfo () {
     return  request.get('/account/info')
 }
 
 /* 菜单权限 */
 export function getRole () {
     return  request.get('/account/role')
 }
 
