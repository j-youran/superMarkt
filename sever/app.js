var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//引入模块
var accountRouter = require('./routes/account');//账号管理模块
var goodsRouter = require('./routes/goods');//商品管理模块
var loginRouter = require('./routes/login');//登陆模块

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/* 验证express-jet模块，用于验证token合法性 */
const expressJwt = require('express-jwt');
//定义秘钥
const secret = 'itsource';

// 验证token合法性（检查用户携带的token是否正确）
app.use(expressJwt({
  secret
}).unless({
  path: ['/login/checklogin']  // 不需要验证的url
}))

// 如果token不正确，就会抛出错误，如果错误的名字是“UnauthorizedError” 可以断定就是token无效的错误
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {

    // token无效 就给前端浏览器响应401状态码 且响应错误提示信息 
    res.status(401).send('无效的token，前端发送的请求，必须在请求头上携带token，才能拿到数据哦！');
  }
})

/* --- 验证token合法性结尾 ---- */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//配置模块
app.use('/account', accountRouter);
app.use('/goods', goodsRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//监听端口
app.listen(5920, () => {
  console.log('服务器启动成功！地址为：http://127.0.0.1:5920')
})
module.exports = app;
