/* 
连接数据库的模块
*/
//引入mysql
const mysql = require('mysql')
//创建连接对象
const connection = mysql.createConnection({
    host: 'localhost', // 数据库地址
    user: 'root', // 用户名
    password: 'root', // 密码
    database: 'smms' // 数据库名
})
//执行连接方法
connection.connect()
console.log('数据库连接成功');
//暴露连接对象
module.exports = connection;

