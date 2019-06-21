<template>
  <div class="account-manage1">
    <!-- 卡片，账号管理 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>账号管理</h3>
      </div>
      <!-- 表格 -->
      <el-table
        ref="accountTableData"
        :data="accountTableData"
        stripe
        style="width: 100%"
        @selection-change="selectChange"
      >
        <!-- 选择 -->
        <el-table-column type="selection"></el-table-column>
        <!-- 账号 -->
        <el-table-column prop="account" label="账号"></el-table-column>
        <!-- 用户组 -->
        <el-table-column prop="userGroup" label="用户组"></el-table-column>
        <!-- 日期 -->
        <el-table-column label="日期">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.ctime | filterCtime }}</span>
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column prop="regulate" label="操作">
          <!-- 按钮 -->
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
            <!-- 删除按钮 -->
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div style="margin-top: 20px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[3, 5, 9, 16]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <!-- 修改表单模态框 -->
      <el-dialog title="修改账号" width="420px" :visible.sync="visible">
        <!-- 修改表单 -->
        <el-form ref="editForm" :model="editForm" style="width: 316px" :rules="rules">
          <!-- 账号 -->
          <el-form-item label="账号" prop="account" label-width="120px">
            <el-input v-model="editForm.account" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 用户组 -->
          <el-form-item label="用户组" label-width="120px">
            <el-select v-model="editForm.userGroup" placeholder="请选择用户组">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通用户" value="普通用户"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 修改表单按钮 -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 批量删除 -->
      <div style="margin-top: 20px">
        <el-button @click="batchDel()" type="danger" size="small">批量删除</el-button>
        <el-button @click="deselect()" type="primary" size="small">取消选择</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
//引入moment
import moment from "moment";
import {accountbatchdelete, accountedit, accountdel, saveedit, accountlistbypage } from '@/api/account'
export default {
  data() {
    return {
      accountTableData: [], // 账号表格数据
      currentPage: 1, // 当前页
      total: 0, // 数据总条数
      pageSize: 3, // 每页条数,
      visible: false, // 修改模态框的显示和隐藏状态
      editForm: {
        // 修改表单
        account: "",
        userGroup: ""
      },
      editId: "",
      rules: {
        // 验证规则
        account: [
          { required: true, message: "账号不能为空", trigger: "change" }, //非空
          { min: 3, max: 6, message: "长度3 ~ 6位", trigger: "change" } //长度验证
        ]
      },
      delIdArr: [] //批量删除的数组
    };
  },
  methods: {
    //批量删除
    batchDel() {
      // 如果没选中
      if (!this.delIdArr.length) {
        this.$message.error("请选择后再操作！");
        return;
      }

      // 优化体验
      this.$confirm("确认执行批量删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确认删除
          // 发送请求 把"id们"发送给后端
          let params = { idArr: this.delIdArr}
          accountbatchdelete(params)
            .then(response => {
              // 接收数据
              let { code, reason } = response;
              // 判断
              if (code === 0) {
                // 弹成功提示
                this.$message({
                  type: "success",
                  message: reason
                });
                // 刷新列表
                this.getAccountsByPage();
              } else if (code === 1) {
                // 弹失败提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          // 取消删除
          this.$message({
            type: "info",
            message: "已取消批量删除"
          });
        });
    },
    //选中状态
    selectChange(selectData) {
      //循环选中的数据 把每一项的id取出来 放入一个数组中
      this.delIdArr = selectData.map(v => v.id);
    },
    //取消选择
    deselect() {
      //选中的去自傲
      this.$refs.accountTableData.clearSelection();
    },
    // 编辑
    handleEdit(id) {
      // 弹出模态框
      this.visible = true;
      // 保留要修改的数据的id
      this.editId = id;
     accountedit({id})
        .then(response => {
          // 接收后端响应的数据
          let { data } = response;

          // 回填表单
          this.editForm.account = data[0].account; //账户
          this.editForm.userGroup = data[0].userGroup; //用户组
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除
    handleDelete(id) {
      // 优化删除体验
      console.log(id);
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确定，发送请求至后端
      accountdel({id})
            .then(response => {
              // 接收后端响应的数据
              let { code, reason } = response;
              // 判断
              if (code === 0) {
                // 成功
                // 弹成功提示
                this.$message({
                  type: "success",
                  message: reason
                });
                // 刷新列表（重新请求一次数据）
                this.getAccountsByPage();
              } else if (code === 1) {
                // 失败
                // 弹失败提示
                this.$message.err(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          // 取消
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 保存修改
    saveEdit() {
      // 调用表单的前端验证
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // 隐藏模态框
          this.visible = false;

          // 收集参数
          let params = {
            account: this.editForm.account,
            userGroup: this.editForm.userGroup,
            id: this.editId
          };
          // 发送数据给后端
        saveedit(params)
            .then(response => {
              // 接收后端响应的数据
              let { code, reason } = response;
              // 判断
              if (code === 0) {
                // 成功
                this.$message({
                  type: "success",
                  message: reason
                });
                this.getAccountsByPage(); // 重新请求一次数据 刷新列表
              } else if (code === 1) {
                // 失败
                this.$message.err(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    // pageSize（每页条数）改变
    handleSizeChange(pageSize) {
      this.pageSize = pageSize; // 把用户选择的每页条数获取 赋值给data中的pageSize
      this.getAccountsByPage(); // 调用分页请求
    },
    // currentPage（当前页）改变
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; // 把用户选择的当前页获取 赋值给data中的currentPage
      this.getAccountsByPage(); // 调用分页请求
    },

    // 按照分页请求数据
    getAccountsByPage() {
      //收集数据
      let params = {
        currentPage: this.currentPage, //当前页
        pageSize: this.pageSize //每页条数
      };
      //发送请求
 accountlistbypage(params)
        .then(response => {
          // console.log(response.data);
          // 获取数据
          let { total, data } = response;
          // 渲染表格
          this.total = total;
          this.accountTableData = data;
          console.log(total, data);
          //判断（边界）
          if (!data.length && this.currentPage !== 1) {
            this.currentPage -= 1;
            this.getAccountsByPage();//页面刷新调用 
          } 
        })
        .catch(err => {
          console.log(err);
        });
    }
    // 请求所有账号数据
    /*     getAccounts() {
      this.request
        .get("http://127.0.0.1:5920/account/accountlist")
        .then(response => {
          console.log(response.data);
          // 获取数据
          let { data } = response.data;
          // 渲染表格
          this.accountTableData = data;
        })
        .catch(err => {
          console.log(err);
        });
    } */
  },
  created() {
    this.getAccountsByPage(); // 调用分页请求数据函数
  },
  //过滤器
  filters: {
    filterCtime(ctime) {
      // 过滤时间
      return moment(ctime).format("YYYY-MM-DD hh:mm:ss");
    }
  }
};
</script>
<style lang='less'>
// 引入样式
.account-manage1 {
  .box-card {
    .el-card__header {
      color: #f1f1f1;
      background: #3793df;
      h3 {
        font-size: 18px;
      }
    }
  }
}
</style>
