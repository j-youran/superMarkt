var express = require('express');
var router = express.Router();

/*--- 验证token --- 开始 */ 
/* const expressJwt = require('express-jwt');
const secret = 'itsource';
router.use(expressJwt ({
    secret 
}).unless({
    path: ['/login/checklogin']  //除了这些地址，其他的URL都需要验证
}));
router.use(function (err, req, res, next) {
    //当token验证失败时会抛出如下错误
    if (err.name === 'UnauthorizedError') {   
        //这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
        res.status(401).send('invalid token...');
    }
})
/*---  验证token -- 结束 ---*/ 

//引入连接模块
const connection = require('./js/coon')
//引入jwt
const jwt= require('jsonwebtoken');
// 定义秘钥
const secret = 'itsource';

/* 设置统一的响应头 */
router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'authorization') // 允许携带的头
    next();
});

//检查账号和密码是否正确
router.post('/checklogin', (req, res) => {
    //接收参数
    let { account, password } = req.body;
    //准备sql
    const sqlStr = `select * from accounts where account='${account}' and password='${password}'`
    //console.log(sqlStr);
    //执行sql
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        //判断
        if (data.length) {//成功
            //生成token
            const token = jwt.sign(Object.assign({}, data[0]), secret, {
                expiresIn: 60 * 60 * 2//过期时间2小时
            })
            res.send({ code: 0, reason: '欢迎您，登陆成功！',token})
        } else {
            res.send({ code: 1, reason: '请检查用户名或密码!'})
        };
    })


})


module.exports = router;