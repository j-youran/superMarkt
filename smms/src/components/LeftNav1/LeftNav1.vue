<template>
  <div class="left-nave1">
    <h5 class="title">猛龙超市管理系统</h5>
    <el-menu
      :default-active="$route.path"
      unique-opened
      background-color="#3793df"
      active-text-color="red"
      text-color="#f1f1f1"
      router
    >
      <!-- 导航 一-->
      <el-submenu :index="(i+1) + ''" v-for="(nav,i) in LeftNav1" :key="i">
        <template slot="title">
          <i :class="nav.iconCls"></i>
          <span>{{ nav.navTitle }}</span>
        </template>
        <el-menu-item
          :index="subNav.path"
          v-for="(subNav,i) in nav.children"
          :key="i"
        >{{ subNav.navTitle }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //左侧导航
      LeftNav1: [
        //导航一
        {
          iconCls: "el-icon-s-home", //图标
          navTitle: "系统信息", //标题
          children: [ {path: "/home1/systeminfo1", navTitle: "系统信息"}]
            //子选项
        },
        //导航二
        {
          iconCls: "el-icon-s-custom", //图标
          navTitle: "账号管理", //标题
          children: [//子选项
            {path: "/home1/accountmanage1",navTitle: "账号管理"},
            {path: "/home1/accountadd1",navTitle: "添加账号"},
            { path: "/home1/passwordmodify1",navTitle: "密码修改"}
          ]  
        },
        //导航三
        {
          iconCls: "el-icon-s-goods", //图标
          navTitle: "商品管理", //标题
          children: [
            //子选项
            {path: "/home1/goodsmanage1",navTitle: "商品管理"},
            {path: "/home1/goodsadd1",navTitle: "添加商品"}
         ]
        },
        //导航四
        {
          iconCls: "el-icon-s-order", //图标
          navTitle: "统计管理", //标题
          children: [ //子选项
            { path: "/home1/selltotal1",navTitle: "销售统计"},
            {path: "/home1/stocktotal1",navTitle: "进货统计"}
          ] 
        },
        //导航五
          {
          iconCls: "el-icon-s-order", //图标
          navTitle: "分类管理", //标题
          children: [ //子选项
            { path: "/home1/classify1",navTitle: "分类管理"},
            {path: "/home1/addclassify1",navTitle: "添加分类"} 
          ] 
        },
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang='less'>
// 引入样式
@import "./LeftNav1.less";
</style>
