<template>
  <div class="account-add1">
    <!-- 卡片，添加账号 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h3>添加管理员账号</h3>
      </div>
      <!-- 下面表单部分 -->
      <div class="text item">
        <el-form
          :model="accountAddForm"
          status-icon
          :rules="rules"
          ref="accountAddForm"
          label-width="100px"
        >
          <!-- 账号 -->
          <el-form-item label="账号" prop="account">
            <el-input type="text" v-model="accountAddForm.account" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="accountAddForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="accountAddForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 选择用户组 -->
          <el-form-item label="选择用户组" prop="userGroup" style="width: 300px;">
            <el-select v-model="accountAddForm.userGroup" placeholder="选择用户组">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通会员" value="普通会员"></el-option>
            </el-select>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item>
            <!-- 添加按钮 -->
            <el-button type="primary" @click="submitForm()">添加</el-button>
            <!-- 重置按钮 -->
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
import { accountadd } from '@/api/account';
export default {
  data() {
    //自定义函数
    // 验证密码
    const checkPwd = (rule, value, callback) => {
      //获取值的长度
      const len = value.length;
      if (value === "") {
        //非空验证
        callback(new Error("密码不能为空"));
      } else if (len < 3 || len > 6) {
        //长度验证
        callback(new Error("长度为3 ~ 6位"));
      } else if (!pwdReg(value)) {
        //正则
        callback(new Error("只能输入字母和数字"));
      } else {
        if (this.accountAddForm.checkPass !== "") {
          //确认密码不能为空
          this.$refs.accountAddForm.validateField("checkPass"); //再次触发验证密码
        }
        callback();
      }
    };
    //确认密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        //非空验证
        callback(new Error("请再次输入密码"));
      } else if (value !== this.accountAddForm.password) {
        //长度验证
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };

    return {
      //添加管理员账号表单
      accountAddForm: {
        account: "", //账户
        password: "", //密码
        checkPass: "", //再次输入密码
        userGroup: "" //用户组
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
          { required: true, validator: checkPwd, trigger: "blur" } //非空验证
        ],
        //确认密码
        checkPass: [
          { required: true, validator: validatePass, trigger: "blur" } //非空验证
        ],
        //用户
        userGroup: [
          { required: true, message: "请选择用户组", trigge: "change" }
        ]
      }
    };
  },
  methods: {
    //添加按钮
    submitForm() {
      // 获取整个表单，调用验证方法
      this.$refs.accountAddForm.validate(valid => {
        // 所有前端验证通过 valid:true, 否则valid: false
        if (valid) {
          // 收集参数
          let params = {
            account: this.accountAddForm.account,
            password: this.accountAddForm.password,
            userGroup: this.accountAddForm.userGroup
          };
          // 发送给后端
         accountadd(params)
            .then(response => {
              console.log(response.data);
              // 接收后端响应数据
              let {code, reason} = response;

              // 判断
              if (code === 0) {
                // 成功
                this.$message({
                  // 弹成功提示
                  message: reason,
                  type: "success"
                });
                this.$router.push('/home1/accountmanage1'); // 跳转到账号管理
              } else if (code === 1) {
                // 失败
                this.$message.error(reason); // 弹失败提示
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("前端验证不通过，不允许提交");
          return false;
        }
      });
    },
    // 重置
    resetForm() {
      this.$refs.accountAddForm.resetFields(); // 调用表单重置方法
    }
  }
};
</script>
<style lang='less'>
.account-add1 {
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
