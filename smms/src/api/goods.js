import request from '@/utils/request';

/* 商品添加 */
export function goodsadd(params) {
    return request.post('/goods/goodsadd',params)
}
/* 批量删除 */
export function goodsbatchdelete(params) {
    return request.get('/goods/batchdelete',params)
}
/* 编辑 */
export function goodsedit(params) {
    return request.get('/goods/goodsedit',params)
}
/* 删除 */
export function goodsdel(params) {
    return request.get('/goods/goodsdel',params)
}
/* 保存修改 */
export function saveedit(params) {
    return request.post('/goods/saveedit',params)
}
/* 分页请求数据 */
export function getDataByPage(params) {
    return request.get('/goods/goodslistbypage',params)
}
/* 搜索查询 */
/* export function goodssearch(params) {
    return request.get('/goods/goodssearch',params)
}
 */
