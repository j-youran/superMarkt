<template>
  <div class="password-modify1">
    <!-- 卡片，添加账号 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h3>账号密码修改</h3>
      </div>
      <!-- 下面表单部分 -->
      <div class="text item">
        <!-- 表单 -->
        <el-form
          :model="changePasswordForm"
          status-icon
          :rules="rules"
          ref="changePasswordForm"
          label-width="100px"
        >
          <!-- 账号 -->
          <el-form-item label="原密码" prop="oldPassword">
            <el-input type="text" v-model="changePasswordForm.oldPassword" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 新密码 -->
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="changePasswordForm.newPassword" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 确认新密码 -->
          <el-form-item label="确认新密码" prop="newCheckPass">
            <el-input type="password" v-model="changePasswordForm.newCheckPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">提交</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
  
</template>
<script>
//引入工具函数
import { pwdReg } from "@/utils/reg";
import local from "@/utils/local";
// 引入请求函数
import { checkOldPass, changePassword } from "@/api/account";
export default {
  data() {
    //自定义函数
    // 原密码
    const checkOldPwd = (rule, value, callback) => {
      if (value === "") {
        //非空验证
        callback(new Error("旧密码不能为空"));
      } else {
        //把就密码发送给后端
        checkOldPass({ oldPwd: this.changePasswordForm.oldPassword })
          .then(response => {
            //接收数据
            let { code, reason } = response;
            //判断
            if (code === 1) {
              callback(new Error(reason)); //密码错误提示
            } else if (code === 0) {
              callback(); //成功
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    };
  const checkNewPwd = (rule, value, callback) => {
            // 获取长度
            let len = value.length;
            if (value === '') {
                callback(new Error('新密码不能为空'))
            } else if (value === this.changePasswordForm.oldPassword) {
                callback(new Error('新密码不能与旧密码相同'))
            } else if (len < 3 || len > 6) {
                callback(new Error('密码长度3 ~ 6 位'))
            } else if(!pwdReg( value )) {
                callback(new Error('只可以输入字母数字'))
            } else {
                if (this.changePasswordForm.newCheckPass !== '') {
                    this.$refs.changePasswordForm.validateField('newCheckPass')
                }
                callback()
            }
        }
        const newCheckPwd =  (rule, value, callback) => {
             let len = value.length;
             console.log(this.changePasswordForm.newPassword);
            if (value === '') {
                callback(new Error('新密码不能为空'))
            } else if (value !== this.changePasswordForm.newPassword) {
                callback(new Error('两次密码不一致'))
                
                
            } else {
                callback()
            }
        }

    return {
      //修改密码表单
      changePasswordForm: {
        oldPassword: "",
        newPassword: "",
        newCheckPass: ""
      },
      //表单验证
      rules: {
        //账号验证
        oldPassword: [
          { required: true, validator: checkOldPwd, trigger: "blur" } //非空验证
        ],
        //密码
        newPassword: [{ required: true, validator: checkNewPwd, trigger: "blur" }], //非空验证
        //确认密码
        newCheckPass: [
          { required: true, validator: newCheckPwd, trigger: "blur" } //非空验证
        ]
      }
    };
  },
  methods: {
    //添加按钮
    submitForm() {
      //获取，并调用验证方法
      this.$refs.changePasswordForm.validate(valid => {
        //判断
        if (valid) {
          //收集参数
          //发送修改密码请求
          changePassword({ newPassword: this.changePasswordForm.newPassword })
            .then(response => {
              //接收数据
              let { code, reason } = response;
              //判断
              if (code === 0) {
                this.$message({
                  //成功
                  type: "success",
                  message: reason
                });
                //清除token
                local.remove("gd_token");
                this.$router.push('/login1');
              } else if (code === 1) {
                //失败
                this.$message.error(reason);
              }
            })
            .catch(err => {});
        } else {
          console.log("添加失败！");
          return false;
        }
      });
    },
    //重置按钮
    resetForm() {
      this.$refs.changePasswordForm.resetFields();
    }
  }
};
</script>
<style lang='less'>
.password-modify1 {
  .box-card {
    .el-card__header {
      color: #f1f1f1;
      background: #3793df;
      h3 {
        font-size: 18px;
      }
    }
    .el-card__body {
      .el-form-item {
        width: 400px;
      }
    }
  }
}
</style>
