var express = require('express');
var router = express.Router();

//引入连接模块
const connection = require('./js/coon')
/* 设置统一的响应头 */
router.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'authorization') // 允许携带的头
	next();
});

//测试路由
/* router.post('/add', (req, res) => {
    res.send('测试数据')
}) */

//添加商品
router.post('/goodsadd', (req, res) => {
	//接收参数
	let { barCode, goodsName, classify, price, purchasingPrice, repertory } = req.body;
	//准备sql


	const sqlStr = `insert into goods(barCode,goodsName,classify,price,purchasingPrice,repertory) values('${barCode}','${goodsName}', '${classify}', '${price}', '${purchasingPrice}', '${repertory}')`;
	//执行sql
	console.log(sqlStr);
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		console.log(data);
		//判断 
		if (data.affectedRows > 0) {
			res.send({ code: 0, reason: '添加商品成功' }) // 响应成功的数据给前端
		} else {
			res.send({ code: 1, reason: '添加商品失败' }) // 响应失败的数据给前端
		}
	});
})

//商品分页列表
router.get('/goodslistbypage', (req, res) => {
	// 接收参数
	let { pageSize, currentPage, classify, keyword } = req.query;

	// 定义变量 保存数据总条数据
	let total;
	// 构造sql
	let sqlStr = `select * from goods where 1=1`;

	// 如果分类不等于空 且 不等于全部
	if (classify !== '' && classify !== '全部分类') {
		// 拼接第一个查询条件
		sqlStr += ` and classify='${classify}'`;
	}

	// 如果第二个关键字不为空 那么就拼接sql
	if (keyword !== '') {
		sqlStr += ` and (goodsName like '%${keyword}%' or barCode like '%${keyword}%')`
	}
	// 准备sql,拼接排序
	sqlStr += ` order by id desc`;
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

//单条删除
router.get('/goodsdel', (req, res) => {
	//接收参数id
	let { id } = req.query;
	//准备sql语句
	const sqlStr = `delete from goods where id=${id}`;
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
router.get('/goodsedit', (req, res) => {
	// 接收id
	let { id } = req.query;
	// 准备sql
	const sqlStr = `select * from goods where id=${id}`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send({ data }) // 响应数据给前端
	})
})

// 保存修改请求 
router.post('/saveedit', (req, res) => {
	// 接收新数据 和 老id
	let { goodsName, price, id } = req.body;

	// 准备sql
	const sqlStr = `update goods set goodsName='${goodsName}', price='${price}' where id=${id}`;
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
	const sqlStr = `delete from goods where id in (${idArr})`;
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

/* 搜索 */
/* router.get('/goodssearch', (req, res) => {
	// 接收查询参数
	let { classify, keyWord } = req.query;

	// 构造sql
	let sqlStr = `select * from goods where 1=1`;

	// 如果分类不等于空 且 不等于全部
	if (classify !== '' && classify !== '全部分类') {
		// 拼接第一个查询条件
		sqlStr += ` and classify='${classify}'`;
	}

	// 如果第二个关键字不为空 那么就拼接sql
	if (keyWord !== '') {
		sqlStr += ` and (goodsName like '%${keyWord}%' or barCode like '%${keyWord}%')`
	}

	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send({ data }) // 把查询结果响应给前端浏览器
	})
})

 */
/* 报表 */
router.get('/selldata', (req, res) => {
	res.send({
		category: ['19-06-30', '19-07-1', '19-07-2', '19-07-03', '19-07-04', '19-07-05', '19-07-06'],
		value:  [1000, 1500, 8001, 2434, 2000, 1330, 3300]
	})
})

module.exports = router;