var express = require('express');
var router = express.Router();

/*--- 验证token --- 开始 */
const expressJwt = require('express-jwt');
const secret = 'itsource';
router.use(expressJwt({
	secret
}).unless({
	path: ['/login1/checklogin']  //除了这些地址，其他的URL都需要验证
}));
router.use(function (err, req, res, next) {
	//当token验证失败时会抛出如下错误
	if (err.name === 'UnauthorizedError') {
		//这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
		res.status(401).send('invalid token...');
	}
})
/*--- 验证token -- 结束 ---

/* 设置统一的响应头 */
router.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'authorization') // 允许携带的头
	next();
});
// 引入数据库连接模块
const connection = require('./js/coon')
//测试路由
/* router.get('/', (req, res, next) => {
	res.send('测试账号管理的模块！')
}) */

//添加账号路由
router.post('/accountadd', (req, res) => {
	// 接收参数
	let { account, password, userGroup } = req.body;
// 默认头像
let photoUrl = `/upload/photoUrl.jpg`;
	// 准备sql
	const sqlStr = `insert into accounts(account, password, userGroup) values('${account}', '${password}', '${userGroup}')`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		console.log(data)
		// 判断
		if (data.affectedRows > 0) {
			res.send({ code: 0, reason: '添加账号成功' }) // 响应成功的数据给前端
		} else {
			res.send({ code: 1, reason: '添加账号失败' }) // 响应失败的数据给前端
		}
	})
})


//单挑删除
router.get('/accountdel', (req, res) => {
	//接收参数id
	let { id } = req.query;
	//准备sql语句
	const sqlStr = `delete from accounts where id=${id}`;
	/* console.log(sqlStr);
	 */
	//执行sql语句
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		/* console.log(data);
		res.send('通了');
		 */
		//判断
		if (data.affectedRows > 0) {
			//成功
			res.send({ code: 0, reason: '删除成功' })
		} else {
			//失败
			res.send({ code: 1, reason: '删除失败' })
		}
	})
	//res.send('通了')
})

//编辑数据回填 
router.get('/accountedit', (req, res) => {
	// 接收id
	let { id } = req.query;

	// 准备sql
	const sqlStr = `select * from accounts where id=${id}`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send({ data }) // 响应数据给前端
	})
})

// 保存修改请求 
router.post('/saveedit', (req, res) => {
	// 接收新数据 和 老id
	let { account, userGroup, id } = req.body;

	// 准备sql
	const sqlStr = `update accounts set account='${account}', userGroup='${userGroup}' where id=${id}`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// 判断
		if (data.affectedRows > 0) {
			res.send({ code: 0, reason: '修改成功' })//成功
		} else {
			res.send({ code: 1, reason: '修改失败' })//失败
		}
	})
})


/* 批量删除 */
router.get('/batchdelete', (req, res) => {
	// 接收id们
	let { idArr } = req.query;

	// 准备sql
	const sqlStr = `delete from accounts where id in (${idArr})`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		if (data.affectedRows > 0) {
			res.send({ code: 0, reason: '批量删除成功' }) // 响应成功数据
		} else {
			res.send({ code: 1, reason: '批量删除失败' }) // 响应失败数据
		}
	})
})

/* 按照分页请求数据 */
router.get('/accountlistbypage', (req, res) => {
	// 接收参数
	let { pageSize, currentPage } = req.query;

	// 定义变量 保存数据总条数据
	let total;

	// 准备sql
	let sqlStr = `select * from accounts order by ctime desc`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		total = data.length; // 获取数据总条数
	})

	// 构造sql 按照分页查询数据
	let n = (currentPage - 1) * pageSize; // 跳过多少条
	sqlStr += ` limit ${n}, ${pageSize}`; // 分页的sql

	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send({ total, data })  // 把中数据条数 和 当前页码对应的数据响应给前端
	})
})

/* 验证旧密码是否正确 */
router.post('/checkOldPass', (req, res) => {
	// 接收旧密码
	let { oldPwd } = req.body;
	console.log(oldPwd);

	// 验证是否正确
	if (oldPwd === req.user.password) {
		res.send({ code: 0, reason: '原密码正确' })
	} else {
		res.send({ code: 1, reason: '旧密码错误' })
	}
})

/* 修改密码 */
router.post('/changePassword', (req, res) => {
	// 接收新密码
	let { newPassword } = req.body;
	// 取出id
	let id = req.user.id;

	// 构造sql
	const sqlStr = `update accounts set password='${newPassword}' where id=${id}`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		if (data.affectedRows > 0) {
			res.send({ code: 0, reason: '密码修改成功！请重新登录!' })
		} else {
			res.send({ code: 1, reason: '密码修改失败！哈哈!' })
		}
	})
})

/* 同步账号信息 */
router.get('/info', (req, res) => {
	//接收id
	let id = req.user.id
	//准备sql
	const sqlStr = `select * from accounts where id=${id}`
	//执行
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send({ data })
	})

})

/* 头像上传 */


module.exports = router;
