/* 
工具函数
*/
//验证密码
export function pwdReg(value) {
    const reg=/^[A-Za-z0-9]+$/;//正则
    return reg.test( value );
}
