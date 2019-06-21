<template>
  <div class="add-classify1">
    <!-- 卡片，添加账号 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h3>添加分类</h3>
      </div>
      <!-- 下面表单部分 -->
      <div class="text item">
        <!-- 所属分类 -->
        <el-form ref="classifyForm" :model="classifyForm" label-width="80px">
          <el-form-item label="所属分类">
            <el-select v-model="classifyForm.region" placeholder="---请选择所属分类---">
              <el-option label="顶级分类" value="dtop"></el-option>
              <el-option label="优质分类" value="highQuality"></el-option>
              <el-option label="中级分类" value="intermediate"></el-option>
              <el-option label="普通分类" value="general"></el-option>
            </el-select>
          </el-form-item>
          <!-- 分类名称 -->
          <el-form-item label="分类名称">
            <el-input v-model="classifyForm.classifyName" style="width:400px"></el-input>
          </el-form-item>
          <!-- 状态 -->
          <el-form-item label="状态">
            <el-radio-group v-model="classifyForm.status">
              <el-radio label="启用"></el-radio>
              <el-radio label="禁用"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 添加按钮 -->
          <el-button type="primary" size="small">添加</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //分类表单
      classifyForm: {
        region: "",
        classifyName: "",
        status: ""
      },
      rules: {
       region: [{required: true, message: "请至少选择一个分类", trigger: "change"}],
       classifyName: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
      }
    };
  }
};
</script>
<style lang='less'>
.add-classify1 {
  .box-card {
    .el-card__header {
      color: #f1f1f1;
      background: #3793df;
      h3 {
        font-size: 18px;
      }
    }
    /*    .el-card__body {
      .el-form-item {
        width: 400px;
      }
    } */
  }
}
</style>
