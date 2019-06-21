<template>
  <div class="goods-manage1">
    <!-- 卡片，商品管理 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h3>商品管理</h3>
      </div>
      <div class="searchForm">
        <el-form :inline="true">
          <!-- 分类选择 -->
          <el-select v-model="searchForm.classify" placeholder="-----分类选择-----">
            <el-option label="全部分类" value="全部分类"></el-option>
            <el-option label="电子类" value="电子类"></el-option>
            <el-option label="食品类" value="食品类"></el-option>
            <el-option label="烟酒类" value="烟酒类"></el-option>
            <el-option label="服装类" value="服装类"></el-option>
            <el-option label="生鲜类" value="生鲜类"></el-option>
          </el-select>
          <!-- 关键字搜索 -->
          <el-form-item label="关键字:">
            <el-input v-model="searchForm.keyword" placeholder="商品名称或条形码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table
          ref="goodsForm"
          :data="goodsForm"
          stripe
          style="width: 100%"
          @selection-change="selectChange"
        >
          <!-- 选择 -->
          <el-table-column type="selection"></el-table-column>
          <!-- 商品条码-->
          <el-table-column prop="barCode" label="商品条码"></el-table-column>
          <!-- 商品名称 -->
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>
          <!-- 所属分类 -->
          <el-table-column prop="classify" label="所属分类"></el-table-column>
          <!-- 售价 -->
          <el-table-column prop="price" label="售价(元)"></el-table-column>
          <!-- 成本价 -->
          <el-table-column prop="purchasingPrice" label="成本价(元)"></el-table-column>
          <!-- 库存 -->
          <el-table-column prop="repertory" label="库存 "></el-table-column>
          <!-- 管理 -->
          <el-table-column label="管理">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="handleEdit(scope.row.id)"
                size="mini"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="handleDelete(scope.row.id)"
                size="mini"
              ></el-button>
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
        <el-dialog title="修改商品信息" width="420px" :visible.sync="visible">
          <!-- 修改表单 -->
          <el-form ref="editForm" :model="editForm" style="width: 316px" :rules="rules">
            <!-- 商品名 -->
            <el-form-item label="商品名称" prop="goodsName" label-width="120px">
              <el-input v-model="editForm.goodsName" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 销售价-->
            <el-form-item label="售价（元）" prop="price" label-width="120px">
              <el-input v-model="editForm.price" autocomplete="off"></el-input>
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
      </div>
    </el-card>
  </div>
</template>
<script>
import { goodsbatchdelete, getDataByPage, goodsedit, goodsdel, saveedit } from '@/api/goods'
export default {
  data() {
    return {
      goodsForm: [], // 账号表格数据
      currentPage: 1, // 当前页
      total: 0, // 数据总条数
      pageSize: 3, // 每页条数,
      visible: false,
      value: "", // 修改模态框的显示和隐藏状态
      // 搜索
      searchForm: {
        // 搜索表格数据
        classify: "",
        keyword: ""
      },
      editForm: {
        // 修改表单
        goodsName: "",
        price: ""
      },
      editId: "",
      rules: {
        // 验证规则
        goodsName: [{ required: true, message: "账号不能为空", trigger: "blur" }], //非空
        price: [{ required: true, message: "账号不能为空", trigger: "blur" }]
      },
      delIdArr: [] //批量删除的数组
    };
  },
  methods: {
    //搜索查询
   onSearch() {
     //直接调用
     this.getData();
      //收集参数
      /*  let params = {
          classify: this.searchForm.classify,//分类
          keyword: this.searchForm.keyword//关键字
      }
      //把参数发给后端
      goodssearch(params)
      .then(response => {
        let { data } = response;
        //渲染
        this.goodsForm = data;
      })
      .catch(err => {
          console.log(err);

      })*/
    }, 
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
          let params = { idArr: this.delIdArr };
          goodsbatchdelete(params)
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
                this.getData() ;
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
      this.$refs.goodsForm.clearSelection();
    },
    // 编辑
    handleEdit(id) {
      // 弹出模态框
      this.visible = true;
      // 保留要修改的数据的id
      this.editId = id;
      goodsedit({ id })
        .then(response => {
          // 接收后端响应的数据
          let { data } = response;

          // 回填表单
          this.editForm.goodsName = data[0].goodsName; //商品名
          this.editForm.price = data[0].price; //售价
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
          goodsdel({ id })
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
                this.getData() ;
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
            goodsName: this.editForm.goodsName,
            price: this.editForm.price,
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
                this.getData() ; // 重新请求一次数据 刷新列表
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
      this.getData() ; // 调用分页请求
    },
    // currentPage（当前页）改变
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; // 把用户选择的当前页获取 赋值给data中的currentPage
      this.getData()  // 调用分页请求
    },

    // 按照分页请求数据
    getData() {
      //收集数据
      let params = {
          currentPage: this.currentPage, //当前页
          pageSize: this.pageSize, //每页条数
          classify: this.searchForm.classify,//分类
          keyword: this.searchForm.keyword//关键字
      };
      //发送请求
     getDataByPage(params)
        .then(response => {
          // console.log(response.data);
          // 获取数据
          let { total, data } = response;
          // 渲染表格
          this.total = total;
          this.goodsForm = data;
          this.total = total;
         // console.log(total, data);
          //判断（边界）
     /*      if (!data.length && this.currentPage !== 1) {
            this.currentPage -= 1;
            this.getGoodsByPage(); //页面刷新调用
          } */
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getData(); // 调用分页请求数据函数
  }
};
</script>
<style lang='less'>
.goods-manage1 {
  .box-card {
    .el-card__header {
      color: #f1f1f1;
      background: #3793df;
      h3 {
        font-size: 18px;
      }
    }
    .el-card__body {
      .text {
        .el-form {
          border-bottom: 2px solid #eee;
        }
      }
    }
  }
}
</style>
