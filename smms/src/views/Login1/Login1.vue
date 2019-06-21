<template>
  <div class="login">
    <div class="login-warp">
      <!-- 标题 -->

      <h3 class="title">
        <i class="el-icon-s-shop"></i>猛龙超市账户登陆
      </h3>
      <!-- 表单 -->
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px">
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="loginForm.account " autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 按钮，重置与登陆 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm()">登陆</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
//引入工具函数
import { pwdReg } from "@/utils/reg";
import {login, loginForm} from '@/api/login'//引入api请求文件
export default {
  data() {
    //自定义函数
    //验证密码
    var checkPwd = (rule, value, callback) => {
      //获取值的长度
      var len = value.length;
      if (value === "") {
        callback(new Error("密码不能为空")); //非空
      } else if (len < 3 || len > 6) {
        callback(new Error("长度为3 ~ 6位")); //验证密码的长度
      } else if (!pwdReg(value)) {
        callback(new Error("只能输入字母和数字")); //正则
      } else {
        if (this.loginForm.checkPass !== "") {
          //确认密码不为空
          this.$refs.loginForm.validateField("checkPass"); //触发确认密码
        }
        callback(); //成功
      }
    };
    //验证确认密码
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码")); //非空
      } else if (value !== this.loginForm.password) {
        callback(new Error("密码不一致")); //密码的一致性
      } else {
        callback(); //成功
      }
    };

    return {
      //登陆表单的数据
      loginForm: {
        account: "", //账号
        password: "", //密码
        checkPass: "" //再次确认密码
      },
      //表单验证
      rules: {
        //账号验证
        account: [
          { required: true, message: "请输入账户", trigger: "blur" }, //非空验证
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" } //长度验证
        ],
        //密码
        password: [
          { required: true, validator: checkPwd, trigger: "blur" }, //非空验证
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" } //长度验证
        ],
        //确认密码
        checkPass: [
          { required: true, validator: validatePass, trigger: "blur" } //非空验证
        ]
      }
    };
  },

  methods: {
    //登陆
    submitForm() {
      //获取，并调用验证方法
      this.$refs.loginForm.validate(valid => {
        //判断
        if (valid) {
          //手机参数
          let params = {
            account: this.loginForm.account,
            password: this.loginForm.password
          };
          //发送请求给后端
          login(params)
            .then(response => {
              //接收响应数据
              let { code, reason, token } = response;
              //判断
              if (code === 0) {
                //成功
                //console.log("111");
                //把token存入本地存储
                window.localStorage.setItem('gd_token', token);
                this.$message({//弹出成功的提升
                  message:reason,
                  type:'success'
                })
                this.$router.push('/home1')// 跳转后端登陆
              } else if (code === 1) {
                //失败
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("登陆验证不通过!!");
          return false;
        }
      });
    },
    //重置
    resetForm() {
      this.$refs.loginForm.resetFields();
    }
  }
};
</script>
<style lang='less'>
// 引入样式
@import "./login.less";
</style>
