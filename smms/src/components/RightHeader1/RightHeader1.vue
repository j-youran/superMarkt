<template>
  <div class="header1">
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <h1>
            <i class="el-icon-menu"></i> 猛龙超市管理系统
          </h1>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <el-row>
            <el-col :span="18">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  {{ userName }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                  <el-dropdown-item command="logout">退出系统</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                <div class="photo">
                  <img src="photoUrl" alt>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getInfo } from "@/api/account";
import local from "@/utils/local";
export default {
  data() {
    return {
      photoUrl: "",
      userName: ""
    };
  },
  methods: {
    handleCommand(command) {
      if (command === "logout") {
        //退出xit,清除token
        local.remove("gd_token");
        //弹出提示框
        this.$message({
          message: "退出系统成功！欢迎回来！",
          type: "succrs"
        });
        //考虑用户体验
        setTimeout(() => {
          //跳转到登陆
          this.$router.push("/login1");
        }, 1000);
      } else if (command === "personal") {
        //跳转到个人中心
        this.$router.push("/home1/personal");
      }
    },
    getUserInfo() {
      //发送请求给后端
      getInfo()
      .then(response => {
        //；接收数据
        let {data} = response;
        //获取账号名
        let { account, photoUrl } = data[0];
        this.photoUrl = 'http://127.0.0.1:5920' + photoUrl
        this.userName = account//渲染账号
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  created() {
    //请求当前的登陆
    this.getUserInfo();
  }
};
</script>
<style lang='less'>
// 引入样式
@import "./RightHeader1.less";
</style>
