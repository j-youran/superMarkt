<template>
  <div class="classify1">
    <!-- 卡片，添加账号 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h3>添分类管理</h3>
      </div>
      <!-- 下面表单部分 -->
      <div class="text item">
        <el-table :data="classifytableData" stripe style="width: 100%">
          <el-table-column prop="classify" label="分类"></el-table-column>
          <el-table-column prop="manage" label="管理"><el-button type="primary" icon="el-icon-edit" circle></el-button></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      classifytableData: [
        {
          classify: "日用品",
          manage: ""
        },
        {
          classify: "酒水类",
          manage: ""
        },
        {
          classify: "生鲜类",
          manage: ""
        },
         {
          classify: "零食类",
          manage: ""
        }
      ]
    };
  }
};
</script>
<style lang='less'>
.classify1 {
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
