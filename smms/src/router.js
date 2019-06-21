import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:'/login1'
    },
    {
      path: '/login1',
      component: () => import('./views/Login1/Login1.vue')
    },
    {
      //后端父组件home
      path: '/home1',
      component: () => import('./views/Home1/Home1.vue'),
      redirect:'/home1/accountmanage1',
      //home下子组件
      children:[
        { // 账号管理
          path: '/home1/accountmanage1',
          component: () => import('./views/AccountManage1/AccountManage1.vue')
        },
        { // 添加账号
          path: '/home1/accountadd1',
          component: () => import('./views/AccountAdd1/AccountAdd1.vue')
        },
        { // 密码修改
          path: '/home1/passwordmodify1',
          component: () => import('./views/PasswordModify1/PasswordModify1.vue')
        },
        { // 商品管理
          path: '/home1/goodsmanage1',
          component: () => import('./views/GoodsManage1/GoodsManage1.vue')
        },
        { // 添加商品
          path: '/home1/goodsadd1',
          component: () => import('./views/GoodsAdd1/GoodsAdd1.vue')
        },
        { // 销售统计
          path: '/home1/selltotal1',
          component: () => import('./views/SellTotal1/SellTotal1.vue')
        },
        { // 进货统计
          path: '/home1/systeminfo1',
          component: () => import('./views/SystemInfo1/SystemInfo1.vue')
        },
        { // 分类管理
          path: '/home1/classify1',
          component: () => import('./views/Classify1/Classify1.vue')
        },
        { // 添加分类
          path: '/home1/addclassify1',
          component: () => import('./views/AddClassify1/AddClassify1.vue')
        }, 
        { // 个人中心
          path: '/home1/personal',
          component: () => import('./views/Personal/Personal.vue')
        },
        { // 进货统计
          path: '/home1/stocktotal1',
          component: () => import('./views/StockTotal1/StockTotal1.vue')
        },
      ]

    }
  ]
})
