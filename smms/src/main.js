import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/resetcss.css'//引入重置样式
import './assets/common.css'//引入公共样式

import 'element-ui/lib/theme-chalk/index.css';//引入组件
import ElementUI from 'element-ui';
import echarts from 'echarts';

import axios from 'axios'//引入axios
import qs from 'qs'//引入qs

import local from '@/utils/local'// 引入本地存储封装

//注册组件
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.request = axios;//把axios挂到Vue的原型上
Vue.prototype.qs = qs;//把qs挂到vue的原型上
Vue.prototype.echarts = echarts;

//路由守卫 拦截所有路由
router.beforeEach((to, from, next) => {
  //获取token
  const token = local.get('gd_token')
  //判断
  if (token) {//如果有token
    next();//放行
  } else {
    if (to.path === '/login1') {
      next();
    } else {
      next({ path: '/login1' })
    }
  }
})
Vue.config.productionTip = false // 阻止生产提示

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
